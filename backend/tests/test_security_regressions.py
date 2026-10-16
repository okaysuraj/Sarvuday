"""Focused security regressions; all provider/database doubles are test-only."""
import asyncio
from copy import deepcopy
from datetime import datetime, timedelta, timezone
from decimal import Decimal
from io import BytesIO
from pathlib import Path
from types import SimpleNamespace
from unittest.mock import AsyncMock, Mock

import pytest
from fastapi import FastAPI, HTTPException, Request, UploadFile
from fastapi.testclient import TestClient
import jwt
from jwt.exceptions import InvalidTokenError as JWTError
from starlette.datastructures import Headers
from starlette.responses import JSONResponse

from app.config import settings
from app.core import middleware
from app.routes import ai as ai_routes
from app.routes.general import chat
from app.schemas import AppointmentBase, CreateAppointmentRequest
from app.services.appointments import appointment_service as bookings
from app.services.appointments import validators
from app.services.appointments.utils import cancel_appointment_logic
from app.services.auth.firebase_auth_service import FirebaseAuthService
from app.services.counsellor.counsellor_management_service import CounsellorManagementService
from app.services.normal_user.user_management_service import UserManagementService
from app.services.payments.stripe_service import reconcile_intent
from app.utils import file_utils, oauth
from app.utils.constants import CounsellorAvailabilityStatusEnum, PaymentStatusEnum, UserTypeEnum

USER = SimpleNamespace(user_id="NUSER-AUDIT", user_type=UserTypeEnum.normal_user, name="Audit Fixture")
ROOM = "ROOM-CUSER-AUDIT-NUSER-AUDIT"


def result(value=None, first=None):
    return SimpleNamespace(scalar_one_or_none=lambda: value, first=lambda: first)


def payment_fixture(**changes):
    fields = dict(payment_id="PAY-AUDIT", transaction_id="pi_audit", user_id=USER.user_id,
                  amount=Decimal("50.00"), currency="INR", status=PaymentStatusEnum.pending,
                  refunded=False, payment_gateway="STRIPE",
                  payment_response={"availability_slot_id": "SLOT-AUDIT", "counsellor_id": "CUSER-AUDIT"})
    fields.update(changes)
    return SimpleNamespace(**fields)


def intent_fixture():
    return {"id": "pi_audit", "currency": "inr", "amount_received": 5000, "status": "succeeded",
            "metadata": {"payment_id": "PAY-AUDIT", "user_id": USER.user_id,
                         "availability_slot_id": "SLOT-AUDIT", "counsellor_id": "CUSER-AUDIT"},
            "latest_charge": {"id": "ch_audit", "payment_intent": "pi_audit", "paid": True,
                              "refunded": False, "disputed": False, "amount_refunded": 0}}


@pytest.mark.parametrize("field,value", [("id", "pi_other"), ("currency", "usd"), ("amount_received", 4999),
                                         ("amount_received", True), ("status", "processing"), ("metadata", None)])
def test_reconciliation_rejects_provider_mismatch_without_settlement(field, value):
    payment, intent = payment_fixture(), intent_fixture()
    intent[field] = value
    with pytest.raises(HTTPException) as failure:
        reconcile_intent(payment, intent)
    assert failure.value.status_code == 409
    assert payment.status == PaymentStatusEnum.pending


@pytest.mark.parametrize("key", ["payment_id", "user_id", "availability_slot_id", "counsellor_id"])
def test_payment_metadata_is_bound_to_every_booking_identity(key):
    intent = intent_fixture()
    intent["metadata"][key] = "forged"
    with pytest.raises(HTTPException):
        reconcile_intent(payment_fixture(), intent)


@pytest.mark.parametrize("changes", [{"refunded": True}, {"status": PaymentStatusEnum.refunded},
                                     {"amount": Decimal("NaN")}, {"amount": Decimal("0")},
                                     {"payment_response": {}}, {"payment_response": []}])
def test_refunded_or_invalid_local_payment_cannot_settle(changes):
    with pytest.raises(HTTPException):
        reconcile_intent(payment_fixture(**changes), intent_fixture())


@pytest.mark.parametrize("change", [{"refunded": True}, {"amount_refunded": 1}, {"disputed": True},
                                    {"paid": False}, {"payment_intent": "pi_other"}])
def test_charge_refunds_and_disputes_cannot_be_redeemed(change):
    intent = intent_fixture()
    intent["latest_charge"].update(change)
    with pytest.raises(HTTPException):
        reconcile_intent(payment_fixture(), intent, require_unreversed_charge=True)


def test_provider_settlement_is_idempotent_and_requires_charge_before_redemption():
    payment, intent = payment_fixture(), intent_fixture()
    reconcile_intent(payment, intent, require_unreversed_charge=True)
    reconcile_intent(payment, intent, require_unreversed_charge=True)
    assert payment.status == PaymentStatusEnum.completed
    assert payment.payment_response["verified_by_provider"] is True
    intent["latest_charge"] = "ch_unexpanded"
    with pytest.raises(HTTPException):
        reconcile_intent(payment_fixture(), intent, require_unreversed_charge=True)


def test_invalid_and_expired_tokens_are_rejected():
    now = datetime.now(timezone.utc)
    valid = {"sub": USER.user_id, "user_type": "normal_user", "exp": now + timedelta(minutes=1)}
    for claims, secret in [
        (valid, "forged-key"), ({**valid, "exp": now - timedelta(seconds=1)}, settings.secret_key),
        ({"sub": USER.user_id, "user_type": "normal_user"}, settings.secret_key),
        ({**valid, "sub": ""}, settings.secret_key), ({**valid, "user_type": "super_admin"}, settings.secret_key),
    ]:
        with pytest.raises(JWTError):
            oauth.verify_access_token(jwt.encode(claims, secret, algorithm=settings.algorithm))
    assert oauth.verify_access_token(jwt.encode(valid, settings.secret_key, algorithm=settings.algorithm))["sub"] == USER.user_id


@pytest.mark.asyncio
async def test_revoked_admin_and_unapproved_counsellor_are_denied():
    token = jwt.encode({"sub": "ADMIN-AUDIT", "user_type": "admin",
                        "exp": datetime.now(timezone.utc) + timedelta(minutes=1)}, settings.secret_key, algorithm=settings.algorithm)
    db = SimpleNamespace(execute=AsyncMock(return_value=result(SimpleNamespace(is_approved=False))))
    with pytest.raises(HTTPException) as failure:
        await oauth.get_current_user(token, db)
    assert failure.value.status_code == 403
    with pytest.raises(HTTPException):
        oauth.ensure_counsellor_user(SimpleNamespace(user_type=UserTypeEnum.counsellor, is_approved=False))


@pytest.mark.asyncio
async def test_legacy_email_linking_requires_verified_email_and_never_overwrites_uid(monkeypatch):
    service = FirebaseAuthService(SimpleNamespace())
    lookup = AsyncMock(return_value=SimpleNamespace(firebase_uid="existing-owner"))
    monkeypatch.setattr(service, "_find_user_by_email", lookup)
    assert await service._link_verified_email({"uid": "attacker", "email": "audit@example.com", "email_verified": False}, UserTypeEnum.normal_user) is None
    lookup.assert_not_awaited()
    assert await service._link_verified_email({"uid": "attacker", "email": "audit@example.com", "email_verified": True}, UserTypeEnum.normal_user) is None


def test_firebase_revocation_check_is_requested(monkeypatch):
    from app.services.auth import firebase_auth_service
    verify = Mock(side_effect=ValueError("revoked"))
    monkeypatch.setattr(firebase_auth_service.auth, "verify_id_token", verify)
    with pytest.raises(HTTPException) as failure:
        FirebaseAuthService(None)._verify_firebase_token("fixture-token")
    assert failure.value.status_code == 401
    verify.assert_called_once_with("fixture-token", check_revoked=True)


@pytest.mark.asyncio
@pytest.mark.parametrize("case", ["missing", "wrong_owner", "wrong_slot", "wrong_amount", "reused"])
async def test_booking_rejects_unverified_mismatched_or_reused_payment(monkeypatch, case):
    slot = SimpleNamespace(availability_slot_id="SLOT-AUDIT", counsellor_id="CUSER-AUDIT")
    monkeypatch.setattr(bookings, "validate_slot_availability", AsyncMock(return_value=slot))
    created = AsyncMock()
    monkeypatch.setattr(bookings, "create_appointment_record", created)
    payment = payment_fixture()
    if case == "wrong_slot":
        payment.payment_response["availability_slot_id"] = "SLOT-OTHER"
    if case == "wrong_amount":
        payment.amount = Decimal("49")
    db = SimpleNamespace(get=AsyncMock(return_value=SimpleNamespace(session_fee=Decimal("50"))),
                         execute=AsyncMock(side_effect=[result(None if case == "wrong_owner" else payment),
                                                       result(first=("existing-appointment",) if case == "reused" else None)]),
                         commit=AsyncMock())
    request = CreateAppointmentRequest(counsellor_id=slot.counsellor_id, availability_slot_id=slot.availability_slot_id,
                                       payment_id=None if case == "missing" else payment.payment_id)
    with pytest.raises(HTTPException) as failure:
        await bookings.AppointmentService(db).book_appointment(USER.user_id, request)
    assert failure.value.status_code in (402, 409)
    created.assert_not_awaited()
    db.commit.assert_not_awaited()
    if case != "missing":
        query = db.execute.call_args_list[0].args[0]
        assert query.compile().params["user_id_1"] == USER.user_id
        assert query._for_update_arg is not None


@pytest.mark.asyncio
@pytest.mark.parametrize("future,approved,status_code", [(False, True, 409), (True, False, 409), (True, True, None)])
async def test_booking_slot_checks_real_future_approval_and_row_lock(future, approved, status_code):
    slot = SimpleNamespace(status=CounsellorAvailabilityStatusEnum.available, counsellor_id="CUSER-AUDIT",
        start_time=datetime.now(timezone.utc) + timedelta(hours=1 if future else -1))
    db = SimpleNamespace(execute=AsyncMock(return_value=result(slot)), get=AsyncMock(return_value=SimpleNamespace(is_approved=approved)))
    request = CreateAppointmentRequest(counsellor_id="CUSER-AUDIT", availability_slot_id="SLOT-AUDIT")
    if status_code:
        with pytest.raises(HTTPException) as failure:
            await validators.validate_slot_availability(db, request)
        assert failure.value.status_code == status_code
    else:
        assert await validators.validate_slot_availability(db, request) is slot
    assert db.execute.call_args.args[0]._for_update_arg is not None


@pytest.mark.asyncio
async def test_paid_cancellation_and_account_erasure_fail_without_mutation():
    db = SimpleNamespace(delete=AsyncMock(), commit=AsyncMock(), get=AsyncMock())
    with pytest.raises(HTTPException) as failure:
        await cancel_appointment_logic(db, SimpleNamespace(status="confirmed", payment_id="PAY-AUDIT"))
    assert failure.value.status_code == 503
    for service in (UserManagementService(db), CounsellorManagementService(db)):
        with pytest.raises(HTTPException) as failure:
            await service.delete_account(USER.user_id)
        assert failure.value.status_code == 503
    db.delete.assert_not_awaited()
    db.commit.assert_not_awaited()
    db.get.assert_not_awaited()


def scoped_ai_client():
    app = FastAPI()
    app.include_router(ai_routes.router, prefix="/ai-insights")
    app.dependency_overrides[ai_routes.ensure_normal_user] = lambda: USER
    cursor = SimpleNamespace(sort=lambda *args: cursor, limit=lambda *args: cursor,
                             to_list=AsyncMock(return_value=[{"mood": "4"}, {"mood": "0"}]))
    db = SimpleNamespace(mood_tracking=SimpleNamespace(find=Mock(return_value=cursor)),
                         crisis_logs=SimpleNamespace(insert_one=AsyncMock(return_value=SimpleNamespace(inserted_id="audit-record"))))
    app.dependency_overrides[ai_routes.get_mongo_db] = lambda: db
    return TestClient(app), db


def test_ai_summary_and_crisis_cannot_select_another_user():
    client, db = scoped_ai_client()
    summary = client.get("/ai-insights/summary?user_id=NUSER-VICTIM")
    assert summary.status_code == 200 and summary.json()["average_recorded_mood"] == 2
    assert db.mood_tracking.find.call_args.args[0] == {"user_id": USER.user_id}
    response = client.post("/ai-insights/crisis-alert", json={"user_id": "NUSER-VICTIM", "risk_level": "manual"})
    assert response.status_code == 200 and response.json()["emergency_services_contacted"] is False
    assert db.crisis_logs.insert_one.call_args.args[0]["user_id"] == USER.user_id
    assert client.post("/ai-insights/voice-analysis", json={"audio_url": "https://example.com/test"}).status_code == 503


def upload(content, content_type="image/png", filename="../../script.exe", size=1):
    return UploadFile(file=BytesIO(content), filename=filename, size=size, headers=Headers({"content-type": content_type}))


def test_upload_size_uses_real_stream_length_and_rejects_signature_spoofing(tmp_path):
    with pytest.raises(HTTPException) as failure:
        file_utils.save_uploaded_file(upload(b"\x89PNG\r\n\x1a\n" + b"x" * 100, size=1), "images", tmp_path / "uploads", max_size=20)
    assert failure.value.status_code == 413
    with pytest.raises(HTTPException) as failure:
        file_utils.save_uploaded_file(upload(b"<script>attack</script>"), "images", tmp_path / "uploads")
    assert failure.value.status_code == 400
    assert not (tmp_path / "uploads").exists()


def test_upload_and_delete_paths_cannot_escape_configured_root(tmp_path, monkeypatch):
    root = tmp_path / "uploads"
    outside = tmp_path / "outside.txt"
    outside.write_text("preserve", encoding="utf-8")
    with pytest.raises(HTTPException):
        file_utils.save_uploaded_file(upload(b"\x89PNG\r\n\x1a\nfixture"), "../escape", root)
    saved = file_utils.save_uploaded_file(upload(b"\x89PNG\r\n\x1a\nfixture"), "images", root)
    destination = tmp_path / saved
    assert destination.is_file() and destination.suffix == ".png" and "script" not in destination.name
    monkeypatch.setattr(file_utils, "BASE_UPLOAD_DIR", root)
    with pytest.raises(HTTPException):
        file_utils.delete_file(str(outside))
    assert outside.read_text(encoding="utf-8") == "preserve"


def configured_app(monkeypatch, production=False, origins="", hosts="testserver"):
    monkeypatch.setattr(settings, "environment", "production" if production else "development")
    monkeypatch.setattr(settings, "cors_allowed_origins", origins)
    monkeypatch.setattr(settings, "frontend_base_url", "")
    monkeypatch.setattr(settings, "allowed_hosts", hosts)
    app = FastAPI()
    middleware.configure_middlewares(app)
    @app.api_route("/echo", methods=["GET", "POST"])
    async def echo(request: Request):
        return {"bytes": len(await request.body())}
    return app


def test_cors_and_host_allowlists_are_explicit(monkeypatch):
    app = configured_app(monkeypatch)
    client = TestClient(app)
    assert client.get("/echo", headers={"Origin": "http://localhost:5173"}).headers["access-control-allow-origin"] == "http://localhost:5173"
    assert "access-control-allow-origin" not in client.get("/echo", headers={"Origin": "http://192.168.1.22:8081"}).headers
    assert client.get("/echo", headers={"Host": "attacker.example"}).status_code == 400
    assert client.get("/echo").headers["x-content-type-options"] == "nosniff"


@pytest.mark.parametrize("origin,hosts", [("http://frontend.example", "api.example"), ("https://", "api.example"),
                                         ("https://frontend.example/path", "api.example"), ("https://frontend.example", "*")])
def test_insecure_production_origins_or_hosts_fail_at_startup(monkeypatch, origin, hosts):
    with pytest.raises(RuntimeError):
        configured_app(monkeypatch, True, origin, hosts)


def test_body_limit_counts_streamed_bytes_even_with_forged_length(monkeypatch):
    client = TestClient(configured_app(monkeypatch))
    assert client.post("/echo", content=b"x" * (5 * 1024 * 1024 + 1), headers={"Content-Length": "1"}).status_code == 413
    assert client.post("/echo", content=iter([b"x" * (1024 * 1024)] * 6)).status_code == 413
    assert client.post("/echo", content=b"x", headers={"Content-Length": "-1"}).status_code == 400


@pytest.mark.asyncio
async def test_rate_state_is_bounded_and_forwarded_headers_do_not_bypass_limits():
    async def endpoint(scope, receive, send):
        await JSONResponse({"ok": True})(scope, receive, send)
    guard = middleware.SecurityMiddleware(endpoint)
    async def invoke(address, path="/contact", forwarded=""):
        messages = []
        scope = {"type": "http", "path": path, "method": "POST", "client": (address, 1),
                 "headers": [(b"x-forwarded-for", forwarded.encode())]}
        async def receive():
            return {"type": "http.request", "body": b""}
        async def send(message):
            messages.append(message)
        await guard(scope, receive, send)
        return messages[0]["status"]
    for index in range(5):
        assert await invoke("client", forwarded=str(index)) == 200
    assert await invoke("client", forwarded="another") == 429
    for index in range(10005):
        await invoke(f"2001:db8::{index:x}")
    assert len(guard.requests) == 10000
    assert all(len(queue) <= 5 for queue in guard.requests.values())


@pytest.mark.asyncio
async def test_chat_accepts_hyphenated_ids_but_requires_a_stored_relationship():
    assert chat.is_user_in_room(USER.user_id, ROOM)
    assert not chat.is_user_in_room("NUSER-VICTIM", ROOM)
    db = SimpleNamespace(execute=AsyncMock(return_value=result(first=None)))
    with pytest.raises(HTTPException):
        await chat.require_room_access(db, USER, ROOM)
    db.execute.return_value = result(first=("SESSION-AUDIT",))
    await chat.require_room_access(db, USER, ROOM)
    params = db.execute.call_args.args[0].compile().params
    assert USER.user_id in params.values() and "CUSER-AUDIT" in params.values()


def test_websocket_invalid_json_closes_and_releases_connection(monkeypatch):
    app = FastAPI()
    app.include_router(chat.router, prefix="/chat")
    db = SimpleNamespace(execute=AsyncMock(side_effect=[result(USER), result(first=("SESSION-AUDIT",))]),
                         rollback=AsyncMock())
    app.dependency_overrides[chat.get_db] = lambda: db
    monkeypatch.setattr(chat, "verify_access_token", lambda token: {"sub": USER.user_id, "user_type": "normal_user"})
    connections = chat.ConnectionManager()
    monkeypatch.setattr(chat, "manager", connections)
    client = TestClient(app)
    with client.websocket_connect(f"/chat/{ROOM}?token=audit") as socket:
        assert socket.receive_json()["type"] == "online"
        socket.send_text("{invalid")
        assert socket.receive()["code"] == 1003
    assert connections.active_connections == {}
    db.rollback.assert_awaited()


def test_community_rejects_unauthenticated_feeds_and_hides_all_account_ids():
    from app.routes.general import community
    from bson import ObjectId
    app = FastAPI()
    app.include_router(community.router, prefix="/community")
    client = TestClient(app)
    assert client.get("/community/feed").status_code in (401, 403)
    app.dependency_overrides[community.ensure_normal_user] = lambda: USER
    records = [{"_id": ObjectId(), "user_id": "NUSER-PRIVATE", "content": "Test fixture",
                "is_anonymous": anonymous, "created_at": datetime.now(timezone.utc)} for anonymous in (True, False)]
    cursor = SimpleNamespace(sort=lambda *args: cursor, skip=lambda *args: cursor, limit=lambda *args: cursor,
                             to_list=AsyncMock(return_value=records))
    db = SimpleNamespace(community_posts=SimpleNamespace(find=Mock(return_value=cursor)))
    app.dependency_overrides[community.get_mongo_db] = lambda: db
    response = client.get("/community/feed")
    assert response.status_code == 200
    assert "NUSER-PRIVATE" not in response.text
    assert all("user_id" not in post for post in response.json())
    assert client.get("/community/groups/invalid/feed").status_code == 422
    assert client.post("/community/posts/invalid/interact", json={"action": "like"}).status_code == 422
    assert client.post("/community/posts", json={"content": ""}).status_code == 422
    assert client.post("/community/posts/65f000000000000000000001/interact", json={"action": "admin"}).status_code == 422


def test_community_database_outage_is_503_and_never_a_successful_empty_feed():
    from app.routes.general import community
    from pymongo.errors import ServerSelectionTimeoutError
    app = FastAPI()
    app.include_router(community.router, prefix="/community")
    app.dependency_overrides[community.ensure_normal_user] = lambda: USER
    db = SimpleNamespace(community_posts=SimpleNamespace(find=Mock(side_effect=ServerSelectionTimeoutError("private-host"))))
    app.dependency_overrides[community.get_mongo_db] = lambda: db
    response = TestClient(app).get("/community/feed")
    assert response.status_code == 503 and "private-host" not in response.text


@pytest.mark.asyncio
async def test_video_room_ownership_and_utc_conversion_prevent_cross_clinician_cleanup():
    from app.services.counselling_services.counselling_service import CounsellingSessionService
    service = CounsellingSessionService(SimpleNamespace())
    service._get_session = AsyncMock(return_value=SimpleNamespace(counsellor_id="CUSER-OWNER"))
    service.daily.delete_room = AsyncMock()
    with pytest.raises(HTTPException) as failure:
        await service.delete_counselling_room("SESSION-AUDIT", counsellor_id="CUSER-OTHER")
    assert failure.value.status_code == 403
    service.daily.delete_room.assert_not_awaited()
    offset = timezone(timedelta(hours=5, minutes=30))
    assert service._to_utc_aware(datetime(2030, 1, 1, 10, tzinfo=offset)) == datetime(2030, 1, 1, 4, 30, tzinfo=timezone.utc)


@pytest.mark.asyncio
async def test_cancelled_or_unlinked_sessions_cannot_join():
    from app.services.counselling_services.counselling_service import CounsellingSessionService
    session = SimpleNamespace(session_id="SESSION-AUDIT", user_id=USER.user_id, counsellor_id="CUSER-AUDIT")
    db = SimpleNamespace(execute=AsyncMock(return_value=result(first=None)))
    service = CounsellingSessionService(db)
    service._get_session = AsyncMock(return_value=session)
    with pytest.raises(HTTPException) as failure:
        await service.join_user_session(USER, session.session_id)
    assert failure.value.status_code == 403
    assert "confirmed" in db.execute.call_args.args[0].compile().params.values()


@pytest.mark.asyncio
async def test_started_free_appointment_cannot_be_cancelled_and_slot_is_locked():
    slot = SimpleNamespace(start_time=datetime.now(timezone.utc) - timedelta(minutes=1))
    db = SimpleNamespace(execute=AsyncMock(return_value=result(slot)), commit=AsyncMock(), add=Mock())
    appointment = SimpleNamespace(status="confirmed", payment_id=None, availability_slot_id="SLOT-AUDIT")
    with pytest.raises(HTTPException) as failure:
        await cancel_appointment_logic(db, appointment)
    assert failure.value.status_code == 409 and appointment.status == "confirmed"
    assert db.execute.call_args.args[0]._for_update_arg is not None
    db.commit.assert_not_awaited()


@pytest.mark.asyncio
async def test_expired_session_cannot_join_despite_confirmed_appointment():
    from app.services.counselling_services.counselling_service import CounsellingSessionService
    session = SimpleNamespace(session_id="SESSION-AUDIT", user_id=USER.user_id, counsellor_id="CUSER-AUDIT",
        session_scheduled_at=datetime.now(timezone.utc) - timedelta(hours=2),
        session_expires_at=datetime.now(timezone.utc) - timedelta(hours=1),
        video_session_completed=False, session_room_deleted=False)
    db = SimpleNamespace(execute=AsyncMock(return_value=result(first=("APPOINTMENT-AUDIT",))))
    service = CounsellingSessionService(db)
    service._get_session = AsyncMock(return_value=session)
    with pytest.raises(HTTPException) as failure:
        await service.join_user_session(USER, session.session_id)
    assert failure.value.status_code == 403

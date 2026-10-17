"""Production data regressions. Synthetic fixtures are confined to disposable audit databases."""
import asyncio
from datetime import datetime, timedelta, timezone
from io import StringIO
import os
from types import SimpleNamespace
from unittest.mock import AsyncMock

import pytest
from alembic import command
from alembic.config import Config
from bson import ObjectId
from fastapi import FastAPI
from fastapi.testclient import TestClient
from motor.motor_asyncio import AsyncIOMotorClient
from pydantic import ValidationError
from pymongo.errors import OperationFailure, ServerSelectionTimeoutError
from sqlalchemy import create_engine, text
from sqlalchemy.engine import make_url
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session, configure_mappers
from sqlalchemy.ext.asyncio import async_sessionmaker, create_async_engine

from app.database.mongo_schema import SCHEMAS, SCHEMA_VERSION, provision_mongo
from app.database.postgres import Base, POSTGRES_SYNC_URL, database_urls
from app.models import Appointment, Counsellor, CounsellorAvailability, CounsellingSession, NormalUser
from app.routes.general import contact, exercises
from app.routes.normal_user import tracking
from app.schemas.normal_users_schemas import NormalUserBase
from app.schemas.tracking_schemas import MoodCreate, SleepCreate

DATABASE_TESTS = os.environ.get("SARVUDAY_RUN_DATABASE_TESTS") == "1"
integration = pytest.mark.skipif(not DATABASE_TESTS, reason="Enable disposable local database tests explicitly")
USER = SimpleNamespace(user_id="AUDIT-USER", name="Audit Fixture")


def test_complete_model_registry_and_offline_migrations():
    configure_mappers()
    assert len(Base.metadata.tables) == 13
    output = StringIO()
    command.upgrade(Config("alembic.ini", output_buffer=output), "head", sql=True)
    sql = output.getvalue()
    assert "CREATE TABLE prescriptions" in sql
    assert "uq_appointment_active_slot" in sql
    assert "WHERE status IN ('pending', 'confirmed')" in sql
    assert "ALTER COLUMN payment_id DROP NOT NULL" in sql
    assert "20261016_0002" in sql
    assert "INSERT INTO normal_users" not in sql


def test_postgres_url_preserves_tls_and_supported_options():
    async_url, sync_url, arguments = database_urls(
        "postgresql://audit:pass@localhost/db?sslmode=verify-full&application_name=audit&command_timeout=4"
    )
    assert arguments["ssl"] == "verify-full"
    assert arguments["server_settings"]["application_name"] == "audit"
    assert "statement_timeout" not in arguments["server_settings"]
    assert async_url.query["command_timeout"] == "4"
    assert sync_url.query["sslmode"] == "verify-full"


@pytest.mark.parametrize("payload", [{"moodIndex": -1}, {"moodIndex": 5}, {"moodIndex": 2, "anxiety_level": 11}])
def test_invalid_mood_scales_are_rejected(payload):
    with pytest.raises(ValidationError):
        MoodCreate(**payload)


@pytest.mark.parametrize("payload", [{}, {"duration_hours": -1}, {"duration_hours": 25},
                                    {"duration_hours": float("nan")},
                                    {"duration_hours": 2, "deep_sleep_hours": 3}])
def test_sleep_requires_real_valid_measurements(payload):
    with pytest.raises(ValidationError):
        SleepCreate(**payload)


def test_optional_measurements_are_not_invented():
    assert MoodCreate(moodIndex=0).energy_level is None
    assert MoodCreate(moodIndex=0).anxiety_level is None
    assert SleepCreate(duration_hours=0).deep_sleep_hours is None


def test_correlation_empty_and_sparse_records_do_not_fill_missing_days():
    assert tracking.correlate_records([], []) == ([], [], None)
    points, pairs, coefficient = tracking.correlate_records(
        [{"date": "2026-10-01", "duration_hours": 5}], [])
    assert points == [{"date": "2026-10-01", "day": "Thu", "sleep": 5, "mood": None}]
    assert pairs == [] and coefficient is None


def test_correlation_uses_real_matched_values_and_constant_data_is_not_a_trend():
    days = [datetime(2026, 10, day, tzinfo=timezone.utc) for day in range(1, 4)]
    sleeps = [{"date": day.date().isoformat(), "duration_hours": 4 + i} for i, day in enumerate(days)]
    moods = [{"created_at": day, "mood": str(i)} for i, day in enumerate(days)]
    assert tracking.correlate_records(sleeps, moods)[2] == 1.0
    assert tracking.correlate_records(sleeps, [{**mood, "mood": "2"} for mood in moods])[2] is None


def test_object_id_errors_are_explicit():
    with pytest.raises(Exception) as error:
        tracking.object_id("not-an-object-id")
    assert error.value.status_code == 422


def test_contact_waits_for_persistence_and_reports_database_outages():
    app = FastAPI()
    app.include_router(contact.router, prefix="/contact")
    collection = SimpleNamespace(insert_one=AsyncMock(return_value=SimpleNamespace(inserted_id=ObjectId())))
    app.dependency_overrides[contact.get_mongo_db] = lambda: SimpleNamespace(contact_submissions=collection)
    client = TestClient(app)
    payload = {"name": "Audit", "email": "audit@example.com", "subject": "Test", "message": "Fixture"}
    assert client.post("/contact", json=payload).status_code == 201
    assert collection.insert_one.await_count == 1
    collection.insert_one.side_effect = ServerSelectionTimeoutError("test-only outage")
    response = client.post("/contact", json=payload)
    assert response.status_code == 503
    assert "test-only outage" not in response.text


def test_biofeedback_missing_data_returns_null_instead_of_vitals():
    db = SimpleNamespace(biofeedback_telemetry=SimpleNamespace(find_one=AsyncMock(return_value=None)))
    result = asyncio.run(tracking.get_biofeedback(USER, db))
    assert result["status"] == "no_data"
    assert result["hrv"] is None
    assert result["heart_rate"] is None
    assert result["daily_steps"] is None
    assert result["calmness_trend"] == []


@pytest.fixture(scope="session")
def postgres_database():
    if not DATABASE_TESTS:
        pytest.skip("Local integration tests disabled")
    target = make_url(POSTGRES_SYNC_URL)
    assert target.host == "127.0.0.1" and target.port == 55439 and target.database == "sarvuday_audit"
    engine = create_engine(target)
    with engine.begin() as connection:
        # This reserved local database belongs exclusively to this test run.
        connection.execute(text("DROP SCHEMA public CASCADE"))
        connection.execute(text("CREATE SCHEMA public"))
    config = Config("alembic.ini")
    command.upgrade(config, "20261016_0001")
    with engine.begin() as connection:
        connection.execute(text("""INSERT INTO normal_users (user_id, email, name, preferred_languages,
                                   user_type, is_email_verified, is_phone_verified, terms_accepted,
                                   privacy_policy_accepted, total_sessions_attended)
                                   VALUES ('AUDIT-LEGACY', 'audit@example.com', 'Fixture', 'English, Hindi',
                                   'normal_user', false, false, false, false, 0)"""))
    command.upgrade(config, "head")
    command.check(config)
    with engine.connect() as connection:
        assert connection.execute(text("SELECT preferred_languages FROM normal_users WHERE user_id='AUDIT-LEGACY'")).scalar_one() == ["English", "Hindi"]
    yield engine
    engine.dispose()


@integration
def test_live_migrations_and_profile_json(postgres_database):
    with Session(postgres_database) as session:
        profile = session.get(NormalUser, "AUDIT-LEGACY")
        assert NormalUserBase.model_validate(profile).preferred_languages == ["English", "Hindi"]
        assert profile.email == "audit@example.com"


@integration
def test_live_booking_uniqueness_and_positive_slot_duration(postgres_database):
    with postgres_database.connect() as connection:
        outer = connection.begin()
        session = Session(bind=connection, join_transaction_mode="create_savepoint")
        try:
            user = NormalUser(user_id="AUDIT-U", name="Fixture", email=None)
            counsellor = Counsellor(user_id="AUDIT-C", name="Fixture", email=None, languages=["Hindi"])
            session.add_all([user, counsellor])
            session.flush()
            start = datetime(2030, 1, 1, 10)
            slot = CounsellorAvailability(availability_slot_id="AUDIT-SLOT", counsellor_id=counsellor.user_id,
                                         start_time=start, end_time=start + timedelta(hours=1))
            session.add(slot)
            session.flush()
            for idx in range(3):
                session.add(CounsellingSession(session_id=f"AUDIT-CS-{idx}", user_id=user.user_id,
                    counsellor_id=counsellor.user_id, video_url="https://example.invalid", user_token="test",
                    counsellor_token="test", room_created_at=start, session_scheduled_at=start))
            session.flush()
            base = dict(user_id=user.user_id, counsellor_id=counsellor.user_id, availability_slot_id=slot.availability_slot_id, payment_id=None)
            session.add(Appointment(appointment_id="AUDIT-APT-1", session_id="AUDIT-CS-0", status="confirmed", **base))
            session.flush()
            # Cancellation history may share a slot, but a second active booking cannot.
            session.add(Appointment(appointment_id="AUDIT-APT-2", session_id="AUDIT-CS-1", status="cancelled", **base))
            session.flush()
            with pytest.raises(IntegrityError):
                with session.begin_nested():
                    session.add(Appointment(appointment_id="AUDIT-APT-3", session_id="AUDIT-CS-2", status="pending", **base))
                    session.flush()
            with pytest.raises(IntegrityError):
                with session.begin_nested():
                    session.add(CounsellorAvailability(availability_slot_id="AUDIT-INVALID",
                        counsellor_id=counsellor.user_id, start_time=start, end_time=start - timedelta(hours=1)))
                    session.flush()
        finally:
            session.close()
            outer.rollback()


@integration
def test_live_prescriptions_and_dashboard_queries(postgres_database):
    async def exercise():
        from app.services.counsellor.counsellor_management_service import CounsellorManagementService
        from app.services.normal_user.user_management_service import UserManagementService
        from app.services.prescriptions.prescription_service import PrescriptionService
        from app.schemas.prescription_schemas import PrescriptionCreate
        engine = create_async_engine(POSTGRES_SYNC_URL.set(drivername="postgresql+asyncpg"))
        try:
            async with async_sessionmaker(engine, expire_on_commit=False)() as session:
                session.add_all([NormalUser(user_id="AUDIT-PATIENT", name="Fixture"),
                                 Counsellor(user_id="AUDIT-THERAPIST", name="Fixture", languages=["Hindi"])])
                await session.flush()
                start = datetime(2026, 1, 1)
                session.add(CounsellingSession(session_id="AUDIT-COMPLETE", user_id="AUDIT-PATIENT",
                    counsellor_id="AUDIT-THERAPIST", video_url="https://example.invalid", user_token="test",
                    counsellor_token="test", room_created_at=start, session_scheduled_at=start,
                    video_session_completed=True, rating=4))
                await session.commit()
                result = await PrescriptionService(session).create_prescription("AUDIT-THERAPIST", PrescriptionCreate(
                    session_id="AUDIT-COMPLETE", user_id="AUDIT-PATIENT", diagnosis="Test fixture",
                    medications=[], recommendations=[]))
                assert result.prescription_id.startswith("PRE-") and result.diagnosis == "Test fixture"
                fetched = await PrescriptionService(session).get_user_prescriptions("AUDIT-PATIENT", "AUDIT-THERAPIST")
                assert fetched.total_count == 1
                counsellor = await CounsellorManagementService(session).get_dashboard_data("AUDIT-THERAPIST")
                assert counsellor.average_rating == 4 and counsellor.revenue == 0
                patient = await UserManagementService(session).get_dashboard_overview("AUDIT-PATIENT")
                assert patient.total_sessions == 1 and patient.last_active is None
                with pytest.raises(Exception) as failure:
                    await PrescriptionService(session).create_prescription("AUDIT-THERAPIST", PrescriptionCreate(
                        session_id="AUDIT-COMPLETE", user_id="AUDIT-OTHER", diagnosis="Test fixture",
                        medications=[], recommendations=[]))
                assert failure.value.status_code == 404
        finally:
            await engine.dispose()
    asyncio.run(exercise())


@integration
def test_live_mongo_validators_empty_reads_and_atomic_progress():
    async def exercise():
        # The URI and database are fixed here to prevent targeting a developer DB.
        client = AsyncIOMotorClient("mongodb://127.0.0.1:57029", serverSelectionTimeoutMS=3000, tz_aware=True)
        db = client["sarvuday_audit"]
        try:
            await client.drop_database("sarvuday_audit")
            await provision_mongo(db)
            assert (await db["_schema_versions"].find_one({"_id": "application"}))["version"] == SCHEMA_VERSION
            for name in SCHEMAS:
                assert await db[name].count_documents({}) == 0
            assert await tracking.get_goals(50, 0, USER, db) == []
            assert await db.user_goals.count_documents({}) == 0
            assert await exercises.get_exercises(50, 0, db) == []
            with pytest.raises(OperationFailure):
                await db.sleep_tracking.insert_one({"user_id": USER.user_id, "date": "2026-10-16", "duration_hours": 99,
                                                    "created_at": datetime.now(timezone.utc)})
            with pytest.raises(OperationFailure):
                await db.mood_tracking.insert_one({"user_id": USER.user_id, "mood": "5",
                                                   "created_at": datetime.now(timezone.utc)})
            goal = await tracking.create_goal(tracking.GoalCreate(title="Audit goal", progress_total=3), USER, db)
            await asyncio.gather(*(tracking.increment_goal(goal["id"], USER, db) for _ in range(10)))
            stored = await db.user_goals.find_one({"_id": ObjectId(goal["id"])})
            assert stored["progress_current"] == 3 and stored["streak"] == 1
            medication = await tracking.add_medication(tracking.MedicationCreate(name="Audit fixture"), USER, db)
            await asyncio.gather(*(tracking.toggle_medication(medication["id"], USER, db) for _ in range(10)))
            stored = await db.user_medications.find_one({"_id": ObjectId(medication["id"])})
            assert stored["is_taken"] is False
            with pytest.raises(Exception) as error:
                await tracking.increment_goal(goal["id"], SimpleNamespace(user_id="AUDIT-OTHER"), db)
            assert error.value.status_code == 404
            await db.biofeedback_telemetry.insert_one({"user_id": USER.user_id, "timestamp": datetime.now(timezone.utc),
                                                      "source": "audit-device", "heart_rate": 65})
            biofeedback = await tracking.get_biofeedback(USER, db)
            assert biofeedback["heart_rate"] == 65 and biofeedback["hrv"] is None
            from app.routes.ai import CrisisInput, trigger_crisis_alert
            alert = await trigger_crisis_alert(CrisisInput(), USER, db)
            assert alert["crisis_logged"] is True
            assert (await db.crisis_logs.find_one({"user_id": USER.user_id}))["risk_level"] == "manual"
            await provision_mongo(db)  # Idempotent and does not change feature records.
            assert await db.user_goals.count_documents({}) == 1
        finally:
            client.close()
    asyncio.run(exercise())


@integration
def test_live_availability_serializes_concurrent_writes_and_booking_timestamps(postgres_database):
    async def exercise():
        from unittest.mock import AsyncMock, patch
        from app.models import CounsellorAvailability
        from app.schemas import AddAvailabilitySlot, UpdateAvailabilitySlot, CreateAppointmentRequest
        from app.services.availability.availability_service import CounsellorAvailabilityService
        from app.services.appointments.appointment_service import AppointmentService
        from app.services.counselling_services.counselling_service import CounsellingSessionService
        engine = create_async_engine(POSTGRES_SYNC_URL.set(drivername="postgresql+asyncpg"))
        sessions = async_sessionmaker(engine, expire_on_commit=False)
        try:
            async with sessions() as db:
                db.add_all([NormalUser(user_id="NUSER-BOOKING", name="Fixture"),
                            Counsellor(user_id="CUSER-BOOKING", name="Fixture", is_approved=True,
                                       is_phone_verified=True, session_fee=0)])
                await db.commit()
            offset = timezone(timedelta(hours=5, minutes=30))
            start = datetime(2035, 1, 1, 10, tzinfo=offset)
            async def add():
                async with sessions() as db:
                    try:
                        return await CounsellorAvailabilityService(db).add_availability_slot("CUSER-BOOKING",
                            AddAvailabilitySlot(start_time=start, end_time=start + timedelta(hours=1)))
                    except Exception as exc:
                        await db.rollback()
                        return exc
            results = await asyncio.gather(add(), add())
            succeeded = [value for value in results if not isinstance(value, Exception)]
            rejected = [value for value in results if isinstance(value, Exception)]
            assert len(succeeded) == len(rejected) == 1 and rejected[0].status_code == 409
            slot = succeeded[0]
            assert slot.start_time == datetime(2035, 1, 1, 4, 30, tzinfo=timezone.utc)
            async with sessions() as db:
                other = await CounsellorAvailabilityService(db).add_availability_slot("CUSER-BOOKING",
                    AddAvailabilitySlot(start_time=start + timedelta(hours=1), end_time=start + timedelta(hours=2)))
                with pytest.raises(Exception) as conflict:
                    await CounsellorAvailabilityService(db).update_availability_slot("CUSER-BOOKING", other.availability_slot_id,
                        UpdateAvailabilitySlot(start_time=start + timedelta(minutes=30)))
                assert conflict.value.status_code == 409
                await db.rollback()
            daily = SimpleNamespace(create_room=AsyncMock(return_value={"name": "audit-room", "url": "https://example.invalid/audit"}),
                                    create_token=AsyncMock(return_value="test-only-token"))
            with patch("app.services.counselling_services.counselling_service.DailyService", return_value=daily):
                async with sessions() as db:
                    booked = await AppointmentService(db).book_appointment("NUSER-BOOKING", CreateAppointmentRequest(
                        counsellor_id="CUSER-BOOKING", availability_slot_id=slot.availability_slot_id))
                    assert booked.appointment.payment_id is None
                    stored = await db.get(CounsellingSession, booked.appointment.session.session_id)
                    assert stored.room_created_at.tzinfo is None
                    assert stored.session_scheduled_at == datetime(2035, 1, 1, 4, 30)
                async with sessions() as db:
                    with pytest.raises(Exception) as conflict:
                        await CounsellorAvailabilityService(db).update_availability_slot("CUSER-BOOKING", slot.availability_slot_id,
                            UpdateAvailabilitySlot(notes="Cannot change a booked slot"))
                    assert conflict.value.status_code == 409
                    await db.rollback()
                async with sessions() as db:
                    from app.utils.constants import UserTypeEnum
                    cancelled = await AppointmentService(db).cancel_appointment(UserTypeEnum.normal_user,
                        "NUSER-BOOKING", booked.appointment.appointment_id)
                    assert cancelled.refund_status == "not_required"
                    released = await db.get(CounsellorAvailability, slot.availability_slot_id)
                    assert released.status.value == "available"
                    session_record = await db.get(CounsellingSession, booked.appointment.session.session_id)
                    with pytest.raises(Exception) as forbidden:
                        await CounsellingSessionService(db)._assert_active_appointment(session_record)
                    assert forbidden.value.status_code == 403
        finally:
            await engine.dispose()
    asyncio.run(exercise())


@integration
def test_live_slot_http_datetime_filter_selects_exact_utc_day(postgres_database):
    async def exercise():
        import httpx
        from fastapi import FastAPI
        from app.database import get_db
        from app.routes.normal_user.appointments import router, ensure_normal_user
        engine = create_async_engine(POSTGRES_SYNC_URL.set(drivername="postgresql+asyncpg"))
        sessions = async_sessionmaker(engine, expire_on_commit=False)
        try:
            async with sessions() as db:
                db.add(Counsellor(user_id="CUSER-DATE", name="Date fixture", is_approved=True))
                await db.flush()
                starts = {
                    "AUDIT-DATE-BEFORE": datetime(2035, 12, 31, 23, 30),
                    "AUDIT-DATE-START": datetime(2036, 1, 1, 0, 0),
                    "AUDIT-DATE-LAST": datetime(2036, 1, 1, 23, 30),
                    "AUDIT-DATE-AFTER": datetime(2036, 1, 2, 0, 0),
                }
                db.add_all([CounsellorAvailability(availability_slot_id=identifier,
                    counsellor_id="CUSER-DATE", start_time=start, end_time=start + timedelta(minutes=20))
                    for identifier, start in starts.items()])
                await db.commit()
            app = FastAPI()
            app.include_router(router, prefix="/user")
            app.dependency_overrides[ensure_normal_user] = lambda: SimpleNamespace(user_id="NUSER-AUDIT")
            async def local_session():
                async with sessions() as db:
                    yield db
            app.dependency_overrides[get_db] = local_session
            async with httpx.AsyncClient(transport=httpx.ASGITransport(app=app), base_url="http://audit") as client:
                # The offset case is January 2 locally but January 1 in UTC.
                for value in ("2036-01-01T00:00:00", "2036-01-01T12:00:00Z", "2036-01-02T02:00:00+05:30"):
                    response = await client.get("/user/appointments/slots", params={"counsellor_id": "CUSER-DATE", "date": value})
                    assert response.status_code == 200, response.text
                    assert [slot["availability_slot_id"] for slot in response.json()["slots"]] == ["AUDIT-DATE-START", "AUDIT-DATE-LAST"]
        finally:
            await engine.dispose()
    asyncio.run(exercise())

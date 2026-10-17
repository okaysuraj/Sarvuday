"""Small regression suite against an explicitly disposable, local PostgreSQL DB.

Run through `npm run check`. Provider calls are stubbed; authorization,
transactions, migrations and constraints use the real application and database.
"""

import asyncio
import importlib
import json
import os
import unittest
from datetime import datetime, timedelta, timezone
from decimal import Decimal
from pathlib import Path
from types import SimpleNamespace
from unittest.mock import AsyncMock, patch

from sqlalchemy.engine import make_url

test_url = os.environ.get("SARVUDAY_TEST_DATABASE_URL", "")
if not test_url:
    raise RuntimeError("Use npm run check; a disposable test database is required.")
parsed = make_url(test_url)
if parsed.host not in {"127.0.0.1", "localhost"} or parsed.database != "sarvuday_check":
    raise RuntimeError(
        "Regression checks may only use the local sarvuday_check database."
    )
os.environ.update(
    DATABASE_URL=test_url,
    ENVIRONMENT="test",
    SECRET_KEY="local-test-signing-key-" * 4,
    FIREBASE_PROJECT_ID="local-test",
    FIREBASE_CLIENT_EMAIL="local@example.com",
    FIREBASE_PRIVATE_KEY="unused",
    STRIPE_SECRET_KEY="",
    DAILY_API_KEY="",
    OPENAI_API_KEY="",
    OPENAI_MODEL="gpt-6-luna",
    OPENAI_MAX_OUTPUT_TOKENS="2048",
)

import httpx
import jwt
from alembic import command
from alembic.config import Config
from fastapi import HTTPException
from openai import AsyncOpenAI
from pydantic import SecretStr
from sqlalchemy import create_engine, func, inspect, select, text
from sqlalchemy.exc import IntegrityError

from app.config import settings
from app.database.postgres import Base, POSTGRES_SYNC_URL, async_session, engine
from app.main import app
from app.models import (
    Account,
    Appointment,
    ChatSession,
    ChatTurn,
    Counsellor,
    CounsellorAvailability,
    NormalUser,
)
from app.schemas.appointments_schemas import CreateAppointmentRequest
from app.services.appointments.appointment_service import AppointmentService
from app.services.auth.firebase_auth_service import FirebaseAuthService
from app.services.chatbot.chatbot_service import ChatBotService
from app.services.chatbot import chatbot_inference
from app.services.counselling_services.daily_service import DailyService
from app.services.payments.stripe_service import reconcile_intent
from app.utils.constants import PaymentStatusEnum, UserTypeEnum
from app.utils.oauth import verify_access_token

BACKEND = Path(__file__).resolve().parents[1]


def migration_config():
    return Config(str(BACKEND / "alembic.ini"))


def setUpModule():
    command.upgrade(migration_config(), "head")


def openai_response(text="A supportive reply.", status="completed"):
    return {
        "id": "resp_local",
        "object": "response",
        "created_at": 0,
        "model": "gpt-6-luna",
        "status": status,
        "output": [
            {
                "type": "message",
                "id": "msg_local",
                "role": "assistant",
                "status": "completed",
                "content": [{"type": "output_text", "text": text, "annotations": []}],
            }
        ],
    }


class CriticalDatabaseChecks(unittest.IsolatedAsyncioTestCase):
    async def asyncSetUp(self):
        asyncio.get_running_loop().set_debug(False)
        async with engine.begin() as connection:
            await connection.execute(
                text("TRUNCATE " + ", ".join(Base.metadata.tables) + " CASCADE")
            )
        self.now = datetime.now(timezone.utc)
        self.patient = NormalUser(
            user_id="NUSER-CHECK1",
            name="Local patient",
            email="patient@example.com",
            firebase_uid="local-firebase",
        )
        self.other = NormalUser(
            user_id="NUSER-CHECK2", name="Other patient", email="other@example.com"
        )
        self.counsellor = Counsellor(
            user_id="CUSER-CHECK1",
            name="Local counsellor",
            email="counsellor@example.com",
            is_approved=True,
            session_fee=0,
        )
        async with async_session() as db:
            db.add_all([self.patient, self.other, self.counsellor])
            await db.commit()
            self.tokens = {
                person.user_id: FirebaseAuthService(db)._create_access_token(person)
                for person in (self.patient, self.other, self.counsellor)
            }
            start = (self.now + timedelta(days=1)).replace(tzinfo=None)
            db.add(
                CounsellorAvailability(
                    availability_slot_id="SLOT-CHECK",
                    counsellor_id=self.counsellor.user_id,
                    start_time=start,
                    end_time=start + timedelta(hours=1),
                )
            )
            db.add(ChatSession(session_id="CHAT-CHECK", user_id=self.patient.user_id))
            await db.commit()
        self.api = httpx.AsyncClient(
            transport=httpx.ASGITransport(app=app, raise_app_exceptions=False),
            base_url="http://testserver",
        )

    async def asyncTearDown(self):
        await self.api.aclose()
        await engine.dispose()

    async def request(self, method, path, *, identity="NUSER-CHECK1", **kwargs):
        headers = (
            {"Authorization": "Bearer " + self.tokens[identity]} if identity else {}
        )
        return await self.api.request(method, path, headers=headers, **kwargs)

    async def test_firebase_login_and_role_boundaries(self):
        identity = {
            "uid": "local-firebase",
            "email": self.patient.email,
            "email_verified": True,
        }
        with patch.object(
            FirebaseAuthService, "_verify_firebase_token", return_value=identity
        ):
            response = await self.request(
                "POST",
                "/auth/firebase-login",
                identity=None,
                json={"id_token": "local-provider-token"},
            )
            self.assertEqual(response.status_code, 200, response.text)
            self.assertEqual(
                verify_access_token(response.json()["access_token"])["sub"],
                self.patient.user_id,
            )
            response = await self.request(
                "POST",
                "/auth/firebase-register",
                identity=None,
                json={
                    "id_token": "local-provider-token",
                    "user_type": "admin",
                    "name": "Escalation attempt",
                    "terms_accepted": True,
                    "privacy_policy_accepted": True,
                },
            )
            self.assertEqual(response.status_code, 403)
        async with async_session() as db:
            self.assertEqual(
                (await db.get(Account, self.patient.user_id)).user_type, "normal_user"
            )
        self.assertEqual((await self.request("GET", "/admin/users")).status_code, 403)
        self.assertEqual(
            (
                await self.request("GET", "/user/tracking/mood/history", identity=None)
            ).status_code,
            401,
        )

    async def test_tracking_contract_owner_isolation_and_concurrent_progress(self):
        response = await self.request(
            "POST", "/user/tracking/mood", json={"moodIndex": 2}
        )
        self.assertEqual(response.status_code, 201, response.text)
        records = (await self.request("GET", "/user/tracking/mood/history")).json()
        self.assertEqual(records[0]["mood"], "2")
        self.assertNotIn("user_id", records[0])
        self.assertNotIn("imported_data", records[0])
        self.assertEqual(
            (
                await self.request(
                    "GET",
                    "/normal_user/tracking/mood/history",
                    identity=self.other.user_id,
                )
            ).json(),
            [],
        )
        response = await self.request(
            "POST",
            "/user/tracking/sleep",
            json={"date": "2026-10-18", "duration_hours": 8, "deep_sleep_hours": 2},
        )
        self.assertEqual(response.status_code, 201, response.text)
        self.assertEqual(
            (await self.request("GET", "/user/tracking/sleep")).json()[0]["date"],
            "2026-10-18",
        )
        response = await self.request(
            "POST",
            "/user/tracking/goals",
            json={"title": "Local goal", "progress_total": 2},
        )
        identifier = response.json()["id"]
        path = f"/user/tracking/goals/{identifier}/increment"
        self.assertEqual(
            (
                await self.request("PATCH", path, identity=self.other.user_id)
            ).status_code,
            404,
        )
        responses = await asyncio.gather(
            *(self.request("PATCH", path) for _ in range(6))
        )
        self.assertTrue(all(response.status_code == 200 for response in responses))
        goal = (await self.request("GET", "/user/tracking/goals")).json()[0]
        self.assertEqual((goal["progress_current"], goal["streak"]), (2, 1))

    async def test_booking_has_one_winner_and_cancellation_enforces_ownership(self):
        booking = CreateAppointmentRequest(
            counsellor_id=self.counsellor.user_id, availability_slot_id="SLOT-CHECK"
        )

        async def reserve(user_id):
            async with async_session() as db:
                return await AppointmentService(db).book_appointment(user_id, booking)

        with (
            patch.object(
                DailyService,
                "create_room",
                new=AsyncMock(
                    return_value={
                        "name": "local-room",
                        "url": "https://example.daily.co/local",
                    }
                ),
            ),
            patch.object(
                DailyService,
                "create_token",
                new=AsyncMock(return_value="local-room-token"),
            ),
        ):
            results = await asyncio.gather(
                reserve(self.patient.user_id),
                reserve(self.other.user_id),
                return_exceptions=True,
            )
        winners = [result for result in results if not isinstance(result, Exception)]
        self.assertEqual(len(winners), 1, repr(results))
        failure = next(result for result in results if isinstance(result, Exception))
        self.assertIsInstance(failure, HTTPException)
        self.assertEqual(failure.status_code, 409)
        booked = winners[0].appointment
        foreign_id = (
            self.other.user_id
            if booked.user.user_id == self.patient.user_id
            else self.patient.user_id
        )
        async with async_session() as db:
            with self.assertRaises(HTTPException) as denied:
                await AppointmentService(db).cancel_appointment(
                    UserTypeEnum.normal_user, foreign_id, booked.appointment_id
                )
            self.assertEqual(denied.exception.status_code, 403)
            await db.rollback()
            result = await AppointmentService(db).cancel_appointment(
                UserTypeEnum.normal_user, booked.user.user_id, booked.appointment_id
            )
            self.assertEqual(result.refund_status, "not_required")
            self.assertEqual(
                (await db.get(CounsellorAvailability, "SLOT-CHECK")).status.value,
                "available",
            )

    async def test_paid_booking_requires_payment_before_creating_a_session(self):
        async with async_session() as db:
            counsellor = await db.get(Counsellor, self.counsellor.user_id)
            counsellor.session_fee = 50
            await db.commit()
            with self.assertRaises(HTTPException) as denied:
                await AppointmentService(db).book_appointment(
                    self.patient.user_id,
                    CreateAppointmentRequest(
                        counsellor_id=counsellor.user_id,
                        availability_slot_id="SLOT-CHECK",
                    ),
                )
            self.assertEqual(denied.exception.status_code, 402)
            self.assertEqual(
                await db.scalar(select(func.count()).select_from(Appointment)), 0
            )

    async def test_chat_turns_and_counts_commit_together(self):
        async def save(index):
            async with async_session() as db:
                await ChatBotService(db)._save_conversation(
                    self.patient.user_id,
                    "CHAT-CHECK",
                    f"Input {index}",
                    f"Reply {index}",
                )

        await asyncio.gather(*(save(index) for index in range(4)))
        async with async_session() as db:
            self.assertEqual((await db.get(ChatSession, "CHAT-CHECK")).message_count, 4)
            self.assertEqual(
                list(
                    await db.scalars(
                        select(ChatTurn.position).order_by(ChatTurn.position)
                    )
                ),
                [0, 1, 2, 3],
            )
            with self.assertRaises(IntegrityError):
                await ChatBotService(db)._save_conversation(
                    self.patient.user_id, "CHAT-CHECK", None, "Invalid turn"
                )
            await db.rollback()
            self.assertEqual((await db.get(ChatSession, "CHAT-CHECK")).message_count, 4)
            with self.assertRaises(HTTPException):
                await ChatBotService(db).get_chat_history(
                    self.other.user_id, "CHAT-CHECK"
                )

    async def test_openai_reply_uses_owned_history_and_saves_one_turn(self):
        async with async_session() as db:
            await ChatBotService(db)._save_conversation(
                self.patient.user_id, "CHAT-CHECK", "Earlier input", "Earlier reply"
            )

        def handler(request):
            self.assertEqual(str(request.url), "https://api.openai.com/v1/responses")
            self.assertEqual(request.headers["authorization"], "Bearer sk-local-test")
            body = json.loads(request.content)
            self.assertEqual(body["model"], "gpt-6-luna")
            self.assertIs(body["store"], False)
            self.assertEqual(body["max_output_tokens"], 2048)
            self.assertEqual(body["instructions"], settings.chatbot_system_prompt)
            self.assertEqual(
                body["input"],
                [
                    {"role": "user", "content": "Earlier input"},
                    {"role": "assistant", "content": "Earlier reply"},
                    {"role": "user", "content": "Current input"},
                ],
            )
            return httpx.Response(200, json=openai_response())

        async with AsyncOpenAI(
            api_key="sk-local-test",
            http_client=httpx.AsyncClient(transport=httpx.MockTransport(handler)),
            max_retries=0,
        ) as client:
            with (
                patch.object(chatbot_inference, "_client", client),
                patch.object(settings, "openai_api_key", SecretStr("sk-local-test")),
            ):
                response = await self.request(
                    "POST",
                    "/ai/chat",
                    json={"session_id": "CHAT-CHECK", "message": "Current input"},
                )
        self.assertEqual(response.status_code, 200, response.text)
        self.assertEqual(response.json()["reply"], "A supportive reply.")
        async with async_session() as db:
            self.assertEqual((await db.get(ChatSession, "CHAT-CHECK")).message_count, 2)
            rows = list(await db.scalars(select(ChatTurn).order_by(ChatTurn.position)))
            self.assertEqual(rows[-1].assistant_response, "A supportive reply.")

    async def test_openai_stream_persists_only_after_successful_completion(self):
        for ending in ("completed", "failed", "incomplete", "disconnected"):
            with self.subTest(ending=ending):
                events = [
                    {"type": "response.output_text.delta", "delta": "A streamed reply."}
                ]
                if ending != "disconnected":
                    events.append(
                        {
                            "type": "response." + ending,
                            "response": openai_response(status=ending),
                        }
                    )
                payload = "".join(
                    "data: " + json.dumps(event) + "\n\n" for event in events
                )
                provider_response = httpx.Response(
                    200, headers={"Content-Type": "text/event-stream"}, content=payload
                )
                async with (
                    AsyncOpenAI(
                        api_key="sk-local-test",
                        http_client=httpx.AsyncClient(
                            transport=httpx.MockTransport(lambda _: provider_response)
                        ),
                        max_retries=0,
                    ) as client,
                    async_session() as db,
                ):
                    service = ChatBotService(db)
                    session = await service.create_session(self.patient.user_id, None)
                    with (
                        patch.object(chatbot_inference, "_client", client),
                        patch.object(
                            settings, "openai_api_key", SecretStr("sk-local-test")
                        ),
                    ):

                        async def collect():
                            return "".join(
                                [
                                    chunk
                                    async for chunk in service.stream_chat_inference(
                                        self.patient.user_id,
                                        session.session_id,
                                        "Current input",
                                    )
                                ]
                            )

                        if ending == "completed":
                            self.assertEqual(await collect(), "A streamed reply.")
                        else:
                            with self.assertRaises(HTTPException) as denied:
                                await collect()
                            self.assertEqual(denied.exception.status_code, 503)
                    self.assertTrue(provider_response.is_closed)
                    stored = await db.get(ChatSession, session.session_id)
                    self.assertEqual(stored.message_count, int(ending == "completed"))

    async def test_openai_provider_errors_and_incomplete_replies_are_not_saved(self):
        cases = [
            httpx.Response(
                401,
                json={
                    "error": {
                        "message": "Private provider detail",
                        "type": "invalid_api_key",
                    }
                },
            ),
            httpx.Response(
                429,
                json={
                    "error": {
                        "message": "Private quota detail",
                        "type": "insufficient_quota",
                    }
                },
            ),
            httpx.Response(200, json=openai_response(status="incomplete")),
            httpx.Response(200, json=openai_response(text="")),
        ]
        for provider_response in cases:
            with self.subTest(status=provider_response.status_code):
                async with AsyncOpenAI(
                    api_key="sk-local-test",
                    http_client=httpx.AsyncClient(
                        transport=httpx.MockTransport(lambda _: provider_response)
                    ),
                    max_retries=0,
                ) as client:
                    with (
                        patch.object(chatbot_inference, "_client", client),
                        patch.object(
                            settings, "openai_api_key", SecretStr("sk-local-test")
                        ),
                    ):
                        response = await self.request(
                            "POST",
                            "/user/chatbot/inference/CHAT-CHECK",
                            json={"user_input": "Current input"},
                        )
                self.assertEqual(response.status_code, 503, response.text)
                self.assertEqual(
                    response.json()["detail"], chatbot_inference.UNAVAILABLE_MESSAGE
                )
        async with async_session() as db:
            self.assertEqual((await db.get(ChatSession, "CHAT-CHECK")).message_count, 0)
            self.assertEqual(
                await db.scalar(select(func.count()).select_from(ChatTurn)), 0
            )

    async def test_missing_openai_key_returns_503_before_stream_headers(self):
        with patch.object(settings, "openai_api_key", SecretStr("")):
            response = await self.request(
                "POST",
                "/user/chatbot/inference/stream/CHAT-CHECK",
                json={"user_input": "Current input"},
            )
            self.assertEqual(response.status_code, 503, response.text)
            self.assertEqual(
                response.json()["detail"], chatbot_inference.UNAVAILABLE_MESSAGE
            )


class MigrationChecks(unittest.TestCase):
    def test_metadata_matches_migrations(self):
        command.check(migration_config())

    def test_retired_auth_fields_reject_nonempty_values_without_partial_drops(self):
        command.downgrade(migration_config(), "20261017_0003")
        sync = create_engine(POSTGRES_SYNC_URL)
        try:
            with sync.begin() as connection:
                connection.execute(
                    text(
                        "INSERT INTO normal_users (user_id, name, hashed_password) VALUES ('NUSER-LEGACY', 'Local guard fixture', 'retired-fixture')"
                    )
                )
            with self.assertRaisesRegex(RuntimeError, "legacy authentication values"):
                command.upgrade(migration_config(), "head")
            with sync.connect() as connection:
                self.assertEqual(
                    connection.scalar(text("SELECT version_num FROM alembic_version")),
                    "20261017_0003",
                )
                for table in ("normal_users", "counsellors", "admins"):
                    self.assertIn(
                        "hashed_password",
                        {
                            column["name"]
                            for column in inspect(connection).get_columns(table)
                        },
                    )
            with sync.begin() as connection:
                connection.execute(
                    text(
                        "UPDATE normal_users SET hashed_password = NULL WHERE user_id = 'NUSER-LEGACY'"
                    )
                )
            command.upgrade(migration_config(), "head")
            command.check(migration_config())
        finally:
            sync.dispose()


class PaymentAndTokenChecks(unittest.TestCase):
    def payment(self):
        return SimpleNamespace(
            payment_id="PAY-LOCAL",
            user_id="NUSER-LOCAL",
            transaction_id="pi_local",
            amount=Decimal("50.00"),
            currency="INR",
            status=PaymentStatusEnum.pending,
            refunded=False,
            payment_response={
                "availability_slot_id": "SLOT-LOCAL",
                "counsellor_id": "CUSER-LOCAL",
            },
        )

    def intent(self):
        return {
            "id": "pi_local",
            "status": "succeeded",
            "amount_received": 5000,
            "currency": "inr",
            "metadata": {
                "payment_id": "PAY-LOCAL",
                "user_id": "NUSER-LOCAL",
                "availability_slot_id": "SLOT-LOCAL",
                "counsellor_id": "CUSER-LOCAL",
            },
            "latest_charge": {
                "payment_intent": "pi_local",
                "paid": True,
                "refunded": False,
                "disputed": False,
                "amount_refunded": 0,
            },
        }

    def test_provider_confirmation_rejects_wrong_amount_identity_and_reversed_charges(
        self,
    ):
        cases = [
            {"amount_received": 4999},
            {"status": "processing"},
            {"currency": "usd"},
            {"id": "pi_other"},
            {"metadata": {}},
            {"latest_charge": None},
            {
                "latest_charge": {
                    "payment_intent": "pi_local",
                    "paid": True,
                    "refunded": True,
                }
            },
        ]
        for changes in cases:
            with self.subTest(changes=changes), self.assertRaises(HTTPException):
                reconcile_intent(
                    self.payment(),
                    {**self.intent(), **changes},
                    require_unreversed_charge=True,
                )
        payment = self.payment()
        reconcile_intent(payment, self.intent(), require_unreversed_charge=True)
        self.assertEqual(payment.status, PaymentStatusEnum.completed)

    def test_api_tokens_reject_expired_forged_and_missing_claims(self):
        now = datetime.now(timezone.utc)
        valid = {
            "sub": "NUSER-LOCAL",
            "user_type": "normal_user",
            "exp": now + timedelta(minutes=1),
        }
        self.assertEqual(
            verify_access_token(
                jwt.encode(valid, settings.secret_key, algorithm=settings.algorithm)
            )["sub"],
            "NUSER-LOCAL",
        )
        cases = [
            (valid, "other-signing-key-" * 4),
            ({**valid, "exp": now - timedelta(seconds=1)}, settings.secret_key),
            ({"sub": "NUSER-LOCAL", "exp": valid["exp"]}, settings.secret_key),
        ]
        for claims, key in cases:
            with (
                self.subTest(claims=list(claims)),
                self.assertRaises(jwt.InvalidTokenError),
            ):
                verify_access_token(
                    jwt.encode(claims, key, algorithm=settings.algorithm)
                )

    def test_all_backend_modules_import(self):
        for path in (BACKEND / "app").rglob("*.py"):
            parts = path.relative_to(BACKEND).with_suffix("").parts
            name = ".".join(parts[:-1] if parts[-1] == "__init__" else parts)
            with self.subTest(module=name):
                importlib.import_module(name)

"""Validate a portable JSON archive; commit only when --apply is supplied."""

import argparse
import hashlib
import json
import math
import sys
from datetime import date, datetime
from decimal import Decimal, InvalidOperation
from pathlib import Path

from app.config import settings
from app.database.postgres import POSTGRES_SYNC_URL, set_transaction_timeouts
from app.models import (
    AssessmentQuestion,
    AssessmentResult,
    BiofeedbackTelemetry,
    ChatSession,
    ChatTurn,
    CommunityPost,
    ContactSubmission,
    CounsellorReview,
    CrisisLog,
    Disorder,
    Exercise,
    ExerciseProgress,
    FlaggedContent,
    JournalEntry,
    MoodTracking,
    SleepTracking,
    SupportGroup,
    UserGoal,
    UserMedication,
    UserWallet,
)
from app.schemas.assessments_schemas import QuestionSchema
from app.schemas.disorders_schemas import DisorderBase
from sqlalchemy import (
    Boolean,
    Date,
    DateTime,
    Float,
    Integer,
    Numeric,
    String,
    create_engine,
    select,
    text,
)
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.orm import Session

# Dependency order matters: groups and exercises must exist before their children.
MODELS = (
    AssessmentQuestion,
    Disorder,
    Exercise,
    SupportGroup,
    MoodTracking,
    JournalEntry,
    SleepTracking,
    UserMedication,
    UserGoal,
    BiofeedbackTelemetry,
    AssessmentResult,
    CommunityPost,
    CounsellorReview,
    CrisisLog,
    FlaggedContent,
    ContactSubmission,
    UserWallet,
    ExerciseProgress,
    ChatTurn,
)
TABLES = {model.__tablename__: model for model in MODELS}
ARRAY_FIELDS = {
    "emotions",
    "triggers",
    "calmness_trend",
    "symptoms",
    "preventions",
    "treatments",
    "instructions",
    "tags",
    "options",
}


class ArchiveError(ValueError):
    """A reconciliation failure safe to show without patient records or credentials."""


def convert_value(column, value):
    """Reject lossy coercions before sending an archive value to PostgreSQL."""
    if value is None:
        if not column.nullable:
            raise ArchiveError(f"{column.name}: null is not allowed")
        return None
    kind = column.type
    if isinstance(kind, Boolean):
        valid = isinstance(value, bool)
    elif isinstance(kind, Integer):
        valid = isinstance(value, int) and not isinstance(value, bool)
    elif isinstance(kind, Float):
        valid = (
            isinstance(value, (int, float))
            and not isinstance(value, bool)
            and math.isfinite(value)
        )
    elif isinstance(kind, Numeric):
        try:
            amount = Decimal(str(value))
            if not amount.is_finite() or amount != amount.quantize(
                Decimal(1).scaleb(-kind.scale)
            ):
                raise ArchiveError(
                    f"{column.name}: money must have at most {kind.scale} decimal places"
                )
            return amount
        except (ValueError, InvalidOperation) as exc:
            raise ArchiveError(f"{column.name}: invalid amount") from exc
    elif isinstance(kind, DateTime):
        try:
            parsed = datetime.fromisoformat(value.replace("Z", "+00:00"))
            if parsed.tzinfo is None:
                raise ValueError("Timezone required")
            return parsed
        except (ValueError, TypeError, AttributeError) as exc:
            raise ArchiveError(
                f"{column.name}: use an ISO timestamp with a timezone"
            ) from exc
    elif isinstance(kind, Date):
        try:
            return date.fromisoformat(value)
        except (ValueError, TypeError) as exc:
            raise ArchiveError(f"{column.name}: invalid ISO date") from exc
    elif isinstance(kind, String):
        valid = isinstance(value, str) and (
            kind.length is None or len(value) <= kind.length
        )
    else:
        valid = (
            isinstance(value, list)
            if column.name in ARRAY_FIELDS
            else isinstance(value, dict)
        )
    if not valid:
        raise ArchiveError(f"{column.name}: invalid value type or length")
    return value


def validate_row(model, raw):
    if not isinstance(raw, dict):
        raise ArchiveError("Each line must contain one JSON object")
    columns = model.__table__.columns
    if set(raw) - set(columns.keys()):
        raise ArchiveError("Unknown fields must be retained inside imported_data")
    if not isinstance(raw.get("id"), str) or not raw["id"]:
        raise ArchiveError("Every imported record needs its original opaque id")
    row = {name: convert_value(columns[name], value) for name, value in raw.items()}
    for column in columns:
        if (
            not column.nullable
            and column.default is None
            and column.server_default is None
            and column.name not in row
        ):
            raise ArchiveError(f"{column.name}: required field is missing")
    # Validate nested published content too; a database JSON array alone cannot
    # guarantee that clients receive complete questions and disorder entries.
    try:
        if model is AssessmentQuestion:
            QuestionSchema(
                id=row["question_id"],
                questionType=row["question_type"],
                question=row["question"],
                options=row["options"],
            )
        elif model is Disorder:
            DisorderBase.model_validate(row)
    except ValueError as exc:
        raise ArchiveError(
            "Published content does not match its response schema"
        ) from exc
    return row


def archive_files(directory):
    manifest_path = directory / "manifest.json"
    manifest = json.loads(manifest_path.read_text(encoding="utf-8-sig"))
    if manifest.get("format_version") != 1 or not isinstance(
        manifest.get("tables"), dict
    ):
        raise ArchiveError("Unsupported archive manifest")
    entries = manifest["tables"]
    if set(entries) - (set(TABLES) | {"chat_sessions"}):
        raise ArchiveError(
            "Archive contains an unknown table; review its mapping first"
        )
    result = {}
    for name, entry in entries.items():
        path = (directory / entry["file"]).resolve()
        if path.parent != directory.resolve() or not path.is_file():
            raise ArchiveError(
                f"{name}: archive file must be inside the archive directory"
            )
        if type(entry.get("count")) is not int or entry["count"] < 0:
            raise ArchiveError(f"{name}: invalid expected count")
        with path.open("rb") as source:
            digest = hashlib.file_digest(source, "sha256").hexdigest()
        if digest != entry.get("sha256"):
            raise ArchiveError(f"{name}: file checksum differs from the manifest")
        result[name] = (path, entry["count"])
    return result


def rows_from_file(path):
    with path.open(encoding="utf-8-sig") as source:
        for number, line in enumerate(source, 1):
            try:
                yield number, json.loads(line)
            except ValueError as exc:
                raise ArchiveError(f"Line {number}: invalid JSON") from exc


def import_chat_metadata(session, raw):
    if set(raw) != {"session_id", "user_id", "imported_data"} or not isinstance(
        raw["imported_data"], dict
    ):
        raise ArchiveError(
            "Chat metadata requires session_id, user_id and imported_data"
        )
    row = session.get(ChatSession, raw["session_id"])
    if row is None or row.user_id != raw["user_id"]:
        raise ArchiveError("Chat history has no matching owned session")
    if row.imported_data and row.imported_data != raw["imported_data"]:
        raise ArchiveError("Existing session import metadata differs")
    changed = row.imported_data != raw["imported_data"]
    row.imported_data = raw["imported_data"]
    return changed


def import_archive(directory, *, apply=False):
    files = archive_files(directory)
    engine = create_engine(POSTGRES_SYNC_URL, hide_parameters=True)
    report = {}
    context = "archive"
    try:
        with Session(engine, expire_on_commit=False) as session:
            # Serialize imports and block writes to the affected tables while
            # validating. Readers can continue; cutover still needs paused writers.
            set_transaction_timeouts(
                session.connection(),
                statement_timeout_ms=settings.database_statement_timeout_ms,
                lock_timeout_ms=5000,
            )
            session.execute(text("SELECT pg_advisory_xact_lock(77261017)"))
            if files:
                tables = ", ".join(sorted(files))  # names checked against the allowlist
                session.execute(
                    text(f"LOCK TABLE {tables} IN SHARE ROW EXCLUSIVE MODE")
                )
            ordered = [*TABLES, "chat_sessions"]
            touched_sessions = set()
            metadata_sessions = set()
            for name in ordered:
                if name not in files:
                    continue
                path, expected = files[name]
                seen = set()
                new = unchanged = 0
                for number, raw in rows_from_file(path):
                    context = f"{name}, line {number}"
                    if not isinstance(raw, dict):
                        raise ArchiveError("Each line must contain a JSON object")
                    identifier = (
                        raw.get("session_id")
                        if name == "chat_sessions"
                        else raw.get("id")
                    )
                    if not isinstance(identifier, str) or identifier in seen:
                        raise ArchiveError("Missing or duplicate record identity")
                    seen.add(identifier)
                    if name == "chat_sessions":
                        changed = import_chat_metadata(session, raw)
                        touched_sessions.add(identifier)
                        metadata_sessions.add(identifier)
                    else:
                        model = TABLES[name]
                        values = validate_row(model, raw)
                        row = session.get(model, identifier)
                        changed = row is None
                        if changed:
                            if model is CounsellorReview and values.get(
                                "verified_appointment"
                            ):
                                from app.models import Appointment
                                from app.utils.constants import AppointmentStatusEnum

                                appointment = session.get(
                                    Appointment, values["appointment_id"]
                                )
                                if (
                                    appointment is None
                                    or appointment.status
                                    != AppointmentStatusEnum.completed
                                ):
                                    raise ArchiveError(
                                        "Verified review requires a completed appointment"
                                    )
                            session.add(model(**values))
                        elif any(
                            getattr(row, key) != value for key, value in values.items()
                        ):
                            raise ArchiveError(
                                "Existing record differs; no data was overwritten"
                            )
                        if model is ChatTurn:
                            touched_sessions.add(values["session_id"])
                    session.flush()  # Foreign keys and checks are part of preview.
                    new += int(changed)
                    unchanged += int(not changed)
                if len(seen) != expected:
                    raise ArchiveError("Record count differs from the manifest")
                report[name] = {
                    "records": len(seen),
                    "new": new,
                    "unchanged": unchanged,
                }
            if touched_sessions - metadata_sessions:
                raise ArchiveError(
                    "Every imported chat requires owned session metadata"
                )
            for identifier in touched_sessions:
                row = session.get(ChatSession, identifier)
                positions = list(
                    session.scalars(
                        select(ChatTurn.position)
                        .where(ChatTurn.session_id == identifier)
                        .order_by(ChatTurn.position)
                    )
                )
                if positions != list(range(len(positions))):
                    raise ArchiveError(
                        "Chat turn positions must start at zero without gaps"
                    )
                expected = row.imported_data.get("source_turn_count")
                if expected is not None and expected != len(positions):
                    raise ArchiveError("Chat turn count differs from source metadata")
                row.message_count = len(positions)
            session.flush()
            if apply:
                session.commit()
            else:
                session.rollback()
        return report
    except (ArchiveError, SQLAlchemyError) as exc:
        reason = (
            str(exc)
            if isinstance(exc, ArchiveError)
            else "Database constraint or connection check failed"
        )
        raise ArchiveError(
            f"{context}: {reason}. The import transaction was rolled back."
        ) from None
    finally:
        engine.dispose()


def main(argv=None):
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("archive", type=Path)
    parser.add_argument(
        "--apply",
        action="store_true",
        help="Commit the validated archive in one transaction",
    )
    args = parser.parse_args(argv)
    try:
        report = import_archive(args.archive.resolve(), apply=args.apply)
    except (ArchiveError, OSError, ValueError, KeyError, TypeError) as exc:
        # Decoder and filesystem errors can include values; print only safe archive errors.
        print(
            str(exc)
            if isinstance(exc, ArchiveError)
            else "Archive could not be read; check its manifest and files.",
            file=sys.stderr,
        )
        return 1
    print(
        json.dumps(
            {
                "mode": "applied" if args.apply else "preview_rolled_back",
                "tables": report,
            },
            indent=2,
        )
    )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

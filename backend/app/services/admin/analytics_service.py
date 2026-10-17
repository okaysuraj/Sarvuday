"""Aggregate stored account and counselling records for administrator reports."""

from datetime import datetime, timedelta, timezone

from sqlalchemy import JSON, case, func, literal, select, true
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.assessment import AssessmentQuestion, AssessmentResult
from app.models.content import Disorder
from app.models.sessions.chat_turn import ChatTurn
from app.models import Admin, CounsellingSession, Counsellor, NormalUser
from app.schemas.admins_schemas import (
    CounsellorAnalytics,
    PlatformAnalytics,
    UserAnalytics,
)


class AnalyticsService:
    def __init__(self, db: AsyncSession):
        self.db = db

    async def _account_totals(self, model) -> dict[str, int]:
        since = datetime.now(timezone.utc) - timedelta(days=7)
        row = (
            await self.db.execute(
                select(
                    func.count(model.user_id),
                    func.count(model.user_id).filter(model.created_at >= since),
                )
            )
        ).one()
        return {"total": row[0], "new_last_week": row[1]}

    async def get_platform_metrics(self) -> PlatformAnalytics:
        users = await self._account_totals(NormalUser)
        counsellors = await self._account_totals(Counsellor)
        admins = await self._account_totals(Admin)
        counsellors["approved"] = await self.db.scalar(
            select(func.count())
            .select_from(Counsellor)
            .where(Counsellor.is_approved.is_(True))
        )
        models = {
            "disorders": Disorder,
            "assessment_questions": AssessmentQuestion,
            "chat_turns": ChatTurn,
            "assessment_results": AssessmentResult,
        }
        counts = (
            await self.db.execute(
                select(
                    *(
                        select(func.count()).select_from(model).scalar_subquery()
                        for model in models.values()
                    )
                )
            )
        ).one()
        return PlatformAnalytics(
            admin=admins,
            normal_users=users,
            counsellors=counsellors,
            content_analytics=dict(zip(models, counts)),
        )

    async def get_user_analytics(self) -> UserAnalytics:
        gender_rows = await self.db.execute(
            select(NormalUser.gender, func.count())
            .where(NormalUser.gender.is_not(None))
            .group_by(NormalUser.gender)
        )
        genders = {gender.value: count for gender, count in gender_rows}
        since = datetime.now(timezone.utc) - timedelta(days=30)
        day = func.date_trunc("day", NormalUser.created_at)
        registrations = await self.db.execute(
            select(day, func.count())
            .where(NormalUser.created_at >= since)
            .group_by(day)
            .order_by(day)
        )
        return UserAnalytics(
            demographics={"gender": genders},
            behavior={"active_users": None},
            trends={
                "registration": {
                    date.date().isoformat(): count for date, count in registrations
                }
            },
        )

    async def get_counsellor_analytics(self) -> CounsellorAnalytics:
        total, approved = (
            await self.db.execute(
                select(
                    func.count(Counsellor.user_id),
                    func.count(Counsellor.user_id).filter(
                        Counsellor.is_approved.is_(True)
                    ),
                )
            )
        ).one()
        session_count = func.count(CounsellingSession.session_id)
        performers = await self.db.execute(
            select(
                Counsellor.user_id,
                Counsellor.name,
                Counsellor.average_rating,
                session_count,
            )
            .join(
                CounsellingSession,
                CounsellingSession.counsellor_id == Counsellor.user_id,
            )
            .group_by(Counsellor.user_id)
            .order_by(
                Counsellor.average_rating.desc().nulls_last(), session_count.desc()
            )
            .limit(5)
        )
        performance = {
            "top_performers": [
                {
                    "user_id": user_id,
                    "name": name,
                    "rating": float(rating) if rating is not None else None,
                    "sessions": count,
                }
                for user_id, name, rating, count in performers
            ],
            "average_rating": float(
                await self.db.scalar(select(func.avg(Counsellor.average_rating))) or 0
            ),
        }
        return CounsellorAnalytics(
            status={"total": total, "approved": approved, "pending": total - approved},
            performance=performance,
            sessions=await self.db.scalar(
                select(func.count()).select_from(CounsellingSession)
            ),
            specialties=await self._common_specialties(),
        )

    async def _common_specialties(self) -> dict[str, int]:
        # Profiles store JSON arrays, not PostgreSQL ARRAY values. Treat legacy
        # JSON nulls as empty lists before expanding each specialization.
        values = case(
            (
                func.json_typeof(Counsellor.specializations) == "array",
                Counsellor.specializations,
            ),
            else_=literal([], type_=JSON),
        )
        specialty = (
            func.json_array_elements_text(values).table_valued("value").lateral()
        )
        count = func.count()
        rows = await self.db.execute(
            select(specialty.c.value, count)
            .select_from(Counsellor)
            .join(specialty, true())
            .group_by(specialty.c.value)
            .order_by(count.desc(), specialty.c.value)
            .limit(5)
        )
        return dict(rows.all())

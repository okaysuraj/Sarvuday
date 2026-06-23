# app/services/admin/analytics_service.py

from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import func, extract, case, and_, text
from datetime import datetime, timedelta, timezone
from app.models import (
    NormalUser, 
    Counsellor,
    Admin,
    ChatSession,
    CounsellingSession,
)
from app.schemas import (
    PlatformAnalytics,
    UserAnalytics,
    CounsellorAnalytics
)
from app.database import (
    chatbot_collection,
    assessments_collection,
    users_scores_collection,
    disorders_collection
)
from fastapi import HTTPException, status
import logging
from sqlalchemy.future import select
from typing import Dict, Any, List

logger = logging.getLogger(__name__)

class AnalyticsService:
    def __init__(self, db: AsyncSession):
        self.db = db
    
    async def get_platform_metrics(self) -> PlatformAnalytics:
        """Get comprehensive platform-wide metrics"""
        try:
            # SQL Metrics
            total_users = await self._count_model(NormalUser)
            total_counsellors = await self._count_model(Counsellor)
            total_admins = await self._count_model(Admin)
            # active_sessions_result = await self.db.execute(
            #     select(func.count()).where(ChatSession.end_time.is_(None))
            # )
            # active_sessions = active_sessions_result.scalar()

            # MongoDB Metrics (await async count operations)
            disorders_count = await disorders_collection.count_documents({})
            assessments_count = await assessments_collection.count_documents({})
            total_chat_documents = await chatbot_collection.count_documents({})
            total_users_score_count = await users_scores_collection.count_documents({})

            # Trend metrics
            new_users_last_week = await self._get_new_users(days=7)
            new_counsellors_last_week = await self._get_new_counsellors(days=7)
            new_admins_last_week = await self._get_new_admins(days=7)

            # Construct response according to PlatformAnalytics schema
            return PlatformAnalytics(
                admins={
                    "total": total_admins,
                    "new_last_week": new_admins_last_week,
                },
                normal_users={
                    "total": total_users,
                    "new_last_week": new_users_last_week,
                    # "active": active_sessions,
                },
                counsellors={
                    "total": total_counsellors,
                    "new_last_week": new_counsellors_last_week,
                    "approved": await self._count_model(Counsellor, Counsellor.is_approved.is_(True)),
                },
                mongodb_analytics={
                    "disorders": disorders_count,
                    "assessments_count": assessments_count,
                    "total_chat_documents": total_chat_documents,
                    "total_users_score_count": total_users_score_count
                },
                # Include other necessary fields as per the schema
            )

        except Exception as e:
            logger.error(f"Platform metrics error: {str(e)}")
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Failed to fetch platform metrics"
            )

    async def get_user_analytics(self) -> UserAnalytics:
        """Detailed user demographic and behavior analytics"""
        try:
            # Demographic breakdown
            gender_distribution = await self._user_gender_distribution()
            # active_users = await self._count_active_users()
            registration_trend = await self._registration_trend(days=30)

            return UserAnalytics(
                demographics={
                    "gender": gender_distribution,
                    # Add other demographics like age groups if needed
                },
                behavior={
                    "active_users": None,
                },
                trends={
                    "registration": registration_trend,
                    # "activity": await self._daily_active_users(days=7),
                }
            )

        except Exception as e:
            logger.error(f"User analytics error: {str(e)}")
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Failed to fetch user analytics"
            )

    async def get_counsellor_analytics(self) -> CounsellorAnalytics:
        """Counsellor performance and status analytics"""
        try:
            # Status metrics
            approval_stats = await self._counsellor_approval_stats()
            # Performance metrics
            top_performers = await self._top_performing_counsellors()
            avg_rating = await self._average_counsellor_rating()
            # Session metrics
            # session_stats = await self._counsellor_session_stats()

            return CounsellorAnalytics(
                status=approval_stats,
                performance={
                    "top_performers": top_performers,
                    "average_rating": avg_rating,
                },
                sessions=None,
                specialties=await self._common_specialties(),
            )

        except Exception as e:
            logger.error(f"Counsellor analytics error: {str(e)}")
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Failed to fetch counsellor analytics"
            )

    # Helper methods
    async def _count_model(self, model, condition=None) -> int:
        query = select(func.count()).select_from(model)
        if condition is not None:
            query = query.where(condition)
        result = await self.db.execute(query)
        return result.scalar() or 0
    
    async def _user_gender_distribution(self) -> Dict[str, int]:
        return await self._field_distribution(NormalUser, NormalUser.gender)

    async def _field_distribution(self, model, field) -> Dict[str, int]:
        query = select(
            field,
            func.count(field)
        ).select_from(model).group_by(field)
        
        result = await self.db.execute(query)
        return {row[0]: row[1] for row in result.all() if row[0] is not None}

    async def _registration_trend(self, days: int) -> Dict[datetime.date, int]:
        end_date = datetime.now(timezone.utc)
        start_date = end_date - timedelta(days=days)
        
        query = select(
            func.date_trunc('day', NormalUser.created_at).label('date'),
            func.count(NormalUser.user_id)
        ).where(
            NormalUser.created_at >= start_date
        ).group_by('date').order_by('date')
        
        result = await self.db.execute(query)
        return {row[0].date(): row[1] for row in result.all()}

    async def _get_new_users(self, days: int) -> int:
        end_date = datetime.now(timezone.utc)
        start_date = end_date - timedelta(days=days)
        return await self._count_model(NormalUser, NormalUser.created_at >= start_date)

    async def _get_new_counsellors(self, days: int) -> int:
        end_date = datetime.now(timezone.utc)
        start_date = end_date - timedelta(days=days)
        return await self._count_model(Counsellor, Counsellor.created_at >= start_date)

    async def _get_new_admins(self, days: int) -> int:
        end_date = datetime.now(timezone.utc)
        start_date = end_date - timedelta(days=days)
        return await self._count_model(Admin, Admin.created_at >= start_date)

    # async def _count_active_users(self, days: int = 30) -> int:
    #     """Count users with any activity in the last 'days' days"""
    #     end_date = datetime.now(timezone.utc)
    #     start_date = end_date - timedelta(days=days)
    #     # Example: Users with chat sessions in the period
    #     subquery = select(ChatSession.user_id).where(
    #         ChatSession.start_time >= start_date
    #     ).distinct().subquery()
        
    #     query = select(func.count()).select_from(subquery)
    #     result = await self.db.execute(query)
    #     return result.scalar() or 0

    # async def _daily_active_users(self, days: int) -> Dict[datetime.date, int]:
    #     """Count daily active users (users with chat sessions)"""
    #     end_date = datetime.now(timezone.utc)
    #     start_date = end_date - timedelta(days=days)
        
    #     query = select(
    #         func.date_trunc('day', ChatSession.start_time).label('date'),
    #         func.count(func.distinct(ChatSession.user_id))
    #     ).where(
    #         ChatSession.start_time >= start_date
    #     ).group_by('date').order_by('date')
        
    #     result = await self.db.execute(query)
    #     return {row[0].date(): row[1] for row in result.all()}

    async def _counsellor_approval_stats(self) -> Dict[str, int]:
        total = await self._count_model(Counsellor)
        approved = await self._count_model(Counsellor, Counsellor.is_approved.is_(True))
        return {
            "approved": approved,
            "pending": total - approved,
            "total": total
        }

    async def _top_performing_counsellors(self, limit: int = 5) -> List[Dict[str, Any]]:
        query = select(
            Counsellor.user_id,
            Counsellor.name,
            Counsellor.average_rating,
            func.count(CounsellingSession.session_id).label('sessions_count')
        ).join(
            CounsellingSession,
            CounsellingSession.counsellor_id == Counsellor.user_id
        ).group_by(Counsellor.user_id).order_by(
            Counsellor.average_rating.desc(),
            text('sessions_count DESC')
        ).limit(limit)
        
        result = await self.db.execute(query)
        return [
            {
                "user_id": row.user_id,
                "name": row.name,
                "rating": row.average_rating,
                "sessions": row.sessions_count
            }
            for row in result.all()
        ]

    async def _average_counsellor_rating(self) -> float:
        query = select(func.avg(Counsellor.average_rating))
        result = await self.db.execute(query)
        return round(result.scalar() or 0.0, 2)

    # async def _counsellor_session_stats(self) -> Dict[str, Any]:
    #     total_sessions = await self._count_model(CounsellingSession)
    #     avg_duration_result = await self.db.execute(select(func.avg(CounsellingSession.duration)))
    #     avg_duration = avg_duration_result.scalar() or 0.0
    #     return {
    #         "total_sessions": total_sessions,
    #         "average_duration_minutes": round(avg_duration, 2),
    #     }

    async def _common_specialties(self, limit: int = 5) -> Dict[str, int]:
        # Assuming Counsellor.specializations is a PostgreSQL array type
        # Using unnest to expand array and group by individual specializations
        query = select(
            func.unnest(Counsellor.specializations).label('specializations'),
            func.count(func.unnest(Counsellor.specializations))
        ).group_by('specializations').order_by(func.count().desc()).limit(limit)
        
        result = await self.db.execute(query)
        return {row.specialty: row.count for row in result.all()}
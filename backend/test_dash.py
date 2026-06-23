import asyncio
from app.database.postgres import async_session
from app.services.normal_user.user_management_service import UserManagementService
from app.schemas.normal_users_schemas import DashboardOverviewResponse

async def test():
    async with async_session() as db:
        try:
            res = await UserManagementService(db).get_dashboard_overview('NUSER-F74AB5572AB5')
            # Test serialization
            dump = res.model_dump_json()
            print("Serialization successful")
        except Exception as e:
            import traceback
            traceback.print_exc()

asyncio.run(test())

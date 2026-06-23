import asyncio
from datetime import datetime, timedelta
from app.database.postgres import async_session
from app.models.users.counsellor import Counsellor
from app.models.scheduling.availability import CounsellorAvailability
from app.utils.constants import CounsellorAvailabilityStatusEnum
from app.utils.unique_id_generation import generate_available_slot_id
from sqlalchemy import select

async def seed_slots():
    async with async_session() as db:
        # Fetch all approved counsellors
        result = await db.execute(select(Counsellor).where(Counsellor.is_approved == True))
        counsellors = result.scalars().all()
        
        if not counsellors:
            print("No approved counsellors found.")
            return

        now = datetime.now()
        
        for counsellor in counsellors:
            print(f"Seeding slots for counsellor: {counsellor.name} ({counsellor.user_id})")
            
            # Create 5 slots over the next few days
            for i in range(1, 6):
                start_time = now + timedelta(days=i, hours=2) # Random future time
                # make it round to the nearest hour
                start_time = start_time.replace(minute=0, second=0, microsecond=0)
                end_time = start_time + timedelta(hours=1)
                
                slot = CounsellorAvailability(
                    availability_slot_id=generate_available_slot_id(),
                    counsellor_id=counsellor.user_id,
                    start_time=start_time,
                    end_time=end_time,
                    status=CounsellorAvailabilityStatusEnum.available,
                    notes=f"General availability slot {i}"
                )
                db.add(slot)
                
        await db.commit()
        print("Successfully seeded slots!")

if __name__ == "__main__":
    asyncio.run(seed_slots())

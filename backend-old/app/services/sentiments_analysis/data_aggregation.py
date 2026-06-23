# app/services/sentiment_analysis/data_aggregation.py

from datetime import datetime, timedelta, date
from typing import List
from fastapi import HTTPException
from app.database import chatbot_collection
from app.schemas import UserMessage

class MessageAggregator:
    @staticmethod
    async def get_user_messages(user_id: str, target_date: date) -> List[UserMessage]:
        """Fetch all user messages for a given user and date."""
        
        print("Data Aggregation Function called.")
        
        if not isinstance(target_date, date):
            raise ValueError("The 'target_date' parameter must be a valid date object.")
        if not isinstance(user_id, str) or not user_id.strip():
            raise ValueError("The 'user_id' parameter must be a non-empty string.")

        start = datetime(target_date.year, target_date.month, target_date.day, tzinfo=None)
        end = start + timedelta(days=1)

        # Fetch chat documents for the user within the day
        cursor = chatbot_collection.find({
            "user_id": user_id,
            "conversation.timestamp": {"$gte": start, "$lt": end}
        })

        chats = cursor.to_list(length=None)

        if not chats:
            raise HTTPException(status_code=404, detail=f"No chat messages found for user {user_id} on {target_date}.")

        user_messages = []
        for chat in chats:
            conversation = chat.get("conversation", [])
            for msg in conversation:
                if msg.get("role") == "user":
                    user_messages.append(
                        UserMessage(
                            content=msg.get("content", ""),
                            timestamp=msg.get("timestamp")
                        )
                    )

        if not user_messages:
            raise HTTPException(status_code=404, detail=f"No user messages found for user {user_id} on {target_date}.")

        print(f"Data Aggregation Function called. User Message: {user_messages}")
        return user_messages

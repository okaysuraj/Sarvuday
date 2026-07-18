from fastapi import APIRouter
from typing import List, Dict, Any

router = APIRouter(prefix="/exercises", tags=["Exercises"])

# Real content catalog
EXERCISES_DB = [
    {
        "id": "ex_1",
        "title": "Thought Reframing",
        "category": "CBT",
        "duration_min": 15,
        "description": "Challenge your cognitive distortions and replace them with balanced perspectives.",
        "difficulty": 2,
        "status": "Pending"
    },
    {
        "id": "ex_2",
        "title": "Box Breathing",
        "category": "Breathing",
        "duration_min": 5,
        "description": "A simple yet powerful technique to reset your nervous system in stressful moments.",
        "difficulty": 1,
        "status": "Completed"
    },
    {
        "id": "ex_3",
        "title": "Body Scan",
        "category": "Meditation",
        "duration_min": 10,
        "description": "Release physical tension by bringing mindful awareness to each part of your body.",
        "difficulty": 3,
        "status": "Pending"
    },
    {
        "id": "ex_4",
        "title": "4-7-8 Technique",
        "category": "Breathing",
        "duration_min": 8,
        "description": "The natural tranquilizer for the nervous system. Best for evening winding down.",
        "difficulty": 1,
        "status": "Pending"
    }
]

@router.get("/")
async def get_exercises() -> List[Dict[str, Any]]:
    return EXERCISES_DB

@router.get("/{exercise_id}")
async def get_exercise_by_id(exercise_id: str) -> Dict[str, Any]:
    for ex in EXERCISES_DB:
        if ex["id"] == exercise_id:
            return ex
    return {"error": "Exercise not found"}

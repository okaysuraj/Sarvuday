# app/schemas/disorders_schemas.py

from pydantic import BaseModel, ConfigDict
from typing import List

    
class DisorderBase(BaseModel):
    disorder_id: int
    disorder_title: str
    disorder_description: str
    symptoms: List[str]
    preventions: List[str] 
    treatments: List[str]  
    best_advice: str

class DisorderCreate(BaseModel):
    disorder_title: str
    disorder_description: str
    symptoms: List[str]
    preventions: List[str] 
    treatments: List[str]  
    best_advice: str

class DisorderCreateResponse(BaseModel):
    message: str
    inserted_id: str
    
    model_config = ConfigDict(arbitrary_types_allowed=True)

class DisorderBulkCreateResponse(BaseModel):
    message: str
    inserted_ids: List[str]
    total_inserted: int
    
class DisorderUpdate(BaseModel):
    disorder_id: int
    disorder_title: str | None = None
    disorder_description: str | None = None
    symptoms: list[str] | None = None
    preventions: list[str] | None = None
    treatments: list[str] | None = None
    best_advice: str | None = None

class DisorderUpdateResponse(BaseModel):
    message: str
    modified_count: int
    
class DisordersListResponse(BaseModel):
    total_count: int
    disorders: list[DisorderBase]


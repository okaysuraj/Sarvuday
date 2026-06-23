import importlib
import inspect
from pydantic import BaseModel
from sqlalchemy.orm import DeclarativeBase

import sys
import os
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from app.database.postgres import Base
from app import models, schemas

def get_sqlalchemy_fields(model):
    from sqlalchemy import inspect as sqla_inspect
    insp = sqla_inspect(model)
    fields = {}
    for column in insp.columns:
        fields[column.name] = {
            'nullable': column.nullable,
            'type': str(column.type)
        }
    return fields

def get_pydantic_fields(schema):
    fields = {}
    for name, field in schema.model_fields.items():
        fields[name] = {
            'required': field.is_required(),
            'type': str(field.annotation)
        }
    return fields

print("Audit script starting...")
for model_name, model_cls in inspect.getmembers(models, inspect.isclass):
    if issubclass(model_cls, Base) and model_cls is not Base:
        print(f"--- Model: {model_name} ---")
        try:
            db_fields = get_sqlalchemy_fields(model_cls)
            print(f"DB Fields: {list(db_fields.keys())}")
        except Exception as e:
            pass


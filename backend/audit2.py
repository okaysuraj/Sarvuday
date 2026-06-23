import importlib
import inspect
from pydantic import BaseModel
from sqlalchemy.orm import DeclarativeBase

import sys
import os
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from app import schemas

def get_pydantic_fields(schema):
    fields = {}
    for name, field in schema.model_fields.items():
        fields[name] = {
            'required': field.is_required(),
            'type': str(field.annotation)
        }
    return fields

print("Audit script starting...")
for module_name in dir(schemas):
    module = getattr(schemas, module_name)
    if inspect.isclass(module) and issubclass(module, BaseModel) and module is not BaseModel:
        print(f"--- Schema: {module_name} ---")
        try:
            fields = get_pydantic_fields(module)
            print(f"Schema Fields: {list(fields.keys())}")
        except Exception as e:
            pass


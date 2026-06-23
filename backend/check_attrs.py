import sys
import os
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from app import schemas
from pydantic import BaseModel
import inspect

missing = []
for module_name in dir(schemas):
    module = getattr(schemas, module_name)
    if inspect.isclass(module) and issubclass(module, BaseModel) and module is not BaseModel:
        if not module.model_config.get("from_attributes", False):
            missing.append(module_name)

print("Schemas missing from_attributes:")
for m in missing:
    print(m)

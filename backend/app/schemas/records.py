"""Explicit field selection keeps private ownership and import metadata out of APIs."""

from fastapi.encoders import jsonable_encoder


def record_fields(record, *fields):
    return jsonable_encoder({field: getattr(record, field) for field in fields})

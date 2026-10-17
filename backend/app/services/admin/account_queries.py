"""Shared account searches and bounded pagination for the three admin lists."""

from sqlalchemy import func, select


def filter_accounts(query, model, filters):
    for field in (
        "user_id",
        "gender",
        "country",
        "state",
        "city",
        "is_email_verified",
        "is_phone_verified",
    ):
        value = getattr(filters, field, None)
        if value is not None and value != "":
            query = query.where(getattr(model, field) == value)
    for field in ("name", "email", "phone_number"):
        value = getattr(filters, field)
        if value:
            query = query.where(getattr(model, field).ilike(f"%{value}%"))
    return query


async def account_page(db, query, model, filters):
    total = await db.scalar(select(func.count()).select_from(query.subquery()))
    # sort_by is a Literal in each request schema; clients cannot name SQL columns.
    column = getattr(model, filters.sort_by)
    if filters.sort_order == "desc":
        column = column.desc()
    rows = await db.scalars(
        query.order_by(column, model.user_id)
        .offset(filters.offset)
        .limit(filters.limit)
    )
    return total, rows.all()

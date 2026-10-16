"""Review the plan first. --apply provisions validators/indexes, never demo content."""
import argparse
import asyncio
import json
from app.database.mongo_schema import INDEXES, SCHEMAS, SCHEMA_VERSION, provision_mongo


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--apply", action="store_true", help="Apply to MONGO_URI from the environment")
    args = parser.parse_args()
    if not args.apply:
        print(json.dumps({"schema_version": SCHEMA_VERSION, "collections": {
            name: {"validator": schema, "indexes": [dict(index.document) for index in INDEXES.get(name, [])]}
            for name, schema in SCHEMAS.items()
        }}, indent=2))
        return

    async def apply():
        from app.database.mongo import client, mongo_db
        try:
            await provision_mongo(mongo_db)
            print(f"Provisioned MongoDB schema {SCHEMA_VERSION}; no feature data inserted.")
        finally:
            client.close()
    asyncio.run(apply())


if __name__ == "__main__":
    main()

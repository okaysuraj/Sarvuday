# Database deployment and verification

The repository now has a versioned relational schema and MongoDB provisioning. This is a deployment path, not certification of the existing hosted database or all application features. No hosted database was read or changed during the October 16, 2026 audit.

## Ownership and schema

PostgreSQL owns identity, counsellor credentials, availability, appointments, clinical sessions, prescriptions, payments/refunds/payouts, direct messages, and notifications (13 tables). The immutable SQL snapshot in migrations/sql/0001_baseline.sql describes the original schema. Revision 20261016_0002 adds the current API fields, booking integrity indexes, profile JSON arrays, nullable phone-only emails/free-session payments, and query indexes.

MongoDB owns tracking, journals, chatbot conversation documents, assessment questions/results, disorder content, groups/posts, verified reviews, crisis logs, moderation, contact requests, published exercise content, exercise progress, and the currently read-only legacy wallet. app/database/mongo_schema.py defines 19 collections with validators and access-pattern indexes. Schema version 2 includes the truthful manual crisis classification. Reapply provisioning after upgrading from version 1. Validators reject invalid new/updated records; provisioning does not repair historical records.

There is no automatic clinical or demonstration data import. An empty exercise catalog is a legitimate result. Publish clinically reviewed exercises through a trusted content administration process with title, category, description, published, and optional instructions/duration_min/id fields. The exercise assignment/completion workflow still requires backend endpoints.

## New isolated database

1. Configure DATABASE_URL, MONGO_URI, and MONGO_DB_NAME for the target environment using secret storage. DATABASE_URL must use PostgreSQL. Retain sslmode=require or a stricter verified TLS mode appropriate to the provider; TLS URL options are no longer discarded wholesale.
2. Install pinned backend dependencies: python -m pip install -r requirements.txt.
3. From backend, review the migration SQL with alembic upgrade head --sql. Apply alembic upgrade head during a deployment migration step.
4. Preview the MongoDB plan with python -m scripts.provision_mongo. Apply the reviewed plan with python -m scripts.provision_mongo --apply.
5. Run alembic check. Restore a backup in an isolated environment and perform the application acceptance tests before opening traffic.
6. Configure valid Firebase credentials and third-party service secrets. Startup verifies both database schema versions and Firebase initialization. It does not create or alter tables.

The API runtime account should have data access only, while the deployment account has DDL/index/collection-modification permissions. Protect backups, define retention, use provider encryption, and verify restores before launch.

## Render deployment

The API checks MongoDB's `_schema_versions` document against `SCHEMA_VERSION` and PostgreSQL's Alembic revision at startup. A successful build followed by `MongoDB schema is not current` means the MongoDB version marker is missing or outdated in the configured database. Uvicorn exits before binding a port, which also causes Render's subsequent "No open ports detected" message.

For an existing database, complete the adoption checks below before enabling automatic migrations. Do not stamp an unknown PostgreSQL schema or bypass the startup checks.

After pushing these files, open the existing Render web service's **Settings > Build & Deploy**. Set **Root Directory** to `backend` and use these commands:

| Setting | Free instance | Paid instance |
| --- | --- | --- |
| Build Command | `python -m pip install -r requirements.txt && python -m scripts.prepare_deploy` | `python -m pip install -r requirements.txt` |
| Pre-Deploy Command | Unavailable; preparation runs during the build | `python -m scripts.prepare_deploy` |
| Start Command | `uvicorn app.main:app --host 0.0.0.0 --port $PORT --workers 1 --ws-max-size 65536 --ws-max-queue 16` | Same as Free |

Render documents its [deployment commands](https://render.com/docs/deploys#deploy-steps) and restricts the pre-deploy command to paid services. The build command provides the deployment preparation step for Free instances. The command must be added to the existing service settings; changing the Procfile alone does not update the dashboard's explicit start command.

`python -m scripts.prepare_deploy` first runs `python -m alembic upgrade head`, then `python -m scripts.provision_mongo --apply`, using the backend directory and the current Python interpreter. Either failure stops preparation with a nonzero exit code, preventing Render from launching an unprepared build. Repeated successful runs are supported: Alembic applies pending revisions, and MongoDB reapplies validators/indexes before publishing its schema version. No feature or demo records are inserted.

Set `DATABASE_URL`, `MONGO_URI`, and `MONGO_DB_NAME` in Render's environment to the intended target databases, along with the required Firebase and application secrets. The preparation step needs migration/collection/index permissions; use a separate deployment job if your runtime credentials have data access only. Do not put connection strings into build commands or commit them.

Deploy the latest commit after saving the commands. The logs should show `Database schemas are ready for application startup.` before Uvicorn starts. Startup continues to verify both schemas and Firebase before marking `/health/ready` ready.

## Adopting an existing database created by create_all

Do not run the baseline CREATE TABLE script over an existing deployment, and do not stamp an unknown schema.

1. Take and test a backup. Restore a representative copy to staging.
2. Compare that schema with the frozen baseline, including enums, columns, foreign keys, and indexes. Resolve drift with a reviewed migration; preserve unrelated data.
3. Only after confirming baseline equivalence, stamp that staging copy with alembic stamp 20261016_0001 and run alembic upgrade head.
4. The hardening migration intentionally fails if active slot/session/payment duplicates or non-positive availability durations exist. Investigate and reconcile those records before retrying; it does not delete clinical or financial rows.
5. JSON conversion preserves existing JSON arrays and splits comma-separated profile lists. Malformed legacy JSON arrays require explicit cleanup rather than silent replacement.
6. Run MongoDB validation/provenance checks on the restored copy before applying strict validators/indexes. Unique-index creation fails on duplicate wallet owners, chatbot sessions, assessment question IDs, disorder IDs, exercise IDs, or appointment reviews.
7. Review historical seeded goals, reviews, moderation incidents, wallets and dummy financial rows from older versions. Removing the old seed code cannot prove hosted records are authentic. Unverified historical reviews are excluded from public responses until their provenance is established.

Promote the rehearsed migration only after the staging checks succeed. The new columns and historical clinical records are not automatically dropped by a downgrade; restore a tested backup when rollback requires reverting the schema.

### Recovering `type "genderenum" already exists` during deployment

This error means Alembic is running the baseline against a database that already contains schema objects. A database created by the former `create_all` startup code can have all application tables without an Alembic revision. Recreating the enum or skipping only that statement would leave the same problem for existing tables.

After taking a backup and rehearsing on staging, verify the unversioned database from `backend`:

```bash
python -m scripts.adopt_legacy_postgres
```

The verifier builds the frozen baseline in a uniquely named reference schema inside a savepoint, compares PostgreSQL catalog definitions, and rolls back all reference objects before continuing. It checks all baseline tables, enum labels, columns/types/defaults/nullability, primary/unique/foreign/check constraints, indexes, and non-internal triggers. Unrelated tables are preserved. This requires permission to create schemas in the target database, as well as the normal migration permissions. The preview does not stamp the database or alter application records.

To record the baseline after verification and then run pending migrations and MongoDB provisioning:

```bash
python -m scripts.prepare_deploy --adopt-legacy
```

For the existing Render service, set **Root Directory** to `backend` and **Build Command** to:

```bash
python -m pip install -r requirements.txt && python -m scripts.prepare_deploy --adopt-legacy
```

Set **Start Command** to `uvicorn app.main:app --host 0.0.0.0 --port $PORT --workers 1 --ws-max-size 65536 --ws-max-queue 16`. Paid instances can put `python -m scripts.prepare_deploy --adopt-legacy` in Pre-Deploy Command instead and install dependencies only in Build Command.

The adoption option records only revision `20261016_0001`, only when every baseline definition matches. The subsequent normal Alembic upgrade still runs revision `20261016_0002`. Drift or a partial schema stops deployment with differences to investigate; it does not stamp an unknown schema or delete existing objects. Already versioned databases skip adoption, so later deploys can reuse the command without downgrading their revision. Once adoption succeeds, the option can also be removed.

## Connection and resource budgets

Each API worker defaults to at most 10 asynchronous PostgreSQL connections and 4 synchronous PostgreSQL connections. Multiply this by the worker count and leave capacity for migrations, monitoring and maintenance. Pools use checkout health checks and recycle old connections. Query timeout defaults to 15 seconds and pool checkout timeout to 15 seconds.

Each worker's MongoDB asynchronous pool defaults to 20 connections per server; the legacy synchronous pool allows 5, plus driver monitoring connections. Timeouts prevent indefinite queue/connection waits. Settings can be tuned with DATABASE_POOL_SIZE, DATABASE_MAX_OVERFLOW, DATABASE_POOL_TIMEOUT, DATABASE_STATEMENT_TIMEOUT_MS, MONGO_MAX_POOL_SIZE and MONGO_TIMEOUT_MS.

Tracking list endpoints enforce bounded limit/offset parameters. Other older service list/history paths still need pagination and load testing. One growing chatbot-history document per conversation is not sufficient for unlimited history: plan a versioned per-message storage migration with bounded context queries and durable retry/outbox handling.

## Repeatable disposable database tests (PowerShell)

The integration suite guards exact loopback hosts, reserved ports, and the database name sarvuday_audit. It recreates only that reserved local test schema/database. Tests use synthetic fixtures only inside the audit databases and never load production credentials from the developer .env.

From the repository root:

~~~powershell
docker run --detach --rm --name sarvuday-audit-postgres-20261016 --publish 127.0.0.1:55439:5432 --env POSTGRES_USER=audit --env POSTGRES_PASSWORD=local-audit-only --env POSTGRES_DB=sarvuday_audit postgres:17-alpine
docker run --detach --rm --name sarvuday-audit-mongo-20261016 --publish 127.0.0.1:57029:27017 mongo:8.0
Set-Location backend
$env:SARVUDAY_RUN_DATABASE_TESTS = '1'
.\venv\Scripts\python.exe -m pytest tests/test_database_tracking.py -q
.\venv\Scripts\python.exe -m pytest tests -q
Remove-Item Env:\SARVUDAY_RUN_DATABASE_TESTS
docker stop sarvuday-audit-postgres-20261016 sarvuday-audit-mongo-20261016
~~~

The final October 16, 2026 run passed 74 backend tests (21 database/tracking and 53 security regressions), including live migrations, zero Alembic drift, legacy profile conversion, booking uniqueness, concurrent availability writes, free cancellation/join consistency, prescription creation/ownership, dashboard queries, strict MongoDB validators, concurrent updates, empty-state reads, and real-data-only telemetry responses. This is not end-to-end validation of provider payments, Firebase, Daily video, hosted data, mobile hardware, or production load. Procfile now runs one Uvicorn worker because realtime connections/rate state are process-local; horizontal scaling requires a shared broker and distributed abuse protection.

Implementation references: [Alembic migration environment](https://alembic.sqlalchemy.org/en/latest/tutorial.html), [SQLAlchemy pool behavior](https://docs.sqlalchemy.org/en/20/core/pooling.html), and [MongoDB schema validation](https://www.mongodb.com/docs/manual/core/schema-validation/).

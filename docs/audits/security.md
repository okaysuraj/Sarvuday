# Security and reliability audit — October 16, 2026

**Release status: not production-certified.** This review fixes concrete flaws and verifies focused controls. Unimplemented features and externally unverified behavior are listed separately below. No production data, accounts, payments or provider rooms were changed.

## Verified controls and repairs

| Area | Concrete changes and evidence |
| --- | --- |
| Authentication and account linking | JWT verification requires a valid signed subject, expiry and recognized role; invalid/expired/forged claims are rejected. Firebase verification requests revoked-token checking, legacy email linking requires verified email and cannot overwrite an existing Firebase UID. Approved administrator/counsellor gates remain enforced. Blocking Firebase verification is run in a thread pool. backend/app/utils/oauth.py:17; backend/app/services/auth/firebase_auth_service.py:39; :213. |
| Checkout and payment redemption | Payment amount comes from the selected counsellor's database fee. Provider intent ID, payment/user/slot/counsellor metadata, currency, exact integer received amount and succeeded status must match. Booking/verification retrieve the expanded charge and reject known full/partial refunds, disputes, unpaid charges or missing charge verification. Client claims never settle a payment. Free appointments use a null payment reference. backend/app/services/payments/stripe_service.py:17; backend/app/services/appointments/appointment_service.py:72. |
| Financial safety when incomplete | Wallet top-ups and paid appointment cancellation return 503 until verified accounting/refund handling exists. A completed payment cannot be reused across appointments. This does not implement a refund provider or financial ledger. backend/app/routes/general/payments.py; backend/app/services/appointments/utils.py. |
| Scheduling concurrency | Booking locks the future available slot, verifies an approved counsellor, and locks the payment before checking ownership/reuse. Availability create/update/delete serialize on the stable counsellor row, normalize offset timestamps to UTC for the existing naive SQL columns, reject overlap/past intervals and protect booked/history slots. Actual PostgreSQL concurrency tests admit one of two overlapping creates, reject the other, and admit adjacent slots. backend/app/services/appointments/validators.py:12; backend/app/services/availability/availability_service.py:27; :58; :89. |
| Cancellation and clinical joins | Free cancellation locks appointment and slot, rejects started/completed appointments and releases availability consistently. Joins require a confirmed appointment matching session/patient/counsellor, the correct actor and an unexpired, non-deleted session. Cancelled/unlinked sessions cannot obtain tokens through join endpoints. backend/app/services/appointments/appointment_service.py:122; backend/app/services/counselling_services/counselling_service.py:118. |
| Video lifecycle | Store room timestamps as UTC without an offset to match existing SQL DateTime columns; do not strip non-UTC offsets without converting. Token not-before/expiry uses actual UTC session bounds. Assigned counsellor ownership is checked before room deletion; administrative cleanup selects expired rooms in bounded batches. Corrected the delete method binding and unsupported HTTPX delete-with-JSON call. backend/app/services/counselling_services/counselling_service.py:60; :75; :92; backend/app/services/counselling_services/daily_service.py:44. |
| AI and crisis privacy | Summary and crisis identity comes from the authenticated user, regardless of supplied user_id. Unknown clinical inference stays unknown; unsupported voice analysis returns 503. Crisis logging explicitly does not claim dispatch or a confirmed clinician response. MongoDB schema version 2 accepts manual classifications. AI chat failures preserve authorization errors/return 503 instead of generating a successful fake assistant response. backend/app/routes/ai.py:34; :56; backend/app/routes/general/ai_chat.py:105. |
| Direct chat authorization | Fixed the previous room parser, which rejected all generated hyphenated user IDs. Parsing alone is insufficient: a stored patient/counsellor session relationship is required. Sender identity/role comes from authentication. Message lengths/history pages are bounded; unread counts use SQL aggregation; WebSocket read receipts are scoped to the authorized room and another sender. Malformed frames close safely, frames/rate are bounded, and connections are cleaned up in finally. backend/app/routes/general/chat.py:68; :73; :155; :235. |
| Community anonymity | Groups/feeds require authenticated normal users; responses omit account IDs for both anonymous and named posts. POST identity comes from authentication. IDs, content lengths, actions and pagination are validated; invalid/missing records and database outages use real HTTP failures. backend/app/routes/general/community.py:20; :30; :64. |
| Uploads | Validate actual stream length rather than trusting declared size, reject empty/oversized/type-signature mismatches, choose allowed extensions independently of the supplied filename, bound copy chunks, remove partial output on failure, and confine save/delete operations to the resolved upload root. backend/app/utils/file_utils.py:15; :29; :40; :68. |
| Request/resource protection | Explicit CORS/host allowlists replace broad private-LAN/wildcard policies; production CORS origins must be complete HTTPS origins. Count actual request-body bytes, including chunked/forged-length uploads. The local limiter bounds identity buckets to 10,000 and request deques by per-minute limits, without trusting raw forwarded headers. Security response headers are attached to normal API responses. backend/app/core/middleware.py:16; :63. |
| Deployment consistency | Procfile now uses one Uvicorn worker with 64 KB WebSocket frames and a queue of 16, matching the current process-local realtime manager and avoiding an undeclared gunicorn dependency. Multiple replicas still need shared realtime/rate infrastructure. backend/Procfile:1. |
| Account erasure honesty | Patient/counsellor self-delete and administrative privacy operations return 503 before mutation until a verified cross-store erasure/retention workflow exists. They no longer claim complete erasure after deleting only one SQL row. backend/app/services/normal_user/user_management_service.py:109; backend/app/services/counsellor/counsellor_management_service.py:99; backend/app/routes/admin/compliance.py. |

Expanded payment charge verification follows Stripe's separate [PaymentIntent](https://docs.stripe.com/api/payment_intents/object) and [Charge](https://docs.stripe.com/api/charges/object) records, since intent success alone does not establish the current refund/dispute state. Video timing/deletion follows the [Daily token API](https://docs.daily.co/reference/rest-api/meeting-tokens/create-meeting-token) and [room deletion API](https://docs.daily.co/reference/rest-api/rooms/delete-room).

## Tests actually completed

Final command from backend:

~~~powershell
$env:SARVUDAY_RUN_DATABASE_TESTS = '1'
.\venv\Scripts\python.exe -m pytest tests -q
~~~

**74 passed: 21 database/tracking tests and 53 security regressions.** PostgreSQL 17 and MongoDB 8.0 ran in disposable loopback-only containers. SQL metadata matches the applied migrations. The test databases and synthetic fixtures are reserved for tests; developer/production credentials are overridden by tests/conftest.py. Provider doubles exist only inside tests.

Security regressions exercise forged/expired/missing JWT claims, revoked Firebase token verification, protected legacy account linking, unapproved roles, tampered provider metadata/amount/currency/status, local/provider refunds and disputes, repeated provider settlement, payment ownership/slot/reuse rejection, slot row-lock and time/approval checks, account erasure/paid cancellation without mutation, cross-user AI selection, upload actual size/signature/path traversal, origin/host failures, streamed request-body bounds, bounded rate state, relationship-based chat authorization, WebSocket malformed-frame cleanup, anonymous community identifiers, explicit storage failures, clinician room ownership, timezone conversion, cancelled/unlinked/expired joins and started cancellation.

Actual database tests additionally verify fresh migrations and legacy conversion, database constraints, strict validators, concurrent writes, real prescription/dashboard queries, concurrent availability creation, real free appointment persistence, UTC-naive session timestamps, free cancellation and post-cancellation join denial. Live Stripe/Firebase/Daily transactions were not exercised.

## Actual unimplemented capabilities

These are missing implementations, not merely missing credentials:

- Verified refunds, payout reconciliation, a transactional wallet/ledger, robust checkout retry/compensation and financial recovery jobs. Paid cancellation/top-up are deliberately unavailable.
- Cross-database account erasure, provider/Firebase cleanup, retention/legal-hold rules, immutable erasure audit and recovery jobs. Privacy endpoints are deliberately unavailable.
- Shared realtime delivery and distributed rate limiting for multiple workers/replicas. Current deployment intentionally uses one worker; durable reconnect/delivery receipts and multiple concurrent sockets per account need further work.
- Validated clinical sentiment/risk/voice inference and a staffed crisis dispatch/escalation integration. Keyword screening and recording a request do not provide these capabilities.
- Private group membership enforcement, one reaction per user, a complete moderation action lifecycle, exercise assignment/completion, wearable ingestion, dated medication-dose adherence and longitudinal goal streaks.
- Cross-store outbox/retry consistency for chatbot history/counters and provider room/database state. Conversation documents still grow with the whole history.
- Full-file image/PDF parsing, malware inspection and authenticated durable object storage. Current upload checks enforce type signatures/size/path confinement only.
- Reliable clinical attendance/completion webhooks and full rescheduling/long-term retention workflows. Expiry and room cleanup alone do not prove attendance.

## Externally unverified release gates

These need configured environments or operational evidence and were not certified by local tests:

- Hosted schema drift, data authenticity/provenance, historical synthetic rows, real account permissions and secret/key rotation state.
- Live Firebase sign-in/revocation, Stripe signed-webhook settlement/payment-method flows, Daily device calls/participant token behavior, provider outages and restore/recovery behavior.
- Deployment TLS/headers, trusted reverse-proxy identity configuration, edge abuse controls, secure log handling (especially WebSocket query-token redaction), access-controlled uploads/backups, encryption and restore drills.
- Backend latency/RAM/concurrency under representative traffic and database query plans. Process-local tests do not establish sustained production capacity.
- Release-device screen/frame timing, battery use, memory, accessibility and 120 Hz behavior on Android/iOS hardware. Bundles/types/export checks are not device-performance measurements.

This review is not a penetration test, regulatory/compliance certification, or verification of every application workflow. Existing Pydantic v2 deprecation warnings remain and need a separate migration before adopting v3.

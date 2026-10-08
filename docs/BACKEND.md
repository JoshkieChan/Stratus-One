# Supabase setup and security boundary

The repository includes a fresh-project migration and deployable Edge Functions. No hosted Supabase project has been provisioned or verified by this change.

## Provision a development project

Install the Supabase CLI, create a disposable Supabase project, and run from the repository root:

```sh
supabase login
supabase link --project-ref YOUR_PROJECT_REF
supabase db push
supabase functions deploy calculate-winnability
supabase functions deploy create-opportunity
```

Review the linked project before `db push`. The initial migration creates new tables; it is not an upgrade script for an existing incompatible schema. For local Supabase development, use the CLI's local stack and `supabase db reset` only against a disposable local database. Docker is not required to run the application's tests.

Set the frontend variables from `.env.example`, configure Auth site/redirect URLs for your frontend origin, and start the app with `?mode=app`. Create an account and confirm its email if required. Create an opportunity in the feed, select it, add a task pack and tasks, complete/reopen a task, calculate its score, save a quote, and move its pipeline stage. Records are intentionally not seeded with fake users or business data.

The browser's URL and publishable/legacy anon key are public. Never put service-role or secret keys into a `VITE_` variable. Configuration validation rejects recognizable privileged keys but cannot revoke already exposed credentials. History was not rewritten.

## Schema and authorization

`supabase/migrations/20261008052056_initial_workflows.sql` defines opportunities, taskpacks, tasks and quotes. All four tables enable RLS, deny anonymous access, and restrict reads/inserts/updates/deletes to `user_id = auth.uid()`. Ownership defaults to the authenticated user. Composite foreign keys prevent referencing another user's opportunity and prevent linking a task to a pack from a different opportunity. Identity and ownership cannot be reassigned.

Postgres triggers own modification timestamps and task completion timestamps. Quote triggers validate line items, recompute line totals and tax using Postgres numeric arithmetic, and increment a version on each update. Browser calculations are estimates; persisted totals are authoritative. Version metadata is available, but the current update service does not implement conflict resolution. Concurrent edits must be avoided until optimistic concurrency is added.

Domain types are camelCase and database columns are snake_case. The adapter maps only top-level fields; `line_items` JSON remains camelCase. Generated database types and runtime validation of every returned row remain follow-up work.

## Functions

Standard CLI sources live in `supabase/functions/calculate-winnability`, `create-opportunity`, and `_shared`. Both functions retain gateway JWT verification and independently validate the bearer token with `auth.getUser()`. They use the caller's token with a nonprivileged client, so RLS remains effective. Scoring also filters by verified owner; creation rejects unknown fields and derives ownership from that user. Invalid methods, JSON, UUIDs and values fail explicitly; database internals are not returned to clients.

The Supabase platform supplies `SUPABASE_URL` and `SUPABASE_ANON_KEY`. The browser invokes `calculate-winnability`; creation currently uses the Data API, with `create-opportunity` available as an alternative endpoint. Pinned Deno import maps use the same Supabase SDK as the frontend. CORS permits all origins; authorization is enforced by tokens and RLS.

Scoring is a prioritization heuristic: 50 base points plus timeline and value points, with expired records scoring zero. The maximum is 80 on a 100-point scale. It is not a win probability, eligibility check, or model prediction.

## Verification and limits

Embedded Postgres tests execute the actual migration using PGlite. They exercise anonymous denial, two-user isolation on every table, ownership spoofing/reassignment, parent/pack constraints, completion/reopening, invalid quote input and authoritative totals. The tests model Supabase's `auth.uid()` and roles; they do not test hosted Auth, PostgREST relationship discovery, gateway settings or deployed functions.

Before using real data, verify the complete flow on the target project with two accounts, including invalid/expired tokens, direct unauthorized requests and saved-record reloads. Browser print supports a user-selected PDF destination; there is no server PDF generation or delivery service. Quotes are estimates, not an accounting product. Delete adapters cannot distinguish missing rows from inaccessible rows. No ingestion, email sending, notification delivery or external integrations are implemented.

References: [Supabase RLS](https://supabase.com/docs/guides/database/postgres/row-level-security), [function authorization](https://supabase.com/docs/guides/functions/auth).

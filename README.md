
# Stratus One

A React + TypeScript opportunity-workflow prototype with a reusable design system. Review contract opportunities, organize associated tasks, inspect a pipeline, and prepare quote estimates in one interface.

**Status:** a runnable design showcase and a Supabase-backed workflow application with a versioned schema and tested ownership policies. The showcase works without credentials. A hosted backend still needs provisioning and end-to-end verification. Unsupported actions are labeled rather than simulated.

## Run locally

Use Node.js 24 LTS and npm:

```sh
npm ci
npm run dev
```

Open `http://localhost:3000` for the design showcase. Sample records and illustrative controls do not persist. The markup calculator and theme toggle are interactive. Use **Open application** (`?mode=app`) for the Supabase workspace.

Copy `.env.example` to `.env.local` to configure the workspace:

```dotenv
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-publishable-or-legacy-anon-key
```

Restart Vite after changes. These values are public in the browser bundle: **never use a service-role or secret key**. A URL/key alone does not provision a backend. Read [backend prerequisites](docs/BACKEND.md) before enabling real data. Missing or invalid configuration displays setup guidance.

## Features and scope

| Workflow | Current behavior |
| --- | --- |
| Design system | Gallery, semantic tokens, reusable cards/buttons/inputs/badges, themes and sample product layouts |
| Authentication | Supabase email/password sign-in/sign-up, confirmation guidance and sign-out |
| Opportunities | User-scoped reads, server-side search/status filters and pagination, record selection, creation form and CRUD service methods |
| Task packs | Create packs and tasks for a selected opportunity; complete/reopen tasks |
| Quotes | Add/remove/edit lines, cent-rounded totals, tax, notes and draft creation/editing with version conflict protection; browser print / Save PDF |
| Pipeline | Six stages with persisted stage selectors and visible write failures |
| Winnability | Tested deterministic prioritization heuristic and authenticated function with a recalculation control; not predictive or eligibility-verified |
| Settings | Profile name/organization, theme and sign-out work; notification delivery and account administration remain planned |
| Email, planner, identity | Showcase layouts or explicitly planned application pages |

With a provisioned backend: sign in → create an opportunity → select it → create a task pack and tasks → complete tasks → save a quote → update the pipeline stage. No automatic feed ingestion exists.

## Architecture

```text
src/
  Entry.tsx                 Lazy showcase/app boundary and config gate
  App.tsx                   Showcase navigation
  AppRouter.tsx             Auth-gated app navigation and selected record
  showcase/                 Individual sample screens
  components/screens/       Application feature screens
  components/ui/            Radix/shadcn-style primitives
  components/Stratus*.tsx   Product UI components
  domain/                   Pure quote, scoring and validation logic
  services/                 Supabase adapters and column mapping
  types/                    Domain interfaces
  hooks/                    Shared authentication provider and cancellable resource loading
  lib/                      Public config and Supabase client
  styles/globals.css        Tailwind source and design tokens
supabase/
  migrations/              Schema, constraints, RLS and triggers
  functions/               Deno entry points and testable handlers
```

Screens own interactions and loading/error states. Services own database calls and snake_case ↔ camelCase mapping. Pure domain functions own calculations and scoring. Shared UI preserves the existing design language. Tailwind compiles from token source, and showcase/app bundles load independently.

Navigation stays lightweight: query parameters select the entry mode and URL hashes preserve workspace pages and selected opportunity IDs across reloads and browser Back/Forward. Invalid routes fall back to the dashboard. UI primitives remain as a reusable library even where a feature does not consume them.

## Stack

React 18, strict TypeScript, Vite with the React Babel plugin, Tailwind CSS 4, Radix UI, Lucide, Supabase JS, Deno function source, Vitest, React Testing Library and ESLint. No additional backend framework or infrastructure was introduced.

## Testing and CI

```sh
npm run lint
npm run db:types:check
npm run typecheck
npm test
npm run build
npm audit --audit-level=moderate
npx playwright install chromium
npm run test:e2e
```

`npm run check` runs lint, typecheck, tests and build. `npm run test:watch` supports development; `npm run preview` serves the production `build/` directory.

Tests cover rounding/invalid values, quote updates, mapping/server failures, task completion, scoring boundaries, handler authorization/validation/write failures, entry modes and rendered component behavior. Service responses are mocked; PGlite runs the actual SQL migration and checks ownership isolation, constraints and server calculations in embedded Postgres. Chromium tests exercise navigation, session fixtures, themes, quote conflict recovery and print layout. Hosted Auth/Data API integration remains unverified. Deno bootstrap validation is separate from browser typechecking.

[GitHub Actions](.github/workflows/ci.yml) runs `npm ci`, lint, strict typecheck, tests, build and dependency audit on pushes and pull requests. The frontend job also verifies generated schema types and runs Chromium browser tests. A separate Deno job typechecks both Edge Function entry points.

## Project limitations

Hosted deployment remains pending by choice. Browser tests use explicit API fixtures and do not claim a live Supabase integration check. Future product features include server PDF delivery, notification delivery, email/planner/identity workflows and further visual polish in older showcase samples. Quotes are estimates, not an accounting system, with optimistic concurrency protecting saved edits. Unsaved drafts are not automatically persisted.

Read [the audit](docs/AUDIT.md) and [backend review](docs/BACKEND.md) for findings, security assumptions, function deployment details and acceptance criteria.

## Portfolio relevance

Stratus One complements SignalSource and Opportunity Scout through **frontend application architecture**: reusable components, semantic tokens, typed service boundaries, workflow state, tested business rules and honest integration scoping. Present it as frontend engineering with a tested Supabase integration contract; do not claim a production deployment until verified.

Suggested résumé description: “Refactored a React/TypeScript opportunity-workflow prototype into modular screens and reusable components; added tested quote calculations, Supabase service adapters, authenticated function handlers and automated quality checks.”

## Attribution

The visual foundation originated in a Figma component-library export. Original provenance and third-party license links are preserved in [Attributions](src/Attributions.md).

Database types are generated reproducibly from committed migrations using embedded Postgres: run `npm run db:types` after a schema change. CI checks for drift. Dashboard and pipeline reads traverse API pages; the opportunity feed requests 24 records per page. Large-scale analytics and virtualization remain outside this portfolio scope.

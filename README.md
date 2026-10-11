# Stratus One

A React + TypeScript workspace for reviewing contract opportunities, organizing proposal tasks, preparing estimates and tracking pipeline decisions.

**Start with the main application demo: no account, credentials or Supabase project required.** The same screens also support a real Supabase backend. Hosted deployment and verification are pending; this is not a production deployment.

![Main application demo dashboard](docs/screenshots/dashboard.png)

## Run and explore

Install Node.js 24 LTS with npm, then run from this repository:

```sh
npm ci
npm run dev
```

Open the URL printed by Vite (normally `http://localhost:3000`). If `node` or `npm` is not recognized, install Node.js and reopen the terminal. If dependencies are already installed, `node node_modules/vite/bin/vite.js` also starts the app.

| Mode | URL | Data and persistence |
| --- | --- | --- |
| Main portfolio demo (default) | `/` or `/?mode=demo` | Fictional local fixtures. Saved opportunities, tasks, quotes and profile changes use this tab's sessionStorage; reloads retain them. **Reset demo** restores fixtures. No backend requests or remote saves. |
| Design-system showcase | `/?mode=showcase` | Separate component gallery and illustrative layouts. Sample controls are not product integrations; changes are not saved. |
| Real application | `/?mode=app` | Requires a provisioned Supabase project, schema, Auth and functions. Data persists in PostgreSQL under owner RLS. |

Theme preference uses browser localStorage across modes. Unsaved form/quote edits are discarded when leaving a screen. Browser session restoration may restore demo data; Reset demo is the reliable fresh start. If storage is blocked, the banner reports that edits last only until reload.

**Two-minute walkthrough:** dashboard → Opportunity Feed → open an opportunity → review its detail → open task workflow → complete a task or add a pack → Quote Generator → edit the sample estimate and save → Pipeline Board → change its stage. Settings supports display-profile edits and theme changes. The demo banner remains visible throughout.

All seven application screens are reachable from navigation. URLs preserve the selected page/opportunity through reload and Back/Forward. Desktop and mobile menus use the same routes. For screenshots, select the first opportunity and open its detail, task workflow, saved quote and pipeline. Browser-test captures are written to `test-results/audit-*.png`; [reviewed portfolio screenshots](docs/screenshots) are included in the repository.

## Architecture

```text
User → shared React/TypeScript screens → typed service boundary
                                      ├─ demo: local fixtures / sessionStorage
                                      └─ hosted: Supabase → PostgreSQL / Edge Functions
```

- `components/screens/` owns interactions; `Stratus*` and `components/ui/` provide reusable design-system components.
- `services/` selects a backend. `services/supabase/` keeps the real adapters; `demo/` implements the same operations locally. Supabase initialization is lazy, so demo mode needs no credentials.
- `domain/` shares quote calculations, validation and deterministic priority scoring across modes. Quote edits use version checks to reject stale writes.
- `supabase/migrations/` defines owner RLS, relationship constraints and authoritative quote/completion triggers. `supabase/functions/` validates caller identity and scoring/create input.
- `types/database.ts` is generated from committed migrations with embedded Postgres; CI checks for drift.

Stack: React 18, strict TypeScript, Vite, Tailwind CSS, Radix UI, Supabase JS, Deno, Vitest/Testing Library, PGlite and Playwright. See [backend setup and security](docs/BACKEND.md).

## Real Supabase mode

Copy `.env.example` to `.env.local`, provision the [backend](docs/BACKEND.md), and restart Vite:

```dotenv
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-publishable-or-legacy-anon-key
```

These variables are public browser configuration. Never use secret/service-role keys. Demo profile identity is fictional and never authorizes hosted requests. A missing configuration displays setup guidance with a link back to the demo.

## Tests and CI

```sh
npm run check                 # lint, strict types, unit/component/schema tests, build
npm run db:types:check        # migration/type drift
npx playwright install chromium
npm run test:e2e              # real Chromium, including desktop/mobile demo flows
npm audit --audit-level=moderate
```

[GitHub Actions](.github/workflows/ci.yml) runs clean install, these checks and Deno checks for both Edge Function entry points. Demo browser tests use real local services and assert no backend calls; hosted-mode browser tests use explicit API fixtures. PGlite executes the actual migration and tests isolation/constraints. These tests do not prove hosted Auth, PostgREST or deployed function behavior.

## Scope and portfolio relevance

Working: opportunity creation/search/filtering/pagination, detail selection, task packs/completion, quote calculation/editing/printing, pipeline stage updates, profile/theme settings. Browser printing can save a PDF; no server PDF service exists. Priority scores are transparent heuristics, not win probabilities.

Not implemented: automated ingestion, email/notification delivery, daily planning, account administration, unsaved-draft autosave and external integrations. These are explicitly described as future capabilities; inactive placeholder routes were removed. Demo storage is for disposable fictional data, and it does not reproduce all database/auth semantics.

Stratus One complements SignalSource and Opportunity Scout with frontend architecture, reusable components, typed service boundaries and tested workflow logic. The visual foundation originated in a **Figma component-library export**, then was refactored into a functional application architecture. Original provenance and third-party licenses remain in [Attributions](src/Attributions.md).

Study [Interview Notes](docs/INTERVIEW_NOTES.md) and the [UX audit](docs/UX_AUDIT.md) for the main design decisions, evidence and limitations.

# Repository audit

Reviewed entry points, feature screens, shared components/UI primitives, domain types, services, utilities, CSS, dependencies and all function sources. Initial working tree was clean. Git history was not rewritten.

| Area | Finding and disposition |
| --- | --- |
| Entry | Only the 1,600-line sample gallery mounted. Added lazy showcase/application modes and missing-configuration guidance. |
| Architecture | Extracted gallery screens into named modules, retaining layout and reusable components. |
| Types | Added strict TypeScript and lint; fixed incompatible task, pipeline, opportunity and input props. |
| CSS | Replaced stale generated CSS with Tailwind compilation from the original semantic tokens; removed invalid font-face stylesheet URLs. |
| Services | Repaired camelCase/snake_case boundaries, nested task-pack mapping and nullable row reads. |
| Quotes | Recompute supplied totals, round cents, preserve tax on line-only edits and recalculate tax-only edits. |
| Tasks | Missing context now prompts selection; reopening clears completed_at instead of omitting it. |
| Pipeline | Added lost/closed columns, correct adapters and persisted stage selectors; removed fake drag affordance. |
| Functions | Added explicit user checks, owner predicates, field allowlist, safe responses and update-error handling. |
| Scoring | Removed fabricated category/eligibility bonuses; pure tested heuristic, zero for expired records. |
| UX | Visible error states and disabled/labeled unsupported actions; sample gallery explicitly identified. |
| Cleanup | Removed Finder files, unused generated server/KV/image helper/project info, template guidance, duplicate SDK and custom registry. Preserved attributions. |
| Dependencies | Removed version-suffixed imports/aliases; pinned Supabase; patched advisories; automated dependency audit. |
| Build portability | A clean Windows install exposed a native SWC cache-permission failure. Switched to Vite's standard React Babel adapter without changing machine security permissions. |
| Quality | Added logic/service/handler/component tests, CI, setup instructions and feature-status documentation. |

The `components/ui` library is intentionally retained even where primitives are not yet consumed. It is typechecked/linted and unused modules are tree-shaken. Large generic sidebar and design-token reference components remain because splitting by line count would not clarify application logic. The original gallery contains illustrative controls, not working external integrations.

Open work: hosted backend deployment and end-to-end verification ([setup](BACKEND.md)); server PDF delivery; notification delivery; email/planner/identity features; consistent dark styling in older examples. URL hashes now preserve page/record selection, the feed has server-side pagination, dashboard/pipeline queries traverse API pages, and quote edits use optimistic versions. Unsaved quote drafts are not autosaved. Authentication now has one shared provider; the workspace resets when the signed-in user changes.

Vitest verifies real business calculations and React interactions with mocked Supabase service/handler responses. Embedded Postgres tests execute the migration and verify ownership isolation on all four tables; hosted authorization remains unverified. Node typechecking covers application source; the separate Deno check covers function entry points and shared handlers. The pushed branch passed hosted GitHub Actions: [quality checks](https://github.com/JoshkieChan/Stratus-One/actions/runs/37732952385).

The clean dependency install reports deprecation notices for ESLint 9, Recharts 2 and transitive whatwg-encoding. Their locked dependency graph passes the npm vulnerability audit; major-version migrations remain maintenance work and should include testing the reusable chart primitive. No deprecation notice is being treated as a security advisory or silently ignored as a deployment guarantee.

## Validation recorded October 7, 2026

Node 24.19.0 / npm 11.6.2 on Windows:

| Check | Result |
| --- | --- |
| Clean `npm ci` | Passed |
| `npm run lint` | Passed, zero warnings |
| `npm run typecheck` | Passed |
| `npm test` | 80 tests passed across 12 files |
| `npm run build` | Passed; separate showcase/application bundles |
| `npm audit --audit-level=moderate` | Zero vulnerabilities |
| Deno check, both function entry points | Passed, including shared handlers |
| Production HTTP smoke test | HTTP 200, expected Stratus One document title |
| Interactive browser smoke test | 3 Chromium scenarios passed locally: showcase/theme, auth/deep links, navigation/write failures/quote conflicts/print layout |
| Live Supabase and RLS | Embedded Postgres/RLS passed; hosted project not verified |
| Hosted GitHub Actions | Passed on commit f9720a1: frontend and Edge Function jobs |

Supabase JS is pinned to 2.117.2, a release old enough to satisfy Deno's default dependency-age policy. No dependency-age protection was disabled. Test execution used the host environment because sandboxed Windows workers could not reliably read temporary transformed modules. This is an execution-environment limitation, not a skipped test suite.

Follow-up hardening added a versioned schema, owner policies and composite foreign keys, authoritative quote/completion triggers, creation forms, task-pack creation, pipeline stage updates, browser quote printing, saved-quote readback, a shared auth provider and a single owner-scoped dashboard task query.

Follow-up validation adds migration-generated database types with CI drift detection, Chromium regression tests, deep-link/back-forward tests, pagination/error tests, stale-quote version tests and profile-save success/failure tests. Supabase deployment is intentionally pending at the user's request. Previous hosted CI evidence above predates this follow-up; consult the latest Actions run for its status.

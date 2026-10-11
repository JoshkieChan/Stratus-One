# Employer-readiness UX audit

Reviewed the actual shared application in local demo mode, not only the component gallery. Chromium captures cover every application screen at 1440px and 390px; screenshots are also inspected visually. The default entry opens the main dashboard without credentials. The persistent banner explains fictional data, tab-local storage and reset.

| Screen/control | Reviewed behavior and disposition |
| --- | --- |
| Entry modes | Default/demo opens main UI. Showcase is explicit. Hosted mode keeps its configuration gate and has a demo escape link. |
| Navigation | Seven working destinations, selected-record dropdown, hash deep links, Back/Forward, reload, skip link and collapsible mobile menu. Removed email/planner placeholder routes; legacy profile route maps to Settings. |
| Dashboard | Real fixture-derived counts/value, future deadlines linking to detail, and a working browse action. Removed duplicate disabled quick actions. |
| Opportunity Feed | Search/status filters, page bounds, no-results state, creation validation, cancel and record selection. |
| Opportunity Detail | Scope, client, value, deadline, stage, category and qualified priority score. Working links to tasks and quotes; invalid IDs offer a visible recovery path. |
| Task Workflow | Pack/task creation, optional due date, completion/reopening, priority recalculation, empty packs and write errors. Context is selected explicitly above the screen. |
| Quote Generator | Saved-record editing, new quotes, add/remove lines, visible numeric labels, shared cent calculations, tax/notes, version conflicts and browser printing. Unsaved-edit behavior is explained. Print output identifies demo estimates. |
| Pipeline | All six stages remain visible without clipping. Selectors persist stage changes; failed writes retain the previous stage. |
| Settings | Local or hosted profile updates, synchronized theme controls, hosted-only sign-out. Replaced inactive checkboxes/account controls with an explicit future-capabilities note. |
| Reset | Native confirmation supports cancel/confirm; confirm restores fixtures and returns to the dashboard. |
| Responsive/visual | Fixed a design-token sizing collision that shrank the opportunity selector, wrapped mobile header/actions and task rows, and removed clipped pipeline columns. |
| Loading/errors | Shared load status, retry controls, absent-record recovery, invalid-input feedback and preserved quote edits on conflicts. No artificial network calls are used in demo mode. |

## Verification boundary

- Demo browser tests use the real local adapters and assert zero external/backend requests through the workflow.
- Separate hosted-mode tests intercept Auth/Data API responses to exercise browser failure paths; they are not live hosted verification.
- Unit/component tests cover real calculations, service failures, local workflows and entry modes. Embedded Postgres executes the real migration and tests ownership/constraints.
- Lint, strict typecheck, schema/type drift, tests, production build, dependency audit and Deno checks are required by CI. The current run is visible in GitHub Actions.

## Cleanup and retained code

The Supabase adapters were moved behind mode-aware service facades, not copied into separate application screens. Profile changes now go through the selected auth provider. Removed the unused server-PDF stub and duplicated auth gating. Preserved reusable UI primitives, design tokens and the explicitly separate Figma-derived gallery with attribution. The gallery is a visual reference, not evidence that its sample integrations exist.

## Remaining limits

Hosted Supabase verification is pending by choice. Demo data is disposable, tab-scoped and not secured as a real multi-user store. It shares validation/calculation logic but does not emulate every Postgres constraint or Auth behavior. Saved data survives reload; unsaved forms do not. No email/reminder delivery, ingestion, daily planner, account administration or server PDF service is implemented. Estimates are not an accounting system.

## Reviewer assessment

A first-time reviewer can open the main dashboard, follow the three-step workflow guide, inspect a realistic fictional opportunity, complete tasks, edit a quote and update its pipeline stage without credentials. The visible demo/hosted distinction and retained backend code make the engineering scope explainable. This is suitable for a junior/associate portfolio with honest deployment limitations.

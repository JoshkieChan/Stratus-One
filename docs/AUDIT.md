# Engineering audit

The original entry mounted a large Figma-derived gallery while application screens and service code remained disconnected. The project now has explicit demo, showcase and hosted entry modes. See the current [UX audit](UX_AUDIT.md), [backend contract](BACKEND.md) and [interview notes](INTERVIEW_NOTES.md).

| Area | Implemented |
| --- | --- |
| Architecture | Focused showcase modules; shared application screens; lazy auth/storage boundaries; pure quote/scoring logic. |
| Repository hygiene | Removed Finder junk, generated server/KV stubs, unused image helper, hardcoded project configuration and custom registry debris. Attribution retained. No history rewrite. |
| Services | Typed database client, column mapping, nullable reads, pagination, propagated failures and quote version predicates. |
| Database | Versioned schema, owner RLS on all business tables, cross-owner relationship constraints and authoritative quote/completion triggers. |
| Functions | Caller verification, field allowlists, input validation and safe failure responses. Standard CLI deployment layout. |
| Demo | Same UI/service signatures with isolated local fixtures and tab storage, no Supabase initialization or backend requests. |
| Verification | Logic/component tests, embedded Postgres tests, browser workflows, responsive captures and generated-type drift detection. CI includes lint, types, build, audit and Deno. |

The UI primitive library remains useful even where not directly consumed. The design gallery is retained as a separately labeled reference. The current source does not claim that sample email/planner integrations work. ESLint 9, Recharts 2 and transitive whatwg-encoding have deprecation notices; their installed graph is checked by npm audit, with major migrations left outside this focused audit.

Hosted Supabase/Auth/PostgREST/Edge deployment has not been verified. The repository supplies migration and deployment instructions, not production deployment evidence. Browser demo tests and embedded SQL tests establish different boundaries; neither substitutes for a hosted two-account acceptance test.

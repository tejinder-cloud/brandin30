<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# BrandIn30

- The selling page is `src/app/page.tsx`; prices and links live in `src/lib/site.ts`.
- The build dashboard is `src/app/ops/page.tsx`, ported from the My LabOS `/ops` page.
- Data lives in the `brandin30` schema of the shared Supabase project (the same project as My LabOS).
  Never change tables in the `public` schema from this repo. The website reaches the schema only through
  the `public.brandin30_*` functions in `supabase/migrations/`.
- No keys, emails or phone numbers in this repo. The Supabase address and publishable key come from the environment (see `.env.example`).

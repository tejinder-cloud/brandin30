# BrandIn30

Website, product and dashboards for BrandIn30. Next.js on Vercel, data in Supabase.

| Path | What it is |
|---|---|
| `/` | Selling page with the waitlist and pre-order buttons |
| `/ops` | Build dashboard: plan, tasks, risks, agent roster, costs, decisions, waitlist |
| `/ops/login` | Sign-in for the dashboard (same account as the My LabOS admin) |

## Run it

```
npm install
npm run dev
```

## Where things live

- Prices, founding-member count and payment links: `src/lib/site.ts`
- Database tables and functions: `supabase/migrations/` (schema `brandin30` inside the shared Supabase project)
- Who can open `/ops`: the `brandin30.admins` table

-- BrandIn30 lives in its own schema inside the shared Supabase project.
-- Nothing in the public schema is changed; only four functions prefixed brandin30_ are added there,
-- so the website can reach this schema without exposing it through the API settings.

create schema if not exists brandin30;

create table brandin30.admins (
  email text primary key
);

create table brandin30.waitlist (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  name text not null,
  phone text not null unique,
  business_type text,
  plan text,
  source text
);

create table brandin30.ops_milestones (
  day integer primary key,
  title text not null,
  phase text not null,
  planned_on date not null,
  your_part text,
  flag text,
  status text not null default 'planned',
  done_at timestamptz
);

create table brandin30.ops_tasks (
  id uuid primary key default gen_random_uuid(),
  day integer,
  title text not null,
  owner text not null,
  status text not null default 'todo',
  due_on date,
  note text,
  sort integer not null default 0,
  updated_at timestamptz not null default now()
);

create table brandin30.ops_risks (
  id uuid primary key default gen_random_uuid(),
  kind text not null,
  title text not null,
  impact text not null,
  owner text not null,
  mitigation text,
  status text not null default 'open',
  raised_on date not null default current_date
);

create table brandin30.ops_decisions (
  id uuid primary key default gen_random_uuid(),
  decided_on date not null,
  decision text not null,
  why text
);

create table brandin30.ops_agents (
  name text primary key,
  team text not null,
  job text not null,
  phase integer not null,
  build_day integer,
  status text not null default 'planned',
  sort integer not null default 0
);

create table brandin30.ops_budget (
  item text primary key,
  purpose text not null,
  monthly_inr numeric,
  status text not null default 'not set up',
  sort integer not null default 0
);

create table brandin30.ops_activity (
  id bigint generated always as identity primary key,
  at timestamptz not null default now(),
  actor text not null,
  text text not null
);

-- Row-level security on, no policies: only the functions below can read or write.
alter table brandin30.admins enable row level security;
alter table brandin30.waitlist enable row level security;
alter table brandin30.ops_milestones enable row level security;
alter table brandin30.ops_tasks enable row level security;
alter table brandin30.ops_risks enable row level security;
alter table brandin30.ops_decisions enable row level security;
alter table brandin30.ops_agents enable row level security;
alter table brandin30.ops_budget enable row level security;
alter table brandin30.ops_activity enable row level security;

-- Public website: join the waitlist. Anyone may call it; it validates and rate-limits.
create or replace function public.brandin30_join_waitlist(
  p_name text, p_phone text, p_business_type text default null, p_plan text default null, p_source text default null
) returns json language plpgsql security definer set search_path = '' as $$
declare
  v_name text := btrim(coalesce(p_name, ''));
  v_phone text := regexp_replace(coalesce(p_phone, ''), '\D', '', 'g');
  v_type text := left(nullif(btrim(coalesce(p_business_type, '')), ''), 40);
  v_plan text := case when p_plan in ('starter', 'complete', 'website') then p_plan end;
  v_recent integer;
  v_new boolean;
begin
  if length(v_phone) = 12 and left(v_phone, 2) = '91' then v_phone := right(v_phone, 10); end if;
  if length(v_phone) = 11 and left(v_phone, 1) = '0' then v_phone := right(v_phone, 10); end if;
  if length(v_name) < 2 or length(v_name) > 80 then return json_build_object('ok', false, 'error', 'name'); end if;
  if v_phone !~ '^[6-9][0-9]{9}$' then return json_build_object('ok', false, 'error', 'phone'); end if;
  select count(*) into v_recent from brandin30.waitlist where created_at > now() - interval '1 hour';
  if v_recent >= 300 then return json_build_object('ok', false, 'error', 'busy'); end if;
  select not exists (select 1 from brandin30.waitlist where phone = v_phone) into v_new;
  insert into brandin30.waitlist as w (name, phone, business_type, plan, source)
  values (v_name, v_phone, v_type, v_plan, left(nullif(btrim(coalesce(p_source, '')), ''), 120))
  on conflict (phone) do update set
    name = excluded.name,
    business_type = coalesce(excluded.business_type, w.business_type),
    plan = coalesce(excluded.plan, w.plan),
    updated_at = now();
  if v_new then
    insert into brandin30.ops_activity (actor, text)
    values ('Website', 'New waitlist sign-up' || coalesce(' (' || v_type || ')', '') || coalesce(', interested in ' || v_plan, ''));
  end if;
  return json_build_object('ok', true);
end $$;

create or replace function public.brandin30_is_admin() returns boolean
language sql stable security definer set search_path = '' as $$
  select exists (select 1 from brandin30.admins a where a.email = lower(coalesce(auth.jwt() ->> 'email', '')));
$$;

-- Build dashboard: everything /ops shows, in one call. Admins only.
create or replace function public.brandin30_ops() returns json
language plpgsql stable security definer set search_path = '' as $$
begin
  if not public.brandin30_is_admin() then
    return json_build_object('error', 'not_allowed', 'email', auth.jwt() ->> 'email');
  end if;
  return json_build_object(
    'milestones', (select coalesce(json_agg(m order by m.day), '[]'::json) from brandin30.ops_milestones m),
    'tasks', (select coalesce(json_agg(t order by t.day nulls last, t.sort), '[]'::json) from brandin30.ops_tasks t),
    'risks', (select coalesce(json_agg(r order by r.raised_on desc, r.title), '[]'::json) from brandin30.ops_risks r),
    'decisions', (select coalesce(json_agg(d order by d.decided_on desc, d.decision), '[]'::json) from brandin30.ops_decisions d),
    'agents', (select coalesce(json_agg(a order by a.sort), '[]'::json) from brandin30.ops_agents a),
    'budget', (select coalesce(json_agg(b order by b.sort), '[]'::json) from brandin30.ops_budget b),
    'activity', (select coalesce(json_agg(x order by x.at desc), '[]'::json) from (select * from brandin30.ops_activity order by at desc limit 30) x),
    'waitlist', json_build_object(
      'total', (select count(*) from brandin30.waitlist),
      'last7', (select count(*) from brandin30.waitlist where created_at > now() - interval '7 days'),
      'starter', (select count(*) from brandin30.waitlist where plan = 'starter'),
      'complete', (select count(*) from brandin30.waitlist where plan = 'complete'),
      'website', (select count(*) from brandin30.waitlist where plan = 'website'),
      'rows', (select coalesce(json_agg(w order by w.created_at desc), '[]'::json)
               from (select id, created_at, name, phone, business_type, plan, source from brandin30.waitlist order by created_at desc limit 100) w)
    )
  );
end $$;

-- Build dashboard: change a task, plan day or risk status. Admins only.
create or replace function public.brandin30_ops_set(p_action text, p_id text, p_status text) returns json
language plpgsql security definer set search_path = '' as $$
declare v_title text;
begin
  if not public.brandin30_is_admin() then return json_build_object('ok', false, 'error', 'not_allowed'); end if;
  if p_action = 'task' and p_status in ('todo', 'doing', 'done', 'blocked') then
    update brandin30.ops_tasks set status = p_status, updated_at = now() where id = p_id::uuid returning title into v_title;
    if v_title is not null then
      insert into brandin30.ops_activity (actor, text)
      values ('You', 'Marked "' || v_title || '" as ' || case p_status when 'todo' then 'to do' when 'doing' then 'in progress' else p_status end);
    end if;
  elsif p_action = 'milestone' and p_status in ('planned', 'in_progress', 'done', 'blocked') then
    update brandin30.ops_milestones set status = p_status, done_at = case when p_status = 'done' then now() end
    where day = p_id::integer returning title into v_title;
    if v_title is not null then
      insert into brandin30.ops_activity (actor, text)
      values ('You', 'Day ' || p_id || ' "' || v_title || '" set to ' || replace(p_status, '_', ' '));
    end if;
  elsif p_action = 'risk' and p_status in ('open', 'watching', 'closed') then
    update brandin30.ops_risks set status = p_status where id = p_id::uuid;
  else
    return json_build_object('ok', false, 'error', 'unknown_action');
  end if;
  return json_build_object('ok', true);
end $$;

revoke all on function public.brandin30_join_waitlist(text, text, text, text, text) from public, anon, authenticated;
revoke all on function public.brandin30_is_admin() from public, anon, authenticated;
revoke all on function public.brandin30_ops() from public, anon, authenticated;
revoke all on function public.brandin30_ops_set(text, text, text) from public, anon, authenticated;
grant execute on function public.brandin30_join_waitlist(text, text, text, text, text) to anon, authenticated;
grant execute on function public.brandin30_is_admin() to authenticated;
grant execute on function public.brandin30_ops() to authenticated;
grant execute on function public.brandin30_ops_set(text, text, text) to authenticated;

-- Initial schema for a fresh Supabase project. No data or auth users are seeded.
create schema if not exists private;
revoke all on schema private from public;

create table public.opportunities (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  title text not null check (length(trim(title)) between 1 and 500),
  description text not null check (length(description) <= 5000),
  agency text not null check (length(trim(agency)) between 1 and 500),
  solicitation_number text not null check (length(trim(solicitation_number)) between 1 and 500),
  category text not null check (length(trim(category)) between 1 and 500),
  value numeric not null check (value between 0 and 1000000000000),
  deadline timestamptz not null,
  status text not null default 'open' check (status in ('open','in_progress','submitted','won','lost','closed')),
  winnability_score integer not null default 0 check (winnability_score between 0 and 100),
  set_aside text,
  naics_code text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (id, user_id)
);

create table public.taskpacks (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid(),
  opportunity_id uuid not null,
  name text not null check (length(trim(name)) between 1 and 500),
  description text,
  status text not null default 'active' check (status in ('active','completed','archived')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  foreign key (opportunity_id, user_id) references public.opportunities(id, user_id) on delete cascade,
  unique (id, opportunity_id, user_id)
);

create table public.tasks (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid(),
  opportunity_id uuid not null,
  task_pack_id uuid,
  title text not null check (length(trim(title)) between 1 and 500),
  description text,
  status text not null default 'pending' check (status in ('pending','in_progress','completed','blocked')),
  priority text not null default 'medium' check (priority in ('low','medium','high','critical')),
  assigned_to uuid references auth.users(id),
  due_date date,
  completed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  foreign key (opportunity_id, user_id) references public.opportunities(id, user_id) on delete cascade,
  foreign key (task_pack_id, opportunity_id, user_id) references public.taskpacks(id, opportunity_id, user_id) on delete cascade,
  check ((status = 'completed') = (completed_at is not null))
);

create table public.quotes (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid(),
  opportunity_id uuid not null,
  quote_number text not null unique,
  title text not null check (length(trim(title)) between 1 and 500),
  status text not null default 'draft' check (status in ('draft','submitted','accepted','rejected')),
  line_items jsonb not null,
  subtotal numeric not null default 0 check (subtotal between 0 and 1000000000000),
  tax_rate numeric not null default 0 check (tax_rate between 0 and 1),
  tax_amount numeric not null default 0,
  total numeric not null default 0 check (total between 0 and 1000000000000),
  notes text,
  valid_until date,
  version integer not null default 1,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  foreign key (opportunity_id, user_id) references public.opportunities(id, user_id) on delete cascade
);

-- SECURITY INVOKER is intentional: these triggers never bypass caller RLS.
create function private.prepare_record() returns trigger language plpgsql security invoker
set search_path = '' as $$
begin
  if TG_OP = 'UPDATE' then
    if new.id <> old.id or new.user_id <> old.user_id then
      raise exception 'Record identity and ownership cannot change';
    end if;
    new.created_at := old.created_at;
  end if;
  new.updated_at := now();
  return new;
end;
$$;

create function private.prepare_task() returns trigger language plpgsql security invoker
set search_path = '' as $$
begin
  if new.status = 'completed' then
    if TG_OP = 'UPDATE' and old.status = 'completed' then
      new.completed_at := old.completed_at;
    else new.completed_at := now();
    end if;
  else new.completed_at := null;
  end if;
  return new;
end;
$$;

create function private.prepare_quote() returns trigger language plpgsql security invoker
set search_path = '' as $$
declare
  item jsonb;
  items jsonb := '[]'::jsonb;
  quantity numeric;
  price numeric;
  amount numeric;
begin
  if jsonb_typeof(new.line_items) <> 'array' then raise exception 'Quote items must be an array'; end if;
  if jsonb_array_length(new.line_items) not between 1 and 500 then raise exception 'A quote requires 1 to 500 line items'; end if;
  new.subtotal := 0;
  for item in select * from jsonb_array_elements(new.line_items) loop
    if jsonb_typeof(item->'quantity') is distinct from 'number'
       or jsonb_typeof(item->'unitPrice') is distinct from 'number'
       or jsonb_typeof(item->'description') is distinct from 'string' then
      raise exception 'Invalid line item';
    end if;
    quantity := (item->>'quantity')::numeric;
    price := (item->>'unitPrice')::numeric;
    if quantity not between 0 and 1000000 or price not between 0 and 1000000000000 then raise exception 'Invalid line amount'; end if;
    amount := round(quantity * price, 2);
    new.subtotal := new.subtotal + amount;
    items := items || jsonb_build_array(jsonb_build_object('description', item->>'description', 'quantity', quantity, 'unitPrice', price, 'total', amount));
  end loop;
  new.line_items := items;
  new.tax_amount := round(new.subtotal * new.tax_rate, 2);
  new.total := new.subtotal + new.tax_amount;
  if TG_OP = 'UPDATE' then new.version := old.version + 1; else new.version := 1; end if;
  return new;
end;
$$;

create trigger opportunities_metadata before insert or update on public.opportunities for each row execute function private.prepare_record();
create trigger taskpacks_metadata before insert or update on public.taskpacks for each row execute function private.prepare_record();
create trigger tasks_metadata before insert or update on public.tasks for each row execute function private.prepare_record();
create trigger tasks_completion before insert or update on public.tasks for each row execute function private.prepare_task();
create trigger quotes_metadata before insert or update on public.quotes for each row execute function private.prepare_record();
create trigger quotes_calculate before insert or update on public.quotes for each row execute function private.prepare_quote();
revoke all on all functions in schema private from public;

alter table public.opportunities enable row level security;
alter table public.taskpacks enable row level security;
alter table public.tasks enable row level security;
alter table public.quotes enable row level security;

create policy opportunities_owner on public.opportunities for all to authenticated
  using (user_id = (select auth.uid())) with check (user_id = (select auth.uid()));
create policy taskpacks_owner on public.taskpacks for all to authenticated
  using (user_id = (select auth.uid())) with check (user_id = (select auth.uid()));
create policy tasks_owner on public.tasks for all to authenticated
  using (user_id = (select auth.uid())) with check (user_id = (select auth.uid()));
create policy quotes_owner on public.quotes for all to authenticated
  using (user_id = (select auth.uid())) with check (user_id = (select auth.uid()));

revoke all on public.opportunities, public.taskpacks, public.tasks, public.quotes from anon, authenticated;
grant select, insert, update, delete on public.opportunities, public.taskpacks, public.tasks, public.quotes to authenticated;

create index opportunities_owner_created on public.opportunities(user_id, created_at desc);
create index taskpacks_owner_parent on public.taskpacks(user_id, opportunity_id);
create index taskpacks_parent on public.taskpacks(opportunity_id, user_id);
create index tasks_owner_parent on public.tasks(user_id, opportunity_id);
create index tasks_parent on public.tasks(opportunity_id, user_id);
create index tasks_pack on public.tasks(task_pack_id, opportunity_id, user_id);
create index tasks_assignee on public.tasks(assigned_to);
create index quotes_owner_parent on public.quotes(user_id, opportunity_id);
create index quotes_parent on public.quotes(opportunity_id, user_id);

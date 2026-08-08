-- FreeWhen / small project 01
-- Applied to the existing Supabase `shared-calendar` project.
-- The data tables live in an unexposed schema. Anonymous clients can only
-- call the explicitly granted public RPC functions below.

begin;

create schema if not exists availability_mvp;

create table if not exists availability_mvp.polls (
  id uuid primary key default gen_random_uuid(),
  public_token uuid not null unique default gen_random_uuid(),
  title text not null check (char_length(btrim(title)) between 1 and 80),
  timezone text not null default 'Australia/Perth' check (char_length(timezone) between 1 and 80),
  created_at timestamptz not null default now()
);

create table if not exists availability_mvp.slots (
  id bigint generated always as identity primary key,
  poll_id uuid not null references availability_mvp.polls(id) on delete cascade,
  starts_at timestamptz not null,
  ends_at timestamptz not null,
  created_at timestamptz not null default now(),
  constraint availability_mvp_slot_time_check check (ends_at > starts_at),
  constraint availability_mvp_slot_unique unique (poll_id, starts_at, ends_at)
);

create index if not exists availability_mvp_slots_poll_idx
  on availability_mvp.slots(poll_id, starts_at);

create table if not exists availability_mvp.responses (
  id uuid primary key default gen_random_uuid(),
  poll_id uuid not null references availability_mvp.polls(id) on delete cascade,
  participant_name text not null check (char_length(btrim(participant_name)) between 1 and 40),
  participant_token uuid not null unique default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create unique index if not exists availability_mvp_response_name_unique
  on availability_mvp.responses (poll_id, lower(btrim(participant_name)));

create table if not exists availability_mvp.response_slots (
  response_id uuid not null references availability_mvp.responses(id) on delete cascade,
  slot_id bigint not null references availability_mvp.slots(id) on delete cascade,
  primary key (response_id, slot_id)
);

create index if not exists availability_mvp_response_slots_slot_idx
  on availability_mvp.response_slots(slot_id);

revoke all on schema availability_mvp from public, anon, authenticated;
revoke all on all tables in schema availability_mvp from public, anon, authenticated;
revoke all on all sequences in schema availability_mvp from public, anon, authenticated;

create or replace function public.create_availability_poll(
  p_title text,
  p_timezone text,
  p_slots jsonb
)
returns uuid
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_poll_id uuid;
  v_public_token uuid;
  v_slot jsonb;
  v_start timestamptz;
  v_end timestamptz;
  v_count integer;
begin
  if p_title is null or char_length(btrim(p_title)) not between 1 and 80 then
    raise exception 'Title must be between 1 and 80 characters.';
  end if;

  if p_timezone is null or char_length(btrim(p_timezone)) not between 1 and 80 then
    raise exception 'Timezone is required.';
  end if;

  if p_slots is null or jsonb_typeof(p_slots) <> 'array' then
    raise exception 'Slots must be a JSON array.';
  end if;

  v_count := jsonb_array_length(p_slots);
  if v_count < 2 or v_count > 60 then
    raise exception 'Choose between 2 and 60 time slots.';
  end if;

  insert into availability_mvp.polls(title, timezone)
  values (btrim(p_title), btrim(p_timezone))
  returning id, public_token into v_poll_id, v_public_token;

  for v_slot in select value from jsonb_array_elements(p_slots)
  loop
    begin
      v_start := (v_slot->>'starts_at')::timestamptz;
      v_end := (v_slot->>'ends_at')::timestamptz;
    exception when others then
      raise exception 'Every slot needs valid starts_at and ends_at timestamps.';
    end;

    if v_start is null or v_end is null or v_end <= v_start then
      raise exception 'Every slot must end after it starts.';
    end if;

    if v_end - v_start > interval '12 hours' then
      raise exception 'A single slot cannot be longer than 12 hours.';
    end if;

    insert into availability_mvp.slots(poll_id, starts_at, ends_at)
    values (v_poll_id, v_start, v_end);
  end loop;

  return v_public_token;
end;
$$;

create or replace function public.get_availability_poll(p_token uuid)
returns jsonb
language sql
security definer
set search_path = ''
stable
as $$
  select jsonb_build_object(
    'title', p.title,
    'timezone', p.timezone,
    'created_at', p.created_at,
    'participant_count', (
      select count(*)
      from availability_mvp.responses r
      where r.poll_id = p.id
    ),
    'slots', coalesce((
      select jsonb_agg(
        jsonb_build_object(
          'id', s.id,
          'starts_at', s.starts_at,
          'ends_at', s.ends_at,
          'available_count', (
            select count(*)
            from availability_mvp.response_slots rs
            join availability_mvp.responses r2 on r2.id = rs.response_id
            where rs.slot_id = s.id and r2.poll_id = p.id
          ),
          'available_names', coalesce((
            select jsonb_agg(r3.participant_name order by lower(r3.participant_name))
            from availability_mvp.response_slots rs2
            join availability_mvp.responses r3 on r3.id = rs2.response_id
            where rs2.slot_id = s.id and r3.poll_id = p.id
          ), '[]'::jsonb)
        )
        order by s.starts_at, s.ends_at
      )
      from availability_mvp.slots s
      where s.poll_id = p.id
    ), '[]'::jsonb)
  )
  from availability_mvp.polls p
  where p.public_token = p_token;
$$;

create or replace function public.get_availability_response(
  p_token uuid,
  p_participant_token uuid
)
returns jsonb
language sql
security definer
set search_path = ''
stable
as $$
  select jsonb_build_object(
    'name', r.participant_name,
    'slot_ids', coalesce((
      select jsonb_agg(rs.slot_id order by rs.slot_id)
      from availability_mvp.response_slots rs
      where rs.response_id = r.id
    ), '[]'::jsonb)
  )
  from availability_mvp.responses r
  join availability_mvp.polls p on p.id = r.poll_id
  where p.public_token = p_token
    and r.participant_token = p_participant_token;
$$;

create or replace function public.submit_availability_response(
  p_token uuid,
  p_name text,
  p_slot_ids bigint[],
  p_participant_token uuid default null
)
returns uuid
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_poll_id uuid;
  v_response_id uuid;
  v_participant_token uuid;
  v_valid_count integer;
  v_requested_count integer;
begin
  if p_name is null or char_length(btrim(p_name)) not between 1 and 40 then
    raise exception 'Name must be between 1 and 40 characters.';
  end if;

  select id into v_poll_id
  from availability_mvp.polls
  where public_token = p_token;

  if v_poll_id is null then
    raise exception 'Poll not found.';
  end if;

  p_slot_ids := coalesce(p_slot_ids, array[]::bigint[]);

  select count(distinct x) into v_requested_count
  from unnest(p_slot_ids) as x;

  select count(*) into v_valid_count
  from availability_mvp.slots s
  where s.poll_id = v_poll_id
    and s.id = any(p_slot_ids);

  if v_valid_count <> v_requested_count then
    raise exception 'One or more selected slots do not belong to this poll.';
  end if;

  if p_participant_token is not null then
    select id, participant_token into v_response_id, v_participant_token
    from availability_mvp.responses
    where poll_id = v_poll_id
      and participant_token = p_participant_token;

    if v_response_id is null then
      raise exception 'Saved participant token is invalid for this poll.';
    end if;

    if exists (
      select 1
      from availability_mvp.responses r
      where r.poll_id = v_poll_id
        and lower(btrim(r.participant_name)) = lower(btrim(p_name))
        and r.id <> v_response_id
    ) then
      raise exception 'That name is already being used in this poll.';
    end if;

    update availability_mvp.responses
    set participant_name = btrim(p_name), updated_at = now()
    where id = v_response_id;
  else
    if exists (
      select 1
      from availability_mvp.responses r
      where r.poll_id = v_poll_id
        and lower(btrim(r.participant_name)) = lower(btrim(p_name))
    ) then
      raise exception 'That name is already being used. Use the same browser to edit your response.';
    end if;

    insert into availability_mvp.responses(poll_id, participant_name)
    values (v_poll_id, btrim(p_name))
    returning id, participant_token into v_response_id, v_participant_token;
  end if;

  delete from availability_mvp.response_slots
  where response_id = v_response_id;

  insert into availability_mvp.response_slots(response_id, slot_id)
  select v_response_id, x
  from (select distinct unnest(p_slot_ids) as x) q
  where x is not null;

  return v_participant_token;
end;
$$;

-- These four functions are intentionally callable by anonymous clients.
-- The high-entropy poll and participant tokens are the capability credentials.
revoke execute on function public.create_availability_poll(text, text, jsonb) from public;
revoke execute on function public.get_availability_poll(uuid) from public;
revoke execute on function public.get_availability_response(uuid, uuid) from public;
revoke execute on function public.submit_availability_response(uuid, text, bigint[], uuid) from public;

grant execute on function public.create_availability_poll(text, text, jsonb) to anon, authenticated;
grant execute on function public.get_availability_poll(uuid) to anon, authenticated;
grant execute on function public.get_availability_response(uuid, uuid) to anon, authenticated;
grant execute on function public.submit_availability_response(uuid, text, bigint[], uuid) to anon, authenticated;

commit;

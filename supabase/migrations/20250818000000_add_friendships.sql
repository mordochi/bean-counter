-- Create friendships table for managing user relationships
-- Uses a normalized approach where friendship is stored only once per pair
-- The constraint ensures user_id1 < user_id2 to avoid duplicates
create table if not exists public.friendships (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  user_id1 uuid references auth.users(id) on delete cascade not null,
  user_id2 uuid references auth.users(id) on delete cascade not null,
  status varchar(20) default 'pending' check (status in ('pending', 'accepted', 'rejected', 'blocked')),
  requested_by uuid references auth.users(id) on delete cascade not null,
  
  -- Ensure no self-friendships and normalized ordering (user_id1 < user_id2)
  constraint no_self_friendship check (user_id1 != user_id2),
  constraint normalized_friendship check (user_id1 < user_id2),
  constraint unique_friendship unique (user_id1, user_id2)
);

-- Create indexes for better performance
create index if not exists friendships_user1_idx on public.friendships(user_id1);
create index if not exists friendships_user2_idx on public.friendships(user_id2);
create index if not exists friendships_status_idx on public.friendships(status);
create index if not exists friendships_requested_by_idx on public.friendships(requested_by);

-- Enable Row Level Security (RLS)
alter table public.friendships enable row level security;

-- RLS policies for friendships
create policy "Users can view friendships they're part of" on public.friendships
  for select using (auth.uid() = user_id1 or auth.uid() = user_id2);

create policy "Users can create friendship requests" on public.friendships
  for insert with check (
    auth.uid() = requested_by and 
    (auth.uid() = user_id1 or auth.uid() = user_id2)
  );

create policy "Users can update friendships they're part of" on public.friendships
  for update using (auth.uid() = user_id1 or auth.uid() = user_id2);

create policy "Users can delete friendships they're part of" on public.friendships
  for delete using (auth.uid() = user_id1 or auth.uid() = user_id2);

-- Create trigger to automatically update updated_at on row updates
create trigger handle_friendships_updated_at
  before update on public.friendships
  for each row
  execute function public.handle_updated_at();

-- Create function to add a friendship (handles normalization automatically)
create or replace function public.add_friendship_request(friend_user_id uuid)
returns uuid as $$
declare
  current_user_id uuid := auth.uid();
  user1_id uuid;
  user2_id uuid;
  friendship_id uuid;
begin
  -- Ensure we're authenticated
  if current_user_id is null then
    raise exception 'Not authenticated';
  end if;
  
  -- Prevent self-friendship
  if current_user_id = friend_user_id then
    raise exception 'Cannot send friendship request to yourself';
  end if;
  
  -- Normalize the user IDs (smaller ID first)
  if current_user_id < friend_user_id then
    user1_id := current_user_id;
    user2_id := friend_user_id;
  else
    user1_id := friend_user_id;
    user2_id := current_user_id;
  end if;
  
  -- Insert the friendship request
  insert into public.friendships (user_id1, user_id2, requested_by)
  values (user1_id, user2_id, current_user_id)
  on conflict (user_id1, user_id2) do update set
    status = case 
      when friendships.status = 'rejected' then 'pending'
      else friendships.status
    end,
    requested_by = excluded.requested_by,
    updated_at = timezone('utc'::text, now())
  returning id into friendship_id;
  
  return friendship_id;
end;
$$ language plpgsql security definer;

-- Create function to accept a friendship request
create or replace function public.accept_friendship_request(friendship_id uuid)
returns boolean as $$
declare
  current_user_id uuid := auth.uid();
  friendship_row public.friendships%rowtype;
begin
  -- Ensure we're authenticated
  if current_user_id is null then
    raise exception 'Not authenticated';
  end if;
  
  -- Get the friendship record
  select * into friendship_row
  from public.friendships
  where id = friendship_id
  and (user_id1 = current_user_id or user_id2 = current_user_id)
  and status = 'pending';
  
  if not found then
    raise exception 'Friendship request not found or not pending';
  end if;
  
  -- Only the person who didn't send the request can accept it
  if friendship_row.requested_by = current_user_id then
    raise exception 'Cannot accept your own friendship request';
  end if;
  
  -- Update status to accepted
  update public.friendships
  set status = 'accepted', updated_at = timezone('utc'::text, now())
  where id = friendship_id;
  
  return true;
end;
$$ language plpgsql security definer;

-- Create function to get user's friends (accepted friendships)
create or replace function public.get_user_friends()
returns table (
  friend_id uuid,
  friend_email text,
  friendship_created_at timestamp with time zone
) as $$
declare
  current_user_id uuid := auth.uid();
begin
  -- Ensure we're authenticated
  if current_user_id is null then
    raise exception 'Not authenticated';
  end if;
  
  return query
  select 
    case 
      when f.user_id1 = current_user_id then f.user_id2
      else f.user_id1
    end as friend_id,
    case 
      when f.user_id1 = current_user_id then u2.email::text
      else u1.email::text
    end as friend_email,
    f.created_at as friendship_created_at
  from public.friendships f
  left join auth.users u1 on u1.id = f.user_id1
  left join auth.users u2 on u2.id = f.user_id2
  where (f.user_id1 = current_user_id or f.user_id2 = current_user_id)
  and f.status = 'accepted'
  order by f.created_at desc;
end;
$$ language plpgsql security definer;
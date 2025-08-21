-- Update get_user_friends function to include user metadata (name and avatar)
-- First drop the existing function since we're changing the return type
drop function if exists public.get_user_friends();

create function public.get_user_friends()
returns table (
  friend_id uuid,
  friend_email text,
  friend_name text,
  friend_avatar text,
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
    case 
      when f.user_id1 = current_user_id then (u2.raw_user_meta_data->>'name')::text
      else (u1.raw_user_meta_data->>'name')::text
    end as friend_name,
    case 
      when f.user_id1 = current_user_id then (u2.raw_user_meta_data->>'avatar_url')::text
      else (u1.raw_user_meta_data->>'avatar_url')::text
    end as friend_avatar,
    f.created_at as friendship_created_at
  from public.friendships f
  left join auth.users u1 on u1.id = f.user_id1
  left join auth.users u2 on u2.id = f.user_id2
  where (f.user_id1 = current_user_id or f.user_id2 = current_user_id)
  and f.status = 'accepted'
  order by f.created_at desc;
end;
$$ language plpgsql security definer;
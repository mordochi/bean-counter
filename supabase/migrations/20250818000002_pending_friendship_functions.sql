-- Additional functions for managing pending friendship requests

-- Create function to get pending friendship requests for the current user
create or replace function public.get_pending_friendship_requests()
returns table (
  friendship_id uuid,
  requester_id uuid,
  requester_email text,
  created_at timestamp with time zone
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
    f.id as friendship_id,
    f.requested_by as requester_id,
    case 
      when f.user_id1 = current_user_id then u2.email::text
      else u1.email::text
    end as requester_email,
    f.created_at
  from public.friendships f
  left join auth.users u1 on u1.id = f.requested_by and f.user_id1 = f.requested_by
  left join auth.users u2 on u2.id = f.requested_by and f.user_id2 = f.requested_by
  where (f.user_id1 = current_user_id or f.user_id2 = current_user_id)
  and f.requested_by != current_user_id
  and f.status = 'pending'
  order by f.created_at desc;
end;
$$ language plpgsql security definer;

-- Create function to reject a friendship request
create or replace function public.reject_friendship_request(friendship_id uuid)
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
  
  -- Only the person who didn't send the request can reject it
  if friendship_row.requested_by = current_user_id then
    raise exception 'Cannot reject your own friendship request';
  end if;
  
  -- Update status to rejected
  update public.friendships
  set status = 'rejected', updated_at = timezone('utc'::text, now())
  where id = friendship_id;
  
  return true;
end;
$$ language plpgsql security definer;

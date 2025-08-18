-- Additional friendship functions

-- Create function to add a friendship by email (handles normalization automatically)
create or replace function public.add_friendship_request_by_email(friend_email text)
returns uuid as $$
declare
  current_user_id uuid := auth.uid();
  friend_user_id uuid;
  user1_id uuid;
  user2_id uuid;
  friendship_id uuid;
begin
  -- Ensure we're authenticated
  if current_user_id is null then
    raise exception 'Not authenticated';
  end if;
  
  -- Find the user by email
  select id into friend_user_id
  from auth.users
  where email = friend_email;
  
  if friend_user_id is null then
    raise exception 'User with email % not found', friend_email;
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

-- Create function to unfriend a user (delete friendship)
-- Can only unfriend if there are no active shared boards between the users
create or replace function public.unfriend_user(friend_user_id uuid)
returns boolean as $$
declare
  current_user_id uuid := auth.uid();
  user1_id uuid;
  user2_id uuid;
  shared_board_count integer;
  friendship_exists boolean;
begin
  -- Ensure we're authenticated
  if current_user_id is null then
    raise exception 'Not authenticated';
  end if;
  
  -- Prevent self-unfriending
  if current_user_id = friend_user_id then
    raise exception 'Cannot unfriend yourself';
  end if;
  
  -- Normalize the user IDs (smaller ID first)
  if current_user_id < friend_user_id then
    user1_id := current_user_id;
    user2_id := friend_user_id;
  else
    user1_id := friend_user_id;
    user2_id := current_user_id;
  end if;
  
  -- Check if friendship exists and is accepted
  select exists(
    select 1 from public.friendships
    where user_id1 = user1_id 
    and user_id2 = user2_id 
    and status = 'accepted'
  ) into friendship_exists;
  
  if not friendship_exists then
    raise exception 'No accepted friendship exists between these users';
  end if;
  
  -- Check if there are any shared boards between these users
  select count(*) into shared_board_count
  from public.shared_boards
  where (user1_id = current_user_id and user2_id = friend_user_id)
     or (user1_id = friend_user_id and user2_id = current_user_id);
  
  if shared_board_count > 0 then
    raise exception 'Cannot unfriend user: % shared board(s) exist between you. Please delete shared boards first.', shared_board_count;
  end if;
  
  -- Delete the friendship
  delete from public.friendships
  where user_id1 = user1_id and user_id2 = user2_id;
  
  return true;
end;
$$ language plpgsql security definer;
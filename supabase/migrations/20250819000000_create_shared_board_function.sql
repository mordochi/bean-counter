-- Create shared board function

-- Create function to create a shared board between current user and a friend
create or replace function public.create_shared_board(friend_id uuid, p_board_name text)
returns uuid as $$
declare
  current_user_id uuid := auth.uid();
  new_board_id uuid;
  friendship_exists boolean;
  board_name_exists boolean;
begin
  -- Ensure we're authenticated
  if current_user_id is null then
    raise exception 'Not authenticated';
  end if;
  
  -- Prevent creating board with yourself
  if current_user_id = friend_id then
    raise exception 'Cannot create shared board with yourself';
  end if;
  
  -- Validate board name
  if p_board_name is null or trim(p_board_name) = '' then
    raise exception 'Board name is required';
  end if;
  
  -- Check if friendship exists and is accepted
  select exists(
    select 1 from public.friendships
    where ((user_id1 = current_user_id and user_id2 = friend_id)
        or (user_id1 = friend_id and user_id2 = current_user_id))
    and status = 'accepted'
  ) into friendship_exists;
  
  if not friendship_exists then
    raise exception 'No accepted friendship exists with this user';
  end if;
  
  -- Check if board name already exists between these users
  select exists(
    select 1 from public.shared_boards
    where ((user1_id = current_user_id and user2_id = friend_id)
        or (user1_id = friend_id and user2_id = current_user_id))
    and board_name = trim(p_board_name)
  ) into board_name_exists;
     
  if board_name_exists then
    raise exception 'A board named "%" already exists between you and this user', trim(p_board_name);
  end if;
  
  -- Create the shared board
  insert into public.shared_boards (user1_id, user2_id, board_name)
  values (current_user_id, friend_id, trim(p_board_name))
  returning id into new_board_id;
  
  return new_board_id;
end;
$$ language plpgsql security definer;
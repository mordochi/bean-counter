-- Create shared boards table for managing transaction boards between two people
create table if not exists public.shared_boards (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  user1_id uuid references auth.users(id) on delete cascade not null,
  user2_id uuid references auth.users(id) on delete cascade not null,
  board_name varchar(100) default 'Shared Expenses',
  unique(user1_id, user2_id)
);

-- Create Transaction table for bean counter app
create table if not exists public.transactions (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  shared_board_id uuid references public.shared_boards(id) on delete cascade not null,
  date date not null,
  item text not null,
  total_amount decimal(10,2) not null,
  people_involved integer not null default 2,
  paid_by_user_id uuid references auth.users(id) on delete cascade not null,
  added_by_user_id uuid references auth.users(id) on delete cascade not null
);

-- Create indexes for better performance
create index if not exists shared_boards_user1_idx on public.shared_boards(user1_id);
create index if not exists shared_boards_user2_idx on public.shared_boards(user2_id);
create index if not exists transactions_board_idx on public.transactions(shared_board_id);
create index if not exists transactions_date_idx on public.transactions(date);
create index if not exists transactions_paid_by_idx on public.transactions(paid_by_user_id);
create index if not exists transactions_added_by_idx on public.transactions(added_by_user_id);

-- Enable Row Level Security (RLS)
alter table public.shared_boards enable row level security;
alter table public.transactions enable row level security;

-- RLS policies for shared_boards
create policy "Users can view boards they're part of" on public.shared_boards
  for select using (auth.uid() = user1_id or auth.uid() = user2_id);

create policy "Users can create boards" on public.shared_boards
  for insert with check (auth.uid() = user1_id);

create policy "Users can update boards they're part of" on public.shared_boards
  for update using (auth.uid() = user1_id or auth.uid() = user2_id);

-- RLS policies for transactions
create policy "Users can view transactions in their shared boards" on public.transactions
  for select using (
    exists (
      select 1 from public.shared_boards sb 
      where sb.id = shared_board_id 
      and (sb.user1_id = auth.uid() or sb.user2_id = auth.uid())
    )
  );

create policy "Users can insert transactions in their shared boards" on public.transactions
  for insert with check (
    exists (
      select 1 from public.shared_boards sb 
      where sb.id = shared_board_id 
      and (sb.user1_id = auth.uid() or sb.user2_id = auth.uid())
    )
    and added_by_user_id = auth.uid()
    and (paid_by_user_id = (select user1_id from public.shared_boards where id = shared_board_id)
         or paid_by_user_id = (select user2_id from public.shared_boards where id = shared_board_id))
  );

create policy "Users can update transactions in their shared boards" on public.transactions
  for update using (
    exists (
      select 1 from public.shared_boards sb 
      where sb.id = shared_board_id 
      and (sb.user1_id = auth.uid() or sb.user2_id = auth.uid())
    )
  );

create policy "Users can delete transactions in their shared boards" on public.transactions
  for delete using (
    exists (
      select 1 from public.shared_boards sb 
      where sb.id = shared_board_id 
      and (sb.user1_id = auth.uid() or sb.user2_id = auth.uid())
    )
  );

-- Create function to automatically update updated_at timestamp
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = timezone('utc'::text, now());
  return new;
end;
$$ language plpgsql;

-- Create triggers to automatically update updated_at on row updates
create trigger handle_shared_boards_updated_at
  before update on public.shared_boards
  for each row
  execute function public.handle_updated_at();

create trigger handle_transactions_updated_at
  before update on public.transactions
  for each row
  execute function public.handle_updated_at();
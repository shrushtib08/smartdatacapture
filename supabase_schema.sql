-- Run this SQL in your Supabase SQL Editor

-- 1. Create a table for User Profiles (optional, but good practice)
create table public.profiles (
  id uuid references auth.users not null primary key,
  full_name text,
  updated_at timestamp with time zone
);

-- 2. Create a table for Captures (History)
create table public.captures (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users not null,
  type text check (type in ('image', 'voice')),
  content text, -- The extracted text
  preview_url text, -- Optional: URL to image if using Storage, or base64 (careful with size)
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. Enable Row Level Security (RLS)
alter table public.profiles enable row level security;
alter table public.captures enable row level security;

-- 4. Create Policies (Security Rules)

-- Profiles: Users can view/edit their own profile
create policy "Users can view own profile" on profiles for select
  using ( auth.uid() = id );
create policy "Users can update own profile" on profiles for update
  using ( auth.uid() = id );

-- Captures: Users can only see their own captures
create policy "Users can view own captures" on captures for select
  using ( auth.uid() = user_id );

-- Captures: Users can insert their own captures
create policy "Users can insert own captures" on captures for insert
  with check ( auth.uid() = user_id );

-- Captures: Users can delete their own captures
create policy "Users can delete own captures" on captures for delete
  using ( auth.uid() = user_id );

-- 5. Trigger to create profile on signup
create or replace function public.handle_new_user() 
returns trigger as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, new.raw_user_meta_data->>'full_name');
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

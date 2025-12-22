-- 1. Create profiles table (Users)
create table if not exists public.profiles (
  id uuid references auth.users not null primary key,
  email text,
  full_name text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Create captures table (History)
create table if not exists public.captures (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users not null,
  type text check (type in ('image', 'voice')),
  content text,
  preview_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. Enable Row Level Security (Security)
alter table public.profiles enable row level security;
alter table public.captures enable row level security;

-- 4. Create Security Policies
-- Allow users to view their own profile
create policy "Users can view own profile" on public.profiles
  for select using (auth.uid() = id);

-- Allow users to insert their own profile
create policy "Users can insert their own profile" on public.profiles
  for insert with check (auth.uid() = id);

-- Allow users to view their own captures
create policy "Users can view own captures" on public.captures
  for select using (auth.uid() = user_id);

-- Allow users to create captures
create policy "Users can insert own captures" on public.captures
  for insert with check (auth.uid() = user_id);

-- Allow users to delete their own captures
create policy "Users can delete own captures" on public.captures
  for delete using (auth.uid() = user_id);

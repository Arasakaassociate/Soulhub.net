-- SoulHub.net Database Schema

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- PROFILES
create table profiles (
  id uuid references auth.users not null primary key,
  username text unique,
  avatar_url text,
  full_name text,
  updated_at timestamp with time zone,
  
  constraint username_length check (char_length(username) >= 3)
);

-- COMPANIONS (AI Characters)
create table companions (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  description text not null,
  avatar_url text not null,
  personality_model text default 'generic',
  tags text[], -- e.g. ['Realistic', 'Anime']
  is_online boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- MESSAGES
create table messages (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references profiles(id) on delete cascade not null,
  companion_id uuid references companions(id) on delete cascade not null,
  content text not null,
  is_from_companion boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Row Level Security (RLS)
alter table profiles enable row level security;
alter table companions enable row level security;
alter table messages enable row level security;

-- Policies
-- 1. Profiles: Publicly viewable by anyone (needed for message display)
create policy "Public profiles are viewable by everyone." on profiles for select using ( true );
-- 2. Profiles: Users can only create their OWN profile (id matches auth.uid)
create policy "Users can insert their own profile." on profiles for insert with check ( auth.uid() = id );
-- 3. Profiles: Users can only update their OWN profile
create policy "Users can update own profile." on profiles for update using ( auth.uid() = id );

-- 4. Companions: Publicly viewable
create policy "Companions are viewable by everyone." on companions for select using ( true );
-- 5. Companions: Only authenticated users can create companions
create policy "Users can insert companions." on companions for insert with check ( auth.role() = 'authenticated' );

-- 6. Messages: Users can only see messages they are part of (sent or received? Current logic only checks user_id)
-- Note: This assumes 'user_id' is the owner. If you want to check receiving, you might need more complex logic.
create policy "Users can view their own messages." on messages for select using ( auth.uid() = user_id );
-- 7. Messages: Users can only insert messages as themselves
create policy "Users can insert their own messages." on messages for insert with check ( auth.uid() = user_id );

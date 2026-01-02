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
create policy "Public profiles are viewable by everyone." on profiles for select using ( true );
create policy "Users can insert their own profile." on profiles for insert with check ( auth.uid() = id );
create policy "Users can update own profile." on profiles for update using ( auth.uid() = id );

create policy "Companions are viewable by everyone." on companions for select using ( true );
create policy "Users can insert companions." on companions for insert with check ( auth.role() = 'authenticated' );

create policy "Users can view their own messages." on messages for select using ( auth.uid() = user_id );
create policy "Users can insert their own messages." on messages for insert with check ( auth.uid() = user_id );

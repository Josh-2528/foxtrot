-- Foxtrot Database Migration
-- Run this in your Supabase SQL editor

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- ============================================================
-- 1. Users table
-- ============================================================
create table public.users (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  business_name text,
  website_url text,
  industry text,
  business_description text,
  plan_id text default 'trial',
  trial_started_at timestamptz default now(),
  stripe_customer_id text,
  stripe_subscription_id text,
  subscription_status text,
  posting_frequency text default '3_week',
  caption_style text default 'medium',
  caption_tone text default 'casual',
  default_hashtags text,
  default_cta text default 'Link in bio',
  email_new_content boolean default true,
  email_weekly_summary boolean default true,
  onboarding_completed boolean default false,
  created_at timestamptz default now()
);

-- ============================================================
-- 2. Brand kits
-- ============================================================
create table public.brand_kits (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references public.users(id) on delete cascade,
  logo_url text,
  primary_colour text default '#10b981',
  secondary_colour text default '#0f1729',
  accent_colour text default '#f59e0b',
  background_colour text default '#ffffff',
  text_colour text default '#111827',
  font_preference text default 'Inter',
  vibe text default 'clean_minimal',
  extracted_from_website jsonb,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ============================================================
-- 3. Content ideas
-- ============================================================
create table public.content_ideas (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references public.users(id) on delete cascade,
  topic text not null,
  description text,
  post_type text not null,
  suggested_visual_mode text default 'graphic',
  status text default 'generated',
  batch_id uuid,
  created_at timestamptz default now()
);

-- ============================================================
-- 4. Posts
-- ============================================================
create table public.posts (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references public.users(id) on delete cascade,
  idea_id uuid references public.content_ideas(id) on delete set null,
  visual_html text,
  visual_url text,
  visual_mode text default 'graphic',
  uploaded_photo_url text,
  caption text,
  hashtags text,
  cta text,
  alt_text text,
  post_size text default 'square_1080',
  status text default 'draft',
  scheduled_date date,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ============================================================
-- 5. API usage tracking
-- ============================================================
create table public.api_usage_log (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references public.users(id) on delete cascade,
  action text not null,
  input_tokens integer default 0,
  output_tokens integer default 0,
  estimated_cost_usd numeric(10, 6) default 0,
  created_at timestamptz default now()
);

-- ============================================================
-- 6. Indexes
-- ============================================================
create index idx_brand_kits_user_id on public.brand_kits(user_id);
create index idx_content_ideas_user_id on public.content_ideas(user_id);
create index idx_content_ideas_status on public.content_ideas(status);
create index idx_posts_user_id on public.posts(user_id);
create index idx_posts_status on public.posts(status);
create index idx_posts_scheduled_date on public.posts(scheduled_date);
create index idx_api_usage_log_user_id on public.api_usage_log(user_id);
create index idx_api_usage_log_created_at on public.api_usage_log(created_at);

-- ============================================================
-- 7. Row Level Security
-- ============================================================
alter table public.users enable row level security;
alter table public.brand_kits enable row level security;
alter table public.content_ideas enable row level security;
alter table public.posts enable row level security;
alter table public.api_usage_log enable row level security;

-- Users policies
create policy "Users can view own profile" on public.users for select using (auth.uid() = id);
create policy "Users can update own profile" on public.users for update using (auth.uid() = id);
create policy "Service role full access users" on public.users for all using (true);

-- Brand kits policies
create policy "Users can view own brand kit" on public.brand_kits for select using (auth.uid() = user_id);
create policy "Users can insert own brand kit" on public.brand_kits for insert with check (auth.uid() = user_id);
create policy "Users can update own brand kit" on public.brand_kits for update using (auth.uid() = user_id);
create policy "Service role full access brand_kits" on public.brand_kits for all using (true);

-- Content ideas policies
create policy "Users can view own ideas" on public.content_ideas for select using (auth.uid() = user_id);
create policy "Users can insert own ideas" on public.content_ideas for insert with check (auth.uid() = user_id);
create policy "Users can update own ideas" on public.content_ideas for update using (auth.uid() = user_id);
create policy "Users can delete own ideas" on public.content_ideas for delete using (auth.uid() = user_id);
create policy "Service role full access content_ideas" on public.content_ideas for all using (true);

-- Posts policies
create policy "Users can view own posts" on public.posts for select using (auth.uid() = user_id);
create policy "Users can insert own posts" on public.posts for insert with check (auth.uid() = user_id);
create policy "Users can update own posts" on public.posts for update using (auth.uid() = user_id);
create policy "Users can delete own posts" on public.posts for delete using (auth.uid() = user_id);
create policy "Service role full access posts" on public.posts for all using (true);

-- API usage policies
create policy "Users can view own usage" on public.api_usage_log for select using (auth.uid() = user_id);
create policy "Service role full access api_usage" on public.api_usage_log for all using (true);

-- ============================================================
-- 8. Handle new user trigger
-- ============================================================
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.users (id, email, trial_started_at)
  values (new.id, new.email, now());
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ============================================================
-- 9. Updated at trigger
-- ============================================================
create or replace function public.update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger brand_kits_updated_at before update on public.brand_kits
  for each row execute procedure public.update_updated_at();
create trigger posts_updated_at before update on public.posts
  for each row execute procedure public.update_updated_at();

-- ============================================================
-- 10. Storage bucket for brand assets
-- ============================================================
-- Create a public bucket named "brand-assets" in Supabase Dashboard > Storage
-- Policy: Allow authenticated users to upload to their own folder (logos/{user_id}/*)

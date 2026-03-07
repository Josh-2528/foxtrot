-- Migration: Add key_services column to users + unique constraint on brand_kits.user_id
-- Run after migration.sql

-- Add key_services column to users table
alter table public.users add column if not exists key_services text;

-- Add unique constraint on brand_kits.user_id (required for upsert onConflict)
alter table public.brand_kits add constraint brand_kits_user_id_unique unique (user_id);

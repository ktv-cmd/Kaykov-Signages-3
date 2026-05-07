-- Run this in Supabase SQL Editor with safe mode OFF
-- Creates the leads table from scratch with all required columns

CREATE TABLE IF NOT EXISTS leads (
  id                    uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at            timestamptz NOT NULL DEFAULT now(),

  -- Contact info
  name                  text NOT NULL,
  email                 text NOT NULL,
  phone                 text,
  company               text,

  -- Uploaded files (Supabase Storage public URLs)
  storefront_url        text,
  logo_url              text,
  generated_url         text,

  -- Sign size estimation
  sign_width_in         float8,
  sign_height_in        float8,
  sign_area_sizes       jsonb,
  size_method           text,        -- 'door-reference' | 'user-input' | 'ai-estimate'

  -- Door detection
  door_detected         boolean,
  door_confidence       float8,

  -- Sign placement info (from quote form)
  sign_zone             text,        -- 'above-door' | 'window' | 'wall' | 'awning' | 'unknown'
  storefront_width_ft   float8,

  -- Source tracking
  source                text,        -- utm_source value or 'direct'
  flow_type             text         -- 'quote-form' | 'sign-ai'
);

-- Allow anyone to insert leads (required for client-side quote form)
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "allow_insert" ON leads FOR INSERT WITH CHECK (true);
CREATE POLICY "allow_select_service" ON leads FOR SELECT USING (true);

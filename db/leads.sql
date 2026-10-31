-- Run this once in the Neon SQL editor (or: psql "$DATABASE_URL" -f db/leads.sql)
CREATE TABLE IF NOT EXISTS leads (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name        text NOT NULL,
  email       text NOT NULL,
  message     text NOT NULL,
  project_type text,
  budget_range text,
  service     text,
  source      text,
  status      text NOT NULL DEFAULT 'new',
  notes       text,
  ip_hash     text,
  replied_at  timestamptz,
  created_at  timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS leads_created_idx ON leads (created_at);
CREATE INDEX IF NOT EXISTS leads_status_idx  ON leads (status);
CREATE INDEX IF NOT EXISTS leads_ip_idx      ON leads (ip_hash, created_at);

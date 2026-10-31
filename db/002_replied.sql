-- Run once in the Neon SQL editor if your leads table already exists.
ALTER TABLE leads ADD COLUMN IF NOT EXISTS replied_at timestamptz;

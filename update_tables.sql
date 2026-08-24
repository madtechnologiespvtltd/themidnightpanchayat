-- SQL Script to create the `tables` table

CREATE TABLE IF NOT EXISTS tables (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  table_number INTEGER UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS and create policies
ALTER TABLE tables ENABLE ROW LEVEL SECURITY;

-- Allow public read access so the customer frontend or admin can view the tables
CREATE POLICY "Tables are public to view" ON tables FOR SELECT USING (true);

-- Allow public insert/update/delete for admin panel (assuming admin operates on the same client, or we could require authenticated users)
-- Since RLS is enabled, we need to allow the admin panel to mutate it.
CREATE POLICY "Tables can be inserted" ON tables FOR INSERT WITH CHECK (true);
CREATE POLICY "Tables can be updated" ON tables FOR UPDATE USING (true);
CREATE POLICY "Tables can be deleted" ON tables FOR DELETE USING (true);

-- SQL Script to create restaurant_settings table

-- 1. Create table
CREATE TABLE IF NOT EXISTS restaurant_settings (
  id INTEGER PRIMARY KEY DEFAULT 1,
  payment_qr_url TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  CONSTRAINT single_row CHECK (id = 1) -- Enforces only one settings record
);

-- 2. Insert default row if not exists
INSERT INTO restaurant_settings (id, payment_qr_url)
VALUES (1, NULL)
ON CONFLICT (id) DO NOTHING;

-- 3. Enable RLS
ALTER TABLE restaurant_settings ENABLE ROW LEVEL SECURITY;

-- 4. Policies
DROP POLICY IF EXISTS "Settings are public." ON restaurant_settings;
DROP POLICY IF EXISTS "Admins can update settings." ON restaurant_settings;

CREATE POLICY "Settings are public." ON restaurant_settings FOR SELECT USING (true);
CREATE POLICY "Admins can update settings." ON restaurant_settings FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Admins can insert settings." ON restaurant_settings FOR INSERT WITH CHECK (auth.role() = 'authenticated');

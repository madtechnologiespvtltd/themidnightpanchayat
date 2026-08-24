-- SQL Schema for The Midnight Panchayat

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Drop existing tables so you can re-run this cleanly
DROP TABLE IF EXISTS staff_requests CASCADE;
DROP TABLE IF EXISTS order_items CASCADE;
DROP TABLE IF EXISTS orders CASCADE;
DROP TABLE IF EXISTS menu_items CASCADE;
DROP TABLE IF EXISTS categories CASCADE;

-- 1. Categories Table
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Menu Items Table
CREATE TABLE menu_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  category_id UUID REFERENCES categories(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  price INTEGER NOT NULL,
  presentation_type TEXT DEFAULT 'plate',
  image_url TEXT,
  is_available BOOLEAN DEFAULT true,
  variants JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Orders Table
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  customer_name TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  table_number INTEGER NOT NULL,
  total_amount INTEGER NOT NULL,
  status TEXT NOT NULL DEFAULT 'Received', -- 'Received', 'Preparing', 'Ready', 'Served'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Order Items Table
CREATE TABLE order_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  menu_item_id UUID REFERENCES menu_items(id) ON DELETE SET NULL,
  quantity INTEGER NOT NULL,
  customizations JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. Staff Requests Table
CREATE TABLE staff_requests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  table_number INTEGER NOT NULL,
  request_type TEXT NOT NULL, -- 'call_staff' or 'bill'
  status TEXT NOT NULL DEFAULT 'pending', -- 'pending' or 'resolved'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Realtime for dynamic tables
alter publication supabase_realtime add table orders;
alter publication supabase_realtime add table staff_requests;
alter publication supabase_realtime add table menu_items;

-- The database data can be populated by running `node seed_menu.mjs` in the frontend directory.

-- Disable RLS or set open policies so the frontend can access data without logging in
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Categories are public." ON categories FOR SELECT USING (true);

ALTER TABLE menu_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Menu items are public." ON menu_items FOR SELECT USING (true);
CREATE POLICY "Menu items are updatable." ON menu_items FOR UPDATE USING (true);

ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Orders can be created." ON orders FOR INSERT WITH CHECK (true);
CREATE POLICY "Orders can be viewed." ON orders FOR SELECT USING (true);
CREATE POLICY "Orders can be updated." ON orders FOR UPDATE USING (true);

ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Order items can be created." ON order_items FOR INSERT WITH CHECK (true);
CREATE POLICY "Order items can be viewed." ON order_items FOR SELECT USING (true);

ALTER TABLE staff_requests ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Requests can be created." ON staff_requests FOR INSERT WITH CHECK (true);
CREATE POLICY "Requests can be viewed." ON staff_requests FOR SELECT USING (true);
CREATE POLICY "Requests can be updated." ON staff_requests FOR UPDATE USING (true);

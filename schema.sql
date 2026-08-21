-- SQL Schema for The Midnight Panchayat

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

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

-- Insert Mock Data
INSERT INTO categories (id, name, sort_order) VALUES
('b3035b89-22a3-4886-90fc-2db8b919d3ee', 'COFFEE', 1),
('6debe1cd-c8dc-4e20-bca4-d13fb597ea3b', 'TEA', 2),
('05bbecf2-951c-4b55-a083-d922ec219808', 'BREAKFAST', 3);

INSERT INTO menu_items (category_id, name, description, price, presentation_type, image_url, variants) VALUES
('b3035b89-22a3-4886-90fc-2db8b919d3ee', 'Espresso', 'A rich, full-bodied shot of our signature house blend.', 120, 'cup', '/food/espresso.png', '[{"id": "v1", "name": "Single", "priceDelta": 0}, {"id": "v2", "name": "Double", "priceDelta": 50}]'),
('b3035b89-22a3-4886-90fc-2db8b919d3ee', 'Cappuccino', 'Classic espresso topped with deeply steamed milk and a thick layer of foam.', 180, 'cup', '/food/cappuccino.png', '[{"id": "v1", "name": "Regular", "priceDelta": 0}, {"id": "v2", "name": "Large", "priceDelta": 40}]'),
('6debe1cd-c8dc-4e20-bca4-d13fb597ea3b', 'Masala Chai', 'Traditional spiced tea.', 80, 'cup', '/food/chai.png', '[]'),
('05bbecf2-951c-4b55-a083-d922ec219808', 'Pancakes', 'Fluffy buttermilk pancakes with maple syrup.', 220, 'plate', null, '[]');

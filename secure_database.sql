-- SQL Script to secure the database for production
-- This ensures only logged-in Admins can modify the menu, while customers can still read the menu and place orders.

-- 1. Secure Menu Items
DROP POLICY IF EXISTS "Menu items can be inserted." ON menu_items;
DROP POLICY IF EXISTS "Menu items can be deleted." ON menu_items;
DROP POLICY IF EXISTS "Menu items are updatable." ON menu_items;

CREATE POLICY "Admins can insert menu items" ON menu_items FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Admins can update menu items" ON menu_items FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Admins can delete menu items" ON menu_items FOR DELETE USING (auth.role() = 'authenticated');

-- 2. Secure Categories
DROP POLICY IF EXISTS "Categories can be inserted" ON categories;
DROP POLICY IF EXISTS "Categories can be updated" ON categories;
DROP POLICY IF EXISTS "Categories can be deleted" ON categories;

CREATE POLICY "Admins can insert categories" ON categories FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Admins can update categories" ON categories FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Admins can delete categories" ON categories FOR DELETE USING (auth.role() = 'authenticated');

-- 3. Secure Tables
DROP POLICY IF EXISTS "Tables are updatable." ON tables;
DROP POLICY IF EXISTS "Tables can be inserted." ON tables;
DROP POLICY IF EXISTS "Tables can be deleted." ON tables;

CREATE POLICY "Admins can insert tables" ON tables FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Admins can update tables" ON tables FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Admins can delete tables" ON tables FOR DELETE USING (auth.role() = 'authenticated');

-- 4. Secure Orders (Customers can create orders, but only Admins can update their status)
DROP POLICY IF EXISTS "Orders can be updated." ON orders;
CREATE POLICY "Admins can update orders" ON orders FOR UPDATE USING (auth.role() = 'authenticated');

-- Note: The "Orders can be created." policy remains public (USING (true)) so customers can checkout!

-- 5. Secure Storage (Only Admins can upload/delete images)
DROP POLICY IF EXISTS "Allow public uploads" ON storage.objects;
DROP POLICY IF EXISTS "Allow public updates" ON storage.objects;
DROP POLICY IF EXISTS "Allow public deletes" ON storage.objects;

CREATE POLICY "Admins can upload images" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'menu-images' AND auth.role() = 'authenticated');
CREATE POLICY "Admins can update images" ON storage.objects FOR UPDATE USING (bucket_id = 'menu-images' AND auth.role() = 'authenticated');
CREATE POLICY "Admins can delete images" ON storage.objects FOR DELETE USING (bucket_id = 'menu-images' AND auth.role() = 'authenticated');

-- Note: The "Public Access" policy remains so customers can see the images.

-- SQL Script to enable adding/deleting menu items from the admin panel

-- Allow public insert and delete for menu items
CREATE POLICY "Menu items can be inserted." ON menu_items FOR INSERT WITH CHECK (true);
CREATE POLICY "Menu items can be deleted." ON menu_items FOR DELETE USING (true);

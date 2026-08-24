import fs from 'fs';
import path from 'path';

const categories = [
  'NOODLES', 'RICE', 'CHILLI POTATOES', 'BURGER', 'SANDWICH',
  'SPRING ROLLS', 'MOMOS', 'FRIES', 'PASTA', 'MAGGI',
  'PIZZA', 'MOJITO', 'COFFEE', 'SHAKES', 'CHAI'
];

const menu = [
  // Noodles
  { cat: 'NOODLES', name: 'Veg Noodles', price: 59, variants: [{id: 'half', name: 'Half', priceDelta: 0}, {id: 'full', name: 'Full', priceDelta: 40}] },
  { cat: 'NOODLES', name: 'Singapore Noodles', price: 69, variants: [{id: 'half', name: 'Half', priceDelta: 0}, {id: 'full', name: 'Full', priceDelta: 50}] },
  { cat: 'NOODLES', name: 'Chilli Garlic Noodles', price: 79, variants: [{id: 'half', name: 'Half', priceDelta: 0}, {id: 'full', name: 'Full', priceDelta: 50}] },
  { cat: 'NOODLES', name: 'Hakka Noodles', price: 79, variants: [{id: 'half', name: 'Half', priceDelta: 0}, {id: 'full', name: 'Full', priceDelta: 50}] },
  
  // Rice
  { cat: 'RICE', name: 'Fried Rice', price: 59, variants: [{id: 'half', name: 'Half', priceDelta: 0}, {id: 'full', name: 'Full', priceDelta: 60}] },
  { cat: 'RICE', name: 'Paneer Fried Rice', price: 79, variants: [{id: 'half', name: 'Half', priceDelta: 0}, {id: 'full', name: 'Full', priceDelta: 50}] },
  
  // Chilli Potatoes
  { cat: 'CHILLI POTATOES', name: 'Chilli Potatoes', price: 69, variants: [{id: 'half', name: 'Half', priceDelta: 0}, {id: 'full', name: 'Full', priceDelta: 60}] },
  { cat: 'CHILLI POTATOES', name: 'Honey Chilli Potatoes', price: 79, variants: [{id: 'half', name: 'Half', priceDelta: 0}, {id: 'full', name: 'Full', priceDelta: 60}] },
  
  // Burger
  { cat: 'BURGER', name: 'Veg Burger', price: 49 },
  { cat: 'BURGER', name: 'Paneer Burger', price: 59 },
  { cat: 'BURGER', name: 'Cheese Burger', price: 69 },
  { cat: 'BURGER', name: 'Loaded Burger', price: 99 },
  
  // Sandwich
  { cat: 'SANDWICH', name: 'Veg Sandwich', price: 59 },
  { cat: 'SANDWICH', name: 'Cheese Sandwich', price: 69 },
  { cat: 'SANDWICH', name: 'Paneer Sandwich', price: 79 },
  { cat: 'SANDWICH', name: 'Cheese Paneer Sandwich', price: 99 },
  
  // Spring Rolls
  { cat: 'SPRING ROLLS', name: 'Veg Spring Rolls', price: 79 },
  { cat: 'SPRING ROLLS', name: 'Paneer Spring Rolls', price: 99 },
  
  // Momos
  { cat: 'MOMOS', name: 'Veg Steam Momo', price: 49, variants: [{id: '4pcs', name: '4 pcs', priceDelta: 0}, {id: '8pcs', name: '8 pcs', priceDelta: 20}] },
  { cat: 'MOMOS', name: 'Veg Fried Momo', price: 49, variants: [{id: '4pcs', name: '4 pcs', priceDelta: 0}, {id: '8pcs', name: '8 pcs', priceDelta: 20}] },
  { cat: 'MOMOS', name: 'Veg Kurkure Momo', price: 69, variants: [{id: '4pcs', name: '4 pcs', priceDelta: 0}, {id: '8pcs', name: '8 pcs', priceDelta: 30}] },
  { cat: 'MOMOS', name: 'Tandoori Momo', price: 79, variants: [{id: '4pcs', name: '4 pcs', priceDelta: 0}, {id: '8pcs', name: '8 pcs', priceDelta: 40}] },
  { cat: 'MOMOS', name: 'Gravy Momo', price: 79, variants: [{id: '4pcs', name: '4 pcs', priceDelta: 0}, {id: '8pcs', name: '8 pcs', priceDelta: 50}] },
  { cat: 'MOMOS', name: 'Paneer Kurkure Momo', price: 79, variants: [{id: '4pcs', name: '4 pcs', priceDelta: 0}, {id: '8pcs', name: '8 pcs', priceDelta: 30}] },
  { cat: 'MOMOS', name: 'Paneer Steam Momo', price: 59, variants: [{id: '4pcs', name: '4 pcs', priceDelta: 0}, {id: '8pcs', name: '8 pcs', priceDelta: 20}] },
  { cat: 'MOMOS', name: 'Paneer Fried Momo', price: 59, variants: [{id: '4pcs', name: '4 pcs', priceDelta: 0}, {id: '8pcs', name: '8 pcs', priceDelta: 20}] },
  { cat: 'MOMOS', name: 'Paneer Tandoori Momo', price: 89, variants: [{id: '4pcs', name: '4 pcs', priceDelta: 0}, {id: '8pcs', name: '8 pcs', priceDelta: 50}] },
  
  // Fries
  { cat: 'FRIES', name: 'Salted Fries', price: 50 },
  { cat: 'FRIES', name: 'Peri Peri Fries', price: 60 },
  { cat: 'FRIES', name: 'Cheese Fries', price: 90 },
  
  // Pasta
  { cat: 'PASTA', name: 'White Sauce Pasta', price: 150 },
  { cat: 'PASTA', name: 'Red Sauce Pasta', price: 150 },
  { cat: 'PASTA', name: 'Mix Sauce Pasta', price: 170 },
  
  // Maggi
  { cat: 'MAGGI', name: 'Plain Maggi', price: 40 },
  { cat: 'MAGGI', name: 'Veg Maggi', price: 50 },
  { cat: 'MAGGI', name: 'Cheese Paneer Maggi', price: 70 },
  { cat: 'MAGGI', name: 'Cheese Maggi', price: 60 },
  
  // Pizza - Single Veg
  { cat: 'PIZZA', name: 'Onion Pizza', price: 69, variants: [{id: 'S', name: 'S', priceDelta: 0}, {id: 'M', name: 'M', priceDelta: 70}, {id: 'L', name: 'L', priceDelta: 160}] },
  { cat: 'PIZZA', name: 'Tomato Pizza', price: 69, variants: [{id: 'S', name: 'S', priceDelta: 0}, {id: 'M', name: 'M', priceDelta: 70}, {id: 'L', name: 'L', priceDelta: 160}] },
  { cat: 'PIZZA', name: 'Sweet Corn Pizza', price: 79, variants: [{id: 'S', name: 'S', priceDelta: 0}, {id: 'M', name: 'M', priceDelta: 70}, {id: 'L', name: 'L', priceDelta: 160}] },
  { cat: 'PIZZA', name: 'Paneer Pizza', price: 79, variants: [{id: 'S', name: 'S', priceDelta: 0}, {id: 'M', name: 'M', priceDelta: 70}, {id: 'L', name: 'L', priceDelta: 160}] },
  
  // Pizza - Double Veg
  { cat: 'PIZZA', name: 'Onion + Capsicum Pizza', price: 79, variants: [{id: 'S', name: 'S', priceDelta: 0}, {id: 'M', name: 'M', priceDelta: 70}, {id: 'L', name: 'L', priceDelta: 160}] },
  { cat: 'PIZZA', name: 'Onion + Corn Pizza', price: 89, variants: [{id: 'S', name: 'S', priceDelta: 0}, {id: 'M', name: 'M', priceDelta: 70}, {id: 'L', name: 'L', priceDelta: 160}] },
  { cat: 'PIZZA', name: 'Onion + Paneer Pizza', price: 99, variants: [{id: 'S', name: 'S', priceDelta: 0}, {id: 'M', name: 'M', priceDelta: 70}, {id: 'L', name: 'L', priceDelta: 150}] },
  { cat: 'PIZZA', name: 'Paneer + Corn Pizza', price: 99, variants: [{id: 'S', name: 'S', priceDelta: 0}, {id: 'M', name: 'M', priceDelta: 70}, {id: 'L', name: 'L', priceDelta: 150}] },
  
  // Pizza - Rectangular
  { cat: 'PIZZA', name: 'Rectangular Onion + Capsicum', price: 139 },
  { cat: 'PIZZA', name: 'Rectangular Onion + Corn', price: 149 },
  { cat: 'PIZZA', name: 'Rectangular Onion + Paneer', price: 159 },
  { cat: 'PIZZA', name: 'Rectangular Paneer + Corn', price: 159 },
  
  // Mojito
  { cat: 'MOJITO', name: 'Lime Soda', price: 60 },
  { cat: 'MOJITO', name: 'Black Current', price: 70 },
  { cat: 'MOJITO', name: 'Mint', price: 60 },
  { cat: 'MOJITO', name: 'Virgin Mojito', price: 70 },
  
  // Coffee
  { cat: 'COFFEE', name: 'Cold Coffee Classic', price: 59 },
  { cat: 'COFFEE', name: 'Hazelnut Coffee', price: 69 },
  { cat: 'COFFEE', name: 'Caramel Coffee', price: 79 },
  
  // Shakes
  { cat: 'SHAKES', name: 'Cake & Coffee Shake', price: 99 },
  { cat: 'SHAKES', name: 'Protein Shake', price: 89 },
  { cat: 'SHAKES', name: 'KitKat Shake', price: 79 },
  { cat: 'SHAKES', name: 'Oreo Shake', price: 79 },
  
  // Chai
  { cat: 'CHAI', name: 'Chai', price: 20 },
  { cat: 'CHAI', name: 'Adrak Chai', price: 20 },
  { cat: 'CHAI', name: 'Elaichi Chai', price: 30 },
  { cat: 'CHAI', name: 'Kesar Chai', price: 40 },
  { cat: 'CHAI', name: 'Masala Chai', price: 30 },
];

let sql = `-- Update Menu Script
-- Run this in your Supabase SQL Editor

-- 1. Delete all existing categories (this will cascade and delete menu items too)
DELETE FROM categories;

-- 2. Insert Categories
INSERT INTO categories (name, sort_order) VALUES
`;

sql += categories.map((c, i) => `('${c}', ${i + 1})`).join(',\n') + ';\n\n';

sql += `-- 3. Insert Menu Items\n`;
sql += `INSERT INTO menu_items (category_id, name, price, variants, is_available, presentation_type)\nVALUES\n`;

const values = menu.map(m => {
  const vars = JSON.stringify(m.variants || []);
  // Use a subquery to find the category_id
  return `((SELECT id FROM categories WHERE name = '${m.cat}'), '${m.name.replace(/'/g, "''")}', ${m.price}, '${vars}'::jsonb, true, 'plate')`;
});

sql += values.join(',\n') + ';\n';

fs.writeFileSync('../update_menu.sql', sql);
console.log('Successfully generated update_menu.sql');

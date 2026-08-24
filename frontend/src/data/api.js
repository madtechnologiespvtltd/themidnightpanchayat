import { supabase } from '../lib/supabase';

export async function fetchCategories() {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('sort_order', { ascending: true });
    
  if (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
  return data;
}

export async function fetchMenuItems() {
  const { data, error } = await supabase
    .from('menu_items')
    .select('*')
    .eq('is_available', true);
    
  if (error) {
    console.error('Error fetching menu items:', error);
    return [];
  }
  return data;
}

export async function createOrder(customerDetails, cartItems, totalAmount) {
  // 1. Insert Order
  const { data: orderData, error: orderError } = await supabase
    .from('orders')
    .insert([{
      customer_name: customerDetails.name,
      customer_phone: customerDetails.phone,
      table_number: parseInt(customerDetails.table, 10),
      total_amount: totalAmount,
      status: 'Received',
      transaction_id: customerDetails.transactionId || null
    }])
    .select()
    .single();

  if (orderError) throw orderError;

  // 2. Insert Order Items
  const orderItemsData = cartItems.map(item => ({
    order_id: orderData.id,
    menu_item_id: item.dish.id,
    quantity: item.quantity,
    customizations: {
      variant: item.variant,
      addons: item.addons
    }
  }));

  const { error: itemsError } = await supabase
    .from('order_items')
    .insert(orderItemsData);

  if (itemsError) throw itemsError;

  return orderData;
}


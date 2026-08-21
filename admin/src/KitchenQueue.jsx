import { useState, useEffect } from 'react';
import { supabase } from './lib/supabase';

export default function KitchenQueue() {
  const [orders, setOrders] = useState([]);

  const loadOrders = async () => {
    const { data } = await supabase.from('orders')
      .select('*, order_items(*, menu_items(name))')
      .neq('status', 'Served')
      .order('created_at', { ascending: true });
    
    if (data) setOrders(data);
  };

  useEffect(() => {
    loadOrders();

    const channel = supabase.channel('kitchen-orders')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'orders' }, payload => {
         loadOrders();
      })
      .subscribe();

    return () => { supabase.removeChannel(channel); }
  }, []);

  const updateStatus = async (id, newStatus) => {
    await supabase.from('orders').update({ status: newStatus }).eq('id', id);
  };

  return (
    <div className="kitchen-queue">
      <header className="page-header">
        <h1>Kitchen Queue</h1>
        <div className="live-indicator">LIVE 🟢</div>
      </header>
      <div className="order-grid">
        {orders.length === 0 && <p className="empty-state">No active orders right now.</p>}
        {orders.map(order => (
          <div key={order.id} className={`order-card status-${order.status.toLowerCase()}`}>
            <div className="order-header">
              <h3>Table {order.table_number}</h3>
              <span className="order-status">{order.status}</span>
            </div>
            <p className="order-meta">Customer: {order.customer_name}</p>
            <ul className="order-items">
              {order.order_items.map(item => (
                <li key={item.id}>
                  <strong>{item.quantity}x</strong> {item.menu_items?.name} 
                  {item.customizations?.variant && ` (${item.customizations.variant.name})`}
                </li>
              ))}
            </ul>
            <div className="order-actions">
              {order.status === 'Received' && (
                <button onClick={() => updateStatus(order.id, 'Preparing')} className="btn-primary">Start Preparing</button>
              )}
              {order.status === 'Preparing' && (
                <button onClick={() => updateStatus(order.id, 'Ready')} className="btn-success">Mark Ready</button>
              )}
              {order.status === 'Ready' && (
                <button onClick={() => updateStatus(order.id, 'Served')} className="btn-secondary">Mark Served</button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

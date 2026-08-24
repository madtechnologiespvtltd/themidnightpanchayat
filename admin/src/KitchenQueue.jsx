import { useState, useEffect } from 'react';
import { supabase } from './lib/supabase';

export default function KitchenQueue() {
  const [orders, setOrders] = useState([]);
  const [selectedReceiptOrder, setSelectedReceiptOrder] = useState(null);

  const loadOrders = async () => {
    const { data } = await supabase.from('orders')
      .select('*, order_items(*, menu_items(name, price))')
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

  const handlePrintReceipt = () => {
    window.print();
  };

  return (
    <div className="kitchen-queue">
      <header className="page-header no-print">
        <h1>Kitchen Queue</h1>
        <div className="live-indicator">LIVE 🟢</div>
      </header>
      
      <div className="order-grid no-print">
        {orders.length === 0 && <p className="empty-state">No active orders right now.</p>}
        {orders.map(order => (
          <div key={order.id} className={`order-card status-${order.status.toLowerCase()}`}>
            <div className="order-header">
              <h3>Table {order.table_number}</h3>
              <span className="order-status">{order.status}</span>
            </div>
            
            <p className="order-meta" style={{ marginBottom: '0.25rem' }}>Customer: {order.customer_name}</p>
            <p className="order-meta" style={{ marginBottom: '0.5rem' }}>Phone: {order.customer_phone}</p>
            
            {order.transaction_id && (
              <p style={{ margin: '0.5rem 0', fontSize: '0.9rem', color: '#16a34a', fontWeight: 'bold' }}>
                UTR/Txn: {order.transaction_id}
              </p>
            )}

            <ul className="order-items">
              {order.order_items.map(item => (
                <li key={item.id}>
                  <strong>{item.quantity}x</strong> {item.menu_items?.name} 
                  {item.customizations?.variant && ` (${item.customizations.variant.name})`}
                  {item.customizations?.addons?.length > 0 && (
                    <div style={{ fontSize: '0.8rem', color: '#666', paddingLeft: '1rem' }}>
                      Addons: {item.customizations.addons.map(a => a.name).join(', ')}
                    </div>
                  )}
                </li>
              ))}
            </ul>
            
            <div className="order-actions" style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
              {order.status === 'Received' && (
                <button onClick={() => updateStatus(order.id, 'Preparing')} className="btn-primary" style={{ flex: 1 }}>Start</button>
              )}
              {order.status === 'Preparing' && (
                <button onClick={() => updateStatus(order.id, 'Ready')} className="btn-success" style={{ flex: 1 }}>Ready</button>
              )}
              {order.status === 'Ready' && (
                <button onClick={() => updateStatus(order.id, 'Served')} className="btn-secondary" style={{ flex: 1 }}>Serve</button>
              )}
              <button 
                onClick={() => setSelectedReceiptOrder(order)} 
                className="btn-secondary" 
                style={{ background: '#f1f5f9', color: '#334155', border: '1px solid #cbd5e1', padding: '0.5rem 1rem' }}
              >
                Receipt
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Receipt Print Overlay / Modal */}
      {selectedReceiptOrder && (
        <div className="receipt-modal-backdrop" onClick={() => setSelectedReceiptOrder(null)} style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div className="receipt-modal-content print-area" onClick={e => e.stopPropagation()} style={{ background: 'white', padding: '2rem', borderRadius: '12px', width: '90%', maxWidth: '400px', color: '#333', boxShadow: '0 10px 30px rgba(0,0,0,0.2)' }}>
            
            {/* Header */}
            <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
              <h2 style={{ margin: '0 0 0.5rem 0', fontFamily: 'serif' }}>THE MIDNIGHT PANCHAYAT</h2>
              <p style={{ margin: '0', fontSize: '0.9rem', color: '#666' }}>Order Invoice / Receipt</p>
            </div>

            <div style={{ borderBottom: '1px dashed #ccc', marginBottom: '1rem' }}></div>

            {/* Meta */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', fontSize: '0.9rem', marginBottom: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span><strong>Table Number:</strong></span>
                <span><strong>{selectedReceiptOrder.table_number}</strong></span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Customer:</span>
                <span>{selectedReceiptOrder.customer_name}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Phone:</span>
                <span>{selectedReceiptOrder.customer_phone}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Date:</span>
                <span>{new Date(selectedReceiptOrder.created_at).toLocaleString()}</span>
              </div>
              {selectedReceiptOrder.transaction_id && (
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#16a34a', fontWeight: 'bold' }}>
                  <span>UTR / Txn ID:</span>
                  <span>{selectedReceiptOrder.transaction_id}</span>
                </div>
              )}
            </div>

            <div style={{ borderBottom: '1px dashed #ccc', marginBottom: '1rem' }}></div>

            {/* Items */}
            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 1.5rem 0', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.95rem' }}>
              {selectedReceiptOrder.order_items?.map(item => {
                const basePrice = item.menu_items?.price || 0;
                const variantDelta = item.customizations?.variant?.priceDelta || 0;
                const addonsTotal = item.customizations?.addons?.reduce((sum, a) => sum + a.price, 0) || 0;
                const itemTotal = (basePrice + variantDelta + addonsTotal) * item.quantity;
                
                return (
                  <li key={item.id} style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div>
                      <span><strong>{item.quantity}x</strong> {item.menu_items?.name || 'Item'}</span>
                      {item.customizations?.variant && <div style={{ fontSize: '0.8rem', color: '#666', paddingLeft: '1.25rem' }}>- Size: {item.customizations.variant.name}</div>}
                      {item.customizations?.addons?.map(a => <div key={a.id} style={{ fontSize: '0.8rem', color: '#666', paddingLeft: '1.25rem' }}>+ {a.name}</div>)}
                    </div>
                    <span>₹{itemTotal}</span>
                  </li>
                );
              })}
            </ul>

            <div style={{ borderTop: '2px solid #333', paddingTop: '0.75rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '1.2rem' }}>
                <span>Grand Total:</span>
                <span>₹{selectedReceiptOrder.total_amount}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="no-print" style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
              <button onClick={handlePrintReceipt} className="btn-primary" style={{ flex: 1 }}>Print Bill</button>
              <button onClick={() => setSelectedReceiptOrder(null)} className="btn-secondary" style={{ flex: 1 }}>Close</button>
            </div>
          </div>
        </div>
      )}

      {/* Print styles */}
      <style>{`
        @media print {
          .no-print { display: none !important; }
          body * { visibility: hidden; }
          .print-area, .print-area * { visibility: visible; }
          .print-area { position: absolute; left: 0; top: 0; width: 100%; box-shadow: none !important; padding: 0 !important; }
        }
      `}</style>
    </div>
  );
}

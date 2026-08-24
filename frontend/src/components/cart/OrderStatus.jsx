import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';

export default function OrderStatus({ orderId, customerDetails, onNewOrder }) {
  const states = ['Received', 'Preparing', 'Ready', 'Served'];
  const [currentStep, setCurrentStep] = useState(0);
  const [order, setOrder] = useState(null);

  useEffect(() => {
    if (!orderId) return;

    // Fetch initial state with full details
    const fetchOrderDetails = async () => {
      const { data, error } = await supabase
        .from('orders')
        .select('*, order_items(*, menu_items(*))')
        .eq('id', orderId)
        .single();
      
      if (data && !error) {
        setOrder(data);
        const stateIndex = states.indexOf(data.status);
        if (stateIndex !== -1) setCurrentStep(stateIndex);
      }
    };
    fetchOrderDetails();

    // Listen to real-time updates
    const channel = supabase
      .channel(`order-${orderId}`)
      .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'orders' },
        (payload) => {
          if (payload.new.id === orderId) {
            const newStatus = payload.new.status;
            const stateIndex = states.indexOf(newStatus);
            if (stateIndex !== -1) setCurrentStep(stateIndex);
            
            // Refresh order state to catch any updates
            fetchOrderDetails();
          }
        }
      )
      .subscribe();
      
    return () => { supabase.removeChannel(channel); }
  }, [orderId]);

  return (
    <div className="cart-overlay success-screen" style={{ justifyContent: 'flex-start', paddingTop: '4rem', zIndex: 100, overflowY: 'auto' }}>
      <h2 className="display-text cover-title" style={{ fontSize: '2.5rem' }}>Order Confirmed</h2>
      <p className="accent-text cover-subtitle">Table {customerDetails?.table || '?'}</p>
      
      {/* Realtime Status steps */}
      <div className="status-tracker" style={{ marginTop: '2rem', marginBottom: '2.5rem', textAlign: 'left', width: '80%', margin: '2rem auto' }}>
        {states.map((status, index) => (
          <div key={status} style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '1.5rem', 
            marginBottom: '1.5rem',
            opacity: index <= currentStep ? 1 : 0.3,
            transition: 'opacity 0.5s ease-in-out'
          }}>
            <div style={{
              width: '20px', height: '20px', 
              borderRadius: '50%', 
              backgroundColor: index <= currentStep ? 'var(--color-olive)' : 'transparent',
              border: '2px solid var(--color-olive)'
            }}></div>
            <span className="display-text" style={{ fontSize: '1.6rem' }}>{status}</span>
          </div>
        ))}
      </div>

      {/* Digital Receipt / Bill Section */}
      {order && (
        <div className="card animate-fade-in print-area" style={{ width: '85%', margin: '0 auto 2rem', padding: '1.5rem', background: '#FAF6EE', border: '2px solid var(--color-coffee)', borderRadius: '12px', textAlign: 'left', color: 'var(--color-deep-coffee)', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
          <h4 style={{ fontFamily: 'var(--font-heading)', borderBottom: '1px dashed var(--color-coffee)', paddingBottom: '0.5rem', marginBottom: '1rem', textAlign: 'center', fontSize: '1.2rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Receipt / Bill</h4>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.35rem', opacity: 0.8 }}>
            <span>Order Reference:</span>
            <span style={{ fontFamily: 'monospace' }}>{order.id.slice(0, 8)}...</span>
          </div>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.35rem', opacity: 0.8 }}>
            <span>Time:</span>
            <span>{new Date(order.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
          </div>

          {order.transaction_id && (
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '1rem', color: 'var(--color-olive)', fontWeight: 'bold' }}>
              <span>UTR / Txn ID:</span>
              <span>{order.transaction_id}</span>
            </div>
          )}
          
          <div style={{ borderBottom: '1px dashed rgba(90, 56, 37, 0.2)', marginBottom: '1rem' }}></div>
          
          <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 1rem 0', fontSize: '0.95rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {order.order_items?.map(item => {
              const basePrice = item.menu_items?.price || 0;
              const variantDelta = item.customizations?.variant?.priceDelta || 0;
              const addonsTotal = item.customizations?.addons?.reduce((sum, a) => sum + a.price, 0) || 0;
              const itemTotal = (basePrice + variantDelta + addonsTotal) * item.quantity;
              
              return (
                <li key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div style={{ flex: 1, paddingRight: '1rem' }}>
                    <div style={{ fontWeight: '500' }}>
                      <span style={{ color: 'var(--color-burnt-orange)', marginRight: '0.5rem' }}>{item.quantity}x</span> 
                      {item.menu_items?.name || 'Unknown Item'}
                    </div>
                    {item.customizations?.variant && (
                      <div style={{ fontSize: '0.8rem', opacity: 0.7, paddingLeft: '1.25rem' }}>
                        Size: {item.customizations.variant.name}
                      </div>
                    )}
                    {item.customizations?.addons?.map(a => (
                      <div key={a.id} style={{ fontSize: '0.8rem', opacity: 0.7, paddingLeft: '1.25rem' }}>
                        + {a.name}
                      </div>
                    ))}
                  </div>
                  <span style={{ fontWeight: '500' }}>₹{itemTotal}</span>
                </li>
              );
            })}
          </ul>
          
          <div style={{ borderTop: '1px dashed rgba(90, 56, 37, 0.2)', paddingTop: '1rem', marginTop: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '1.2rem', color: 'var(--color-coffee)' }}>
              <span>Total Paid:</span>
              <span>₹{order.total_amount}</span>
            </div>
          </div>

          <div className="no-print" style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
            <button 
              onClick={() => window.print()} 
              className="add-to-cart-btn display-text" 
              style={{ padding: '0.8rem', fontSize: '1.1rem', background: 'var(--color-coffee)', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', width: '100%' }}
            >
              Download Receipt
            </button>
          </div>
        </div>
      )}

      {currentStep === 3 && (
        <button className="add-to-cart-btn display-text animate-fade-in no-print" onClick={onNewOrder} style={{ width: '85%', margin: '0 auto 2rem' }}>
          Start New Order
        </button>
      )}

      {/* Print styles to only show receipt */}
      <style>{`
        @media print {
          .no-print { display: none !important; }
          body * { visibility: hidden; }
          .print-area, .print-area * { visibility: visible; }
          .print-area { position: absolute; left: 0; top: 0; width: 100%; box-shadow: none !important; border: none !important; padding: 0 !important; background: white !important; }
        }
      `}</style>
    </div>
  );
}

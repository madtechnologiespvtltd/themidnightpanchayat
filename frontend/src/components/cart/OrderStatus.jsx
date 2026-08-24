import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';

export default function OrderStatus({ orderId, customerDetails, onNewOrder }) {
  const states = ['Received', 'Preparing', 'Ready', 'Served'];
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    if (!orderId) return;

    // Fetch initial state
    const fetchStatus = async () => {
      const { data, error } = await supabase
        .from('orders')
        .select('status')
        .eq('id', orderId)
        .single();
      
      if (data && !error) {
        const stateIndex = states.indexOf(data.status);
        if (stateIndex !== -1) setCurrentStep(stateIndex);
      }
    };
    fetchStatus();

    // Listen to real-time updates
    const channel = supabase
      .channel(`order-${orderId}`)
      .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'orders' },
        (payload) => {
          if (payload.new.id === orderId) {
            const newStatus = payload.new.status;
            const stateIndex = states.indexOf(newStatus);
            if (stateIndex !== -1) setCurrentStep(stateIndex);
          }
        }
      )
      .subscribe();
      
    return () => { supabase.removeChannel(channel); }
  }, [orderId]);

  return (
    <div className="cart-overlay success-screen" style={{ justifyContent: 'flex-start', paddingTop: '4rem', zIndex: 100 }}>
      <h2 className="display-text cover-title">Order Confirmed</h2>
      <p className="accent-text cover-subtitle">Table {customerDetails?.table || '?'}</p>
      
      <div className="status-tracker" style={{ marginTop: '3rem', marginBottom: '4rem', textAlign: 'left', width: '80%', margin: '3rem auto' }}>
        {states.map((status, index) => (
          <div key={status} style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '1.5rem', 
            marginBottom: '2rem',
            opacity: index <= currentStep ? 1 : 0.3,
            transition: 'opacity 0.5s ease-in-out'
          }}>
            <div style={{
              width: '24px', height: '24px', 
              borderRadius: '50%', 
              backgroundColor: index <= currentStep ? 'var(--color-olive)' : 'transparent',
              border: '2px solid var(--color-olive)'
            }}></div>
            <span className="display-text" style={{ fontSize: '2rem' }}>{status}</span>
          </div>
        ))}
      </div>

      {currentStep === 3 && (
        <button className="add-to-cart-btn display-text animate-fade-in" onClick={onNewOrder} style={{ width: '80%', margin: '0 auto' }}>
          Start New Order
        </button>
      )}
    </div>
  );
}

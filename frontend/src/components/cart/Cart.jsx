import React, { useState, useEffect } from 'react';
import { createOrder } from '../../data/api';
import { supabase } from '../../lib/supabase';

function LiveOrderStatus({ customerDetails, orderId, onReturn }) {
  const states = ['Received', 'Preparing', 'Ready', 'Served'];
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    if (!orderId) return;

    // Listen to real-time updates
    const channel = supabase
      .channel(`order-${orderId}`)
      .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'orders', filter: `id=eq.${orderId}` },
        (payload) => {
          const newStatus = payload.new.status;
          const stateIndex = states.indexOf(newStatus);
          if (stateIndex !== -1) setCurrentStep(stateIndex);
        }
      )
      .subscribe();
      
    return () => { supabase.removeChannel(channel); }
  }, [orderId]);

  return (
    <div className="cart-overlay success-screen" style={{ justifyContent: 'flex-start', paddingTop: '4rem' }}>
      <h2 className="display-text cover-title">Order Confirmed</h2>
      <p className="accent-text cover-subtitle">Table {customerDetails.table}</p>
      
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
        <button className="add-to-cart-btn display-text animate-fade-in" onClick={onReturn} style={{ width: '80%', margin: '0 auto' }}>
          Start New Order
        </button>
      )}
    </div>
  );
}

export default function Cart({ items, onClose, onClearCart }) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState(null);
  const [isCheckoutFormOpen, setIsCheckoutFormOpen] = useState(false);
  const [customerDetails, setCustomerDetails] = useState({ name: '', phone: '', table: '' });

  const calculateSubtotal = () => {
    return items.reduce((acc, item) => {
      let base = item.dish.price;
      if (item.variant) base += item.variant.priceDelta;
      let addonsTotal = 0;
      item.addons.forEach(a => addonsTotal += a.price);
      return acc + ((base + addonsTotal) * item.quantity);
    }, 0);
  };

  const subtotal = calculateSubtotal();
  const tax = Math.round(subtotal * 0.05); // 5% simulated tax
  const total = subtotal + tax;

  const handleInitialCheckout = () => {
    setIsCheckoutFormOpen(true);
  };

  const handleFinalCheckout = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    
    try {
      const order = await createOrder(customerDetails, items, total);
      setConfirmedOrder(order);
      onClearCart();
    } catch (err) {
      console.error(err);
      alert('Failed to place order. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  if (confirmedOrder) {
    return (
      <LiveOrderStatus 
        customerDetails={customerDetails} 
        orderId={confirmedOrder.id} 
        onReturn={onClose} 
      />
    );
  }

  if (isCheckoutFormOpen) {
    return (
      <div className="cart-overlay">
        <button className="back-btn accent-text detail-close-btn" onClick={() => setIsCheckoutFormOpen(false)} disabled={isProcessing}>
          ← Back to Cart
        </button>
        <div className="cart-scroll-area">
          <h2 className="display-text detail-title" style={{ textAlign: 'center', marginBottom: '2rem' }}>Details</h2>
          
          <form id="checkout-form" onSubmit={handleFinalCheckout} className="checkout-form">
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input 
                type="text" 
                id="name" 
                required 
                value={customerDetails.name}
                onChange={(e) => setCustomerDetails({...customerDetails, name: e.target.value})}
                disabled={isProcessing}
                placeholder="John Doe"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="phone">Phone Number</label>
              <input 
                type="tel" 
                id="phone" 
                required 
                value={customerDetails.phone}
                onChange={(e) => setCustomerDetails({...customerDetails, phone: e.target.value})}
                disabled={isProcessing}
                placeholder="9876543210"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="table">Table Number</label>
              <input 
                type="number" 
                id="table" 
                required 
                value={customerDetails.table}
                onChange={(e) => setCustomerDetails({...customerDetails, table: e.target.value})}
                disabled={isProcessing}
                placeholder="e.g. 4"
                min="1"
              />
            </div>
          </form>
        </div>

        <div className="detail-footer">
          <button 
            type="submit"
            form="checkout-form"
            className="add-to-cart-btn display-text"
            disabled={isProcessing}
            style={{ opacity: isProcessing ? 0.7 : 1 }}
          >
            {isProcessing ? 'Processing Payment...' : `Confirm & Pay ₹${total}`}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-overlay">
      <button className="back-btn accent-text detail-close-btn" onClick={onClose}>
        ↓ Keep Browsing
      </button>

      <div className="cart-scroll-area">
        <h2 className="display-text detail-title" style={{ textAlign: 'center', marginBottom: '2rem' }}>Your Cart</h2>
        
        {items.length === 0 ? (
          <p className="detail-description" style={{ textAlign: 'center' }}>Your cart is empty.</p>
        ) : (
          <div className="cart-items-list">
            {items.map(item => (
              <div key={item.cartItemId} className="cart-item">
                <div className="cart-item-header">
                  <span className="cart-item-qty">{item.quantity}x</span>
                  <span className="cart-item-name font-heading">{item.dish.name}</span>
                  <span className="cart-item-price price-text">
                    ₹{((item.dish.price + (item.variant ? item.variant.priceDelta : 0) + item.addons.reduce((sum, a) => sum + a.price, 0)) * item.quantity)}
                  </span>
                </div>
                <div className="cart-item-customizations detail-description" style={{ fontSize: '0.9rem', paddingLeft: '2rem' }}>
                  {item.variant && <div>Size: {item.variant.name}</div>}
                  {item.addons.map(a => <div key={a.id}>+ {a.name}</div>)}
                </div>
              </div>
            ))}
          </div>
        )}

        {items.length > 0 && (
          <div className="cart-summary">
            <div className="summary-line detail-description">
              <span>Subtotal</span>
              <span>₹{subtotal}</span>
            </div>
            <div className="summary-line detail-description">
              <span>GST (5%)</span>
              <span>₹{tax}</span>
            </div>
            <div className="summary-line total-line price-text">
              <span>Total</span>
              <span>₹{total}</span>
            </div>
          </div>
        )}
      </div>

      {items.length > 0 && (
        <div className="detail-footer">
          <button 
            className="add-to-cart-btn display-text"
            onClick={handleInitialCheckout}
          >
            Checkout — ₹{total}
          </button>
        </div>
      )}
    </div>
  );
}

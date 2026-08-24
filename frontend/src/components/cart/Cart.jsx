import React, { useState, useEffect } from 'react';
import { createOrder } from '../../data/api';
import { supabase } from '../../lib/supabase';

export default function Cart({ items, onClose, onClearCart, onCheckoutSuccess }) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isCheckoutFormOpen, setIsCheckoutFormOpen] = useState(false);
  const [customerDetails, setCustomerDetails] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    const table = params.get('table') || '';
    return { name: '', phone: '', table, transactionId: '' };
  });

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
      onCheckoutSuccess(order.id, customerDetails);
      onClearCart();
    } catch (err) {
      console.error(err);
      alert('Failed to place order. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };



  const [paymentQr, setPaymentQr] = useState('');

  useEffect(() => {
    async function fetchSettings() {
      try {
        const { data } = await supabase
          .from('restaurant_settings')
          .select('payment_qr_url')
          .eq('id', 1)
          .single();
        if (data && data.payment_qr_url) {
          setPaymentQr(data.payment_qr_url);
        }
      } catch (err) {
        console.error('Error loading payment settings:', err);
      }
    }
    fetchSettings();
  }, []);

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

            {paymentQr && (
              <>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', background: 'rgba(90, 56, 37, 0.05)', padding: '1rem', borderRadius: '8px', border: '1px dashed var(--color-coffee)', marginTop: '0.5rem' }}>
                  <span style={{ fontWeight: 'bold', fontFamily: 'var(--font-heading)' }}>Scan to Pay</span>
                  <img src={paymentQr} alt="Payment QR" style={{ maxWidth: '180px', height: 'auto', borderRadius: '4px', background: 'white', padding: '5px' }} />
                  <span style={{ fontSize: '0.85rem', opacity: 0.8, textAlign: 'center' }}>Please scan the QR code above to pay before confirming.</span>
                </div>
                
                <div className="form-group" style={{ marginTop: '1rem' }}>
                  <label htmlFor="transactionId">Transaction ID / UTR *</label>
                  <input 
                    type="text" 
                    id="transactionId" 
                    required 
                    value={customerDetails.transactionId}
                    onChange={(e) => setCustomerDetails({...customerDetails, transactionId: e.target.value})}
                    disabled={isProcessing}
                    placeholder="e.g. 123456789012"
                  />
                </div>
              </>
            )}
          </form>
        </div>

        <div className="detail-footer">
          <button 
            type="submit"
            form="checkout-form"
            className="add-to-cart-btn display-text"
            disabled={isProcessing}
            style={{ opacity: isProcessing ? 0.7 : 1, animation: isProcessing ? 'pulse 1.5s infinite' : 'none' }}
          >
            {isProcessing ? 'Processing...' : `Confirm & Pay ₹${total}`}
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

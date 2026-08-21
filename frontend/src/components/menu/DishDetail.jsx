import React, { useState } from 'react';

export default function DishDetail({ item, onClose, onAddToCart }) {
  const [selectedVariant, setSelectedVariant] = useState(
    item.variants && item.variants.length > 0 ? item.variants[0] : null
  );
  const [selectedAddons, setSelectedAddons] = useState(new Set());
  const [quantity, setQuantity] = useState(1);

  if (!item) return null;

  const toggleAddon = (addon) => {
    const next = new Set(selectedAddons);
    if (next.has(addon)) {
      next.delete(addon);
    } else {
      next.add(addon);
    }
    setSelectedAddons(next);
  };

  const calculateTotal = () => {
    let base = item.price;
    if (selectedVariant) base += selectedVariant.priceDelta;
    let addonsTotal = 0;
    selectedAddons.forEach(a => addonsTotal += a.price);
    return (base + addonsTotal) * quantity;
  };

  return (
    <div className="dish-detail-overlay">
      <button className="back-btn accent-text detail-close-btn" onClick={onClose}>
        ↓ Close
      </button>

      <div className="detail-scroll-area">
        <div className="detail-hero">
          <div className="dish-object-placeholder detail-object animate-dish-scale">
            {item.image ? (
              <img src={item.image} alt={item.name} className="dish-real-image" />
            ) : (
              <span className="dish-object-icon">
                {item.presentationType === 'cup' ? '☕' : '🍽️'}
              </span>
            )}
          </div>
          <h2 className="display-text detail-title animate-fade-in">{item.name}</h2>
          <p className="detail-description">{item.description || 'A delicious choice from our menu.'}</p>
        </div>

        {item.variants && item.variants.length > 0 && (
          <div className="customization-group">
            <h3 className="customization-title">Size</h3>
            <div className="customization-options">
              {item.variants.map(variant => (
                <label key={variant.id} className="customization-label">
                  <input 
                    type="radio" 
                    name="variant" 
                    checked={selectedVariant?.id === variant.id}
                    onChange={() => setSelectedVariant(variant)}
                  />
                  <span>{variant.name}</span>
                  {variant.priceDelta > 0 && <span className="price-delta">+₹{variant.priceDelta}</span>}
                </label>
              ))}
            </div>
          </div>
        )}

        {item.addons && item.addons.length > 0 && (
          <div className="customization-group">
            <h3 className="customization-title">Add-ons</h3>
            <div className="customization-options">
              {item.addons.map(addon => (
                <label key={addon.id} className="customization-label">
                  <input 
                    type="checkbox" 
                    checked={selectedAddons.has(addon)}
                    onChange={() => toggleAddon(addon)}
                  />
                  <span>{addon.name}</span>
                  <span className="price-delta">+₹{addon.price}</span>
                </label>
              ))}
            </div>
          </div>
        )}

        <div className="customization-group quantity-group">
          <h3 className="customization-title">Quantity</h3>
          <div className="quantity-selector">
            <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>−</button>
            <span className="quantity-value">{quantity}</span>
            <button onClick={() => setQuantity(quantity + 1)}>+</button>
          </div>
        </div>
      </div>

      <div className="detail-footer">
        <button 
          className="add-to-cart-btn display-text"
          onClick={() => {
            onAddToCart && onAddToCart(item, quantity, selectedVariant, Array.from(selectedAddons));
            onClose();
          }}
        >
          Add to Cart — ₹{calculateTotal()}
        </button>
      </div>
    </div>
  );
}

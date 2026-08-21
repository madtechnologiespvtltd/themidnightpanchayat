import React from 'react';

export default function DishCard({ item, onClick }) {
  return (
    <div className="dish-card" onClick={onClick} role="button" tabIndex={0}>
      <div className="dish-object-placeholder">
        {item.image ? (
          <img src={item.image} alt={item.name} className="dish-real-image" />
        ) : (
          <span className="dish-object-icon">
            {item.presentationType === 'cup' ? '☕' : '🍽️'}
          </span>
        )}
      </div>
      <h3 className="dish-name display-text">{item.name}</h3>
      <p className="dish-price price-text">₹{item.price}</p>
    </div>
  );
}

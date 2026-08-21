import React, { useState } from 'react';
import DishCard from './DishCard';
import DishDetail from './DishDetail';

export default function DishCarousel({ category, items, onBack, onSelectDish, onAddToCart }) {
  const [activeDish, setActiveDish] = useState(null);
  return (
    <div className="dish-carousel-container">
      <div className="carousel-header">
        <button className="back-btn accent-text" onClick={onBack}>← Back</button>
        <h2 className="display-text carousel-category-title">{category.name}</h2>
      </div>
      <div className="carousel-track">
        {items.map(item => (
          <DishCard key={item.id} item={item} onClick={() => setActiveDish(item)} />
        ))}
        {/* Spacer to ensure the last item can snap properly with some padding */}
        <div className="carousel-spacer"></div>
      </div>

      {/* Dish Detail Overlay */}
      {activeDish && (
        <DishDetail 
          item={activeDish} 
          onClose={() => setActiveDish(null)}
          onAddToCart={(item, qty, variant, addons) => {
            onAddToCart(item, qty, variant, addons);
            setActiveDish(null);
          }}
        />
      )}
    </div>
  );
}

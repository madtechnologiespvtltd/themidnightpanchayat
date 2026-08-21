import React, { useState, useEffect } from 'react';
import MenuCover from './MenuCover';
import CategoryIndex from './CategoryIndex';
import DishCarousel from './DishCarousel';
import DishDetail from './DishDetail';
import Cart from '../cart/Cart';
import { fetchCategories, fetchMenuItems, submitStaffRequest } from '../../data/api';
import '../../theme/menu.css';

export default function MenuLayout() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedDish, setSelectedDish] = useState(null);
  
  // Cart State
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const cats = await fetchCategories();
      const items = await fetchMenuItems();
      setCategories(cats);
      setMenuItems(items);
      setIsLoading(false);
    }
    loadData();
  }, []);

  const handleAddToCart = (dish, quantity, variant, addons) => {
    const newItem = {
      cartItemId: Date.now().toString(),
      dish,
      quantity,
      variant,
      addons
    };
    setCartItems([...cartItems, newItem]);
    setSelectedDish(null);
  };

  const notifyStaff = (action) => {
    const table = prompt('Please enter your table number for this request:');
    if (!table) return;
    submitStaffRequest(table, action)
      .then(() => alert(`Waiter notified for: ${action}`))
      .catch(() => alert('Failed to notify staff. Please try again.'));
  };

  // Filter items for the selected category
  const categoryItems = selectedCategory 
    ? menuItems.filter(item => item.category_id === selectedCategory.id)
    : [];

  if (isLoading) {
    return <div style={{ display: 'flex', height: '100%', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-heading)', color: 'var(--color-coffee)' }}>Opening Menu...</div>;
  }

  return (
    <div className="menu-container">
      <MenuCover isOpen={isOpen} onOpen={() => setIsOpen(true)} />
      
      {/* Main Content Area: Fades in after cover is opened */}
      <div style={{ 
        opacity: isOpen ? 1 : 0, 
        transition: 'opacity var(--motion-slow) ease-in-out',
        transitionDelay: '100ms',
        height: '100%',
        width: '100%',
        position: 'absolute',
        top: 0,
        left: 0
      }}>
        {/* Quick Actions (only visible when browsing, not in cart) */}
        {isOpen && !isCartOpen && (
          <div className="action-btn-group">
            <button className="quick-action-btn" onClick={() => notifyStaff('Call Staff')}>Call Staff</button>
            <button className="quick-action-btn" onClick={() => notifyStaff('Request Bill')}>Bill</button>
          </div>
        )}

        {selectedDish ? (
          <DishDetail 
            dish={selectedDish} 
            onBack={() => setSelectedDish(null)} 
            onAddToCart={handleAddToCart}
          />
        ) : selectedCategory ? (
          <DishCarousel 
            category={selectedCategory} 
            items={categoryItems} 
            onBack={() => setSelectedCategory(null)} 
            onSelectDish={setSelectedDish}
          />
        ) : (
          <CategoryIndex 
            categories={categories}
            onSelectCategory={setSelectedCategory} 
          />
        )}
      </div>

      {/* Floating View Cart Button */}
      {cartItems.length > 0 && !isCartOpen && isOpen && (
        <button 
          className="floating-cart-btn display-text"
          onClick={() => setIsCartOpen(true)}
        >
          View Cart ({cartItems.length})
        </button>
      )}

      {/* Cart Overlay */}
      {isCartOpen && (
        <Cart 
          items={cartItems} 
          onClose={() => setIsCartOpen(false)}
          onClearCart={() => setCartItems([])}
        />
      )}
    </div>
  );
}

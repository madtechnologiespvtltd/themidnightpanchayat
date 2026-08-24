import React, { useState, useEffect } from 'react';
import MenuCover from './MenuCover';
import CategoryIndex from './CategoryIndex';
import DishCarousel from './DishCarousel';
import Cart from '../cart/Cart';
import OrderStatus from '../cart/OrderStatus';
import Toast from '../common/Toast';
import { fetchCategories, fetchMenuItems } from '../../data/api';
import '../../theme/menu.css';

export default function MenuLayout() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  
  // Cart State
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Active Order State
  const [activeOrder, setActiveOrder] = useState(() => {
    const saved = localStorage.getItem('activeOrder');
    return saved ? JSON.parse(saved) : null;
  });

  // Toast State
  const [toast, setToast] = useState(null);
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
    setToast({ message: `${quantity}x ${dish.name} added to cart`, type: 'success' });
  };

  const handleCheckoutSuccess = (orderId, customerDetails) => {
    const orderData = { orderId, customerDetails };
    setActiveOrder(orderData);
    localStorage.setItem('activeOrder', JSON.stringify(orderData));
    setIsCartOpen(false);
  };

  const handleNewOrder = () => {
    setActiveOrder(null);
    localStorage.removeItem('activeOrder');
  };



  // Filter items for the selected category
  const categoryItems = selectedCategory 
    ? menuItems.filter(item => item.category_id === selectedCategory.id)
    : [];

  if (isLoading) {
    return <div style={{ display: 'flex', height: '100%', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-heading)', color: 'var(--color-coffee)' }}>Opening Menu...</div>;
  }

  if (activeOrder) {
    return (
      <OrderStatus 
        orderId={activeOrder.orderId}
        customerDetails={activeOrder.customerDetails}
        onNewOrder={handleNewOrder}
      />
    );
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


        {selectedCategory ? (
          <DishCarousel 
            category={selectedCategory} 
            items={categoryItems} 
            onBack={() => setSelectedCategory(null)} 
            onAddToCart={handleAddToCart}
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
          onCheckoutSuccess={handleCheckoutSuccess}
        />
      )}
      
      {/* Toast Notification Container */}
      {toast && (
        <div className="toast-container">
          <Toast 
            message={toast.message} 
            type={toast.type} 
            onClose={() => setToast(null)} 
          />
        </div>
      )}
    </div>
  );
}

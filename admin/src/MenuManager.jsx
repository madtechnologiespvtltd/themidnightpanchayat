import { useState, useEffect } from 'react';
import { supabase } from './lib/supabase';

export default function MenuManager() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    supabase.from('menu_items').select('*').order('name').then(({ data }) => {
      if (data) setItems(data);
    });
  }, []);

  const toggleAvailability = async (id, currentStatus) => {
    const { error } = await supabase.from('menu_items').update({ is_available: !currentStatus }).eq('id', id);
    if (!error) {
      setItems(items.map(item => item.id === id ? { ...item, is_available: !currentStatus } : item));
    }
  };

  return (
    <div className="menu-manager">
      <header className="page-header">
        <h1>Menu Manager</h1>
      </header>
      <table className="data-table">
        <thead>
          <tr>
            <th>Item Name</th>
            <th>Price</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map(item => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>₹{item.price}</td>
              <td>
                <span className={`badge ${item.is_available ? 'badge-active' : 'badge-sold-out'}`}>
                  {item.is_available ? 'Available' : 'Sold Out'}
                </span>
              </td>
              <td>
                <button onClick={() => toggleAvailability(item.id, item.is_available)} className="btn-secondary btn-sm">
                  {item.is_available ? 'Mark Sold Out' : 'Mark Available'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

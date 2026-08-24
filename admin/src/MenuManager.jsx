import { useState, useEffect, useRef } from 'react';
import { supabase } from './lib/supabase';

export default function MenuManager() {
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  
  const initialForm = { name: '', price: '', category_id: '', image_url: '' };
  const [formData, setFormData] = useState(initialForm);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const fileInputRef = useRef(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const [itemsRes, catsRes] = await Promise.all([
      supabase.from('menu_items').select('*, categories(name)').order('name'),
      supabase.from('categories').select('*').order('sort_order')
    ]);
    
    if (itemsRes.data) setItems(itemsRes.data);
    if (catsRes.data) setCategories(catsRes.data);
  };

  const toggleAvailability = async (id, currentStatus) => {
    const { error } = await supabase.from('menu_items').update({ is_available: !currentStatus }).eq('id', id);
    if (!error) {
      setItems(items.map(item => item.id === id ? { ...item, is_available: !currentStatus } : item));
    }
  };

  const openAddForm = () => {
    setEditingId(null);
    setFormData(initialForm);
    setImageFile(null);
    setImagePreview('');
    setIsFormOpen(true);
  };

  const openEditForm = (item) => {
    setEditingId(item.id);
    setFormData({
      name: item.name,
      price: item.price,
      category_id: item.category_id,
      image_url: item.image_url || ''
    });
    setImageFile(null);
    setImagePreview(item.image_url || '');
    setIsFormOpen(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const closeForm = () => {
    setIsFormOpen(false);
    setEditingId(null);
    setFormData(initialForm);
    setImageFile(null);
    setImagePreview('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSaveDish = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.price || !formData.category_id) {
      alert('Please fill all required fields');
      return;
    }

    setIsSaving(true);
    let finalImageUrl = formData.image_url;

    // 1. Upload image if a new file was selected
    if (imageFile) {
      const fileExt = imageFile.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      
      const { error: uploadError } = await supabase.storage
        .from('menu-images')
        .upload(fileName, imageFile);

      if (uploadError) {
        console.error('Upload error:', uploadError);
        alert('Failed to upload image. Please check if you ran the setup_storage.sql script!');
        setIsSaving(false);
        return;
      }

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('menu-images')
        .getPublicUrl(fileName);
        
      finalImageUrl = publicUrl;
    }

    // 2. Save to database
    const payload = {
      name: formData.name,
      price: parseInt(formData.price, 10),
      category_id: formData.category_id,
      image_url: finalImageUrl || null
    };

    if (editingId) {
      // Update existing
      const { error } = await supabase
        .from('menu_items')
        .update(payload)
        .eq('id', editingId);

      if (error) {
        console.error(error);
        alert('Failed to update dish.');
      } else {
        const { data: updatedItem } = await supabase.from('menu_items').select('*, categories(name)').eq('id', editingId).single();
        if (updatedItem) {
          setItems(items.map(item => item.id === editingId ? updatedItem : item).sort((a, b) => a.name.localeCompare(b.name)));
        }
        closeForm();
      }
    } else {
      // Insert new
      payload.is_available = true;
      payload.presentation_type = 'plate';
      
      const { data, error } = await supabase
        .from('menu_items')
        .insert([payload])
        .select('*, categories(name)')
        .single();

      if (error) {
        console.error(error);
        alert('Failed to add dish.');
      } else {
        setItems([...items, data].sort((a, b) => a.name.localeCompare(b.name)));
        closeForm();
      }
    }
    
    setIsSaving(false);
  };

  const handleDeleteDish = async (id) => {
    if (!confirm('Are you sure you want to delete this dish?')) return;

    const { error } = await supabase.from('menu_items').delete().eq('id', id);
    if (error) {
      console.error(error);
      alert('Failed to delete dish.');
    } else {
      setItems(items.filter(item => item.id !== id));
    }
  };

  return (
    <div className="menu-manager">
      <header className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Menu Manager</h1>
        <button className="btn-primary" onClick={isFormOpen ? closeForm : openAddForm}>
          {isFormOpen ? 'Cancel' : '+ Add New Dish'}
        </button>
      </header>

      {isFormOpen && (
        <div className="card" style={{ marginBottom: '2rem', padding: '1.5rem' }}>
          <h3>{editingId ? 'Edit Dish' : 'Add New Dish'}</h3>
          <form onSubmit={handleSaveDish} style={{ display: 'flex', gap: '1rem', marginTop: '1rem', alignItems: 'flex-start', flexWrap: 'wrap' }}>
            
            {/* Left Column: Form Fields */}
            <div style={{ flex: 1, minWidth: '300px', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label>Dish Name *</label>
                <input type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} placeholder="e.g. Veg Burger" required style={{ padding: '0.5rem' }} />
              </div>
              
              <div style={{ display: 'flex', gap: '1rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1 }}>
                  <label>Price (₹) *</label>
                  <input type="number" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} placeholder="99" required min="1" style={{ padding: '0.5rem' }} />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1 }}>
                  <label>Category *</label>
                  <select value={formData.category_id} onChange={e => setFormData({...formData, category_id: e.target.value})} required style={{ padding: '0.5rem' }}>
                    <option value="">Select a category</option>
                    {categories.map(cat => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <button type="submit" className="btn-success" disabled={isSaving} style={{ padding: '0.8rem', marginTop: '0.5rem', width: '100%' }}>
                {isSaving ? 'Saving...' : (editingId ? 'Update Dish' : 'Save Dish')}
              </button>
            </div>

            {/* Right Column: Image Upload */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', width: '250px', background: '#f8fafc', padding: '1rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <label style={{ fontWeight: 'bold' }}>Dish Image</label>
              
              {imagePreview ? (
                <div style={{ position: 'relative', width: '100%', height: '150px', borderRadius: '6px', overflow: 'hidden', marginBottom: '0.5rem' }}>
                  <img src={imagePreview} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <button type="button" onClick={() => { setImagePreview(''); setImageFile(null); setFormData({...formData, image_url: ''}); if(fileInputRef.current) fileInputRef.current.value = ''; }} style={{ position: 'absolute', top: '5px', right: '5px', background: 'rgba(0,0,0,0.6)', color: 'white', border: 'none', borderRadius: '50%', width: '24px', height: '24px', cursor: 'pointer' }}>&times;</button>
                </div>
              ) : (
                <div style={{ width: '100%', height: '150px', background: '#e2e8f0', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '0.5rem' }}>
                  <span style={{ color: '#64748b' }}>No image</span>
                </div>
              )}

              <input 
                type="file" 
                accept="image/*" 
                onChange={handleImageChange} 
                ref={fileInputRef}
                style={{ fontSize: '0.8rem' }}
              />
            </div>
            
          </form>
        </div>
      )}

      <table className="data-table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Item Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map(item => (
            <tr key={item.id}>
              <td style={{ width: '60px' }}>
                {item.image_url ? (
                  <img src={item.image_url} alt={item.name} style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '4px' }} />
                ) : (
                  <div style={{ width: '40px', height: '40px', background: '#e5e7eb', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' }}>
                    {item.presentation_type === 'cup' ? '☕' : '🍽️'}
                  </div>
                )}
              </td>
              <td>{item.name}</td>
              <td>{item.categories?.name || 'Unknown'}</td>
              <td>₹{item.price}</td>
              <td>
                <span className={`badge ${item.is_available ? 'badge-active' : 'badge-sold-out'}`}>
                  {item.is_available ? 'Available' : 'Sold Out'}
                </span>
              </td>
              <td style={{ display: 'flex', gap: '0.5rem' }}>
                <button onClick={() => toggleAvailability(item.id, item.is_available)} className="btn-secondary btn-sm">
                  {item.is_available ? 'Mark Sold Out' : 'Mark Available'}
                </button>
                <button onClick={() => openEditForm(item)} className="btn-primary btn-sm" style={{ background: '#3b82f6', borderColor: '#3b82f6' }}>
                  Edit
                </button>
                <button onClick={() => handleDeleteDish(item.id)} className="btn-secondary btn-sm" style={{ background: '#fee2e2', color: '#ef4444', borderColor: '#ef4444' }}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

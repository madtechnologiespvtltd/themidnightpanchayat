import React, { useState, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { supabase } from './lib/supabase';

export default function TablesManager() {
  const [tables, setTables] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newTableNumber, setNewTableNumber] = useState('');
  
  // Base URL for the QR code. You can modify this to match your production frontend URL.
  const [baseUrl, setBaseUrl] = useState(
    window.location.hostname === 'localhost' ? 'http://localhost:5173' : 'https://your-frontend-url.com'
  );

  useEffect(() => {
    fetchTables();
  }, []);

  const fetchTables = async () => {
    const { data, error } = await supabase
      .from('tables')
      .select('*')
      .order('table_number', { ascending: true });
      
    if (error) {
      if (error.code === '42P01') {
        alert('The tables table does not exist. Please run the update_tables.sql script in your Supabase SQL editor.');
      } else {
        console.error('Error fetching tables:', error);
      }
    } else {
      setTables(data || []);
    }
    setLoading(false);
  };

  const addTable = async (e) => {
    e.preventDefault();
    const tableNum = parseInt(newTableNumber, 10);
    
    if (isNaN(tableNum)) return;
    
    // Check if exists
    if (tables.some(t => t.table_number === tableNum)) {
      alert('Table number already exists!');
      return;
    }

    const { data, error } = await supabase
      .from('tables')
      .insert([{ table_number: tableNum }])
      .select()
      .single();

    if (error) {
      console.error('Error adding table:', error);
      alert('Failed to add table.');
    } else {
      setTables([...tables, data].sort((a, b) => a.table_number - b.table_number));
      setNewTableNumber('');
    }
  };

  const deleteTable = async (id) => {
    if (!confirm('Are you sure you want to delete this table?')) return;
    
    const { error } = await supabase
      .from('tables')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting table:', error);
    } else {
      setTables(tables.filter(t => t.id !== id));
    }
  };

  const handlePrint = () => {
    window.print();
  };

  if (loading) return <div>Loading tables...</div>;

  return (
    <div className="menu-manager">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h2>Tables & QR Codes</h2>
        <button className="btn-primary no-print" onClick={handlePrint}>Print All QR Codes</button>
      </div>

      <div className="card no-print" style={{ marginBottom: '2rem', padding: '1.5rem' }}>
        <h3>QR Code Settings</h3>
        <p style={{ fontSize: '0.9rem', color: '#666', marginBottom: '1rem' }}>
          This is the base URL that the QR codes will point to. Set this to your frontend app's public URL.
        </p>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <input 
            type="text" 
            value={baseUrl} 
            onChange={(e) => setBaseUrl(e.target.value)} 
            placeholder="https://themidnightpanchayat.com"
            style={{ flex: 1, padding: '0.5rem' }}
          />
        </div>
      </div>

      <div className="card no-print" style={{ marginBottom: '2rem', padding: '1.5rem' }}>
        <h3>Add New Table</h3>
        <form onSubmit={addTable} style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
          <input 
            type="number" 
            placeholder="Table Number (e.g. 1)" 
            value={newTableNumber} 
            onChange={(e) => setNewTableNumber(e.target.value)} 
            required 
            min="1"
            style={{ padding: '0.5rem', width: '200px' }}
          />
          <button type="submit" className="btn-primary">Add Table</button>
        </form>
      </div>

      <div className="tables-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '2rem' }}>
        {tables.map(table => {
          const qrUrl = `${baseUrl.replace(/\/$/, '')}/?table=${table.table_number}`;
          
          return (
            <div key={table.id} className="card print-break-inside" style={{ padding: '2rem', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>Table {table.table_number}</h3>
              
              <div style={{ padding: '1rem', background: '#fff', borderRadius: '8px', display: 'inline-block', marginBottom: '1.5rem' }}>
                <QRCodeSVG value={qrUrl} size={150} level="H" />
              </div>
              
              <p className="no-print" style={{ fontSize: '0.8rem', color: '#666', wordBreak: 'break-all', marginBottom: '1rem' }}>
                {qrUrl}
              </p>
              
              <button 
                className="btn-secondary no-print" 
                onClick={() => deleteTable(table.id)}
                style={{ background: '#fee2e2', color: '#ef4444', borderColor: '#ef4444' }}
              >
                Delete Table
              </button>
            </div>
          );
        })}
      </div>
      
      {tables.length === 0 && (
        <p style={{ textAlign: 'center', color: '#666', marginTop: '3rem' }}>No tables found. Add your first table above!</p>
      )}

      {/* Add a style tag for print media queries to ensure QR codes look good when printed */}
      <style>{`
        @media print {
          .no-print { display: none !important; }
          body { background: white; }
          .main-content { margin: 0; padding: 0; }
          .sidebar { display: none; }
          .tables-grid { display: flex !important; flex-wrap: wrap; justify-content: center; gap: 4rem !important; }
          .print-break-inside { page-break-inside: avoid; border: 2px solid #ccc; width: 300px; margin-bottom: 2rem; }
        }
      `}</style>
    </div>
  );
}

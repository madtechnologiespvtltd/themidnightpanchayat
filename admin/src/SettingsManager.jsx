import { useState, useEffect, useRef } from 'react';
import { supabase } from './lib/supabase';

export default function SettingsManager() {
  // Password state
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  // QR state
  const [qrUrl, setQrUrl] = useState('');
  const [qrFile, setQrFile] = useState(null);
  const [qrPreview, setQrPreview] = useState('');
  const [isSavingQr, setIsSavingQr] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    const { data, error } = await supabase
      .from('restaurant_settings')
      .select('*')
      .eq('id', 1)
      .single();
    
    if (data) {
      setQrUrl(data.payment_qr_url || '');
      setQrPreview(data.payment_qr_url || '');
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    if (newPassword.length < 6) {
      alert('Password must be at least 6 characters');
      return;
    }

    setIsChangingPassword(true);
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    setIsChangingPassword(false);

    if (error) {
      alert(error.message);
    } else {
      alert('Password updated successfully!');
      setNewPassword('');
      setConfirmPassword('');
    }
  };

  const handleQrFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setQrFile(file);
      setQrPreview(URL.createObjectURL(file));
    }
  };

  const handleSaveQr = async (e) => {
    e.preventDefault();
    if (!qrFile && !qrUrl) {
      alert('Please select a QR code file to upload');
      return;
    }

    setIsSavingQr(true);
    let finalQrUrl = qrUrl;

    if (qrFile) {
      const fileExt = qrFile.name.split('.').pop();
      const fileName = `payment-qr-${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('menu-images')
        .upload(fileName, qrFile);

      if (uploadError) {
        console.error('QR upload error:', uploadError);
        alert('Failed to upload QR code. Please make sure the storage bucket policies are set.');
        setIsSavingQr(false);
        return;
      }

      const { data: { publicUrl } } = supabase.storage
        .from('menu-images')
        .getPublicUrl(fileName);
      
      finalQrUrl = publicUrl;
    }

    // Save to settings table
    const { error } = await supabase
      .from('restaurant_settings')
      .upsert({ id: 1, payment_qr_url: finalQrUrl });

    setIsSavingQr(false);

    if (error) {
      console.error(error);
      alert('Failed to save settings. Please run the add_settings_table.sql script!');
    } else {
      alert('Payment QR updated successfully!');
      setQrUrl(finalQrUrl);
      setQrFile(null);
    }
  };

  const handleRemoveQr = async () => {
    if (!confirm('Are you sure you want to remove the payment QR?')) return;
    
    setIsSavingQr(true);
    const { error } = await supabase
      .from('restaurant_settings')
      .upsert({ id: 1, payment_qr_url: null });

    setIsSavingQr(false);

    if (error) {
      console.error(error);
      alert('Failed to remove QR.');
    } else {
      setQrUrl('');
      setQrPreview('');
      setQrFile(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
      alert('Payment QR removed.');
    }
  };

  return (
    <div className="settings-manager">
      <header className="page-header">
        <h1>Settings & Security</h1>
      </header>

      <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', marginTop: '2rem' }}>
        
        {/* Payment QR Box */}
        <div className="card" style={{ flex: 1, minWidth: '320px', padding: '1.5rem' }}>
          <h3>Payment QR Code</h3>
          <p style={{ color: '#666', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
            Upload your UPI/Payment QR code here. It will display on the customer checkout page so they can scan and pay instantly.
          </p>

          <form onSubmit={handleSaveQr} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'center', background: '#f8f9fa', padding: '1rem', borderRadius: '8px', border: '1px dashed #ccc', height: '220px', alignItems: 'center', position: 'relative' }}>
              {qrPreview ? (
                <div style={{ position: 'relative', height: '100%' }}>
                  <img src={qrPreview} alt="Payment QR" style={{ height: '100%', objectFit: 'contain' }} />
                  <button type="button" onClick={handleRemoveQr} style={{ position: 'absolute', top: '-10px', right: '-10px', background: '#ef4444', color: 'white', border: 'none', borderRadius: '50%', width: '28px', height: '28px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>&times;</button>
                </div>
              ) : (
                <span style={{ color: '#888' }}>No QR Code Uploaded</span>
              )}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label>Select QR Image</label>
              <input type="file" accept="image/*" onChange={handleQrFileChange} ref={fileInputRef} />
            </div>

            <button type="submit" className="btn-success" disabled={isSavingQr} style={{ marginTop: '0.5rem' }}>
              {isSavingQr ? 'Saving QR...' : 'Save QR Code'}
            </button>
          </form>
        </div>

        {/* Change Password Box */}
        <div className="card" style={{ flex: 1, minWidth: '320px', padding: '1.5rem' }}>
          <h3>Change Admin Password</h3>
          <p style={{ color: '#666', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
            Update your administrator credentials below.
          </p>

          <form onSubmit={handlePasswordChange} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label>New Password</label>
              <input 
                type="password" 
                value={newPassword} 
                onChange={e => setNewPassword(e.target.value)} 
                placeholder="At least 6 characters" 
                required 
                style={{ padding: '0.6rem', border: '1px solid #ccc', borderRadius: '6px' }}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label>Confirm Password</label>
              <input 
                type="password" 
                value={confirmPassword} 
                onChange={e => setConfirmPassword(e.target.value)} 
                placeholder="Repeat new password" 
                required 
                style={{ padding: '0.6rem', border: '1px solid #ccc', borderRadius: '6px' }}
              />
            </div>

            <button type="submit" className="btn-primary" disabled={isChangingPassword} style={{ marginTop: '1rem' }}>
              {isChangingPassword ? 'Updating...' : 'Update Password'}
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}

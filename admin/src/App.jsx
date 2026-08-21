import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { supabase } from './lib/supabase';
import Login from './Login';
import DashboardLayout from './DashboardLayout';
import KitchenQueue from './KitchenQueue';
import MenuManager from './MenuManager';
import './admin.css';

function App() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) return <div>Loading...</div>;

  if (!session) {
    return <Login />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DashboardLayout />}>
          <Route index element={<Navigate to="/queue" replace />} />
          <Route path="queue" element={<KitchenQueue />} />
          <Route path="menu" element={<MenuManager />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

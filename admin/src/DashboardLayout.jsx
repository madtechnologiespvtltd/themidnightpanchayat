import { Outlet, Link, useLocation } from 'react-router-dom';
import { supabase } from './lib/supabase';

export default function DashboardLayout() {
  const location = useLocation();

  const handleLogout = () => {
    supabase.auth.signOut();
  };

  return (
    <div className="dashboard-layout">
      <aside className="sidebar">
        <div className="sidebar-header">
          <h2>Midnight Panchayat</h2>
          <p>Admin Portal</p>
        </div>
        <nav className="sidebar-nav">
          <Link to="/queue" className={location.pathname === '/queue' ? 'active' : ''}>
            Kitchen Queue
          </Link>
          <Link to="/menu" className={location.pathname === '/menu' ? 'active' : ''}>
            Menu Manager
          </Link>
        </nav>
        <div className="sidebar-footer">
          <button onClick={handleLogout} className="btn-secondary">Logout</button>
        </div>
      </aside>
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}

import { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { supabase } from './lib/supabase';

export default function DashboardLayout() {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleLogout = () => {
    supabase.auth.signOut();
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className="dashboard-layout">
      {/* Mobile Top Navigation Bar */}
      <header className="mobile-nav-bar">
        <button 
          className="hamburger-btn" 
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          aria-label="Toggle Navigation"
        >
          ☰
        </button>
        <span className="mobile-nav-title">Midnight Panchayat</span>
      </header>

      {/* Backdrop overlay for mobile */}
      {isSidebarOpen && (
        <div className="sidebar-overlay" onClick={closeSidebar}></div>
      )}

      <aside className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <h2>Midnight Panchayat</h2>
          <p>Admin Portal</p>
        </div>
        <nav className="sidebar-nav">
          <Link 
            to="/queue" 
            className={location.pathname === '/queue' ? 'active' : ''}
            onClick={closeSidebar}
          >
            Kitchen Queue
          </Link>
          <Link 
            to="/menu" 
            className={location.pathname === '/menu' ? 'active' : ''}
            onClick={closeSidebar}
          >
            Menu Manager
          </Link>
          <Link 
            to="/tables" 
            className={location.pathname === '/tables' ? 'active' : ''}
            onClick={closeSidebar}
          >
            Tables & QR
          </Link>
          <Link 
            to="/settings" 
            className={location.pathname === '/settings' ? 'active' : ''}
            onClick={closeSidebar}
          >
            Settings
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

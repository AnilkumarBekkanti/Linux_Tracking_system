import Sidebar from '../../components/Sidebar/Sidebar';
import { Outlet, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { SYSTEM_ALERTS } from '../../services/api';
import { Search, Bell, User, Settings, HelpCircle, LogOut, Shield, Activity, FileText } from 'lucide-react';
import './MainLayout.css';

const MainLayout = () => {
  const location = useLocation();
  console.log('MainLayout rendering, current path:', location.pathname);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const unreadAlerts = SYSTEM_ALERTS.filter(alert => alert.type === 'error' || alert.type === 'warning');

  const handleSearch = (e) => {
    e.preventDefault();
    // Implement search functionality
    console.log('Searching for:', searchQuery);
  };

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <div className={`layout-wrapper ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
      <Sidebar collapsed={sidebarCollapsed} onToggle={toggleSidebar} />
      
      <div className="main-content">
        <header className="app-header">
          <div className="header-left">
            <button className="sidebar-toggle" onClick={toggleSidebar}>
              {sidebarCollapsed ? '☰' : '✕'}
            </button>
            
            <div className="search-container">
              <Search className="search-icon" size={20} />
              <input
                type="text"
                placeholder="Search servers, metrics, logs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
                onKeyDown={(e) => e.key === 'Enter' && handleSearch(e)}
              />
            </div>
          </div>

          <div className="header-right">
            <div className="header-actions">
              <button className="action-btn" title="Refresh">
                🔄
              </button>
              
              <button className="action-btn" title="Help">
                <HelpCircle size={18} />
              </button>
              
              <div className="notification-wrapper">
                <button 
                  className="action-btn notification-btn" 
                  onClick={() => setShowNotifications(!showNotifications)}
                  title="Notifications"
                >
                  <Bell size={18} />
                  {unreadAlerts.length > 0 && (
                    <span className="notification-badge">{unreadAlerts.length}</span>
                  )}
                </button>
                
                {showNotifications && (
                  <div className="notification-dropdown">
                    <div className="notification-header">
                      <h4>Notifications</h4>
                      <button className="mark-all-read">Mark all as read</button>
                    </div>
                    <div className="notification-list">
                      {SYSTEM_ALERTS.map(alert => (
                        <div key={alert.id} className={`notification-item ${alert.type}`}>
                          <div className="notification-icon">
                            {alert.type === 'error' && '🚨'}
                            {alert.type === 'warning' && '⚠️'}
                            {alert.type === 'info' && 'ℹ️'}
                          </div>
                          <div className="notification-content">
                            <p>{alert.message}</p>
                            <span className="notification-time">{alert.time}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="notification-footer">
                      <button className="view-all-notifications">View all notifications</button>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="user-menu-wrapper">
                <button 
                  className="user-menu-btn" 
                  onClick={() => setShowUserMenu(!showUserMenu)}
                >
                  <div className="user-avatar">
                    <User size={20} />
                  </div>
                  <span className="user-name">Admin</span>
                  <span className="dropdown-arrow">▼</span>
                </button>
                
                {showUserMenu && (
                  <div className="user-dropdown">
                    <div className="user-info">
                      <div className="user-avatar-large">
                        <img src="/api/placeholder/48/48" alt="User" className="avatar-img" />
                      </div>
                      <div className="user-details">
                        <h4>Admin User</h4>
                        <p>admin@linuxtracker.com</p>
                        <span className="user-role">System Administrator</span>
                      </div>
                    </div>
                    <div className="user-menu-items">
                      <button className="menu-item">
                        <User size={16} />
                        <span>Profile</span>
                      </button>
                      <button className="menu-item">
                        <Settings size={16} />
                        <span>Settings</span>
                      </button>
                      <button className="menu-item">
                        <Shield size={16} />
                        <span>Security</span>
                      </button>
                      <button className="menu-item">
                        <Activity size={16} />
                        <span>Usage Analytics</span>
                      </button>
                      <div className="menu-divider"></div>
                      <button className="menu-item">
                        <FileText size={16} />
                        <span>Documentation</span>
                      </button>
                      <button className="menu-item">
                        <HelpCircle size={16} />
                        <span>Support</span>
                      </button>
                      <div className="menu-divider"></div>
                      <button className="menu-item logout">
                        <LogOut size={16} />
                        <span>Logout</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        <main className="content">
          <div className="content-wrapper">
            {console.log('About to render Outlet for path:', location.pathname)}
            <Outlet />
            {console.log('Outlet rendered')}
          </div>
        </main>

        <footer className="app-footer">
          <div className="footer-left">
            <span className="footer-text"> 2024 Linux Tracking System</span>
            <span className="footer-separator">•</span>
            <span className="footer-link">Documentation</span>
            <span className="footer-separator">•</span>
            <span className="footer-link">API</span>
            <span className="footer-separator">•</span>
            <span className="footer-link">Support</span>
          </div>
          <div className="footer-right">
            <div className="system-status">
              <span className="status-indicator online"></span>
              <span className="status-text">All systems operational</span>
            </div>
            <span className="footer-version">v2.1.0</span>
          </div>
        </footer>
      </div>
    </div>
  );
};
export default MainLayout;
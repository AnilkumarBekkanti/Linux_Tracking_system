import { 
  LayoutDashboard, 
  Server, 
  Shield, 
  Settings, 
  Activity,
  Database,
  Network,
  FileText,
  Users,
  Bell,
  ChevronDown,
  ChevronRight,
  Menu,
  X
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import './Sidebar.css';

const Sidebar = ({ collapsed, onToggle }) => {
  const location = useLocation();
  const [expandedSections, setExpandedSections] = useState({});

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const menuItems = [
    {
      title: 'Main',
      items: [
        { icon: LayoutDashboard, label: 'Dashboard', path: '/', badge: null },
        { icon: Server, label: 'Servers', path: '/servers', badge: '12' },
      ]
    },
    {
      title: 'Monitoring',
      items: [
        { icon: Activity, label: 'Performance', path: '/performance', badge: null },
        { icon: Database, label: 'Database', path: '/database', badge: '3' },
        { icon: Network, label: 'Network', path: '/network', badge: null },
      ]
    },
    {
      title: 'Management',
      items: [
        { icon: Users, label: 'Users', path: '/users', badge: null },
        { icon: Shield, label: 'Security', path: '/security', badge: '1' },
        { icon: FileText, label: 'Logs', path: '/logs', badge: '5' },
        { icon: Bell, label: 'Alerts', path: '/alerts', badge: '2' },
      ]
    },
    {
      title: 'System',
      items: [
        { icon: Settings, label: 'Settings', path: '/settings', badge: null },
      ]
    }
  ];

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <div className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
      {/* Logo Section */}
      <div className="sidebar-header">
        <div className="logo-container">
          <div className="logo-icon">
            <Server size={24} />
          </div>
          {!collapsed && (
            <div className="logo-text">
              <span className="logo-title">Linux</span>
              <span className="logo-subtitle">Tracker</span>
            </div>
          )}
        </div>
        <button className="sidebar-toggle-btn" onClick={onToggle}>
          {collapsed ? <Menu size={20} /> : <X size={20} />}
        </button>
      </div>

      {/* Navigation Menu */}
      <nav className="sidebar-nav">
        {menuItems.map((section, sectionIndex) => (
          <div key={sectionIndex} className="menu-section">
            {!collapsed && (
              <div className="section-title">
                <span>{section.title}</span>
              </div>
            )}
            <div className="section-items">
              {section.items.map((item, itemIndex) => (
                <Link
                  key={itemIndex}
                  to={item.path}
                  className={`nav-item ${isActive(item.path) ? 'active' : ''}`}
                  onClick={() => console.log('Navigating to:', item.path)}
                >
                  <div className="nav-item-content">
                    <div className="nav-icon">
                      <item.icon size={20} />
                    </div>
                    {!collapsed && (
                      <>
                        <span className="nav-label">{item.label}</span>
                        {item.badge && (
                          <span className="nav-badge">{item.badge}</span>
                        )}
                      </>
                    )}
                  </div>
                  {isActive(item.path) && !collapsed && (
                    <div className="nav-indicator"></div>
                  )}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </nav>

      {/* Footer Section */}
      <div className="sidebar-footer">
        {!collapsed && (
          <div className="system-info">
            <div className="system-status">
              <div className="status-dot online"></div>
              <span className="status-text">System Online</span>
            </div>
            <div className="version-info">
              <span>v2.1.0</span>
            </div>
          </div>
        )}
        <div className="footer-actions">
          <button className="footer-btn" title="Help">
            <Bell size={18} />
          </button>
          {!collapsed && (
            <button className="footer-btn" title="Settings">
              <Settings size={18} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
export default Sidebar;
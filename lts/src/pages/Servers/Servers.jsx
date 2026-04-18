import { MOCK_SERVERS } from '../../services/api';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import './Servers.css';

const Servers = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [locationFilter, setLocationFilter] = useState('all');
  const [selectedServers, setSelectedServers] = useState([]);
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [viewMode, setViewMode] = useState('table');
  const [showAddServerModal, setShowAddServerModal] = useState(false);
  const [newServer, setNewServer] = useState({
    name: '',
    ip: '',
    type: 'Web Server',
    location: 'US-East-1',
    os: 'Ubuntu 22.04',
    description: ''
  });

  const filteredServers = MOCK_SERVERS.filter(server => {
    const matchesSearch = server.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         server.ip.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || server.status.toLowerCase() === statusFilter;
    const matchesType = typeFilter === 'all' || server.type === typeFilter;
    const matchesLocation = locationFilter === 'all' || server.location === locationFilter;
    
    return matchesSearch && matchesStatus && matchesType && matchesLocation;
  });

  const sortedServers = [...filteredServers].sort((a, b) => {
    let aValue = a[sortBy];
    let bValue = b[sortBy];
    
    if (typeof aValue === 'string') {
      aValue = aValue.toLowerCase();
      bValue = bValue.toLowerCase();
    }
    
    if (sortOrder === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  const toggleServerSelection = (serverId) => {
    setSelectedServers(prev => 
      prev.includes(serverId) 
        ? prev.filter(id => id !== serverId)
        : [...prev, serverId]
    );
  };

  const toggleAllSelection = () => {
    if (selectedServers.length === sortedServers.length) {
      setSelectedServers([]);
    } else {
      setSelectedServers(sortedServers.map(s => s.id));
    }
  };

  const getStatusColor = (status) => {
    switch(status.toLowerCase()) {
      case 'online': return '#22c55e';
      case 'offline': return '#ef4444';
      case 'warning': return '#f59e0b';
      default: return '#6b7280';
    }
  };

  const ServerCard = ({ server }) => (
    <div className="server-card">
      <div className="server-card-header">
        <div className="server-info">
          <h4>{server.name}</h4>
          <span className="server-type">{server.type}</span>
        </div>
        <div className="server-status">
          <span className="status-indicator" style={{ backgroundColor: getStatusColor(server.status) }}></span>
          <span>{server.status}</span>
        </div>
      </div>
      <div className="server-card-body">
        <div className="server-details">
          <div className="detail-item">
            <span className="detail-label">IP:</span>
            <span>{server.ip}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Location:</span>
            <span>{server.location}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">OS:</span>
            <span>{server.os}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Uptime:</span>
            <span>{server.uptime}</span>
          </div>
        </div>
        <div className="server-metrics">
          <div className="metric">
            <span className="metric-label">CPU</span>
            <div className="progress-bar small">
              <div className="progress-fill" style={{ width: `${server.cpu}%` }}></div>
            </div>
            <span>{server.cpu}%</span>
          </div>
          <div className="metric">
            <span className="metric-label">RAM</span>
            <div className="progress-bar small">
              <div className="progress-fill" style={{ width: `${server.ram}%` }}></div>
            </div>
            <span>{server.ram}%</span>
          </div>
          <div className="metric">
            <span className="metric-label">Disk</span>
            <div className="progress-bar small">
              <div className="progress-fill" style={{ width: `${server.disk}%` }}></div>
            </div>
            <span>{server.disk}%</span>
          </div>
        </div>
      </div>
      <div className="server-card-footer">
        <div className="server-alerts">
          {server.alerts > 0 && (
            <span className="alert-count">🚨 {server.alerts} alerts</span>
          )}
          <span className="backup-info">Last backup: {server.lastBackup}</span>
        </div>
        <div className="server-actions">
          <Link to={`/servers/${server.id}`} className="view-link">Details</Link>
          <button className="action-btn">⚙️</button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="servers-container">
      <div className="servers-header">
        <div className="header-left">
          <h1>Managed Servers</h1>
          <div className="server-count">
            <span className="count-badge">{sortedServers.length} servers</span>
            <span className="online-count">{sortedServers.filter(s => s.status === 'Online').length} online</span>
          </div>
        </div>
        <div className="header-actions">
          <button className="btn-primary" onClick={() => {
            console.log('Add Server button clicked');
            setShowAddServerModal(true);
          }}>+ Add Server</button>
          <button className="btn-secondary" onClick={() => setViewMode(viewMode === 'table' ? 'cards' : 'table')}>
            {viewMode === 'table' ? '📇 Cards' : '📊 Table'}
          </button>
        </div>
      </div>

      <div className="servers-controls">
        <div className="search-filter-group">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search servers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            <span className="search-icon">🔍</span>
          </div>
          
          <div className="filter-group">
            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="filter-select">
              <option value="all">All Status</option>
              <option value="online">Online</option>
              <option value="offline">Offline</option>
              <option value="warning">Warning</option>
            </select>
            
            <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)} className="filter-select">
              <option value="all">All Types</option>
              <option value="Web Server">Web Server</option>
              <option value="Database">Database</option>
              <option value="API Server">API Server</option>
              <option value="Cache">Cache</option>
              <option value="Monitoring">Monitoring</option>
              <option value="Backup">Backup</option>
            </select>
            
            <select value={locationFilter} onChange={(e) => setLocationFilter(e.target.value)} className="filter-select">
              <option value="all">All Locations</option>
              <option value="US-East-1">US-East-1</option>
              <option value="US-West-2">US-West-2</option>
              <option value="EU-Central">EU-Central</option>
              <option value="EU-West-1">EU-West-1</option>
            </select>
          </div>
        </div>
        
        {selectedServers.length > 0 && (
          <div className="bulk-actions">
            <span className="selected-count">{selectedServers.length} selected</span>
            <button className="bulk-btn">Restart</button>
            <button className="bulk-btn">Stop</button>
            <button className="bulk-btn danger">Delete</button>
          </div>
        )}
      </div>

      {/* Add Server Modal */}
      {showAddServerModal && (
        <div className="modal-overlay">
          <div className="modal-container">
            <div className="modal-header">
              <h2>Add New Server</h2>
              <button className="modal-close" onClick={() => setShowAddServerModal(false)}>×</button>
            </div>
            
            <div className="modal-body">
              <form className="server-form">
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Server Name *</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="e.g., prod-web-01"
                      value={newServer.name}
                      onChange={(e) => setNewServer({...newServer, name: e.target.value})}
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label className="form-label">IP Address *</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="e.g., 192.168.1.10"
                      value={newServer.ip}
                      onChange={(e) => setNewServer({...newServer, ip: e.target.value})}
                      required
                    />
                  </div>
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Server Type *</label>
                    <select
                      className="form-select"
                      value={newServer.type}
                      onChange={(e) => setNewServer({...newServer, type: e.target.value})}
                      required
                    >
                      <option value="Web Server">Web Server</option>
                      <option value="Database">Database</option>
                      <option value="API Server">API Server</option>
                      <option value="Cache">Cache</option>
                      <option value="Monitoring">Monitoring</option>
                      <option value="Backup">Backup</option>
                    </select>
                  </div>
                  
                  <div className="form-group">
                    <label className="form-label">Location *</label>
                    <select
                      className="form-select"
                      value={newServer.location}
                      onChange={(e) => setNewServer({...newServer, location: e.target.value})}
                      required
                    >
                      <option value="US-East-1">US-East-1</option>
                      <option value="US-West-2">US-West-2</option>
                      <option value="EU-Central">EU-Central</option>
                      <option value="EU-West-1">EU-West-1</option>
                    </select>
                  </div>
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Operating System *</label>
                    <select
                      className="form-select"
                      value={newServer.os}
                      onChange={(e) => setNewServer({...newServer, os: e.target.value})}
                      required
                    >
                      <option value="Ubuntu 22.04">Ubuntu 22.04</option>
                      <option value="Ubuntu 20.04">Ubuntu 20.04</option>
                      <option value="Debian 11">Debian 11</option>
                      <option value="CentOS 7">CentOS 7</option>
                      <option value="Alpine Linux">Alpine Linux</option>
                      <option value="Red Hat Enterprise Linux">Red Hat Enterprise Linux</option>
                    </select>
                  </div>
                  
                  <div className="form-group">
                    <label className="form-label">Description</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="Optional description"
                      value={newServer.description}
                      onChange={(e) => setNewServer({...newServer, description: e.target.value})}
                    />
                  </div>
                </div>
                
                <div className="form-section">
                  <h3 className="section-title">Connection Details</h3>
                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">SSH Port</label>
                      <input
                        type="number"
                        className="form-input"
                        placeholder="22"
                        defaultValue="22"
                      />
                    </div>
                    
                    <div className="form-group">
                      <label className="form-label">SSH Key Path</label>
                      <input
                        type="text"
                        className="form-input"
                        placeholder="~/.ssh/id_rsa"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="form-section">
                  <h3 className="section-title">Monitoring Configuration</h3>
                  <div className="form-row">
                    <div className="form-group">
                      <label className="checkbox-label">
                        <input type="checkbox" className="form-checkbox" defaultChecked />
                        <span>Enable monitoring</span>
                      </label>
                    </div>
                    
                    <div className="form-group">
                      <label className="checkbox-label">
                        <input type="checkbox" className="form-checkbox" defaultChecked />
                        <span>Auto-discovery services</span>
                      </label>
                    </div>
                  </div>
                  
                  <div className="form-row">
                    <div className="form-group">
                      <label className="checkbox-label">
                        <input type="checkbox" className="form-checkbox" />
                        <span>Enable alerts</span>
                      </label>
                    </div>
                    
                    <div className="form-group">
                      <label className="checkbox-label">
                        <input type="checkbox" className="form-checkbox" defaultChecked />
                        <span>Include in backups</span>
                      </label>
                    </div>
                  </div>
                </div>
              </form>
            </div>
            
            <div className="modal-footer">
              <button 
                className="btn-secondary" 
                onClick={() => setShowAddServerModal(false)}
              >
                Cancel
              </button>
              <button 
                className="btn-primary" 
                onClick={() => {
                  // Handle form submission here
                  console.log('Adding server:', newServer);
                  setShowAddServerModal(false);
                  // Reset form
                  setNewServer({
                    name: '',
                    ip: '',
                    type: 'Web Server',
                    location: 'US-East-1',
                    os: 'Ubuntu 22.04',
                    description: ''
                  });
                }}
              >
                Add Server
              </button>
            </div>
          </div>
        </div>
      )}

      {viewMode === 'table' ? (
        <div className="table-wrapper">
          <table className="server-table">
            <thead>
              <tr>
                <th>
                  <input
                    type="checkbox"
                    checked={selectedServers.length === sortedServers.length}
                    onChange={toggleAllSelection}
                    className="checkbox"
                  />
                </th>
                <th onClick={() => handleSort('name')} className="sortable">
                  Name {sortBy === 'name' && (sortOrder === 'asc' ? '↑' : '↓')}
                </th>
                <th onClick={() => handleSort('ip')} className="sortable">
                  IP Address {sortBy === 'ip' && (sortOrder === 'asc' ? '↑' : '↓')}
                </th>
                <th onClick={() => handleSort('type')} className="sortable">
                  Type {sortBy === 'type' && (sortOrder === 'asc' ? '↑' : '↓')}
                </th>
                <th onClick={() => handleSort('status')} className="sortable">
                  Status {sortBy === 'status' && (sortOrder === 'asc' ? '↑' : '↓')}
                </th>
                <th onClick={() => handleSort('cpu')} className="sortable">
                  CPU {sortBy === 'cpu' && (sortOrder === 'asc' ? '↑' : '↓')}
                </th>
                <th onClick={() => handleSort('ram')} className="sortable">
                  RAM {sortBy === 'ram' && (sortOrder === 'asc' ? '↑' : '↓')}
                </th>
                <th onClick={() => handleSort('disk')} className="sortable">
                  Disk {sortBy === 'disk' && (sortOrder === 'asc' ? '↑' : '↓')}
                </th>
                <th onClick={() => handleSort('uptime')} className="sortable">
                  Uptime {sortBy === 'uptime' && (sortOrder === 'asc' ? '↑' : '↓')}
                </th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {sortedServers.map(server => (
                <tr key={server.id} className={selectedServers.includes(server.id) ? 'selected' : ''}>
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedServers.includes(server.id)}
                      onChange={() => toggleServerSelection(server.id)}
                      className="checkbox"
                    />
                  </td>
                  <td>
                    <div className="server-name-cell">
                      <span className="server-name">{server.name}</span>
                      {server.alerts > 0 && <span className="alert-indicator">🚨</span>}
                    </div>
                  </td>
                  <td>{server.ip}</td>
                  <td><span className="type-badge">{server.type}</span></td>
                  <td>
                    <span className={`badge ${server.status.toLowerCase()}`}>
                      {server.status}
                    </span>
                  </td>
                  <td>
                    <div className="progress-cell">
                      <div className="progress-bar">
                        <div className="progress-fill" style={{ width: `${server.cpu}%` }}></div>
                      </div>
                      <span>{server.cpu}%</span>
                    </div>
                  </td>
                  <td>
                    <div className="progress-cell">
                      <div className="progress-bar">
                        <div className="progress-fill" style={{ width: `${server.ram}%` }}></div>
                      </div>
                      <span>{server.ram}%</span>
                    </div>
                  </td>
                  <td>
                    <div className="progress-cell">
                      <div className="progress-bar">
                        <div className="progress-fill" style={{ width: `${server.disk}%` }}></div>
                      </div>
                      <span>{server.disk}%</span>
                    </div>
                  </td>
                  <td>{server.uptime}</td>
                  <td>
                    <div className="action-buttons">
                      <Link to={`/servers/${server.id}`} className="view-link">Details</Link>
                      <button className="action-btn-small">⚙️</button>
                      <button className="action-btn-small">🔄</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="servers-grid">
          {sortedServers.map(server => (
            <ServerCard key={server.id} server={server} />
          ))}
        </div>
      )}
    </div>
  );
};
export default Servers;
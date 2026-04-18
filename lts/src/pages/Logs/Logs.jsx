import { useState, useEffect } from 'react';
import { Search, Filter, Download, RefreshCw, AlertCircle, CheckCircle, Info, XCircle, AlertTriangle } from 'lucide-react';
import './Logs.css';

const Logs = () => {
  const [logs, setLogs] = useState([]);
  const [filteredLogs, setFilteredLogs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [selectedSource, setSelectedSource] = useState('all');
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  

  
  const generateLogs = () => {
    const levels = ['info', 'warning', 'error', 'debug', 'success'];
    const sources = ['nginx', 'postgres', 'redis', 'node-app', 'system', 'docker'];
    const messages = [
      'Database connection established successfully',
      'User authentication failed for user admin',
      'Cache cleared successfully',
      'API request rate limit exceeded',
      'Server started on port 3000',
      'Disk space running low',
      'Memory usage threshold exceeded',
      'Configuration file updated',
      'Backup process completed',
      'SSL certificate renewed',
      'Failed to connect to external service',
      'New user registration completed',
      'Database query optimization applied',
      'Service health check passed',
      'Connection pool exhausted'
    ];

    const newLogs = [];
    const now = new Date();
    
    for (let i = 0; i < 50; i++) {
      const timestamp = new Date(now - Math.random() * 3600000 * 24);
      const level = levels[Math.floor(Math.random() * levels.length)];
      const source = sources[Math.floor(Math.random() * sources.length)];
      const message = messages[Math.floor(Math.random() * messages.length)];
      
      newLogs.push({
        id: `log-${Date.now()}-${i}`,
        timestamp,
        level,
        source,
        message,
        details: {
          pid: Math.floor(Math.random() * 10000 + 1000),
          userId: Math.random() > 0.5 ? `user-${Math.floor(Math.random() * 1000)}` : null,
          ip: `192.168.1.${Math.floor(Math.random() * 255)}`,
          requestId: `req-${Math.random().toString(36).substr(2, 9)}`
        }
      });
    }
    
    return newLogs.sort((a, b) => b.timestamp - a.timestamp);
  };

  useEffect(() => {
    const initialLogs = generateLogs();
    setLogs(initialLogs);
    setFilteredLogs(initialLogs);
  }, []);

  useEffect(() => {
    if (!autoRefresh) return;

    const interval = setInterval(() => {
      setIsLoading(true);
      setTimeout(() => {
        const newLogs = generateLogs();
        setLogs(newLogs);
        applyFilters(newLogs, searchTerm, selectedLevel, selectedSource);
        setIsLoading(false);
      }, 1000);
    }, 5000);

    return () => clearInterval(interval);
  }, [autoRefresh, searchTerm, selectedLevel, selectedSource]);

  const applyFilters = (logData, search, level, source) => {
    let filtered = logData;

    if (search) {
      filtered = filtered.filter(log => 
        log.message.toLowerCase().includes(search.toLowerCase()) ||
        log.source.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (level !== 'all') {
      filtered = filtered.filter(log => log.level === level);
    }

    if (source !== 'all') {
      filtered = filtered.filter(log => log.source === source);
    }

    setFilteredLogs(filtered);
  };

  useEffect(() => {
    applyFilters(logs, searchTerm, selectedLevel, selectedSource);
  }, [searchTerm, selectedLevel, selectedSource, logs]);

  const getLevelIcon = (level) => {
    switch(level) {
      case 'info': return <Info size={16} className="log-icon info" />;
      case 'warning': return <AlertTriangle size={16} className="log-icon warning" />;
      case 'error': return <XCircle size={16} className="log-icon error" />;
      case 'success': return <CheckCircle size={16} className="log-icon success" />;
      case 'debug': return <AlertCircle size={16} className="log-icon debug" />;
      default: return <Info size={16} className="log-icon" />;
    }
  };

  const getLevelColor = (level) => {
    switch(level) {
      case 'info': return '#3b82f6';
      case 'warning': return '#f59e0b';
      case 'error': return '#ef4444';
      case 'success': return '#22c55e';
      case 'debug': return '#8b5cf6';
      default: return '#6b7280';
    }
  };

  const formatTimestamp = (timestamp) => {
    return timestamp.toLocaleString('en-US', {
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const handleExport = () => {
    const logText = filteredLogs.map(log => 
      `[${formatTimestamp(log.timestamp)}] [${log.level.toUpperCase()}] [${log.source}] ${log.message}`
    ).join('\n');
    
    const blob = new Blob([logText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `logs-${new Date().toISOString().slice(0, 10)}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const sources = [...new Set(logs.map(log => log.source))];

  return (
    <div className="logs-container">
      <div className="logs-header">
        <h1>System Logs</h1>
        <div className="header-actions">
          <button 
            className={`refresh-btn ${autoRefresh ? 'active' : ''}`}
            onClick={() => setAutoRefresh(!autoRefresh)}
          >
            <RefreshCw size={16} className={autoRefresh ? 'spinning' : ''} />
            Auto Refresh
          </button>
          <button className="export-btn" onClick={handleExport}>
            <Download size={16} />
            Export
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="filters-section">
        <div className="search-filter">
          <div className="search-input-wrapper">
            <Search size={20} className="search-icon" />
            <input
              type="text"
              placeholder="Search logs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
        </div>

        <div className="filter-controls">
          <div className="filter-group">
            <label className="filter-label">Level</label>
            <select 
              value={selectedLevel} 
              onChange={(e) => setSelectedLevel(e.target.value)}
              className="filter-select"
            >
              <option value="all">All Levels</option>
              <option value="info">Info</option>
              <option value="warning">Warning</option>
              <option value="error">Error</option>
              <option value="success">Success</option>
              <option value="debug">Debug</option>
            </select>
          </div>

          <div className="filter-group">
            <label className="filter-label">Source</label>
            <select 
              value={selectedSource} 
              onChange={(e) => setSelectedSource(e.target.value)}
              className="filter-select"
            >
              <option value="all">All Sources</option>
              {sources.map(source => (
                <option key={source} value={source}>{source}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Log Statistics */}
      <div className="stats-section">
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-header">
              <span className="stat-label">Total Logs</span>
            </div>
            <div className="stat-value">{filteredLogs.length}</div>
          </div>
          
          <div className="stat-card">
            <div className="stat-header">
              <span className="stat-label">Errors</span>
              <XCircle size={16} className="stat-icon error" />
            </div>
            <div className="stat-value error">
              {filteredLogs.filter(log => log.level === 'error').length}
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-header">
              <span className="stat-label">Warnings</span>
              <AlertTriangle size={16} className="stat-icon warning" />
            </div>
            <div className="stat-value warning">
              {filteredLogs.filter(log => log.level === 'warning').length}
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-header">
              <span className="stat-label">Success</span>
              <CheckCircle size={16} className="stat-icon success" />
            </div>
            <div className="stat-value success">
              {filteredLogs.filter(log => log.level === 'success').length}
            </div>
          </div>
        </div>
      </div>

      {/* Logs Table */}
      <div className="logs-section">
        <div className="logs-card">
          <div className="logs-header">
            <h3>Recent Logs</h3>
            <div className="logs-count">
              Showing {filteredLogs.length} of {logs.length} logs
            </div>
          </div>
          
          <div className={`logs-table-container ${isLoading ? 'loading' : ''}`}>
            <div className="logs-table">
              {filteredLogs.map((log, index) => (
                <div key={log.id} className="log-entry">
                  <div className="log-main">
                    <div className="log-left">
                      <div className="log-level">
                        {getLevelIcon(log.level)}
                        <span className="level-text" style={{ color: getLevelColor(log.level) }}>
                          {log.level.toUpperCase()}
                        </span>
                      </div>
                      <div className="log-source">{log.source}</div>
                      <div className="log-timestamp">{formatTimestamp(log.timestamp)}</div>
                    </div>
                    <div className="log-message">{log.message}</div>
                  </div>
                  <div className="log-details">
                    <div className="detail-item">
                      <span className="detail-label">PID:</span>
                      <span className="detail-value">{log.details.pid}</span>
                    </div>
                    {log.details.userId && (
                      <div className="detail-item">
                        <span className="detail-label">User:</span>
                        <span className="detail-value">{log.details.userId}</span>
                      </div>
                    )}
                    <div className="detail-item">
                      <span className="detail-label">IP:</span>
                      <span className="detail-value">{log.details.ip}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Request:</span>
                      <span className="detail-value">{log.details.requestId}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {filteredLogs.length === 0 && (
              <div className="no-logs">
                <div className="no-logs-icon">
                  <Search size={48} />
                </div>
                <h3>No logs found</h3>
                <p>Try adjusting your search or filters</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Logs;

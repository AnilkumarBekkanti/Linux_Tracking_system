import { useState, useEffect } from 'react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { Database, Activity, Clock, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';
import './Database.css';

const DatabasePage = () => {
  console.log('Database component loaded');
  console.log('Database component starting render');
  
  const [selectedDatabase, setSelectedDatabase] = useState('all');
  const [selectedTimeRange, setSelectedTimeRange] = useState('24h');
  
  console.log('Database state initialized');

  // Generate database performance data
  const generateDatabaseData = (hours = 24) => {
    const data = [];
    const now = new Date();
    for (let i = hours; i >= 0; i--) {
      const time = new Date(now - i * 3600000);
      data.push({
        time: time.getHours() + ':00',
        connections: Math.floor(Math.random() * 50 + 100),
        queries: Math.floor(Math.random() * 1000 + 500),
        responseTime: Math.random() * 50 + 20,
        cpuUsage: Math.random() * 30 + 20,
        memoryUsage: Math.random() * 40 + 40,
        diskIO: Math.random() * 100 + 50
      });
    }
    return data;
  };

  const [databaseData, setDatabaseData] = useState(generateDatabaseData());

  useEffect(() => {
    const interval = setInterval(() => {
      setDatabaseData(generateDatabaseData(
        selectedTimeRange === '1h' ? 1 : 
        selectedTimeRange === '6h' ? 6 : 
        selectedTimeRange === '24h' ? 24 : 168
      ));
    }, 5000);

    return () => clearInterval(interval);
  }, [selectedTimeRange]);

  const databases = [
    { 
      name: 'PostgreSQL', 
      type: 'Primary', 
      status: 'healthy', 
      version: '14.5',
      size: '125.4 GB',
      connections: 145,
      maxConnections: 200,
      uptime: '45d 12h'
    },
    { 
      name: 'Redis', 
      type: 'Cache', 
      status: 'healthy', 
      version: '7.0',
      size: '2.1 GB',
      connections: 89,
      maxConnections: 100,
      uptime: '45d 12h'
    },
    { 
      name: 'MongoDB', 
      type: 'Analytics', 
      status: 'warning', 
      version: '6.0',
      size: '89.7 GB',
      connections: 67,
      maxConnections: 100,
      uptime: '23d 8h'
    },
    { 
      name: 'Elasticsearch', 
      type: 'Search', 
      status: 'healthy', 
      version: '8.5',
      size: '45.2 GB',
      connections: 34,
      maxConnections: 50,
      uptime: '45d 12h'
    }
  ];

  const queryStats = [
    { type: 'SELECT', count: 45234, avgTime: 12.5 },
    { type: 'INSERT', count: 12345, avgTime: 8.3 },
    { type: 'UPDATE', count: 8765, avgTime: 15.7 },
    { type: 'DELETE', count: 2345, avgTime: 6.2 },
    { type: 'INDEX', count: 567, avgTime: 45.3 }
  ];

  const storageDistribution = [
    { name: 'Data', value: 65, color: '#3b82f6' },
    { name: 'Indexes', value: 20, color: '#10b981' },
    { name: 'Logs', value: 10, color: '#f59e0b' },
    { name: 'Temp', value: 5, color: '#8b5cf6' }
  ];

  const recentQueries = [
    { query: 'SELECT * FROM users WHERE status = $1', time: '2.3ms', status: 'success', timestamp: '12:34:56' },
    { query: 'UPDATE orders SET status = $1 WHERE id = $2', time: '5.7ms', status: 'success', timestamp: '12:34:52' },
    { query: 'INSERT INTO logs (message, level) VALUES ($1, $2)', time: '1.2ms', status: 'success', timestamp: '12:34:48' },
    { query: 'SELECT COUNT(*) FROM products WHERE price > $1', time: '15.8ms', status: 'warning', timestamp: '12:34:45' },
    { query: 'DELETE FROM sessions WHERE expires < NOW()', time: '8.4ms', status: 'success', timestamp: '12:34:42' }
  ];

  const getStatusIcon = (status) => {
    switch(status) {
      case 'healthy': return <CheckCircle size={16} className="status-icon healthy" />;
      case 'warning': return <AlertTriangle size={16} className="status-icon warning" />;
      case 'error': return <XCircle size={16} className="status-icon error" />;
      default: return <Clock size={16} className="status-icon" />;
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'healthy': return '#22c55e';
      case 'warning': return '#f59e0b';
      case 'error': return '#ef4444';
      default: return '#6b7280';
    }
  };

  console.log('Database component about to render');
  return (
    <div className="database-container">
      <div className="database-header">
        <h1>Database Management</h1>
        <div className="header-controls">
          <select 
            className="database-selector"
            value={selectedDatabase}
            onChange={(e) => setSelectedDatabase(e.target.value)}
          >
            <option value="all">All Databases</option>
            {databases.map(db => (
              <option key={db.name} value={db.name}>{db.name}</option>
            ))}
          </select>
          <div className="time-range-selector">
            {['1h', '6h', '24h', '7d'].map(range => (
              <button
                key={range}
                className={`time-btn ${selectedTimeRange === range ? 'active' : ''}`}
                onClick={() => setSelectedTimeRange(range)}
              >
                {range}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Database Overview Cards */}
      <div className="database-grid">
        {databases.map((db, index) => (
          <div key={index} className="database-card">
            <div className="database-header-info">
              <div className="database-info">
                <div className="database-icon">
                  <Database size={24} />
                </div>
                <div className="database-details">
                  <h3>{db.name}</h3>
                  <span className="database-type">{db.type}</span>
                </div>
              </div>
              <div className="database-status">
                {getStatusIcon(db.status)}
                <span className="status-text" style={{ color: getStatusColor(db.status) }}>
                  {db.status}
                </span>
              </div>
            </div>
            
            <div className="database-metrics">
              <div className="metric-row">
                <span className="metric-label">Version</span>
                <span className="metric-value">{db.version}</span>
              </div>
              <div className="metric-row">
                <span className="metric-label">Size</span>
                <span className="metric-value">{db.size}</span>
              </div>
              <div className="metric-row">
                <span className="metric-label">Connections</span>
                <div className="connection-info">
                  <span className="metric-value">{db.connections}</span>
                  <span className="connection-max">/ {db.maxConnections}</span>
                </div>
              </div>
              <div className="metric-row">
                <span className="metric-label">Uptime</span>
                <span className="metric-value">{db.uptime}</span>
              </div>
            </div>
            
            <div className="connection-bar">
              <div className="bar-bg">
                <div 
                  className="bar-fill" 
                  style={{ 
                    width: `${(db.connections / db.maxConnections) * 100}%`,
                    backgroundColor: db.connections > db.maxConnections * 0.8 ? '#ef4444' : '#3b82f6'
                  }}
                ></div>
              </div>
              <span className="connection-percentage">
                {Math.round((db.connections / db.maxConnections) * 100)}%
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Performance Charts */}
      <div className="charts-section">
        <div className="chart-row">
          <div className="chart-card large">
            <h3>Database Performance</h3>
            <div className="chart-container">
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={databaseData}>
                  <defs>
                    <linearGradient id="queryGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1}/>
                    </linearGradient>
                    <linearGradient id="responseGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0.1}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="time" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip />
                  <Area type="monotone" dataKey="queries" stroke="#3b82f6" fill="url(#queryGradient)" strokeWidth={2} />
                  <Area type="monotone" dataKey="responseTime" stroke="#10b981" fill="url(#responseGradient)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="chart-legend">
              <div className="legend-item">
                <div className="legend-color" style={{ backgroundColor: '#3b82f6' }}></div>
                <span>Queries/sec</span>
              </div>
              <div className="legend-item">
                <div className="legend-color" style={{ backgroundColor: '#10b981' }}></div>
                <span>Response Time (ms)</span>
              </div>
            </div>
          </div>

          <div className="chart-card">
            <h3>Storage Distribution</h3>
            <div className="chart-container">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={storageDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {storageDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="chart-legend">
              {storageDistribution.map((item, index) => (
                <div key={index} className="legend-item">
                  <div className="legend-color" style={{ backgroundColor: item.color }}></div>
                  <span>{item.name}: {item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="chart-row">
          <div className="chart-card large">
            <h3>Resource Usage</h3>
            <div className="chart-container">
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={databaseData}>
                  <XAxis dataKey="time" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip />
                  <Line type="monotone" dataKey="cpuUsage" stroke="#f59e0b" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="memoryUsage" stroke="#8b5cf6" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="diskIO" stroke="#ef4444" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="chart-legend">
              <div className="legend-item">
                <div className="legend-color" style={{ backgroundColor: '#f59e0b' }}></div>
                <span>CPU Usage</span>
              </div>
              <div className="legend-item">
                <div className="legend-color" style={{ backgroundColor: '#8b5cf6' }}></div>
                <span>Memory Usage</span>
              </div>
              <div className="legend-item">
                <div className="legend-color" style={{ backgroundColor: '#ef4444' }}></div>
                <span>Disk I/O</span>
              </div>
            </div>
          </div>

          <div className="chart-card">
            <h3>Query Types</h3>
            <div className="chart-container">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={queryStats}>
                  <XAxis dataKey="type" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip />
                  <Bar dataKey="count" fill="#3b82f6" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      {/* Query Statistics and Recent Queries */}
      <div className="query-section">
        <div className="section-card">
          <h3>Query Statistics</h3>
          <div className="query-stats-table">
            <table>
              <thead>
                <tr>
                  <th>Query Type</th>
                  <th>Count</th>
                  <th>Avg Time</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {queryStats.map((stat, index) => (
                  <tr key={index}>
                    <td className="query-type">{stat.type}</td>
                    <td>{stat.count.toLocaleString()}</td>
                    <td>{stat.avgTime}ms</td>
                    <td>
                      <span className="status-badge success">Optimal</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="section-card">
          <h3>Recent Queries</h3>
          <div className="recent-queries">
            {recentQueries.map((query, index) => (
              <div key={index} className="query-item">
                <div className="query-content">
                  <code className="query-text">{query.query}</code>
                  <div className="query-meta">
                    <span className="query-time">{query.time}</span>
                    <span className="query-timestamp">{query.timestamp}</span>
                  </div>
                </div>
                <div className="query-status">
                  <span className={`status-badge ${query.status}`}>{query.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DatabasePage;

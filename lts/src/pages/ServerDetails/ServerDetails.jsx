import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';
import { MOCK_SERVERS, RUN_QUEUE_DATA } from '../../services/api';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import './ServerDetails.css';

const ServerDetails = () => {
  const { id } = useParams();
  const [selectedTimeRange, setSelectedTimeRange] = useState('24h');
  
  const server = MOCK_SERVERS.find(s => s.id === parseInt(id));
  
  if (!server) {
    return (
      <div className="server-details-container">
        <div className="not-found">
          <h2>Server Not Found</h2>
          <p>The server you're looking for doesn't exist.</p>
          <Link to="/servers" className="back-link">Back to Servers</Link>
        </div>
      </div>
    );
  }

  // Generate detailed monitoring data
  const generateTimeSeriesData = (hours = 24) => {
    const data = [];
    for (let i = 0; i < hours; i++) {
      data.push({
        time: `${i}:00`,
        cpu: Math.random() * 30 + server.cpu - 15,
        ram: Math.random() * 20 + server.ram - 10,
        disk: Math.random() * 10 + server.disk - 5,
        network: Math.random() * 50 + server.network - 25,
        processes: Math.floor(Math.random() * 20 + server.processes - 10)
      });
    }
    return data;
  };

  const performanceData = generateTimeSeriesData(24);
  
  const systemMetrics = [
    { name: 'CPU Usage', value: server.cpu, max: 100, unit: '%', status: server.cpu > 80 ? 'warning' : 'normal' },
    { name: 'Memory Usage', value: server.ram, max: 100, unit: '%', status: server.ram > 85 ? 'warning' : 'normal' },
    { name: 'Disk Usage', value: server.disk, max: 100, unit: '%', status: server.disk > 90 ? 'critical' : 'normal' },
    { name: 'Network I/O', value: server.network, max: 1000, unit: 'MB/s', status: 'normal' },
    { name: 'Processes', value: server.processes, max: 500, unit: 'count', status: 'normal' }
  ];

  const serviceStatus = [
    { name: 'Web Server', status: 'running', port: 80, uptime: '12d 4h' },
    { name: 'Database', status: 'running', port: 3306, uptime: '45d 1h' },
    { name: 'SSH', status: 'running', port: 22, uptime: '67d 8h' },
    { name: 'Firewall', status: 'running', port: '-', uptime: '67d 8h' },
    { name: 'Monitoring Agent', status: 'running', port: 9090, uptime: '12d 4h' }
  ];

  const recentAlerts = [
    { id: 1, type: 'warning', message: 'High CPU usage detected', time: '5 min ago', severity: 'medium' },
    { id: 2, type: 'info', message: 'System backup completed successfully', time: '2 hours ago', severity: 'low' },
    { id: 3, type: 'error', message: 'Disk space running low', time: '6 hours ago', severity: 'high' },
    { id: 4, type: 'info', message: 'Security scan completed', time: '1 day ago', severity: 'low' }
  ];

  const resourceDistribution = [
    { name: 'Applications', value: 35, color: '#3b82f6' },
    { name: 'System', value: 25, color: '#22c55e' },
    { name: 'Cache', value: 20, color: '#f59e0b' },
    { name: 'Free', value: 20, color: '#6b7280' }
  ];

  const GaugeChart = ({ value, max, unit, label, status }) => {
    const percentage = (value / max) * 100;
    const getColor = () => {
      if (status === 'critical') return '#ef4444';
      if (status === 'warning') return '#f59e0b';
      return '#22c55e';
    };

    return (
      <div className="gauge-chart-large">
        <div className="gauge-container-large">
          <svg className="gauge-svg-large" viewBox="0 0 200 120">
            <path
              d="M 20 100 A 80 80 0 0 1 180 100"
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="15"
              strokeLinecap="round"
            />
            <path
              d="M 20 100 A 80 80 0 0 1 180 100"
              fill="none"
              stroke={getColor()}
              strokeWidth="15"
              strokeLinecap="round"
              strokeDasharray={`${percentage * 1.57} 157`}
              transform="rotate(-90 100 100)"
            />
          </svg>
          <div className="gauge-value-large">
            <span className="value-number-large">{value}</span>
            <span className="value-unit-large">{unit}</span>
          </div>
        </div>
        <div className="gauge-label-large">{label}</div>
        <div className={`gauge-status ${status}`}>{status.toUpperCase()}</div>
      </div>
    );
  };

  return (
    <div className="server-details-container">
      {/* Header */}
      <div className="server-header">
        <div className="server-header-left">
          <Link to="/servers" className="back-link">« Back to Servers</Link>
          <div className="server-title">
            <h1>{server.name}</h1>
            <div className="server-meta">
              <span className={`server-status-badge ${server.status.toLowerCase()}`}>
                {server.status}
              </span>
              <span className="server-type">{server.type}</span>
              <span className="server-location">{server.location}</span>
            </div>
          </div>
        </div>
        <div className="server-header-right">
          <div className="server-actions">
            <button className="action-btn primary">Restart</button>
            <button className="action-btn secondary">Stop</button>
            <button className="action-btn secondary">Configure</button>
          </div>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="overview-grid">
        <div className="overview-card">
          <h3>System Information</h3>
          <div className="info-grid">
            <div className="info-item">
              <span className="info-label">IP Address:</span>
              <span className="info-value">{server.ip}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Operating System:</span>
              <span className="info-value">{server.os}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Uptime:</span>
              <span className="info-value">{server.uptime}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Last Backup:</span>
              <span className="info-value">{server.lastBackup}</span>
            </div>
          </div>
        </div>

        <div className="overview-card">
          <h3>Performance Metrics</h3>
          <div className="metrics-grid">
            {systemMetrics.map((metric, index) => (
              <div key={index} className="metric-item">
                <div className="metric-header">
                  <span className="metric-name">{metric.name}</span>
                  <span className={`metric-status ${metric.status}`}></span>
                </div>
                <div className="metric-value">
                  <span className="value">{metric.value}</span>
                  <span className="unit">{metric.unit}</span>
                </div>
                <div className="progress-bar">
                  <div 
                    className="progress-fill" 
                    style={{ 
                      width: `${(metric.value / metric.max) * 100}%`,
                      backgroundColor: metric.status === 'critical' ? '#ef4444' : 
                                     metric.status === 'warning' ? '#f59e0b' : '#22c55e'
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Real-time Monitoring */}
      <div className="monitoring-section">
        <h2>Real-time Monitoring</h2>
        <div className="monitoring-grid">
          <div className="monitoring-card large">
            <h3>System Performance</h3>
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
            <div className="chart-container">
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={performanceData}>
                  <XAxis dataKey="time" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip contentStyle={{ backgroundColor: 'white', border: '1px solid #e5e7eb' }} />
                  <Line type="monotone" dataKey="cpu" stroke="#3b82f6" strokeWidth={2} name="CPU %" />
                  <Line type="monotone" dataKey="ram" stroke="#22c55e" strokeWidth={2} name="RAM %" />
                  <Line type="monotone" dataKey="disk" stroke="#f59e0b" strokeWidth={2} name="Disk %" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="monitoring-card">
            <h3>Resource Distribution</h3>
            <div className="chart-container">
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={resourceDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {resourceDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="legend">
              {resourceDistribution.map((item, index) => (
                <div key={index} className="legend-item">
                  <div className="legend-color" style={{ backgroundColor: item.color }}></div>
                  <span>{item.name}: {item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* System Gauges */}
      <div className="gauges-section">
        <h2>System Health Gauges</h2>
        <div className="gauges-grid">
          {systemMetrics.slice(0, 4).map((metric, index) => (
            <GaugeChart
              key={index}
              value={metric.value}
              max={metric.max}
              unit={metric.unit}
              label={metric.name}
              status={metric.status}
            />
          ))}
        </div>
      </div>

      {/* Services Status */}
      <div className="services-section">
        <h2>Services Status</h2>
        <div className="services-table">
          <table>
            <thead>
              <tr>
                <th>Service Name</th>
                <th>Status</th>
                <th>Port</th>
                <th>Uptime</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {serviceStatus.map((service, index) => (
                <tr key={index}>
                  <td>{service.name}</td>
                  <td>
                    <span className={`status-badge ${service.status}`}>
                      {service.status}
                    </span>
                  </td>
                  <td>{service.port}</td>
                  <td>{service.uptime}</td>
                  <td>
                    <button className="action-btn-small">Restart</button>
                    <button className="action-btn-small">Logs</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recent Alerts */}
      <div className="alerts-section">
        <h2>Recent Alerts</h2>
        <div className="alerts-list">
          {recentAlerts.map(alert => (
            <div key={alert.id} className={`alert-item ${alert.type}`}>
              <div className="alert-icon">
                {alert.type === 'error' && '!'}
                {alert.type === 'warning' && '!'}
                {alert.type === 'info' && 'i'}
              </div>
              <div className="alert-content">
                <p>{alert.message}</p>
                <span className="alert-time">{alert.time}</span>
              </div>
              <div className="alert-actions">
                <button className="alert-btn">View Details</button>
                <button className="alert-btn">Dismiss</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Advanced Metrics */}
      <div className="advanced-section">
        <h2>Advanced Metrics</h2>
        <div className="advanced-grid">
          <div className="advanced-card">
            <h3>Network Traffic</h3>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={performanceData}>
                <XAxis dataKey="time" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip contentStyle={{ backgroundColor: 'white', border: '1px solid #e5e7eb' }} />
                <Area type="monotone" dataKey="network" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="advanced-card">
            <h3>Process Count</h3>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={performanceData.slice(-12)}>
                <XAxis dataKey="time" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip contentStyle={{ backgroundColor: 'white', border: '1px solid #e5e7eb' }} />
                <Bar dataKey="processes" fill="#10b981" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServerDetails;
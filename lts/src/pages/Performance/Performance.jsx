import { useState, useEffect } from 'react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import './Performance.css';

const Performance = () => {
  console.log('Performance component loaded');
  const [selectedTimeRange, setSelectedTimeRange] = useState('24h');
  const [selectedMetric, setSelectedMetric] = useState('cpu');

  // Generate time-series data
  const generateTimeSeriesData = (hours = 24) => {
    const data = [];
    const now = new Date();
    for (let i = hours; i >= 0; i--) {
      const time = new Date(now - i * 3600000);
      data.push({
        time: time.getHours() + ':00',
        cpu: Math.random() * 40 + 30 + Math.sin(i / 4) * 10,
        memory: Math.random() * 30 + 50 + Math.cos(i / 3) * 8,
        disk: Math.random() * 20 + 60,
        network: Math.random() * 100 + 50,
        requests: Math.floor(Math.random() * 1000 + 500),
        responseTime: Math.random() * 200 + 100
      });
    }
    return data;
  };

  const [performanceData, setPerformanceData] = useState(generateTimeSeriesData());

  useEffect(() => {
    const interval = setInterval(() => {
      setPerformanceData(generateTimeSeriesData(
        selectedTimeRange === '1h' ? 1 : 
        selectedTimeRange === '6h' ? 6 : 
        selectedTimeRange === '24h' ? 24 : 168
      ));
    }, 5000);

    return () => clearInterval(interval);
  }, [selectedTimeRange]);

  const resourceDistribution = [
    { name: 'CPU Usage', value: 65, color: '#3b82f6' },
    { name: 'Memory', value: 78, color: '#10b981' },
    { name: 'Disk I/O', value: 45, color: '#f59e0b' },
    { name: 'Network', value: 32, color: '#8b5cf6' }
  ];

  const topProcesses = [
    { name: 'nginx', cpu: 12.5, memory: 8.3, pid: 1234 },
    { name: 'postgres', cpu: 8.7, memory: 15.2, pid: 5678 },
    { name: 'redis-server', cpu: 6.2, memory: 4.1, pid: 9012 },
    { name: 'node-app', cpu: 5.8, memory: 12.7, pid: 3456 },
    { name: 'dockerd', cpu: 4.3, memory: 6.9, pid: 7890 }
  ];

  const performanceMetrics = [
    { label: 'CPU Load', value: '65%', status: 'normal', trend: '+2%' },
    { label: 'Memory Usage', value: '78%', status: 'warning', trend: '+5%' },
    { label: 'Disk I/O', value: '45%', status: 'normal', trend: '-1%' },
    { label: 'Network', value: '32%', status: 'normal', trend: '+8%' },
    { label: 'Response Time', value: '142ms', status: 'good', trend: '-12%' },
    { label: 'Throughput', value: '1.2k/s', status: 'good', trend: '+15%' }
  ];

  const getStatusColor = (status) => {
    switch(status) {
      case 'good': return '#22c55e';
      case 'normal': return '#3b82f6';
      case 'warning': return '#f59e0b';
      case 'critical': return '#ef4444';
      default: return '#6b7280';
    }
  };

  return (
    <div className="performance-container">
      <div className="performance-header">
        <h1>System Performance</h1>
        <div className="header-controls">
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

      {/* Performance Metrics Grid */}
      <div className="metrics-grid">
        {performanceMetrics.map((metric, index) => (
          <div key={index} className="metric-card">
            <div className="metric-header">
              <span className="metric-label">{metric.label}</span>
              <span className="metric-trend" style={{ color: metric.trend.startsWith('+') ? '#22c55e' : '#ef4444' }}>
                {metric.trend}
              </span>
            </div>
            <div className="metric-value" style={{ color: getStatusColor(metric.status) }}>
              {metric.value}
            </div>
            <div className="metric-status">
              <div className="status-dot" style={{ backgroundColor: getStatusColor(metric.status) }}></div>
              <span>{metric.status}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="charts-section">
        <div className="chart-row">
          <div className="chart-card large">
            <h3>CPU & Memory Usage</h3>
            <div className="chart-container">
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={performanceData}>
                  <defs>
                    <linearGradient id="cpuGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1}/>
                    </linearGradient>
                    <linearGradient id="memoryGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0.1}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="time" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip />
                  <Area type="monotone" dataKey="cpu" stroke="#3b82f6" fill="url(#cpuGradient)" strokeWidth={2} />
                  <Area type="monotone" dataKey="memory" stroke="#10b981" fill="url(#memoryGradient)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="chart-legend">
              <div className="legend-item">
                <div className="legend-color" style={{ backgroundColor: '#3b82f6' }}></div>
                <span>CPU Usage</span>
              </div>
              <div className="legend-item">
                <div className="legend-color" style={{ backgroundColor: '#10b981' }}></div>
                <span>Memory Usage</span>
              </div>
            </div>
          </div>

          <div className="chart-card">
            <h3>Resource Distribution</h3>
            <div className="chart-container">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={resourceDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
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
            <div className="chart-legend">
              {resourceDistribution.map((item, index) => (
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
            <h3>Network Traffic & Disk I/O</h3>
            <div className="chart-container">
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={performanceData}>
                  <XAxis dataKey="time" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip />
                  <Line type="monotone" dataKey="network" stroke="#8b5cf6" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="disk" stroke="#f59e0b" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="chart-legend">
              <div className="legend-item">
                <div className="legend-color" style={{ backgroundColor: '#8b5cf6' }}></div>
                <span>Network Traffic</span>
              </div>
              <div className="legend-item">
                <div className="legend-color" style={{ backgroundColor: '#f59e0b' }}></div>
                <span>Disk I/O</span>
              </div>
            </div>
          </div>

          <div className="chart-card">
            <h3>Request Rate</h3>
            <div className="chart-container">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={performanceData.slice(-12)}>
                  <XAxis dataKey="time" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip />
                  <Bar dataKey="requests" fill="#3b82f6" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      {/* Top Processes Table */}
      <div className="processes-section">
        <div className="section-card">
          <h3>Top Processes</h3>
          <div className="processes-table">
            <table>
              <thead>
                <tr>
                  <th>Process</th>
                  <th>PID</th>
                  <th>CPU %</th>
                  <th>Memory %</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {topProcesses.map((process, index) => (
                  <tr key={index}>
                    <td className="process-name">
                      <div className="process-info">
                        <div className="process-icon">{'\u2699'}</div>
                        <span>{process.name}</span>
                      </div>
                    </td>
                    <td>{process.pid}</td>
                    <td>{process.cpu}%</td>
                    <td>{process.memory}%</td>
                    <td>
                      <span className="status-badge running">Running</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Performance;

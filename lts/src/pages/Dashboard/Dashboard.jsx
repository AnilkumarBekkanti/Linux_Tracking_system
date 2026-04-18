import { 
  APPLICATION_DETAILS, 
  COMPONENT_STATISTICS, 
  GAUGE_DATA, 
  RUN_QUEUE_DATA 
} from '../../services/api';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine, Area, AreaChart } from 'recharts';
import { useState } from 'react';
import './Dashboard.css';

const Dashboard = () => {
  const [selectedTimeRange, setSelectedTimeRange] = useState('1h');

  const GaugeChart = ({ data }) => {
    const percentage = (data.value / data.max) * 100;
    const rotation = (percentage * 180) / 100 - 90;
    
    return (
      <div className="gauge-chart">
        <div className="gauge-container">
          <svg className="gauge-svg" viewBox="0 0 200 120">
            <path
              d="M 20 100 A 80 80 0 0 1 180 100"
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="20"
              strokeLinecap="round"
            />
            <path
              d="M 20 100 A 80 80 0 0 1 180 100"
              fill="none"
              stroke={data.color}
              strokeWidth="20"
              strokeLinecap="round"
              strokeDasharray={`${percentage * 1.57} 157`}
              transform="rotate(-90 100 100)"
            />
          </svg>
          <div className="gauge-value">
            <span className="value-number">{data.value}</span>
            <span className="value-unit">{data.unit}</span>
          </div>
        </div>
        <div className="gauge-label">{data.name}</div>
      </div>
    );
  };

  return (
    <div className="dashboard-white">
      <div className="dashboard-layout">
        {/* Left Column */}
        <div className="dashboard-left">
          {/* Application Details */}
          <div className="application-details">
            <h2>Application Details</h2>
            <div className="app-info-grid">
              <div className="info-item">
                <span className="info-label">Application Name:</span>
                <span className="info-value">{APPLICATION_DETAILS.name}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Application Status:</span>
                <span className="info-value status-running">{APPLICATION_DETAILS.status}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Server Status:</span>
                <span className="info-value status-online">{APPLICATION_DETAILS.serverStatus}</span>
              </div>
            </div>
            <button className="process-explorer-btn">
              Real-Time Process Explorer →
            </button>
          </div>

          {/* Component Statistics Table */}
          <div className="component-statistics">
            <h2>Component Statistics</h2>
            <div className="stats-table-container">
              <table className="stats-table">
                <thead>
                  <tr>
                    <th>Component Name</th>
                    <th>Component Type</th>
                    <th>Component Status</th>
                  </tr>
                </thead>
                <tbody>
                  {COMPONENT_STATISTICS.map((component, index) => (
                    <tr key={index}>
                      <td>{component.name}</td>
                      <td>{component.type}</td>
                      <td>
                        <span className="status-indicator up">
                          {component.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="dashboard-right">
          {/* Multi Component Statistics - Gauge Charts */}
          <div className="multi-component-stats">
            <h2>Multi Component Statistics - Statistic Data</h2>
            <div className="gauges-grid">
              {GAUGE_DATA.map((gauge, index) => (
                <GaugeChart key={index} data={gauge} />
              ))}
            </div>
          </div>

          {/* MIN/MAX Average Statistic Data */}
          <div className="min-max-stats">
            <div className="chart-header">
              <h2>MIN/MAX Average Statistic Data</h2>
              <div className="time-range-buttons">
                <button 
                  className={`time-btn ${selectedTimeRange === '1h' ? 'active' : ''}`}
                  onClick={() => setSelectedTimeRange('1h')}
                >
                  1h
                </button>
                <button 
                  className={`time-btn ${selectedTimeRange === '12h' ? 'active' : ''}`}
                  onClick={() => setSelectedTimeRange('12h')}
                >
                  12h
                </button>
                <button 
                  className={`time-btn ${selectedTimeRange === '24h' ? 'active' : ''}`}
                  onClick={() => setSelectedTimeRange('24h')}
                >
                  24h
                </button>
              </div>
            </div>
            
            <div className="chart-container">
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={RUN_QUEUE_DATA}>
                  <defs>
                    <linearGradient id="criticalGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#ef4444" stopOpacity={0.1}/>
                    </linearGradient>
                    <linearGradient id="warningGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.1}/>
                    </linearGradient>
                    <linearGradient id="dataGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1}/>
                    </linearGradient>
                  </defs>
                  <XAxis 
                    dataKey="time" 
                    stroke="#6b7280"
                    tick={{ fontSize: 12 }}
                  />
                  <YAxis 
                    stroke="#6b7280"
                    tick={{ fontSize: 12 }}
                    label={{ value: 'Statistic Data - Statistic', angle: -90, position: 'insideLeft' }}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: '1px solid #e5e7eb',
                      borderRadius: '6px'
                    }}
                  />
                  
                  {/* Critical Threshold Area */}
                  <Area
                    type="monotone"
                    dataKey="critical"
                    stroke="#ef4444"
                    strokeWidth={0}
                    fill="url(#criticalGradient)"
                  />
                  
                  {/* Warning Threshold Area */}
                  <Area
                    type="monotone"
                    dataKey="warning"
                    stroke="#f59e0b"
                    strokeWidth={0}
                    fill="url(#warningGradient)"
                  />
                  
                  {/* Actual Data Line */}
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#3b82f6" 
                    strokeWidth={3}
                    dot={{ fill: '#3b82f6', r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                  
                  {/* Threshold Lines */}
                  <ReferenceLine 
                    y={4} 
                    stroke="#ef4444" 
                    strokeDasharray="5 5" 
                    strokeWidth={2}
                    label={{ value: "Critical Threshold", position: "topRight" }}
                  />
                  <ReferenceLine 
                    y={2.5} 
                    stroke="#f59e0b" 
                    strokeDasharray="5 5" 
                    strokeWidth={2}
                    label={{ value: "Warning Threshold", position: "topRight" }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            
            <div className="chart-legend">
              <h3>Run queue - Statistic</h3>
              <div className="legend-items">
                <div className="legend-item">
                  <div className="legend-color critical"></div>
                  <span>Critical Threshold</span>
                </div>
                <div className="legend-item">
                  <div className="legend-color warning"></div>
                  <span>Warning Threshold</span>
                </div>
                <div className="legend-item">
                  <div className="legend-color data"></div>
                  <span>Statistic Data</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
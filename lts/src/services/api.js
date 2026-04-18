export const MOCK_SERVERS = [
  { 
    id: 1, 
    name: "prod-web-01", 
    ip: "192.168.1.10", 
    status: "Online", 
    cpu: 45, 
    ram: 62, 
    uptime: "12d 4h", 
    os: "Ubuntu 22.04",
    disk: 78,
    network: 125,
    processes: 142,
    lastBackup: "2 hours ago",
    alerts: 0,
    location: "US-East-1",
    type: "Web Server"
  },
  { 
    id: 2, 
    name: "db-master-01", 
    ip: "192.168.1.12", 
    status: "Online", 
    cpu: 12, 
    ram: 88, 
    uptime: "45d 1h", 
    os: "Debian 11",
    disk: 92,
    network: 89,
    processes: 67,
    lastBackup: "1 hour ago",
    alerts: 1,
    location: "US-West-2",
    type: "Database"
  },
  { 
    id: 3, 
    name: "backup-node", 
    ip: "192.168.1.50", 
    status: "Offline", 
    cpu: 0, 
    ram: 0, 
    uptime: "0d", 
    os: "CentOS 7",
    disk: 45,
    network: 0,
    processes: 0,
    lastBackup: "3 days ago",
    alerts: 3,
    location: "EU-Central",
    type: "Backup"
  },
  { 
    id: 4, 
    name: "staging-api", 
    ip: "192.168.1.20", 
    status: "Online", 
    cpu: 22, 
    ram: 35, 
    uptime: "3d 12h", 
    os: "Ubuntu 22.04",
    disk: 56,
    network: 67,
    processes: 89,
    lastBackup: "6 hours ago",
    alerts: 0,
    location: "US-East-1",
    type: "API Server"
  },
  { 
    id: 5, 
    name: "cache-redis-01", 
    ip: "192.168.1.30", 
    status: "Online", 
    cpu: 8, 
    ram: 45, 
    uptime: "28d 15h", 
    os: "Alpine Linux",
    disk: 23,
    network: 234,
    processes: 12,
    lastBackup: "4 hours ago",
    alerts: 0,
    location: "US-West-2",
    type: "Cache"
  },
  { 
    id: 6, 
    name: "monitoring-01", 
    ip: "192.168.1.40", 
    status: "Warning", 
    cpu: 78, 
    ram: 91, 
    uptime: "67d 8h", 
    os: "Ubuntu 20.04",
    disk: 84,
    network: 156,
    processes: 234,
    lastBackup: "30 minutes ago",
    alerts: 2,
    location: "EU-West-1",
    type: "Monitoring"
  }
];

export const CHART_DATA = [
  { name: '00:00', cpu: 40, ram: 24, network: 120, disk: 45 },
  { name: '04:00', cpu: 30, ram: 13, network: 89, disk: 46 },
  { name: '08:00', cpu: 20, ram: 98, network: 156, disk: 47 },
  { name: '12:00', cpu: 27, ram: 39, network: 134, disk: 48 },
  { name: '16:00', cpu: 18, ram: 48, network: 145, disk: 49 },
  { name: '20:00', cpu: 35, ram: 62, network: 167, disk: 50 },
  { name: '23:00', cpu: 42, ram: 71, network: 123, disk: 51 },
];

export const SYSTEM_ALERTS = [
  { id: 1, type: "warning", message: "High CPU usage on monitoring-01", server: "monitoring-01", time: "5 min ago" },
  { id: 2, type: "error", message: "backup-node is offline", server: "backup-node", time: "2 hours ago" },
  { id: 3, type: "info", message: "Scheduled maintenance completed", server: "prod-web-01", time: "1 day ago" },
];

export const PERFORMANCE_METRICS = {
  totalServers: 6,
  onlineServers: 5,
  offlineServers: 1,
  warningServers: 1,
  avgCpuUsage: 34.2,
  avgRamUsage: 53.5,
  totalAlerts: 3,
  systemHealth: 87
};

export const APPLICATION_DETAILS = {
  name: "Linux Tracking System",
  status: "Running",
  serverStatus: "Online"
};

export const COMPONENT_STATISTICS = [
  { name: "CPU User Time", type: "CPU", status: "Up", value: 15.5 },
  { name: "CPU System Time", type: "CPU", status: "Up", value: 8.2 },
  { name: "Wait IO", type: "I/O", status: "Up", value: 3.1 },
  { name: "CPU Idle Time", type: "CPU", status: "Up", value: 73.2 },
  { name: "Run queue", type: "Process", status: "Up", value: 2.4 },
  { name: "Interrupts per second", type: "System", status: "Up", value: 1250 },
  { name: "Context switches per second", type: "System", status: "Up", value: 3420 },
  { name: "Total amount of interrupts after boot", type: "System", status: "Up", value: 4567890 },
  { name: "Total amount of CPU context switches after boot", type: "System", status: "Up", value: 12345678 }
];

export const GAUGE_DATA = [
  { name: "CPU User Time", value: 15.5, unit: "%", max: 100, color: "#3b82f6" },
  { name: "CPU System Time", value: 8.2, unit: "%", max: 100, color: "#22c55e" },
  { name: "Wait IO", value: 3.1, unit: "%", max: 100, color: "#f59e0b" },
  { name: "CPU Idle Time", value: 73.2, unit: "%", max: 100, color: "#8b5cf6" }
];

export const RUN_QUEUE_DATA = [
  { time: "5:00 AM", value: 1.2, critical: 4, warning: 2.5 },
  { time: "6:00 AM", value: 1.8, critical: 4, warning: 2.5 },
  { time: "7:00 AM", value: 2.1, critical: 4, warning: 2.5 },
  { time: "8:00 AM", value: 3.2, critical: 4, warning: 2.5 },
  { time: "9:00 AM", value: 3.8, critical: 4, warning: 2.5 },
  { time: "10:00 AM", value: 2.9, critical: 4, warning: 2.5 },
  { time: "11:00 AM", value: 2.4, critical: 4, warning: 2.5 },
  { time: "12:00 PM", value: 1.9, critical: 4, warning: 2.5 }
];
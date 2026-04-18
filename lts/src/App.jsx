import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout/MainLayout';
import Dashboard from './pages/Dashboard/Dashboard';
import Servers from './pages/Servers/Servers';
import ServerDetails from './pages/ServerDetails/ServerDetails';
import Performance from './pages/Performance/Performance';
import DatabasePage from './pages/Servers/Servers';
import Logs from './pages/Logs/Logs';

function App() {
  console.log('App component rendering');
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="servers" element={<Servers />} />
          <Route path="servers/:id" element={<ServerDetails />} />
          <Route path="performance" element={<Performance />} />
          <Route path="database" element={<DatabasePage />} />
          <Route path="logs" element={<Logs />} />
        </Route>
      </Routes>
    </Router>
  );
}
export default App;
import { Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { OverviewPage } from './pages/OverviewPage';
import { CallLogsPage } from './pages/CallLogsPage';
import { LeadsPage } from './pages/LeadsPage';
import { AppointmentsPage } from './pages/AppointmentsPage';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<OverviewPage />} />
        <Route path="/calls" element={<CallLogsPage />} />
        <Route path="/leads" element={<LeadsPage />} />
        <Route path="/appointments" element={<AppointmentsPage />} />
      </Routes>
    </Layout>
  );
}

export default App;

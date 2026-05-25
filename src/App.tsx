import React from 'react';
import { Layout } from './components/Layout';
import { KPICards } from './components/KPICards';
import { DashboardCharts } from './components/DashboardCharts';
import { DataTables } from './components/DataTables';
import { Filters } from './components/Filters';

function App() {
  return (
    <Layout>
      <div className="header">
        <h1>CEO Dashboard</h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-md)' }}>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '0.875rem', fontWeight: 600 }}>Alice Executive</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>admin@alyson.ai</div>
          </div>
          <img 
            src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alice" 
            alt="User" 
            style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--bg-surface-elevated)' }}
          />
        </div>
      </div>
      
      <Filters />
      <KPICards />
      <DashboardCharts />
      <DataTables />
      
    </Layout>
  );
}

export default App;

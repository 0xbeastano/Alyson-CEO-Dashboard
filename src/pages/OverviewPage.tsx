import React from 'react';
import { KPICards } from '../components/KPICards';
import { DashboardCharts } from '../components/DashboardCharts';
import { DataTables } from '../components/DataTables';
import { Filters } from '../components/Filters';
import { useDashboardData } from '../hooks/useDashboardData';
import { Loader2 } from 'lucide-react';

export const OverviewPage: React.FC = () => {
  const { data, isLoading, isError, error } = useDashboardData();

  return (
    <>
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
      
      {isLoading && (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 'var(--spacing-xl)', minHeight: '400px' }}>
          <Loader2 size={40} color="var(--text-primary)" style={{ animation: 'spin 1s linear infinite' }} />
          <p style={{ marginTop: 'var(--spacing-md)', color: 'var(--text-secondary)' }}>Loading dashboard data...</p>
        </div>
      )}

      {isError && (
        <div className="card" style={{ border: '1px solid var(--danger-color)', backgroundColor: 'rgba(239, 68, 68, 0.05)' }}>
          <h3 style={{ color: 'var(--danger-color)', marginBottom: '0.5rem' }}>Error loading data</h3>
          <p style={{ color: 'var(--text-secondary)' }}>{(error as Error)?.message || 'Failed to connect to Supabase.'}</p>
        </div>
      )}

      {!isLoading && !isError && data && (
        <>
          <KPICards data={data} />
          <DashboardCharts data={data} />
          <DataTables data={data} />
        </>
      )}
    </>
  );
};

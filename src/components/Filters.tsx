import React from 'react';
import { Filter, RefreshCcw } from 'lucide-react';
import { useFilterStore } from '../lib/store';
import { useQueryClient } from '@tanstack/react-query';

export const Filters: React.FC = () => {
  const { dateRange, outcome, source, setDateRange, setOutcome, setSource } = useFilterStore();
  const queryClient = useQueryClient();

  const handleRefresh = () => {
    queryClient.invalidateQueries({ queryKey: ['dashboardData'] });
  };

  return (
    <div className="filter-bar">
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)', marginRight: 'auto' }}>
        <Filter size={18} color="var(--text-secondary)" />
        <span style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', fontWeight: 500 }}>Filters:</span>
      </div>
      
      <select 
        className="filter-select"
        value={dateRange}
        onChange={(e) => setDateRange(e.target.value as any)}
      >
        <option value="7d">Last 7 Days</option>
        <option value="30d">Last 30 Days</option>
        <option value="month">This Month</option>
        <option value="all">All Time</option>
      </select>

      <select 
        className="filter-select"
        value={outcome}
        onChange={(e) => setOutcome(e.target.value as any)}
      >
        <option value="all">All Outcomes</option>
        <option value="completed">Completed</option>
        <option value="voicemail">Voicemail</option>
        <option value="failed">Failed</option>
        <option value="not_interested">Not Interested</option>
      </select>
      
      <select 
        className="filter-select"
        value={source}
        onChange={(e) => setSource(e.target.value as any)}
      >
        <option value="all">All Sources</option>
        <option value="inbound">Inbound</option>
        <option value="outbound">Outbound</option>
      </select>

      <button 
        onClick={handleRefresh}
        style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '0.5rem', 
          padding: 'var(--spacing-sm) var(--spacing-md)', 
          background: 'var(--bg-surface-elevated)', 
          border: '1px solid var(--border-color)', 
          color: 'var(--text-primary)', 
          borderRadius: 'var(--radius-md)',
          cursor: 'pointer',
          fontSize: '0.875rem',
          transition: 'background-color var(--transition-fast)'
        }}
        onMouseOver={e => e.currentTarget.style.backgroundColor = 'var(--border-highlight)'}
        onMouseOut={e => e.currentTarget.style.backgroundColor = 'var(--bg-surface-elevated)'}
      >
        <RefreshCcw size={16} />
        Refresh
      </button>
    </div>
  );
};

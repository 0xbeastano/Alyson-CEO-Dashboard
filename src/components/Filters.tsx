import React from 'react';
import { Filter, RefreshCcw } from 'lucide-react';

export const Filters: React.FC = () => {
  return (
    <div className="filter-bar">
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)', marginRight: 'auto' }}>
        <Filter size={18} color="var(--text-secondary)" />
        <span style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', fontWeight: 500 }}>Filters:</span>
      </div>
      
      <select className="filter-select">
        <option>Last 7 Days</option>
        <option>Last 30 Days</option>
        <option>This Month</option>
        <option>All Time</option>
      </select>

      <select className="filter-select">
        <option>All Outcomes</option>
        <option>Completed</option>
        <option>Voicemail</option>
        <option>Failed</option>
      </select>
      
      <select className="filter-select">
        <option>All Sources</option>
        <option>Inbound</option>
        <option>Outbound</option>
      </select>

      <button style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: '0.5rem', 
        padding: 'var(--spacing-sm) var(--spacing-md)', 
        background: 'var(--bg-surface-elevated)', 
        border: '1px solid var(--border-color)', 
        color: 'var(--text-primary)', 
        borderRadius: 'var(--radius-md)',
        cursor: 'pointer',
        fontSize: '0.875rem'
      }}>
        <RefreshCcw size={16} />
        Refresh
      </button>
    </div>
  );
};

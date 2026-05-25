import React from 'react';
import { format } from 'date-fns';
import type { CallLog, Lead, Appointment } from '../types';

interface DataTablesProps {
  data: {
    callLogs: CallLog[];
    leads: Lead[];
    appointments: Appointment[];
  }
}

export const DataTables: React.FC<DataTablesProps> = ({ data }) => {
  const { callLogs, leads, appointments } = data;

  const recentCalls = callLogs.slice(0, 5);
  const recentLeads = leads.slice(0, 5);

  return (
    <div className="grid grid-cols-2" style={{ marginBottom: 'var(--spacing-xl)' }}>
      
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-md)' }}>
          <h3 style={{ fontSize: '1.125rem', fontWeight: 600 }}>Recent Calls</h3>
          <button style={{ background: 'transparent', border: 'none', color: 'var(--primary-color)', cursor: 'pointer', fontSize: '0.875rem' }}>View All</button>
        </div>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Phone Number</th>
                <th>Duration</th>
                <th>Outcome</th>
              </tr>
            </thead>
            <tbody>
              {recentCalls.map(call => (
                <tr key={call.id}>
                  <td>{format(new Date(call.created_at), 'MMM dd, HH:mm')}</td>
                  <td style={{ color: 'var(--text-primary)' }}>{call.phone_number}</td>
                  <td>{Math.floor(call.duration / 60)}m {call.duration % 60}s</td>
                  <td>
                    <OutcomeBadge outcome={call.outcome} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-md)' }}>
          <h3 style={{ fontSize: '1.125rem', fontWeight: 600 }}>Recent Leads & Appointments</h3>
          <button style={{ background: 'transparent', border: 'none', color: 'var(--primary-color)', cursor: 'pointer', fontSize: '0.875rem' }}>View All</button>
        </div>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Name / Lead</th>
                <th>Date</th>
                <th>Score</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {recentLeads.map(lead => (
                <tr key={lead.id}>
                  <td style={{ color: 'var(--text-primary)', fontWeight: 500 }}>{lead.name}</td>
                  <td>{format(new Date(lead.created_at), 'MMM dd')}</td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <div style={{ width: '100%', height: '4px', background: 'var(--bg-base)', borderRadius: '2px', overflow: 'hidden' }}>
                        <div style={{ height: '100%', width: `${lead.score}%`, background: lead.score > 70 ? 'var(--success-color)' : lead.score > 40 ? 'var(--warning-color)' : 'var(--danger-color)' }} />
                      </div>
                      <span style={{ fontSize: '0.75rem' }}>{lead.score}</span>
                    </div>
                  </td>
                  <td><StatusBadge status={lead.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

const OutcomeBadge = ({ outcome }: { outcome: string }) => {
  switch (outcome) {
    case 'completed': return <span className="badge badge-success">Completed</span>;
    case 'voicemail': return <span className="badge badge-warning">Voicemail</span>;
    case 'failed': return <span className="badge badge-danger">Failed</span>;
    case 'not_interested': return <span className="badge badge-neutral">Not Interested</span>;
    default: return <span className="badge badge-neutral">{outcome}</span>;
  }
};

const StatusBadge = ({ status }: { status: string }) => {
  switch (status) {
    case 'qualified': return <span className="badge badge-success">Qualified</span>;
    case 'contacted': return <span className="badge badge-primary">Contacted</span>;
    case 'disqualified': return <span className="badge badge-danger">Disqualified</span>;
    case 'new': return <span className="badge badge-neutral">New</span>;
    default: return <span className="badge badge-neutral">{status}</span>;
  }
};

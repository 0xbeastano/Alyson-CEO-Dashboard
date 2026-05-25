import React from 'react';
import { format } from 'date-fns';
import type { CallLog, Lead, Appointment, Followup } from '../types';

interface DataTablesProps {
  data: {
    callLogs: CallLog[];
    leads: Lead[];
    appointments: Appointment[];
    followups: Followup[];
  }
}

export const DataTables: React.FC<DataTablesProps> = ({ data }) => {
  const { callLogs, leads, appointments, followups } = data;

  const recentCalls = (callLogs || []).slice(0, 5);
  const recentLeads = (leads || []).slice(0, 5);
  const upcomingAppointments = (appointments || []).slice(0, 5);
  const openFollowups = (followups || []).filter(f => f.status === 'pending').slice(0, 5);

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
              {recentCalls.map((call, i) => (
                <tr key={call?.id || `call-${i}`}>
                  <td>{call?.created_at ? format(new Date(call.created_at), 'MMM dd, HH:mm') : 'N/A'}</td>
                  <td style={{ color: 'var(--text-primary)' }}>{call?.customer_phone || 'N/A'}</td>
                  <td>{Math.floor((call?.call_duration || 0) / 60)}m {(call?.call_duration || 0) % 60}s</td>
                  <td>
                    <OutcomeBadge outcome={call?.call_outcome || 'unknown'} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-md)' }}>
          <h3 style={{ fontSize: '1.125rem', fontWeight: 600 }}>Recent Leads</h3>
          <button style={{ background: 'transparent', border: 'none', color: 'var(--primary-color)', cursor: 'pointer', fontSize: '0.875rem' }}>View All</button>
        </div>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Date</th>
                <th>Qualified</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {recentLeads.map((lead, i) => (
                <tr key={lead?.id || `lead-${i}`}>
                  <td style={{ color: 'var(--text-primary)', fontWeight: 500 }}>{lead?.customer_name || 'Unknown'}</td>
                  <td>{lead?.created_at ? format(new Date(lead.created_at), 'MMM dd') : 'N/A'}</td>
                  <td>
                    {lead?.qualified ? (
                      <span className="badge badge-success">Yes</span>
                    ) : (
                      <span className="badge badge-neutral">No</span>
                    )}
                  </td>
                  <td><StatusBadge status={lead?.status || 'new'} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-md)' }}>
          <h3 style={{ fontSize: '1.125rem', fontWeight: 600 }}>Upcoming Appointments</h3>
          <button style={{ background: 'transparent', border: 'none', color: 'var(--primary-color)', cursor: 'pointer', fontSize: '0.875rem' }}>View All</button>
        </div>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Client Name</th>
                <th>Date & Time</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {upcomingAppointments.map((apt, i) => (
                <tr key={apt?.id || `apt-${i}`}>
                  <td style={{ color: 'var(--text-primary)', fontWeight: 500 }}>{apt?.customer_name || 'Unknown'}</td>
                  <td>{apt?.appointment_datetime ? format(new Date(apt.appointment_datetime), 'MMM dd, HH:mm') : 'N/A'}</td>
                  <td><span className="badge badge-primary">{apt?.status || 'upcoming'}</span></td>
                </tr>
              ))}
              {upcomingAppointments.length === 0 && (
                <tr>
                  <td colSpan={3} style={{ textAlign: 'center', color: 'var(--text-secondary)', padding: '2rem' }}>No upcoming appointments</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-md)' }}>
          <h3 style={{ fontSize: '1.125rem', fontWeight: 600 }}>Open Follow-ups</h3>
          <button style={{ background: 'transparent', border: 'none', color: 'var(--primary-color)', cursor: 'pointer', fontSize: '0.875rem' }}>View All</button>
        </div>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Client Name</th>
                <th>Type</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {openFollowups.map((fup, i) => (
                <tr key={fup?.id || `fup-${i}`}>
                  <td style={{ color: 'var(--text-primary)', fontWeight: 500 }}>{fup?.customer_name || 'Unknown'}</td>
                  <td style={{ textTransform: 'capitalize' }}>{(fup?.followup_type || 'unknown').replace('_', ' ')}</td>
                  <td><span className="badge badge-warning">{fup?.status || 'pending'}</span></td>
                </tr>
              ))}
              {openFollowups.length === 0 && (
                <tr>
                  <td colSpan={3} style={{ textAlign: 'center', color: 'var(--text-secondary)', padding: '2rem' }}>No pending follow-ups</td>
                </tr>
              )}
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

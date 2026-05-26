import React from 'react';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import type { DashboardRecentCall, Lead, Appointment, DashboardOpenFollowup } from '../types';

interface DataTablesProps {
  data: {
    recentCalls: DashboardRecentCall[];
    leads: Lead[];
    appointments: Appointment[];
    openFollowups: DashboardOpenFollowup[];
  }
}

export const DataTables: React.FC<DataTablesProps> = ({ data }) => {
  const { recentCalls, leads, appointments, openFollowups } = data;

  const recentLeads = [...(leads || [])].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()).slice(0, 5);
  const upcomingAppointments = [...(appointments || [])]
    .filter(a => new Date(a.appointment_datetime) > new Date())
    .sort((a, b) => new Date(a.appointment_datetime).getTime() - new Date(b.appointment_datetime).getTime())
    .slice(0, 5);

  return (
    <div className="grid grid-cols-2" style={{ marginBottom: 'var(--spacing-xl)' }}>
      
      <div className="card stagger-6">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-lg)' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 500, color: 'var(--text-secondary)' }}>Recent Calls</h3>
          <Link to="/calls" style={{ textDecoration: 'none', background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '0.8125rem', transition: 'color var(--transition-fast)' }} onMouseOver={e => e.currentTarget.style.color = 'var(--text-primary)'} onMouseOut={e => e.currentTarget.style.color = 'var(--text-muted)'}>View All</Link>
        </div>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Phone Number</th>
                <th>Outcome</th>
              </tr>
            </thead>
            <tbody>
              {recentCalls.map((call, i) => (
                <tr key={call?.id || `call-${i}`}>
                  <td style={{ color: 'var(--text-secondary)' }}>{call?.created_at ? format(new Date(call.created_at), 'MMM dd, HH:mm') : 'N/A'}</td>
                  <td style={{ color: 'var(--text-primary)', fontWeight: 500 }}>{call?.customer_phone || 'N/A'}</td>
                  <td>
                    <OutcomeBadge outcome={call?.call_outcome || 'unknown'} />
                  </td>
                </tr>
              ))}
              {recentCalls.length === 0 && (
                <tr>
                  <td colSpan={3} style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '2.5rem' }}>No recent calls</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="card stagger-7">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-lg)' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 500, color: 'var(--text-secondary)' }}>Recent Leads</h3>
          <Link to="/leads" style={{ textDecoration: 'none', background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '0.8125rem', transition: 'color var(--transition-fast)' }} onMouseOver={e => e.currentTarget.style.color = 'var(--text-primary)'} onMouseOut={e => e.currentTarget.style.color = 'var(--text-muted)'}>View All</Link>
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
                  <td style={{ color: 'var(--text-secondary)' }}>{lead?.created_at ? format(new Date(lead.created_at), 'MMM dd') : 'N/A'}</td>
                  <td>
                    {lead?.qualified === true ? (
                      <span className="badge badge-success">Yes</span>
                    ) : (
                      <span className="badge badge-neutral">No</span>
                    )}
                  </td>
                  <td><StatusBadge status={lead?.status || 'new'} /></td>
                </tr>
              ))}
              {recentLeads.length === 0 && (
                <tr>
                  <td colSpan={4} style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '2.5rem' }}>No recent leads</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="card stagger-1">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-lg)' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 500, color: 'var(--text-secondary)' }}>Upcoming Appointments</h3>
          <Link to="/appointments" style={{ textDecoration: 'none', background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '0.8125rem', transition: 'color var(--transition-fast)' }} onMouseOver={e => e.currentTarget.style.color = 'var(--text-primary)'} onMouseOut={e => e.currentTarget.style.color = 'var(--text-muted)'}>View All</Link>
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
                  <td style={{ color: 'var(--text-secondary)' }}>{apt?.appointment_datetime ? format(new Date(apt.appointment_datetime), 'MMM dd, HH:mm') : 'N/A'}</td>
                  <td><span className="badge badge-primary">{apt?.status || 'upcoming'}</span></td>
                </tr>
              ))}
              {upcomingAppointments.length === 0 && (
                <tr>
                  <td colSpan={3} style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '2.5rem' }}>No upcoming appointments</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="card stagger-2">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-lg)' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 500, color: 'var(--text-secondary)' }}>Open Follow-ups</h3>
          <Link to="/" style={{ textDecoration: 'none', background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '0.8125rem', transition: 'color var(--transition-fast)' }} onMouseOver={e => e.currentTarget.style.color = 'var(--text-primary)'} onMouseOut={e => e.currentTarget.style.color = 'var(--text-muted)'}>View All</Link>
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
                  <td style={{ textTransform: 'capitalize', color: 'var(--text-secondary)' }}>{(fup?.followup_type || 'unknown').replace('_', ' ')}</td>
                  <td><span className="badge badge-warning">{fup?.status || 'pending'}</span></td>
                </tr>
              ))}
              {openFollowups.length === 0 && (
                <tr>
                  <td colSpan={3} style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '2.5rem' }}>No pending follow-ups</td>
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

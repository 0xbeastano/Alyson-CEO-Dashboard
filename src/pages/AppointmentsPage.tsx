import React, { useState } from 'react';
import { useAppointments } from '../hooks/useAppointments';
import { format } from 'date-fns';
import { Loader2, ChevronLeft, ChevronRight, Calendar, Download, Filter, Plus, Search } from 'lucide-react';

export const AppointmentsPage: React.FC = () => {
  const [page, setPage] = useState(1);
  const { data, isLoading, isError } = useAppointments(page);

  const totalAppointments = data?.count || 0;
  const upcomingCount = data?.data.filter(a => a.status === 'upcoming').length || 0;

  return (
    <div style={{ animation: 'fadeUpIn 0.4s ease-out forwards' }}>
      {/* Premium Header */}
      <div className="header" style={{ marginBottom: 'var(--spacing-xl)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h1 style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '1.5rem', fontWeight: 600 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '40px', height: '40px', borderRadius: '10px', backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-color)' }}>
              <Calendar size={20} color="var(--text-primary)" />
            </div>
            Appointments
          </h1>
          <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem', fontSize: '0.875rem' }}>Upcoming schedule and completed meetings.</p>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button className="premium-btn-secondary">
            <Filter size={16} /> Filter
          </button>
          <button className="premium-btn-secondary">
            <Download size={16} /> Export
          </button>
          <button className="premium-btn-primary">
            <Plus size={16} /> New Booking
          </button>
        </div>
      </div>

      {/* Mini Stats Row */}
      <div className="grid grid-cols-3" style={{ marginBottom: 'var(--spacing-xl)', gap: 'var(--spacing-md)' }}>
        <div className="card" style={{ padding: '1.25rem' }}>
          <div style={{ color: 'var(--text-secondary)', fontSize: '0.8125rem', fontWeight: 500, marginBottom: '0.5rem' }}>Total Bookings</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 600, color: 'var(--text-primary)' }}>{totalAppointments}</div>
        </div>
        <div className="card" style={{ padding: '1.25rem' }}>
          <div style={{ color: 'var(--text-secondary)', fontSize: '0.8125rem', fontWeight: 500, marginBottom: '0.5rem' }}>Upcoming (This Page)</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 600, color: 'var(--info-color)' }}>{upcomingCount}</div>
        </div>
        <div className="card" style={{ padding: '1.25rem' }}>
          <div style={{ color: 'var(--text-secondary)', fontSize: '0.8125rem', fontWeight: 500, marginBottom: '0.5rem' }}>Completed</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 600, color: 'var(--success-color)' }}>
            {data?.data.filter(a => a.status === 'completed').length || 0}
          </div>
        </div>
      </div>

      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        {/* Table Toolbar */}
        <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.01)' }}>
          <div style={{ position: 'relative', width: '300px' }}>
            <Search size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
            <input type="text" placeholder="Search appointments..." style={{ width: '100%', padding: '0.5rem 1rem 0.5rem 2.25rem', borderRadius: '6px', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-surface)', color: 'var(--text-primary)', fontSize: '0.875rem', outline: 'none' }} />
          </div>
        </div>

        {isLoading ? (
          <div style={{ display: 'flex', justifyContent: 'center', padding: '6rem' }}>
            <Loader2 size={32} color="var(--text-primary)" style={{ animation: 'spin 1s linear infinite' }} />
          </div>
        ) : isError ? (
          <div style={{ padding: '4rem', textAlign: 'center', color: 'var(--danger-color)' }}>
            Failed to load appointments. Please check your connection.
          </div>
        ) : (
          <>
            <div className="table-container" style={{ margin: 0 }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ backgroundColor: 'transparent', borderBottom: '1px solid var(--border-color)' }}>
                    <th style={{ padding: '1rem 1.5rem', color: 'var(--text-muted)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Date & Time</th>
                    <th style={{ padding: '1rem 1.5rem', color: 'var(--text-muted)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Client</th>
                    <th style={{ padding: '1rem 1.5rem', color: 'var(--text-muted)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Contact</th>
                    <th style={{ padding: '1rem 1.5rem', color: 'var(--text-muted)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Status</th>
                    <th style={{ padding: '1rem 1.5rem', color: 'var(--text-muted)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Services Discussed</th>
                  </tr>
                </thead>
                <tbody>
                  {data?.data.map((apt) => (
                    <tr key={apt.id} style={{ transition: 'background-color 0.2s ease', cursor: 'pointer', borderBottom: '1px solid rgba(255,255,255,0.02)' }} onMouseOver={e => e.currentTarget.style.backgroundColor = 'var(--bg-surface-elevated)'} onMouseOut={e => e.currentTarget.style.backgroundColor = 'transparent'}>
                      <td style={{ padding: '1rem 1.5rem', color: 'var(--text-primary)', whiteSpace: 'nowrap', fontWeight: 500, fontSize: '0.875rem' }}>
                        {apt.appointment_datetime ? format(new Date(apt.appointment_datetime), 'MMM dd, yyyy HH:mm') : 'N/A'}
                      </td>
                      <td style={{ padding: '1rem 1.5rem' }}>
                        <div style={{ color: 'var(--text-primary)', fontWeight: 500, fontSize: '0.875rem' }}>{apt.customer_name || 'Unknown User'}</div>
                      </td>
                      <td style={{ padding: '1rem 1.5rem', color: 'var(--text-secondary)', fontSize: '0.875rem' }}>{apt.customer_phone || 'N/A'}</td>
                      <td style={{ padding: '1rem 1.5rem' }}>
                        <span style={{ 
                          padding: '0.25rem 0.6rem', 
                          borderRadius: '4px', 
                          fontSize: '0.75rem', 
                          fontWeight: 500,
                          backgroundColor: apt.status === 'upcoming' ? 'rgba(59, 130, 246, 0.1)' : 
                                           apt.status === 'completed' ? 'rgba(16, 185, 129, 0.1)' : 
                                           'var(--bg-surface-elevated)',
                          color: apt.status === 'upcoming' ? 'var(--info-color)' : 
                                 apt.status === 'completed' ? 'var(--success-color)' : 
                                 'var(--text-secondary)',
                          border: `1px solid ${
                            apt.status === 'upcoming' ? 'rgba(59, 130, 246, 0.2)' : 
                            apt.status === 'completed' ? 'rgba(16, 185, 129, 0.2)' : 
                            'var(--border-color)'}`
                        }}>
                          {(apt.status || 'upcoming').toUpperCase()}
                        </span>
                      </td>
                      <td style={{ padding: '1rem 1.5rem', color: 'var(--text-secondary)', maxWidth: '300px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontSize: '0.875rem' }}>
                        {apt.services_discussed || '-'}
                      </td>
                    </tr>
                  ))}
                  {(!data?.data || data.data.length === 0) && (
                    <tr>
                      <td colSpan={5} style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-muted)' }}>
                        <Calendar size={32} style={{ margin: '0 auto 1rem auto', opacity: 0.5 }} />
                        <div style={{ fontWeight: 500, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>No Appointments Found</div>
                        <div style={{ fontSize: '0.875rem' }}>You have no scheduled appointments.</div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination Controls */}
            {data && data.totalPages > 1 && (
              <div style={{ padding: '1.25rem 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.01)', borderTop: '1px solid var(--border-color)' }}>
                <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                  Showing page <span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>{page}</span> of <span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>{data.totalPages}</span> ({data.count} total records)
                </div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button 
                    onClick={() => setPage(p => Math.max(1, p - 1))}
                    disabled={page === 1}
                    className="premium-btn-pagination"
                  >
                    <ChevronLeft size={16} /> Prev
                  </button>
                  <button 
                    onClick={() => setPage(p => Math.min(data.totalPages, p + 1))}
                    disabled={page === data.totalPages}
                    className="premium-btn-pagination"
                  >
                    Next <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

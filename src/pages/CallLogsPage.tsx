import React, { useState } from 'react';
import { useCallLogs } from '../hooks/useCallLogs';
import { format } from 'date-fns';
import { Loader2, ChevronLeft, ChevronRight, Phone } from 'lucide-react';

export const CallLogsPage: React.FC = () => {
  const [page, setPage] = useState(1);
  const { data, isLoading, isError } = useCallLogs(page);

  return (
    <div style={{ animation: 'fadeUpIn 0.4s ease-out forwards' }}>
      <div className="header" style={{ marginBottom: 'var(--spacing-xl)' }}>
        <div>
          <h1 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Phone size={24} /> Call Logs</h1>
          <p style={{ color: 'var(--text-secondary)', marginTop: '0.25rem', fontSize: '0.875rem' }}>Complete history of all voice agent interactions.</p>
        </div>
      </div>

      <div className="card">
        {isLoading ? (
          <div style={{ display: 'flex', justifyContent: 'center', padding: '4rem' }}>
            <Loader2 size={32} color="var(--text-primary)" style={{ animation: 'spin 1s linear infinite' }} />
          </div>
        ) : isError ? (
          <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--danger-color)' }}>
            Failed to load call logs.
          </div>
        ) : (
          <>
            <div className="table-container">
              <table style={{ width: '100%' }}>
                <thead>
                  <tr>
                    <th>Date & Time</th>
                    <th>Customer Name</th>
                    <th>Phone Number</th>
                    <th>Duration</th>
                    <th>Outcome</th>
                    <th>Summary</th>
                  </tr>
                </thead>
                <tbody>
                  {data?.data.map((call) => (
                    <tr key={call.id} style={{ transition: 'background-color 0.2s ease', cursor: 'pointer' }} onMouseOver={e => e.currentTarget.style.backgroundColor = 'var(--bg-surface-elevated)'} onMouseOut={e => e.currentTarget.style.backgroundColor = 'transparent'}>
                      <td style={{ color: 'var(--text-secondary)', whiteSpace: 'nowrap' }}>
                        {call.created_at ? format(new Date(call.created_at), 'MMM dd, yyyy HH:mm') : 'N/A'}
                      </td>
                      <td style={{ color: 'var(--text-primary)', fontWeight: 500 }}>{call.customer_name || 'Unknown'}</td>
                      <td style={{ color: 'var(--text-secondary)' }}>{call.customer_phone || 'N/A'}</td>
                      <td style={{ color: 'var(--text-secondary)' }}>{call.call_duration ? `${call.call_duration}s` : 'N/A'}</td>
                      <td>
                        <span style={{ 
                          padding: '0.25rem 0.5rem', 
                          borderRadius: '1rem', 
                          fontSize: '0.75rem', 
                          fontWeight: 500,
                          backgroundColor: call.call_outcome === 'completed' ? 'rgba(16, 185, 129, 0.1)' : 'var(--bg-surface-elevated)',
                          color: call.call_outcome === 'completed' ? 'var(--success-color)' : 'var(--text-secondary)'
                        }}>
                          {(call.call_outcome || 'unknown').replace('_', ' ')}
                        </span>
                      </td>
                      <td style={{ color: 'var(--text-secondary)', maxWidth: '300px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {call.call_summary || '-'}
                      </td>
                    </tr>
                  ))}
                  {(!data?.data || data.data.length === 0) && (
                    <tr>
                      <td colSpan={6} style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
                        No call logs found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination Controls */}
            {data && data.totalPages > 1 && (
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'var(--spacing-xl)', paddingTop: 'var(--spacing-md)', borderTop: '1px solid var(--border-color)' }}>
                <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                  Showing page <span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>{page}</span> of <span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>{data.totalPages}</span> ({data.count} total records)
                </div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button 
                    onClick={() => setPage(p => Math.max(1, p - 1))}
                    disabled={page === 1}
                    style={{ 
                      display: 'flex', alignItems: 'center', gap: '0.25rem',
                      padding: '0.375rem 0.75rem', borderRadius: 'var(--radius-sm)',
                      background: 'var(--bg-surface-elevated)', border: '1px solid var(--border-color)',
                      color: page === 1 ? 'var(--text-muted)' : 'var(--text-primary)',
                      cursor: page === 1 ? 'not-allowed' : 'pointer'
                    }}
                  >
                    <ChevronLeft size={16} /> Previous
                  </button>
                  <button 
                    onClick={() => setPage(p => Math.min(data.totalPages, p + 1))}
                    disabled={page === data.totalPages}
                    style={{ 
                      display: 'flex', alignItems: 'center', gap: '0.25rem',
                      padding: '0.375rem 0.75rem', borderRadius: 'var(--radius-sm)',
                      background: 'var(--bg-surface-elevated)', border: '1px solid var(--border-color)',
                      color: page === data.totalPages ? 'var(--text-muted)' : 'var(--text-primary)',
                      cursor: page === data.totalPages ? 'not-allowed' : 'pointer'
                    }}
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

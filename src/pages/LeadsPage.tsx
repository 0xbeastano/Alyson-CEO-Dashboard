import React, { useState } from 'react';
import { useLeads } from '../hooks/useLeads';
import { format } from 'date-fns';
import { Loader2, ChevronLeft, ChevronRight, Users } from 'lucide-react';

export const LeadsPage: React.FC = () => {
  const [page, setPage] = useState(1);
  const { data, isLoading, isError } = useLeads(page);

  return (
    <div style={{ animation: 'fadeUpIn 0.4s ease-out forwards' }}>
      <div className="header" style={{ marginBottom: 'var(--spacing-xl)' }}>
        <div>
          <h1 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Users size={24} /> Leads Pipeline</h1>
          <p style={{ color: 'var(--text-secondary)', marginTop: '0.25rem', fontSize: '0.875rem' }}>CRM view for managing extracted and qualified leads.</p>
        </div>
      </div>

      <div className="card">
        {isLoading ? (
          <div style={{ display: 'flex', justifyContent: 'center', padding: '4rem' }}>
            <Loader2 size={32} color="var(--text-primary)" style={{ animation: 'spin 1s linear infinite' }} />
          </div>
        ) : isError ? (
          <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--danger-color)' }}>
            Failed to load leads.
          </div>
        ) : (
          <>
            <div className="table-container">
              <table style={{ width: '100%' }}>
                <thead>
                  <tr>
                    <th>Date Added</th>
                    <th>Lead Name</th>
                    <th>Phone Number</th>
                    <th>Qualified</th>
                    <th>Status</th>
                    <th>Services Interested</th>
                  </tr>
                </thead>
                <tbody>
                  {data?.data.map((lead) => (
                    <tr key={lead.id} style={{ transition: 'background-color 0.2s ease', cursor: 'pointer' }} onMouseOver={e => e.currentTarget.style.backgroundColor = 'var(--bg-surface-elevated)'} onMouseOut={e => e.currentTarget.style.backgroundColor = 'transparent'}>
                      <td style={{ color: 'var(--text-secondary)', whiteSpace: 'nowrap' }}>
                        {lead.created_at ? format(new Date(lead.created_at), 'MMM dd, yyyy') : 'N/A'}
                      </td>
                      <td style={{ color: 'var(--text-primary)', fontWeight: 500 }}>{lead.customer_name || 'Unknown'}</td>
                      <td style={{ color: 'var(--text-secondary)' }}>{lead.customer_phone || 'N/A'}</td>
                      <td>
                        {lead.qualified === true ? (
                          <span className="badge badge-success">Yes</span>
                        ) : (
                          <span className="badge badge-neutral">No</span>
                        )}
                      </td>
                      <td>
                        <span style={{ 
                          padding: '0.25rem 0.5rem', 
                          borderRadius: '1rem', 
                          fontSize: '0.75rem', 
                          fontWeight: 500,
                          backgroundColor: lead.status === 'new' ? 'rgba(59, 130, 246, 0.1)' : 
                                           lead.status === 'contacted' ? 'rgba(245, 158, 11, 0.1)' : 
                                           'var(--bg-surface-elevated)',
                          color: lead.status === 'new' ? 'var(--info-color)' : 
                                 lead.status === 'contacted' ? 'var(--warning-color)' : 
                                 'var(--text-secondary)'
                        }}>
                          {(lead.status || 'new').toUpperCase()}
                        </span>
                      </td>
                      <td style={{ color: 'var(--text-secondary)', maxWidth: '300px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {lead.services_interested || '-'}
                      </td>
                    </tr>
                  ))}
                  {(!data?.data || data.data.length === 0) && (
                    <tr>
                      <td colSpan={6} style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
                        No leads found.
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
                  Showing page <span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>{page}</span> of <span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>{data.totalPages}</span> ({data.count} total leads)
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

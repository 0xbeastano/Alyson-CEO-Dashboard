import React, { useState } from 'react';
import { useLeads } from '../hooks/useLeads';
import { format } from 'date-fns';
import { Loader2, ChevronLeft, ChevronRight, Users, Download, Filter, Search } from 'lucide-react';

export const LeadsPage: React.FC = () => {
  const [page, setPage] = useState(1);
  const { data, isLoading, isError } = useLeads(page);

  const totalLeads = data?.count || 0;
  const qualifiedCount = data?.data.filter(l => l.qualified).length || 0;

  return (
    <div style={{ animation: 'fadeUpIn 0.4s ease-out forwards' }}>
      {/* Premium Header */}
      <div className="header" style={{ marginBottom: 'var(--spacing-xl)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h1 style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '1.5rem', fontWeight: 600 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '40px', height: '40px', borderRadius: '10px', backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-color)' }}>
              <Users size={20} color="var(--text-primary)" />
            </div>
            Leads Pipeline
          </h1>
          <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem', fontSize: '0.875rem' }}>Manage and track extracted leads from voice interactions.</p>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button className="premium-btn-secondary">
            <Filter size={16} /> Filter
          </button>
          <button className="premium-btn-secondary">
            <Download size={16} /> Export CSV
          </button>
        </div>
      </div>

      {/* Mini Stats Row */}
      <div className="grid grid-cols-3" style={{ marginBottom: 'var(--spacing-xl)', gap: 'var(--spacing-md)' }}>
        <div className="card" style={{ padding: '1.25rem' }}>
          <div style={{ color: 'var(--text-secondary)', fontSize: '0.8125rem', fontWeight: 500, marginBottom: '0.5rem' }}>Total Pipeline</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 600, color: 'var(--text-primary)' }}>{totalLeads}</div>
        </div>
        <div className="card" style={{ padding: '1.25rem' }}>
          <div style={{ color: 'var(--text-secondary)', fontSize: '0.8125rem', fontWeight: 500, marginBottom: '0.5rem' }}>Qualified This Page</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 600, color: 'var(--success-color)' }}>{qualifiedCount}</div>
        </div>
        <div className="card" style={{ padding: '1.25rem' }}>
          <div style={{ color: 'var(--text-secondary)', fontSize: '0.8125rem', fontWeight: 500, marginBottom: '0.5rem' }}>Conversion Rate</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 600, color: 'var(--primary-color)' }}>
            {data?.data.length ? Math.round((qualifiedCount / data.data.length) * 100) : 0}%
          </div>
        </div>
      </div>

      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        {/* Table Toolbar */}
        <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.01)' }}>
          <div style={{ position: 'relative', width: '300px' }}>
            <Search size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
            <input type="text" placeholder="Search leads by name or phone..." style={{ width: '100%', padding: '0.5rem 1rem 0.5rem 2.25rem', borderRadius: '6px', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-surface)', color: 'var(--text-primary)', fontSize: '0.875rem', outline: 'none' }} />
          </div>
        </div>

        {isLoading ? (
          <div style={{ display: 'flex', justifyContent: 'center', padding: '6rem' }}>
            <Loader2 size={32} color="var(--text-primary)" style={{ animation: 'spin 1s linear infinite' }} />
          </div>
        ) : isError ? (
          <div style={{ padding: '4rem', textAlign: 'center', color: 'var(--danger-color)' }}>
            Failed to load leads. Please check your connection.
          </div>
        ) : (
          <>
            <div className="table-container" style={{ margin: 0 }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ backgroundColor: 'transparent', borderBottom: '1px solid var(--border-color)' }}>
                    <th style={{ padding: '1rem 1.5rem', color: 'var(--text-muted)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Lead</th>
                    <th style={{ padding: '1rem 1.5rem', color: 'var(--text-muted)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Contact</th>
                    <th style={{ padding: '1rem 1.5rem', color: 'var(--text-muted)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Status</th>
                    <th style={{ padding: '1rem 1.5rem', color: 'var(--text-muted)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Services</th>
                    <th style={{ padding: '1rem 1.5rem', color: 'var(--text-muted)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', textAlign: 'right' }}>Date Added</th>
                  </tr>
                </thead>
                <tbody>
                  {data?.data.map((lead) => (
                    <tr key={lead.id} style={{ transition: 'background-color 0.2s ease', cursor: 'pointer', borderBottom: '1px solid rgba(255,255,255,0.02)' }} onMouseOver={e => e.currentTarget.style.backgroundColor = 'var(--bg-surface-elevated)'} onMouseOut={e => e.currentTarget.style.backgroundColor = 'transparent'}>
                      <td style={{ padding: '1rem 1.5rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                          <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: 'var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                            {lead.customer_name ? lead.customer_name.charAt(0).toUpperCase() : '?'}
                          </div>
                          <div>
                            <div style={{ color: 'var(--text-primary)', fontWeight: 500, fontSize: '0.875rem' }}>{lead.customer_name || 'Unknown User'}</div>
                            {lead.qualified && <div style={{ fontSize: '0.75rem', color: 'var(--success-color)', marginTop: '0.125rem' }}>Qualified Lead</div>}
                          </div>
                        </div>
                      </td>
                      <td style={{ padding: '1rem 1.5rem', color: 'var(--text-secondary)', fontSize: '0.875rem' }}>{lead.customer_phone || 'N/A'}</td>
                      <td style={{ padding: '1rem 1.5rem' }}>
                        <span style={{ 
                          padding: '0.25rem 0.6rem', 
                          borderRadius: '4px', 
                          fontSize: '0.75rem', 
                          fontWeight: 500,
                          backgroundColor: lead.status === 'new' ? 'rgba(59, 130, 246, 0.1)' : 
                                           lead.status === 'contacted' ? 'rgba(245, 158, 11, 0.1)' : 
                                           'var(--bg-surface-elevated)',
                          color: lead.status === 'new' ? 'var(--info-color)' : 
                                 lead.status === 'contacted' ? 'var(--warning-color)' : 
                                 'var(--text-secondary)',
                          border: `1px solid ${
                            lead.status === 'new' ? 'rgba(59, 130, 246, 0.2)' : 
                            lead.status === 'contacted' ? 'rgba(245, 158, 11, 0.2)' : 
                            'var(--border-color)'}`
                        }}>
                          {(lead.status || 'new').toUpperCase()}
                        </span>
                      </td>
                      <td style={{ padding: '1rem 1.5rem', color: 'var(--text-secondary)', maxWidth: '250px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontSize: '0.875rem' }}>
                        {lead.services_interested || '-'}
                      </td>
                      <td style={{ padding: '1rem 1.5rem', color: 'var(--text-secondary)', whiteSpace: 'nowrap', textAlign: 'right', fontSize: '0.875rem' }}>
                        {lead.created_at ? format(new Date(lead.created_at), 'MMM dd, yyyy') : 'N/A'}
                      </td>
                    </tr>
                  ))}
                  {(!data?.data || data.data.length === 0) && (
                    <tr>
                      <td colSpan={5} style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-muted)' }}>
                        <Users size={32} style={{ margin: '0 auto 1rem auto', opacity: 0.5 }} />
                        <div style={{ fontWeight: 500, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>No Leads Found</div>
                        <div style={{ fontSize: '0.875rem' }}>Your pipeline is currently empty.</div>
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
                  Showing page <span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>{page}</span> of <span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>{data.totalPages}</span> ({data.count} total leads)
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

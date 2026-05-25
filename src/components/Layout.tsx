import React from 'react';
import { LayoutDashboard, Users, Calendar, PhoneCall, Settings, LogOut } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="app-container">
      <aside className="sidebar">
        <div style={{ marginBottom: 'var(--spacing-xl)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'var(--primary-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 'bold' }}>
            A
          </div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 600 }}>Alyson AI</h2>
        </div>
        
        <nav style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-sm)', flex: 1 }}>
          <NavItem icon={<LayoutDashboard size={20} />} label="Overview" active />
          <NavItem icon={<PhoneCall size={20} />} label="Call Logs" />
          <NavItem icon={<Users size={20} />} label="Leads" />
          <NavItem icon={<Calendar size={20} />} label="Appointments" />
        </nav>
        
        <div style={{ marginTop: 'auto', borderTop: '1px solid var(--border-color)', paddingTop: 'var(--spacing-md)', display: 'flex', flexDirection: 'column', gap: 'var(--spacing-sm)' }}>
          <NavItem icon={<Settings size={20} />} label="Settings" />
          <NavItem icon={<LogOut size={20} />} label="Log Out" />
        </div>
      </aside>
      
      <main className="main-content">
        {children}
      </main>
    </div>
  );
};

const NavItem = ({ icon, label, active = false }: { icon: React.ReactNode, label: string, active?: boolean }) => (
  <button style={{
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--spacing-md)',
    padding: 'var(--spacing-sm) var(--spacing-md)',
    borderRadius: 'var(--radius-md)',
    background: active ? 'var(--bg-surface-elevated)' : 'transparent',
    color: active ? 'var(--primary-color)' : 'var(--text-secondary)',
    border: 'none',
    cursor: 'pointer',
    textAlign: 'left',
    fontSize: '0.875rem',
    fontWeight: 500,
    transition: 'all var(--transition-fast)'
  }}
  onMouseEnter={(e) => {
    if (!active) e.currentTarget.style.color = 'var(--text-primary)';
  }}
  onMouseLeave={(e) => {
    if (!active) e.currentTarget.style.color = 'var(--text-secondary)';
  }}
  >
    {icon}
    {label}
  </button>
);

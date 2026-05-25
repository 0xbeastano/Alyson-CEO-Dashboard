import React from 'react';
import { Settings, LogOut } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="app-container" style={{ flexDirection: 'column', minHeight: '100vh' }}>
      
      {/* N9 Edge-aligned minimal nav */}
      <header style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 'var(--spacing-md) var(--spacing-2xl)',
        borderBottom: '1px solid var(--border-color)',
        backgroundColor: 'var(--bg-surface)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-xl)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ width: '28px', height: '28px', borderRadius: '6px', background: 'var(--primary-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#000', fontWeight: 'bold', fontSize: '0.875rem' }}>
              A
            </div>
            <h2 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-primary)' }}>Alyson AI</h2>
          </div>
          
          <nav style={{ display: 'flex', gap: 'var(--spacing-md)' }}>
            <NavItem label="Overview" active />
            <NavItem label="Call Logs" />
            <NavItem label="Leads" />
            <NavItem label="Appointments" />
          </nav>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-md)' }}>
          <button style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', transition: 'color var(--transition-fast)' }} onMouseOver={e => e.currentTarget.style.color = 'var(--text-primary)'} onMouseOut={e => e.currentTarget.style.color = 'var(--text-secondary)'}>
            <Settings size={18} />
          </button>
          <div style={{ width: '1px', height: '16px', backgroundColor: 'var(--border-color)' }}></div>
          <button style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', fontWeight: 500, transition: 'color var(--transition-fast)' }} onMouseOver={e => e.currentTarget.style.color = 'var(--text-primary)'} onMouseOut={e => e.currentTarget.style.color = 'var(--text-secondary)'}>
            Log Out <LogOut size={16} />
          </button>
        </div>
      </header>
      
      <main className="main-content">
        <div style={{ maxWidth: '1440px', margin: '0 auto', width: '100%' }}>
          {children}
        </div>
      </main>
    </div>
  );
};

const NavItem = ({ label, active = false }: { label: string, active?: boolean }) => (
  <button style={{
    background: 'transparent',
    color: active ? 'var(--text-primary)' : 'var(--text-secondary)',
    border: 'none',
    cursor: 'pointer',
    fontSize: '0.875rem',
    fontWeight: 500,
    transition: 'color var(--transition-fast)',
    padding: 'var(--spacing-xs) 0',
  }}
  onMouseEnter={(e) => {
    if (!active) e.currentTarget.style.color = 'var(--text-primary)';
  }}
  onMouseLeave={(e) => {
    if (!active) e.currentTarget.style.color = 'var(--text-secondary)';
  }}
  >
    {label}
  </button>
);

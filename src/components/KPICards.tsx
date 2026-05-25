import React, { useEffect, useState } from 'react';
import { PhoneCall, Users, Calendar, TrendingUp, PhoneOff, Clock, PhoneForwarded } from 'lucide-react';
import type { DashboardKPIs } from '../types';

interface KPICardsProps {
  data: {
    kpis: DashboardKPIs;
  }
}

export const KPICards: React.FC<KPICardsProps> = ({ data }) => {
  const { kpis } = data;
  const averageDuration = kpis?.average_duration_seconds || 0;

  return (
    <div className="grid grid-cols-4" style={{ marginBottom: 'var(--spacing-lg)' }}>
      <Card title="Total Calls" value={kpis?.total_calls || 0} icon={<PhoneCall size={16} />} delayClass="stagger-1" />
      <Card title="Qualified Leads" value={kpis?.qualified_leads || 0} icon={<Users size={16} />} delayClass="stagger-2" />
      <Card title="Appointments" value={kpis?.appointments_scheduled || 0} icon={<Calendar size={16} />} delayClass="stagger-3" />
      <Card title="Callback Requests" value={kpis?.callback_requests || 0} icon={<PhoneForwarded size={16} />} trend="Needs action" positive={false} delayClass="stagger-4" />
      <Card title="Not Interested" value={kpis?.not_interested || 0} icon={<PhoneOff size={16} />} trend="Missed" positive={false} delayClass="stagger-5" />
      <Card title="Conversion Rate" value={kpis?.lead_conversion_rate || 0} suffix="%" icon={<TrendingUp size={16} />} trend="Lead to Call" positive={true} delayClass="stagger-1" />
      <Card title="Avg Duration" value={averageDuration} isTime icon={<Clock size={16} />} delayClass="stagger-2" />
    </div>
  );
};

const NumberTicker = ({ value, suffix = '', isTime = false }: { value: number, suffix?: string, isTime?: boolean }) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 800; // ms
    const startTime = performance.now();
    const endValue = Number(value);

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out cubic
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      
      setDisplayValue(start + (endValue - start) * easeProgress);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setDisplayValue(endValue);
      }
    };

    requestAnimationFrame(animate);
  }, [value]);

  if (isTime) {
    const v = Math.round(displayValue);
    return <span>{Math.floor(v / 60)}m {Math.floor(v % 60)}s</span>;
  }

  // Use Intl.NumberFormat for commas if large
  return <span>{new Intl.NumberFormat('en-US', { maximumFractionDigits: 1 }).format(displayValue)}{suffix}</span>;
};

const Card = ({ title, value, icon, trend, positive, delayClass, suffix, isTime }: { title: string, value: number, icon: React.ReactNode, trend?: string, positive?: boolean, delayClass: string, suffix?: string, isTime?: boolean }) => (
  <div className={`card ${delayClass}`} style={{ justifyContent: 'space-between' }}>
    <div className="kpi-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <span className="kpi-title" style={{ fontSize: '0.75rem', letterSpacing: '0.05em', color: 'var(--text-secondary)' }}>{title}</span>
      <div className="kpi-icon" style={{ color: 'var(--text-muted)' }}>{icon}</div>
    </div>
    
    <div style={{ marginTop: 'var(--spacing-md)' }}>
      <div className="kpi-value" style={{ fontSize: '2.5rem', fontWeight: 600, letterSpacing: '-0.035em', lineHeight: 1 }}>
        <NumberTicker value={value} suffix={suffix} isTime={isTime} />
      </div>
      
      {trend && (
        <div className={`kpi-trend`} style={{ display: 'flex', alignItems: 'center', fontSize: '0.75rem', marginTop: 'var(--spacing-sm)', gap: '0.375rem', color: positive ? 'var(--success-color)' : 'var(--warning-color)' }}>
          <span style={{ 
            width: '6px', height: '6px', borderRadius: '50%', 
            backgroundColor: positive ? 'var(--success-color)' : 'var(--warning-color)' 
          }} />
          {trend}
        </div>
      )}
    </div>
  </div>
);

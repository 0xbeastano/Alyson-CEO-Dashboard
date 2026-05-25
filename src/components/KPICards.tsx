import React from 'react';
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
    <div className="grid grid-cols-4" style={{ marginBottom: 'var(--spacing-xl)', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
      <Card title="Total Calls" value={kpis?.total_calls || 0} icon={<PhoneCall />} />
      <Card title="Qualified Leads" value={kpis?.qualified_leads || 0} icon={<Users />} />
      <Card title="Appointments" value={kpis?.appointments_scheduled || 0} icon={<Calendar />} />
      <Card title="Callback Requests" value={kpis?.callback_requests || 0} icon={<PhoneForwarded />} trend="Needs action" positive={false} />
      <Card title="Not Interested" value={kpis?.not_interested || 0} icon={<PhoneOff />} trend="Missed" positive={false} />
      <Card title="Conversion Rate" value={`${kpis?.lead_conversion_rate || 0}%`} icon={<TrendingUp />} trend="Lead to Call" positive={true} />
      <Card title="Avg Duration" value={`${Math.floor(averageDuration / 60)}m ${Math.floor(averageDuration % 60)}s`} icon={<Clock />} />
    </div>
  );
};

const Card = ({ title, value, icon, trend, positive }: { title: string, value: string | number, icon: React.ReactNode, trend?: string, positive?: boolean }) => (
  <div className="card kpi-card">
    <div className="kpi-header">
      <span className="kpi-title">{title}</span>
      <div className="kpi-icon">{icon}</div>
    </div>
    <div className="kpi-value">{value}</div>
    {trend && (
      <div className={`kpi-trend ${positive ? 'positive' : 'negative'}`}>
        {trend}
      </div>
    )}
  </div>
);

import React from 'react';
import { PhoneCall, Users, Calendar, TrendingUp, PhoneOff, Clock, PhoneForwarded } from 'lucide-react';
import type { CallLog, Lead, Appointment, Followup } from '../types';

interface KPICardsProps {
  data: {
    callLogs: CallLog[];
    leads: Lead[];
    appointments: Appointment[];
    followups: Followup[];
  }
}

export const KPICards: React.FC<KPICardsProps> = ({ data }) => {
  const { callLogs, leads, appointments, followups } = data;

  const totalCalls = callLogs?.length || 0;
  const qualifiedLeads = (leads || []).filter(l => l?.qualified === true).length;
  const appointmentsScheduled = appointments?.length || 0;
  const averageDuration = Math.round((callLogs || []).reduce((acc, curr) => acc + (curr?.call_duration || 0), 0) / (totalCalls || 1));
  const conversionRate = Math.round((qualifiedLeads / (totalCalls || 1)) * 100);
  const notInterested = (callLogs || []).filter(c => c?.call_outcome === 'not_interested').length;
  const callbackRequests = (followups || []).filter(f => f?.followup_type === 'callback_request').length;

  return (
    <div className="grid grid-cols-4" style={{ marginBottom: 'var(--spacing-xl)', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
      <Card title="Total Calls" value={totalCalls} icon={<PhoneCall />} />
      <Card title="Qualified Leads" value={qualifiedLeads} icon={<Users />} />
      <Card title="Appointments" value={appointmentsScheduled} icon={<Calendar />} />
      <Card title="Callback Requests" value={callbackRequests} icon={<PhoneForwarded />} trend="Needs action" positive={false} />
      <Card title="Not Interested" value={notInterested} icon={<PhoneOff />} trend="Missed" positive={false} />
      <Card title="Conversion Rate" value={`${conversionRate}%`} icon={<TrendingUp />} trend="Lead to Call" positive={true} />
      <Card title="Avg Duration" value={`${Math.floor(averageDuration / 60)}m ${averageDuration % 60}s`} icon={<Clock />} />
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

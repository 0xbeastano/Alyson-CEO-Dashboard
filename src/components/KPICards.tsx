import React from 'react';
import { PhoneCall, Users, Calendar, TrendingUp, PhoneOff, Clock } from 'lucide-react';
import type { CallLog, Lead, Appointment } from '../types';

interface KPICardsProps {
  data: {
    callLogs: CallLog[];
    leads: Lead[];
    appointments: Appointment[];
  }
}

export const KPICards: React.FC<KPICardsProps> = ({ data }) => {
  const { callLogs, leads, appointments } = data;

  const totalCalls = callLogs?.length || 0;
  const qualifiedLeads = (leads || []).filter(l => l?.status === 'qualified').length;
  const appointmentsScheduled = appointments?.length || 0;
  const averageDuration = Math.round((callLogs || []).reduce((acc, curr) => acc + (curr?.duration || 0), 0) / (totalCalls || 1));
  const conversionRate = Math.round((qualifiedLeads / (totalCalls || 1)) * 100);
  const notInterested = (callLogs || []).filter(c => c?.outcome === 'not_interested').length;

  return (
    <div className="grid grid-cols-3" style={{ marginBottom: 'var(--spacing-xl)' }}>
      <Card title="Total Calls" value={totalCalls} icon={<PhoneCall size={20} />} trend="+12% from last week" positive />
      <Card title="Qualified Leads" value={qualifiedLeads} icon={<Users size={20} />} trend="+5% from last week" positive />
      <Card title="Appointments" value={appointmentsScheduled} icon={<Calendar size={20} />} trend="+2 appointments" positive />
      
      <Card title="Avg Call Duration" value={`${Math.floor(averageDuration / 60)}m ${averageDuration % 60}s`} icon={<Clock size={20} />} trend="-10s from last week" />
      <Card title="Conversion Rate" value={`${conversionRate}%`} icon={<TrendingUp size={20} />} trend="+2% from last week" positive />
      <Card title="Not Interested" value={notInterested} icon={<PhoneOff size={20} />} trend="-3% from last week" positive />
    </div>
  );
};

const Card = ({ title, value, icon, trend, positive }: { title: string, value: string | number, icon: React.ReactNode, trend?: string, positive?: boolean }) => (
  <div className="card">
    <div className="kpi-title">
      <span style={{ color: 'var(--primary-color)' }}>{icon}</span>
      {title}
    </div>
    <div className="kpi-value">{value}</div>
    {trend && (
      <div className={`kpi-trend ${positive ? 'positive' : 'negative'}`}>
        {positive ? '↑' : '↓'} {trend}
      </div>
    )}
  </div>
);

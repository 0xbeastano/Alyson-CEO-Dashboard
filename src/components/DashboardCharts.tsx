import React, { useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend, Cell, PieChart, Pie } from 'recharts';
import { format, subDays } from 'date-fns';
import type { CallLog, Lead, Appointment, Followup } from '../types';

interface DashboardChartsProps {
  data: {
    callLogs: CallLog[];
    leads: Lead[];
    appointments: Appointment[];
    followups: Followup[];
  }
}

const COLORS = ['#6366f1', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

export const DashboardCharts: React.FC<DashboardChartsProps> = ({ data }) => {
  const { callLogs, leads, appointments, followups } = data;

  const volumeData = useMemo(() => {
    const days = Array.from({ length: 7 }).map((_, i) => {
      const d = subDays(new Date(), 6 - i);
      return { date: format(d, 'MMM dd'), fullDate: format(d, 'yyyy-MM-dd') };
    });
    
    return days.map(day => ({
      name: day.date,
      calls: (callLogs || []).filter(c => c?.created_at && typeof c.created_at === 'string' && c.created_at.startsWith(day.fullDate)).length,
      leads: (leads || []).filter(l => l?.created_at && typeof l.created_at === 'string' && l.created_at.startsWith(day.fullDate)).length,
      appointments: (appointments || []).filter(a => a?.created_at && typeof a.created_at === 'string' && a.created_at.startsWith(day.fullDate)).length,
    }));
  }, [callLogs, leads, appointments]);

  const outcomesData = useMemo(() => {
    const outcomesCount = (callLogs || []).reduce((acc, call) => {
      const outcome = call?.call_outcome || 'unknown';
      acc[outcome] = (acc[outcome] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    return Object.entries(outcomesCount).map(([name, value]) => ({ name, value }));
  }, [callLogs]);

  const followupsData = useMemo(() => {
    const statusCount = (followups || []).reduce((acc, followup) => {
      const status = followup?.status || 'unknown';
      acc[status] = (acc[status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    return Object.entries(statusCount).map(([name, value]) => ({ name, value }));
  }, [followups]);

  return (
    <div className="grid grid-cols-2" style={{ marginBottom: 'var(--spacing-xl)' }}>
      <div className="card">
        <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: 'var(--spacing-lg)' }}>Volume Trends (7 Days)</h3>
        <div className="chart-container">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={volumeData}>
              <defs>
                <linearGradient id="colorCalls" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--primary-color)" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="var(--primary-color)" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorLeads" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--success-color)" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="var(--success-color)" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" vertical={false} />
              <XAxis dataKey="name" stroke="var(--text-secondary)" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="var(--text-secondary)" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip 
                contentStyle={{ backgroundColor: 'var(--bg-surface-elevated)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                itemStyle={{ color: 'var(--text-primary)' }}
              />
              <Legend />
              <Area type="monotone" dataKey="calls" stroke="var(--primary-color)" fillOpacity={1} fill="url(#colorCalls)" />
              <Area type="monotone" dataKey="leads" stroke="var(--success-color)" fillOpacity={1} fill="url(#colorLeads)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="card">
        <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: 'var(--spacing-lg)' }}>Call Outcomes</h3>
        <div className="chart-container">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={outcomesData} layout="vertical" margin={{ top: 0, right: 0, left: 30, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" horizontal={false} />
              <XAxis type="number" stroke="var(--text-secondary)" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis dataKey="name" type="category" stroke="var(--text-secondary)" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip 
                cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                contentStyle={{ backgroundColor: 'var(--bg-surface-elevated)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
              />
              <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                {outcomesData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="card">
        <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: 'var(--spacing-lg)' }}>Appointments (7 Days)</h3>
        <div className="chart-container">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={volumeData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" vertical={false} />
              <XAxis dataKey="name" stroke="var(--text-secondary)" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="var(--text-secondary)" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip 
                cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                contentStyle={{ backgroundColor: 'var(--bg-surface-elevated)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
              />
              <Bar dataKey="appointments" fill="var(--warning-color)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="card">
        <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: 'var(--spacing-lg)' }}>Followups by Status</h3>
        <div className="chart-container" style={{ display: 'flex', justifyContent: 'center' }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={followupsData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
                label={({ name, percent }) => `${name} ${((percent || 0) * 100).toFixed(0)}%`}
                labelLine={false}
              >
                {followupsData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ backgroundColor: 'var(--bg-surface-elevated)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

    </div>
  );
};

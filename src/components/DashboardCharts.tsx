import React, { useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Cell, PieChart, Pie } from 'recharts';
import { format, subDays } from 'date-fns';
import type { CallLog, Lead } from '../types';

interface DashboardChartsProps {
  data: {
    callLogs: CallLog[];
    leads: Lead[];
  }
}

export const DashboardCharts: React.FC<DashboardChartsProps> = ({ data }) => {
  const { callLogs, leads } = data;

  // Process data for Calls Over Time
  const callsByDay = useMemo(() => {
    const days = Array.from({ length: 7 }).map((_, i) => {
      const d = subDays(new Date(), 6 - i);
      return { date: format(d, 'MMM dd'), fullDate: format(d, 'yyyy-MM-dd') };
    });
    
    return days.map(day => ({
      name: day.date,
      calls: callLogs.filter(c => c.created_at.startsWith(day.fullDate)).length,
      leads: leads.filter(l => l.created_at.startsWith(day.fullDate)).length,
    }));
  }, [callLogs, leads]);

  // Process data for Call Outcomes
  const outcomesData = useMemo(() => {
    const outcomesCount = callLogs.reduce((acc, call) => {
      acc[call.outcome] = (acc[call.outcome] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    return Object.entries(outcomesCount).map(([name, value]) => ({
      name: name.replace('_', ' ').toUpperCase(),
      value
    }));
  }, [callLogs]);

  const COLORS = ['#10b981', '#f59e0b', '#ef4444', '#6366f1'];

  return (
    <div className="grid grid-cols-2" style={{ marginBottom: 'var(--spacing-xl)' }}>
      <div className="card">
        <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: 'var(--spacing-md)' }}>Traffic Over Time</h3>
        <div className="chart-container">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={callsByDay} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorCalls" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--primary-color)" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="var(--primary-color)" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorLeads" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--success-color)" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="var(--success-color)" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" vertical={false} />
              <XAxis dataKey="name" stroke="var(--text-secondary)" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="var(--text-secondary)" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip 
                contentStyle={{ backgroundColor: 'var(--bg-surface-elevated)', borderColor: 'var(--border-color)', borderRadius: '8px' }} 
                itemStyle={{ color: 'var(--text-primary)' }}
              />
              <Legend verticalAlign="top" height={36}/>
              <Area type="monotone" dataKey="calls" name="Total Calls" stroke="var(--primary-color)" fillOpacity={1} fill="url(#colorCalls)" />
              <Area type="monotone" dataKey="leads" name="New Leads" stroke="var(--success-color)" fillOpacity={1} fill="url(#colorLeads)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      <div className="card">
        <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: 'var(--spacing-md)' }}>Call Outcomes Breakdown</h3>
        <div className="chart-container">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={outcomesData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {outcomesData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ backgroundColor: 'var(--bg-surface-elevated)', borderColor: 'var(--border-color)', borderRadius: '8px' }} 
              />
              <Legend verticalAlign="middle" align="right" layout="vertical" />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

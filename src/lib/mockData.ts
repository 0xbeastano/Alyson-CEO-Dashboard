import { subDays } from 'date-fns';
import type { CallLog, Lead, Appointment, Followup, DashboardKPIs, DashboardRecentCall, DashboardOpenFollowup } from '../types';

const now = new Date();

const rawCalls = Array.from({ length: 45 }).map((_, i) => {
  const outcome = ['completed', 'voicemail', 'failed', 'not_interested'][Math.floor(Math.random() * 4)];
  return {
    id: `call-${i}`,
    call_id: `sys-call-${i}`,
    customer_name: `Customer ${i}`,
    customer_phone: `+1555000${i.toString().padStart(4, '0')}`,
    call_duration: `${Math.floor(Math.random() * 300) + 30}`,
    call_outcome: outcome,
    created_at: subDays(now, Math.floor(Math.random() * 7)).toISOString(),
  } as CallLog;
});

const rawLeads = Array.from({ length: 15 }).map((_, i) => {
  const qualified = Math.random() > 0.4;
  return {
    id: `lead-${i}`,
    customer_name: `Lead Prospect ${i}`,
    qualified: qualified,
    status: qualified ? 'qualified' : 'new',
    created_at: subDays(now, Math.floor(Math.random() * 7)).toISOString(),
  } as Lead;
});

const rawAppointments = Array.from({ length: 8 }).map((_, i) => ({
  id: `apt-${i}`,
  customer_name: `Appt Client ${i}`,
  appointment_datetime: subDays(now, Math.floor(Math.random() * -7)).toISOString(), // future dates
  status: 'upcoming',
  created_at: subDays(now, Math.floor(Math.random() * 7)).toISOString(),
}) as Appointment);

const rawFollowups = Array.from({ length: 12 }).map((_, i) => ({
  id: `follow-${i}`,
  customer_name: `Followup Client ${i}`,
  followup_type: Math.random() > 0.5 ? 'call_back' : 'email',
  status: Math.random() > 0.3 ? 'pending' : 'done',
  created_at: subDays(now, Math.floor(Math.random() * 7)).toISOString(),
}) as Followup);

export const mockData = {
  kpis: {
    total_calls: 150,
    qualified_leads: 42,
    appointments_scheduled: 18,
    callback_requests: 12,
    not_interested: 35,
    lead_conversion_rate: 28.00,
    average_duration_seconds: 145,
  } as DashboardKPIs,
  recentCalls: rawCalls.slice(0, 5).map(c => ({
    id: c.id,
    call_id: c.call_id,
    customer_name: c.customer_name,
    customer_phone: c.customer_phone,
    call_outcome: c.call_outcome,
    services_discussed: c.services_discussed,
    call_summary: c.call_summary,
    created_at: c.created_at,
  })) as DashboardRecentCall[],
  openFollowups: rawFollowups.filter(f => f.status === 'pending').slice(0, 5).map(f => ({
    id: f.id,
    call_log_id: f.call_log_id,
    customer_name: f.customer_name,
    customer_phone: f.customer_phone,
    followup_type: f.followup_type,
    next_steps: f.next_steps,
    status: f.status,
    created_at: f.created_at,
  })) as DashboardOpenFollowup[],
  callLogs: rawCalls,
  leads: rawLeads,
  appointments: rawAppointments,
  followups: rawFollowups,
};

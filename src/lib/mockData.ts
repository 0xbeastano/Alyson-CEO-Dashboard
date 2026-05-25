import { subDays } from 'date-fns';
import type { CallLog, Lead, Appointment, Followup } from '../types';

const now = new Date();

export const mockData = {
  callLogs: Array.from({ length: 45 }).map((_, i) => {
    const outcome = ['completed', 'voicemail', 'failed', 'not_interested'][Math.floor(Math.random() * 4)];
    return {
      id: `call-${i}`,
      call_id: `sys-call-${i}`,
      customer_name: `Customer ${i}`,
      customer_phone: `+1555000${i.toString().padStart(4, '0')}`,
      call_duration: Math.floor(Math.random() * 300) + 30, // 30s to 330s
      call_outcome: outcome,
      created_at: subDays(now, Math.floor(Math.random() * 7)).toISOString(),
    } as CallLog;
  }),
  leads: Array.from({ length: 15 }).map((_, i) => {
    const qualified = Math.random() > 0.4;
    return {
      id: `lead-${i}`,
      customer_name: `Lead Prospect ${i}`,
      qualified: qualified,
      status: qualified ? 'qualified' : 'new',
      created_at: subDays(now, Math.floor(Math.random() * 7)).toISOString(),
    } as Lead;
  }),
  appointments: Array.from({ length: 8 }).map((_, i) => ({
    id: `apt-${i}`,
    customer_name: `Appt Client ${i}`,
    appointment_datetime: subDays(now, Math.floor(Math.random() * -7)).toISOString(), // future dates
    status: 'upcoming',
    created_at: subDays(now, Math.floor(Math.random() * 7)).toISOString(),
  }) as Appointment),
  followups: Array.from({ length: 12 }).map((_, i) => ({
    id: `follow-${i}`,
    customer_name: `Followup Client ${i}`,
    followup_type: Math.random() > 0.5 ? 'callback_request' : 'email_sent',
    status: Math.random() > 0.3 ? 'pending' : 'resolved',
    created_at: subDays(now, Math.floor(Math.random() * 7)).toISOString(),
  }) as Followup),
};

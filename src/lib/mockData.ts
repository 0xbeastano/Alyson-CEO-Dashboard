import { subDays } from 'date-fns';

export interface CallLog {
  id: string;
  created_at: string;
  duration: number; // in seconds
  outcome: 'completed' | 'voicemail' | 'failed' | 'not_interested';
  phone_number: string;
}

export interface Lead {
  id: string;
  created_at: string;
  name: string;
  score: number;
  status: 'new' | 'contacted' | 'qualified' | 'disqualified';
}

export interface Appointment {
  id: string;
  created_at: string;
  scheduled_for: string;
  attendee_name: string;
  status: 'upcoming' | 'completed' | 'cancelled';
}

export interface Followup {
  id: string;
  created_at: string;
  type: 'callback_request' | 'email_sent';
  status: 'pending' | 'resolved';
}

const generateMockData = () => {
  const now = new Date();
  
  const callLogs: CallLog[] = Array.from({ length: 150 }).map((_, i) => {
    const daysAgo = Math.floor(Math.random() * 30);
    const date = subDays(now, daysAgo);
    const outcomes = ['completed', 'completed', 'completed', 'voicemail', 'failed', 'not_interested'];
    return {
      id: `call-${i}`,
      created_at: date.toISOString(),
      duration: Math.floor(Math.random() * 300) + 30, // 30s to 5.5m
      outcome: outcomes[Math.floor(Math.random() * outcomes.length)] as CallLog['outcome'],
      phone_number: `+1 (555) ${Math.floor(100 + Math.random() * 900)}-${Math.floor(1000 + Math.random() * 9000)}`
    };
  });

  const leads: Lead[] = Array.from({ length: 45 }).map((_, i) => {
    const daysAgo = Math.floor(Math.random() * 30);
    const date = subDays(now, daysAgo);
    const statuses = ['new', 'contacted', 'qualified', 'disqualified'];
    return {
      id: `lead-${i}`,
      created_at: date.toISOString(),
      name: `Lead ${i + 1}`,
      score: Math.floor(Math.random() * 100),
      status: statuses[Math.floor(Math.random() * statuses.length)] as Lead['status'],
    };
  });

  const appointments: Appointment[] = Array.from({ length: 20 }).map((_, i) => {
    const daysAgo = Math.floor(Math.random() * 30) - 15; // Some in future, some in past
    const date = subDays(now, daysAgo);
    const statuses = ['upcoming', 'completed', 'cancelled'];
    return {
      id: `apt-${i}`,
      created_at: subDays(date, 2).toISOString(),
      scheduled_for: date.toISOString(),
      attendee_name: `Client ${i + 1}`,
      status: daysAgo < 0 ? 'upcoming' : statuses[Math.floor(Math.random() * statuses.length)] as Appointment['status'],
    };
  });

  const followups: Followup[] = Array.from({ length: 30 }).map((_, i) => {
    const daysAgo = Math.floor(Math.random() * 10);
    const date = subDays(now, daysAgo);
    const statuses = ['pending', 'pending', 'resolved'];
    const types = ['callback_request', 'email_sent'];
    return {
      id: `fup-${i}`,
      created_at: date.toISOString(),
      type: types[Math.floor(Math.random() * types.length)] as Followup['type'],
      status: statuses[Math.floor(Math.random() * statuses.length)] as Followup['status'],
    };
  });

  return { callLogs, leads, appointments, followups };
};

export const mockData = generateMockData();

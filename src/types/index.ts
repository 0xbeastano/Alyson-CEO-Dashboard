export interface CallLog {
  id: string;
  created_at: string;
  duration: number; // in seconds
  outcome: 'completed' | 'voicemail' | 'failed' | 'not_interested' | string;
  phone_number: string;
}

export interface Lead {
  id: string;
  created_at: string;
  name: string;
  score: number;
  status: 'new' | 'contacted' | 'qualified' | 'disqualified' | string;
}

export interface Appointment {
  id: string;
  created_at: string;
  scheduled_for: string;
  attendee_name: string;
  status: 'upcoming' | 'completed' | 'cancelled' | string;
}

export interface Followup {
  id: string;
  created_at: string;
  type: 'callback_request' | 'email_sent' | string;
  status: 'pending' | 'resolved' | string;
}

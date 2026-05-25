export interface CallLog {
  id: string;
  call_id?: string;
  customer_name?: string;
  customer_phone?: string;
  customer_email?: string;
  services_discussed?: string;
  call_duration: number; // in seconds
  call_summary?: string;
  call_outcome: 'completed' | 'voicemail' | 'failed' | 'not_interested' | string;
  lead_identified?: boolean;
  appointment_scheduled?: boolean;
  appointment_datetime?: string;
  followup_needed?: boolean;
  followup_type?: string;
  agent_notes?: string;
  next_steps?: string;
  call_transcript?: string;
  source?: string;
  created_at: string;
}

export interface Lead {
  id: string;
  call_log_id?: string;
  customer_name: string;
  customer_phone?: string;
  customer_email?: string;
  services_interested?: string;
  call_outcome?: string;
  followup_type?: string;
  appointment_datetime?: string;
  agent_notes?: string;
  next_steps?: string;
  qualified: boolean;
  status: 'new' | 'contacted' | 'qualified' | 'disqualified' | string;
  created_at: string;
}

export interface Appointment {
  id: string;
  call_log_id?: string;
  customer_name: string;
  customer_phone?: string;
  customer_email?: string;
  appointment_datetime: string;
  services_discussed?: string;
  agent_notes?: string;
  status: 'upcoming' | 'completed' | 'cancelled' | string;
  created_at: string;
}

export interface Followup {
  id: string;
  call_log_id?: string;
  customer_name?: string;
  customer_phone?: string;
  customer_email?: string;
  followup_type: 'callback_request' | 'email_sent' | string;
  next_steps?: string;
  agent_notes?: string;
  status: 'pending' | 'resolved' | string;
  created_at: string;
}

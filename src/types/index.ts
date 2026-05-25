export interface CallLog {
  id: string;
  call_id?: string;
  customer_name?: string;
  customer_phone?: string;
  customer_email?: string;
  services_discussed?: string;
  call_duration: string; // TEXT in DB
  call_summary?: string;
  call_outcome: 'completed' | 'voicemail' | 'failed' | 'not_interested' | string;
  lead_identified?: string; // TEXT in DB ('true' or 'false')
  appointment_scheduled?: string; // TEXT in DB
  appointment_datetime?: string;
  followup_needed?: string; // TEXT in DB
  followup_type?: 'call_back' | 'email' | 'sms' | string;
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
  followup_type: 'call_back' | 'email' | 'sms' | string;
  next_steps?: string;
  agent_notes?: string;
  status: 'pending' | 'done' | 'skipped' | string;
  created_at: string;
}

// --- NEW SQL VIEW TYPES ---

export interface DashboardKPIs {
  total_calls: number;
  qualified_leads: number;
  appointments_scheduled: number;
  callback_requests: number;
  not_interested: number;
  lead_conversion_rate: number;
  average_duration_seconds: number;
}

export interface DashboardRecentCall {
  id: string;
  call_id?: string;
  customer_name?: string;
  customer_phone?: string;
  call_outcome: string;
  services_discussed?: string;
  call_summary?: string;
  created_at: string;
}

export interface DashboardOpenFollowup {
  id: string;
  call_log_id?: string;
  customer_name?: string;
  customer_phone?: string;
  followup_type: string;
  next_steps?: string;
  status: string;
  created_at: string;
}

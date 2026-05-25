import { useQuery } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';
import { mockData } from '../lib/mockData';
import type { CallLog, Lead, Appointment, Followup, DashboardKPIs, DashboardRecentCall, DashboardOpenFollowup } from '../types';

const isSupabaseConfigured = () => {
  return import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_URL.includes('supabase.co');
};

export const useDashboardData = () => {
  return useQuery({
    queryKey: ['dashboardData'],
    queryFn: async () => {
      if (!isSupabaseConfigured()) {
        await new Promise(res => setTimeout(res, 800));
        return mockData;
      }

      const [kpis, recentCalls, openFollowups, calls, leads, appointments, followups] = await Promise.all([
        supabase.from('dashboard_kpis').select('*').single(),
        supabase.from('dashboard_recent_calls').select('*'),
        supabase.from('dashboard_open_followups').select('*'),
        
        // Fetch raw data limited sets strictly for chart aggregations
        supabase.from('call_logs').select('created_at, call_outcome').order('created_at', { ascending: false }).limit(200),
        supabase.from('leads').select('created_at, qualified, status, customer_name, id').order('created_at', { ascending: false }).limit(100),
        supabase.from('appointments').select('*').order('appointment_datetime', { ascending: true }).limit(50),
        supabase.from('followups').select('created_at, status, followup_type').order('created_at', { ascending: false }).limit(100)
      ]);

      if (kpis.error) throw kpis.error;
      if (recentCalls.error) throw recentCalls.error;
      if (openFollowups.error) throw openFollowups.error;
      if (calls.error) throw calls.error;
      if (leads.error) throw leads.error;
      if (appointments.error) throw appointments.error;
      if (followups.error) throw followups.error;

      return {
        kpis: (kpis.data || {
          total_calls: 0, qualified_leads: 0, appointments_scheduled: 0, 
          callback_requests: 0, not_interested: 0, lead_conversion_rate: 0, average_duration_seconds: 0
        }) as DashboardKPIs,
        recentCalls: (recentCalls.data || []) as DashboardRecentCall[],
        openFollowups: (openFollowups.data || []) as DashboardOpenFollowup[],
        callLogs: (calls.data || []) as CallLog[],
        leads: (leads.data || []) as Lead[],
        appointments: (appointments.data || []) as Appointment[],
        followups: (followups.data || []) as Followup[]
      };
    },
    refetchInterval: 30000,
  });
};

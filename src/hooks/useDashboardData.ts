import { useQuery } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';
import { mockData } from '../lib/mockData';
import type { CallLog, Lead, Appointment, Followup } from '../types';

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

      const [calls, leads, appointments, followups] = await Promise.all([
        supabase.from('call_logs').select('*').order('created_at', { ascending: false }).limit(200),
        supabase.from('leads').select('*').order('created_at', { ascending: false }).limit(100),
        supabase.from('appointments').select('*').order('appointment_datetime', { ascending: true }).limit(50),
        supabase.from('followups').select('*').order('created_at', { ascending: false }).limit(50)
      ]);

      if (calls.error) throw calls.error;
      if (leads.error) throw leads.error;
      if (appointments.error) throw appointments.error;
      if (followups.error) throw followups.error;

      return {
        callLogs: (calls.data || []) as CallLog[],
        leads: (leads.data || []) as Lead[],
        appointments: (appointments.data || []) as Appointment[],
        followups: (followups.data || []) as Followup[]
      };
    },
    refetchInterval: 30000, // Refresh every 30s
  });
};

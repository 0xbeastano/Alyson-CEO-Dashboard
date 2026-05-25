import { useQuery } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';
import { mockData } from '../lib/mockData';
import { CallLog, Lead, Appointment, Followup } from '../types';

// Helper to determine if Supabase is actually configured
const isSupabaseConfigured = () => {
  return import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_URL.includes('supabase.co');
};

export const useDashboardData = () => {
  return useQuery({
    queryKey: ['dashboardData'],
    queryFn: async () => {
      // If no credentials, return mock data instantly
      if (!isSupabaseConfigured()) {
        console.log('Using mock data because Supabase is not configured yet.');
        // simulate slight network delay
        await new Promise(res => setTimeout(res, 800));
        return mockData;
      }

      console.log('Fetching live data from Supabase...');
      // Fetch all tables in parallel
      const [calls, leads, appointments, followups] = await Promise.all([
        supabase.from('call_logs').select('*').order('created_at', { ascending: false }).limit(500),
        supabase.from('leads').select('*').order('created_at', { ascending: false }).limit(200),
        supabase.from('appointments').select('*').order('created_at', { ascending: false }).limit(100),
        supabase.from('followups').select('*').order('created_at', { ascending: false }).limit(100)
      ]);

      if (calls.error) throw calls.error;
      if (leads.error) throw leads.error;
      if (appointments.error) throw appointments.error;
      if (followups.error) throw followups.error;

      return {
        callLogs: (calls.data as CallLog[]) || [],
        leads: (leads.data as Lead[]) || [],
        appointments: (appointments.data as Appointment[]) || [],
        followups: (followups.data as Followup[]) || []
      };
    }
  });
};

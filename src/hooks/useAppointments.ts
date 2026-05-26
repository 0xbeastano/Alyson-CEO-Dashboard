import { useQuery } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';
import type { Appointment } from '../types';

const isSupabaseConfigured = () => {
  return import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_URL.includes('supabase.co');
};

const PAGE_SIZE = 15;

export const useAppointments = (page: number) => {
  return useQuery({
    queryKey: ['appointments', page],
    queryFn: async () => {
      if (!isSupabaseConfigured()) {
        await new Promise(res => setTimeout(res, 500));
        return { data: [], count: 0, totalPages: 0 };
      }

      const start = (page - 1) * PAGE_SIZE;
      const end = start + PAGE_SIZE - 1;

      const { data, error, count } = await supabase
        .from('appointments')
        .select('*', { count: 'exact' })
        .order('appointment_datetime', { ascending: true }) // Upcoming first
        .range(start, end);

      if (error) throw error;

      return {
        data: (data || []) as Appointment[],
        count: count || 0,
        totalPages: count ? Math.ceil(count / PAGE_SIZE) : 0
      };
    },
    staleTime: 60000,
  });
};

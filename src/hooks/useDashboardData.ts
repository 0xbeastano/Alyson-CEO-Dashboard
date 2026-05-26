import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { mockData } from '../lib/mockData';
import { useFilterStore } from '../lib/store';
import type { CallLog, Lead, Appointment, Followup, DashboardKPIs, DashboardRecentCall, DashboardOpenFollowup } from '../types';

const isSupabaseConfigured = () => {
  return import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_URL.includes('supabase.co');
};

export const useDashboardData = () => {
  const { dateRange, outcome, source } = useFilterStore();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!isSupabaseConfigured()) return;

    const channel = supabase.channel('dashboard-realtime')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'call_logs' }, () => {
        queryClient.invalidateQueries({ queryKey: ['dashboardData'] });
      })
      .on('postgres_changes', { event: '*', schema: 'public', table: 'leads' }, () => {
        queryClient.invalidateQueries({ queryKey: ['dashboardData'] });
      })
      .on('postgres_changes', { event: '*', schema: 'public', table: 'appointments' }, () => {
        queryClient.invalidateQueries({ queryKey: ['dashboardData'] });
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [queryClient]);

  return useQuery({
    queryKey: ['dashboardData', dateRange, outcome, source],
    queryFn: async () => {
      if (!isSupabaseConfigured()) {
        await new Promise(res => setTimeout(res, 800));
        return mockData;
      }

      // Base queries for raw data
      let callsQuery = supabase.from('call_logs').select('created_at, call_outcome').order('created_at', { ascending: false }).limit(200);
      let leadsQuery = supabase.from('leads').select('created_at, qualified, status, customer_name, id').order('created_at', { ascending: false }).limit(100);
      let appointmentsQuery = supabase.from('appointments').select('*').order('appointment_datetime', { ascending: true }).limit(50);
      let followupsQuery = supabase.from('followups').select('created_at, status, followup_type').order('created_at', { ascending: false }).limit(100);

      // Apply Outcome Filter
      if (outcome !== 'all') {
        callsQuery = callsQuery.eq('call_outcome', outcome);
      }

      // Apply Date Filter (basic implementation)
      let dateIso: string | null = null;
      if (dateRange !== 'all') {
        const now = new Date();
        let dateFilter = new Date();
        if (dateRange === '7d') dateFilter.setDate(now.getDate() - 7);
        if (dateRange === '30d') dateFilter.setDate(now.getDate() - 30);
        if (dateRange === 'month') dateFilter.setDate(1);

        dateIso = dateFilter.toISOString();
        callsQuery = callsQuery.gte('created_at', dateIso);
        leadsQuery = leadsQuery.gte('created_at', dateIso);
      }

      const [kpis, recentCalls, openFollowups, calls, leadsRes, appointmentsRes, followupsRes] = await Promise.all([
        supabase.rpc('get_dashboard_kpis', {
          p_date_range: dateIso,
          p_outcome: outcome !== 'all' ? outcome : null,
          p_source: source !== 'all' ? source : null
        }),
        supabase.from('dashboard_recent_calls').select('*'),
        supabase.from('dashboard_open_followups').select('*'),
        callsQuery,
        leadsQuery,
        appointmentsQuery,
        followupsQuery
      ]);

      if (kpis.error) throw kpis.error;
      if (recentCalls.error) throw recentCalls.error;
      if (openFollowups.error) throw openFollowups.error;
      if (calls.error) throw calls.error;
      if (leadsRes.error) throw leadsRes.error;
      if (appointmentsRes.error) throw appointmentsRes.error;
      if (followupsRes.error) throw followupsRes.error;

      return {
        kpis: (kpis.data || {
          total_calls: 0, qualified_leads: 0, appointments_scheduled: 0, 
          callback_requests: 0, not_interested: 0, lead_conversion_rate: 0, average_duration_seconds: 0
        }) as DashboardKPIs,
        recentCalls: (recentCalls.data || []) as DashboardRecentCall[],
        openFollowups: (openFollowups.data || []) as DashboardOpenFollowup[],
        callLogs: (calls.data || []) as CallLog[],
        leads: (leadsRes.data || []) as Lead[],
        appointments: (appointmentsRes.data || []) as Appointment[],
        followups: (followupsRes.data || []) as Followup[]
      };
    },
    // We no longer need polling because of Supabase Realtime!
    staleTime: 60000,
  });
};

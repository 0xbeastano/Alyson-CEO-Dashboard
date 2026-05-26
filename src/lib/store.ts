import { create } from 'zustand';

type DateRange = '7d' | '30d' | 'month' | 'all';
type Outcome = 'all' | 'completed' | 'voicemail' | 'failed' | 'not_interested';
type Source = 'all' | 'inbound' | 'outbound';

interface FilterState {
  dateRange: DateRange;
  outcome: Outcome;
  source: Source;
  setDateRange: (range: DateRange) => void;
  setOutcome: (outcome: Outcome) => void;
  setSource: (source: Source) => void;
}

export const useFilterStore = create<FilterState>((set) => ({
  dateRange: '7d',
  outcome: 'all',
  source: 'all',
  setDateRange: (range) => set({ dateRange: range }),
  setOutcome: (outcome) => set({ outcome: outcome }),
  setSource: (source) => set({ source }),
}));

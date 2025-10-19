import { create } from 'zustand';
import { EntryDraft, RiskOpportunityEntry, SessionMode, SessionState } from '../types';

type SessionStore = {
  session: SessionState;
  entries: RiskOpportunityEntry[];
  addEntry: (draft: EntryDraft) => void;
  setMode: (mode: SessionMode) => void;
  toggleLock: () => void;
  incrementVote: (id: string) => void;
  decrementVote: (id: string) => void;
};

const now = new Date();

const initialState: SessionState = {
  id: 'demo-session',
  title: 'Executive Q4 Risk Workshop',
  code: '482913',
  mode: 'brainstorm',
  isLocked: false,
  isAnonymous: true,
  createdAt: now,
};

const demoEntries: RiskOpportunityEntry[] = [
  {
    id: 'entry-1',
    sessionId: initialState.id,
    type: 'risk',
    title: 'Supply chain disruption',
    description: 'Port backlog could delay hardware shipments by 6+ weeks.',
    impact: 5,
    likelihood: 3,
    owner: 'Logistics',
    category: 'Operations',
    createdAt: now,
    updatedAt: now,
    votes: 3,
  },
  {
    id: 'entry-2',
    sessionId: initialState.id,
    type: 'opportunity',
    title: 'AI-enabled upsell pilot',
    description: 'New assistant can lift cross-sell rate in APAC by 12%.',
    impact: 4,
    likelihood: 4,
    owner: 'Growth',
    category: 'Revenue',
    createdAt: now,
    updatedAt: now,
    votes: 5,
  },
];

export const useSessionStore = create<SessionStore>((set) => ({
  session: initialState,
  entries: demoEntries,
  addEntry: (draft) =>
    set((state) => {
      const timestamp = new Date();
      const entry: RiskOpportunityEntry = {
        id: globalThis.crypto?.randomUUID?.() ?? `entry-${state.entries.length + 1}`,
        sessionId: state.session.id,
        type: draft.type,
        title: draft.title,
        description: draft.description || undefined,
        impact: draft.impact,
        likelihood: draft.likelihood,
        owner: draft.owner || undefined,
        category: draft.category || undefined,
        createdAt: timestamp,
        updatedAt: timestamp,
        votes: 0,
      };

      return {
        entries: [...state.entries, entry],
      };
    }),
  setMode: (mode) =>
    set((state) => ({
      session: {
        ...state.session,
        mode,
      },
    })),
  toggleLock: () =>
    set((state) => ({
      session: {
        ...state.session,
        isLocked: !state.session.isLocked,
      },
    })),
  incrementVote: (id) =>
    set((state) => ({
      entries: state.entries.map((entry) =>
        entry.id === id
          ? { ...entry, votes: entry.votes + 1, updatedAt: new Date() }
          : entry
      ),
    })),
  decrementVote: (id) =>
    set((state) => ({
      entries: state.entries.map((entry) =>
        entry.id === id
          ? { ...entry, votes: Math.max(entry.votes - 1, 0), updatedAt: new Date() }
          : entry
      ),
    })),
}));

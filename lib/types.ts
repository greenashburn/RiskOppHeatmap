export type EntryType = 'risk' | 'opportunity';

export interface RiskOpportunityEntry {
  id: string;
  sessionId: string;
  type: EntryType;
  title: string;
  description?: string;
  impact: number;
  likelihood: number;
  owner?: string;
  category?: string;
  createdAt: Date;
  updatedAt: Date;
  votes: number;
}

export type SessionMode = 'brainstorm' | 'voting' | 'presentation';

export interface SessionState {
  id: string;
  title: string;
  code: string;
  mode: SessionMode;
  isLocked: boolean;
  isAnonymous: boolean;
  createdAt: Date;
}

export interface EntryDraft {
  type: EntryType;
  title: string;
  description: string;
  impact: number;
  likelihood: number;
  owner: string;
  category: string;
}

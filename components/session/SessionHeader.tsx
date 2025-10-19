'use client';

import { useSessionStore } from '../../lib/store/sessionStore';
import { formatDate } from '../../lib/utils';
import { Card, CardDescription, CardTitle } from '../ui/Card';

const modes: { value: 'brainstorm' | 'voting' | 'presentation'; label: string }[] = [
  { value: 'brainstorm', label: 'Brainstorm' },
  { value: 'voting', label: 'Voting' },
  { value: 'presentation', label: 'Presentation' },
];

export function SessionHeader() {
  const { session, setMode, toggleLock } = useSessionStore((state) => ({
    session: state.session,
    setMode: state.setMode,
    toggleLock: state.toggleLock,
  }));

  return (
    <Card className="space-y-5">
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-2">
          <CardTitle>{session.title}</CardTitle>
          <CardDescription>
            Session code <span className="font-mono text-sm text-white">{session.code}</span>
          </CardDescription>
          <p className="text-xs text-slate-400">
            Created {formatDate(session.createdAt)} · {session.isAnonymous ? 'Anonymous' : 'Named'} mode
          </p>
        </div>
        <button
          type="button"
          onClick={toggleLock}
          className="rounded-xl border border-white/10 bg-white/10 px-3 py-2 text-xs font-semibold uppercase tracking-wide text-white transition hover:bg-white/20"
        >
          {session.isLocked ? 'Unlock session' : 'Lock session'}
        </button>
      </div>
      <div className="flex flex-wrap gap-2">
        {modes.map((mode) => {
          const isActive = session.mode === mode.value;
          return (
            <button
              key={mode.value}
              type="button"
              onClick={() => setMode(mode.value)}
              className={`rounded-full px-3 py-1 text-xs font-semibold transition ${
                isActive
                  ? 'bg-sky-500 text-slate-950 shadow'
                  : 'border border-white/10 bg-white/5 text-white hover:bg-white/10'
              }`}
            >
              {mode.label}
            </button>
          );
        })}
      </div>
    </Card>
  );
}

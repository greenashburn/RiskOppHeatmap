'use client';

import { useMemo, useState } from 'react';
import { useSessionStore } from '../../lib/store/sessionStore';
import { RiskOpportunityEntry } from '../../lib/types';
import { Card, CardDescription, CardTitle } from '../ui/Card';
import { cn, formatDate } from '../../lib/utils';

type SortKey = 'impact' | 'likelihood' | 'votes' | 'title';

const headers: { key: SortKey; label: string }[] = [
  { key: 'impact', label: 'Impact' },
  { key: 'likelihood', label: 'Likelihood' },
  { key: 'votes', label: 'Votes' },
  { key: 'title', label: 'Title' },
];

export function EntryList() {
  const entries = useSessionStore((state) => state.entries);
  const [sort, setSort] = useState<{ key: SortKey; direction: 'asc' | 'desc' }>({
    key: 'votes',
    direction: 'desc',
  });

  const sorted = useMemo(() => {
    const items = [...entries];
    items.sort((a, b) => {
      const { key, direction } = sort;
      const directionFactor = direction === 'asc' ? 1 : -1;

      if (key === 'title') {
        return a.title.localeCompare(b.title) * directionFactor;
      }

      return ((a[key] as number) - (b[key] as number)) * directionFactor;
    });
    return items;
  }, [entries, sort]);

  const handleSort = (key: SortKey) => {
    setSort((prev) => ({
      key,
      direction: prev.key === key && prev.direction === 'desc' ? 'asc' : 'desc',
    }));
  };

  return (
    <Card className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <CardTitle>Items ({entries.length})</CardTitle>
          <CardDescription>Prioritize submissions and review key metadata.</CardDescription>
        </div>
      </div>
      <div className="max-h-72 space-y-2 overflow-auto pr-2">
        {sorted.map((entry) => (
          <EntryListRow key={entry.id} entry={entry} />
        ))}
      </div>
      <div className="flex gap-2">
        {headers.map((header) => (
          <button
            key={header.key}
            type="button"
            onClick={() => handleSort(header.key)}
            className={cn(
              'rounded-full border border-white/10 px-3 py-1 text-xs font-semibold text-white hover:bg-white/10',
              sort.key === header.key ? 'bg-white/20' : 'bg-white/5'
            )}
          >
            {header.label}
          </button>
        ))}
      </div>
    </Card>
  );
}

function EntryListRow({ entry }: { entry: RiskOpportunityEntry }) {
  return (
    <div className="rounded-2xl border border-white/5 bg-white/5 p-3">
      <div className="flex items-center justify-between gap-2">
        <div>
          <p className="text-sm font-semibold text-white">{entry.title}</p>
          <p className="text-xs uppercase tracking-wide text-slate-400">
            {entry.type === 'risk' ? 'Risk' : 'Opportunity'} · Impact {entry.impact} · Likelihood {entry.likelihood}
          </p>
        </div>
        <span className="rounded-full bg-slate-900/70 px-2 py-1 text-xs font-semibold text-slate-100">
          {entry.votes} votes
        </span>
      </div>
      {entry.description ? <p className="mt-2 text-xs text-slate-300">{entry.description}</p> : null}
      <div className="mt-2 flex flex-wrap items-center gap-2 text-[10px] uppercase tracking-wide text-slate-500">
        {entry.owner ? <span className="rounded-full bg-white/10 px-2 py-1">Owner: {entry.owner}</span> : null}
        {entry.category ? <span className="rounded-full bg-white/10 px-2 py-1">Category: {entry.category}</span> : null}
        <span className="rounded-full bg-white/10 px-2 py-1">Updated {formatDate(entry.updatedAt)}</span>
      </div>
    </div>
  );
}

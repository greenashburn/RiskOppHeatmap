'use client';

import { FormEvent, useState } from 'react';
import { useSessionStore } from '../../lib/store/sessionStore';
import { EntryDraft, EntryType } from '../../lib/types';
import { Card, CardDescription, CardTitle } from '../ui/Card';

const defaultDraft: EntryDraft = {
  type: 'risk',
  title: '',
  description: '',
  impact: 3,
  likelihood: 3,
  owner: '',
  category: '',
};

export function EntryForm() {
  const addEntry = useSessionStore((state) => state.addEntry);
  const [draft, setDraft] = useState<EntryDraft>(defaultDraft);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    addEntry(draft);
    setDraft({ ...defaultDraft, type: draft.type });
  };

  const handleChange = (field: keyof EntryDraft, value: string) => {
    setDraft((prev) => ({
      ...prev,
      [field]: field === 'impact' || field === 'likelihood' ? Number(value) : value,
    }));
  };

  const handleTypeChange = (value: EntryType) => {
    setDraft((prev) => ({
      ...prev,
      type: value,
    }));
  };

  return (
    <Card className="space-y-4">
      <div className="space-y-1">
        <CardTitle>Quick add</CardTitle>
        <CardDescription>Capture a new idea in seconds and place it on the heatmap.</CardDescription>
      </div>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-3">
          <label className="flex flex-col text-sm text-slate-200">
            Type
            <select
              value={draft.type}
              onChange={(event) => handleTypeChange(event.target.value as EntryType)}
              className="mt-1 rounded-xl border border-white/10 bg-slate-900/70 px-3 py-2 text-sm text-white focus:border-sky-400 focus:outline-none"
            >
              <option value="risk">Risk</option>
              <option value="opportunity">Opportunity</option>
            </select>
          </label>
          <label className="flex flex-col text-sm text-slate-200">
            Category
            <input
              value={draft.category}
              onChange={(event) => handleChange('category', event.target.value)}
              placeholder="Operations, Revenue..."
              className="mt-1 rounded-xl border border-white/10 bg-slate-900/70 px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:border-sky-400 focus:outline-none"
            />
          </label>
        </div>
        <label className="flex flex-col text-sm text-slate-200">
          Title
          <input
            value={draft.title}
            onChange={(event) => handleChange('title', event.target.value)}
            required
            minLength={3}
            placeholder="Concise summary"
            className="mt-1 rounded-xl border border-white/10 bg-slate-900/70 px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:border-sky-400 focus:outline-none"
          />
        </label>
        <label className="flex flex-col text-sm text-slate-200">
          Description
          <textarea
            value={draft.description}
            onChange={(event) => handleChange('description', event.target.value)}
            rows={3}
            placeholder="Why it matters, what might happen..."
            className="mt-1 rounded-xl border border-white/10 bg-slate-900/70 px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:border-sky-400 focus:outline-none"
          />
        </label>
        <div className="grid grid-cols-2 gap-3">
          <label className="flex flex-col text-sm text-slate-200">
            Impact
            <input
              type="range"
              min={1}
              max={5}
              value={draft.impact}
              onChange={(event) => handleChange('impact', event.target.value)}
              className="mt-2 accent-sky-400"
            />
            <span className="mt-1 text-xs text-slate-400">{draft.impact} / 5</span>
          </label>
          <label className="flex flex-col text-sm text-slate-200">
            Likelihood
            <input
              type="range"
              min={1}
              max={5}
              value={draft.likelihood}
              onChange={(event) => handleChange('likelihood', event.target.value)}
              className="mt-2 accent-emerald-400"
            />
            <span className="mt-1 text-xs text-slate-400">{draft.likelihood} / 5</span>
          </label>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <label className="flex flex-col text-sm text-slate-200">
            Owner
            <input
              value={draft.owner}
              onChange={(event) => handleChange('owner', event.target.value)}
              placeholder="Team or person"
              className="mt-1 rounded-xl border border-white/10 bg-slate-900/70 px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:border-sky-400 focus:outline-none"
            />
          </label>
          <div className="flex flex-col justify-end">
            <button
              type="submit"
              className="w-full rounded-xl bg-sky-500 px-3 py-2 text-sm font-semibold text-slate-950 transition hover:bg-sky-400"
            >
              Add to heatmap
            </button>
          </div>
        </div>
      </form>
    </Card>
  );
}

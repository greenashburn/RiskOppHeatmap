import { EntryForm } from '../components/forms/EntryForm';
import { EntryList } from '../components/entries/EntryList';
import { HeatmapGrid } from '../components/heatmap/HeatmapGrid';
import { SessionHeader } from '../components/session/SessionHeader';

export default function HomePage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-6xl flex-col gap-6 px-4 py-8 sm:px-6 lg:px-8">
      <header className="space-y-6">
        <div className="rounded-full border border-sky-500/30 bg-sky-500/10 px-4 py-2 text-xs uppercase tracking-[0.3em] text-sky-300">
          MVP Workshop Preview
        </div>
        <h1 className="text-4xl font-bold leading-tight text-white sm:text-5xl">
          Real-time risk & opportunity alignment
        </h1>
        <p className="max-w-2xl text-lg text-slate-300">
          Host interactive working sessions where teams capture emerging risks, elevate new opportunities, and
          prioritize actions together. This MVP showcases the live heatmap experience, quick add workflow, and
          facilitator controls.
        </p>
      </header>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[380px_1fr]">
        <div className="space-y-6">
          <SessionHeader />
          <EntryForm />
        </div>
        <div className="flex flex-col gap-6">
          <div className="h-[420px] rounded-3xl bg-gradient-to-br from-slate-900/80 via-slate-900/40 to-slate-800/40 p-1">
            <div className="h-full rounded-[26px] border border-white/10 bg-slate-950/80 p-6">
              <HeatmapGrid />
            </div>
          </div>
          <EntryList />
        </div>
      </div>
    </main>
  );
}

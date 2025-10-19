'use client';

import {
  CartesianGrid,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { useMemo } from 'react';
import { useSessionStore } from '../../lib/store/sessionStore';
import { RiskOpportunityEntry } from '../../lib/types';
import { formatDate } from '../../lib/utils';

const axisTicks = [1, 2, 3, 4, 5];

type ScatterDatum = RiskOpportunityEntry & { color: string; shape: 'triangle' | 'circle' };

const colorMap: Record<string, string> = {
  risk: '#F97316',
  opportunity: '#22D3EE',
};

const shapeMap: Record<string, 'triangle' | 'circle'> = {
  risk: 'triangle',
  opportunity: 'circle',
};

function mapEntries(entries: RiskOpportunityEntry[]): ScatterDatum[] {
  return entries.map((entry) => ({
    ...entry,
    color:
      entry.type === 'risk'
        ? entry.impact >= 4 && entry.likelihood >= 4
          ? '#F87171'
          : colorMap[entry.type]
        : entry.impact >= 4 && entry.likelihood >= 4
          ? '#38BDF8'
          : colorMap[entry.type],
    shape: shapeMap[entry.type],
  }));
}

export function HeatmapGrid() {
  const entries = useSessionStore((state) => state.entries);

  const data = useMemo(() => mapEntries(entries), [entries]);

  return (
    <div className="flex h-full flex-1 flex-col">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-white">Impact × Likelihood</h2>
        <div className="flex items-center gap-3 text-xs text-slate-300">
          <span className="inline-flex items-center gap-1">
            <span className="h-2.5 w-2.5 rounded-full bg-[#F97316]" /> Risk
          </span>
          <span className="inline-flex items-center gap-1">
            <span className="h-2.5 w-2.5 rounded-full bg-[#22D3EE]" /> Opportunity
          </span>
        </div>
      </div>
      <div className="relative mt-4 flex-1 rounded-2xl border border-white/10 bg-slate-900/60 p-4">
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
            <CartesianGrid stroke="rgba(255,255,255,0.08)" />
            <XAxis
              type="number"
              dataKey="impact"
              name="Impact"
              domain={[1, 5]}
              ticks={axisTicks}
              tickLine={false}
              axisLine={{ stroke: 'rgba(255,255,255,0.15)' }}
              stroke="#cbd5f5"
            />
            <YAxis
              type="number"
              dataKey="likelihood"
              name="Likelihood"
              domain={[1, 5]}
              ticks={axisTicks}
              tickLine={false}
              axisLine={{ stroke: 'rgba(255,255,255,0.15)' }}
              stroke="#cbd5f5"
            />
            <Tooltip content={<HeatmapTooltip />} cursor={{ strokeDasharray: '3 3' }} />
            <Scatter
              name="Entries"
              data={data}
              fill="#38BDF8"
              shape={(props) => <HeatmapMarker {...props} />}
            />
          </ScatterChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

type HeatmapMarkerProps = {
  cx?: number;
  cy?: number;
  payload?: ScatterDatum;
};

function HeatmapMarker({ cx = 0, cy = 0, payload }: HeatmapMarkerProps) {
  if (!payload) return null;
  const size = 12 + payload.votes * 1.5;
  const isRisk = payload.type === 'risk';

  if (isRisk) {
    const points = [
      `${cx},${cy - size}`,
      `${cx - size},${cy + size}`,
      `${cx + size},${cy + size}`,
    ].join(' ');

    return (
      <g>
        <polygon points={points} fill={payload.color} opacity={0.9} />
        <text
          x={cx}
          y={cy + size + 12}
          textAnchor="middle"
          className="fill-slate-200 text-[10px]"
        >
          {payload.votes}
        </text>
      </g>
    );
  }

  return (
    <g>
      <circle cx={cx} cy={cy} r={size} fill={payload.color} opacity={0.85} />
      <text x={cx} y={cy + size + 12} textAnchor="middle" className="fill-slate-200 text-[10px]">
        {payload.votes}
      </text>
    </g>
  );
}

function HeatmapTooltip({ active, payload }: any) {
  if (!active || !payload?.length) return null;

  const item = payload[0].payload as ScatterDatum;

  return (
    <div className="min-w-[220px] rounded-xl border border-white/10 bg-slate-900/90 p-3 text-sm text-white shadow-xl">
      <p className="font-semibold">{item.title}</p>
      <p className="text-xs text-slate-300">{item.type === 'risk' ? 'Risk' : 'Opportunity'}</p>
      <dl className="mt-2 space-y-1 text-xs text-slate-200">
        <div className="flex justify-between">
          <dt className="text-slate-400">Impact</dt>
          <dd>{item.impact}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-slate-400">Likelihood</dt>
          <dd>{item.likelihood}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-slate-400">Votes</dt>
          <dd>{item.votes}</dd>
        </div>
      </dl>
      {item.description ? (
        <p className="mt-2 text-xs text-slate-300">{item.description}</p>
      ) : null}
      <p className="mt-2 text-[10px] uppercase tracking-wide text-slate-500">
        Updated {formatDate(item.updatedAt)}
      </p>
    </div>
  );
}

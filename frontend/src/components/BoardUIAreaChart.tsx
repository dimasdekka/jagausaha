import React, { useState } from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
} from 'recharts';
import { AlertTriangle } from 'lucide-react';

interface ChartDataPoint {
  day: number;
  label: string;
  baseline: number;
  scenario?: number;
}

interface BoardUIAreaChartProps {
  days: number[];
  baseline: number[];
  scenario?: number[];
  insolvencyDay?: number | null;
  scenarioName?: string;
  safetyBuffer?: number;
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const baseVal = payload.find((p: any) => p.dataKey === 'baseline')?.value;
    const scenVal = payload.find((p: any) => p.dataKey === 'scenario')?.value;
    const isDeficit = scenVal !== undefined && scenVal < 0;

    return (
      <div className="rounded-xl border border-neutral-200 bg-white/95 p-3 shadow-xl backdrop-blur-md text-xs font-sans">
        <div className="flex items-center justify-between gap-4 pb-2 mb-2 border-b border-neutral-100">
          <span className="font-semibold text-neutral-800">{label}</span>
          {isDeficit && (
            <span className="px-1.5 py-0.5 rounded bg-rose-50 text-rose-700 text-[10px] font-medium border border-rose-200">
              Defisit Kas
            </span>
          )}
        </div>
        <div className="space-y-1.5 font-mono text-[11px]">
          <div className="flex items-center justify-between gap-4">
            <span className="text-neutral-500 flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-emerald-600" />
              Baseline
            </span>
            <span className="font-medium text-neutral-900 tabular-nums">
              Rp {baseVal?.toLocaleString('id-ID')}
            </span>
          </div>
          {scenVal !== undefined && (
            <div className="flex items-center justify-between gap-4">
              <span className="text-neutral-500 flex items-center gap-1.5">
                <span className={`h-2 w-2 rounded-full ${isDeficit ? 'bg-rose-600' : 'bg-amber-500'}`} />
                Simulasi
              </span>
              <span className={`font-semibold tabular-nums ${isDeficit ? 'text-rose-600' : 'text-neutral-900'}`}>
                Rp {scenVal?.toLocaleString('id-ID')}
              </span>
            </div>
          )}
        </div>
      </div>
    );
  }
  return null;
};

export const BoardUIAreaChart: React.FC<BoardUIAreaChartProps> = ({
  days,
  baseline,
  scenario,
  insolvencyDay,
  scenarioName = 'Simulasi',
  safetyBuffer = 3000000,
}) => {
  const [horizon, setHorizon] = useState<number>(30); // 7, 14, or 30 days

  // Slice data based on selected horizon
  const sliceCount = Math.min(horizon + 1, days.length);
  const chartData: ChartDataPoint[] = [];

  for (let i = 0; i < sliceCount; i++) {
    chartData.push({
      day: days[i],
      label: `Hari ${days[i]}`,
      baseline: baseline[i],
      scenario: scenario ? scenario[i] : undefined,
    });
  }

  const formatYAxis = (val: number) => {
    if (Math.abs(val) >= 1_000_000) {
      return `${(val / 1_000_000).toFixed(0)}M`;
    }
    return `${(val / 1_000).toFixed(0)}k`;
  };

  return (
    <div className="w-full rounded-2xl border border-neutral-200/90 bg-white p-6 shadow-sm">
      {/* Chart Header & Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-5 border-b border-neutral-100">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-base font-semibold text-neutral-900 tracking-tight">
              Proyeksi Arus Kas Multi-Horizon
            </h3>
            {insolvencyDay && (
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-rose-700 bg-rose-50 border border-rose-200 px-2.5 py-0.5 rounded-full">
                <AlertTriangle className="h-3 w-3" />
                Defisit H+{insolvencyDay}
              </span>
            )}
          </div>
          <p className="text-xs text-neutral-500 mt-0.5">
            Komparasi saldo kas berjalan terhadap skenario belanja modal ({scenarioName}).
          </p>
        </div>

        {/* BoardUI Horizon Switcher */}
        <div className="flex items-center rounded-lg border border-neutral-200 bg-neutral-50 p-1 text-xs font-medium">
          {[7, 14, 30].map((h) => (
            <button
              key={h}
              onClick={() => setHorizon(h)}
              className={`px-3 py-1 rounded-md transition-all ${
                horizon === h
                  ? 'bg-white text-neutral-900 shadow-sm font-semibold'
                  : 'text-neutral-500 hover:text-neutral-900'
              }`}
            >
              {h} Hari
            </button>
          ))}
        </div>
      </div>

      {/* Main Recharts Area */}
      <div className="h-72 w-full pt-4">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
            <defs>
              <linearGradient id="boarduiBaselineGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10B981" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#10B981" stopOpacity={0.0} />
              </linearGradient>
              <linearGradient id="boarduiScenarioGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={insolvencyDay ? '#E11D48' : '#F59E0B'} stopOpacity={0.25} />
                <stop offset="95%" stopColor={insolvencyDay ? '#E11D48' : '#F59E0B'} stopOpacity={0.0} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />

            <XAxis
              dataKey="day"
              tickFormatter={(d) => `H+${d}`}
              tickLine={false}
              axisLine={false}
              stroke="#94A3B8"
              fontSize={11}
              dy={6}
            />

            <YAxis
              tickFormatter={formatYAxis}
              tickLine={false}
              axisLine={false}
              stroke="#94A3B8"
              fontSize={11}
              domain={['auto', 'auto']}
            />

            <Tooltip content={<CustomTooltip />} />

            {/* Redline Danger Boundary (Rp 0) */}
            <ReferenceLine
              y={0}
              stroke="#E11D48"
              strokeDasharray="4 4"
              strokeWidth={1.5}
              label={{
                value: 'Batas Kritis (Rp 0)',
                position: 'insideBottomLeft',
                fill: '#E11D48',
                fontSize: 11,
                fontWeight: 600,
                dx: 10,
              }}
            />

            {/* Safety Buffer (Rp 3M) */}
            <ReferenceLine
              y={safetyBuffer}
              stroke="#059669"
              strokeDasharray="2 4"
              strokeWidth={1}
              strokeOpacity={0.7}
              label={{
                value: 'Buffer Aman (Rp 3M)',
                position: 'insideTopRight',
                fill: '#059669',
                fontSize: 11,
                fontWeight: 600,
                dx: -10,
              }}
            />

            {/* Baseline Area */}
            <Area
              type="monotone"
              dataKey="baseline"
              name="Kas Berjalan"
              stroke="#10B981"
              strokeWidth={2.2}
              fillOpacity={1}
              fill="url(#boarduiBaselineGrad)"
            />

            {/* Scenario Area */}
            {scenario && (
              <Area
                type="monotone"
                dataKey="scenario"
                name={scenarioName}
                stroke={insolvencyDay ? '#E11D48' : '#F59E0B'}
                strokeWidth={2.5}
                fillOpacity={1}
                fill="url(#boarduiScenarioGrad)"
              />
            )}
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Clean Legend Bar */}
      <div className="flex items-center justify-between pt-4 mt-2 border-t border-neutral-100 text-xs text-neutral-500 font-sans">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-600" />
            <span className="text-neutral-700 font-medium">Kas Berjalan Normal</span>
          </span>
          {scenario && (
            <span className="flex items-center gap-1.5">
              <span className={`h-2.5 w-2.5 rounded-full ${insolvencyDay ? 'bg-rose-600' : 'bg-amber-500'}`} />
              <span className={insolvencyDay ? 'text-rose-700 font-semibold' : 'text-amber-700 font-medium'}>
                {scenarioName}
              </span>
            </span>
          )}
        </div>
        <span className="text-[11px] text-neutral-400 font-mono hidden sm:inline">
          Garis putus merah = Batas defisit kas Rp 0
        </span>
      </div>
    </div>
  );
};

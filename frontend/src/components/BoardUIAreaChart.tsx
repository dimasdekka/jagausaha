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
      <div className="rounded-xl border border-neutral-200 bg-white/95 p-3.5 shadow-lg backdrop-blur-sm text-xs font-sans">
        <div className="flex items-center justify-between gap-4 pb-2 mb-2 border-b border-neutral-100">
          <span className="font-semibold text-neutral-900">{label}</span>
          {isDeficit && (
            <span className="text-[10px] font-mono font-medium text-rose-700 bg-rose-50 border border-rose-200 px-1.5 py-0.5 rounded">
              Defisit
            </span>
          )}
        </div>
        <div className="space-y-1.5 font-mono text-[11px]">
          <div className="flex items-center justify-between gap-4">
            <span className="text-neutral-500">Kas Berjalan</span>
            <span className="font-medium text-neutral-900 tabular-nums">
              Rp {baseVal?.toLocaleString('id-ID')}
            </span>
          </div>
          {scenVal !== undefined && (
            <div className="flex items-center justify-between gap-4">
              <span className="text-neutral-500">Setelah Pengeluaran</span>
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
  const [horizon, setHorizon] = useState<number>(30); // 14 or 30 days

  const sliceCount = Math.min(horizon + 1, days.length);
  const chartData: ChartDataPoint[] = [];

  for (let i = 0; i < sliceCount; i++) {
    chartData.push({
      day: days[i],
      label: `Hari ke-${days[i]}`,
      baseline: baseline[i],
      scenario: scenario ? scenario[i] : undefined,
    });
  }

  const formatYAxis = (val: number) => {
    if (Math.abs(val) >= 1_000_000) {
      return `${(val / 1_000_000).toFixed(0)} Jt`;
    }
    return `${(val / 1_000).toFixed(0)}k`;
  };

  return (
    <div className="w-full rounded-2xl border border-neutral-200/90 bg-white p-6 shadow-sm flex flex-col justify-between h-full">
      {/* Chart Header & Horizon Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-neutral-100">
        <div>
          <h3 className="text-base font-semibold text-neutral-950 tracking-tight">
            Proyeksi Arus Kas
          </h3>
          <p className="text-xs text-neutral-500 mt-0.5">
            Perbandingan saldo kas normal dengan skenario {scenarioName}
          </p>
        </div>

        {/* Quiet Minimal Horizon Tabs */}
        <div className="flex items-center rounded-full border border-neutral-200 bg-neutral-50 p-0.5 text-xs font-medium">
          {[14, 30].map((h) => (
            <button
              key={h}
              onClick={() => setHorizon(h)}
              className={`px-3 py-1 rounded-full transition-all ${
                horizon === h
                  ? 'bg-white text-neutral-950 shadow-sm font-semibold'
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
          <AreaChart data={chartData} margin={{ top: 12, right: 12, left: -10, bottom: 0 }}>
            <defs>
              <linearGradient id="cleanBaselineGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#4B5563" stopOpacity={0.12} />
                <stop offset="95%" stopColor="#4B5563" stopOpacity={0.0} />
              </linearGradient>
              <linearGradient id="cleanScenarioGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={insolvencyDay ? '#DC2626' : '#059669'} stopOpacity={0.15} />
                <stop offset="95%" stopColor={insolvencyDay ? '#DC2626' : '#059669'} stopOpacity={0.0} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />

            <XAxis
              dataKey="day"
              tickFormatter={(d) => `H+${d}`}
              tickLine={false}
              axisLine={false}
              stroke="#9CA3AF"
              fontSize={11}
              dy={6}
            />

            <YAxis
              tickFormatter={formatYAxis}
              tickLine={false}
              axisLine={false}
              stroke="#9CA3AF"
              fontSize={11}
              domain={['auto', 'auto']}
            />

            <Tooltip content={<CustomTooltip />} />

            {/* Zero Deficit Reference Line */}
            <ReferenceLine
              y={0}
              stroke="#9CA3AF"
              strokeDasharray="3 3"
              strokeWidth={1}
              label={{
                value: 'Batas Defisit (Rp 0)',
                position: 'insideBottomRight',
                fill: '#9CA3AF',
                fontSize: 10,
                fontWeight: 500,
              }}
            />

            {/* Safety Buffer Reference Line */}
            <ReferenceLine
              y={safetyBuffer}
              stroke="#D1D5DB"
              strokeDasharray="2 3"
              strokeWidth={1}
              label={{
                value: 'Buffer Cadangan',
                position: 'insideTopRight',
                fill: '#9CA3AF',
                fontSize: 10,
                fontWeight: 500,
              }}
            />

            {/* Baseline Area */}
            <Area
              type="monotone"
              dataKey="baseline"
              name="Kas Berjalan Normal"
              stroke="#4B5563"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#cleanBaselineGrad)"
            />

            {/* Scenario Area */}
            {scenario && (
              <Area
                type="monotone"
                dataKey="scenario"
                name={scenarioName}
                stroke={insolvencyDay ? '#DC2626' : '#059669'}
                strokeWidth={2.2}
                fillOpacity={1}
                fill="url(#cleanScenarioGrad)"
              />
            )}
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Clean Quiet Legend */}
      <div className="flex items-center justify-between pt-4 mt-2 border-t border-neutral-100 text-xs text-neutral-500">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-neutral-600" />
            <span className="text-neutral-700 font-medium">Kas Berjalan Normal</span>
          </span>
          {scenario && (
            <span className="flex items-center gap-1.5">
              <span className={`h-2 w-2 rounded-full ${insolvencyDay ? 'bg-rose-600' : 'bg-emerald-600'}`} />
              <span className="text-neutral-900 font-medium">
                Setelah Pengeluaran
              </span>
            </span>
          )}
        </div>
        <span className="text-[11px] text-neutral-400 hidden sm:inline font-mono">
          Garis putus-putus = Batas defisit Rp 0
        </span>
      </div>
    </div>
  );
};

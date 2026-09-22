import React, { useState } from 'react';
import {
  ResponsiveContainer,
  ComposedChart,
  Area,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
} from 'recharts';
import { Tabs, TabsList, TabsTrigger } from './motion/tabs';

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
            <span className="text-[10px] font-medium text-rose-700 bg-rose-50 border border-rose-200 px-1.5 py-0.5 rounded">
              Defisit Kas
            </span>
          )}
        </div>
        <div className="space-y-1.5 text-[11px]">
          <div className="flex items-center justify-between gap-4">
            <span className="text-neutral-500">Kas Normal</span>
            <span className="font-medium text-neutral-900 tabular-nums">
              Rp {baseVal?.toLocaleString('id-ID')}
            </span>
          </div>
          {scenVal !== undefined && (
            <div className="flex items-center justify-between gap-4">
              <span className="text-neutral-500">Setelah Belanja</span>
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

  // Smooth daily points starting from Day 1
  const chartData: ChartDataPoint[] = [];
  const maxDay = Math.min(horizon, days.length - 1);

  for (let i = 1; i <= maxDay; i++) {
    chartData.push({
      day: i,
      label: `Hari ke-${i}`,
      baseline: baseline[i] !== undefined ? baseline[i] : baseline[baseline.length - 1],
      scenario: scenario && scenario[i] !== undefined ? scenario[i] : undefined,
    });
  }

  // Explicit, evenly spaced X-axis ticks
  const xTicks = horizon === 14 ? [1, 3, 7, 10, 14] : [1, 5, 10, 15, 20, 25, 30];

  // Clean uniform Y-axis ticks in 5 Juta increments
  const yTicks = [-5000000, 0, 5000000, 10000000, 15000000, 20000000, 25000000];

  const formatYAxis = (val: number) => {
    if (val === 0) return 'Rp 0';
    if (Math.abs(val) >= 1_000_000) {
      return `${val / 1_000_000} Jt`;
    }
    return `${val}`;
  };

  return (
    <div className="w-full rounded-2xl border border-neutral-200/90 bg-white p-6 shadow-sm flex flex-col justify-between h-full">
      {/* Chart Header & Horizon Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-neutral-100">
        <div>
          <h3 className="text-base font-semibold text-neutral-950 tracking-tight">
            Proyeksi Arus Kas Operasional
          </h3>
          <p className="text-xs text-neutral-500 mt-0.5 font-normal">
            Kurva pergerakan kas harian terhadap jadwal pengeluaran wajib
          </p>
        </div>

        {/* beUI Motion Horizon Tabs with Spring Gliding Indicator */}
        <Tabs
          value={String(horizon)}
          onValueChange={(val) => setHorizon(Number(val))}
          variant="pill"
        >
          <TabsList>
            <TabsTrigger value="14">14 Hari</TabsTrigger>
            <TabsTrigger value="30">30 Hari</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Main Recharts Area with Silky Smooth Continuous Curves */}
      <div className="h-72 w-full pt-4">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={chartData} margin={{ top: 12, right: 20, left: 10, bottom: 4 }}>
            <defs>
              <linearGradient id="smoothScenarioGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={insolvencyDay ? '#E11D48' : '#10B981'} stopOpacity={0.15} />
                <stop offset="95%" stopColor={insolvencyDay ? '#E11D48' : '#10B981'} stopOpacity={0.0} />
              </linearGradient>
            </defs>

            {/* Subtle horizontal grid lines */}
            <CartesianGrid vertical={false} stroke="#E5E7EB" strokeDasharray="4 4" strokeOpacity={0.6} />

            <XAxis
              dataKey="day"
              ticks={xTicks}
              tickFormatter={(d) => `H+${d}`}
              tickLine={false}
              axisLine={{ stroke: '#E5E7EB' }}
              stroke="#9CA3AF"
              fontSize={11}
              dy={6}
            />

            <YAxis
              ticks={yTicks}
              domain={[-5000000, 25000000]}
              tickFormatter={formatYAxis}
              tickLine={false}
              axisLine={{ stroke: '#E5E7EB' }}
              stroke="#9CA3AF"
              fontSize={11}
            />

            <Tooltip content={<CustomTooltip />} />

            {/* Subtle Zero Deficit Line */}
            <ReferenceLine
              y={0}
              stroke="#F43F5E"
              strokeDasharray="4 4"
              strokeWidth={1.2}
            />

            {/* Subtle Safety Buffer Line */}
            <ReferenceLine
              y={safetyBuffer}
              stroke="#10B981"
              strokeDasharray="3 3"
              strokeWidth={1}
              strokeOpacity={0.5}
            />

            {/* Baseline Cash: Silky smooth natural curve */}
            <Line
              type="natural"
              dataKey="baseline"
              name="Kas Berjalan Normal"
              stroke="#64748B"
              strokeWidth={2}
              dot={false}
              isAnimationActive={false}
            />

            {/* Scenario Cash: Silky smooth natural curve with soft gradient fill */}
            {scenario && (
              <Area
                type="natural"
                dataKey="scenario"
                name={scenarioName}
                stroke={insolvencyDay ? '#E11D48' : '#10B981'}
                strokeWidth={2.5}
                fillOpacity={1}
                fill="url(#smoothScenarioGrad)"
                dot={false}
                isAnimationActive={false}
              />
            )}
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* Clean Single-Line Legend */}
      <div className="flex flex-wrap items-center justify-between pt-4 mt-2 border-t border-neutral-100 text-xs text-neutral-600 gap-2">
        <div className="flex items-center gap-6">
          <span className="flex items-center gap-2 whitespace-nowrap">
            <span className="w-3.5 h-1 bg-slate-400 rounded-full shrink-0" />
            <span className="text-neutral-600 whitespace-nowrap">Kas Berjalan</span>
          </span>
          {scenario && (
            <span className="flex items-center gap-2 whitespace-nowrap">
              <span className={`w-3.5 h-1 rounded-full shrink-0 ${insolvencyDay ? 'bg-rose-600' : 'bg-emerald-600'}`} />
              <span className="text-neutral-900 font-medium whitespace-nowrap">
                Setelah Belanja
              </span>
            </span>
          )}
        </div>

        <span className="text-neutral-400 text-xs whitespace-nowrap">
          Jadwal: Gaji H+6 · Tempo H+11
        </span>
      </div>
    </div>
  );
};

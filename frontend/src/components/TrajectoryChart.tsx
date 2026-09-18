import React, { useState } from 'react';

interface TrajectoryChartProps {
  days: number[];
  baseline: number[];
  scenario?: number[];
  insolvencyDay?: number | null;
  scenarioName?: string;
  safetyBuffer?: number;
}

export const TrajectoryChart: React.FC<TrajectoryChartProps> = ({
  days,
  baseline,
  scenario,
  insolvencyDay,
  scenarioName,
  safetyBuffer = 3000000,
}) => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  if (!days || days.length === 0) return null;

  const allValues = [...baseline, ...(scenario || [])];
  const minVal = Math.min(...allValues, -2000000);
  const maxVal = Math.max(...allValues, 20000000);
  const range = maxVal - minVal || 1;

  const width = 680;
  const height = 260;
  const padLeft = 65;
  const padRight = 20;
  const padTop = 24;
  const padBottom = 36;

  const plotW = width - padLeft - padRight;
  const plotH = height - padTop - padBottom;

  const getX = (i: number) => padLeft + (i / (days.length - 1)) * plotW;
  const getY = (val: number) => padTop + plotH - ((val - minVal) / range) * plotH;

  const zeroY = getY(0);
  const bufferY = getY(safetyBuffer);

  const formatRupiah = (val: number) => {
    if (Math.abs(val) >= 1_000_000) {
      return `${(val / 1_000_000).toFixed(1)}M`;
    }
    return `${(val / 1_000).toFixed(0)}k`;
  };

  const toSvgPath = (points: number[]) => {
    return points
      .map((val, i) => `${i === 0 ? 'M' : 'L'} ${getX(i).toFixed(1)} ${getY(val).toFixed(1)}`)
      .join(' ');
  };

  const toAreaPath = (points: number[]) => {
    const linePath = toSvgPath(points);
    const bottomY = padTop + plotH;
    return `${linePath} L ${getX(points.length - 1).toFixed(1)} ${bottomY} L ${getX(0).toFixed(1)} ${bottomY} Z`;
  };

  return (
    <div className="w-full rounded-2xl border border-neutral-200/80 bg-white p-5 sm:p-6 shadow-card">
      {/* Header Legend */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-4 text-xs font-medium">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
            <span className="text-neutral-700">Kas Berjalan (Baseline)</span>
          </div>
          {scenario && (
            <div className="flex items-center gap-2">
              <span className={`w-2.5 h-2.5 rounded-full ${insolvencyDay ? 'bg-rose-600' : 'bg-amber-500'}`} />
              <span className={insolvencyDay ? 'text-rose-700 font-semibold' : 'text-amber-700'}>
                {scenarioName || 'Simulasi'}
              </span>
            </div>
          )}
        </div>

        {insolvencyDay && (
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-xs font-medium text-rose-700">
            <span className="h-1.5 w-1.5 rounded-full bg-rose-600 animate-ping" />
            <span>Defisit Kas pada Hari ke-{insolvencyDay}</span>
          </div>
        )}
      </div>

      {/* SVG Canvas */}
      <div className="relative w-full overflow-x-auto">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-auto min-w-[500px] overflow-visible select-none"
        >
          <defs>
            <linearGradient id="baselineGradLight" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#10B981" stopOpacity="0.18" />
              <stop offset="100%" stopColor="#10B981" stopOpacity="0.0" />
            </linearGradient>
            <linearGradient id="scenarioDangerGradLight" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#F43F5E" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#F43F5E" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          <line
            x1={padLeft}
            y1={zeroY}
            x2={width - padRight}
            y2={zeroY}
            stroke="#E11D48"
            strokeDasharray="4 4"
            strokeWidth="1.2"
            strokeOpacity="0.7"
          />
          <text x={padLeft - 10} y={zeroY + 3} textAnchor="end" fill="#E11D48" fontSize="10" fontWeight="500" fontFamily="system-ui">
            Rp 0 (Defisit)
          </text>

          <line
            x1={padLeft}
            y1={bufferY}
            x2={width - padRight}
            y2={bufferY}
            stroke="#059669"
            strokeDasharray="2 4"
            strokeWidth="1"
            strokeOpacity="0.4"
          />
          <text x={padLeft - 10} y={bufferY + 3} textAnchor="end" fill="#059669" fontSize="10" fontFamily="system-ui" opacity="0.8">
            Buffer {formatRupiah(safetyBuffer)}
          </text>

          {/* Area Fills */}
          <path d={toAreaPath(baseline)} fill="url(#baselineGradLight)" />
          {scenario && insolvencyDay && (
            <path d={toAreaPath(scenario)} fill="url(#scenarioDangerGradLight)" />
          )}

          {/* Trajectory Lines */}
          <path
            d={toSvgPath(baseline)}
            fill="none"
            stroke="#059669"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {scenario && (
            <path
              d={toSvgPath(scenario)}
              fill="none"
              stroke={insolvencyDay ? '#E11D48' : '#D97706'}
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          )}

          {/* Insolvency Marker */}
          {scenario && insolvencyDay && days[insolvencyDay] !== undefined && (
            <g>
              <circle
                cx={getX(insolvencyDay)}
                y={getY(scenario[insolvencyDay])}
                r="5"
                fill="#E11D48"
                stroke="#FFFFFF"
                strokeWidth="2"
              />
            </g>
          )}

          {/* X-axis labels */}
          {days.map((day, i) => {
            if (i % 5 === 0 || i === days.length - 1) {
              return (
                <text
                  key={day}
                  x={getX(i)}
                  y={height - 8}
                  textAnchor="middle"
                  fill="#94A3B8"
                  fontSize="11"
                  fontFamily="system-ui"
                >
                  H+{day}
                </text>
              );
            }
            return null;
          })}

          {/* Hover hit areas */}
          {days.map((_, i) => (
            <rect
              key={i}
              x={getX(i) - 8}
              y={padTop}
              width={16}
              height={plotH}
              fill="transparent"
              onMouseEnter={() => setHoveredIdx(i)}
              onMouseLeave={() => setHoveredIdx(null)}
              className="cursor-pointer"
            />
          ))}

          {hoveredIdx !== null && (
            <g>
              <line
                x1={getX(hoveredIdx)}
                y1={padTop}
                x2={getX(hoveredIdx)}
                y2={padTop + plotH}
                stroke="#CBD5E1"
                strokeWidth="1"
                strokeDasharray="2 2"
              />
              <circle cx={getX(hoveredIdx)} y={getY(baseline[hoveredIdx])} r="3.5" fill="#059669" />
              {scenario && (
                <circle
                  cx={getX(hoveredIdx)}
                  y={getY(scenario[hoveredIdx])}
                  r="3.5"
                  fill={insolvencyDay ? '#E11D48' : '#D97706'}
                />
              )}
            </g>
          )}
        </svg>

        {hoveredIdx !== null && (
          <div className="absolute top-2 right-2 rounded-xl border border-neutral-200 bg-white/95 px-3 py-2 text-xs shadow-elevated pointer-events-none">
            <p className="text-neutral-500 font-medium mb-1">Hari ke-{days[hoveredIdx]}</p>
            <p className="text-emerald-700 font-semibold">Baseline: Rp {baseline[hoveredIdx].toLocaleString('id-ID')}</p>
            {scenario && (
              <p className={scenario[hoveredIdx] < 0 ? 'text-rose-600 font-semibold' : 'text-amber-700'}>
                Simulasi: Rp {scenario[hoveredIdx].toLocaleString('id-ID')}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

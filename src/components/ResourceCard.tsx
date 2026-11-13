import type { LucideIcon } from 'lucide-react';
import { MAX_CAPACITY } from '../data/scenario';

interface ResourceCardProps {
  label: string;
  unitLabel: string;
  current: number;
  projected: number;
  delta: number;
  threshold: number;
  inverted?: boolean;
  icon: LucideIcon;
  insufficient?: boolean;
}

export function ResourceCard({
  label,
  unitLabel,
  current,
  projected,
  delta,
  threshold,
  inverted = false,
  icon: Icon,
  insufficient = false,
}: ResourceCardProps) {
  const isCritical = inverted ? projected > threshold : projected < threshold;
  const isWarning = inverted
    ? projected > threshold * 0.75 && projected <= threshold
    : projected >= threshold && projected < threshold + 6;

  const barMax = inverted ? threshold : MAX_CAPACITY;
  const currentPct = Math.min(100, Math.max(0, (current / barMax) * 100));
  const projectedPct = Math.min(100, Math.max(0, (projected / barMax) * 100));

  const statusTextColor = insufficient || isCritical
    ? 'text-rose-400'
    : isWarning
      ? 'text-amber-300'
      : 'text-emerald-300';

  const barColor = insufficient || isCritical
    ? 'bg-rose-500'
    : isWarning
      ? 'bg-amber-400'
      : 'bg-emerald-400';

  const deltaFormatted = delta > 0 ? `+${delta}` : `${delta}`;
  const deltaColor =
    delta === 0
      ? 'text-slate-400'
      : inverted
        ? delta > 10
          ? 'text-rose-400'
          : 'text-amber-300'
        : delta > 0
          ? 'text-emerald-400'
          : 'text-amber-300';

  return (
    <div
      className={`rounded border p-3.5 transition-colors ${
        insufficient
          ? 'border-rose-500/60 bg-rose-950/20'
          : 'border-[#526480] bg-[#0B1220]'
      }`}
    >
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 text-slate-300">
          <Icon className="h-4 w-4 text-slate-400" strokeWidth={1.75} />
          <span className="text-sm font-medium tracking-tight">{label}</span>
        </div>
        <span className="text-xs text-slate-400 font-mono-tabular">
          {inverted ? `Máx ${threshold} ${unitLabel}` : `Mín C7: ${threshold} ${unitLabel}`}
        </span>
      </div>

      <div className="mt-2.5 flex items-baseline justify-between gap-2">
        <div className="flex items-baseline gap-1.5">
          <span className="text-2xl font-semibold text-slate-50 font-mono-tabular">
            {current}
          </span>
          <span className="text-xs text-slate-400">{unitLabel}</span>
        </div>

        <div className="flex items-center gap-1.5 text-xs font-mono-tabular">
          <span className={deltaColor}>{deltaFormatted}</span>
          <span className="text-slate-400">→</span>
          <span className={`font-semibold ${statusTextColor}`}>{projected}</span>
        </div>
      </div>

      <div className="mt-2.5 h-1.5 w-full overflow-hidden rounded-full bg-slate-800/90 relative">
        <div
          className="absolute inset-y-0 left-0 bg-slate-600/50 transition-all duration-200"
          style={{ width: `${currentPct}%` }}
        />
        <div
          className={`absolute inset-y-0 left-0 transition-all duration-200 ${barColor}`}
          style={{ width: `${projectedPct}%`, opacity: 0.9 }}
        />
      </div>
    </div>
  );
}

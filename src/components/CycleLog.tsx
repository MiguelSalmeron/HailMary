import { ClipboardList } from 'lucide-react';
import type { CycleLogEntry } from '../engine/types';

interface CycleLogProps {
  history: CycleLogEntry[];
}

export function CycleLog({ history }: CycleLogProps) {
  return (
    <section
      aria-label="Bitácora de decisiones"
      className="rounded-lg border border-slate-800 bg-[#0B1220] p-4"
    >
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <ClipboardList className="h-4 w-4 text-cyan-400" strokeWidth={1.75} />
          <h2 className="text-sm font-semibold text-slate-100">Bitácora de Operaciones</h2>
        </div>
        <span className="text-xs font-mono-tabular text-slate-400">
          {history.length} / 7 ciclos
        </span>
      </div>

      {history.length === 0 ? (
        <p className="mt-3 text-xs text-slate-400 leading-relaxed">
          Sin ciclos ejecutados aún. Configurá los tres subsistemas para iniciar el Ciclo 1 y
          registrar la primera lectura telemétrica.
        </p>
      ) : (
        <div className="mt-3 space-y-2.5 max-h-72 overflow-y-auto pr-1">
          {[...history].reverse().map((entry) => (
            <div
              key={entry.cycle}
              className="rounded border border-slate-800/80 bg-[#060B14]/70 p-2.5 text-xs space-y-1"
            >
              <div className="flex items-center justify-between font-mono-tabular">
                <span className="font-semibold text-cyan-300">CICLO {entry.cycle}</span>
                <span className="text-slate-400">
                  O₂ {entry.after.oxygen} · H₂O {entry.after.water} · Com {entry.after.food} · E{' '}
                  {entry.after.energy} · Rad {entry.after.exposure}
                </span>
              </div>
              <p className="text-slate-200 font-medium">{entry.summary}</p>
              <p className="text-slate-400 leading-snug">{entry.scientificNote}</p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

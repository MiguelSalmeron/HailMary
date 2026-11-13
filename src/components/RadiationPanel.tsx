import { ExternalLink, Radio, ShieldAlert } from 'lucide-react';
import { CYCLE_CONTEXT, MAX_EXPOSURE, NASA_SOURCES } from '../data/scenario';
import type { ProtectionMode } from '../engine/types';

interface RadiationPanelProps {
  cycle: number;
  exposure: number;
  projectedExposure: number;
  protection: ProtectionMode;
}

export function RadiationPanel({
  cycle,
  exposure,
  projectedExposure,
  protection,
}: RadiationPanelProps) {
  const context = CYCLE_CONTEXT[cycle];
  const level = context.radiationLevel;
  const isStormWindow = cycle === 3 || cycle === 4;

  const badgeStyle =
    level === 'solar_event'
      ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
      : level === 'elevated'
        ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
        : 'bg-slate-800 text-cyan-300 border-slate-700';

  const levelLabel =
    level === 'solar_event'
      ? 'Solar Event (SPE Activo)'
      : level === 'elevated'
        ? 'Elevated (Alerta Temprana)'
        : 'Background (Cósmica de Fondo)';

  const withoutShelterPct = Math.min(100, ((exposure + (cycle === 4 ? 35 : 3)) / MAX_EXPOSURE) * 100);
  const withShelterPct = Math.min(100, ((exposure + (cycle === 4 ? 8 : 3)) / MAX_EXPOSURE) * 100);

  return (
    <section
      aria-label="Panel científico de radiación"
      className={`rounded-lg border p-4 ${
        level === 'solar_event'
          ? 'border-rose-500/50 bg-[#140E18]'
          : level === 'elevated'
            ? 'border-amber-500/40 bg-[#12131E]'
            : 'border-slate-800 bg-[#0B1220]'
      }`}
    >
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          {level === 'solar_event' ? (
            <ShieldAlert className="h-4 w-4 text-rose-400" />
          ) : (
            <Radio className="h-4 w-4 text-amber-400" />
          )}
          <h2 className="text-sm font-semibold text-slate-100">
            Monitor Científico de Radiación
          </h2>
        </div>
        <span className={`rounded border px-2.5 py-0.5 text-xs font-medium ${badgeStyle}`}>
          {levelLabel}
        </span>
      </div>

      <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-3 text-xs">
        <div className="rounded border border-slate-800/90 bg-[#060B14]/70 p-2.5">
          <div className="text-slate-400">Exposición acumulada</div>
          <div className="mt-1 flex items-baseline gap-1.5 font-mono-tabular">
            <span className="text-lg font-semibold text-slate-100">{exposure}</span>
            <span className="text-slate-500">→</span>
            <span
              className={`font-semibold ${
                projectedExposure > MAX_EXPOSURE ? 'text-rose-400' : 'text-cyan-300'
              }`}
            >
              {projectedExposure} u
            </span>
            <span className="text-slate-500">/ {MAX_EXPOSURE} máx</span>
          </div>
          <div className="mt-1 text-[11px] text-slate-400">Índice didáctico de simulación</div>
        </div>

        <div className="rounded border border-slate-800/90 bg-[#060B14]/70 p-2.5">
          <div className="text-slate-400">Estado de protección</div>
          <div className="mt-1 text-sm font-semibold text-slate-100">
            {protection === 'shelter' ? 'Shelter Mode (Activo)' : 'Normal Habitat'}
          </div>
          <div className="mt-1 text-[11px] text-slate-400">
            {protection === 'shelter'
              ? 'Mitiga flujo solar; no elimina radiación al 100 %.'
              : 'Sin blindaje reforzado adicional.'}
          </div>
        </div>

        <div className="rounded border border-slate-800/90 bg-[#060B14]/70 p-2.5">
          <div className="text-slate-400">Pronóstico del escenario</div>
          <div className="mt-1 text-slate-200 leading-snug">{context.radiationForecast}</div>
        </div>
      </div>

      {isStormWindow ? (
        <>
          <div className="mt-3 rounded border border-slate-800/80 bg-[#060B14]/60 p-3 space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-300">
              <span>Comparativa ilustrativa en este ciclo (Límite seguro: {MAX_EXPOSURE} u)</span>
            </div>
            <div className="space-y-1.5 text-xs">
              <div>
                <div className="flex justify-between text-slate-400 font-mono-tabular mb-0.5">
                  <span>Con Operación Normal</span>
                  <span>{exposure + (cycle === 4 ? 35 : 3)} u</span>
                </div>
                <div className="h-1.5 w-full rounded-full bg-slate-800 overflow-hidden">
                  <div
                    className={`h-full ${cycle === 4 ? 'bg-rose-500' : 'bg-slate-400'}`}
                    style={{ width: `${withoutShelterPct}%` }}
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-slate-400 font-mono-tabular mb-0.5">
                  <span>Con Protocolo Refugio</span>
                  <span>{exposure + (cycle === 4 ? 8 : 3)} u</span>
                </div>
                <div className="h-1.5 w-full rounded-full bg-slate-800 overflow-hidden">
                  <div className="h-full bg-emerald-400" style={{ width: `${withShelterPct}%` }} />
                </div>
              </div>
            </div>
          </div>

          <p className="mt-3 text-xs leading-relaxed text-slate-400">
            Las partículas energéticas solares pueden aumentar el riesgo de radiación. Los refugios y
            materiales apropiados reducen parte de la exposición, pero la protección depende del tipo y
            energía de la radiación.{' '}
            <a
              href={NASA_SOURCES.shielding.url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-cyan-300 hover:text-cyan-200 underline underline-offset-2"
            >
              NASA Langley Shielding
              <ExternalLink className="h-3 w-3" />
            </a>
          </p>
        </>
      ) : (
        <p className="mt-3 text-xs leading-relaxed text-slate-400">
          Sin eventos solares previstos. La exposición de fondo suma +3 u por ciclo; el límite
          didáctico es {MAX_EXPOSURE} u.
        </p>
      )}
    </section>
  );
}

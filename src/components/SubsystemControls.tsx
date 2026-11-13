import { AlertTriangle, Shield, Sprout, Wind } from 'lucide-react';
import type { CycleDecision, ValidationResult } from '../engine/types';

interface SubsystemControlsProps {
  decision: CycleDecision;
  cropProgress: number;
  cycle: number;
  validation: ValidationResult;
  onChange: (patch: Partial<CycleDecision>) => void;
}

export function SubsystemControls({
  decision,
  cropProgress,
  cycle,
  validation,
  onChange,
}: SubsystemControlsProps) {
  const isStormCycle = cycle === 4;
  const isEarlyWarning = cycle === 3;

  return (
    <section aria-label="Configuración de subsistemas" className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-base font-semibold text-slate-100">
          Subsistemas Operativos — Ciclo {cycle}
        </h2>
        <span className="text-xs text-slate-400">
          Configurá los 3 módulos y revisá la telemetría proyectada antes de ejecutar
        </span>
      </div>

      <div className="grid grid-cols-1 gap-3.5 md:grid-cols-3">
        {/* 1. Soporte Vital (ECLSS) */}
        <div className="rounded-lg border border-slate-800 bg-[#0B1220] p-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-slate-100">
              <Wind className="h-4 w-4 text-cyan-400" strokeWidth={1.75} />
              <h3 className="text-sm font-semibold">1. Soporte Vital (ECLSS)</h3>
            </div>
            <p className="mt-1.5 text-xs leading-relaxed text-slate-400">
              Controla el reciclaje de agua y la generación de oxígeno para la tripulación.
            </p>
          </div>

          <div className="mt-3.5 space-y-2">
            <button
              type="button"
              onClick={() => onChange({ eclss: 'nominal' })}
              aria-pressed={decision.eclss === 'nominal'}
              className={`w-full rounded-md border px-3 py-2.5 text-left transition-colors focus-visible:outline-2 focus-visible:outline-cyan-400 ${
                decision.eclss === 'nominal'
                  ? 'border-cyan-400/70 bg-cyan-950/35 text-slate-50'
                  : 'border-slate-800 bg-[#111A2E]/60 text-slate-300 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Reciclaje Nominal</span>
                <span className="text-xs font-mono-tabular text-cyan-300">+4 O₂ · +3 Agua</span>
              </div>
              <div className="mt-0.5 text-xs font-mono-tabular text-slate-400">Costo: -9 Energía</div>
            </button>

            <button
              type="button"
              onClick={() => onChange({ eclss: 'intensive' })}
              aria-pressed={decision.eclss === 'intensive'}
              className={`w-full rounded-md border px-3 py-2.5 text-left transition-colors focus-visible:outline-2 focus-visible:outline-cyan-400 ${
                decision.eclss === 'intensive'
                  ? 'border-cyan-400/70 bg-cyan-950/35 text-slate-50'
                  : 'border-slate-800 bg-[#111A2E]/60 text-slate-300 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Electrólisis Intensiva</span>
                <span className="text-xs font-mono-tabular text-emerald-300">+18 O₂</span>
              </div>
              <div className="mt-0.5 text-xs font-mono-tabular text-slate-400">
                Costo: -8 Agua · -19 Energía
              </div>
            </button>
          </div>
        </div>

        {/* 2. Invernadero Lunar */}
        <div className="rounded-lg border border-slate-800 bg-[#0B1220] p-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 text-slate-100">
                <Sprout className="h-4 w-4 text-emerald-400" strokeWidth={1.75} />
                <h3 className="text-sm font-semibold">2. Invernadero Lunar</h3>
              </div>
              <span className="rounded bg-slate-800 px-2 py-0.5 text-xs font-mono-tabular text-emerald-300">
                Progreso: {cropProgress}/2
              </span>
            </div>
            <p className="mt-1.5 text-xs leading-relaxed text-slate-400">
              Requiere 2 ciclos activos para cosechar +32 u de alimentos. En espera conserva el progreso.
            </p>
          </div>

          <div className="mt-3.5 space-y-2">
            <button
              type="button"
              onClick={() => onChange({ greenhouse: 'standby' })}
              aria-pressed={decision.greenhouse === 'standby'}
              className={`w-full rounded-md border px-3 py-2.5 text-left transition-colors focus-visible:outline-2 focus-visible:outline-cyan-400 ${
                decision.greenhouse === 'standby'
                  ? 'border-cyan-400/70 bg-cyan-950/35 text-slate-50'
                  : 'border-slate-800 bg-[#111A2E]/60 text-slate-300 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">
                  {cropProgress > 0 ? 'Latencia (Conservar)' : 'En Espera'}
                </span>
                <span className="text-xs font-mono-tabular text-slate-300">0 Agua</span>
              </div>
              <div className="mt-0.5 text-xs font-mono-tabular text-slate-400">
                Costo: -2 Energía · Mantiene {cropProgress}/2
              </div>
            </button>

            <button
              type="button"
              onClick={() => onChange({ greenhouse: 'active' })}
              aria-pressed={decision.greenhouse === 'active'}
              className={`w-full rounded-md border px-3 py-2.5 text-left transition-colors focus-visible:outline-2 focus-visible:outline-cyan-400 ${
                decision.greenhouse === 'active'
                  ? 'border-cyan-400/70 bg-cyan-950/35 text-slate-50'
                  : 'border-slate-800 bg-[#111A2E]/60 text-slate-300 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Cultivo Activo</span>
                <span className="text-xs font-mono-tabular text-emerald-300">
                  {cropProgress === 1 ? '+32 Comida' : 'Avanza 1/2'}
                </span>
              </div>
              <div className="mt-0.5 text-xs font-mono-tabular text-slate-400">
                Costo: -7 Agua · -13 Energía
              </div>
            </button>
          </div>
        </div>

        {/* 3. Protección y Operaciones */}
        <div
          className={`rounded-lg border p-4 flex flex-col justify-between ${
            isStormCycle
              ? 'border-amber-500/50 bg-[#131420]'
              : 'border-slate-800 bg-[#0B1220]'
          }`}
        >
          <div>
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 text-slate-100">
                <Shield
                  className={`h-4 w-4 ${isStormCycle ? 'text-amber-400' : 'text-cyan-400'}`}
                  strokeWidth={1.75}
                />
                <h3 className="text-sm font-semibold">3. Protección y Operaciones</h3>
              </div>
              {(isStormCycle || isEarlyWarning) && (
                <span className="rounded bg-amber-500/20 px-2 py-0.5 text-[11px] font-medium text-amber-300">
                  {isStormCycle ? 'TORMENTA' : 'ALERTA C4'}
                </span>
              )}
            </div>
            <p className="mt-1.5 text-xs leading-relaxed text-slate-400">
              Activar Refugio mitiga tormentas solares, pero reduce margen energético y restringe carga máxima.
            </p>
          </div>

          <div className="mt-3.5 space-y-2">
            <button
              type="button"
              onClick={() => onChange({ protection: 'normal' })}
              aria-pressed={decision.protection === 'normal'}
              className={`w-full rounded-md border px-3 py-2.5 text-left transition-colors focus-visible:outline-2 focus-visible:outline-cyan-400 ${
                decision.protection === 'normal'
                  ? 'border-cyan-400/70 bg-cyan-950/35 text-slate-50'
                  : 'border-slate-800 bg-[#111A2E]/60 text-slate-300 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Operación Normal</span>
                <span className="text-xs font-mono-tabular text-slate-300">
                  {isStormCycle ? '+35 Rad' : '+3 Rad'}
                </span>
              </div>
              <div className="mt-0.5 text-xs font-mono-tabular text-slate-400">
                Costo: 0 Energía adicional
              </div>
            </button>

            <button
              type="button"
              onClick={() => onChange({ protection: 'shelter' })}
              aria-pressed={decision.protection === 'shelter'}
              className={`w-full rounded-md border px-3 py-2.5 text-left transition-colors focus-visible:outline-2 focus-visible:outline-cyan-400 ${
                decision.protection === 'shelter'
                  ? 'border-amber-400/70 bg-amber-950/35 text-slate-50'
                  : 'border-slate-800 bg-[#111A2E]/60 text-slate-300 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Protocolo Refugio</span>
                <span className="text-xs font-mono-tabular text-amber-300">
                  {isStormCycle ? '+8 Rad' : '+3 Rad'}
                </span>
              </div>
              <div className="mt-0.5 text-xs font-mono-tabular text-slate-400">
                Costo: -10 Energía · Restringe carga
              </div>
            </button>
          </div>
        </div>
      </div>

      {!validation.valid && (
        <div
          role="alert"
          className="rounded-lg border border-rose-500/50 bg-rose-950/30 p-3.5 text-sm text-rose-200 flex items-start gap-2.5"
        >
          <AlertTriangle className="h-4 w-4 text-rose-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="font-medium text-rose-100">Configuración no viable para ejecución</p>
            <ul className="list-disc pl-4 text-xs text-rose-200/90 space-y-0.5">
              {validation.reasons.map((reason) => (
                <li key={reason}>{reason}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </section>
  );
}

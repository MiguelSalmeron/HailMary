import { Check, X } from 'lucide-react';
import { END_THRESHOLDS } from '../data/scenario';
import type { CyclePreview, SimulationState } from '../engine/types';

interface CheckItem {
  label: string;
  value: number;
  threshold: number;
  unit?: string;
}

export function ReadinessChecklist({
  state,
  preview,
}: {
  state: SimulationState;
  preview: CyclePreview;
}) {
  if (state.cycle !== 3 && state.cycle !== 7) return null;

  const isFinal = state.cycle === 7;
  const checks: CheckItem[] = isFinal
    ? [
        { label: 'Oxígeno', value: preview.projected.oxygen, threshold: END_THRESHOLDS.oxygen },
        { label: 'Agua', value: preview.projected.water, threshold: END_THRESHOLDS.water },
        { label: 'Alimentos', value: preview.projected.food, threshold: END_THRESHOLDS.food },
        { label: 'Energía', value: preview.projected.energy, threshold: END_THRESHOLDS.energy },
        {
          label: 'Exposición',
          value: preview.projected.exposure,
          threshold: END_THRESHOLDS.exposure,
          unit: 'máx',
        },
      ]
    : [
        { label: 'Energía para el refugio', value: preview.projected.energy, threshold: 10 },
        { label: 'Oxígeno de reserva', value: preview.projected.oxygen, threshold: END_THRESHOLDS.oxygen },
        { label: 'Alimentos', value: preview.projected.food, threshold: END_THRESHOLDS.food },
      ];

  return (
    <section className={`readiness ${isFinal ? 'readiness-final' : 'readiness-storm'}`}>
      <div className="panel-heading">
        <div>
          <h2>{isFinal ? 'Checklist de cierre' : 'Preparación para la tormenta'}</h2>
          <p>
            {isFinal
              ? 'Umbrales mínimos al cerrar el ciclo 7, con la configuración actual.'
              : 'Reservas proyectadas al cerrar el ciclo 3. El refugio consume 10 u en el ciclo 4.'}
          </p>
        </div>
        <span className="panel-tag">{isFinal ? 'C7' : 'C3'}</span>
      </div>
      <ul className="readiness-list">
        {checks.map((item) => {
          const isExposure = item.label === 'Exposición';
          const ok = isExposure ? item.value <= item.threshold : item.value >= item.threshold;
          return (
            <li key={item.label} className={ok ? 'is-ok' : 'is-pending'}>
              {ok ? <Check aria-hidden="true" /> : <X aria-hidden="true" />}
              <span>{item.label}</span>
              <strong>
                {item.value} / {item.threshold} {item.unit ?? 'u'}
              </strong>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

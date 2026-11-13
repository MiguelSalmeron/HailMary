import { AlertTriangle, ShieldAlert, SunDim } from 'lucide-react';
import { CYCLE_CONTEXT } from '../data/scenario';

export function MissionAlert({ cycle }: { cycle: number }) {
  const context = CYCLE_CONTEXT[cycle];
  if (!context?.alertTag) return null;

  const isStorm = cycle === 4;
  const Icon = isStorm ? ShieldAlert : cycle === 6 ? SunDim : AlertTriangle;

  return (
    <section
      className={`mission-alert ${isStorm ? 'mission-alert-critical' : 'mission-alert-warning'}`}
      role={isStorm ? 'alert' : 'status'}
      aria-label={context.alertTag}
    >
      <Icon className="mission-alert-icon" aria-hidden="true" />
      <div>
        <strong>{context.alertTag}</strong>
        <p>
          {isStorm
            ? 'Protocolo Refugio: −10 u de energía y exposición +8 u. Sin refugio: +35 u y riesgo de fallo.'
            : cycle === 3
              ? 'Prepará el Ciclo 4: reservá al menos 10 u de energía para el refugio y margen de O₂ y alimentos.'
              : 'La generación solar cae a +7 u. Administrá las reservas acumuladas para el cierre.'}
        </p>
      </div>
    </section>
  );
}

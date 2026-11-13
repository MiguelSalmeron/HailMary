import { RotateCcw } from 'lucide-react';
import type { SimulationState } from '../engine/types';
import { MissionPatch } from './MissionPatch';

export function CommandBar({
  state,
  onRestart,
}: {
  state: SimulationState;
  onRestart: () => void;
}) {
  const statusLabel =
    state.status === 'victory'
      ? 'Misión cumplida'
      : state.status === 'failed'
        ? 'Misión fallida'
        : 'En operación';

  return (
    <header className="command-bar">
      <div className="command-identity">
        <MissionPatch />
        <div>
          <span className="command-eyebrow">LUNAR OUTPOST ALPHA · POLO SUR</span>
          <strong>NEXUS · Control de misión</strong>
        </div>
      </div>
      <dl className="command-stats">
        <div>
          <dt>Ciclo</dt>
          <dd>{state.cycle}/7</dd>
        </div>
        <div>
          <dt>Tripulación</dt>
          <dd>2/2</dd>
        </div>
        <div>
          <dt>Estado</dt>
          <dd className={state.status === 'in_progress' ? 'status-nominal' : 'status-failed'}>
            {statusLabel}
          </dd>
        </div>
      </dl>
      <button type="button" className="ghost-button" onClick={onRestart} aria-label="Reiniciar misión">
        <RotateCcw className="h-4 w-4" aria-hidden="true" />
        <span>Reiniciar</span>
      </button>
    </header>
  );
}

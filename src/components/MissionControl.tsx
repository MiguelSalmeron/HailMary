import { useState } from 'react';
import { Wind, Droplets, Sprout, Zap, Radio } from 'lucide-react';
import { CYCLE_CONTEXT, END_THRESHOLDS, RESOURCE_LABELS } from '../data/scenario';
import { getCycleBreakdown, previewCycle } from '../engine/simulation';
import type { CycleDecision, ResourceKey, SimulationState } from '../engine/types';
import { ResourceCard } from './ResourceCard';
import { SubsystemControls } from './SubsystemControls';
import { RadiationPanel } from './RadiationPanel';
import { CycleLog } from './CycleLog';
import { CommandBar } from './CommandBar';
import { CycleStepper } from './CycleStepper';
import { MissionAlert } from './MissionAlert';
import { CycleBalance } from './CycleBalance';
import { ReadinessChecklist } from './ReadinessChecklist';

const icons = { oxygen: Wind, water: Droplets, food: Sprout, energy: Zap, exposure: Radio };

export function MissionControl({
  state,
  onExecute,
  onRestart,
}: {
  state: SimulationState;
  onExecute: (decision: CycleDecision) => void;
  onRestart: () => void;
}) {
  const [decision, setDecision] = useState<CycleDecision>({
    eclss: 'nominal',
    greenhouse: 'standby',
    protection: 'normal',
  });
  const preview = previewCycle(state, decision);
  const breakdown = getCycleBreakdown(state, decision);
  const context = CYCLE_CONTEXT[state.cycle];
  const isViable = preview.validation.valid && !preview.survivalWarning;

  return (
    <>
      <CommandBar state={state} onRestart={onRestart} />
      <CycleStepper state={state} />
      <MissionAlert cycle={state.cycle} />
      <p aria-live="polite" className="mission-last-result">
        {state.history.at(-1)?.summary ?? 'Configurá los subsistemas para iniciar la misión.'}
      </p>

      <section className="cycle-context">
        <span className="cycle-context-kicker">Ciclo {state.cycle} · {context.solarOutput} u solares</span>
        <h1>{context.title}</h1>
        <p>{context.briefing}</p>
      </section>

      <div className="mission-grid">
        <div className="mission-main">
          <div className="telemetry">
            {(Object.keys(RESOURCE_LABELS) as ResourceKey[]).map((key) => (
              <ResourceCard
                key={key}
                label={RESOURCE_LABELS[key]}
                unitLabel="u"
                current={state.resources[key]}
                projected={preview.projected[key]}
                delta={preview.deltas[key]}
                threshold={END_THRESHOLDS[key]}
                inverted={key === 'exposure'}
                icon={icons[key]}
              />
            ))}
          </div>

          <CycleBalance breakdown={breakdown} cycle={state.cycle} />

          <SubsystemControls
            decision={decision}
            onChange={(patch) => setDecision((previous) => ({ ...previous, ...patch }))}
            cropProgress={state.cropProgress}
            cycle={state.cycle}
            validation={preview.validation}
          />

          <ReadinessChecklist state={state} preview={preview} />
        </div>

        <aside className="mission-side">
          <RadiationPanel
            cycle={state.cycle}
            exposure={state.resources.exposure}
            projectedExposure={preview.projected.exposure}
            protection={decision.protection}
          />
          <CycleLog history={state.history} />
        </aside>
      </div>

      <div className={`execute-bar ${isViable ? 'is-viable' : 'is-blocked'}`}>
        <div className="execute-copy">
          <span className="viability-badge">
            {preview.survivalWarning ? 'FALLO VITAL PREVISTO' : isViable ? 'VIABLE' : 'NO VIABLE'}
          </span>
          {preview.survivalWarning && (
            <p className="mission-error" role="alert">
              {preview.survivalWarning.explanation} Ejecutar registrará el fallo de misión.
            </p>
          )}
          {!preview.survivalWarning && preview.validation.reasons.length > 0 && (
            <p className="execute-reasons">{preview.validation.reasons.join(' ')}</p>
          )}
          <p id="execution-summary">
            Solar +{preview.solarGeneration} u ·{' '}
            {decision.eclss === 'intensive' ? 'Electrólisis intensiva' : 'Reciclaje nominal'} ·{' '}
            {decision.greenhouse === 'active' ? 'Cultivo activo' : 'Latencia'} ·{' '}
            {decision.protection === 'shelter' ? 'Refugio' : 'Operación normal'}
            {preview.willHarvest ? ' · Cosecha +32 u' : ''}
          </p>
          <p id="execution-warning" className="sr-only">
            {preview.survivalWarning?.explanation ?? preview.validation.reasons.join(' ')}
          </p>
        </div>
        <button
          type="button"
          className="primary"
          aria-describedby="execution-summary execution-warning"
          disabled={!preview.validation.valid}
          onClick={() => onExecute(decision)}
        >
          {preview.survivalWarning ? 'Ejecutar y registrar fallo' : `Ejecutar ciclo ${state.cycle}`}
        </button>
      </div>
    </>
  );
}

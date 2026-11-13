import { useState } from 'react';
import { Wind, Droplets, Sprout, Zap, Radio } from 'lucide-react';
import { CYCLE_CONTEXT, END_THRESHOLDS } from '../data/scenario';
import { previewCycle } from '../engine/simulation';
import type { CycleDecision, ResourceKey, SimulationState } from '../engine/types';
import { ResourceCard } from './ResourceCard';
import { SubsystemControls } from './SubsystemControls';
import { RadiationPanel } from './RadiationPanel';
import { CycleLog } from './CycleLog';
export const resourceLabels: Record<ResourceKey, string> = { oxygen: 'Oxígeno', water: 'Agua', food: 'Alimentos', energy: 'Energía', exposure: 'Exposición' };
const icons = { oxygen: Wind, water: Droplets, food: Sprout, energy: Zap, exposure: Radio };
export function MissionControl({ state, onExecute, onRestart }: { state: SimulationState; onExecute: (decision: CycleDecision) => void; onRestart: () => void }) {
  const [decision, setDecision] = useState<CycleDecision>({ eclss: 'nominal', greenhouse: 'standby', protection: 'normal' });
  const preview = previewCycle(state, decision);
  const context = CYCLE_CONTEXT[state.cycle];
  return <><div className="mission-heading"><h1>Control de misión <span>Ciclo {state.cycle}/7</span></h1><button onClick={onRestart}>Reiniciar misión</button></div><progress aria-label="Ciclos completados" max={7} value={state.history.length} /><section className="cycle-context"><h2>{context.title}</h2><p>{context.briefing}</p></section><div className="telemetry">{(Object.keys(resourceLabels) as ResourceKey[]).map(key => <ResourceCard key={key} label={resourceLabels[key]} unitLabel="u" current={state.resources[key]} projected={preview.projected[key]} delta={preview.deltas[key]} threshold={END_THRESHOLDS[key]} inverted={key === 'exposure'} icon={icons[key]} />)}</div><SubsystemControls decision={decision} onChange={setDecision} cropProgress={state.cropProgress} cycle={state.cycle} validation={preview.validation} /><p aria-live="polite" className="mission-last-result">{state.history.at(-1)?.summary ?? "Configurá los subsistemas para iniciar la misión."}</p><div className="execute">{preview.survivalWarning && <p className="mission-error" role="alert">{preview.survivalWarning.explanation} Ejecutar registrará el fallo de misión.</p>}<p id="execution-summary">Solar +{preview.solarGeneration} u · {decision.eclss === 'intensive' ? 'Electrólisis intensiva' : 'Reciclaje nominal'} · {decision.greenhouse === 'active' ? 'Cultivo activo' : 'Latencia'} · {decision.protection === 'shelter' ? 'Refugio' : 'Operación normal'}{preview.willHarvest ? ' · Cosecha +32 u' : ''}</p><button className="primary" aria-describedby="execution-summary execution-warning" disabled={!preview.validation.valid} onClick={() => onExecute(decision)}>Ejecutar ciclo {state.cycle}</button></div><p id="execution-warning">{preview.survivalWarning?.explanation ?? preview.validation.reasons.join(" ")}</p><div className="analysis"><RadiationPanel cycle={state.cycle} exposure={state.resources.exposure} projectedExposure={preview.projected.exposure} protection={decision.protection} /><CycleLog history={state.history} /></div></>;
}

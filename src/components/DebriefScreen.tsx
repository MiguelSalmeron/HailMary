import { buildDebrief } from '../engine/simulation';
import type { AttemptSummary, SimulationState } from '../engine/types';
import { ResourceChart } from './ResourceChart';
export function DebriefScreen({ state, previousAttempts, onRetry }: { state: SimulationState; previousAttempts: AttemptSummary[]; onRetry: () => void }) {
  const report = buildDebrief(state);
  const previous = previousAttempts.at(-1);
  return <><h1>{report.headline}</h1><p className="intro">{report.summary}</p><ResourceChart state={state} /><div className="assessments">{report.assessments.map(item => <section key={item.id}><h2>{item.title}</h2><strong className={`debrief-rating debrief-rating-${item.rating}`}>{({ optimal: 'Óptimo', adequate: 'Adecuado', critical: 'Crítico' })[item.rating]}</strong><p>{item.finding}</p><p>{item.scientificExplanation}</p><a href={item.source.url} target="_blank" rel="noreferrer">{item.source.title} ↗</a></section>)}</div><h2>Comparativa de intentos</h2><p>Orden: O₂ / Agua / Alimentos / Energía / Exposición (u didácticas).</p>{previous && <p>Intento #{previous.attemptNumber}: {previous.status === 'victory' ? 'Cumplida' : 'Fallida'} · {Object.values(previous.finalResources).join(' / ')}</p>}<p>Intento #{state.attemptNumber}: {state.status === 'victory' ? 'Cumplida' : 'Fallida'} · {Object.values(state.resources).join(' / ')}</p><button className="primary" onClick={onRetry}>Reintentar misión</button></>;
}

import { INITIAL_RESOURCES } from '../data/scenario';
import type { ResourceKey, SimulationState } from '../engine/types';
import { resourceLabels } from './MissionControl';
const colors = ['#67e8f9', '#60a5fa', '#6ee7b7', '#fcd34d', '#fda4af'];
export function ResourceChart({ state }: { state: SimulationState }) {
  const rows = [INITIAL_RESOURCES, ...state.history.map(entry => entry.after)];
  const keys = Object.keys(resourceLabels) as ResourceKey[];
  return <section><h2>Evolución de recursos</h2><svg viewBox="0 0 760 270" role="img" aria-label="Evolución por ciclo; valores exactos en tabla desplegable"><title>Recursos en unidades didácticas</title>{[0, 25, 50, 75, 100].map(value => <g key={value}><line x1="45" x2="735" y1={225-value*2} y2={225-value*2} stroke="#334155" /><text x="5" y={230-value*2} fill="#94a3b8" fontSize="13">{value}</text></g>)}{rows.map((_, index) => <text key={index} x={45+index*97} y="250" fill="#cbd5e1" fontSize="14">C{index}</text>)}{keys.map((key, index) => <polyline key={key} fill="none" stroke={colors[index]} strokeWidth="3" strokeDasharray={index === 4 ? '6 4' : undefined} points={rows.map((row, i) => `${45+i*97},${225-row[key]*2}`).join(' ')} />)}</svg><div className="legend">{keys.map((key, i) => <span key={key} style={{ color: colors[i] }}>{resourceLabels[key]}</span>)}</div><details><summary>Ver valores por ciclo</summary><div className="table-scroll"><table><thead><tr><th>Ciclo</th>{keys.map(key => <th key={key}>{resourceLabels[key]}</th>)}</tr></thead><tbody>{rows.map((row, i) => <tr key={i}><th>{i}</th>{keys.map(key => <td key={key}>{row[key]}</td>)}</tr>)}</tbody></table></div></details></section>;
}

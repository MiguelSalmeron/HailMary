import { StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';
import App from '../src/App';
import { ErrorBoundary } from '../src/components/ErrorBoundary';
import { createInitialState, advanceCycle } from '../src/engine/simulation';
import { saveSession } from '../src/storage/persistence';

function Fault() {
  const [failed, setFailed] = useState(false);
  if (failed) throw Error('Injected render failure');
  return <button onClick={() => setFailed(true)}>Forzar error</button>;
}
const params = new URLSearchParams(location.search);
if (params.has('seed')) {
  let simulation = createInitialState();
  for (let i = 0; i < 2; i++) simulation = advanceCycle(simulation, { eclss: 'nominal', greenhouse: 'standby', protection: 'normal' });
  saveSession({ phase: 'mission', simulation, previousAttempts: [] });
}
if (params.has('denyRemove')) Storage.prototype.removeItem = () => { throw Error('Storage removal denied'); };
createRoot(document.getElementById('root')!).render(
  <StrictMode><ErrorBoundary><Fault /><App /></ErrorBoundary></StrictMode>
);

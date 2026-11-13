import { useContext, useEffect, useRef, useState } from 'react';
import type { CycleDecision } from './engine/types';
import { createInitialState, advanceCycle } from './engine/simulation';
import { loadSession, saveSession, type PersistedSession } from './storage/persistence';
import { RecoveryContext } from './components/ErrorBoundary';
import { BriefingScreen } from './components/BriefingScreen';
import { MissionControl } from './components/MissionControl';
import { DebriefScreen } from './components/DebriefScreen';

export default function App() {
  const recovered = useContext(RecoveryContext);
  const [session, setSession] = useState<PersistedSession>(() => (recovered ? null : loadSession()) ?? {
    phase: 'briefing',
    simulation: createInitialState(),
    previousAttempts: [],
  });
  const [executionError, setExecutionError] = useState('');
  const executing = useRef(false);
  const unlockTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => () => { if (unlockTimer.current) clearTimeout(unlockTimer.current); }, []);
  const main = useRef<HTMLElement>(null);
  useEffect(() => { saveSession(session); }, [session]);
  useEffect(() => {
    main.current?.focus({ preventScroll: true });
    window.scrollTo(0, 0);
  }, [session.phase, session.simulation.cycle]);

  function execute(decision: CycleDecision) {
    if (executing.current) return;
    executing.current = true;
    setExecutionError('');
    try {
      const simulation = advanceCycle(session.simulation, decision);
      setSession({ ...session, simulation, phase: simulation.status === 'in_progress' ? 'mission' : 'debrief' });
    } catch (error) {
      setExecutionError(error instanceof Error ? error.message : 'No pudimos ejecutar el ciclo. Revisá la configuración.');
    } finally {
      unlockTimer.current = setTimeout(() => { executing.current = false; }, 500);
    }
  }

  function restart() {
    if (session.phase === 'mission' && !window.confirm('¿Reiniciar misión? Se perderá el progreso del intento actual.')) return;
    setExecutionError('');
    const state = session.simulation;
    setSession({
      phase: 'mission',
      simulation: createInitialState(state.attemptNumber + (state.history.length > 0 ? 1 : 0)),
      previousAttempts: state.status === 'in_progress' ? session.previousAttempts : [
        ...session.previousAttempts,
        {
          attemptNumber: state.attemptNumber,
          status: state.status,
          cyclesCompleted: state.history.length,
          finalResources: state.resources,
          harvestsCompleted: state.harvestsCompleted,
        },
      ],
    });
  }

  return (
    <div className="app-shell">
      <header className="brand">
        <strong>NEXUS <span>Último Horizonte</span></strong>
        <span>Lunar Mission Trainer · V1.0 · LifePlants</span>
      </header>
      <main ref={main} tabIndex={-1}>
        {executionError && <p className="mission-error" role="alert">{executionError}</p>}
        {session.phase === 'briefing' ? (
          <BriefingScreen
            onStart={restart}
            onContinue={session.simulation.history.length ? () => setSession({
              ...session,
              phase: session.simulation.status === 'in_progress' ? 'mission' : 'debrief',
            }) : undefined}
            continueLabel={
              session.simulation.status === 'in_progress'
                ? 'Continuar misión guardada'
                : 'Ver debrief del último intento'
            }
          />
        ) : session.phase === 'mission' ? (
          <MissionControl
            key={session.simulation.cycle}
            state={session.simulation}
            onRestart={restart}
            onExecute={execute}
          />
        ) : (
          <DebriefScreen
            state={session.simulation}
            previousAttempts={session.previousAttempts}
            onRetry={restart}
          />
        )}
      </main>
      <footer>
        Modelo educativo: todas las cifras son unidades didácticas de simulación. No representan dosis médicas, mSv ni operaciones reales. Proyecto independiente, no afiliado a NASA.
      </footer>
    </div>
  );
}

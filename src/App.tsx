import { useEffect, useRef, useState } from 'react';
import { createInitialState, advanceCycle } from './engine/simulation';
import { loadSession, saveSession, type PersistedSession } from './storage/persistence';
import { BriefingScreen } from './components/BriefingScreen';
import { MissionControl } from './components/MissionControl';
import { DebriefScreen } from './components/DebriefScreen';

export default function App() {
  const [session, setSession] = useState<PersistedSession>(() => loadSession() ?? {
    phase: 'briefing',
    simulation: createInitialState(),
    previousAttempts: [],
  });
  const main = useRef<HTMLElement>(null);
  useEffect(() => { saveSession(session); }, [session]);
  useEffect(() => { main.current?.focus(); }, [session.phase]);

  function restart() {
    if (session.phase === 'mission' && !window.confirm('¿Reiniciar misión? Se perderá el progreso del intento actual.')) return;
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
        <span>Lunar Mission Trainer · V1.0</span>
      </header>
      <main ref={main} tabIndex={-1}>
        {session.phase === 'briefing' ? (
          <BriefingScreen
            onStart={restart}
            onContinue={session.simulation.history.length ? () => setSession({
              ...session,
              phase: session.simulation.status === 'in_progress' ? 'mission' : 'debrief',
            }) : undefined}
          />
        ) : session.phase === 'mission' ? (
          <MissionControl
            state={session.simulation}
            onRestart={restart}
            onExecute={decision => {
              const simulation = advanceCycle(session.simulation, decision);
              setSession({
                ...session,
                simulation,
                phase: simulation.status === 'in_progress' ? 'mission' : 'debrief',
              });
            }}
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

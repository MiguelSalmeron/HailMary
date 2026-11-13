const STEPS = [
  'Estabilización',
  'Balance',
  'Alerta',
  'Tormenta',
  'Recuperación',
  'Mantenimiento',
  'Cierre',
] as const;

export function CycleStepper({ state }: { state: { cycle: number; history: Array<{ cycle: number }> } }) {
  const completed = new Set(state.history.map((entry) => entry.cycle));

  return (
    <nav className="cycle-stepper-wrap" aria-label="Progreso de la misión">
      <ol className="cycle-stepper">
        {STEPS.map((label, index) => {
          const cycle = index + 1;
          const isCurrent = cycle === state.cycle;
          const isDone = completed.has(cycle);
          return (
            <li
              key={label}
              className={isCurrent ? 'is-current' : isDone ? 'is-done' : 'is-upcoming'}
              aria-current={isCurrent ? 'step' : undefined}
            >
              <span className="step-number">{cycle}</span>
              <span className="step-label">{label}</span>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

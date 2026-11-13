import { Component, createContext, type ReactNode } from 'react';
import { clearSession } from '../storage/persistence';

export const RecoveryContext = createContext(false);

export class ErrorBoundary extends Component<{ children: ReactNode }, { failed: boolean; recovered: boolean }> {
  state = { failed: false, recovered: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  render() {
    if (!this.state.failed) return <RecoveryContext.Provider value={this.state.recovered}>{this.props.children}</RecoveryContext.Provider>;
    return (
      <main className="error-boundary" role="alert">
        <h1>No pudimos recuperar la simulación</h1>
        <p>Reiniciá para volver al briefing. Se borrará la sesión guardada de este navegador.</p>
        <button className="primary" onClick={() => {
          clearSession();
          this.setState({ failed: false, recovered: true });
        }}>Reiniciar simulación</button>
      </main>
    );
  }
}

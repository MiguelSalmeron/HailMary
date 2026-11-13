import { Component, type ReactNode } from 'react';
import { clearSession } from '../storage/persistence';

export class ErrorBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  render() {
    if (!this.state.failed) return this.props.children;
    return (
      <main className="error-boundary" role="alert">
        <h1>No pudimos recuperar la simulación</h1>
        <p>Reiniciá para volver al briefing. Se borrará la sesión guardada de este navegador.</p>
        <button className="primary" onClick={() => {
          clearSession();
          this.setState({ failed: false });
        }}>Reiniciar simulación</button>
      </main>
    );
  }
}

import type { AppPhase, AttemptSummary, SimulationState } from '../engine/types';

export const STORAGE_KEY = 'nexus_ultimo_horizonte_state_v1';

export interface PersistedSession {
  phase: AppPhase;
  simulation: SimulationState;
  previousAttempts: AttemptSummary[];
}

export interface StorageAdapter {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
  removeItem(key: string): void;
}

function getDefaultStorage(): StorageAdapter | null {
  try {
    return typeof window !== 'undefined' ? window.localStorage : null;
  } catch {
    return null;
  }
}

export function saveSession(
  session: PersistedSession,
  storage: StorageAdapter | null = getDefaultStorage()
): void {
  if (!storage) return;
  try {
    storage.setItem(STORAGE_KEY, JSON.stringify(session));
  } catch {
    // Ignorar errores de cuota o modo privado sin romper la simulación
  }
}

export function loadSession(
  storage: StorageAdapter | null = getDefaultStorage()
): PersistedSession | null {
  if (!storage) return null;
  try {
    const raw = storage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as PersistedSession;
    if (
      !parsed ||
      !parsed.simulation ||
      typeof parsed.simulation.cycle !== 'number' ||
      !parsed.simulation.resources ||
      !Array.isArray(parsed.simulation.history)
    ) {
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

export function clearSession(storage: StorageAdapter | null = getDefaultStorage()): void {
  if (!storage) return;
  try {
    storage.removeItem(STORAGE_KEY);
  } catch {
    // noop
  }
}

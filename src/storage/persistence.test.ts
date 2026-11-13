import { describe, expect, it } from 'vitest';
import { advanceCycle, createInitialState } from '../engine/simulation';
import { loadSession, saveSession, STORAGE_KEY, type StorageAdapter } from './persistence';

const nominal = { eclss: 'nominal', greenhouse: 'standby', protection: 'normal' } as const;
function storage(raw: string | null = null): StorageAdapter {
  let value = raw;
  return { getItem: () => value, setItem: (_, next) => { value = next; }, removeItem: () => { value = null; } };
}
const session = () => ({ phase: 'mission' as const, simulation: advanceCycle(createInitialState(), nominal), previousAttempts: [] });

describe('persistencia v2', () => {
  it('descarta JSON corrupto', () => expect(loadSession(storage('{'))).toBeNull());
  it('descarta payload sin versión', () => expect(loadSession(storage(JSON.stringify(session())))).toBeNull());
  it('restaura roundtrip íntegro', () => {
    const adapter = storage();
    saveSession(session(), adapter);
    expect(JSON.parse(adapter.getItem(STORAGE_KEY)!).version).toBe(2);
    expect(loadSession(adapter)).toEqual(session());
  });
  it('normaliza misión terminada hacia debrief', () => {
    let simulation = createInitialState();
    for (let cycle = 1; cycle <= 7; cycle++) simulation = advanceCycle(simulation, {
      eclss: cycle === 2 ? 'intensive' : 'nominal',
      greenhouse: cycle === 3 || cycle === 5 ? 'active' : 'standby',
      protection: cycle === 4 ? 'shelter' : 'normal',
    });
    const adapter = storage();
    saveSession({ ...session(), simulation }, adapter);
    expect(loadSession(adapter)?.phase).toBe('debrief');
  });
  it('rechaza recursos, historial y estados alterados', () => {
    for (const patch of [{ resources: { oxygen: -1 } }, { history: [{}] }, { status: 'unknown' }, { cropProgress: 3 }]) {
      const payload = session();
      expect(loadSession(storage(JSON.stringify({ ...payload, version: 2, simulation: { ...payload.simulation, ...patch } })))).toBeNull();
    }
  });
  it('tolera almacenamiento inaccesible', () => {
    const adapter: StorageAdapter = { getItem() { throw Error('denied'); }, setItem() { throw Error('denied'); }, removeItem() {} };
    expect(loadSession(adapter)).toBeNull();
    expect(() => saveSession(session(), adapter)).not.toThrow();
  });
});

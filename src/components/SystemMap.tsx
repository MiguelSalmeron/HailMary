import { ArrowRight, Droplets, Radio, Shield, Sprout, Wind, Zap } from 'lucide-react';

const NODES = [
  {
    id: 'eclss',
    title: 'ECLSS',
    icon: Wind,
    input: 'Agua + energía',
    output: 'O₂ y agua reciclada',
    detail: '+4 O₂ · +3 agua · −9 energía',
    tone: 'cyan',
  },
  {
    id: 'energy',
    title: 'Energía',
    icon: Zap,
    input: 'Arreglo solar',
    output: '+19 u por ciclo',
    detail: 'Ciclo 6: solo +7 u por mantenimiento',
    tone: 'amber',
  },
  {
    id: 'greenhouse',
    title: 'Invernadero',
    icon: Sprout,
    input: 'Agua + energía',
    output: 'Alimentos diferidos',
    detail: '2 ciclos activos → +32 u',
    tone: 'green',
  },
  {
    id: 'shelter',
    title: 'Refugio',
    icon: Shield,
    input: '−10 u de energía',
    output: 'Mitiga la tormenta',
    detail: 'C4: +8 u vs +35 u sin refugio',
    tone: 'rose',
  },
] as const;

export function SystemMap() {
  return (
    <section className="system-map" aria-labelledby="system-map-title">
      <div className="panel-heading">
        <div>
          <h2 id="system-map-title">Mapa de sistemas</h2>
          <p>Los cuatro módulos comparten agua y energía. Ningún recurso se produce solo.</p>
        </div>
        <span className="panel-tag">FLUJOS</span>
      </div>

      <div className="system-map-grid">
        {NODES.map((node, index) => {
          const Icon = node.icon;
          return (
            <article key={node.id} className={`system-node system-node-${node.tone}`}>
              <div className="system-node-head">
                <Icon aria-hidden="true" />
                <h3>{node.title}</h3>
                <span className="system-node-index">{String(index + 1).padStart(2, '0')}</span>
              </div>
              <p className="system-flow">
                <span>{node.input}</span>
                <ArrowRight aria-hidden="true" />
                <strong>{node.output}</strong>
              </p>
              <p className="system-detail">{node.detail}</p>
            </article>
          );
        })}
      </div>

      <p className="system-map-note">
        <Droplets aria-hidden="true" /> El agua es el recurso bisagra: electrólisis, cultivo y
        reciclaje compiten por la misma reserva.
        <Radio aria-hidden="true" /> La exposición solo se controla con el refugio en el ciclo 4.
      </p>
    </section>
  );
}

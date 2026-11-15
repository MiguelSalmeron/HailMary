# Contexto — NEXUS: Último Horizonte

Documento de dirección de producto para integrar NEXUS y HailMary. Describe estado inspeccionado, visión acordada y decisiones pendientes. No acredita implementación de la fusión.

## Reto que debemos resolver

Crear juego o aplicación para jóvenes astronautas que permita gestionar puesto lunar o marciano, equilibrando soporte vital, blindaje contra radiación, energía y producción de alimentos. Las disyuntivas de ingeniería deben resultar comprensibles, tangibles y divertidas.

La medida de éxito: jugador entiende qué ganó, qué sacrificó y cómo su decisión afectó misión. Completar edificios o mantener barras verdes no basta por sí solo.

## Dirección acordada

Conservar trabajo existente. Combinar tres propuestas dentro de misma partida:

1. **Arquitectos del espacio:** diseñar base con presupuesto limitado; probar y rediseñar.
2. **Colonia bajo presión:** operar colonia lunar 3D tipo tycoon; construir, cultivar y mantener sistemas.
3. **Comandante lunar:** pausar ante decisiones críticas, anticipar consecuencias y ejecutar plan.

Bucle completo: **diseñar → operar → planificar → ejecutar → evaluar → rediseñar**.

Una colonia, una misión, recursos compartidos, un motor. Las tres propuestas son etapas y herramientas de misma experiencia; no tres aplicaciones independientes.

## Repositorios y evidencia

### HailMary

- Remoto: <https://github.com/MiguelSalmeron/HailMary>.
- Checkout inspeccionado: `/home/sma/Documentos/Proyectos_Desarrollo/HailMary`.
- Referencia local: `9c8c34a1db2c0c51b53c1da89550bbba1507d14d`, rama `style/wcag-visual-pass`. Volver a verificar antes de trabajar.
- React 19, TypeScript, Vite 7, Vitest 3, Lucide y Tailwind 4 declarados en `package.json`.
- Simulación determinista: dos tripulantes, siete ciclos, oxígeno, agua, alimentos, energía y exposición.
- `src/engine/simulation.ts`: `previewCycle`, `advanceCycle`, `getCycleBreakdown`, `buildCounterfactual`, `buildDebrief`.
- `src/components/`: briefing, controles de misión, balance proyectado, alertas, timeline, comparación de intentos e informe final.
- `src/storage/persistence.ts`: sesión local v2, validación mediante replay del historial.
- README registra pruebas y QA anteriores; no se ejecutaron tests, build ni navegador durante preparación de este paquete documental.
- Acceso remoto de README devolvió 404 mediante conector. Evidencia HailMary proviene del checkout; esto no demuestra que repositorio haya sido eliminado.

### NEXUS

- Remoto: <https://github.com/dnnyhr/nexus>.
- Referencia remota consultada: [`e8188c5178687919a7227ea9170fa893ab547b81`](https://github.com/dnnyhr/nexus/commit/e8188c5178687919a7227ea9170fa893ab547b81).
- Three.js, TypeScript, Vite 8 y Vitest 5 declarados. No asumir compatibilidad de dependencias con HailMary.
- `src/main.ts`: inicialización Three.js, escena, HUD, jugador, rover y bucle de simulación con paso fijo.
- `src/game/sim.ts`, `state.ts`, `config.ts`: recursos, energía, cultivo, salud y avance continuo del mundo.
- `src/game/missions.ts`: cadena de misiones, desbloqueos y recompensas.
- `src/game/build.ts`, `storm.ts`, `damage.ts`, `save.ts`: construcción, tormentas, daños y persistencia.
- `src/models/`, `src/scene/`: edificios, astronauta, vehículos, terreno y representación de base.
- `src/data/spaceweather.ts`: solicitudes DONKI/GOES con fallback a snapshot. Disponibilidad real de endpoints y comportamiento en navegador no probados en esta tarea.
- Usuario define producto como 3D/PWA. 3D consta en código. Árbol, dependencias y config Vite revisados no evidencian manifest ni service worker: instalación y funcionamiento offline de PWA quedan por verificar.

## Qué aporta cada proyecto

**NEXUS:** base jugable 3D, exploración, interacción con edificios, construcción y operación continua. Base técnica candidata preferida para experiencia integrada.

**HailMary:** diseño de proyecciones, balances explicables, registro de decisiones, evaluación educativa, comparación de intentos y contrafactuales.

No copiar motor HailMary junto a motor NEXUS y dejar ambos consumir recursos. No convertir estado continuo en siete ciclos mediante equivalencia arbitraria. Reutilización de conceptos no implica compatibilidad directa de funciones.

## Decisiones que Opus debe cerrar

- Repositorio destino, estructura de integración y estrategia para preservar MVP actual.
- Motor autoritativo y representación de tiempo. Preferencia: paso fijo continuo con pausa real y horizonte de proyección explícito.
- Estado común, comandos, historial, configuración de escenario y semilla/eventos reproducibles.
- Cómo representar soporte vital, alimentos, energía y blindaje con costes comparables y límites comprensibles.
- Cómo proyectar consecuencias sin mutar partida ni ejecutar segundo motor distinto.
- Qué conserva, adapta o sustituye de cada repo, con rutas concretas.
- Público inicial, duración objetivo, controles móviles y calidad gráfica mínima aceptable.
- Implementación y validación PWA, migración de partidas y separación entre datos observados y coeficientes didácticos.

## Alcance inicial propuesto

Una base lunar; preparación con presupuesto limitado; operación 3D; cuatro sistemas conectados; cosecha, periodo oscuro y tormenta; pausa con proyección; resultado explicado; reintento con diseño diferente.

Duración objetivo orientativa: 10–15 minutos, por validar jugando. Siete ciclos pertenece al MVP HailMary, no constituye requisito cerrado de nueva versión. Los cuatro sistemas no obligan a crear cuatro edificios distintos si interfaz o arquitectura resuelven mejor sus funciones.

Marte, multijugador, backend, cuentas, IA conversacional y expansión ilimitada quedan fuera de primera entrega. Rover existente puede conservarse si no desplaza trabajo del bucle educativo.

## Estado y límites del encargo

Este paquete entrega documentación para dirección por Opus. No cambia código, motor, dependencias ni despliegue.

Los planes previos en `prompts-planes/` documentan alcance anterior. Sus restricciones de modelo congelado y ausencia de 3D deben interpretarse en esa fase; la nueva visión no debe confundirse con una corrección del MVP. Preservar documentación y comprobar instrucciones vigentes antes de implementar.

Leer después [README propuesto](README-fusion-nexus.md) y [prompt para Opus](prompt-opus-fusion-nexus.md).

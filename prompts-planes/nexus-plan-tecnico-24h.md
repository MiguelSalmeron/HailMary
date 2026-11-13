# NEXUS: Último Horizonte — Plan técnico de ejecución 24 h

**Proyecto:** NEXUS: Último Horizonte (LifePlants) — NASA Space Apps Challenge 2026
**Estado:** alcance cerrado, listo para ejecutar
**Modelo:** congelado; solo vistas derivadas con test
**Fecha:** 2026-11-13

---

## Reglas de ejecución

1. **Modelo congelado.** Solo se agregan vistas derivadas en `simulation.ts` (`survivalWarning`, `getCycleBreakdown`, `buildCounterfactual`) y cada una necesita test antes de mostrarse en UI.
2. **Baseline primero.** Antes de tocar código: commit del MVP actual y tag `mvp-baseline`. Sin baseline no hay rollback.
3. **Un dueño por archivo.** `simulation.ts`/`types.ts`/tests: Moisés. `App.tsx`: Moisés. `MissionControl.tsx` + componentes de misión + `index.css`: Dereck. Briefing/Debrief/Chart/assets: Amy/Dereck. `index.css` es el punto de conflicto: solo un editor, secciones con prefijo por componente, sin refactor.
4. **Nada se muestra sin verificación.** Contrafactual sin test verde no se renderiza. Imagen sin crédito no se usa.

---

## Fase 0 — Asegurar entrega (T+0–2)

| ID | Tarea | Archivos | Depende de | Prueba / aceptación |
|---|---|---|---|---|
| E0.1 | Commit baseline + tag | — | — | `git status` limpio; tag creado |
| E0.2 | Deploy del build actual | `README.md` | E0.1 | `npm ci && npm test && npm run build`; URL abre desde otro dispositivo/red; consola limpia |
| E0.3 | Reformatear `App.tsx` a multilínea sin cambiar comportamiento | `App.tsx` | E0.1 | Build limpio; misma navegación briefing→misión→debrief |

E0.3 no es cosmético: editar error boundary y try/catch sobre una sola línea densa es el mayor riesgo de regresión del plan.

**Deploy:** Vercel CLI (`npx vercel --prod`) o Netlify Drop con `dist`. No se necesita `vercel.json` (no hay router). Si la cuenta demora, Netlify Drop da URL en minutos. La URL se redeploya al cierre de cada fase.

---

## Fase 1 — Estabilidad crítica (T+1–4, paralelo al deploy)

| ID | Tarea | Archivos | Depende de | Prueba / aceptación |
|---|---|---|---|---|
| E1.1 | `ErrorBoundary` raíz con “Reiniciar simulación” que limpia sesión | nuevo `components/ErrorBoundary.tsx`, `main.tsx`, `index.css` | E0.3 | Error forzado en dev muestra fallback; reiniciar borra `localStorage` y vuelve a briefing |
| E1.2 | Persistencia v2: `version`, type guards de recursos/historial/status, normalización `phase`↔`status`, descarte de payload inválido | `storage/persistence.ts`, nuevo `persistence.test.ts` | E0.1 | Tests: JSON corrupto, payload sin versión, `phase:'mission'` con `status:'victory'` → debrief, roundtrip válido |
| E1.3 | Guarda de ejecución: try/catch de `advanceCycle`, error inline, bloqueo de doble click | `App.tsx`, `index.css` | E1.2 | Fallo simulado no rompe pantalla; doble click ejecuta un solo ciclo |
| E1.4 | Reset de decisión por ciclo: `key={state.cycle}` en `MissionControl` | `App.tsx` | E0.3 | C4 con refugio → C5 inicia `nominal/standby/normal`; QA manual |
| E1.5 | `survivalWarning` en `CyclePreview` desde `sim.crewSurvivalFailure`; banner rojo, botón sigue habilitado | `simulation.ts`, `types.ts`, `MissionControl.tsx`, `index.css`, `simulation.test.ts` | E1.4 | Con alimentos 4 en C6: warning `food_depleted`; ejecutar falla con ese código. Test también para O₂ |

**Checkpoint C1 (T+4):** tests ≥15, build limpio, smoke: recarga en C3, sesión corrupta, C4→C5, warning de supervivencia. Si algo falla, no se avanza a Fase 2.

---

## Fase 2 — Núcleo de misión (T+4–8)

| ID | Tarea | Archivos | Depende de | Prueba / aceptación |
|---|---|---|---|---|
| E2.1 | `getCycleBreakdown(state, decision)` reutilizando `simulateSteps`; componente `CycleBalance` con inicio/solar/tripulación/ECLSS/invernadero/refugio/cosecha/cierre/neto | `simulation.ts`, `types.ts`, nuevo `CycleBalance.tsx`, `MissionControl.tsx`, `index.css`, tests | C1 | Test de paridad exacta con `previewCycle` en 3 decisiones (nominal, intensiva, cosecha con clamp) |
| E2.2 | `CommandBar` (parche provisional, ciclo, tripulación, estado, reinicio), `CycleStepper` 7 ciclos con `aria-current`, `MissionAlert` usando `alertTag` hoy sin uso; C4 con costo refugio y +35/+8; C6 con +7 | nuevos `CommandBar.tsx`, `CycleStepper.tsx`, `MissionAlert.tsx`; `MissionControl.tsx`, `data/scenario.ts`, `index.css` | C1 | C3/C4/C6 con alertas distintas; sin overflow a 390 px |
| E2.3 | `StormReadiness` en C3 y checklist final C7 (5 umbrales valor actual/proyectado) | nuevo `StormReadiness.tsx`, `MissionControl.tsx`, `index.css` | E2.2 | Checks correctos con estrategia ganadora y con derrota |
| E2.4 | Barra sticky de ejecución en móvil, mensaje de viabilidad con razón exacta, `aria-live` del último resultado | `MissionControl.tsx`, `index.css` | E2.1 | Botón visible a 390 px; “NO VIABLE — faltan X u de energía” coincide con `validation.reasons` |

Mover `resourceLabels` de `MissionControl.tsx` a `data/scenario.ts` en E2.1 para desacoplar el chart (cambio mecánico, sin efecto visual).

**Checkpoint C2 (T+8):** tests ≥17, build, 390 px, balance idéntico a proyección, teclado en stepper y controles. Deploy intermedio.

---

## Fase 3 — Briefing y Debrief (T+8–11.5)

| ID | Tarea | Archivos | Depende de | Prueba / aceptación |
|---|---|---|---|---|
| E3.1 | Briefing: hero con imagen NASA + crédito, 3 pasos, `SystemMap` SVG (4 módulos, 6 flujos), pilares abreviados, dossier colapsable, label “Continuar/Ver debrief” según status | `BriefingScreen.tsx`, nuevo `SystemMap.tsx`, `public/images/`, `index.html`, `index.css` | C2 | CTA sin scroll a 390 px; crédito visible; fallback SVG si la imagen falla |
| E3.2 | Debrief: hero de resultado, ratings semánticos (óptimo cian, adecuado ámbar, crítico rosa), `DecisionTimeline` con 7 nodos y pivotes, tabla comparativa 0/1/3 intentos | `DebriefScreen.tsx`, nuevo `DecisionTimeline.tsx`, `index.css` | C2 | Ratings visualmente distintos; timeline refleja `history`; tabla no rompe con 0 intentos |
| E3.3 | Contrafactual C4: `buildCounterfactual(state, cycle, patch)` que re-ejecuta el historial con la decisión alterada; panel solo si `verified` | nuevo `engine/counterfactual.ts`, `CounterfactualPanel.tsx`, `DebriefScreen.tsx`, tests | E1.5, E3.2 | Test: ruta ganadora con C4 sin refugio → exposición 44, `radiation_exceeded`; sin test verde, panel oculto |

**Checkpoint C3 (T+11.5):** contrafactual verde o descartado; debrief completo con victoria y derrota por radiación.

---

## Fase 4 — Móvil, accesibilidad y metadatos (T+11.5–14)

| ID | Tarea | Archivos | Aceptación |
|---|---|---|---|
| E4.1 | Chart: wrapper `overflow-x`, `min-width`, marcadores C4 y fallo, etiquetas finales, tabla exacta en `<details>` | `ResourceChart.tsx`, `index.css` | Legible a 390 px con pista de scroll; tabla siempre disponible |
| E4.2 | ARIA: `aria-live` resultado, `aria-describedby` en ejecutar, foco tras ejecutar, contraste ≥4.5:1 | `MissionControl.tsx`, `DebriefScreen.tsx`, `index.css` | Navegación completa con Tab/Enter; sin pérdida de foco |
| E4.3 | `index.html`: description, theme-color, OG, favicon SVG propio | `index.html`, `public/favicon.svg` | Metadatos presentes; favicon carga; sin logo NASA |
| E4.4 | README: URL, reglas, fuentes, créditos, QA, comando de deploy | `README.md` | URL pública documentada |

**Checkpoint C4 (T+14):** QA integral (victoria, radiación, recarga C3, sesión corrupta, 390/1440, teclado, consola), tests y build limpios, deploy final. **Acá termina el P0.**

---

## Fase 5 — Cierre (T+14–18) y freeze

Máximo **dos** P1, elegidos por impacto/hora: external cam con imagen ya usada, parche SVG, coaching por código de fallo. Luego video 1080p, pitch cronometrado, ficha Space Apps y deploy definitivo. **Feature freeze T+18.** T+18–24: solo correcciones críticas y envío.

---

## Paralelización real

| Carril | Trabajo | Regla |
|---|---|---|
| A — Motor/datos | E1.2, E1.5, E2.1 helper, E3.3 | Secuencial; un solo dueño de `simulation.ts`/`types.ts`/tests |
| B — Misión | E2.2, E2.3, E2.4 | Empieza tras C1; dueño único de `MissionControl.tsx` |
| C — Briefing/Debrief/Chart | E3.1, E3.2, E4.1, E4.3 | Independiente; no toca motor |
| D — Deploy/QA/docs | E0.2, E4.4, QA | Corre en paralelo desde T+0 |

Dependencias duras: E1.2 → E1.3; E1.4 → E1.5; E1.5 + E3.2 → E3.3; E2.1 → E2.4. Todo lo demás es paralelo.

---

## Criterios de descarte

| Gate | Si no está verde | Acción |
|---|---|---|
| C1 (T+4) | Estabilidad incompleta | Se cancelan fases 2–3. Se entrega VME: baseline + E1.* + chart scroll + metadatos + deploy |
| C2 (T+8) | Command bar/stepper incompletos | Se conserva `CycleBalance` (valor educativo) y se descartan stepper y command bar |
| C3 (T+11.5) | Contrafactual sin test | Se oculta el panel; queda timeline + ratings |
| C4 (T+14) | Layout móvil roto | Chart a scroll + tabla; si la grilla de misión falla, se vuelve al layout baseline y se conservan solo alertas y balance |
| T+18 | Cualquier P1 abierto | Se descarta sin discusión; freeze |

**Versión mínima entregable garantizada:** MVP actual + reset de decisión + warning de supervivencia + error boundary/persistencia validada + deploy público + gráfico con scroll + ratings semánticos + metadatos. Esa versión se puede enviar aunque todo lo demás falle.

---

## Riesgos técnicos concretos

| Riesgo | Mitigación |
|---|---|
| `App.tsx` en una línea | E0.3 antes de cualquier edición |
| Contrafactual divergente | Replay del historial real con patch, no recomputar desde cero; test de exposición 44 |
| `index.css` compartido | Un editor; secciones prefijadas; sin refactor |
| Tailwind vs CSS global | No se unifica; se usan las clases existentes |
| Imagen NASA | Una sola, optimizada <200 KB, crédito “NASA”; fallback SVG |
| StrictMode doble efecto | `saveSession` idempotente; no hay efectos con side effects externos |
| Tests de UI inexistentes | No se agrega Testing Library; checklist manual reproducible en README |

**Orden de commits:** baseline → estabilidad → balance → command bar/alertas → briefing → debrief → contrafactual → móvil/ARIA → docs. Cada commit con tests y build verdes; deploy tras C1, C2 y C4.

---

## Definition of Done

- Tests del motor, persistencia y contrafactual pasan; build limpio.
- URL pública abre en otro dispositivo y red.
- QA manual: victoria, fallo por radiación, recarga antes de C4, sesión corrupta, teclado, 390 px, consola y contraste.
- README con URL, reglas, fuentes, créditos y QA.
- Video de respaldo y pitch ensayado dos veces.
- Ficha de Space Apps enviada antes del límite local.

## Demo de 90 segundos

- **0:00–0:10** Problema: no se aprende ingeniería lunar viendo datos aislados.
- **0:10–0:25** Briefing: hero, 3 pasos y mapa de sistemas.
- **0:25–0:50** C2: electrólisis + panel de balance (agua −14, O₂ +7); C3: alerta y checklist.
- **0:50–1:10** C4: tormenta, costo del refugio y decisión; ejecutar y mostrar +8 vs +35.
- **1:10–1:25** Debrief: timeline, contrafactual y fuente NASA.
- **1:25–1:30** Cierre: “NEXUS convierte compromisos de ingeniería espacial en una práctica STEM medible”.

# Prompt de delegación — Ejecución NEXUS 24 h

Copiá todo el bloque siguiente en el agente ejecutor.

---

## Tarea

Ejecutá el plan técnico de NEXUS: Último Horizonte. No produzcas otro análisis ni otro plan: implementá.

**Repo:** `/home/sma/Documentos/Proyectos_Desarrollo/HailMary`
**Plan vinculante:** `prompts-planes/nexus-plan-tecnico-24h.md`
**Producto:** simulador lunar educativo, React 19 + TypeScript + Vite. Tres pantallas, siete ciclos, tres subsistemas, motor determinista con 10 tests.
**Estado:** MVP funcional, tests y build verdes, preview en `http://localhost:4173`. Cambios sin commitear: verificá `git status` antes de tocar nada.

## Lectura obligatoria antes de editar

1. `prompts-planes/nexus-plan-tecnico-24h.md` — plan completo, fases, gates y criterios de descarte.
2. `AGENTS.md` — reglas del proyecto.
3. `src/engine/simulation.ts`, `src/engine/types.ts`, `src/engine/simulation.test.ts`.
4. `src/App.tsx`, `src/storage/persistence.ts`, `src/components/MissionControl.tsx`.
5. `README.md`, `DESIGN.md`, `src/index.css`.

No explores de más: usá `grep` y lectura por rangos.

## Restricciones duras

- **Modelo matemático congelado.** Solo se permiten vistas derivadas: `survivalWarning`, `getCycleBreakdown`, `buildCounterfactual`. Cada una necesita test.
- Prohibido: nuevos recursos, ciclos, subsistemas, 3D, backend, IA, auth, APIs reales, sonido, Marte, multijugador, replay animado, dashboard docente.
- Prohibido: refactor completo de CSS, unificar Tailwind, nuevas dependencias, Testing Library, cambiar tipografía.
- No cambies el copy científico sin justificarlo. Mantené el español rioplatense existente.
- No commitees secretos, no hagas force push, no borres archivos no rastreados sin confirmar.
- P2 del plan: no se toca.

## Protocolo de trabajo

1. **Fase 0 primero:** `git status`; commit baseline `chore: baseline MVP funcional`; tag `mvp-baseline`; reformatear `src/App.tsx` a multilínea sin cambiar comportamiento.
2. Antes de cada cambio: `npm test` y `npm run build` para confirmar verde.
3. Implementá en el orden E0.1 → E4.4 del plan. Un commit por tarea o por fase, en conventional commits.
4. Al cerrar cada fase: `npm test -- --reporter=dot`, `npm run build` y el smoke manual indicado. Si el checkpoint falla, aplicá el criterio de descarte del plan; no avances.
5. Si el test del contrafactual no pasa, ocultá el panel. No hardcodees resultados ni textos que el motor deba calcular.
6. Si el deploy pide credenciales que no tenés: generá `dist`, documentá el bloqueo y seguí con código. No inventes una URL.
7. No preguntes por decisiones ya cerradas en el plan. Ante ambigüedad real, elegí la opción más conservadora y anotala.
8. No modifiques `prompts-planes/nexus-plan-tecnico-24h.md`.

## Entregables

- Código completo, sin `TODO` ni placeholders.
- Tests nuevos: `survivalWarning`, persistencia v2, paridad de `getCycleBreakdown`, contrafactual C4.
- `README.md` con URL, reglas, créditos y checklist de QA.
- Reporte breve al cerrar cada fase: tareas, archivos, tests (cantidad), build, smoke, bloqueos.
- Reporte final: Definition of Done, URL pública si existe y P1 no ejecutados.

## Criterio de éxito

La versión mínima entregable es obligatoria: baseline + reset de decisión + warning de supervivencia + error boundary/persistencia validada + deploy público + chart con scroll + ratings semánticos + metadatos. Todo lo demás es incremental y está sujeto a los gates de tiempo.

**Empezá por Fase 0 ahora. No entregues un plan: ejecutá.**

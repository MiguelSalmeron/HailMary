# Procedimiento de integración y entrega — NEXUS

**Responsable único de integración y despliegue:** agente/rol autorizado actual. Nadie más integra ni actualiza la URL pública sin aprobación.
**Estado estable verificado:** commit `d539815`, tag `release-stable-d539815`, 21/21 tests, build limpio, URL pública alineada.
**URL pública:** https://nexus-ultimo-horizonte.netlify.app
**Alcance:** correcciones A1, A2, A4 únicamente. Sin reabrir alcance, sin cambiar el modelo matemático, sin P2.

## 1. Línea base y rollback

Antes de integrar cualquier corrección:

```sh
git status --short          # debe estar limpio
git log --oneline -1        # registrar commit base
git tag --points-at HEAD    # confirmar tag estable
npm test -- --reporter=dot
npm run build
```

Punto de rollback inmutable: `release-stable-d539815` (commit `d539815`). Si una integración falla tras corrección razonable:

```sh
git reset --hard release-stable-d539815
npm ci
npm test -- --reporter=dot
npm run build
# redesplegar dist solo si la URL quedó afectada
```

No usar `--force` sobre historial compartido. No integrar sobre working tree sucio.

## 2. Recepción de A1 / A2 / A4

Para cada corrección, exigir antes de tocar `main`:
- Identificador (A1/A2/A4), problema, archivos, justificación y criterio de aceptación.
- Diff o patch revisable (`git diff` / rama / archivo `.patch`).
- Confirmación explícita de que no modifica el modelo matemático (`src/engine/simulation.ts` solo si es vista derivada ya permitida y con test; no cambiar fórmulas, umbrales, orden de simulación ni constantes de `scenario.ts` salvo bug demostrado y aprobado).

## 3. Integración controlada (una corrección a la vez)

Orden recomendado: la corrección de menor riesgo/regresión primero. Repetir el ciclo completo por cada A*:

1. **Revisar diff:** leer cada archivo; rechazar cambios fuera de alcance, secretos, dependencias nuevas, refactors no pedidos o cambios en matemáticas.
2. **Aplicar:** en rama temporal o working tree limpio desde el último commit estable integrado.
3. **Verificar localmente:**
   - `npm test -- --reporter=dot` (debe seguir ≥21 y verde; si A* agrega tests, deben ser pertinentes y verdes).
   - `npm run build` (limpio).
   - Smoke manual rápido de la ruta afectada en preview si el entorno lo permite.
4. **Commit atómico:** mensaje `fix: ... (A1|A2|A4)` con nota breve del problema/archivo.
5. **Tag de checkpoint:** `git tag integrate-<Ax>-<shortsha>` para rollback granular.
6. **Solo tras aprobación:** redesplegar `dist` y repetir smoke remoto mínimo (briefing, misión, flujo afectado, consola/overflow).
7. **Registrar:** actualizar `README.md` (QA/checklist/estado) en commit de documentación si aplica.

Si falla tests/build o el diff altera matemáticas/alcance: **no integrar**, revertir el cambio aplicado, reportar hallazgo y conservar la versión estable.

## 4. Actualización del despliegue

Solo el responsable autorizado despliega:

```sh
npm ci
npm test -- --reporter=dot
npm run build
# empaquetar y publicar dist al sitio nexus-ultimo-horizonte
```

Después de cada deploy verificar: assets servidos corresponden al build, carga sin errores de consola, briefing→misión→debrief funcional, sin overflow en 390 px. Registrar commit y deploy id/URL.

## 5. Criterio de cierre (no declarar finalizado antes)

Marcar cada ítem como verificado con evidencia o pendiente:

- [x] Repo limpio en commit conocido; tag estable presente.
- [x] 21/21 tests verdes; build limpio.
- [x] URL pública alineada con el build integrado.
- [x] Smoke remoto automatizado: victoria, derrota por radiación, contrafactual/timeline, recarga C3, reset C4→C5, sesión corrupta, 390/1440 sin overflow ni errores de consola.
- [ ] Validación humana en otro dispositivo/red (requisito externo).
- [ ] Teclado Tab/Enter y contraste auditado en navegador real.
- [ ] Video 1080p de respaldo (flujo completo + explicación breve).
- [ ] Capturas finales (briefing, misión con balance/alerta C4, debrief con contrafactual, móvil).
- [ ] README final: URL, reglas, fuentes NASA, créditos de imagen, QA y estado real.
- [ ] Fuentes/créditos revisados: NASA links vigentes, PIA13523 acreditada, sin logo/afiliación NASA.
- [ ] Entrega Space Apps enviada/confirmada (ficha, hora límite local, materiales adjuntos).

**Estado del proyecto:** no finalizado mientras exista cualquier ítem pendiente.

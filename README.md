# NEXUS: Último Horizonte

Simulador educativo determinista: dos tripulantes, siete ciclos en Lunar Outpost Alpha. Elegí soporte vital, cultivo y protección; observá consecuencias proyectadas antes de ejecutar. El debrief explica decisiones con fuentes NASA y compara intentos terminados.

Proyecto independiente, no afiliado a NASA. Todos los números son unidades didácticas de simulación, nunca dosis médicas ni mSv. Los ciclos no representan días reales. La conservación del cultivo en latencia es una simplificación pedagógica.

## English summary

NEXUS is a deterministic lunar operations learning simulator for students aged 13–18. Players balance oxygen, water, food, energy and radiation exposure over seven cycles. Live projections reveal trade-offs; a scientific debrief links decisions to NASA sources. Independent project, not affiliated with NASA. All quantities are fictional educational units, not operational predictions or medical doses.

## Ejecución

Node.js compatible con Vite 7 (22.12+ recomendado).

```sh
npm install
npm test
npm run dev
npm run build
npm run preview
```

Preview: http://localhost:4173. Publicación estática: comando `npm run build`, directorio `dist`. No requiere backend ni credenciales. La sesión v2 se valida contra el historial determinista; payloads inválidos o sin versión se descartan. Se guarda en localStorage de este navegador y origen; no se sincroniza entre dispositivos. Reiniciar una misión activa solicita confirmación; reintentar una misión terminada conserva su resumen.

## Modelo V1.0

Orden: Solar → consumo basal → supervivencia inmediata → subsistemas → cosecha → radiación → validación final. Falta de reservas para consumo basal termina la misión antes de producir. Reservas limitadas a 0–100; exposición tiene límite de fracaso >40.

| Regla | Efecto en unidades didácticas |
|---|---|
| Inicio | O₂ 51, agua 77, alimentos 44, energía 70, exposición 0 |
| Consumo basal | O₂ −11, agua −6, alimentos −8, energía −7 |
| Solar | +19 energía; ciclo 6: +7 |
| Reciclaje nominal | +4 O₂, +3 agua, −9 energía |
| Electrólisis intensiva | +18 O₂, −8 agua, −19 energía |
| Cultivo activo | −7 agua, −13 energía; segundo ciclo activo: +32 alimentos |
| Latencia | −2 energía; conserva progreso |
| Refugio | −10 energía |
| Radiación | +3; ciclo 4: +35 normal o +8 refugio |
| Combinación bloqueada | Refugio + electrólisis intensiva + cultivo activo |
| Cierre ciclo 7 | O₂ ≥15, agua ≥15, alimentos ≥8, energía ≥10, exposición ≤40 |

También se bloquean combinaciones cuya demanda de subsistemas exceda reservas disponibles.

## Fuentes NASA

Consultadas el 13 de noviembre de 2026. Respaldan conceptos; no validan los coeficientes del juego.

- [ECLSS](https://www.nasa.gov/reference/environmental-control-and-life-support-systems-eclss/)
- [Space Radiation Element](https://www.nasa.gov/reference/about-the-space-radiation-element/)
- [NASA Langley: Radiation Analysis and Shielding Design](https://ddtrb.larc.nasa.gov/radiation/)
- [Growing Plants in Space](https://www.nasa.gov/exploration-research-and-technology/growing-plants-in-space/)
- [Challenges of Growing Plants in Space](https://science.nasa.gov/biological-physical/the-challenges-of-growing-plants-in-space/)
- [Moon Base Systems](https://www.nasa.gov/moonbase-systems/)

## QA reproducible

Estrategia ganadora (ECLSS / cultivo / protección):

1. Nominal / espera / normal.
2. Intensiva / espera / normal.
3. Nominal / activo / normal.
4. Nominal / latencia / refugio.
5. Nominal / activo / normal.
6. Nominal / espera / normal.
7. Nominal / espera / normal.

Resultado: 16 / 31 / 20 / 23 / 26; una cosecha. Para derrota por radiación, ejecutar cuatro ciclos nominales sin refugio: exposición 44.

Verificado: 19 pruebas Vitest y build TypeScript/Vite. Pendiente en navegador: ambas partidas a 1440 y 390 px, recarga antes de ciclo 4, Tab/Enter, consola, contraste y ausencia de desbordamientos. Preview inició correctamente; no hubo navegador conectado para QA visual. No interpretar build como verificación visual.

## Entrega y respaldo

Publicación pendiente de proyecto/cuenta Vercel o Netlify. Desde main, configurar build y dist; verificar URL sin credenciales desde otro dispositivo y red móvil. Ficha Space Apps y hora límite local pendientes de confirmación con organizadores; no se ha enviado una entrega oficial.

Respaldo offline: conservar repositorio, dependencias instaladas y dist; ejecutar preview antes de desconectar internet. Tipografías externas usan fallback sin conexión. Fuentes NASA requieren internet. Video 1080p, capturas y copia USB pendientes de grabación.

## Pitch de 90 segundos

- 0:00–0:15: «Los estudiantes aprenden ingeniería lunar tomando decisiones bajo restricciones. NEXUS permite observar sus consecuencias antes de ejecutarlas».
- 0:15–0:30: mostrar briefing: dos tripulantes, siete ciclos, cuatro pilares.
- 0:30–1:05: ejecutar C1; mostrar electrólisis y ejecutar C2; activar cultivo C3. En C4 demostrar combinación bloqueada; volver a nominal, latencia y refugio. Explicar coste de protección. Completar C5–7 con secuencia de QA.
- 1:05–1:25: mostrar resultado, gráfico y evaluaciones; abrir fuente ECLSS o Langley. Aclarar unidades didácticas.
- 1:25–1:30: «NEXUS convierte compromisos de ingeniería espacial en una práctica STEM medible y accesible».

Guion preparado; duración real y fluidez pendientes de ensayo cronometrado. Congelar funcionalidades antes de ensayo final.

## Ejecución del plan técnico

Baseline: commit `89d60c8`, tag `mvp-baseline`. Reformato sin cambio de comportamiento: `e467557`. Estabilidad: `1fa5d9a`. Mejoras mínimas de accesibilidad: `a48627d`.

C1 no pudo certificarse: no hay navegador conectado para smoke manual. Se aplica criterio conservador de descarte del plan: fases 2 y 3 no ejecutadas. No se implementaron `getCycleBreakdown` ni contrafactual; sus paneles y tests de paridad no existen. P1 y P2 no ejecutados. Modelo matemático y copy científico intactos.

Fase 1 incorpora error boundary con reinicio, persistencia v2 validada, captura de errores de ejecución, bloqueo de doble click durante 500 ms, reset de selección por ciclo y warning derivado de supervivencia. El warning no bloquea registrar el fallo. Fase 4 mínima incorpora scroll y etiquetas del chart, ratings semánticos, avisos ARIA, foco por ciclo, metadatos y favicon.

### Deploy

URL pública: no disponible. No se detectó CLI Vercel, proyecto enlazado ni archivo de autenticación Vercel en ubicaciones habituales. No se solicitaron ni almacenaron credenciales. `dist` está generado para entrega; no se publicó ni se hizo push.

Con cuenta Vercel autenticada, ejecutar desde este repo:

```sh
npm ci
npm test
npm run build
npx vercel --prod
```

Alternativa: cargar `dist` en Netlify Drop con cuenta del equipo. Registrar URL real solamente después de verificar acceso público. Metadatos no incluyen `og:url` ni imagen social remota porque no hay dominio público confirmado.

### Checklist de QA

- [x] 19 tests: 13 de motor, 6 de persistencia; incluyen warnings de alimentos y O₂.
- [x] TypeScript y build Vite limpios.
- [x] Modelo conserva victoria exacta 16 / 31 / 20 / 23 / 26.
- [x] Persistencia: corrupto, sin versión, roundtrip, normalización victoria, historial inválido y storage inaccesible.
- [x] Baseline y commits por fase; plan vinculante sin modificar.
- [ ] Navegador: victoria y derrota por radiación de punta a punta.
- [ ] Recarga C3, payload corrupto, C4 refugio → C5 nominal/espera/normal.
- [ ] Forzar error de render en dev y confirmar fallback/reinicio; retirar inyección antes de publicar.
- [ ] Forzar error de ejecución en dev; confirmar error inline y un solo ciclo ante doble click.
- [ ] 390/1440 px: sin overflow global, chart con scroll, tabla accesible.
- [ ] Tab/Enter, foco, contraste ≥4.5:1 y consola limpia.
- [ ] URL pública desde otro dispositivo/red; favicon y metadatos en producción.
- [ ] Video 1080p, dos ensayos cronometrados, ficha Space Apps enviada.

`npm ci` reportó 3 vulnerabilidades de dependencias (1 moderada, 2 críticas); no se aplicó actualización automática ni cambio de dependencias. Esa observación no equivale a análisis de explotabilidad.

### Créditos

NEXUS: Último Horizonte, equipo LifePlants. Referencias científicas: NASA y NASA Langley, enlaces arriba. Tipografías existentes: Inter y JetBrains Mono. Iconos: Lucide. Favicon geométrico propio del proyecto, sin logo NASA. Esta entrega no incorpora fotografías NASA ni atribuye autoría fotográfica inexistente.

Definition of Done pendiente: smoke manual, publicación pública, video, ensayos y entrega oficial. Código mínimo disponible; no declarar entrega completa hasta cerrar esos puntos.

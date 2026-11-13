# NEXUS: ÚLTIMO HORIZONTE

**Documento de producto y ejecución | NASA Space Apps Challenge 2026**  
**Equipo:** LifePlants · 4 integrantes · Managua, UAM  
**Versión:** 1.2 · 13 de noviembre de 2026  
**Objetivo:** entregar en 24 horas de desarrollo un prototipo funcional, defendible científicamente y convincente para la evaluación local.

> **Decisión de alcance:** no vamos a construir un videojuego de colonización. Vamos a crear una **plataforma web de simulación educativa de una base lunar**, con aspecto de centro de operaciones. Una misión, siete ciclos, decisiones con consecuencias y un informe científico final.

---

## 1. El desafío que estamos resolviendo

**Reto oficial:** [Build a Junior Astronaut Mission Trainer — NASA Space Apps Challenge 2026](https://www.spaceappschallenge.org/2026/challenges/junior-astronaut-mission-trainer/).

**Problema:** muchos materiales de ciencia espacial para estudiantes simplifican demasiado los compromisos de ingeniería o son tan complejos que pierden su atención. El reto pide una **aplicación o juego interactivo** donde estudiantes operen una base lunar o marciana y equilibren cuatro áreas: **soporte vital, protección contra radiación, energía y producción de alimentos**, experimentando por qué una misión triunfa o fracasa.

**Nuestra respuesta:** un *mission trainer* donde se aprende **haciendo elecciones fundamentadas** y viendo el resultado en sistemas interdependientes. Elegimos **la Luna**, no Marte, para mantener un solo contexto científico y construir un producto completo.

**Público inicial:** estudiantes de secundaria (aprox. 13–18 años), docentes STEM y principiantes en exploración espacial. No se requieren conocimientos previos.

**Resultado educativo medible:** al terminar una sesión, el usuario debe poder explicar por lo menos **dos relaciones causa–efecto** (p. ej., producir oxígeno requiere recursos; protegerse ante un evento solar cambia las operaciones de la base).

## 2. Qué es NEXUS, en una frase

**NEXUS es un simulador web de operaciones lunares que enseña ingeniería espacial mediante la administración de recursos y decisiones críticas, con explicaciones fundamentadas en fuentes de NASA.**

### Lo que NO es

- No es un juego 3D, *city builder*, exploración de mundo abierto ni una app con monedas y recompensas.
- No intenta calcular dosis reales de radiación, prever clima espacial real o operar equipos de NASA.
- No necesita cuentas, backend, IA generativa, integración satelital, multijugador ni hardware.
- No representa al equipo como parte de NASA: es un **proyecto independiente presentado a NASA Space Apps**.

### Lo que SÍ se entrega

Una web publicable y accesible desde un enlace con: **misión inicial → panel de control → decisiones por ciclo → emergencia de radiación → victoria/fracaso → debrief educativo → reinicio**.

---

## 3. Producto: flujo del usuario (5–8 minutos)

1. **Briefing / Inicio.** «Estás a cargo de Lunar Outpost Alpha, con dos tripulantes. Mantén la operación estable durante siete ciclos». Mostrar instrucciones de 30 segundos y objetivos.
2. **Mission Control.** Vista de recursos (oxígeno, agua, energía, alimentos), estado del hábitat, nivel de protección y alertas. Números claros; sin infantilizar.
3. **Decisión del ciclo.** El usuario distribuye energía entre soporte vital y cultivo, decide cómo usar reservas de agua y si activa el refugio ante radiación.
4. **Ejecutar ciclo.** Un motor determinista calcula consumos, producción, cambios de recursos y eventos predefinidos; presenta explicaciones comprensibles de lo ocurrido.
5. **Evento crítico.** Aparece una alerta de partículas solares: mantener operaciones normales incrementa el riesgo; proteger a la tripulación puede reducir temporalmente otras actividades. **Hay un costo real por cada opción.**
6. **Mission Debrief.** Al completar o fracasar, ver estado final, historial gráfico, tres decisiones relevantes y por qué tuvieron consecuencias científicas.
7. **Reintentar.** Reinicia la misma situación para comprobar si una estrategia diferente mejora el resultado.

**Diferenciador central:** el usuario no pulsa opciones «correctas» por intuición: observa impactos, aprende las relaciones entre sistemas y puede **repetir el mismo escenario** para comparar decisiones.

---

## 4. MVP: alcance cerrado de 24 horas

### P0 — Obligatorio, sin negociación

| Componente | Mínimo funcional | Prueba de aceptación |
|---|---|---|
| Briefing | Objetivo, contexto lunar y reglas en 1 pantalla | Un compañero entiende la misión sin explicación oral |
| Dashboard | Recursos visibles, valores actuales, alertas y ciclo | Cambian al ejecutar una decisión |
| Motor de simulación | 7 ciclos, reglas estables, costos y límites | Misma secuencia de decisiones → mismo resultado |
| Decisiones | 3 controles relevantes: oxígeno, cultivo y protección | Cada decisión modifica **al menos dos indicadores** |
| Radiación | Un evento solar con opción de refugio | Refugiarse reduce riesgo, pero modifica operaciones |
| Consecuencias | Puede haber misión exitosa y fallida | Ambas rutas están probadas |
| Debrief | Resumen + gráfico/historial + 2–3 aprendizajes | Explica *por qué*, no solo «ganaste/perdiste» |
| Publicación | URL pública y README con fuentes NASA | Se abre en otro teléfono/computadora |
| Entrega | Página oficial del proyecto completa y demostración | El enlace y la evidencia funcionan sin credenciales |

### P1 — Solo si P0 está completo

- Comparación **«tu estrategia vs. otro intento»** con dos gráficos simples.
- Un gráfico de línea por recurso, glosario accesible y modo presentación.
- Mejoras visuales ligeras: imagen lunar, transiciones discretas, diseño móvil más pulido.

### Fuera de alcance

Expansión a Marte, inventario de materiales, rovers, construcción libre, árbol tecnológico, personajes 3D, misiones múltiples, tutorial largo, sistema de puntos, chatbot, traducciones extensas y autenticación. **No agregar features después del corte de alcance.**

---

## 5. Modelo científico y mecánicas

### 5.1 Variables de simulación

| Variable | Qué representa en el MVP | Relación principal |
|---|---|---|
| Oxígeno | Reserva utilizable simplificada | Tripulación consume; producir requiere **agua y energía** |
| Agua | Reserva para tripulación, oxígeno y cultivo | Se consume y puede recuperarse parcialmente |
| Energía | Reserva disponible de la base | Soporte vital, invernadero y protección tienen costos |
| Alimentos | Reserva consumible | Tripulación consume; invernadero produce con demora |
| Protección / exposición | Estado de resguardo y **índice didáctico de riesgo** | Evento solar aumenta riesgo si no hay refugio |

**Importante:** utilizar **unidades de simulación**, no «porcentajes científicos» ni dosis reales en mSv. Los valores numéricos son parámetros pedagógicos diseñados para que el escenario sea comprensible. En pantalla deben etiquetarse claramente como *simulation units* o *índice didáctico*. La validez científica está en las **relaciones correctas**, no en afirmar que el modelo predice una misión real.

### 5.2 Reglas del motor (especificación, valores ajustables)

Cada ciclo operativo sigue este orden:

1. Mostrar alerta o condiciones del ciclo.
2. El usuario elige prioridades operativas.
3. Validar que la energía y el agua asignadas existen (sin recursos negativos).
4. Generar energía de base y aplicar demandas según prioridades.
5. Consumir reservas por la tripulación; producir oxígeno si hay energía y agua; procesar producción agrícola iniciada en ciclos anteriores.
6. Aplicar evento solar, si corresponde, y efecto de refugio.
7. Guardar estado, decisiones y explicaciones para el debrief.
8. Comprobar éxito o fracaso y avanzar de ciclo.

**Política de simplificación:** conservar todos los estados entre `0` y un máximo definido; las operaciones imposibles se bloquean **antes** de avanzar. No permitir oxígeno desde la nada, alimentos instantáneos ni radiación tratada como «daño» mágico.

### 5.3 Acciones que implementamos

| Acción | Beneficio | Costo / sacrificio |
|---|---|---|
| **Priorizar oxígeno** | Recupera reservas de O₂ | Consume agua y energía; limita otros sistemas |
| **Priorizar invernadero** | Genera alimentos **tras 2 ciclos** | Consume agua y energía; producción no inmediata |
| **Modo de refugio** | Reduce la exposición simulada durante un evento solar | Restringe operaciones y/o disponibilidad de energía |
| **Operación equilibrada** | Mantiene el funcionamiento general | Progreso más lento; puede ser insuficiente ante emergencias |

**Radiación:** distinguir entre **radiación cósmica de fondo** y **eventos de partículas solares**. Para el MVP, el evento interactivo representa un **solar particle event**, no predice una erupción real. El blindaje físico es importante, pero no elimina toda radiación; nunca declarar «100 % seguro».

### 5.4 Escenario único de siete ciclos

| Ciclo | Situación educativa |
|---|---|
| 1 | Estabilización del soporte vital. Conocer el panel |
| 2 | Decidir entre oxígeno y activar cultivo |
| 3 | **Alerta temprana** de partículas solares; preparar refugio |
| 4 | Evento solar: pagar el costo de haberse protegido o no |
| 5 | Recuperación de reservas y cosecha si se inició antes |
| 6 | Demanda energética incrementada por mantenimiento |
| 7 | Resolución final: continuar, estabilizar o fracasar |

**Victoria:** tripulación preservada, sistemas vitales por encima de mínimos al cierre del ciclo 7 y exposición simulada bajo el umbral de seguridad definido para el escenario. **Fracaso:** se agota una reserva vital sin recuperación operable o se supera el límite didáctico de exposición. La aplicación debe explicar el motivo específico.

**Balance mínimo exigido antes de la entrega:**
- Secuencia A: jugando con planificación razonable, **se puede ganar**.
- Secuencia B: descuidar agua/oxígeno, **se puede perder**.
- Secuencia C: ignorar alerta solar, **se incrementa el riesgo** y existe consecuencia visible.
- Secuencia D: hacer clic repetidamente o quedarse sin recursos **no rompe la aplicación**.

---

## 6. Panel científico de radiación (pantalla especial)

**Objetivo educativo:** hacer tangible que una tormenta de partículas solares requiere anticipación y compromisos operativos.

**Elementos en pantalla:**

1. **Estado:** `Background / Elevated / Solar Event` con explicación sencilla.
2. **Exposición acumulada:** índice de simulación, no dosis médica o medida real.
3. **Protección:** `Normal habitat` o `Shelter mode`; indicar reducción **ilustrativa** del riesgo.
4. **Pronóstico narrativo:** «Evento previsto para el próximo ciclo»; es un escenario programado.
5. **Decisión:** activar refugio o continuar las operaciones; un cuadro explica el costo.
6. **Después:** gráfico «riesgo con protección / riesgo sin protección» para enseñar el compromiso.

**Mensaje científico en el panel:** «Las partículas energéticas solares pueden aumentar el riesgo de radiación. Los refugios y materiales apropiados ayudan a reducir parte de la exposición, pero la protección depende del tipo y energía de la radiación». Fuente NASA: [Radiation Analysis and Shielding Design](https://ddtrb.larc.nasa.gov/radiation/) y [About the Space Radiation Element](https://www.nasa.gov/reference/about-the-space-radiation-element/).

**No mostrar:** predicciones reales, números físicos inventados en mSv, promesas médicas, blindaje perfecto ni «clima tormentoso» con viento en la Luna.

---

## 7. Arquitectura y diseño visual

### Stack elegido

- **Frontend:** React + Vite + TypeScript.
- **Estilos:** Tailwind CSS; diseño sobrio basado en tarjetas, tabla de estados y gráficos simples.
- **Motor:** funciones puras en TypeScript (`advanceCycle`, `validateAction`, `evaluateOutcome`, `buildDebrief`).
- **Persistencia:** estado en memoria y, solo si sobra tiempo, `localStorage` para reanudar.
- **Gráficas:** Recharts **solo si ya está integrado**; alternativa segura: SVG sencillo / barras HTML.
- **Deploy:** Vercel o Netlify; repositorio GitHub público. Verificar internet y acceso antes del evento.
- **Datos:** archivo local `scenario.json` con reglas y explicaciones. **Sin APIs ni dependencias de red en ejecución.**

### Pantallas / rutas

- `/` — introducción y botón «Iniciar simulación».
- `/mission` — dashboard con todos los controles y alertas (incluye panel de radiación como sección, no ruta adicional).
- `/debrief` — resultados, evolución de indicadores, aprendizajes y reinicio.

### Componentes propuestos

`MissionHeader`, `ResourceCard`, `ResourceHistory`, `DecisionPanel`, `RadiationAlert`, `CycleLog`, `DebriefReport`.

**Dirección de arte:** interfaz editorial/técnica; azul noche, negro, grises lunares, blanco y acentos cian/ámbar. Tipografía legible, indicadores priorizados, alertas visibles pero no estridentes. Imágenes espaciales como apoyo, **nunca en lugar de información**. No caricaturas, monedas, rankings ficticios ni animación 3D.

**Accesibilidad mínima:** contraste legible, botones con etiquetas, estados no dependientes solo del color y diseño usable en portátil y móvil.

---

## 8. Referencias visuales (enlaces reales)

**Nota:** las imágenes sugeridas previamente en el chat se mostraron como referencias visuales generadas mediante búsqueda, sin conservar un enlace individual verificable para cada miniatura. Los enlaces siguientes son **referencias equivalentes verificadas**, no afirmaciones de que sean exactamente los mismos archivos.

### Bases lunares / espacio

1. **[NASA — Moon Base Renderings (galería oficial)](https://www.nasa.gov/gallery/moon-base-renderings/)**. Hábitats, paneles solares, rovers, infraestructura y conceptos de fases lunares. **Referencia principal para NEXUS**.
2. **[NASA — Moon Base (visión general e imágenes)](https://www.nasa.gov/moonbase/)**. Base lunar, hábitats, sistemas y escenario del polo sur.
3. **[NASA — Moon Base Phases](https://www.nasa.gov/moonbase-phases/)**. Conceptos visuales de infraestructura por fases.
4. **[NASA — Lunar South Pole Visualizations](https://www.nasa.gov/gallery/lunar-south-pole-visualizations/)**. Paisaje lunar y topografía para fondos discretos.
5. **[Imagen directa de concepto de base lunar con paneles e invernadero](https://scitechdaily.com/images/Artist-Impression-Moon-Base-scaled.jpg)** (alojada por SciTechDaily; usar **solo como inspiración** hasta verificar autoría/licencia).

### Panel de misión / experiencia profesional

6. **[NASA — JSC Mission Control Center](https://www.nasa.gov/johnson/jsc-mission-control-center/)**. Referencia de una auténtica sala de control y el rol de sus sistemas.
7. **[NASA — Johnson Virtual Tours](https://www.nasa.gov/johnson/virtual-tours/)**. Interfaz mental de un centro de control real.

**Uso responsable:** verificar atribución y condiciones de uso de cada imagen antes de incorporarla al producto; el proyecto no está afiliado a NASA. La opción con menos riesgos es diseñar fondos y diagramas propios inspirados en estas referencias y enlazar las fuentes.

---

## 9. Reparto de trabajo: 4 integrantes

**Organización:** el equipo está compuesto por cuatro integrantes y las funciones se distribuyen para cubrir todas las entregas del MVP.

| Rol (1 persona) | Responsabilidad principal | Entrega comprobable |
|---|---|---|
| **1. Coordinación + producto + pitch** | Organizar el trabajo, priorizar alcance, mantener contacto con el evento, preparar el guion de demo y la presentación | Equipo coordinado, pitch y entrega listos |
| **2. Motor / lógica** | Estado, reglas, siete ciclos, eventos, victoria/fracaso y pruebas automatizadas | Simulación determinista funcionando |
| **3. Frontend / UI + integración** | Dashboard, controles, responsive, alertas, conectar motor e interfaz, despliegue | Plataforma usable y enlace público |
| **4. Ciencia + validación + documentación** | Investigar NASA, redactar explicaciones, verificar balance, probar el debrief y escribir README/fuentes | Contenido científico y documentación verificables |

**Los nombres se asignan al inicio**, según habilidades. Cada resultado tendrá una persona responsable. Coordinarse en tareas puntuales sin duplicar áreas enteras.

**Regla:** cada integrante reporta en el grupo al completar un hito, adjuntando enlace, captura o commit. Mantener una rama estable (`main`) e integrar con frecuencia.

---

## 10. Plan de ejecución — 24 horas de reloj

**Ventana interna sugerida:** sábado 14 de noviembre, 09:00 → domingo 15 de noviembre, 09:00 (ajustar a la apertura real del evento local). La plataforma oficial acepta proyectos del **14 de noviembre a las 09:00 al 15 de noviembre a las 23:59, hora local**; el plazo local de presentaciones podría ser anterior. Nuestro objetivo es **congelar el producto en 24 horas** y reservar el margen restante para ensayar, corregir y entregar, nunca para ampliar el alcance.

| Tiempo | Meta / hito de salida |
|---|---|
| **T+0 a T+1** | Roles, GitHub, Vite, rutas, contrato `scenario.json`; aprobar alcance P0 |
| **T+1 a T+4** | Motor inicial + dashboard estático + enlaces a fuentes NASA |
| **T+4 a T+8** | Controles conectados al motor, ciclos 1–7 y consecuencias visibles |
| **T+8 a T+12** | Evento solar y panel radiación; resultados ganar/perder verificables |
| **T+12 a T+16** | Debrief con historial y aprendizaje; primer deploy público |
| **T+16 a T+20** | Pruebas completas, balance, corrección de bugs y diseño responsivo |
| **T+20 a T+22** | README, créditos, descripción oficial, capturas y video demo |
| **T+22 a T+24** | Ensayo del pitch, revisión cruzada, **feature freeze** y backup |

**Puntos de corte para no morir en el intento:**
- Si en **T+8** no hay simulación jugable, abandonar mejoras visuales.
- Si en **T+12** no hay radiación integrada, simplificar el evento a una decisión binaria con efectos consistentes.
- Si en **T+16** no hay debrief, generar informe textual + tabla histórica, sin gráficos sofisticados.
- Si en **T+20** no hay despliegue, priorizar URL pública, README y grabación sobre cualquier otra feature.

### Recursos mínimos a llevar

Portátiles, cargadores, hotspot/plan de datos, acceso a GitHub y plataforma oficial, batería o regleta, repo espejo/ZIP local, herramienta para grabar pantalla y un archivo con cuentas/enlaces **sin contraseñas compartidas**.

---

## 11. Evaluación y estrategia para destacar

La edición 2026 utiliza **Impact, Creativity, Validity, Relevance, Presentation** como criterios descritos en páginas de eventos oficiales de Space Apps; la rúbrica y ponderación exacta del jurado local de Managua deben confirmarse con la organización.

| Criterio | Evidencia que debemos mostrar, no solo prometer |
|---|---|
| **Impacto** | Un estudiante completa una misión breve y explica 2 compromisos de ingeniería; posible uso en aula |
| **Creatividad** | Experiencia de *mission control* seria, con decisiones comparables y análisis posterior |
| **Validez** | Reglas coherentes, distinción explícita entre unidades didácticas y datos reales, 4+ fuentes NASA |
| **Relevancia** | Oxígeno/agua, energía, cultivos y radiación **funcionan como sistema integrado** |
| **Presentación** | Demo en vivo de una emergencia, pantalla final, historia y enlaces verificables |

**Peligro que hay que evitar:** presentar un dashboard bonito con barras que se mueven arbitrariamente. Los jueces deben **ver causalidad y aprendizaje**.

### Demo recomendada (90–120 segundos)

1. **15 s — Problema:** «No se aprende ingeniería lunar viendo datos aislados; se aprende decidiendo bajo restricciones».
2. **15 s — Solución:** abrir NEXUS y mostrar la misión.
3. **40 s — Prueba:** producir oxígeno → cae agua/energía; activar cultivo → consumo y producción diferida; llega alerta de radiación → activar refugio.
4. **20 s — Resultado:** mostrar el debrief y señalar una decisión crítica y su explicación NASA.
5. **10 s — Cierre:** «NEXUS convierte compromisos reales de ingeniería en una práctica STEM accesible».

**Plan B del pitch:** video de pantalla sin audio o con subtítulos + capturas por si la web falla o hay mala conexión. Mantener inglés básico en título y resumen para evaluación global; la presentación local puede ser en español, salvo indicaciones de la sede.

---

## 12. Lista final de verificación

### Producto

- [ ] Una misión completa de siete ciclos, reproducible.
- [ ] Cuatro pilares del reto visibles: soporte vital, energía, alimentos, radiación.
- [ ] Las acciones consumen y producen recursos de forma coherente.
- [ ] Al menos una emergencia solar con decisión significativa.
- [ ] Victoria y fracaso posibles; el sistema explica el motivo.
- [ ] Debrief con historia de decisiones y 2–3 conceptos aprendidos.
- [ ] Se puede reiniciar; no hay pantallas rotas, valores negativos ni bloqueos.
- [ ] Funciona desde un enlace público, en otro dispositivo, sin usuario.

### Ciencia y claridad

- [ ] Cada afirmación científica importante está respaldada por un enlace identificable.
- [ ] Los valores inventados están etiquetados como parámetros didácticos.
- [ ] No se confunden tormentas marcianas con fenómenos lunares.
- [ ] No se promete precisión operacional ni médica.
- [ ] Créditos de arte y referencias incluidos.

### Entrega y equipo

- [ ] 4 integrantes confirmados y registrados en la plataforma.
- [ ] GitHub, deployment y README accesibles.
- [ ] Página de proyecto oficial completada, con título, resumen, reto, fuentes y demo.
- [ ] Capturas de pantalla y video de respaldo guardados.
- [ ] Pitch ensayado dos veces, con cronómetro.
- [ ] **Verificado el horario límite local**; no confiar solo en el límite global.

---

## 13. Fuentes científicas y reglas del evento

**Desafío y entrega**

- NASA Space Apps — Reto: https://www.spaceappschallenge.org/2026/challenges/junior-astronaut-mission-trainer/
- NASA Space Apps 2026 — fechas, equipos y envío: https://www.spaceappschallenge.org/2026/
- NASA Space Apps 2026 — ejemplo de criterios publicado por una sede oficial: https://www.spaceappschallenge.org/2026/local-events/ajmer/

**Fuentes científicas verificadas**

- NASA — Environmental Control and Life Support Systems (ECLSS): https://www.nasa.gov/reference/environmental-control-and-life-support-systems-eclss/  
  **Aplicación:** reciclaje de agua, producción de oxígeno mediante electrólisis, interdependencia de subsistemas.
- NASA — About the Space Radiation Element: https://www.nasa.gov/reference/about-the-space-radiation-element/  
  **Aplicación:** radiación cósmica y solar como riesgos reales.
- NASA Langley — Radiation Analysis and Shielding Design: https://ddtrb.larc.nasa.gov/radiation/  
  **Aplicación:** materiales protectores y complejidad del blindaje.
- NASA — Growing Plants in Space: https://www.nasa.gov/exploration-research-and-technology/growing-plants-in-space/  
  **Aplicación:** cultivos en ambientes controlados, necesidad de agua y luz.
- NASA Science — Challenges of Growing Plants in Space: https://science.nasa.gov/biological-physical/the-challenges-of-growing-plants-in-space/  
  **Aplicación:** particularidades de gravedad y luz en Luna, cultivos protegidos.
- NASA — Moon Base Systems: https://www.nasa.gov/moonbase-systems/  
  **Aplicación:** infraestructura de hábitat y energía en bases lunares.
- NASA — JSC Mission Control Center: https://www.nasa.gov/johnson/jsc-mission-control-center/  
  **Aplicación:** referencia de operación y lenguaje visual.

---

## 14. Presentación de proyecto (copy de trabajo)

**Título:** NEXUS: Último Horizonte — Lunar Mission Trainer

**Resumen corto:**

> NEXUS is a web-based lunar mission simulation platform designed to help students understand the engineering trade-offs behind space exploration. Through a realistic mission-control interface, learners balance life support, power, food production, and radiation safety over seven operational cycles. Each decision affects interconnected systems, while a final science debrief explains the outcomes using NASA educational and technical resources.

**Afirmación final defendible:** NEXUS no simula una misión espacial con exactitud física. **Simula de manera honesta decisiones esenciales de ingeniería** para que una persona joven comprenda sus interdependencias. Ese es nuestro producto de 24 horas, y esa es nuestra propuesta para competir.

**FIN — Todo lo que no aparezca aquí se considera trabajo posterior al hackatón.**

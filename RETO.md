# NEXUS: Último Horizonte — reto, idea y contexto

## 1. El reto del hackatón

Participamos en **NASA Space Apps Challenge 2026** con el reto oficial [Build a Junior Astronaut Mission Trainer](https://www.spaceappschallenge.org/2026/challenges/junior-astronaut-mission-trainer/).

El reto parte de un problema concreto: gran parte del material de ciencia espacial para estudiantes simplifica demasiado los compromisos de la ingeniería espacial o es tan complejo que pierde su atención. Se pide una **aplicación o juego interactivo** donde estudiantes operen una base lunar o marciana y equilibren cuatro áreas:

- soporte vital,
- protección contra radiación,
- energía,
- producción de alimentos.

La meta es que experimenten por qué una misión triunfa o fracasa, no que memoricen datos.

**Restricción de la entrega:** prototipo funcional desarrollado en un hackatón de **24 horas**, con enlace público, repositorio y evidencia de funcionamiento sin credenciales.

## 2. La idea actual

**NEXUS: Último Horizonte** es una plataforma web educativa de **LifePlants** para NASA Space Apps 2026: un simulador determinista de operaciones lunares con una interfaz inspirada en centros de control espaciales.

El usuario asume el mando de **Lunar Outpost Alpha** con dos tripulantes y debe mantener la base operativa durante **siete ciclos**. En cada ciclo elige prioridades —soporte vital, cultivo y protección—, ejecuta la simulación y observa las consecuencias sobre oxígeno, agua, energía, alimentos y exposición a radiación. Un evento solar obliga a decidir entre continuar operaciones o refugiarse, con un costo real en ambos casos. Al finalizar, un **debrief científico** explica el resultado, relaciona las decisiones con conceptos de ingeniería espacial y permite reintentar el mismo escenario para comparar estrategias.

La propuesta se apoya en tres decisiones de diseño:

1. **Causalidad visible:** una proyección previa muestra el efecto de cada decisión antes de ejecutarla.
2. **Costos reales:** producir oxígeno o alimentos consume agua y energía; protegerse reduce la exposición pero limita otras operaciones.
3. **Honestidad científica:** todas las cifras son unidades didácticas de simulación, no dosis médicas ni predicciones operativas. Las fuentes de NASA respaldan los conceptos, no los coeficientes del juego.

**Sesión objetivo:** 5–8 minutos, reproducible: la misma secuencia de decisiones produce el mismo resultado.

### Lo que no es

- No es un juego 3D, *city builder*, mundo abierto ni una app con monedas y recompensas.
- No calcula dosis reales de radiación ni clima espacial.
- No requiere cuentas, backend, IA generativa, multijugador ni hardware.
- No está afiliado a NASA: es un proyecto independiente presentado al hackatón.

## 3. Contexto

- **Equipo:** LifePlants, cuatro integrantes. Managua, Nicaragua (UAM).
- **Evento:** NASA Space Apps Challenge 2026, edición local de Managua.
- **Público:** estudiantes de secundaria (13–18 años), docentes STEM y principiantes en exploración espacial, además del jurado local.
- **Resultado educativo buscado:** al terminar, la persona debe poder explicar al menos dos relaciones causa–efecto, por ejemplo que producir oxígeno consume agua y energía, o que proteger a la tripulación cambia el resto de las operaciones.
- **Elección de escenario:** se eligió la Luna y no Marte para sostener un único contexto científico y entregar un producto completo en 24 horas.

### Estado del proyecto

- Simulador implementado en React, Vite, TypeScript y Tailwind CSS, con persistencia en `localStorage` y motor determinista cubierto por pruebas Vitest.
- Flujo completo: `BRIEFING → MISSION CONTROL → DEBRIEF`, con rutas de victoria y fracaso verificadas.
- Documentación científica y de producto en `README.md`, `PRODUCT.md`, `DESIGN.md` y `NEXUS_Plan_24h_v1_2.md`.
- Pendiente: publicación en URL pública (Vercel o Netlify), QA visual en navegador, video de demostración y confirmación de la ficha oficial de entrega con los organizadores.

## 4. Enlaces

- Reto oficial: https://www.spaceappschallenge.org/2026/challenges/junior-astronaut-mission-trainer/
- Repositorio y ejecución local: ver `README.md`

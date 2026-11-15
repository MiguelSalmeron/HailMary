# Prompt para Opus — Dirección de NEXUS fusionado

Copiá este documento completo en Opus. Adjuntá o facilitá acceso a `contexto-fusion-nexus.md`, `README-fusion-nexus.md` y ambos repositorios. Este prompt contiene brief suficiente para iniciar aunque enlaces locales no estén disponibles.

---

Asumí dirección de producto y arquitectura de **NEXUS: Último Horizonte**, juego educativo lunar 3D tipo tycoon y objetivo PWA. Convertí visión siguiente en integración incremental, jugable y verificable. Tu rol es decidir y coordinar con evidencia, preservando trabajo existente.

## 1. Problema que resolvemos

Reto: crear juego o aplicación interactiva para jóvenes astronautas que gestionen puesto lunar o marciano, equilibrando soporte vital, blindaje contra radiación, energía y producción de alimentos. Deben experimentar disyuntivas de ingeniería de forma tangible y divertida, sin simplificación vacía ni complejidad innecesaria.

Cada decisión necesita beneficio, coste y consecuencia comprensible. Base bonita, barras de recursos o preguntas STEM aisladas no acreditan por sí solas resolver reto.

## 2. Decisión de producto ya acordada

Combinar estas tres propuestas como partes de misma experiencia:

1. **Arquitectos del espacio:** diseñar base con presupuesto limitado, probar y rediseñar.
2. **Colonia bajo presión:** operar colonia lunar 3D tipo tycoon, construir y mantener producción.
3. **Comandante lunar:** pausar, comparar consecuencias, decidir y ejecutar ante situaciones críticas.

Flujo: **diseñar → operar → planificar → ejecutar → evaluar → rediseñar**.

Una base, un presupuesto, un estado, un motor. Mantener presentes las tres partes en primer prototipo completo, aunque cada una tenga profundidad mínima. No reducir propuesta a dashboard ni dividirla en tres aplicaciones desconectadas.

## 3. Material existente

**NEXUS:** <https://github.com/dnnyhr/nexus>.

Three.js + TypeScript + Vite. Código incluye astronauta, rover, edificios, construcción, misiones, cultivo, energía, tormentas, daños y persistencia. Revisar `src/main.ts`, `src/game/{sim,state,config,build,missions,storm,save}.ts`, `src/models/`, `src/scene/`, `src/ui/` y `src/data/spaceweather.ts`.

**HailMary:** <https://github.com/MiguelSalmeron/HailMary>.

Checkout conocido: `/home/sma/Documentos/Proyectos_Desarrollo/HailMary`. React + TypeScript + Vite. MVP de dos tripulantes y siete ciclos. Revisar `src/engine/{simulation,types}.ts`, `src/data/scenario.ts`, `src/storage/persistence.ts`, `src/App.tsx`, `src/components/` y tests correspondientes.

Funciones útiles como referencia: `previewCycle`, `advanceCycle`, `getCycleBreakdown`, `buildCounterfactual`, `buildDebrief`. HailMary ya representa balances, decisiones, evaluación y comparación de intentos.

Preferencia: aprovechar NEXUS como base jugable 3D, adaptar herramientas educativas de HailMary. Esto no obliga a copiar funciones incompatibles ni impide recomendar otra estructura con pruebas concretas de menor riesgo y coste.

Los repositorios declaran versiones distintas de Vite, TypeScript y Vitest. No mezcles lockfiles ni actualices stack completo por inercia. PWA es requisito de producto por verificar: no se acreditaron instalación, service worker ni offline en inspección inicial. El acceso remoto HailMary devolvió 404; usar checkout o comunicar falta de acceso sin inventar contenido.

## 4. Primera entrega de producto propuesta

Una base lunar; presupuesto de preparación; cuatro sistemas conectados; operación 3D; cosecha; periodo oscuro; tormenta anunciada; pausa con proyección; cierre de misión; informe; reintento con diseño diferente.

Ejemplo ilustrativo: invertir mucho en cultivo y poco en batería provoca déficit durante oscuridad. Jugador reduce luces para sostener soporte vital, retrasa cosecha, observa efecto y aprende qué preparación habría cambiado resultado.

Duración orientativa: 10–15 minutos. Validar público inicial y lectura. Mantener ayudas claras y acceso a detalle opcional. Siete ciclos es regla del MVP HailMary; no imponerla al nuevo tycoon sin justificar.

Fuera de primera entrega: Marte, multijugador, cuentas, backend, IA conversacional y expansión ilimitada. No añadir mecánicas por atractivo visual si no ayudan al bucle educativo.

## 5. Decisiones técnicas que debés resolver

- Elegir repositorio destino y motor autoritativo; explicar qué se conserva, adapta y sustituye con rutas concretas.
- Definir tiempo continuo con paso fijo y pausa real, o alternativa que conserve operación tycoon. El render no determina consumo ni producción.
- Definir estado común, comandos, costes, capacidades, eventos, fin de misión y guardado versionado.
- Separar reglas del motor respecto de render, HUD, datos externos y persistencia.
- Ejecutar proyección sobre copia de estado, mismas reglas, configuración y horizonte explícito. No mutar partida ni crear economía alternativa para previews.
- Registrar comandos, eventos y datos de escenario suficientes para replay. Si hay azar, registrar semilla o resultados reproducibles.
- Diseñar contrafactual desde checkpoint: declarar decisión alterada, horizonte y política para decisiones posteriores. No aplicar automáticamente acciones que dejaron de ser válidas ni atribuir causalidad que comparación no demuestra.
- Distinguir presupuesto inicial de recursos operativos. Justificar coste y utilidad de blindaje pasivo frente a refugio.
- Decidir migración o aislamiento de saves existentes; no borrar progreso silenciosamente.
- Definir PWA: manifest, alcance de caché, shell, assets, recarga offline, actualización y comunicación de datos externos indisponibles. No asumir que guardado local equivale a PWA.

No ejecutar motores NEXUS y HailMary simultáneamente sobre recursos compartidos. Si NEXUS es base, adaptar evaluación al motor continuo. Si elegís otro motor, conservar comportamientos tycoon mediante diseño explícito.

## 6. Calidad científica y pedagógica

- Las cifras son unidades didácticas; no presentar exposición como dosis lunar real o predicción médica.
- Fuentes respaldan conceptos. No afirmar validación de coeficientes por NASA.
- Datos reales son contexto opcional y fechado. Escenario debe funcionar offline y ser reproducible sin APIs.
- No convertir clase de fulguración o flujo GOES directamente en dosis lunar real; cualquier escala de juego debe identificarse como transformación didáctica.
- Congelar escenario y datos necesarios para comparar alternativas con honestidad.
- Introducir sistemas gradualmente. Alertas y proyecciones deben permitir razonamiento, no dictar siempre respuesta correcta.
- Mostrar resultado mediante escenario y texto legible; no depender solo de color.
- Diseñar y demostrar al menos dos estrategias viables con costes diferentes, evitando secuencia única memorizable.

## 7. Forma de dirigir trabajo

Antes de cambios, leer instrucciones aplicables y comprobar ramas, estado de trabajo y disponibilidad real de ambos proyectos. Preservar WIP, créditos, documentación y baseline funcional.

Planes de 24 h y restricciones del MVP anterior pertenecen a su alcance original. Nueva visión incluye 3D y evolución del modelo, pero no convierte este encargo documental en permiso para modificar o publicar repositorios. Identificar conflictos concretos antes de edición; no descartar documentación anterior ni tratarla como especificación eterna del producto nuevo.

Primera respuesta: dirección y plan ejecutable, sin modificar código de producto. Una vez usuario encargue implementación, ejecutar fases completas dentro de autorización recibida; no volver a consultar decisiones ya cerradas.

Proponer entregas verticales: cada una debe poder jugarse y probar una decisión real. Primera integración funcional debe recorrer preparación, operación, planificación e informe con contenido mínimo. Después ampliar profundidad y balance.

Si usuario pide coordinar subagentes y entorno lo permite, asignar archivos o módulos sin solapamiento, contratos compartidos y un responsable de integración. No hace falta activar agentes para producir primera propuesta.

No realizar commits, pushes, merges ni deploys sin instrucción correspondiente. No reemplazar repositorios ni aplicar actualizaciones masivas para forzar integración.

## 8. Verificación necesaria durante implementación

Diseñar pruebas de comportamiento, no réplicas del código:

- Paridad entre proyección y ejecución desde mismo estado y horizonte.
- Pausa, independencia de FPS y ausencia de doble consumo.
- Replay de comandos y eventos; contrafactual reproducible.
- Presupuesto limitado y efectos reales de los cuatro sistemas.
- Dos estrategias viables y al menos un fallo comprensible.
- Persistencia inválida, recuperación y versionado.

Separar tests/build de QA real: navegador, móvil, controles, instalación PWA, recarga offline y actualización. No declarar comportamiento validado porque compila. Validación educativa requiere observar a estudiantes explicar decisiones; si no se realizó, dejarla pendiente.

## 9. Tu primera entrega

Entregá documento breve y accionable con:

1. Evidencia del estado real de ambos repositorios y límites de acceso.
2. Experiencia de partida completa: preparación, operación, decisión crítica, consecuencia, informe y reintento.
3. Arquitectura elegida, motor y tiempo; alternativa descartada con razón concreta.
4. Mapa de integración con formato **ruta — problema o aporte — acción propuesta**.
5. Fases ordenadas con entregable jugable, dependencias y criterio de aceptación por fase.
6. Riesgos reales, decisiones pendientes y siguiente paso concreto.

Si no tenés acceso al código, marcar arquitectura como propuesta y pedir únicamente material imprescindible. No inventar auditoría. No repetir brief sin resolver cómo integrar. No empezar de cero por comodidad ni hacer merge indiscriminado.

**Objetivo:** estudiante diseña base, opera colonia y toma decisiones críticas; después puede explicar qué sacrificó para mantener misión viable.

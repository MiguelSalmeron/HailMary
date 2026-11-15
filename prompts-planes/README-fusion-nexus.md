# NEXUS: Último Horizonte

**Diseñá base lunar. Hacela funcionar. Entendé consecuencias de tus decisiones.**

Propuesta de evolución de [NEXUS](https://github.com/dnnyhr/nexus) y [HailMary](https://github.com/MiguelSalmeron/HailMary), equipo LifePlants. Juego educativo 3D tipo tycoon, con planificación de misión y experimentación de ingeniería.

**Estado:** visión de producto acordada; integración pendiente. Este README es propuesta para versión fusionada. [README actual de HailMary](../README.md) conserva instrucciones y reglas de versión existente.

## Desafío

Gestionar puesto avanzado espacial implica demandas contrapuestas: producir oxígeno consume recursos; cultivar exige energía y agua; proteger tripulación tiene coste; atravesar oscuridad requiere reservas.

NEXUS busca convertir esas decisiones en experiencia accesible para estudiantes. Cada elección debe mostrar beneficio, coste y consecuencia observable. La victoria exige estrategia sostenible; informe final permite comprenderla y mejorarla.

Proyecto independiente, no afiliado a NASA. Referencias científicas respaldan conceptos; no validan automáticamente coeficientes del juego. Recursos y exposición usarán unidades didácticas claramente identificadas.

## Una experiencia, tres etapas

### 1. Diseñar: Arquitectos del espacio

Preparás base con presupuesto limitado. Elegís capacidades y reservas: soporte vital, generación y almacenamiento energético, cultivo y protección.

Más inversión en un sistema deja menos para otros. Diseño inicial condiciona opciones durante misión. Primera versión puede usar posiciones fijas y capacidades configurables; construcción libre no es requisito.

### 2. Operar: Colonia bajo presión

Recorrés base 3D, seleccionás instalaciones y gestionás funcionamiento. Cultivo crece, baterías almacenan energía, tripulación consume reservas. Objetivos breves guían aprendizaje y desbloquean decisiones gradualmente.

La base debe representar estado real de simulación. Un invernadero detenido o una reserva crítica se reconoce visualmente y también mediante indicadores legibles.

### 3. Comandar: decisiones bajo restricciones

Podés pausar para comprender situación y comparar alternativas. Panel muestra qué ocurre dentro de horizonte definido si cambiás configuración. Al confirmar, simulación aplica mismas reglas que produjo proyección.

Las alertas anticipan problemas para permitir preparación. Pausar debe detener consumo, producción, cultivo y eventos; animaciones decorativas pueden continuar.

## Ejemplo de partida

Invertiste en invernadero grande y poca capacidad de batería. Durante periodo oscuro, luces de cultivo y soporte vital compiten por energía. Bajás iluminación para sostener oxígeno; cosecha se retrasa. Tormenta posterior exige decidir cuánto trabajo suspender y qué protección activar.

Informe final conecta inversión inicial, decisiones operativas y resultados. Reintentás con más almacenamiento, menor demanda o reservas distintas. Ejemplo ilustrativo: costes y balance todavía deben diseñarse y probarse.

## Cuatro sistemas conectados

- **Soporte vital:** mantener oxígeno y agua disponibles; producción y reciclaje tienen costes.
- **Energía:** generar, almacenar y repartir entre funciones; oscuridad pone a prueba preparación.
- **Alimentos:** invertir recursos antes de cosechar; equilibrar crecimiento y reservas disponibles.
- **Protección:** reducir exposición mediante blindaje y refugio; justificar coste de construcción y operación.

Blindaje pasivo y refugio operativo deben tener funciones distinguibles. Los costes concretos se definen mediante balance; ningún sistema debe convertirse en mejora gratuita o respuesta siempre dominante.

## Bucle de aprendizaje

**Diseñar → operar → observar problema → pausar y proyectar → decidir → ver consecuencia → evaluar → rediseñar.**

Primera misión debe admitir al menos dos estrategias viables diferentes. Evaluación considera supervivencia, recursos, alimentos y protección, explicando compromisos. Perder permite aprender y reintentar sin perder acceso al informe.

## Primera entrega

- Una base lunar con selección de edificios y controles táctiles/teclado.
- Preparación con presupuesto limitado y decisiones de capacidad o reservas.
- Operación de cuatro sistemas bajo mismo motor.
- Cosecha, periodo oscuro y tormenta anunciada.
- Pausa, proyección de alternativa y confirmación de decisiones.
- Cierre de misión por objetivo cumplido o fallo explicado.
- Informe con decisiones, balances y al menos una comparación alternativa reproducida por motor cuando exista alternativa válida.
- Guardado local versionado y recuperación ante datos inválidos.
- Objetivo PWA: instalación y partida offline después de carga inicial y cacheado completos, sujetos a verificación real.

Duración orientativa: 10–15 minutos. Público inicial y nivel de lectura se validarán con estudiantes; ayudas progresivas permiten ampliar profundidad sin saturar inicio.

## Arquitectura propuesta

Preferencia: NEXUS como base de experiencia 3D y operación; adaptar herramientas educativas de HailMary. Opus debe validar arquitectura antes de fijar repositorio destino y dependencias.

Un estado autoritativo contiene recursos, instalaciones, cultivo, exposición, misión y tiempo de simulación. Comandos modifican ese estado mediante reglas compartidas. Render, HUD, proyecciones e informe consumen resultados del mismo motor.

Proyección usa copia de estado, mismas reglas, mismo escenario y horizonte explícito. No cambia partida real. Historial registra información suficiente para reconstruir decisiones y eventos. Contrafactual debe declarar qué cambia, qué mantiene y hasta cuándo compara.

El motor de siete ciclos de HailMary constituye referencia verificable del MVP; su adaptación a tycoon continuo requiere diseño. No ejecutar ambos motores en paralelo ni mezclar sus coeficientes sin criterio común.

## Datos y ciencia

Escenario educativo reproducible funciona sin depender de APIs. Datos DONKI/GOES pueden aportar contexto fechado o inspirar eventos mediante transformación didáctica documentada. Datos externos no deben cambiar reglas a mitad de una comparación.

Distinguir datos observados, snapshot y valores simulados. No presentar snapshot como dato en vivo; mostrar fecha y procedencia. No atribuir dosis lunares reales a simples conversiones de datos GOES o mediciones de ISS.

Conservar fuentes y créditos pertinentes de ambos proyectos. No usar logos ni afirmar afiliación NASA.

## Validación de entrega

- Proyección y ejecución coinciden desde mismo estado, comandos y horizonte.
- Pausa detiene simulación; FPS no alteran economía.
- Más de una estrategia completa misión con compromisos diferentes.
- Decisiones de los cuatro sistemas tienen efectos observables y explicables.
- Historial y alternativa se calculan; resultados no están prefabricados.
- Partida se recupera correctamente o comunica fallo de persistencia.
- Flujo completo funciona en navegador móvil y escritorio; controles no dependen exclusivamente de color, hover o arrastre.
- Instalación PWA, recarga offline y actualización se verifican por separado de tests y build.
- Estudiante puede explicar al menos una decisión y su coste después de jugar.

No hay comandos de instalación de versión fusionada: repositorio destino y stack definitivo siguen pendientes. Para ejecutar MVP HailMary, consultar [README vigente](../README.md).

## Documentación de dirección

- [Contexto y evidencia](contexto-fusion-nexus.md).
- [Prompt para Opus](prompt-opus-fusion-nexus.md).

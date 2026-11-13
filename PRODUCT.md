# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

React, Vite, TypeScript, Tailwind CSS, Vitest (sin backend, sin 3D, persistencia en localStorage).

## Users

Estudiantes de secundaria (13–18 años), docentes STEM y principiantes en exploración espacial, además del jurado de NASA Space Apps Challenge 2026 (Managua).

## Product Purpose

NEXUS: Último Horizonte es una plataforma web educativa de simulación de operaciones lunares (7 ciclos deterministas para 2 tripulantes en Lunar Outpost Alpha) que enseña ingeniería espacial mediante la administración de recursos interdependientes (soporte vital, energía, producción de alimentos y protección contra radiación) y un debrief científico respaldado por fuentes de NASA.

## Positioning

Simulador determinista de decisiones de ingeniería espacial con telemetría pre-vuelo y análisis causal post-misión, en lugar de un juego 3D o un dashboard decorativo.

## Operating Context

- Arquitectura de una sola página con máquina de estados: `BRIEFING → MISSION CONTROL → DEBRIEF`.
- Sesión objetivo de 5–8 minutos, reproducible y verificable sin credenciales.
- Persistencia en `localStorage` para restaurar la misión tras recargar y comparar intentos.

## Capabilities and Constraints

- 3 subsistemas independientes con controles discretos y previsualización de consumo/viabilidad antes de ejecutar cada ciclo.
- Unidades didácticas explícitas (no dosis médicas reales en mSv ni predicciones climáticas reales).
- Sin backend, sin autenticación, sin multijugador, sin árbol tecnológico, sin expansión a Marte.

## Brand Commitments

- Nombre: NEXUS: Último Horizonte — Lunar Mission Trainer.
- Estética: centro profesional de operaciones aeroespaciales (azul noche, negro, grises lunares, blanco, acentos cian y ámbar; sin caricaturas ni gamificación con monedas).
- Proyecto independiente presentado a NASA Space Apps Challenge 2026 (no afiliado a NASA).

## Evidence on Hand

- Especificación y modelo matemático congelado V1.0 en `NEXUS_Plan_24h_v1_2.md` y decisiones finales de dirección.
- Fuentes científicas verificadas de NASA (ECLSS, Space Radiation Element, Langley Shielding, Growing Plants in Space, Moon Base Systems, JSC Mission Control).

## Product Principles

1. Mostrar causalidad real entre sistemas antes de permitir errores silenciosos.
2. Hacer visible el costo operativo de cada decisión de ingeniería.
3. Distinguir explícitamente entre parámetros didácticos y datos reales de NASA.
4. Garantizar reproducibilidad determinista y recuperación ante recargas.

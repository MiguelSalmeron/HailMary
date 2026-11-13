# Regresión de recuperación

Sin nuevas dependencias del proyecto. Requiere Playwright y Chromium ya instalados en entorno de QA.

```sh
npm run dev -- --host 127.0.0.1 --port 4175
PLAYWRIGHT_MODULE=/ruta/playwright/index.mjs CHROMIUM_PATH=/ruta/chromium node tests/recovery.browser.mjs
```

`TEST_BASE_URL` permite otro puerto. Fixture aislada en `/tests/recovery.html`; Vite no la incluye en build de producción. Renderiza App y ErrorBoundary reales bajo StrictMode; fallo inyectado por componente auxiliar, sin modificar componentes de producto.

Antes del fix: recuperación con borrado normal pasó. `removeItem` rechazado produjo timeout esperando “Iniciar simulación”; App restauraba la misión antigua. Después del fix: contexto de recuperación fuerza sesión inicial en memoria, aunque limpiar storage falle. Si el navegador impide también escribir, no puede garantizarse borrar datos persistidos al recargar; la recuperación durante esta ejecución no depende del storage.

Cobertura: recuperación normal y con borrado rechazado, reinicio repetido, JSON corrupto, restauración íntegra del ciclo 3, doble click (un solo avance), siguiente ejecución tras cooldown. Los errores de render inyectados son esperados. Estas pruebas son funcionales, no QA de diseño ni despliegue.

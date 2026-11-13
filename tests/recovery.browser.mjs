import assert from 'node:assert/strict';
const { chromium } = await import(process.env.PLAYWRIGHT_MODULE || 'playwright');
const browser = await chromium.launch({ headless: true, executablePath: process.env.CHROMIUM_PATH });
const base = process.env.TEST_BASE_URL || 'http://localhost:4175';
const key = 'nexus_ultimo_horizonte_state_v1';
try {
  for (const denyRemove of [false, true]) {
    const page = await browser.newPage();
    await page.goto(`${base}/tests/recovery.html?seed${denyRemove ? '&denyRemove' : ''}`);
    await page.getByRole('button', { name: 'Ejecutar ciclo 3', exact: true }).waitFor();
    await page.getByRole('button', { name: 'Forzar error', exact: true }).click();
    await page.getByRole('button', { name: 'Reiniciar simulación', exact: true }).click();
    await page.getByRole('button', { name: 'Iniciar simulación', exact: true }).waitFor({ timeout: 3000 });
    assert.equal(await page.getByRole('button', { name: 'Ejecutar ciclo 3', exact: true }).count(), 0);
    await page.getByRole('button', { name: 'Iniciar simulación', exact: true }).click();
    await page.getByRole('button', { name: 'Ejecutar ciclo 1', exact: true }).waitFor();
    await page.getByRole('button', { name: 'Forzar error', exact: true }).click();
    await page.getByRole('button', { name: 'Reiniciar simulación', exact: true }).click();
    await page.getByRole('button', { name: 'Iniciar simulación', exact: true }).waitFor();
    console.log(`PASS render recovery; removeItem denied=${denyRemove}`);
    await page.close();
  }
  const page = await browser.newPage();
  await page.goto(`${base}/tests/recovery.html`);
  await page.evaluate(key => localStorage.setItem(key, '{'), key);
  await page.reload();
  await page.getByRole('button', { name: 'Iniciar simulación', exact: true }).waitFor();
  console.log('PASS corrupt session starts briefing');
  await page.goto(`${base}/tests/recovery.html?seed`);
  const saved = await page.evaluate(key => JSON.parse(localStorage.getItem(key)), key);
  await page.goto(`${base}/tests/recovery.html`);
  await page.getByRole('button', { name: 'Ejecutar ciclo 3', exact: true }).waitFor();
  assert.deepEqual(await page.evaluate(key => JSON.parse(localStorage.getItem(key)), key), saved);
  console.log('PASS full session restored');
  await page.getByRole('button', { name: 'Ejecutar ciclo 3', exact: true }).dblclick();
  await page.waitForTimeout(600);
  const executed = await page.evaluate(key => JSON.parse(localStorage.getItem(key)), key);
  assert.equal(executed.simulation.cycle, 4);
  assert.equal(executed.simulation.history.length, 3);
  console.log('PASS double click advances exactly once');
  await page.getByRole('button', { name: 'Ejecutar ciclo 4', exact: true }).click();
  await page.waitForFunction(key => JSON.parse(localStorage.getItem(key)).simulation.history.length === 4, key);
  console.log('PASS execution unlocks after cooldown');
} finally {
  await browser.close();
}

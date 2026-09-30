const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

async function run() {
  const outDir = path.join(__dirname, 'public', 'real_captures');
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  const browser = await puppeteer.launch({
    headless: 'new',
    defaultViewport: { width: 1920, height: 1080 },
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const BASE_URL = 'http://103.30.146.174:8000';

  // --- SCREEN 1: Landing Page Hero & Banner ---
  console.log('Capturing Screen 1: Landing Page...');
  {
    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1080 });
    await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle2' });
    await page.screenshot({ path: path.join(outDir, 'step1_landing_hero.png') });
    await page.close();
  }

  // --- SCREEN 3: Unified Onboarding Modal ---
  console.log('Capturing Screen 3: Unified Onboarding Modal...');
  {
    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1080 });
    await page.goto(`${BASE_URL}/#dashboard`, { waitUntil: 'networkidle2' });
    await new Promise(r => setTimeout(r, 1200));

    // Click onboarding button
    await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('button'));
      const btn = btns.find(b => b.textContent && (b.textContent.includes('Inisialisasi Data Usaha') || b.textContent.includes('Input Data Usaha')));
      if (btn) btn.click();
    });
    await new Promise(r => setTimeout(r, 1000));
    await page.screenshot({ path: path.join(outDir, 'step3_onboarding_modal.png') });
    await page.close();
  }

  // --- SCREEN 4: Dashboard & Decision Studio ---
  console.log('Capturing Screen 4: Dashboard Sandbox...');
  {
    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1080 });
    await page.goto(`${BASE_URL}/#dashboard`, { waitUntil: 'networkidle2' });
    await new Promise(r => setTimeout(r, 1200));
    // Scroll down to the sandbox section
    await page.evaluate(() => {
      window.scrollTo(0, 320);
    });
    await new Promise(r => setTimeout(r, 800));
    await page.screenshot({ path: path.join(outDir, 'step4_dashboard_sandbox.png') });
    await page.close();
  }

  // --- SCREEN 5: Simulation Chat Modal (Deficit Alert) ---
  console.log('Capturing Screen 5: Simulation Alert Modal...');
  {
    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1080 });
    await page.goto(`${BASE_URL}/#dashboard`, { waitUntil: 'networkidle2' });
    await new Promise(r => setTimeout(r, 1200));

    // Click the barista voice simulation chip
    await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('button'));
      const chip = btns.find(b => b.textContent && b.textContent.includes('Simulasi Voice Note Barista'));
      if (chip) chip.click();
    });
    await new Promise(r => setTimeout(r, 1500));
    await page.screenshot({ path: path.join(outDir, 'step5_simulation_alert.png') });
    await page.close();
  }

  // --- SCREEN 6: WhatsApp Negotiation Modal ---
  console.log('Capturing Screen 6: WhatsApp Modal...');
  {
    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1080 });
    await page.goto(`${BASE_URL}/#dashboard`, { waitUntil: 'networkidle2' });
    await new Promise(r => setTimeout(r, 1200));

    // First trigger simulation modal, then click "Draf WhatsApp"
    await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('button'));
      const chip = btns.find(b => b.textContent && b.textContent.includes('Simulasi Voice Note Barista'));
      if (chip) chip.click();
    });
    await new Promise(r => setTimeout(r, 1200));

    // Click Draf WhatsApp inside the modal
    await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('button'));
      const waBtn = btns.find(b => b.textContent && b.textContent.includes('Draf WhatsApp'));
      if (waBtn) waBtn.click();
    });
    await new Promise(r => setTimeout(r, 1000));
    await page.screenshot({ path: path.join(outDir, 'step6_whatsapp_modal.png') });
    await page.close();
  }

  await browser.close();
  console.log('=== ALL CLEAN PROJECT SCREENS CAPTURED! ===');
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});

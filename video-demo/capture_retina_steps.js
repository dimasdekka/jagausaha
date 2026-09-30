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
    defaultViewport: {
      width: 1920,
      height: 1080,
      deviceScaleFactor: 2 // Ultra-HD 2x Retina
    },
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--force-device-scale-factor=2',
      '--enable-font-antialiasing',
      '--font-render-hinting=medium'
    ]
  });

  const BASE_URL = 'http://103.30.146.174:8000';

  console.log('--- CAPTURING RETINA 2X APP SCREENS ---');

  // --- SCREEN 3: Unified Onboarding Modal ---
  console.log('Capturing Screen 3: Onboarding Modal (Retina 2x)...');
  {
    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1080, deviceScaleFactor: 2 });
    await page.goto(`${BASE_URL}/#dashboard`, { waitUntil: 'networkidle2' });
    await new Promise(r => setTimeout(r, 1500));

    // Click onboarding button
    await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('button'));
      const btn = btns.find(b => b.textContent && (b.textContent.includes('Inisialisasi Data Usaha') || b.textContent.includes('Input Data Usaha')));
      if (btn) btn.click();
    });
    await new Promise(r => setTimeout(r, 1500));

    // Save full page with 2x scale
    await page.screenshot({ path: path.join(outDir, 'step3_onboarding_modal.png') });
    console.log('Saved step3_onboarding_modal.png (Retina 2x)');

    // Also capture the modal dialog directly
    const modalEl = await page.$('.relative.w-full.max-w-5xl') || await page.$('[role="dialog"]') || await page.$('.bg-white.rounded-3xl');
    if (modalEl) {
      await modalEl.screenshot({ path: path.join(outDir, 'step3_modal_dialog_only.png') });
      console.log('Saved step3_modal_dialog_only.png (Isolated Modal Element)');
    }

    await page.close();
  }

  // --- SCREEN 4: Dashboard Sandbox ---
  console.log('Capturing Screen 4: Dashboard Sandbox (Retina 2x)...');
  {
    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1080, deviceScaleFactor: 2 });
    await page.goto(`${BASE_URL}/#dashboard`, { waitUntil: 'networkidle2' });
    await new Promise(r => setTimeout(r, 1500));
    await page.evaluate(() => {
      window.scrollTo(0, 320);
    });
    await new Promise(r => setTimeout(r, 1000));
    await page.screenshot({ path: path.join(outDir, 'step4_dashboard_sandbox.png') });
    console.log('Saved step4_dashboard_sandbox.png (Retina 2x)');
    await page.close();
  }

  // --- SCREEN 5: Simulation Chat Modal (Deficit Alert) ---
  console.log('Capturing Screen 5: Simulation Alert Modal (Retina 2x)...');
  {
    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1080, deviceScaleFactor: 2 });
    await page.goto(`${BASE_URL}/#dashboard`, { waitUntil: 'networkidle2' });
    await new Promise(r => setTimeout(r, 1500));

    // Click barista voice simulation chip
    await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('button'));
      const chip = btns.find(b => b.textContent && b.textContent.includes('Simulasi Voice Note Barista'));
      if (chip) chip.click();
    });
    await new Promise(r => setTimeout(r, 1800));
    await page.screenshot({ path: path.join(outDir, 'step5_simulation_alert.png') });
    console.log('Saved step5_simulation_alert.png (Retina 2x)');
    await page.close();
  }

  await browser.close();
  console.log('All Retina screens captured successfully!');
}

run().catch(err => {
  console.error('Error capturing retina screens:', err);
  process.exit(1);
});
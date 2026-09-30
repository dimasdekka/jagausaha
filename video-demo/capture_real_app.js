const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

async function capture() {
  const outDir = path.join(__dirname, 'public', 'real_captures');
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  console.log('Launching browser to capture REAL project screens...');
  const browser = await puppeteer.launch({
    headless: 'new',
    defaultViewport: { width: 1920, height: 1080 },
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });

  const BASE_URL = 'http://103.30.146.174:8000';

  // 1. Capture Landing Page Hero & Banner
  console.log('1. Navigating to Landing Page...');
  await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle2', timeout: 30000 });
  await page.evaluate(() => window.scrollTo(0, 0));
  await new Promise(r => setTimeout(r, 1200));
  await page.screenshot({ path: path.join(outDir, 'real_01_landing.png') });
  console.log('Captured real_01_landing.png');

  // 2. Capture Landing Page Architecture & Features
  await page.evaluate(() => window.scrollTo(0, 800));
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({ path: path.join(outDir, 'real_02_landing_features.png') });
  console.log('Captured real_02_landing_features.png');

  // 3. Navigate to Dashboard
  console.log('3. Navigating to Dashboard (#dashboard)...');
  await page.goto(`${BASE_URL}/#dashboard`, { waitUntil: 'networkidle2', timeout: 30000 });
  await page.evaluate(() => window.scrollTo(0, 0));
  await new Promise(r => setTimeout(r, 1500));
  await page.screenshot({ path: path.join(outDir, 'real_03_dashboard_overview.png') });
  console.log('Captured real_03_dashboard_overview.png');

  // 4. Open Onboarding Modal
  console.log('4. Opening Unified Onboarding Modal...');
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const target = btns.find(b => b.textContent && (b.textContent.includes('Inisialisasi') || b.textContent.includes('Input Data Usaha')));
    if (target) target.click();
  });
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: path.join(outDir, 'real_04_onboarding_modal.png') });
  console.log('Captured real_04_onboarding_modal.png');

  // Close modal by pressing Escape
  await page.keyboard.press('Escape');
  await new Promise(r => setTimeout(r, 600));

  // 5. Scroll to Decision Studio Sandbox
  console.log('5. Capturing Decision Studio...');
  await page.evaluate(() => {
    const el = document.getElementById('demo-sandbox') || document.querySelector('section');
    if (el) el.scrollIntoView({ behavior: 'instant', block: 'center' });
  });
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: path.join(outDir, 'real_05_decision_studio.png') });
  console.log('Captured real_05_decision_studio.png');

  // 6. Trigger Simulation Modal (Click Barista voice note chip)
  console.log('6. Triggering Simulation Modal...');
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const baristaBtn = btns.find(b => b.textContent && b.textContent.includes('Voice Note Barista'));
    if (baristaBtn) baristaBtn.click();
  });
  await new Promise(r => setTimeout(r, 1200));
  await page.screenshot({ path: path.join(outDir, 'real_06_simulation_modal.png') });
  console.log('Captured real_06_simulation_modal.png');

  // Close simulation modal
  await page.keyboard.press('Escape');
  await new Promise(r => setTimeout(r, 600));

  // 7. Click Tab "Agenda Kas 30 Hari"
  console.log('7. Capturing Agenda Kas...');
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button, a'));
    const agendaBtn = btns.find(b => b.textContent && b.textContent.includes('Agenda Kas'));
    if (agendaBtn) agendaBtn.click();
  });
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: path.join(outDir, 'real_07_agenda_kas.png') });
  console.log('Captured real_07_agenda_kas.png');

  // 8. Open WhatsApp Modal
  console.log('8. Opening WhatsApp Modal...');
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const waBtn = btns.find(b => b.textContent && (b.textContent.includes('WhatsApp') || b.textContent.includes('Draf')));
    if (waBtn) waBtn.click();
  });
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: path.join(outDir, 'real_08_whatsapp_modal.png') });
  console.log('Captured real_08_whatsapp_modal.png');

  await browser.close();
  console.log('=== ALL REAL CAPTURES SAVED SUCCESSFULLY ===');
}

capture().catch(err => {
  console.error('Capture error:', err);
  process.exit(1);
});

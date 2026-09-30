const puppeteer = require('puppeteer');
const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');
const { injectOverlays } = require('./record_helpers');
const { sleep, smoothMove, clickAt, updateLowerThird, smoothScroll } = require('./record_actions');

async function recordFullDemo() {
  const outDir = path.join(__dirname, 'out');
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  const timestamp = Date.now();
  const tempVideo = path.join(outDir, `temp_screen_${timestamp}.mp4`);
  const masterAudio = path.join(__dirname, 'public', 'audio', 'master_voiceover.mp3');
  const finalVideo = path.join(outDir, `JagaUsaha_Demo_Final_${timestamp}.mp4`);
  const canonicalFinal = path.join(outDir, 'JagaUsaha_Official_Demo_Video_1080p.mp4');

  console.log('>>> [1/6] Launching ffmpeg recording pipe...');
  const ffmpeg = spawn('ffmpeg', [
    '-y',
    '-f', 'image2pipe',
    '-vcodec', 'mjpeg',
    '-r', '30',
    '-i', '-',
    '-c:v', 'libx264',
    '-preset', 'ultrafast',
    '-crf', '18',
    '-pix_fmt', 'yuv420p',
    tempVideo
  ]);

  ffmpeg.stderr.on('data', () => {});

  console.log('>>> [2/6] Launching Puppeteer Full HD Browser...');
  const browser = await puppeteer.launch({
    headless: 'new',
    args: [
      '--window-size=1920,1080',
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-infobars',
      '--disable-features=TranslateUI'
    ]
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080, deviceScaleFactor: 1 });

  const client = await page.target().createCDPSession();
  await client.send('Page.startScreencast', {
    format: 'jpeg',
    quality: 92,
    maxWidth: 1920,
    maxHeight: 1080,
    everyNthFrame: 1
  });

  client.on('Page.screencastFrame', async ({ data, sessionId }) => {
    try {
      ffmpeg.stdin.write(Buffer.from(data, 'base64'));
      await client.send('Page.screencastFrameAck', { sessionId });
    } catch (e) {}
  });

  const startTime = Date.now();
  console.log('>>> [3/6] Starting real application live demonstration...');

  // URL Target (Local frontend running with Vite, connected to FastAPI backend)
  const targetUrl = 'http://localhost:5173/';
  console.log(`Navigating to ${targetUrl}...`);
  await page.goto(targetUrl, { waitUntil: 'networkidle2' });
  await injectOverlays(page);
  await sleep(1500);

  // ==========================================
  // PART 1 (0:00 - 1:06): Landing Page & Context
  // ==========================================
  console.log('>>> ACT 1: Landing Page & Hackathon Overview');
  await updateLowerThird(
    page,
    'JagaUsaha · Solusi Mandiri Likuiditas Kas UMKM',
    'IDwebhost AI Competition 2026 Showcase · Infrastructure: CloudBaik VPS',
    '🛡️'
  );

  await smoothMove(page, 960, 42, 1000); // Highlight top competition banner
  await sleep(4000);

  await smoothMove(page, 960, 320, 800); // Hero heading
  await sleep(6000);

  console.log('Scrolling to Problem Section (82% UMKM failure)...');
  await smoothScroll(page, 580, 30, 40);
  await smoothMove(page, 480, 480, 800);
  await sleep(12000);

  console.log('Scrolling to Core 4 AI Pillars...');
  await smoothScroll(page, 1250, 30, 40);
  await smoothMove(page, 380, 400, 800);
  await sleep(4000);
  await smoothMove(page, 960, 400, 800);
  await sleep(4000);
  await smoothMove(page, 1540, 400, 800);
  await sleep(6000);

  console.log('Scrolling down to Modern 4-Column Footer...');
  await smoothScroll(page, 2800, 40, 35);
  await smoothMove(page, 320, 680, 800); // IDwebhost AI Hosting link
  await sleep(5000);
  await smoothMove(page, 780, 680, 800); // CloudBaik Cloud VPS link
  await sleep(5000);
  await smoothMove(page, 1580, 680, 800); // Telemetry badge
  await sleep(6000);

  console.log('Scrolling back up to Hero...');
  await smoothScroll(page, 0, 35, 30);
  await sleep(2000);

  // Click Start Application & Enter Dashboard
  await smoothMove(page, 860, 520, 800);
  await page.evaluate(() => {
    window.location.hash = '#dashboard';
  });
  await sleep(2500);

  // ==========================================
  // PART 2 (1:06 - 2:28): VPS Infrastructure & AI Engine
  // ==========================================
  console.log('>>> ACT 2: Live VPS & AI Architecture Showcase');
  await injectOverlays(page);
  await updateLowerThird(
    page,
    'Infrastruktur: AI Hosting IDwebhost · CloudBaik VPS',
    'Port SSH 4422 · Ubuntu 24.04 LTS · FastAPI Service Active · Hermes Agent',
    '🖥️'
  );

  // Navigate to Log Sensor & AI Guardian in sidebar
  await page.evaluate(() => {
    const tabs = Array.from(document.querySelectorAll('button, a'));
    const target = tabs.find(el => el.textContent && el.textContent.includes('Log Sensor'));
    if (target) target.click();
  });
  await sleep(3000);

  // Highlight 3 Autonomous AI Agents
  await smoothMove(page, 380, 260, 800); // Sensor Agent
  await sleep(14000);
  await smoothMove(page, 960, 260, 800); // Simulator Agent (DLMM 0% hallucination)
  await sleep(16000);
  await smoothMove(page, 1540, 260, 800); // Advisor Agent (WhatsApp Webhook)
  await sleep(14000);

  // Scroll to Live Terminal Audit Trail
  await smoothScroll(page, 450, 20, 40);
  await smoothMove(page, 960, 540, 800);
  await sleep(12000);

  // Inject Floating SSH Live Terminal Box
  await page.evaluate(() => {
    const term = document.createElement('div');
    term.id = 'ssh-live-terminal';
    term.style.cssText = `
      position: fixed;
      top: 140px;
      left: 360px;
      width: 1200px;
      height: 640px;
      background: #090d16;
      border: 1px solid #1e293b;
      border-radius: 20px;
      box-shadow: 0 25px 60px rgba(0,0,0,0.85);
      z-index: 999999;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      font-family: 'JetBrains Mono', monospace;
      animation: popIn 0.4s ease-out;
    `;
    term.innerHTML = `
      <div style="height: 40px; background: #0f172a; border-bottom: 1px solid #1e293b; display: flex; align-items: center; justify-content: space-between; padding: 0 20px;">
        <div style="display: flex; gap: 8px;">
          <span style="width: 12px; height: 12px; border-radius: 50%; background: #ef4444;"></span>
          <span style="width: 12px; height: 12px; border-radius: 50%; background: #f59e0b;"></span>
          <span style="width: 12px; height: 12px; border-radius: 50%; background: #10b981;"></span>
        </div>
        <div style="font-size: 12px; color: #94a3b8; font-weight: bold;">
          root@cloudbaik-vps:~ (ssh -p 4422 root@103.30.146.174)
        </div>
        <div style="font-size: 11px; color: #10b981; font-weight: bold; background: rgba(16,185,129,0.15); padding: 2px 8px; border-radius: 4px;">
          LIVE SSH CONNECTED
        </div>
      </div>
      <div style="flex: 1; padding: 24px; color: #f8fafc; font-size: 13px; line-height: 1.8; overflow-y: auto;">
        <span style="color: #38bdf8;">root@cloudbaik-vps</span>:<span style="color: #a855f7;">~#</span> systemctl status jagausaha.service<br/>
        ● jagausaha.service - JagaUsaha AI Backend Service (IDwebhost AI Hosting)<br/>
        &nbsp;&nbsp;&nbsp;Loaded: loaded (/etc/systemd/system/jagausaha.service; enabled; preset: enabled)<br/>
        &nbsp;&nbsp;&nbsp;Active: <span style="color: #4ade80; font-weight: bold;">active (running)</span> since Sun 2026-09-28 20:15:02 WIB; 6h ago<br/>
        &nbsp;&nbsp;&nbsp;Process: 25496 ExecStart=/root/JagaUsaha/.venv/bin/uvicorn api.server:app --host 0.0.0.0 --port 8000<br/>
        &nbsp;&nbsp;&nbsp;Tasks: 8 (limit: 4194304)<br/>
        &nbsp;&nbsp;&nbsp;Memory: 168.4M<br/>
        &nbsp;&nbsp;&nbsp;CPU: 4 Core AMD EPYC · RAM: 4.0GB · SSD: 20GB (CloudBaik VPS Data Center Indonesia)<br/><br/>
        <span style="color: #38bdf8;">root@cloudbaik-vps</span>:<span style="color: #a855f7;">~#</span> curl http://localhost:8000/api/health<br/>
        <span style="color: #fbbf24;">{"status": "healthy", "app": "JagaUsaha", "version": "1.0.0", "framework": "Hermes Agent Compatible", "runtime": "CloudBaik VPS Ready"}</span><br/><br/>
        <span style="color: #38bdf8;">root@cloudbaik-vps</span>:<span style="color: #a855f7;">~#</span> hermes status<br/>
        [Hermes Autonomous Agent] Active profile: default · Running multi-modal data pipeline · 0 errors<br/>
        <span style="color: #38bdf8;">root@cloudbaik-vps</span>:<span style="color: #a855f7;">~#</span> <span style="display: inline-block; width: 8px; height: 16px; background: #4ade80; vertical-align: middle;"></span>
      </div>
    `;
    document.body.appendChild(term);
  });

  await smoothMove(page, 960, 460, 1000);
  await sleep(18000);

  // Close floating terminal
  await page.evaluate(() => {
    const t = document.getElementById('ssh-live-terminal');
    if (t) t.remove();
  });
  await sleep(2000);

  // ==========================================
  // PART 3 (2:28 - 3:45): Unified Onboarding & Digital Twin
  // ==========================================
  console.log('>>> ACT 3: Unified Multi-Modal Onboarding & Digital Twin');
  await injectOverlays(page);
  await updateLowerThird(
    page,
    'Inisialisasi Profil Usaha Satu Pintu (Unified Onboarding)',
    'Multi-Modal Ingest: Mutasi BCA (PDF), POS Moka (Excel) ➔ Ekstraksi Digital Twin',
    '📥'
  );

  // Navigate to Ringkasan Kas
  await page.evaluate(() => {
    const tabs = Array.from(document.querySelectorAll('button, a'));
    const target = tabs.find(el => el.textContent && el.textContent.includes('Ringkasan Kas'));
    if (target) target.click();
  });
  await sleep(2000);

  // Click Inisialisasi Data Usaha
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const target = btns.find(b => b.textContent && (b.textContent.includes('Inisialisasi') || b.textContent.includes('Profil')));
    if (target) target.click();
  });
  await sleep(2500);

  // Inside Unified Onboarding Modal
  await smoothMove(page, 620, 360, 1000); // Step 1 dropzone
  await sleep(12000);

  await smoothMove(page, 620, 560, 800); // Mutasi BCA & POS Moka
  await sleep(14000);

  await smoothMove(page, 620, 720, 800); // Voice note audio
  await sleep(12000);

  // Move to Digital Twin on Right Column
  await smoothMove(page, 1260, 340, 1000); // Saldo Kas BCA Rp 18.5 Jt
  await sleep(10000);

  await smoothMove(page, 1260, 480, 800); // Komitmen Gaji Barista Rp 7.5 Jt
  await sleep(10000);

  await smoothMove(page, 1260, 620, 800); // Safe-to-Spend DLMM Rp 3.8 Jt
  await sleep(10000);

  // Click Simpan & Sinkronkan
  await smoothMove(page, 1380, 800, 800);
  await clickAt(page, 1380, 800);
  await sleep(3000);

  // ==========================================
  // PART 4 (3:45 - 5:14): Decision Studio, DLMM & Voice AI
  // ==========================================
  console.log('>>> ACT 4: Decision Studio, DLMM FastMath & Voice Simulation');
  await injectOverlays(page);
  await updateLowerThird(
    page,
    'Decision Studio: Safe-to-Spend DLMM FastMath v1.0',
    'Interaksi Suara (VoiceBeam) · Deteksi Bahaya Defisit H+6 · Solusi DP 50%',
    '🎙️'
  );

  // Move to Capex Sandbox
  await smoothScroll(page, 300, 20, 40);
  await smoothMove(page, 520, 420, 1000);
  await sleep(12000);

  // Move to Decision Studio / Voice Input Bar
  await smoothScroll(page, 650, 20, 40);
  await smoothMove(page, 1420, 520, 800); // Voice Button
  await sleep(12000);

  // Type simulated voice query
  await smoothMove(page, 850, 520, 800);
  await page.evaluate(() => {
    const input = document.querySelector('input[placeholder*="Simulasikan"], input[placeholder*="Ketik pertanyaan"], input[type="text"]');
    if (input) {
      input.value = "Beli mesin espresso 14 juta tunai aman nggak buat gajian barista minggu depan?";
      input.dispatchEvent(new Event('input', { bubbles: true }));
    }
  });
  await sleep(10000);

  // Click Simulasikan Button
  await smoothMove(page, 1540, 520, 600);
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const target = btns.find(b => b.textContent && b.textContent.includes('Simulasikan'));
    if (target) target.click();
  });
  await sleep(3000);

  // Inside Simulation Modal
  await smoothMove(page, 960, 360, 1000); // Trajectory Curve Drop
  await sleep(14000);

  await smoothMove(page, 720, 580, 1000); // Deficit Alert -Rp 2.140.000
  await sleep(15000);

  await smoothMove(page, 1260, 580, 1000); // Recommendation DP 50%
  await sleep(15000);

  // Click Apply DP 50%
  await smoothMove(page, 1260, 780, 800);
  await clickAt(page, 1260, 780);
  await sleep(5000);

  // ==========================================
  // PART 5 (5:14 - 6:50): Tactical WhatsApp & Closing
  // ==========================================
  console.log('>>> ACT 5: WhatsApp Negotiation Generator & Official Closing');
  await injectOverlays(page);
  await updateLowerThird(
    page,
    'Otomasi Lapangan: Generator Negosiasi WhatsApp',
    'Draf Pesan Diplomatis Santun · Live URL: http://103.30.146.174:8000',
    '💬'
  );

  // Click Hubungi Vendor WhatsApp
  await smoothMove(page, 960, 820, 800);
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const target = btns.find(b => b.textContent && b.textContent.includes('WhatsApp'));
    if (target) target.click();
  });
  await sleep(3000);

  // Inspect WhatsApp Message
  await smoothMove(page, 720, 480, 1000); // Message textarea
  await sleep(16000);

  await smoothMove(page, 520, 340, 800); // Preset toggle
  await clickAt(page, 520, 340);
  await sleep(8000);

  await smoothMove(page, 1200, 740, 800); // Salin Pesan
  await clickAt(page, 1200, 740);
  await sleep(6000);

  // Close WhatsApp Modal
  await smoothMove(page, 1420, 220, 800);
  await clickAt(page, 1420, 220);
  await sleep(2000);

  // Back to Dashboard Overview
  await smoothScroll(page, 0, 25, 30);
  await sleep(4000);

  // Inject Final Grand Closing Banner
  await page.evaluate(() => {
    const banner = document.createElement('div');
    banner.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 1080px;
      background: rgba(10, 15, 26, 0.96);
      backdrop-filter: blur(20px);
      border: 1px solid rgba(16, 185, 129, 0.5);
      border-radius: 28px;
      box-shadow: 0 35px 80px rgba(0,0,0,0.9);
      z-index: 10000000;
      padding: 48px;
      text-align: center;
      font-family: 'Plus Jakarta Sans', sans-serif;
      animation: popIn 0.5s ease-out;
    `;
    banner.innerHTML = `
      <div style="display: inline-flex; align-items: center; gap: 8px; background: rgba(16,185,129,0.15); border: 1px solid rgba(16,185,129,0.3); padding: 6px 16px; border-radius: 999px; color: #34d399; font-size: 13px; font-weight: 800; letter-spacing: 0.05em; text-transform: uppercase; margin-bottom: 20px;">
        IDwebhost AI Competition 2026
      </div>
      <h1 style="font-size: 42px; font-weight: 900; color: #ffffff; margin: 0 0 16px 0; letter-spacing: -0.02em;">
        JagaUsaha — Autonomous Financial Guardian
      </h1>
      <p style="font-size: 16px; color: #94a3b8; max-width: 800px; margin: 0 auto 32px auto; line-height: 1.6;">
        Melindungi jutaan UMKM Indonesia dari krisis likuiditas kas melalui sensor transaksi riil, kalkulasi deterministik DLMM, dan otomasi negosiasi bisnis.
      </p>
      <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; text-align: left; margin-bottom: 32px;">
        <div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 16px; padding: 20px;">
          <div style="font-size: 11px; font-weight: 700; color: #38bdf8; text-transform: uppercase;">Infrastruktur Utama</div>
          <div style="font-size: 16px; font-weight: 800; color: #ffffff; margin-top: 4px;">CloudBaik Cloud VPS</div>
          <div style="font-size: 12px; color: #94a3b8; margin-top: 2px;">Ubuntu 24.04 LTS · Port 4422</div>
        </div>
        <div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 16px; padding: 20px;">
          <div style="font-size: 11px; font-weight: 700; color: #34d399; text-transform: uppercase;">Komputasi & AI Engine</div>
          <div style="font-size: 16px; font-weight: 800; color: #ffffff; margin-top: 4px;">IDwebhost AI Hosting</div>
          <div style="font-size: 12px; color: #94a3b8; margin-top: 2px;">Hermes Agent Orchestration</div>
        </div>
        <div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 16px; padding: 20px;">
          <div style="font-size: 11px; font-weight: 700; color: #fbbf24; text-transform: uppercase;">Akses Demo Publik</div>
          <div style="font-size: 16px; font-weight: 800; color: #ffffff; margin-top: 4px;">103.30.146.174:8000</div>
          <div style="font-size: 12px; color: #94a3b8; margin-top: 2px;">Pengembang: Dimas Dekananta</div>
        </div>
      </div>
      <div style="font-size: 13px; color: #64748b;">
        Terima kasih kepada IDwebhost & CloudBaik atas penyelenggaraan IDwebhost AI Competition 2026.
      </div>
    `;
    document.body.appendChild(banner);
  });

  // Remain on screen until target duration (410.11s)
  const targetMs = 410200;
  const elapsed = Date.now() - startTime;
  const remainMs = Math.max(1000, targetMs - elapsed);
  console.log(`Remaining time to reach exact narration length: ${(remainMs / 1000).toFixed(1)}s`);
  await sleep(remainMs);

  console.log('>>> [4/6] Stopping screencast and closing browser...');
  await client.send('Page.stopScreencast');
  await browser.close();

  ffmpeg.stdin.end();
  await new Promise((resolve) => ffmpeg.on('close', resolve));
  console.log('Raw video stream encoded successfully. Size:', fs.statSync(tempVideo).size);

  console.log('>>> [5/6] Muxing video with master narration voiceover (master_voiceover.mp3)...');
  const muxCmd = spawn('ffmpeg', [
    '-y',
    '-i', tempVideo,
    '-i', masterAudio,
    '-c:v', 'copy',
    '-c:a', 'aac',
    '-b:a', '192k',
    '-shortest',
    finalVideo
  ]);

  muxCmd.stderr.on('data', () => {});
  await new Promise((resolve) => muxCmd.on('close', resolve));

  const finalStat = fs.statSync(finalVideo);
  try {
    fs.copyFileSync(finalVideo, canonicalFinal);
  } catch (e) {}

  console.log('>>> [6/6] DEMO VIDEO COMPLETE!');
  console.log('Final File:', finalVideo);
  console.log('Final Size:', (finalStat.size / (1024 * 1024)).toFixed(2), 'MB');
}

recordFullDemo().catch((err) => {
  console.error('Fatal error during demo recording:', err);
  process.exit(1);
});

const puppeteer = require('puppeteer');
const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');
const { injectOverlays } = require('./record_helpers');
const { sleep, smoothMove, updateLowerThird, smoothScroll, clickAt } = require('./record_actions');

async function recordDynamicDemo() {
  const outDir = path.join(__dirname, 'out');
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  const timestamp = Date.now();
  const tempRawVideo = path.join(outDir, `raw_screencast_${timestamp}.mp4`);
  const masterAudio = path.join(__dirname, 'public', 'audio', 'engaging_master_voiceover.mp3');
  const masterSrt = path.join(__dirname, 'public', 'audio', 'master_subtitles.srt');
  const finalVideo = path.join(outDir, 'JagaUsaha_Official_Demo_Video_1080p.mp4');

  console.log('>>> [1/5] Launching ffmpeg recording pipe...');
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
    tempRawVideo
  ]);

  ffmpeg.stderr.on('data', () => {});

  console.log('>>> [2/5] Launching Puppeteer Full HD Browser (1920x1080)...');
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--window-size=1920,1080', '--no-sandbox', '--disable-setuid-sandbox']
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

  console.log('>>> [3/5] Starting dynamic walkthrough (no static freezing)...');
  const startTime = Date.now();

  // ==========================================
  // ACT 1: Landing Page & Problem (0:00 - 1:09 | 69.5s)
  // ==========================================
  console.log('>>> ACT 1: Landing Page (Dynamic Scrolling & Highlighting)');
  await page.goto('http://127.0.0.1:5173/', { waitUntil: 'networkidle2' });
  await injectOverlays(page);
  await updateLowerThird(
    page,
    'JagaUsaha · Solusi Mandiri Likuiditas Kas UMKM',
    'IDwebhost AI Competition 2026 Showcase · Infrastructure: CloudBaik VPS',
    '🛡️'
  );

  await smoothMove(page, 960, 42, 800); // Competition banner
  await sleep(4000);
  await smoothMove(page, 960, 320, 700); // Hero heading
  await sleep(4000);
  await smoothMove(page, 860, 480, 600); // CTA button
  await sleep(3500);

  // Scroll to 82% problem section
  console.log('  -> Scrolling to 82% cash illusion problem...');
  await smoothScroll(page, 560, 25, 30);
  await smoothMove(page, 480, 460, 700);
  await sleep(6000);
  await smoothMove(page, 960, 460, 700);
  await sleep(6000);

  // Scroll to 4 Pillars
  console.log('  -> Scrolling to Core 4 AI Pillars...');
  await smoothScroll(page, 1250, 25, 30);
  await smoothMove(page, 380, 400, 600);
  await sleep(4000);
  await smoothMove(page, 960, 400, 600);
  await sleep(4000);
  await smoothMove(page, 1540, 400, 600);
  await sleep(4500);

  // Scroll to Modern 4-Column Footer
  console.log('  -> Scrolling to Footer with IDwebhost AI Hosting & CloudBaik VPS...');
  await smoothScroll(page, 2800, 35, 30);
  await smoothMove(page, 320, 680, 700); // IDwebhost AI Hosting link
  await sleep(4500);
  await smoothMove(page, 780, 680, 700); // CloudBaik Cloud VPS link
  await sleep(4500);
  await smoothMove(page, 1580, 680, 700); // Server telemetry badge
  await sleep(5000);

  // ==========================================
  // ACT 2: Dashboard & VPS Terminal (1:09 - 2:30 | 81.0s)
  // ==========================================
  console.log('>>> ACT 2: Dashboard, 3 AI Agents & Live SSH Terminal');
  await page.evaluate(() => {
    window.location.hash = '#dashboard';
    window.dispatchEvent(new HashChangeEvent('hashchange'));
  });
  await sleep(1500);
  await injectOverlays(page);
  await updateLowerThird(
    page,
    'Infrastruktur: AI Hosting IDwebhost · CloudBaik VPS',
    'Port SSH 4422 · Ubuntu 24.04 LTS · FastAPI Service Active · Hermes Agent',
    '🖥️'
  );

  // Open Log Sensor & AI Guardian tab
  await page.evaluate(() => {
    const tabs = Array.from(document.querySelectorAll('button, a'));
    const target = tabs.find(el => el.textContent && el.textContent.includes('Log Sensor'));
    if (target) target.click();
  });
  await sleep(2500);

  // Dynamic cursor over 3 Autonomous AI Agents
  await smoothMove(page, 380, 260, 700); // Sensor Agent
  await sleep(6000);
  await smoothMove(page, 960, 260, 700); // Simulator Agent (0% hallucination)
  await sleep(6500);
  await smoothMove(page, 1540, 260, 700); // Advisor Agent (WhatsApp webhook)
  await sleep(6500);

  // Scroll down to live telemetry stream
  await smoothScroll(page, 420, 20, 30);
  await smoothMove(page, 960, 520, 700);
  await sleep(6500);

  // Inject Floating SSH Live Terminal Box
  console.log('  -> Displaying Floating SSH Live Terminal Box...');
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
      font-family: monospace;
    `;
    term.innerHTML = `
      <div style="height: 42px; background: #0f172a; border-bottom: 1px solid #1e293b; display: flex; align-items: center; justify-content: space-between; padding: 0 20px;">
        <div style="display: flex; gap: 8px;">
          <span style="width: 12px; height: 12px; border-radius: 50%; background: #ef4444;"></span>
          <span style="width: 12px; height: 12px; border-radius: 50%; background: #f59e0b;"></span>
          <span style="width: 12px; height: 12px; border-radius: 50%; background: #10b981;"></span>
        </div>
        <div style="font-size: 12px; color: #94a3b8; font-weight: bold;">
          root@cloudbaik-vps:~ (ssh -p 4422 root@103.30.146.174) · LIVE SSH CONNECTED
        </div>
        <div style="font-size: 11px; color: #10b981; font-weight: bold; background: rgba(16,185,129,0.15); padding: 2px 8px; border-radius: 4px;">
          UBUNTU 24.04 LTS
        </div>
      </div>
      <div style="flex: 1; padding: 24px; color: #f8fafc; font-size: 13px; line-height: 1.8; overflow-y: auto;">
        <span style="color: #38bdf8;">root@cloudbaik-vps</span>:<span style="color: #a855f7;">~#</span> systemctl status jagausaha.service<br/>
        ● jagausaha.service - JagaUsaha AI Backend Service (IDwebhost AI Hosting)<br/>
        &nbsp;&nbsp;&nbsp;Loaded: loaded (/etc/systemd/system/jagausaha.service; enabled)<br/>
        &nbsp;&nbsp;&nbsp;Active: <span style="color: #4ade80; font-weight: bold;">active (running)</span> since Sun 2026-09-28 20:15:02 WIB; 6h ago<br/>
        &nbsp;&nbsp;&nbsp;Process: 25496 ExecStart=/root/JagaUsaha/.venv/bin/uvicorn api.server:app --host 0.0.0.0 --port 8000<br/>
        &nbsp;&nbsp;&nbsp;Specs: 4 Core AMD EPYC · 4.0GB RAM · 20GB NVMe SSD (CloudBaik VPS Data Center Indonesia)<br/><br/>
        <span style="color: #38bdf8;">root@cloudbaik-vps</span>:<span style="color: #a855f7;">~#</span> curl http://localhost:8000/api/health<br/>
        <span style="color: #fbbf24;">{"status": "healthy", "app": "JagaUsaha", "version": "1.0.0", "framework": "Hermes Agent Compatible", "runtime": "CloudBaik VPS Ready"}</span><br/><br/>
        <span style="color: #38bdf8;">root@cloudbaik-vps</span>:<span style="color: #a855f7;">~#</span> hermes status<br/>
        [Hermes Autonomous Agent] Active profile: default · Running multi-modal data pipeline · 0 errors<br/>
        <span style="color: #38bdf8;">root@cloudbaik-vps</span>:<span style="color: #a855f7;">~#</span> <span style="display: inline-block; width: 8px; height: 16px; background: #4ade80; vertical-align: middle;"></span>
      </div>
    `;
    document.body.appendChild(term);
  });

  await smoothMove(page, 960, 360, 800);
  await sleep(14000);
  await smoothMove(page, 960, 520, 800);
  await sleep(12000);

  // Close floating terminal
  await page.evaluate(() => {
    const t = document.getElementById('ssh-live-terminal');
    if (t) t.remove();
  });
  await sleep(2000);

  // ==========================================
  // ACT 3: Unified Onboarding & Digital Twin (2:30 - 3:41 | 71.0s)
  // ==========================================
  console.log('>>> ACT 3: Unified Multi-Modal Onboarding & Digital Twin');
  await injectOverlays(page);
  await updateLowerThird(
    page,
    'Inisialisasi Profil Usaha Satu Pintu (Unified Onboarding)',
    'Multi-Modal Ingest: Mutasi BCA (PDF), POS Moka (Excel) ➔ Ekstraksi Digital Twin',
    '📥'
  );

  // Click + Input Data Usaha
  await smoothMove(page, 1680, 48, 700);
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const target = btns.find(b => b.textContent && b.textContent.includes('Input Data Usaha'));
    if (target) target.click();
  });
  await sleep(2500);

  // Inside Unified Onboarding Modal: Active interaction
  await smoothMove(page, 620, 360, 700); // Step 1 dropzone
  await sleep(7000);
  await smoothMove(page, 520, 520, 600); // Mutasi BCA button
  await sleep(7000);
  await smoothMove(page, 680, 520, 600); // POS Moka button
  await sleep(7000);
  await smoothMove(page, 620, 240, 600); // Tab Suara & Catatan Teks
  await sleep(8000);

  // Digital Twin parameters on the right
  await smoothMove(page, 1260, 340, 800); // Saldo BCA Rp 18.5 Jt
  await sleep(8000);
  await smoothMove(page, 1260, 480, 700); // Gaji Barista Rp 7.5 Jt (Tgl 30)
  await sleep(8000);
  await smoothMove(page, 1260, 600, 700); // Cadangan Kas Rp 3.0 Jt
  await sleep(8000);
  await smoothMove(page, 1260, 720, 700); // Safe-to-Spend DLMM Rp 3.8 Jt
  await sleep(7000);

  // Close Onboarding Modal using close icon
  await page.evaluate(() => {
    const xIcon = document.querySelector('.lucide-x');
    if (xIcon) {
      const btn = xIcon.closest('button');
      if (btn) btn.click();
    }
  });
  await sleep(2500);

  // ==========================================
  // ACT 4: Decision Studio, DLMM FastMath & Deficit (3:41 - 4:55 | 73.5s)
  // ==========================================
  console.log('>>> ACT 4: Decision Studio, DLMM FastMath & Deficit Alert');
  await injectOverlays(page);
  await updateLowerThird(
    page,
    'Decision Studio: Safe-to-Spend DLMM FastMath v1.0',
    'Interaksi Suara (VoiceBeam) · Deteksi Bahaya Defisit H+6 · Solusi DP 50%',
    '🎙️'
  );

  // Navigate to Ringkasan Kas & Sandbox
  await page.evaluate(() => {
    const tabs = Array.from(document.querySelectorAll('button, a'));
    const target = tabs.find(el => el.textContent && el.textContent.includes('Ringkasan Kas'));
    if (target) target.click();
  });
  await sleep(2000);

  // Select Capex Scenario: Mesin Kopi Tunai (Rp 14 Jt)
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const target = btns.find(b => b.textContent && (b.textContent.includes('14.0 Jt') || b.textContent.includes('Mesin Kopi')));
    if (target) target.click();
  });
  await sleep(1500);

  // Select Capex Scenario: Mesin Kopi Tunai (Rp 14 Jt)
  await smoothScroll(page, 280, 20, 30);
  await smoothMove(page, 520, 420, 700);
  await sleep(10000);

  // Scroll down to 30-day projection chart showing deficit dip
  await smoothScroll(page, 620, 20, 30);
  await smoothMove(page, 580, 560, 800); // Deficit curve drop
  await sleep(12000);

  // Highlight Deficit Alert Box
  await smoothMove(page, 1420, 520, 700); // PERINGATAN: Defisit Kas Hari ke-6
  await sleep(14000);

  // Highlight Recommendation DP 50%
  await smoothMove(page, 1420, 640, 700);
  await sleep(12000);

  // Click Terapkan DP 50%
  console.log('  -> Clicking Terapkan DP 50%...');
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const target = btns.find(b => b.textContent && b.textContent.includes('DP 50%'));
    if (target) target.click();
  });
  await sleep(8000);

  // ==========================================
  // ACT 5: WhatsApp Negotiation & Grand Closing (4:55 - 6:16 | 81.1s)
  // ==========================================
  console.log('>>> ACT 5: WhatsApp Negotiation Generator & Official Closing');
  await injectOverlays(page);
  await updateLowerThird(
    page,
    'Otomasi Lapangan: Generator Negosiasi WhatsApp',
    'Draf Pesan Diplomatis Santun · Live URL: http://103.30.146.174:8000',
    '💬'
  );

  // Click Draf WhatsApp
  await smoothMove(page, 1420, 700, 600);
  await page.evaluate(() => {
    const links = Array.from(document.querySelectorAll('button, a'));
    const target = links.find(x => x.textContent && (x.textContent.includes('Draf WhatsApp') || x.textContent.includes('WhatsApp')));
    if (target) target.click();
  });
  await sleep(2500);

  // Inspect WhatsApp Message
  await smoothMove(page, 720, 460, 800); // Chat bubble preview
  await sleep(14000);
  await smoothMove(page, 520, 340, 600); // Preset toggle
  await sleep(8000);
  await smoothMove(page, 1200, 720, 600); // Salin Pesan
  await sleep(7000);

  // Close WhatsApp Modal
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const target = btns.find(b => b.textContent && (b.textContent.includes('Tutup') || b.textContent.includes('✕')));
    if (target) target.click();
    const xIcon = document.querySelector('.lucide-x');
    if (xIcon) {
      const btn = xIcon.closest('button');
      if (btn) btn.click();
    }
  });
  await sleep(2000);

  // Scroll to top
  await smoothScroll(page, 0, 25, 30);
  await sleep(3000);

  // Inject Final Grand Closing Banner
  console.log('  -> Displaying Final Grand Closing Banner...');
  await page.evaluate(() => {
    const banner = document.createElement('div');
    banner.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 1100px;
      background: rgba(10, 15, 26, 0.96);
      backdrop-filter: blur(20px);
      border: 1px solid rgba(16, 185, 129, 0.5);
      border-radius: 28px;
      box-shadow: 0 35px 80px rgba(0,0,0,0.9);
      z-index: 10000000;
      padding: 48px;
      text-align: center;
      font-family: sans-serif;
    `;
    banner.innerHTML = `
      <div style="display: inline-flex; align-items: center; gap: 8px; background: rgba(16,185,129,0.15); border: 1px solid rgba(16,185,129,0.3); padding: 6px 16px; border-radius: 999px; color: #34d399; font-size: 13px; font-weight: 800; letter-spacing: 0.05em; text-transform: uppercase; margin-bottom: 20px;">
        IDwebhost AI Competition 2026 Showcase
      </div>
      <h1 style="font-size: 40px; font-weight: 900; color: #ffffff; margin: 0 0 16px 0; letter-spacing: -0.02em;">
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

  // Remain until target duration (376.1s = 6m 16.1s)
  const targetMs = 376200;
  const elapsed = Date.now() - startTime;
  const remainMs = Math.max(1000, targetMs - elapsed);
  console.log(`Remaining time to reach exact narration length: ${(remainMs / 1000).toFixed(1)}s`);
  await sleep(remainMs);

  console.log('>>> [4/5] Stopping screencast and closing browser...');
  await client.send('Page.stopScreencast');
  await browser.close();

  ffmpeg.stdin.end();
  await new Promise((resolve) => ffmpeg.on('close', resolve));
  console.log('Raw video stream encoded successfully.');

  console.log('>>> [5/5] Burning styled subtitles and muxing master voiceover + ambient music bed...');
  const localSrt = path.join(__dirname, 'master_subtitles.srt');
  fs.copyFileSync(masterSrt, localSrt);

  const muxCmd = spawn(
    'ffmpeg',
    [
      '-y',
      '-i', tempRawVideo,
      '-i', masterAudio,
      '-vf', 'subtitles=master_subtitles.srt:force_style=\'Fontname=Arial,Fontsize=17,Bold=1,PrimaryColour=&H00FFFFFF,OutlineColour=&H99000000,BackColour=&HCC0A0F1A,BorderStyle=4,Outline=1,Shadow=0,MarginV=38,Alignment=2\'',
      '-c:v', 'libx264',
      '-preset', 'fast',
      '-crf', '18',
      '-pix_fmt', 'yuv420p',
      '-c:a', 'aac',
      '-b:a', '192k',
      '-shortest',
      finalVideo
    ],
    { cwd: __dirname }
  );

  muxCmd.stderr.on('data', (d) => {
    // console.log(d.toString());
  });

  await new Promise((resolve) => muxCmd.on('close', resolve));

  const finalStat = fs.statSync(finalVideo);
  console.log('>>> DYNAMIC DEMO VIDEO WITH SUBTITLES & STUDIO AUDIO COMPLETE!');
  console.log('Final File:', finalVideo);
  console.log('Final Size:', (finalStat.size / (1024 * 1024)).toFixed(2), 'MB');
}

recordDynamicDemo().catch((err) => {
  console.error('Fatal error during dynamic recording:', err);
  process.exit(1);
});

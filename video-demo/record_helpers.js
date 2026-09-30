// Helper functions for Puppeteer live demonstration recording
module.exports = {
  injectOverlays: async (page) => {
    await page.evaluate(() => {
      // 1. Watermark IDwebhost AI Hosting
      if (!document.getElementById('idwebhost-watermark')) {
        const wm = document.createElement('div');
        wm.id = 'idwebhost-watermark';
        wm.style.cssText = `
          position: fixed;
          top: 20px;
          right: 24px;
          z-index: 9999999;
          display: flex;
          align-items: center;
          gap: 10px;
          background: rgba(10, 10, 10, 0.88);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.15);
          border-radius: 12px;
          padding: 8px 16px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.6);
          font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
          pointer-events: none;
        `;
        wm.innerHTML = `
          <div style="width: 26px; height: 26px; border-radius: 8px; background: #059669; display: flex; align-items: center; justify-content: center; color: #fff; font-weight: 900; font-size: 14px;">
            ID
          </div>
          <div>
            <div style="font-size: 12px; font-weight: 800; color: #ffffff; letter-spacing: 0.02em; display: flex; align-items: center; gap: 6px;">
              <span>IDwebhost AI Hosting</span>
              <span style="font-size: 9px; font-weight: 700; background: rgba(5, 150, 105, 0.25); color: #34d399; border: 1px solid rgba(5, 150, 105, 0.4); border-radius: 4px; padding: 1px 5px;">HACKATHON 2026</span>
            </div>
            <div style="font-size: 10px; font-family: monospace; color: #94a3b8;">
              CloudBaik VPS · 103.30.146.174
            </div>
          </div>
        `;
        document.body.appendChild(wm);
      }

      // 2. Animated Custom Virtual Cursor
      if (!document.getElementById('virtual-cursor')) {
        const cursor = document.createElement('div');
        cursor.id = 'virtual-cursor';
        cursor.style.cssText = `
          position: fixed;
          top: 0;
          left: 0;
          width: 24px;
          height: 24px;
          z-index: 10000000;
          pointer-events: none;
          transform: translate(-100px, -100px);
          transition: transform 0.45s cubic-bezier(0.25, 1, 0.5, 1);
        `;
        cursor.innerHTML = `
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 3L20 11L12.5 13.5L9.5 21L4 3Z" fill="#10b981" stroke="#ffffff" stroke-width="2" stroke-linejoin="round"/>
          </svg>
        `;
        document.body.appendChild(cursor);
      }

      // 3. Lower-Third Notification Card
      if (!document.getElementById('video-lower-third')) {
        const lt = document.createElement('div');
        lt.id = 'video-lower-third';
        lt.style.cssText = `
          position: fixed;
          bottom: 24px;
          left: 32px;
          z-index: 9999999;
          display: flex;
          align-items: center;
          gap: 14px;
          background: rgba(10, 10, 10, 0.92);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          border: 1px solid rgba(16, 185, 129, 0.4);
          border-radius: 16px;
          padding: 12px 20px;
          box-shadow: 0 14px 40px rgba(0, 0, 0, 0.7);
          font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
          pointer-events: none;
          max-width: 650px;
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.5s ease, transform 0.5s ease;
        `;
        lt.innerHTML = `
          <div id="lt-icon" style="width: 36px; height: 36px; border-radius: 10px; background: rgba(16, 185, 129, 0.15); border: 1px solid rgba(16, 185, 129, 0.3); display: flex; align-items: center; justify-content: center; color: #10b981;">
            ⚡
          </div>
          <div>
            <div id="lt-title" style="font-size: 13px; font-weight: 800; color: #ffffff; letter-spacing: 0.01em;">
              JagaUsaha AI Platform
            </div>
            <div id="lt-desc" style="font-size: 11px; color: #94a3b8; margin-top: 2px;">
              Autonomous Financial Guardian untuk UMKM Indonesia
            </div>
          </div>
        `;
        document.body.appendChild(lt);
      }

      // 4. Steady Frame Ticker for 30 FPS Screencast
      if (!document.getElementById('render-ticker')) {
        const ticker = document.createElement('div');
        ticker.id = 'render-ticker';
        ticker.style.cssText = 'position:fixed;bottom:0;right:0;width:1px;height:1px;opacity:0.01;pointer-events:none;z-index:99999999;';
        document.body.appendChild(ticker);
        setInterval(() => {
          ticker.innerText = Math.random().toString();
        }, 33);
      }
    });
  }
};

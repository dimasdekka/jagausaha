const puppeteer = require('puppeteer');
const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function smoothMove(page, targetX, targetY, durationMs = 600) {
  await page.evaluate((x, y) => {
    const cursor = document.getElementById('virtual-cursor');
    if (cursor) {
      cursor.style.transform = `translate(${x}px, ${y}px)`;
    }
  }, targetX, targetY);
  await sleep(durationMs);
}

async function clickAt(page, targetX, targetY) {
  await smoothMove(page, targetX, targetY, 400);
  await page.evaluate((x, y) => {
    const ripple = document.createElement('div');
    ripple.style.cssText = `
      position: fixed;
      top: ${y - 12}px;
      left: ${x - 12}px;
      width: 24px;
      height: 24px;
      border-radius: 50%;
      background: rgba(16, 185, 129, 0.6);
      border: 2px solid #ffffff;
      pointer-events: none;
      z-index: 10000001;
      transform: scale(0.5);
      opacity: 1;
      transition: transform 0.4s ease-out, opacity 0.4s ease-out;
    `;
    document.body.appendChild(ripple);
    requestAnimationFrame(() => {
      ripple.style.transform = 'scale(2.4)';
      ripple.style.opacity = '0';
    });
    setTimeout(() => ripple.remove(), 450);

    const el = document.elementFromPoint(x, y);
    if (el) {
      el.click();
      if (el.focus) el.focus();
    }
  }, targetX, targetY);
  await sleep(300);
}

async function updateLowerThird(page, title, desc, icon = '⚡', show = true) {
  await page.evaluate((t, d, i, s) => {
    const lt = document.getElementById('video-lower-third');
    const ltTitle = document.getElementById('lt-title');
    const ltDesc = document.getElementById('lt-desc');
    const ltIcon = document.getElementById('lt-icon');
    if (lt && ltTitle && ltDesc && ltIcon) {
      ltTitle.innerText = t;
      ltDesc.innerText = d;
      ltIcon.innerText = i;
      lt.style.opacity = s ? '1' : '0';
      lt.style.transform = s ? 'translateY(0)' : 'translateY(20px)';
    }
  }, title, desc, icon, show);
}

async function smoothScroll(page, toY, steps = 25, delayMs = 30) {
  const currentY = await page.evaluate(() => window.scrollY);
  const diff = toY - currentY;
  for (let i = 1; i <= steps; i++) {
    const target = currentY + (diff * (i / steps));
    await page.evaluate((y) => window.scrollTo(0, y), target);
    await sleep(delayMs);
  }
}

module.exports = { sleep, smoothMove, clickAt, updateLowerThird, smoothScroll };

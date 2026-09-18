# JagaUsaha 🛡️
> **AI Autonomous Financial Guardian & Decision Sandbox for Indonesian UMKM**  
> *Kompetisi: IDwebhost × AICLUB.ID — AI HackFest 2026 (Kategori: Business Automation)*  
> *Infrastruktur Resmi: IDwebhost AI Hosting · CloudBaik VPS (4 vCPU / 4GB RAM / 20GB SSD)*

---

## 📌 Ringkasan Masalah & Solusi
80% UMKM Indonesia gulung tikar bukan karena produknya sepi, melainkan akibat ilusi **"Omset Ramai, Duit Hilang"**—mencampuradukkan uang kas dengan keuntungan pribadi dan terjebak ilikuiditas saat komitmen gaji dan tempo supplier bertabrakan.

Software pembukuan biasa (BukuWarung, Mekari) hanya mencatat masa lalu setelah kebangkrutan terjadi. **JagaUsaha menghentikan kebangkrutan sebelum terjadi** melalui:
1. **Duit Dingin (Safe-to-Spend):** Memisahkan saldo bank aktif dari dana operasional yang wajib terkunci.
2. **Kotak Simulasi "Bisa Beli Nggak?":** Sandbox kontrafaktual yang menguji pengeluaran modal (CAPEX) atau stok grosir sebelum uang keluar dari rekening bank.
3. **Voice Orb AI (Matrix Orb):** Interaksi suara ramah UMKM berbasis dot-matrix canvas interaktif (*Rare UI*).
4. **Kolektor Bon Santun & Negosiasi Tempo:** Generator pesan WhatsApp santun ber-QRIS untuk mencairkan piutang dan merestrukturisasi utang supplier.

---

## 🏗️ Arsitektur Sistem

```
[ Input: Suara / Nota OCR / Mutasi Bank BCA ]
                     │
                     ▼
           ┌──────────────────┐
           │   Sensor Agent   │  (Normalisasi Multimodal)
           └─────────┬────────┘
                     │ Normalized Event Stream
                     ▼
           ┌──────────────────┐
           │ Deterministic    │  (NumPy/Python - Zero LLM Math)
           │ Math Core (DLMM) │  - Safe-to-Spend & Invariant Checks
           └─────────┬────────┘
                     │ State Vector
             ┌───────┴───────┐
             ▼               ▼
     ┌──────────────┐ ┌──────────────┐
     │Guardian Agent│ │Simulator Agt │
     │(Surveillance)│ │(What-If Sand)│
     └───────┬──────┘ └──────┬───────┘
             │ Trigger       │ Trajectory
             └───────┬───────┘
                     ▼
           ┌──────────────────┐
           │  Advisor Agent   │  (Hermes Agent - Bahasa Indonesia)
           └─────────┬────────┘
                     │
                     ▼
   [ Dashboard Modern: React + TypeScript + Matrix Orb ]
```

---

## 🎨 Komponen UI & Desain Eksternal
Frontend dibangun dengan **React 19 + TypeScript + Tailwind CSS**, memanfaatkan library komponen kelas dunia:
- **Rare UI ([rareui.com](https://www.rareui.com/components)):** Komponen `MatrixOrb` untuk visualisasi AI Voice Agent dengan state `idle`, `listening`, dan `thinking`.
- **Opensource UI ([opensourceui.in](https://opensourceui.in/)):** Mockup perangkat mobile, layout kartu finansial kaca (*glassmorphism*), dan penataan tipografi bersih.
- **BoardUI ([boardui.com](https://www.boardui.com/)):** Indikator `AgentThinking`, kartu metrik vital signs (*Business Pulse*), dan drawer terminal logs interaktif.

---

## 🚀 Panduan Menjalankan (Quick Start)

### 1. Menjalankan Backend & Dashboard (Production Ready)
```bash
# Pastikan berada di root direktori JagaUsaha
python -m pip install fastapi uvicorn rich numpy pydantic

# Jalankan server
python -m uvicorn api.server:app --host 0.0.0.0 --port 8000
```
Buka browser di: `http://localhost:8000`

### 2. Menjalankan Interactive Terminal Demo (Khusus Video Demo Hackathon)
```bash
python cli_demo.py
```

### 3. Menjalankan Frontend Development Mode (Hot-Reload)
```bash
cd frontend
npm install
npm run dev
```

---

## ☁️ Deployment ke CloudBaik VPS
JagaUsaha telah dioptimalkan khusus untuk spesifikasi **CloudBaik VPS (4 Core CPU / 4GB RAM / 20GB SSD)**:
- Total konsumsi RAM: **< 150 MB** (sangat hemat resource, zero GPU dependency).
- Eksekusi instan melalui script otomatis:
```bash
chmod +x deploy_vps.sh
./deploy_vps.sh
```

---

## 📋 Panduan Deliverables AI HackFest 2026

### A. Video Demo (5–10 Menit)
1. **Segmen Terminal VPS:** Jalankan `python cli_demo.py` di terminal SSH CloudBaik VPS untuk membuktikan agen berjalan secara end-to-end pada infrastruktur IDwebhost.
2. **Segmen Dashboard UI:** Tunjukkan simulasi *"Beli Mesin Espresso Rp 14 Juta"* yang memicu defisit kas pada Hari ke-6, dilanjutkan dengan klik solusi *"Ambil Rekomendasi Aman"* yang menghasilkan pesan negosiasi WhatsApp.
3. **Ketentuan Wajib:**
   - Sebut verbal / lower-third: **"AI Hosting"** dan **"IDwebhost"**.
   - Sertakan watermark logo IDwebhost di pojok video.

### B. Artikel Publikasi (Min. 800 Kata)
Wajib menyertakan 2 backlink resmi:
- Anchor: `AI Hosting` → `https://idwebhost.com/ai-hosting/`
- Anchor: `Cloud VPS` → `https://cloudbaik.com/`

---
*Dikembangkan dengan standar arsitektur Hermes Agent untuk ekosistem UMKM Indonesia.*

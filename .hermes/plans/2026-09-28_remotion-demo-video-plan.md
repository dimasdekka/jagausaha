# Rencana Implementasi Video Demo JagaUsaha (Remotion Engine)

> **For Hermes:** Gunakan skill `remotion-create`, `remotion-markup`, dan `subagent-driven-development` untuk mengeksekusi setiap tahapan secara modular dan terverifikasi.

**Goal:** Membangun dan merender video demo otomatis berstandar industri (*Video-as-Code*) menggunakan Remotion v4 untuk aplikasi **JagaUsaha**, memenuhi 100% regulasi resmi **IDwebhost AI Competition** (durasi 5–6 menit, 1080p 16:9, watermark IDwebhost, lower-third "AI Hosting", audio narasi TTS Bahasa Indonesia artikulatif, dan alur end-to-end live CloudBaik VPS).

**Architecture:** Video dibangun dengan arsitektur multi-scene modular Remotion. Masing-masing adegan (`Scene`) memiliki komponen visual deterministik berbasis `useCurrentFrame()`, sinkron dengan file audio narasi TTS Bahasa Indonesia di trek audio, serta layer global (*Watermark & Telemetri Overlay*) yang aktif di sepanjang video.

**Tech Stack:**
- **Video Engine:** Remotion v4 (`remotion`, `@remotion/cli`, `@remotion/media`, `@remotion/bundler`)
- **UI & Layout:** React 18, Tailwind CSS, Lucide React, Plus Jakarta Sans
- **Audio Voiceover:** TTS Narasi Bahasa Indonesia (Edge / Hermes TTS Engine)
- **Target Video:** MP4 (H.264 / AAC), 1920x1080 (1080p 16:9), 30 FPS, Durasi ~5.5 menit (9.900 frame)

---

## 1. Matriks Kepatuhan Regulasi IDwebhost AI Competition

| Regulasi Resmi Kompetisi | Implementasi dalam Video Remotion | Verifikasi Teknis |
| :--- | :--- | :--- |
| **Durasi 5 – 10 Menit** | 5 Menit 30 Detik (9.900 frame @ 30 FPS) | `durationInFrames={9900}` pada root `<Composition />` |
| **Format 16:9 1080p** | Resolusi 1920 × 1080 piksel | `width={1920}`, `height={1080}` |
| **Watermark Corner** | Logo resmi IDwebhost di pojok kanan atas di semua adegan | Layer absolut `<GlobalWatermark />` dengan opacity 85% |
| **Lower-Third / Verbal Mention** | Menampilkan badge *"AI Hosting IDwebhost"* dan narasi suara menyebut "AI Hosting" & "IDwebhost" | Komponen `<LowerThirdBanner />` di Scene 2 & Scene 5 |
| **Lingkungan Cloud VPS** | Rekaman/Animasi live terminal SSH port 4422, status systemd, dan IP `103.30.146.174` | `<Scene2VpsEnvironment />` menampilkan Ubuntu 24.04 LTS & daemon status |
| **Alur End-to-End** | Ingest data -> Sensor DLMM -> Sandbox Simulasi -> WhatsApp Action | 5 Adegan berurutan terstruktur rapi |

---

## 2. Struktur Pembagian Adegan (*Scene Breakdown & Timeline*)

Total Durasi: **330 detik (5 menit 30 detik = 9.900 frames @ 30 FPS)**

### **Adegan 1: Hook & Krisis Kas UMKM (0:00 – 0:45 | Frame 0 – 1.350)**
- **Fokus Visual:** Dilema pemilik kafe/warkop di akhir bulan. Tampilan perbandingan kas: Keinginan membeli mesin espresso baru Rp 14.000.000 vs ancaman kas defisit saat gaji barista tiba.
- **Audio Narasi:** Penjelasan masalah klasik UMKM di mana 82% kegagalan bisnis bukan karena sepi pembeli, melainkan karena ketiadaan kalkulasi waktu jatuh tempo kas operasional.
- **Aset Visual:** Ilustrasi kalkulator kas konvensional yang merah vs perkenalan perisai JagaUsaha.

### **Adegan 2: Infrastruktur CloudBaik VPS & Hermes Agent (0:45 – 1:45 | Frame 1.350 – 3.150)**
- **Fokus Visual:** Menampilkan lingkungan server CloudBaik VPS.
  - Tampilan Terminal SSH: Port 4422, IP `103.30.146.174`, Ubuntu 24.04 LTS.
  - Spesifikasi Server: 4 Core CPU, 4GB RAM, 20GB SSD NVMe.
  - Status Service: `systemctl status jagausaha.service` (Active running).
- **Lower-Third Grafis:** *"Infrastruktur: AI Hosting IDwebhost · CloudBaik Cloud VPS"*.
- **Audio Narasi:** Mengulas keandalan hosting CloudBaik VPS dari IDwebhost yang menjalankan Hermes Agent dan model deterministik backend secara stabil 24/7.

### **Adegan 3: Unified Multi-Modal Onboarding & Digital Twin (1:45 – 3:00 | Frame 3.150 – 5.400)**
- **Fokus Visual:** Alur inisialisasi profil usaha satu pintu (*Unified Onboarding*).
  - Drag-and-drop mutasi rekening BCA (PDF) dan laporan penjualan POS Moka (Excel).
  - Sensor ekstraksi instan: Nama usaha, saldo kas riil (Rp 18.5 Juta), cadangan darurat (Rp 3 Juta), gaji bulanan (Rp 5 Juta).
  - Terbentuknya *Digital Twin* arus kas toko secara real-time.
- **Audio Narasi:** Bagaimana AI mengubah berkas transaksi mentah menjadi peta finansial hidup tanpa perlu input manual yang melelahkan.

### **Adegan 4: Sandbox Simulasi DLMM & Voice AI Interactive (3:00 – 4:25 | Frame 5.400 – 7.950)**
- **Fokus Visual:** Pengujian belanja modal dengan input suara nyata (`VoiceBeam` & `ThinkingOrb`).
  - Pengguna bertanya lewat suara: *"Beli mesin espresso 14 juta tunai aman nggak buat gajian barista minggu depan?"*.
  - Mesin DLMM Safe-to-Spend memproyeksikan kurva 30 hari ke depan.
  - Muncul peringatan merah: Kas defisit **-Rp 2.140.000** di Hari ke-6 (H+6 saat gajian barista).
  - Solusi instan: Sistem menyarankan opsi DP 50% (Rp 7 Juta) yang menjaga kas tetap aman.
- **Audio Narasi:** Menunjukkan kecerdasan sistem yang tidak sekadar melarang, tetapi memberikan skenario mitigasi finansial yang dapat langsung dieksekusi.

### **Adegan 5: Otomasi Negosiasi WhatsApp & Penutup (4:25 – 5:30 | Frame 7.950 – 9.900)**
- **Fokus Visual:** Eksekusi solusi ke dunia nyata.
  - Membuka modal WhatsApp dengan template negosiasi vendor beretika bisnis: penyesuaian termin pembayaran sesuai jadwal administrasi toko.
  - Ringkasan keunggulan platform: 100% deterministik, no hallucination, privasi data terlindungi.
  - Call-to-Action: Kunjungi live web di `http://103.30.146.174:8000`.
- **Lower-Third & Watermark:** IDwebhost AI Hosting & CloudBaik Cloud VPS.
- **Audio Narasi:** Kalimat penutup yang profesional dan apresiasi kepada IDwebhost atas terselenggaranya kompetisi.

---

## 3. Rencana Tahapan Kerja (*Step-by-Step Execution Plan*)

### **Tahap 1: Setup Workspace Remotion**
- **File Target:** Direktori `video-demo/` di root proyek.
- **Langkah:**
  1. Scaffold proyek Remotion khusus video demo:
     ```bash
     npx create-video@latest --yes --blank --no-tailwind video-demo
     ```
  2. Pasang dependensi pendukung (`lucide-react`, `@remotion/media`, font Plus Jakarta Sans).
  3. Konfigurasi `src/Root.tsx` dengan resolusi 1920x1080, 30 FPS, durasi 9.900 frames.

### **Tahap 2: Pembuatan Voiceover Audio TTS (5 File Audio Modular)**
- **File Target:** `video-demo/public/audio/`
  - `scene1_hook.mp3` (~40 detik)
  - `scene2_vps.mp3` (~55 detik)
  - `scene3_onboarding.mp3` (~70 detik)
  - `scene4_simulation.mp3` (~80 detik)
  - `scene5_closing.mp3` (~60 detik)
- **Langkah:** Generate audio menggunakan tool TTS dengan teks narasi formal Indonesia yang berwibawa dan artikulatif.

### **Tahap 3: Pembuatan Komponen Visual Tiap Adegan**
- **File Target:**
  - `video-demo/src/components/GlobalWatermark.tsx`: Watermark IDwebhost & pill status VPS.
  - `video-demo/src/components/LowerThird.tsx`: Banner animasi lower-third "AI Hosting" & "IDwebhost".
  - `video-demo/src/scenes/Scene1Hook.tsx`: Animasi krisis kas vs perlindungan JagaUsaha.
  - `video-demo/src/scenes/Scene2Vps.tsx`: Animasi terminal SSH port 4422, systemd, dan spec VPS.
  - `video-demo/src/scenes/Scene3Onboarding.tsx`: Animasi dropzone berkas dan mapping Digital Twin.
  - `video-demo/src/scenes/Scene4Simulation.tsx`: Animasi grafik kurva DLMM dan peringatan defisit kas.
  - `video-demo/src/scenes/Scene5Closing.tsx`: Animasi editor WhatsApp dan closing banner.

### **Tahap 4: Uji Coba di Remotion Studio**
- **Langkah:** Jalankan `npx remotion studio` untuk memverifikasi kelancaran timeline, interpolasi frame, keselarasan audio narasi, dan keterbacaan teks safe-area.

### **Tahap 5: Rendering Video MP4 Final**
- **Langkah:** Eksekusi render via CLI Remotion:
  ```bash
  npx remotion render VideoDemo out/video_demo_jagausaha.mp4 --gl=angle
  ```
- **Verifikasi Hasil:** Memeriksa berkas video `out/video_demo_jagausaha.mp4` dari segi durasi, ketajaman teks 1080p, kelancaran audio, serta kehadiran watermark dan lower-third IDwebhost.

---

## 4. Analisis Risiko & Mitigasi

1. **Waktu Render Panjang pada Komputer Lokal:**
   - *Mitigasi:* Mengoptimalkan aset visual menggunakan SVG murni dan CSS styling daripada video biner berat; merender dengan flag `--concurrency` yang seimbang.
2. **Desinkronisasi Audio TTS dengan Visual:**
   - *Mitigasi:* Menghitung durasi audio secara pasti menggunakan frame formula: $\text{Frames} = \text{Durasi Detik} \times 30$, dan menyematkan transisi `<Sequence>` yang elastis.
3. **Kepatuhan Aturan IDwebhost:**
   - *Mitigasi:* Memasang checklist verifikasi otomatis di Scene 2 dan Scene 5 sebelum render untuk memastikan kata "AI Hosting", "IDwebhost", dan watermark pojok hadir 100%.

---

Rencana ini siap dieksekusi langkah demi langkah.

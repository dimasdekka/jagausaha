# JagaUsaha — Canonical Product Flow & Business Architecture Specification
> **AI Autonomous Business Guardian & Decision Sandbox untuk UMKM Indonesia**  
> *Target: AI HackFest 2026 (IDwebhost × AICLUB.ID)*

---

## 1. Product North Star
> **"JagaUsaha adalah Guardian Bisnis Otonom berbasis matematis deterministik yang menjaga kelangsungan hidup kas UMKM: memetakan realitas finansial dari data seadanya, mengendus kebocoran dan benturan kas sebelum terjadi, menguji skenario belanja modal secara aman (*Safe-to-Spend*), dan mendampingi pemilik usaha mengambil tindakan taktis tanpa beban akuntansi yang rumit."**

---

## 2. Aktor & Tanggung Jawab Sistem
1. **Owner (Pemilik Usaha)**: Pengambil keputusan tunggal; butuh kejelasan instan (Hijau/Kuning/Merah), angka Safe-to-Spend riil, dan tombol aksi 1-klik via WhatsApp.
2. **Staff / Cashier (Operator Toko)**: Hanya kirim data operasional (foto struk belanja pasar, bon supplier, input kas laci) via WhatsApp/Form ringkas.
3. **Deterministic Core Engine (DLMM)**: Mesin Python native 3.11 murni. **LLM dilarang keras berhitung.** Saldo kas, runway, dan Safe-to-Spend 100% deterministik.
4. **Autonomous AI Agents (Hermes Runtime)**:
   - **Sensor Agent**: Ingest mutasi bank/OCR nota, pisahkan penarikan prive pribadi dari HPP toko.
   - **Simulator Agent**: Mengorkestrasi parameter *what-if scenario*, stress test, dan menyusun perbandingan trajectory.
   - **Advisor Agent**: Merangkai narasi rekomendasi empati, draf WhatsApp santun, dan mengelola *Data Inbox*.
5. **External Integrations**: BCA API / Mutasi Parser CSV/PDF, POS Exports (Moka/Majoo/Pawoon), WhatsApp Multi-device API.

---

## 3. End-to-End Lifecycle
```
DATA MASUK (Bank/POS/Nota/Chat)
       ↓
NORMALISASI & ISOLASI PRIVE (Sensor Agent)
       ↓
PEMAHAMAN KONTEKS BISNIS (Archetype + Baseline 3 Angka)
       ↓
KALKULASI DETERMINISTIK DLMM (Safe-to-Spend & Runway 30D)
       ↓
CONTINUOUS MONITORING (Guardian Engine)
       ↓
DETEKSI PERUBAHAN & BENTURAN KAS (Signal Engine)
       ↓
INVESTIGASI & VALIDASI (Korelasikan ke 1 RiskCase tunggal)
       ↓
SIMULASI KEPUTUSAN KEDEPAN (Future Simulator: Tunai vs DP 50% vs Tunda)
       ↓
REKOMENDASI TAKTIS (Advisor Agent: Draf WhatsApp + Link QRIS)
       ↓
PERSETUJUAN OWNER (1-Klik via UI / WhatsApp)
       ↓
PENGUKURAN HASIL NYATA (Outcome Measured 30 Hari Kemudian)
       ↓
BUSINESS MEMORY (Pencatatan pengalaman untuk keputusan masa depan)
```

---

## 4. Progressive Cold-Start Onboarding (Zero Historical Data)
1. **Langkah 1: Profil & Archetype Industri (1-Klik)**
   - `☕ Kafe & F&B`: Perputaran harian, bahan basah, gajian barista tgl 25–30.
   - `🛍️ Retail & Fashion`: Stok musiman, pencairan COD/marketplace H+3.
   - `🛒 Warung & Kelontong`: Margin tipis 10–15%, tempo supplier sembako 7–14 hari.
   - `💼 Jasa & Agensi`: Termin DP 50% + Pelunasan 30 hari, beban utama gaji tim.
2. **Langkah 2: Modal Kas Riil & Safety Buffer**
   - Saldo riil di rekening bank/kas tunai.
   - Cadangan darurat minimum (*Safety Buffer*) yang dilarang disentuh oleh AI.
3. **Langkah 3: Komitmen Rutin Bulanan Wajib**
   - Total gaji karyawan bulanan & tanggal gajian.
   - Sewa tempat / tempo supplier rutin.
   - Hasil seketika: **Duit Dingin Aman (Safe-to-Spend)** langsung terkalibrasi tanpa halusinasi.

---

## 5. Formula Matematis Deterministik (DLMM Core)
- **Safe-to-Spend**:
  $$S = C_{now} - \sum_{i=1}^{W} O_i - B_{safety} + \alpha \sum_{i=1}^{W} R_i$$
  Di mana $C_{now}$ adalah saldo kas saat ini, $O_i$ adalah kewajiban jatuh tempo dalam $W=14$ hari, $B_{safety}$ adalah buffer darurat, $R_i$ adalah piutang terverifikasi ($\alpha=0.7$).
- **Cash Runway (Hari)**:
  $$Runway = \frac{C_{now} - B_{safety}}{Burn_{daily}}$$
- **Day-of-Week Seasonality Multiplier**:
  Weekend multiplier $1.6\times$, Weekday multiplier $0.7\times$ untuk merefleksikan ritme riil F&B/Retail.

---

## 6. Sinyal Anomali $\to$ Kasus Risiko (*RiskCase*)
- **Benturan Kas Operasional (Critical)**: Penjualan melambat + komitmen supplier jatuh tempo mendekat $\to$ Potensi saldo tembus batas merah di hari gajian.
- **Kebocoran Biaya Pasif (Warning)**: Kenaikan harga kemasan/bahan baku kumulatif tanpa kenaikan omset.
- **Penyedotan Kas Prive (Warning)**: Penarikan uang toko untuk keperluan pribadi non-operasional melebihi kuota wajar.

---

## 7. Data Confidence & Data Inbox
1. `VERIFIED (90-100%)`: Mutasi bank BCA, export CSV kasir resmi, nota OCR terkonfirmasi.
2. `ESTIMATED (60-89%)`: Diinput oleh pemilik usaha (misal target omset harian).
3. `INFERRED (30-59%)`: Diturunkan dari benchmark archetype industri.
- **Data Inbox**: Transaksi yang ambigu masuk ke kotak sortir 1-klik (`[Beban Usaha]`, `[Beli Stok]`, `[Prive Pribadi]`, `[Transfer Antar-Rekening]`).

---

## 8. Human Approval & Financial Safety
- **Observe (Level 0)**: Otomatis memonitor mutasi dan menghitung metrik.
- **Assist (Level 1)**: Otomatis menyusun ringkasan mingguan dan menyortir Data Inbox.
- **Propose (Level 2)**: Menyiapkan draf WhatsApp penagihan piutang / negosiasi tempo (butuh 1-klik approval owner).
- **Execution (Level 3)**: **AI dilarang mentransfer uang atau meminjam kredit secara sepihak.** 100% eksekusi moneter di tangan pemilik via m-Banking resmi.

---

## 9. Demo Data Standard: "Kopi Nusa"
- **Kas Riil**: Rp 18.500.000 (Rekening BCA Bisnis).
- **Cadangan Darurat**: Rp 3.000.000.
- **Gaji Barista**: Rp 7.500.000 (H+6, tgl 30).
- **Tempo Supplier**: Rp 4.200.000 (H+11, tgl 05).
- **Piutang Katering Pemda**: Rp 5.000.000 (H+3).
- **Jebakan Kas Tersembunyi**: Belanja mesin kopi tunai Rp 14.0 Jt hari ini akan menyisakan kas Rp 4.5 Jt $\to$ **Pasti gagal bayar gaji barista Rp 7.5 Jt di H+6!** Solusi: Restrukturisasi DP 50% (Rp 7 Jt) menyelamatkan kas toko.

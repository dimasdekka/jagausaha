import re
from typing import Dict, Any, List, Optional

class SensorAgent:
    """
    Sensor & Ingestion Agent for JagaUsaha.
    Parses unstructured text, bank statements, and WhatsApp notes into structured
    financial commitments and digital twin business profile parameters.
    """

    def __init__(self):
        self.supported_banks = ["BCA", "Mandiri", "BRI", "BNI", "BSI", "Permata", "CIMB"]

    def parse_unstructured_commitment(self, text: str) -> Dict[str, Any]:
        """
        Parses Indonesian informal transaction descriptions into structured obligations or receivables.
        Example: 'Tempo biji kopi Toko Berkah 4.2jt tgl 11' -> Obligation
        Example: 'Katering dinas Pemda 5jt cair tgl 16' -> Receivable
        """
        lower = text.lower()

        # Extract amount
        amount = 0.0
        amount_match = re.search(r"(\d+[\.,]?\d*)\s*(jt|juta|rb|ribu|k)?", lower)
        if amount_match:
            raw_val = float(amount_match.group(1).replace(",", "."))
            unit = amount_match.group(2) or ""
            if unit in ["jt", "juta"]:
                amount = raw_val * 1_000_000
            elif unit in ["rb", "ribu", "k"]:
                amount = raw_val * 1_000
            elif raw_val < 1000:
                amount = raw_val * 1_000_000
            else:
                amount = raw_val

        # Extract due day
        due_day = 14
        day_match = re.search(r"(?:tgl|tanggal|h\+?)\s*(\d{1,2})", lower)
        if day_match:
            due_day = int(day_match.group(1))

        # Classify Obligation vs Receivable
        is_receivable = any(w in lower for w in ["cair", "terima", "piutang", "ditransfer", "masuk", "invoice"])

        # Category tagging
        category = "operational"
        if any(w in lower for w in ["gaji", "barista", "karyawan", "staff"]):
            category = "payroll"
        elif any(w in lower for w in ["tempo", "supplier", "biji", "bahan"]):
            category = "supplier_tempo"
        elif any(w in lower for w in ["sewa", "ruko", "tempat"]):
            category = "rent"

        title = text.strip()
        if len(title) > 40:
            title = title[:37] + "..."

        return {
            "title": title,
            "amount": amount,
            "due_day": due_day,
            "type": "receivable" if is_receivable else "obligation",
            "category": category,
            "raw_text": text
        }

    def extract_business_context_from_narrative(self, text: Optional[str] = None, document_name: Optional[str] = None) -> Dict[str, Any]:
        """
        Extracts structured business context from voice transcript, chat explanation, or uploaded financial doc.
        Solves cold-start context extraction for new UMKM onboarding without tedious manual form filling.
        """
        safe_text = (text or "").strip()
        lower = safe_text.lower()
        detected_items: List[str] = []

        if not safe_text:
            return {
                "business_name": "Kopi Teras Barokah",
                "archetype": "fnb",
                "bank_name": "BCA",
                "initial_cash": 18500000.0,
                "safety_buffer": 3000000.0,
                "payroll_amount": 7500000.0,
                "payroll_day": 30,
                "fixed_rent_amount": 4200000.0,
                "daily_gross": 900000.0,
                "safe_to_spend": 8000000.0,
                "confidence": 0.65,
                "detected_items": ["Archetype Default: F&B", "Kas Riil: Rp 18.500.000"],
                "summary_narrative": "Belum ada narasi atau dokumen yang dianalisis. Menampilkan profil bisnis awal default."
            }

        # 1. Detect Business Name
        name_match = re.search(
            r"(?:nama (?:usaha|toko|kafe|kedai|bisnis|butik)(?:\s+(?:saya|kami|adalah))?|(?:toko|kedai|kafe|resto|butik)(?:\s+kopi)?\s+(?:saya|kami|adalah)\s+|(?:toko|kedai|kafe|resto|butik)\s+)([a-zA-Z0-9\s]{3,25})",
            safe_text,
            re.IGNORECASE
        )
        if name_match:
            raw_bname = name_match.group(1).strip()
            raw_bname = re.sub(r"^(?:saya|kami|adalah)\s+", "", raw_bname, flags=re.IGNORECASE)
            raw_bname = re.sub(r"\s+(di|cabang|daerah).*$", "", raw_bname, flags=re.IGNORECASE).strip()
            business_name = raw_bname.title() if raw_bname else "Kopi Nusa"
            detected_items.append(f"Nama Usaha: {business_name}")
        else:
            business_name = "Kopi Nusa" if "nusa" in lower else "Kopi Teras Barokah"

        # 2. Detect Archetype
        if any(w in lower for w in ["kopi", "kafe", "cafe", "barista", "resto", "makanan", "kuliner", "minuman", "f&b"]):
            archetype = "fnb"
            detected_items.append("Kategori Industri: Kafe, Resto & F&B")
        elif any(w in lower for w in ["baju", "fashion", "hijab", "gamis", "butik", "olshop", "shopee", "tokopedia", "tiktok", "cod", "retail"]):
            archetype = "retail"
            detected_items.append("Kategori Industri: Retail & Fashion / Olshop")
        elif any(w in lower for w in ["sembako", "warung", "kelontong", "beras", "telur", "minyak", "grosir"]):
            archetype = "grocery"
            detected_items.append("Kategori Industri: Warung & Toko Kelontong")
        elif any(w in lower for w in ["jasa", "agensi", "desain", "konsultan", "freelance", "proyek", "klien"]):
            archetype = "services"
            detected_items.append("Kategori Industri: Jasa & Agensi Kreatif")
        else:
            archetype = "fnb"

        # 3. Detect Bank Name
        if "mandiri" in lower:
            bank_name = "Bank Mandiri"
        elif "bri" in lower:
            bank_name = "Bank BRI"
        elif "bni" in lower:
            bank_name = "Bank BNI"
        elif any(w in lower for w in ["tunai", "laci", "cash"]):
            bank_name = "Kas Tunai"
        else:
            bank_name = "BCA"
        detected_items.append(f"Akun Kas Utama: {bank_name}")

        # Helper to parse Rupiah numbers (unit-aware first to avoid capturing headcounts like '3 admin')
        def parse_amount_near(keywords: List[str], default_val: float) -> float:
            for kw in keywords:
                # 1. Search for kw with explicit unit (jt / juta / rb / ribu) first
                pat_unit = rf"{kw}[^.\n]*?(\d+[\.,]?\d*)\s*(jt|juta|rb|ribu)"
                m_unit = re.search(pat_unit, lower)
                if m_unit:
                    val = float(m_unit.group(1).replace(",", "."))
                    u = m_unit.group(2)
                    return val * 1_000_000 if u in ["jt", "juta"] else val * 1_000

                # 2. Search preceding unit: '15 juta untuk gaji'
                pat_pre = rf"(\d+[\.,]?\d*)\s*(jt|juta|rb|ribu)[^.\n]*?{kw}"
                m_pre = re.search(pat_pre, lower)
                if m_pre:
                    val = float(m_pre.group(1).replace(",", "."))
                    u = m_pre.group(2)
                    return val * 1_000_000 if u in ["jt", "juta"] else val * 1_000

                # 3. Search general number near kw
                pat_gen = rf"{kw}[^\d\n]*?(\d+[\.,]?\d*)\s*(rb|ribu|jt|juta)?"
                m_gen = re.search(pat_gen, lower)
                if m_gen:
                    val = float(m_gen.group(1).replace(",", "."))
                    u = m_gen.group(2) or ""
                    if u in ["jt", "juta"] or (u == "" and val < 1000):
                        return val * 1_000_000
                    elif u in ["rb", "ribu"]:
                        return val * 1_000
                    return val

            return default_val

        # 4. Extract Balances & Commitments
        initial_cash = parse_amount_near(["saldo", "kas", "rekening", "modal", "uang"], 18500000.0)
        detected_items.append(f"Saldo Kas: Rp {initial_cash:,.0f}".replace(",", "."))

        safety_buffer = parse_amount_near(["buffer", "cadangan", "darurat", "simpan"], 3000000.0)
        detected_items.append(f"Cadangan Darurat: Rp {safety_buffer:,.0f}".replace(",", "."))

        payroll_amount = parse_amount_near(["gaji", "pegawai", "karyawan", "barista", "admin"], 7500000.0)
        detected_items.append(f"Beban Gaji: Rp {payroll_amount:,.0f}".replace(",", "."))

        fixed_rent_amount = parse_amount_near(["sewa", "ruko", "tempat", "outlet"], 4200000.0)
        detected_items.append(f"Beban Sewa: Rp {fixed_rent_amount:,.0f}".replace(",", "."))

        daily_gross = parse_amount_near(["omset", "omzet", "penjualan", "sehari", "per hari"], 900000.0)
        detected_items.append(f"Omset Rata-Rata: Rp {daily_gross:,.0f}/hari".replace(",", "."))

        # Detect payroll date (support any valid calendar day 1-31)
        pday_match = re.search(r"t(?:an)?g(?:ga)?l\s+(\d{1,2})", lower)
        payroll_day = int(pday_match.group(1)) if pday_match and 1 <= int(pday_match.group(1)) <= 31 else 30

        # Calculate initial Safe-to-Spend
        instant_safe_spend = max(0.0, initial_cash - payroll_amount - safety_buffer)

        # Summary narrative
        source_label = f"Dokumen '{document_name}' & Catatan" if document_name else "Narasi Suara / Catatan Percakapan"
        summary_narrative = (
            f"Berdasarkan {source_label}, AI berhasil memetakan profil usaha '{business_name}' "
            f"dengan saldo kas Rp {initial_cash:,.0f}, cadangan darurat Rp {safety_buffer:,.0f}, "
            f"dan komitmen gaji bulanan Rp {payroll_amount:,.0f} (gajian tgl {payroll_day}). "
            f"Kalkulasi deterministik DLMM menetapkan Duit Dingin Aman sebesar Rp {instant_safe_spend:,.0f}."
        ).replace(",", ".")

        return {
            "business_name": business_name,
            "archetype": archetype,
            "bank_name": bank_name,
            "initial_cash": initial_cash,
            "safety_buffer": safety_buffer,
            "payroll_amount": payroll_amount,
            "payroll_day": payroll_day,
            "fixed_rent_amount": fixed_rent_amount,
            "daily_gross": daily_gross,
            "safe_to_spend": instant_safe_spend,
            "confidence": 0.88 if len(detected_items) >= 4 else 0.65,
            "detected_items": detected_items,
            "summary_narrative": summary_narrative
        }

    def generate_onboarding_chat_turn(self, messages: List[Dict[str, str]]) -> Dict[str, Any]:
        """
        Drives interactive, multi-turn voice/chat dialogue with UMKM owner.
        Extracts business parameters progressively while maintaining natural conversation.
        """
        user_texts = [m.get("content", "") for m in messages if m.get("role") == "user"]
        combined_text = " ".join(user_texts)

        extracted = self.extract_business_context_from_narrative(combined_text)
        lower_combined = combined_text.lower()

        # Check what information is still missing from the dialogue
        has_name = bool(re.search(r"(?:nama (?:usaha|toko|kafe|kedai|bisnis|butik)|kopi\s+[a-zA-Z]|toko\s+[a-zA-Z]|butik\s+[a-zA-Z])", lower_combined))
        has_cash = any(w in lower_combined for w in ["saldo", "kas", "rekening", "modal", "juta", "jt"])
        has_commitments = any(w in lower_combined for w in ["gaji", "karyawan", "barista", "sewa", "tempo", "buffer", "darurat"])

        # Determine the next conversational turn
        if not user_texts:
            reply = (
                "Halo! Saya AI Guardian JagaUsaha. Mari kita siapkan radar keuangan usaha Anda "
                "secara santai. Boleh ceritakan, apa nama usaha Anda dan bergerak di bidang apa?"
            )
            quick_replies = [
                "Kedai Kopi Kopi Nusa di Serang",
                "Butik Fashion & Hijab Zahrana",
                "Warung Sembako Toko Berkah"
            ]
            is_complete = False

        elif not has_cash:
            reply = (
                f"Senang berkenalan dengan {extracted['business_name']}! "
                f"Untuk memproyeksikan daya tahan kas, berapa perkiraan saldo kas di rekening operasional "
                f"(misalnya di BCA, Mandiri, atau BRI) dan rata-rata omset harian yang biasa masuk?"
            )
            quick_replies = [
                "Saldo di BCA ada 25 juta, omset 1,2 juta/hari",
                "Saldo kas Mandiri 30 juta, omset 2 juta/hari",
                "Kas tunai dan rekening BRI total 15 juta"
            ]
            is_complete = False

        elif not has_commitments:
            reply = (
                f"Saldo kas Rp {extracted['initial_cash']:,.0f} tercatat dengan rapi. "
                f"Selanjutnya, apakah ada kewajiban rutin bulanan seperti gaji karyawan atau sewa tempat, "
                f"dan berapa cadangan darurat (buffer) yang ingin Anda amankan agar tidak boleh tersentuh belanja?"
            ).replace(",", ".")
            quick_replies = [
                "Gaji 4 barista 8 juta tiap tgl 30, buffer 5 juta",
                "Gaji admin 5 juta tgl 28, sewa ruko 3 juta",
                "Gaji pegawai 4,5 juta tgl 25, buffer 2,5 juta"
            ]
            is_complete = False

        else:
            safe_spend = extracted['safe_to_spend']
            reply = (
                f"Luar biasa! Profil keuangan {extracted['business_name']} sudah lengkap terpetakan. "
                f"Dengan saldo kas Rp {extracted['initial_cash']:,.0f}, buffer darurat Rp {extracted['safety_buffer']:,.0f}, "
                f"dan komitmen gaji Rp {extracted['payroll_amount']:,.0f}, model DLMM menetapkan "
                f"Duit Dingin Aman (Safe-to-Spend) Anda sebesar Rp {safe_spend:,.0f}. "
                f"Anda sudah siap menerapkan model ini langsung ke Dashboard!"
            ).replace(",", ".")
            quick_replies = [
                "Terapkan ke Dashboard sekarang",
                "Ada sedikit revisi pada angka gaji",
                "Cek simulasi belanja mesin dulu"
            ]
            is_complete = True

        return {
            "reply": reply,
            "extracted_data": extracted,
            "is_complete": is_complete,
            "quick_replies": quick_replies
        }

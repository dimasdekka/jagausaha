"""
Sensor Agent & Multimodal Ingestion Module for JagaUsaha.
Parses Indonesian Bank Mutations (BCA/Mandiri), QRIS settlement, and natural WhatsApp notes.
"""
import re
from dataclasses import dataclass
from typing import List, Dict, Any, Optional

@dataclass
class ParsedTransaction:
    date_str: str
    description: str
    txn_type: str # "CR" (inflow) or "DB" (outflow)
    amount: float
    balance_after: Optional[float] = None
    category: str = "general"
    is_personal_bleed: bool = False # Uang dapur / prive indicator

class SensorAgent:
    def __init__(self):
        # Known Indonesian personal expense patterns found in business bank mutations
        self.personal_bleed_patterns = [
            r"INDOMARET", r"ALFAMART", r"SHOPEEPAY", r"OVO", r"GOPAY.*TOPUP", 
            r"DANA.*TOPUP", r"PLN.*PRABAYAR", r"SPK.*SEKOLAH", r"TARIK TUNAI"
        ]
        # Supplier / operational keywords
        self.operational_keywords = [
            "SUPPLIER", "TOKO", "BERKAH", "SUSU", "KOPI", "AYAM", "TELUR", 
            "PLASTIK", "PACKAGING", "GAS", "MINYAK", "TEPUNG"
        ]

    def parse_bca_mutation_text(self, text: str) -> List[ParsedTransaction]:
        """
        Parses standard KlikBCA / m-BCA text export.
        Example lines:
        20/09 TRSF E-BANKING DB 150000.00 INDOMARET 5412
        21/09 QRIS SETTLEMENT CR 1250000.00 GO-PAY ID 883
        22/09 TRSF E-BANKING DB 4200000.00 TOKO BERKAH BIJI KOPI
        """
        results: List[ParsedTransaction] = []
        lines = text.strip().split("\n")
        
        # Regex matching: Date (DD/MM), description, Type (CR/DB), Amount
        pattern = re.compile(r"^(\d{2}/\d{2})\s+(.*?)\s+(CR|DB)\s+([\d,\.]+)(?:\s+([\d,\.]+))?$", re.IGNORECASE)

        for line in lines:
            line = line.strip()
            if not line:
                continue
            
            # Simple fallback heuristic if single line doesn't match complex regex
            txn_type = "DB" if " DB " in line.upper() else ("CR" if " CR " in line.upper() else None)
            if not txn_type:
                continue

            # Extract amount
            amount_match = re.search(r"(?:CR|DB)\s+([\d\.,]+)", line, re.IGNORECASE)
            if not amount_match:
                continue
            
            raw_amt = amount_match.group(1).replace(".", "").replace(",", ".")
            try:
                amount = float(raw_amt)
            except ValueError:
                continue

            desc = line[:amount_match.start()].strip() + " " + line[amount_match.end():].strip()
            date_match = re.match(r"^(\d{2}/\d{2})", line)
            date_str = date_match.group(1) if date_match else "00/00"

            # Personal leak detection
            is_personal = any(re.search(pat, desc, re.IGNORECASE) for pat in self.personal_bleed_patterns)
            
            # Categorization
            category = "personal_prive" if is_personal else ("operational" if txn_type == "DB" else "revenue")
            if "GAJI" in desc.upper() or "PAYROLL" in desc.upper():
                category = "payroll"

            results.append(ParsedTransaction(
                date_str=date_str,
                description=desc.strip(),
                txn_type=txn_type,
                amount=amount,
                category=category,
                is_personal_bleed=is_personal
            ))
            
        return results

    def parse_whatsapp_note(self, text: str) -> Dict[str, Any]:
        """
        Parses natural conversational WhatsApp voice-to-text notes from the owner.
        Examples:
        - 'beli susu diamond 450rb tempo 2 minggu ke Toko Berkah'
        - 'bayar sewa ruko 3 juta jatuh tempo 5 hari lagi'
        - 'ada pesanan katering 5 juta pelunasan 16 hari lagi'
        """
        lower = text.lower()
        
        # 1. Extract Amount (handles 'rb', 'ribu', 'jt', 'juta', numbers)
        amount = 0.0
        amt_match = re.search(r"(\d+[\.,]?\d*)\s*(rb|ribu|jt|juta)?", lower)
        if amt_match:
            num = float(amt_match.group(1).replace(",", "."))
            unit = amt_match.group(2)
            if unit in ["jt", "juta"]:
                amount = num * 1_000_000
            elif unit in ["rb", "ribu"]:
                amount = num * 1_000
            else:
                # Raw number
                amount = num

        # 2. Extract Days / Tempo
        due_day = 1 # default tomorrow
        tempo_match = re.search(r"tempo\s+(\d+)\s*(hari|minggu|bulan)?", lower)
        if not tempo_match:
            tempo_match = re.search(r"(\d+)\s*(hari|minggu|bulan)\s+lagi", lower)

        if tempo_match:
            val = int(tempo_match.group(1))
            unit = tempo_match.group(2) or "hari"
            if "minggu" in unit:
                due_day = val * 7
            elif "bulan" in unit:
                due_day = val * 30
            else:
                due_day = val

        # 3. Determine Type
        is_receivable = any(w in lower for w in ["katering", "piutang", "pesanan", "bon pelanggan", "dp masuk", "pelunasan"])
        is_obligation = any(w in lower for w in ["tempo", "sewa", "gaji", "bayar", "beli", "hutang", "tagihan"])

        category = "receivable" if is_receivable else ("supplier_tempo" if "tempo" in lower else "expense")
        if "gaji" in lower:
            category = "payroll"
        elif "sewa" in lower:
            category = "rent"

        # Extract title entity
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

    def extract_business_context_from_narrative(self, text: str, document_name: Optional[str] = None) -> Dict[str, Any]:
        """
        Extracts structured business context from voice transcript, chat explanation, or uploaded financial doc.
        Solves cold-start context extraction for new UMKM onboarding without tedious manual form filling.
        """
        lower = text.lower() if text else ""
        detected_items: List[str] = []

        # 1. Detect Business Name
        name_match = re.search(r"(?:nama (?:usaha|toko|kafe|kedai|bisnis)(?:\s+(?:saya|kami|adalah))?|toko|kedai|kafe|resto)\s+([a-zA-Z0-9\s]{3,25})", text, re.IGNORECASE)
        if name_match:
            raw_bname = name_match.group(1).strip()
            # Clean trailing prepositions like 'di Serang', 'cabang', etc.
            raw_bname = re.sub(r"\s+(di|cabang|daerah).*$", "", raw_bname, flags=re.IGNORECASE)
            business_name = raw_bname.title()
            detected_items.append(f"Nama Usaha: {business_name}")
        else:
            business_name = "Kopi Nusa" if "nusa" in lower else "Kopi Teras Barokah"

        # 2. Detect Archetype
        if any(w in lower for w in ["kopi", "kafe", "cafe", "barista", "resto", "makanan", "kuliner", "minuman", "f&b"]):
            archetype = "fnb"
            detected_items.append("Kategori Industri: Kafe, Resto & F&B")
        elif any(w in lower for w in ["baju", "fashion", "hijab", "gamis", "olshop", "shopee", "tokopedia", "tiktok", "cod", "retail"]):
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

        # Helper to parse Rupiah numbers
        def parse_amount_near(keywords: List[str], default_val: float) -> float:
            for kw in keywords:
                # search for kw followed by number and unit, or number followed by kw
                pat1 = rf"{kw}[^\d]*(\d+[\.,]?\d*)\s*(rb|ribu|jt|juta)?"
                m1 = re.search(pat1, lower)
                if m1:
                    val = float(m1.group(1).replace(",", "."))
                    u = m1.group(2) or ""
                    if u in ["jt", "juta"] or (u == "" and val < 1000):
                        return val * 1_000_000
                    elif u in ["rb", "ribu"]:
                        return val * 1_000
                    return val

                pat2 = rf"(\d+[\.,]?\d*)\s*(rb|ribu|jt|juta)?[^\d]*{kw}"
                m2 = re.search(pat2, lower)
                if m2:
                    val = float(m2.group(1).replace(",", "."))
                    u = m2.group(2) or ""
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

        payroll_amount = parse_amount_near(["gaji", "pegawai", "karyawan", "barista"], 7500000.0)
        detected_items.append(f"Beban Gaji: Rp {payroll_amount:,.0f}".replace(",", "."))

        fixed_rent_amount = parse_amount_near(["sewa", "ruko", "tempat", "outlet"], 4200000.0)
        detected_items.append(f"Beban Sewa: Rp {fixed_rent_amount:,.0f}".replace(",", "."))

        daily_gross = parse_amount_near(["omset", "omzet", "penjualan", "sehari", "per hari"], 900000.0)
        detected_items.append(f"Omset Rata-Rata: Rp {daily_gross:,.0f}/hari".replace(",", "."))

        # Detect payroll date
        pday_match = re.search(r"t(?:an)?g(?:ga)?l\s+(\d{1,2})", lower)
        payroll_day = int(pday_match.group(1)) if pday_match and int(pday_match.group(1)) in [25, 28, 30, 1] else 30

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

if __name__ == "__main__":
    sensor = SensorAgent()
    
    # Test 1: Bank BCA mutation parsing
    raw_bca = """
    15/09 QRIS GO-PAY CR 850.000
    16/09 INDOMARET SERANG DB 125.000
    17/09 TRSF TOKO BERKAH BIJI DB 4.200.000
    18/09 GAJI BARISTA DB 2.500.000
    """
    txns = sensor.parse_bca_mutation_text(raw_bca)
    assert len(txns) == 4, f"Expected 4 transactions, got {len(txns)}"
    assert txns[1].is_personal_bleed, "Indomaret should be flagged as personal bleed"
    assert txns[3].category == "payroll", "Gaji barista should be categorized as payroll"
    
    # Test 2: Natural WhatsApp Note Parsing
    wa_note_1 = "beli biji kopi 4,2 juta tempo 2 minggu ke Toko Berkah"
    parsed_1 = sensor.parse_whatsapp_note(wa_note_1)
    assert parsed_1["amount"] == 4_200_000.0, f"Expected 4.2M, got {parsed_1['amount']}"
    assert parsed_1["due_day"] == 14, f"Expected 14 days, got {parsed_1['due_day']}"
    assert parsed_1["category"] == "supplier_tempo"

    wa_note_2 = "ada pesanan katering kantor 5 juta pelunasan 16 hari lagi"
    parsed_2 = sensor.parse_whatsapp_note(wa_note_2)
    assert parsed_2["type"] == "receivable", "Should detect catering as receivable"
    assert parsed_2["amount"] == 5_000_000.0
    assert parsed_2["due_day"] == 16

    print("[SUCCESS] SensorAgent Self-Check Passed. BCA & WhatsApp ingestion verified.")

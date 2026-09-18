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

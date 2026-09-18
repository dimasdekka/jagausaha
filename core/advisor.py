"""
Advisor Agent & Culturally Tuned Communication Engine for JagaUsaha.
Generates respectful Indonesian WhatsApp messages for debt collection and supplier negotiations.
Works deterministically offline on CloudBaik VPS; supports LLM enhancement when configured.
"""
import os
import sys
from typing import Dict, Any, List

# Ensure parent directory is in sys.path when executed directly
current_dir = os.path.dirname(os.path.abspath(__file__))
parent_dir = os.path.dirname(current_dir)
if parent_dir not in sys.path:
    sys.path.insert(0, parent_dir)

from core.dlmm import BusinessState, TrajectoryResult, calculate_safe_to_spend

class AdvisorAgent:
    def __init__(self, business_name: str = "Kopi Teras Barokah"):
        self.business_name = business_name

    def generate_debt_collection_message(
        self, 
        debtor_name: str, 
        amount: float, 
        tier: int = 1, 
        qris_id: str = "00020101021126580016ID.LINKAJA.WWW01189360091100000000005204581253033605802ID5918KOPI TERAS BAROKAH6007JAKARTA62070703A016304C92A"
    ) -> Dict[str, str]:
        """
        'Kolektor Bon Santun': Culturally tuned polite Indonesian debt collection for WhatsApp.
        Tier 1: Pengingat Santun (Friendly nudge)
        Tier 2: Konfirmasi Rekonsiliasi Kas (Polite urgency)
        Tier 3: Penegasan Tempo & Order Baru (Firm boundary)
        """
        amt_formatted = f"Rp {amount:,.0f}".replace(",", ".")
        
        if tier == 1:
            subject = "Pengingat Santun (Tier 1)"
            body = (
                f"Halo Kak {debtor_name}, semoga sehat dan lancar selalu usahanya yaa 🙏\n\n"
                f"Sekadar mengingatkan rekonsiliasi kas mingguan dari {self.business_name}, "
                f"ada catatan invoice tertunda sebesar *{amt_formatted}* yang sudah jatuh tempo.\n\n"
                f"Untuk mempermudah, Kakak bisa langsung transfer via QRIS berikut:\n"
                f"🔗 https://qris.id/pay/{qris_id[:12]}?amt={int(amount)}\n\n"
                f"Jika sudah transfer, mohon info buktinya ya Kak. Terima kasih banyak atas kerjasamanya! 😊"
            )
        elif tier == 2:
            subject = "Konfirmasi Rekonsiliasi Kas (Tier 2)"
            body = (
                f"Selamat siang Kak {debtor_name}, mohon maaf mengganggu waktunya 🙏\n\n"
                f"Menindaklanjuti invoice katering/pesanan tempo hari sebesar *{amt_formatted}*, "
                f"kami sedang merapikan arus kas untuk persiapan jadwal belanja bahan baku minggu ini.\n\n"
                f"Bolehkah kami konfirmasi estimasi tanggal transfernya Kak? "
                f"Bisa transfer via BCA 1234567890 a.n {self.business_name} atau QRIS. "
                f"Kabar dari Kakak sangat membantu kelancaran operasional kami. Terima kasih Kak! 🙏"
            )
        else:
            subject = "Penegasan Tempo & Order Berikutnya (Tier 3)"
            body = (
                f"Yth. Kak {debtor_name},\n\n"
                f"Semoga dalam keadaan baik. Terkait tagihan senilai *{amt_formatted}* yang telah melewati "
                f"batas tempo kesepakatan, sistem kami mencatat pembayaran belum kami terima.\n\n"
                f"Agar pesanan atau suplai berikutnya dapat kami proses tanpa hambatan, "
                f"mohon invoice tersebut dapat diselesaikan maksimal hari ini.\n\n"
                f"Rekening BCA: 1234567890 a.n {self.business_name}.\n"
                f"Terima kasih atas pengertian dan kerjasamanya."
            )

        return {
            "tier": tier,
            "title": subject,
            "whatsapp_text": body,
            "qris_simulated_link": f"https://qris.id/pay/{qris_id[:12]}"
        }

    def generate_supplier_negotiation_script(
        self, 
        supplier_name: str, 
        item_name: str, 
        total_price: float, 
        proposed_dp_percent: float = 0.5, 
        tempo_days: int = 30
    ) -> Dict[str, str]:
        """
        'Script Negosiasi Tempo Supplier': Counter-offer to restructure upfront CAPEX into safe installment/tempo.
        """
        dp_amount = total_price * proposed_dp_percent
        remainder = total_price - dp_amount
        
        total_fmt = f"Rp {total_price:,.0f}".replace(",", ".")
        dp_fmt = f"Rp {dp_amount:,.0f}".replace(",", ".")
        rem_fmt = f"Rp {remainder:,.0f}".replace(",", ".")

        text = (
            f"Selamat siang Pak/Bu {supplier_name}, salam sehat dari {self.business_name} 🙏\n\n"
            f"Terkait penawaran unit *{item_name}* seharga *{total_fmt}*, kami sangat berminat ambil unitnya. "
            f"Namun untuk menjaga perputaran kas operasional kami bulan ini, apakah memungkinkan jika "
            f"kami bayarkan dengan skema *DP {int(proposed_dp_percent*100)}% ({dp_fmt}) hari ini*, "
            f"dan pelunasan sisanya *{rem_fmt} dengan tempo {tempo_days} hari*?\n\n"
            f"Kami pastikan komitmen tepat waktu seperti transaksi-transaksi sebelumnya. "
            f"Mohon pertimbangannya ya Pak/Bu, terima kasih banyak sebelumnya! 🙏"
        )
        return {
            "supplier": supplier_name,
            "dp_formatted": dp_fmt,
            "remainder_formatted": rem_fmt,
            "whatsapp_text": text
        }

    def formulate_simulation_advisory(self, result: TrajectoryResult, scenario_name: str) -> Dict[str, Any]:
        """
        Translates raw mathematical TrajectoryResult into plain Indonesian actionable advice.
        """
        if result.is_safe:
            status = "AMAN (SAFE)"
            color = "green"
            headline = f"Keputusan '{scenario_name}' aman untuk dieksekusi."
            explanation = (
                f"Setelah pengeluaran ini, saldo kas terendah Anda diproyeksikan tetap terjaga di "
                f"Rp {result.min_scenario_cash:,.0f}, masih di atas batas cadangan aman. "
                f"Napas bisnis Anda mencukupi hingga {result.runway_days} hari ke depan."
            )
            actions = ["Lanjutkan transaksi", "Catat tanggal realisasi pengeluaran"]
        else:
            status = "BAHAYA (DANGER)"
            color = "red"
            insolvency_str = f"pada Hari ke-{result.insolvency_day}" if result.insolvency_day else "dalam 30 hari"
            headline = f"PERINGATAN: Jangan eksekusi '{scenario_name}' secara tunai sekarang!"
            explanation = (
                f"Pengeluaran ini memicu benturan kas {insolvency_str}. "
                f"Saldo kas diproyeksikan minus Rp {abs(result.min_scenario_cash):,.0f} akibat kewajiban gaji dan tempo yang jatuh tempo berdekatan."
            )
            actions = [
                "Opsi 1: Ajukan skema DP 50% + Tempo 30 hari ke supplier",
                "Opsi 2: Tunda pembelian 16 hari hingga pencairan piutang katering",
                "Opsi 3: Ambil cicilan 3-6 bulan untuk meratakan arus kas keluar"
            ]

        return {
            "status": status,
            "color": color,
            "headline": headline,
            "explanation": explanation,
            "breaches": result.breached_rules,
            "suggested_actions": actions,
            "min_projected_cash": result.min_scenario_cash,
            "safe_to_spend": result.safe_to_spend
        }

if __name__ == "__main__":
    advisor = AdvisorAgent("Kopi Teras Barokah")
    
    # Test 1: Debt collection script
    nudge = advisor.generate_debt_collection_message("Budi Katering", 5000000.0, tier=1)
    assert "Rp 5.000.000" in nudge["whatsapp_text"]
    assert "QRIS" in nudge["whatsapp_text"]

    # Test 2: Supplier negotiation script
    neg = advisor.generate_supplier_negotiation_script("Hendra Toko Mesin", "Mesin Espresso 2-Group", 14000000.0)
    assert "Rp 7.000.000" in neg["whatsapp_text"]
    assert "tempo 30 hari" in neg["whatsapp_text"]

    print("[SUCCESS] AdvisorAgent Self-Check Passed. Culturally tuned communication scripts verified.")

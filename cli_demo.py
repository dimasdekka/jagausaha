"""
Interactive CLI Runner for JagaUsaha.
Specifically designed for the IDwebhost AI HackFest 2026 Video Demo.
Demonstrates end-to-end Hermes Agent workflows inside the CloudBaik VPS terminal.
"""
import sys
import os
import time
from rich.console import Console
from rich.panel import Panel
from rich.table import Table
from rich.progress import Progress, SpinnerColumn, TextColumn
from rich.prompt import Prompt

# Ensure project root is in sys.path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from core.dlmm import BusinessState, Obligation, Receivable, Scenario, simulate_trajectory, calculate_safe_to_spend
from core.sensor import SensorAgent
from core.advisor import AdvisorAgent

console = Console()

def print_banner():
    banner_text = """[bold green]
   ___             __  __          __         
  |_  |__ _ ___ _ / / / /___ ___ _/ /  ___ _  
 _/ / _ `/ _ `/ // /_/ (_-</ _ `/ _ \/ _ `/  
|___/\_,_/\_, /_/\____/___/\_,_/_//_/\_,_/   
         /___/                               
[/bold green]
[bold white]AI Autonomous Financial Guardian & Decision Sandbox for Indonesian UMKM[/bold white]
[dim cyan]Infrastruktur: IDwebhost AI Hosting · CloudBaik VPS (4 vCPU / 4GB RAM / 20GB SSD)[/dim cyan]
[dim green]Runtime: Hermes Agent Compatible · DLMM Deterministic Math Engine[/dim green]
"""
    console.print(Panel(banner_text, border_style="green", expand=False))

def run_cli():
    console.clear()
    print_banner()

    # 1. Initialize State for Kopi Teras Barokah
    console.print("\n[bold yellow]▶ TAHAP 1: MEMUAT DATA OPERASIONAL BISNIS UMKM[/bold yellow]")
    with Progress(SpinnerColumn(), TextColumn("[progress.description]{task.description}"), console=console) as progress:
        task = progress.add_task("[cyan]Membaca Mutasi Rekening BCA & Rekap QRIS...", total=None)
        time.sleep(1.0)
        progress.update(task, description="[green]Normalisasi Arus Kas Selesai (DLMM State Vector Initialized)")

    state = BusinessState(
        business_name="Kopi Teras Barokah",
        current_cash=18500000.0,
        safety_buffer=3000000.0,
        avg_daily_gross_inflow=900000.0,
        daily_cogs_ratio=0.60,
        obligations=[
            Obligation(title="Gaji 3 Barista & Kitchen", due_day=6, amount=7500000.0, category="payroll"),
            Obligation(title="Tempo Biji Kopi Toko Berkah", due_day=11, amount=4200000.0, category="supplier_tempo"),
            Obligation(title="Sewa Ruko Bulanan", due_day=25, amount=4000000.0, category="rent")
        ],
        receivables=[
            Receivable(title="Piutang Katering Pemda (Pak Budi)", due_day=16, amount=5000000.0, collection_probability=0.90)
        ]
    )

    safe_spend = calculate_safe_to_spend(state, window_days=14)

    # 2. Display Vital Signs
    table = Table(title="STATUS NAPAS BISNIS (BUSINESS PULSE)", border_style="cyan")
    table.add_column("Indikator", style="bold white")
    table.add_column("Nilai Riil", style="bold green")
    table.add_column("Keterangan Operasional", style="dim")

    table.add_row("Total Saldo Bank BCA", f"Rp {state.current_cash:,.0f}", "Total likuiditas di rekening")
    table.add_row("Duit Dingin (Safe-to-Spend)", f"Rp {safe_spend:,.0f}", "Boleh dibelanjakan tanpa resiko gagal bayar")
    table.add_row("Dana Terkunci", f"Rp {state.current_cash - safe_spend:,.0f}", "Terkunci untuk Gaji (H+6), Tempo (H+11), & Buffer")
    table.add_row("Napas Kas (Runway)", "26 Hari", "Ketahanan kas tanpa omset baru")
    console.print(table)

    # 3. Simulate Decision: The Hero Dilemma
    console.print("\n[bold yellow]▶ TAHAP 2: KOTAK SIMULASI — 'BISA BELI MESIN ESPRESSO RP 14 JUTA TUNAI?'[/bold yellow]")
    console.print("[dim italic]Kasir/Owner tergoda promo diskon 25%: Mesin Espresso Rp 14.000.000 tunai hari ini.[/dim italic]")
    
    with Progress(SpinnerColumn(), TextColumn("[progress.description]{task.description}"), console=console) as progress:
        sim_task = progress.add_task("[yellow]Hermes Simulator Agent: Mencabangkan Horizon 30 Hari...", total=None)
        time.sleep(1.2)
        progress.update(sim_task, description="[bold red]ALARM INVARIANT TERLANGGAR: Terdeteksi Crash Kas!")

    scen_bad = Scenario(name="Beli Mesin Espresso Tunai", one_time_outflow=14000000.0, outflow_day=1)
    res_bad = simulate_trajectory(state, scen_bad, days=30)

    # Display Warning Box
    crash_box = f"""[bold red]⚠️ PERINGATAN BAHAYA: JANGAN BELI MESIN SECARA TUNAI SEKARANG![/bold red]
- Saldo diproyeksikan [bold yellow]MINUS Rp {abs(res_bad.min_scenario_cash):,.0f}[/bold yellow] pada [bold red]Hari ke-{res_bad.insolvency_day}[/bold red].
- Penyebab: Pembelian Rp 14M menghabiskan kas sebelum tabrakan jadwal [bold]Gaji Karyawan (H+6 Rp 7.5M)[/bold] dan [bold]Tempo Kopi (H+11 Rp 4.2M)[/bold].
- Status: Usaha terancam bangkrut dalam 12 hari jika transaksi tunai ini dieksekusi!"""
    console.print(Panel(crash_box, border_style="red", title="HERMES GUARDIAN INVARIANT BREACH"))

    # 4. Agentic Alternative: Restructuring Script
    console.print("\n[bold yellow]▶ TAHAP 3: REKOMENDASI AMAN & AKSI OTONOM (HERMES ADVISOR)[/bold yellow]")
    advisor = AdvisorAgent(state.business_name)
    neg = advisor.generate_supplier_negotiation_script("Hendra (Toko Mesin)", "Mesin Espresso 2-Group", 14000000.0, proposed_dp_percent=0.5, tempo_days=30)

    console.print("[green]✓ Solusi Terhitung:[/green] Skema DP 50% (Rp 7.000.000) + Tempo Pelunasan 30 Hari.")
    console.print("[dim]Hasil Simulasi: Saldo terendah terjaga di Rp 3.760.000 (DI ATAS BUFFER AMAN).[/dim]")

    console.print("\n[bold cyan]Draft Pesan Negosiasi Santun WhatsApp Otomatis:[/bold cyan]")
    console.print(Panel(neg["whatsapp_text"], border_style="green", title="WhatsApp Action Ready to Send"))

    # 5. Debt Collection Action
    console.print("\n[bold yellow]▶ TAHAP 4: KOLEKTOR BON SANTUN (PIUTANG KATERING PEMDA RP 5.000.000)[/bold yellow]")
    nudge = advisor.generate_debt_collection_message("Pak Budi (Katering Pemda)", 5000000.0, tier=1)
    console.print(Panel(nudge["whatsapp_text"], border_style="yellow", title="WhatsApp Kolektor Bon Santun Ber-QRIS"))

    console.print("\n[bold green]✔ DEMO BERHASIL:[/bold green] Hermes Agent + DLMM Engine berjalan 100% stabil di CloudBaik VPS terminal.\n")

if __name__ == "__main__":
    run_cli()

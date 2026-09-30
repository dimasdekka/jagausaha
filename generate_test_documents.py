import os
import openpyxl
from openpyxl.styles import Font, PatternFill, Alignment, Border, Side
from fpdf import FPDF

target_dir = os.path.abspath('dokumen_siap_upload')
os.makedirs(target_dir, exist_ok=True)

# ==============================================================================
# 1. GENERATE BCA BANK STATEMENT (PDF)
# ==============================================================================
class BCAPdfStatement(FPDF):
    def header(self):
        self.set_font('Helvetica', 'B', 14)
        self.cell(0, 7, 'PT BANK CENTRAL ASIA TBK', ln=True)
        self.set_font('Helvetica', '', 9)
        self.cell(0, 4, 'Kantor Cabang Utama Serang - Jl. Veteran No. 12, Serang, Banten', ln=True)
        self.set_font('Helvetica', 'B', 12)
        self.cell(0, 8, 'REKENING KORAN / TAHAPAN BCA BISNIS', ln=True)
        self.line(10, self.get_y(), 200, self.get_y())
        self.ln(3)

def generate_bca_statement():
    pdf = BCAPdfStatement()
    pdf.add_page()
    pdf.set_auto_page_break(auto=True, margin=15)

    # Account Info Box
    pdf.set_font('Helvetica', '', 9)
    pdf.cell(40, 5, 'No. Rekening', 0)
    pdf.set_font('Helvetica', 'B', 9)
    pdf.cell(60, 5, ': 245-0918-291', 0)
    pdf.set_font('Helvetica', '', 9)
    pdf.cell(35, 5, 'Periode Transaksi', 0)
    pdf.set_font('Helvetica', 'B', 9)
    pdf.cell(50, 5, ': 01/08/2026 - 31/08/2026', 1)

    pdf.set_font('Helvetica', '', 9)
    pdf.cell(40, 5, 'Nama Nasabah', 0)
    pdf.set_font('Helvetica', 'B', 9)
    pdf.cell(60, 5, ': KEDAI KOPI NUSA UTAMA', 0)
    pdf.set_font('Helvetica', '', 9)
    pdf.cell(35, 5, 'Mata Uang', 0)
    pdf.set_font('Helvetica', 'B', 9)
    pdf.cell(50, 5, ': IDR (Rupiah)', 1)

    pdf.set_font('Helvetica', '', 9)
    pdf.cell(40, 5, 'Saldo Awal', 0)
    pdf.set_font('Helvetica', 'B', 9)
    pdf.cell(60, 5, ': Rp 12.450.000', 0)
    pdf.set_font('Helvetica', '', 9)
    pdf.cell(35, 5, 'Saldo Akhir', 0)
    pdf.set_font('Helvetica', 'B', 9)
    pdf.cell(50, 5, ': Rp 21.800.000', 1)
    pdf.ln(5)

    # Table Header
    pdf.set_fill_color(240, 240, 240)
    pdf.set_font('Helvetica', 'B', 8.5)
    pdf.cell(20, 7, 'Tanggal', 1, 0, 'C', True)
    pdf.cell(75, 7, 'Keterangan Mutasi Transaksi', 1, 0, 'L', True)
    pdf.cell(10, 7, 'CBG', 1, 0, 'C', True)
    pdf.cell(28, 7, 'Mutasi Debit (Rp)', 1, 0, 'R', True)
    pdf.cell(28, 7, 'Mutasi Kredit (Rp)', 1, 0, 'R', True)
    pdf.cell(29, 7, 'Saldo (Rp)', 1, 1, 'R', True)

    transactions = [
        ('01/08', 'SALDO AWAL KAS USAHA', '0245', '', '', '12.450.000'),
        ('03/08', 'QRIS SETTLEMENT MOKA POS TGL 01-02/08', '0245', '', '2.850.000', '15.300.000'),
        ('05/08', 'TRSF E-BANKING DB ROASTERY BIJI KOPI', '0245', '3.200.000', '', '12.100.000'),
        ('08/08', 'QRIS SETTLEMENT MOKA POS TGL 06-07/08', '0245', '', '3.420.000', '15.520.000'),
        ('10/08', 'DEBIT OTOMATIS BIAYA LISTRIK PLN 5500VA', '0245', '1.650.000', '', '13.870.000'),
        ('12/08', 'TRSF E-BANKING CR DP KATERING KANTOR BAPPEDA', '0245', '', '5.000.000', '18.870.000'),
        ('15/08', 'BELANJA SUSU FRESH MILK GREENFIELDS 80L', '0245', '1.560.000', '', '17.310.000'),
        ('18/08', 'QRIS SETTLEMENT MOKA POS TGL 16-17/08', '0245', '', '3.900.000', '21.210.000'),
        ('21/08', 'PENARIKAN TUNAI PRIVE OWNER SMT', '0245', '600.000', '', '20.610.000'),
        ('24/08', 'QRIS SETTLEMENT MOKA POS TGL 22-23/08', '0245', '', '4.150.000', '24.760.000'),
        ('27/08', 'TRSF E-BANKING DB BELANJA SIRUP & CUP KEMASAN', '0245', '1.160.000', '', '23.600.000'),
        ('30/08', 'TRSF MULTI PAYROLL 4 BARISTA AGUSTUS 2026', '0245', '8.000.000', '', '15.600.000'),
        ('31/08', 'PELUNASAN SISA KATERING BAPPEDA SERANG', '0245', '', '6.200.000', '21.800.000'),
    ]

    pdf.set_font('Helvetica', '', 8)
    for t in transactions:
        pdf.cell(20, 6, t[0], 1, 0, 'C')
        pdf.cell(75, 6, t[1], 1, 0, 'L')
        pdf.cell(10, 6, t[2], 1, 0, 'C')
        pdf.cell(28, 6, t[3], 1, 0, 'R')
        pdf.cell(28, 6, t[4], 1, 0, 'R')
        pdf.cell(29, 6, t[5], 1, 1, 'R')

    pdf.ln(4)
    pdf.set_font('Helvetica', 'B', 8.5)
    pdf.cell(95, 6, 'TOTAL MUTASI PERIODE INI', 1, 0, 'L', True)
    pdf.cell(10, 6, '', 1, 0, 'C', True)
    pdf.cell(28, 6, 'Rp 16.170.000', 1, 0, 'R', True)
    pdf.cell(28, 6, 'Rp 25.520.000', 1, 0, 'R', True)
    pdf.cell(29, 6, 'Rp 21.800.000', 1, 1, 'R', True)

    out_path = os.path.join(target_dir, 'Rekening_Koran_BCA_Kedai_Kopi_Agustus_2026.pdf')
    pdf.output(out_path)
    print('Generated BCA Statement:', out_path)

# ==============================================================================
# 2. GENERATE MOKA POS SALES RECAP (XLSX)
# ==============================================================================
def generate_moka_recap():
    wb = openpyxl.Workbook()

    # Sheet 1: Ringkasan
    ws1 = wb.active
    ws1.title = "Ringkasan Penjualan"
    ws1.views.sheetView[0].showGridLines = True

    header_font = Font(name="Calibri", size=13, bold=True, color="FFFFFF")
    header_fill = PatternFill(start_color="1F2937", end_color="1F2937", fill_type="solid")

    ws1.merge_cells("A1:E1")
    ws1["A1"] = "LAPORAN PENJUALAN KASIR - MOKA POS (KEDAI KOPI NUSA)"
    ws1["A1"].font = header_font
    ws1["A1"].fill = header_fill
    ws1["A1"].alignment = Alignment(horizontal="center", vertical="center")
    ws1.row_dimensions[1].height = 28

    ws1["A2"] = "Periode: 01 September 2026 s/d 28 September 2026"
    ws1["A2"].font = Font(name="Calibri", size=10, italic=True)

    summary_data = [
        ("Indikator Metrik", "Nilai (Rp / Qty)", "Catatan Operasional"),
        ("Penjualan Kotor (Gross Sales)", 42800000, "1.412 Transaksi Struk Kasir"),
        ("Diskon Promo Pelanggan", -1850000, "Voucher Member & Happy Hour"),
        ("Potongan Biaya MDR QRIS (0.3%)", -128400, "Settlement Otomatis Bank"),
        ("Penjualan Bersih (Net Revenue)", 40821600, "Masuk ke Rekening Kas BCA"),
        ("Rata-rata Omset Harian", 1457914, "Hari kerja stabil di 1.2jt - 2.1jt"),
        ("Menu Terlaris #1", "Es Kopi Susu Gula Aren", "640 cup terjual (45% revenue)"),
        ("Menu Terlaris #2", "V60 Single Origin Gayo", "210 cup terjual"),
        ("Bahan Baku Terpakai", "Biji Kopi: 32 Kg | Susu: 120 L", "Buffer stok sisa 6 hari"),
    ]

    th_fill = PatternFill(start_color="E5E7EB", end_color="E5E7EB", fill_type="solid")
    th_font = Font(name="Calibri", size=10, bold=True)

    row_idx = 4
    for r in summary_data:
        ws1.cell(row=row_idx, column=1, value=r[0])
        ws1.cell(row=row_idx, column=2, value=r[1])
        ws1.cell(row=row_idx, column=3, value=r[2])
        if row_idx == 4:
            for col in range(1, 4):
                ws1.cell(row=row_idx, column=col).fill = th_fill
                ws1.cell(row=row_idx, column=col).font = th_font
        row_idx += 1

    ws1.column_dimensions["A"].width = 32
    ws1.column_dimensions["B"].width = 28
    ws1.column_dimensions["C"].width = 40

    # Sheet 2: Rincian Transaksi
    ws2 = wb.create_sheet(title="Log Transaksi Kasir")
    ws2.views.sheetView[0].showGridLines = True
    headers2 = ["Waktu", "No Struk", "Item Menu", "Kategori", "Qty", "Harga Satuan", "Total (Rp)", "Metode Bayar"]
    ws2.append(headers2)
    for col in range(1, len(headers2) + 1):
        ws2.cell(row=1, column=col).font = th_font
        ws2.cell(row=1, column=col).fill = th_fill

    logs = [
        ("01/09/2026 09:12", "TRX-20260901-001", "Es Kopi Susu Aren", "Minuman", 2, 22000, 44000, "QRIS BCA"),
        ("01/09/2026 10:05", "TRX-20260901-002", "Americano Double Shot", "Minuman", 1, 20000, 20000, "Tunai"),
        ("01/09/2026 11:30", "TRX-20260901-003", "Croissant Butter", "Makanan", 3, 18000, 54000, "QRIS GoPay"),
        ("02/09/2026 14:15", "TRX-20260902-045", "V60 Aceh Gayo Natural", "Minuman", 2, 28000, 56000, "QRIS BCA"),
        ("02/09/2026 16:40", "TRX-20260902-058", "Es Kopi Susu Pandan", "Minuman", 4, 24000, 96000, "Debit BCA"),
        ("03/09/2026 13:20", "TRX-20260903-088", "Paket Katering Rapat (20 Cup)", "Katering", 20, 20000, 400000, "Transfer Bank"),
        ("04/09/2026 19:10", "TRX-20260904-112", "Toast Roti Bakar Coklat", "Makanan", 2, 15000, 30000, "Tunai"),
        ("05/09/2026 20:30", "TRX-20260905-145", "Caramel Macchiato", "Minuman", 2, 26000, 52000, "QRIS BCA"),
    ]
    for row in logs:
        ws2.append(row)

    for col in ["A", "B", "C", "D", "E", "F", "G", "H"]:
        ws2.column_dimensions[col].width = 20

    out_path = os.path.join(target_dir, 'Laporan_Penjualan_Moka_POS_September_2026.xlsx')
    wb.save(out_path)
    print('Generated Moka Recap:', out_path)

# ==============================================================================
# 3. GENERATE SUPPLIER INVOICE (PDF)
# ==============================================================================
class InvoicePdf(FPDF):
    def header(self):
        self.set_font('Helvetica', 'B', 14)
        self.cell(0, 6, 'CV ROASTERY BERKAH NUSANTARA', ln=True)
        self.set_font('Helvetica', '', 8.5)
        self.cell(0, 4, 'Supplier Biji Kopi Spesialti, Mesin Kopi, & Bahan Baku Cafe', ln=True)
        self.cell(0, 4, 'Kawasan Pergudangan Cikande Kav. B-8, Serang - WhatsApp: 0812-8899-2341', ln=True)
        self.set_font('Helvetica', 'B', 12)
        self.ln(2)
        self.cell(0, 7, 'FAKTUR PENJUALAN / INVOICE TEMPO SUPPLIER', ln=True)
        self.line(10, self.get_y(), 200, self.get_y())
        self.ln(4)

def generate_supplier_invoice():
    pdf = InvoicePdf()
    pdf.add_page()

    pdf.set_font('Helvetica', '', 9)
    pdf.cell(35, 5, 'Nomor Invoice', 0)
    pdf.set_font('Helvetica', 'B', 9)
    pdf.cell(65, 5, ': INV/2026/09/ROAST-881', 0)
    pdf.set_font('Helvetica', '', 9)
    pdf.cell(35, 5, 'Tanggal Terbit', 0)
    pdf.set_font('Helvetica', 'B', 9)
    pdf.cell(55, 5, ': 10 September 2026', 1)

    pdf.set_font('Helvetica', '', 9)
    pdf.cell(35, 5, 'Pelanggan (Buyer)', 0)
    pdf.set_font('Helvetica', 'B', 9)
    pdf.cell(65, 5, ': KEDAI KOPI NUSA UTAMA', 0)
    pdf.set_font('Helvetica', '', 9)
    pdf.cell(35, 5, 'Jatuh Tempo (Due)', 0)
    pdf.set_font('Helvetica', 'B', 9)
    pdf.cell(55, 5, ': 10 Oktober 2026 (Tempo 30 Hari)', 1)

    pdf.set_font('Helvetica', '', 9)
    pdf.cell(35, 5, 'Kontak PIC', 0)
    pdf.set_font('Helvetica', '', 9)
    pdf.cell(65, 5, ': Bpk. Dimas Dekananta', 0)
    pdf.cell(35, 5, 'Skema Pembayaran', 0)
    pdf.set_font('Helvetica', 'B', 9)
    pdf.cell(55, 5, ': DP 50% + Pelunasan 30 Hari', 1)
    pdf.ln(5)

    # Table
    pdf.set_fill_color(240, 240, 240)
    pdf.set_font('Helvetica', 'B', 8.5)
    pdf.cell(10, 7, 'No', 1, 0, 'C', True)
    pdf.cell(85, 7, 'Deskripsi Barang / Bahan Baku', 1, 0, 'L', True)
    pdf.cell(20, 7, 'Qty', 1, 0, 'C', True)
    pdf.cell(35, 7, 'Harga Satuan (Rp)', 1, 0, 'R', True)
    pdf.cell(40, 7, 'Subtotal (Rp)', 1, 1, 'R', True)

    items = [
        ('1', 'Biji Kopi House Blend Espresso 70/30 (Medium Roast)', '25 Kg', '180.000', '4.500.000'),
        ('2', 'Susu Fresh Milk Pasteurisasi Greenfields Barista', '100 Liter', '19.500', '1.950.000'),
        ('3', 'Sirup Perisa Vanilla & Caramel Monin (700ml)', '6 Botol', '145.000', '870.000'),
        ('4', 'Paper Cup Double Wall Hot 8oz + Lid Hitam', '500 Pcs', '950', '475.000'),
    ]

    pdf.set_font('Helvetica', '', 8.5)
    for it in items:
        pdf.cell(10, 6, it[0], 1, 0, 'C')
        pdf.cell(85, 6, it[1], 1, 0, 'L')
        pdf.cell(20, 6, it[2], 1, 0, 'C')
        pdf.cell(35, 6, it[3], 1, 0, 'R')
        pdf.cell(40, 6, it[4], 1, 1, 'R')

    pdf.set_font('Helvetica', 'B', 9)
    pdf.cell(150, 7, 'TOTAL NILAI PEMBELIAN', 1, 0, 'R', True)
    pdf.cell(40, 7, 'Rp 7.795.000', 1, 1, 'R', True)

    pdf.cell(150, 6, 'Uang Muka (DP 50% - Lunas Saat Pengiriman)', 1, 0, 'R')
    pdf.set_text_color(22, 101, 52)
    pdf.cell(40, 6, '-Rp 3.897.500', 1, 1, 'R')

    pdf.set_text_color(0, 0, 0)
    pdf.cell(150, 7, 'SISA KEWAJIBAN TEMPO JATUH TEMPO 10 OKTOBER 2026', 1, 0, 'R', True)
    pdf.set_text_color(185, 28, 28)
    pdf.cell(40, 7, 'Rp 3.897.500', 1, 1, 'R', True)
    pdf.set_text_color(0, 0, 0)

    pdf.ln(5)
    pdf.set_font('Helvetica', '', 8.5)
    pdf.multi_cell(0, 4.5, 'Catatan Bank Pembayaran Pelunasan:\nBank BCA No. Rek: 883-092-1144 a.n CV Roastery Berkah Nusantara.\nKonfirmasi bukti transfer ke nomor WhatsApp Finance: 0812-8899-2341.')

    out_path = os.path.join(target_dir, 'Faktur_Tagihan_Supplier_Biji_Kopi_INV881.pdf')
    pdf.output(out_path)
    print('Generated Supplier Invoice:', out_path)

if __name__ == '__main__':
    generate_bca_statement()
    generate_moka_recap()
    generate_supplier_invoice()
    print('All 3 Indonesian financial documents successfully created!')

import React, { useState } from 'react';
import {
  Calendar,
  ArrowDownLeft,
  ArrowUpRight,
  AlertCircle,
  CheckCircle2,
  MessageSquare,
  QrCode,
  Plus,
  X,
  Trash2,
} from 'lucide-react';

interface DashboardAgendaViewProps {
  onOpenWhatsAppModal: (data: {
    title: string;
    recipient: string;
    text: string;
    type?: 'debt_collection' | 'supplier_negotiation';
  }) => void;
}

interface CashEvent {
  id: string;
  day: string;
  date: string;
  category: 'piutang' | 'gaji' | 'supplier' | 'sewa' | 'operasional';
  title: string;
  party: string;
  type: 'inflow' | 'outflow';
  amount: number;
  status: 'Menunggu Cair' | 'Komitmen Pasti' | 'Jatuh Tempo' | 'Terjadwal';
  isClashingRisk?: boolean;
  actionText?: string;
  actionType?: 'qris' | 'negotiation' | 'remind';
}

export const DashboardAgendaView: React.FC<DashboardAgendaViewProps> = ({
  onOpenWhatsAppModal,
}) => {
  const [filterType, setFilterType] = useState<'all' | 'inflow' | 'outflow' | 'risk'>('all');

  const defaultEvents: CashEvent[] = [
    {
      id: 'evt-1',
      day: 'H+3',
      date: '27 Sep 2026',
      category: 'piutang',
      title: 'Piutang Katering Acara Kantor Pemda',
      party: 'Pak Budi (Bag. Umum Pemda)',
      type: 'inflow',
      amount: 5000000,
      status: 'Menunggu Cair',
      actionText: 'Tagih QRIS Santun',
      actionType: 'qris',
    },
    {
      id: 'evt-2',
      day: 'H+6',
      date: '30 Sep 2026',
      category: 'gaji',
      title: 'Gaji Bulanan 3 Barista & Kitchen',
      party: 'Tim Karyawan Toko',
      type: 'outflow',
      amount: 7500000,
      status: 'Komitmen Pasti',
      isClashingRisk: true,
    },
    {
      id: 'evt-3',
      day: 'H+11',
      date: '05 Okt 2026',
      category: 'supplier',
      title: 'Tempo Pembelian Biji Kopi Arabika',
      party: 'Toko Biji Kopi Berkah',
      type: 'outflow',
      amount: 4200000,
      status: 'Jatuh Tempo',
      actionText: 'Draf DP 50% Supplier',
      actionType: 'negotiation',
    },
    {
      id: 'evt-4',
      day: 'H+16',
      date: '10 Okt 2026',
      category: 'piutang',
      title: 'Invoice Langganan Kopi Mingguan',
      party: 'Startup Hub Coworking',
      type: 'inflow',
      amount: 2800000,
      status: 'Terjadwal',
      actionText: 'Kirim Invoice WhatsApp',
      actionType: 'remind',
    },
    {
      id: 'evt-5',
      day: 'H+20',
      date: '14 Okt 2026',
      category: 'sewa',
      title: 'Biaya Sewa Teras & Retribusi Lingkungan',
      party: 'Pengelola Ruko',
      type: 'outflow',
      amount: 3500000,
      status: 'Terjadwal',
    },
    {
      id: 'evt-6',
      day: 'H+25',
      date: '19 Okt 2026',
      category: 'piutang',
      title: 'Katering Event Komunitas Fotografi',
      party: 'Komunitas Seni Visual',
      type: 'inflow',
      amount: 4500000,
      status: 'Menunggu Cair',
      actionText: 'Tagih QRIS Santun',
      actionType: 'qris',
    },
  ];

  const [events, setEvents] = useState<CashEvent[]>(defaultEvents);

  // New Agenda Item Form States
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newType, setNewType] = useState<'inflow' | 'outflow'>('inflow');
  const [newTitle, setNewTitle] = useState('');
  const [newParty, setNewParty] = useState('');
  const [newCategory, setNewCategory] = useState<'piutang' | 'gaji' | 'supplier' | 'sewa' | 'operasional'>('piutang');
  const [newAmount, setNewAmount] = useState<string>('');
  const [newDate, setNewDate] = useState('2026-10-05');
  const [newActionType, setNewActionType] = useState<'qris' | 'negotiation' | 'remind' | 'none'>('qris');

  const handleCreateEvent = (e: React.FormEvent) => {
    e.preventDefault();
    const parsedAmt = parseFloat(newAmount) || 0;
    if (!newTitle.trim() || parsedAmt <= 0) return;

    // Calculate approximate H+days relative to late Sep 2026
    const targetDateObj = new Date(newDate);
    const baseDateObj = new Date('2026-09-24');
    const diffTime = targetDateObj.getTime() - baseDateObj.getTime();
    const diffDays = Math.max(1, Math.round(diffTime / (1000 * 3600 * 24)));

    // Month formatting (ID)
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
    const formattedDate = `${targetDateObj.getDate().toString().padStart(2, '0')} ${months[targetDateObj.getMonth()]} ${targetDateObj.getFullYear()}`;

    const newEvt: CashEvent = {
      id: `evt-${Date.now()}`,
      day: `H+${diffDays}`,
      date: formattedDate,
      category: newCategory,
      title: newTitle.trim(),
      party:
        newParty.trim() ||
        (newCategory === 'gaji'
          ? 'Tim Karyawan Toko'
          : newCategory === 'piutang'
          ? 'Pelanggan Toko'
          : 'Supplier Bahan Baku'),
      type: newType,
      amount: parsedAmt,
      status: newType === 'inflow' ? 'Menunggu Cair' : 'Komitmen Pasti',
      isClashingRisk: newType === 'outflow' && parsedAmt >= 5000000,
      actionText:
        newType === 'inflow'
          ? newActionType === 'qris'
            ? 'Tagih QRIS Santun'
            : newActionType === 'remind'
            ? 'Kirim Invoice WhatsApp'
            : undefined
          : newActionType === 'negotiation'
          ? 'Draf DP 50% Supplier'
          : undefined,
      actionType: newActionType !== 'none' ? newActionType : undefined,
    };

    setEvents((prev) => [newEvt, ...prev]);
    setIsAddModalOpen(false);
    // Reset form
    setNewTitle('');
    setNewParty('');
    setNewAmount('');
  };

  const handleDeleteEvent = (id: string) => {
    setEvents((prev) => prev.filter((e) => e.id !== id));
  };

  const filteredEvents = events.filter((e) => {
    if (filterType === 'inflow') return e.type === 'inflow';
    if (filterType === 'outflow') return e.type === 'outflow';
    if (filterType === 'risk') return e.isClashingRisk;
    return true;
  });

  const totalInflow = events
    .filter((e) => e.type === 'inflow')
    .reduce((acc, curr) => acc + curr.amount, 0);

  const totalOutflow = events
    .filter((e) => e.type === 'outflow')
    .reduce((acc, curr) => acc + curr.amount, 0);

  const netCashflow = totalInflow - totalOutflow;

  const handleAction = (evt: CashEvent) => {
    if (evt.actionType === 'qris') {
      onOpenWhatsAppModal({
        title: 'Penagihan Piutang QRIS',
        recipient: evt.party,
        text: `Halo Kak, salam hangat dari tim kami 🙏\n\nSekadar mengingatkan untuk invoice *${evt.title}* senilai *Rp ${evt.amount.toLocaleString('id-ID')}* yang jatuh tempo pada ${evt.date}.\n\nPembayaran dapat langsung diselesaikan melalui link QRIS resmi berikut: https://qris.id/pay/ID102003882910?amt=${evt.amount}\n\nTerima kasih banyak atas kerjasamanya! 😊`,
        type: 'debt_collection',
      });
    } else if (evt.actionType === 'negotiation') {
      onOpenWhatsAppModal({
        title: 'Negosiasi Tempo Supplier',
        recipient: evt.party,
        text: `Selamat siang Bapak/Ibu ${evt.party}, salam sukses selalu 🙏\n\nTerkait tagihan bahan baku *${evt.title}* senilai *Rp ${evt.amount.toLocaleString('id-ID')}*, kami bermaksud mengajukan skema pelunasan bertahap (DP 50% hari ini, sisa tempo 30 hari) sesuai jadwal administrasi budgeting pengadaan berkala kami.\n\nApakah memungkinkan untuk dibantu skema tersebut Pak/Bu? Terima kasih banyak atas dukungannya! 🙏`,
        type: 'supplier_negotiation',
      });
    } else if (evt.actionType === 'remind') {
      onOpenWhatsAppModal({
        title: 'Pengingat Invoice Rutin',
        recipient: evt.party,
        text: `Halo Kak dari ${evt.party}, semoga harinya menyenangkan! 🙏\n\nBerikut terlampir rincian tagihan langganan kopi *${evt.title}* sebesar *Rp ${evt.amount.toLocaleString('id-ID')}* untuk periode berjalan.\n\nTerima kasih atas kepercayaannya! 😊`,
        type: 'debt_collection',
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="rounded-2xl border border-slate-200/90 bg-white p-5 sm:p-6 shadow-xs flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-blue-100 text-blue-800">
              <Calendar className="h-4 w-4" />
            </span>
            <h2 className="text-lg font-bold text-slate-950">Agenda Arus Kas & Rekonsiliasi 14-30 Hari</h2>
          </div>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl">
            Visibilitas lengkap jadwal uang masuk (piutang pelanggan) dan komitmen uang keluar (gaji, tempo supplier, dan sewa) untuk mencegah gagal bayar.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto">
          {/* Aggregate Cashflow Pills */}
          <div className="flex items-center justify-between sm:justify-start gap-2.5 bg-slate-50 p-2.5 rounded-xl border border-slate-200/80 text-xs shrink-0">
            <div className="px-2">
              <span className="text-[10px] text-slate-400 block font-medium">Total Masuk:</span>
              <span className="font-bold text-emerald-700 tabular-nums whitespace-nowrap">
                +Rp {totalInflow.toLocaleString('id-ID')}
              </span>
            </div>
            <div className="h-6 w-px bg-slate-200" />
            <div className="px-2">
              <span className="text-[10px] text-slate-400 block font-medium">Total Keluar:</span>
              <span className="font-bold text-slate-900 tabular-nums whitespace-nowrap">
                -Rp {totalOutflow.toLocaleString('id-ID')}
              </span>
            </div>
            <div className="h-6 w-px bg-slate-200" />
            <div className="px-2">
              <span className="text-[10px] text-slate-400 block font-medium">Netto Kas:</span>
              <span className={`font-bold tabular-nums whitespace-nowrap ${netCashflow >= 0 ? 'text-emerald-700' : 'text-rose-600'}`}>
                {netCashflow >= 0 ? '+Rp ' : '-Rp '}
                {Math.abs(netCashflow).toLocaleString('id-ID')}
              </span>
            </div>
          </div>

          {/* Tombol Tambah Agenda Kas */}
          <button
            type="button"
            onClick={() => setIsAddModalOpen(true)}
            className="inline-flex items-center justify-center gap-2 h-10 px-4 rounded-xl bg-neutral-950 hover:bg-neutral-850 text-white text-xs font-bold transition-all shadow-xs cursor-pointer active:scale-[0.98] shrink-0"
          >
            <Plus className="h-4 w-4" />
            <span>Tambah Agenda Kas</span>
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center justify-between gap-2 overflow-x-auto pb-1">
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setFilterType('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold cursor-pointer transition-colors ${
              filterType === 'all'
                ? 'bg-neutral-900 text-white'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            Semua Komitmen ({events.length})
          </button>

          <button
            onClick={() => setFilterType('inflow')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold cursor-pointer transition-colors flex items-center gap-1.5 ${
              filterType === 'inflow'
                ? 'bg-emerald-900 text-white'
                : 'bg-white border border-slate-200 text-emerald-700 hover:bg-emerald-50'
            }`}
          >
            <ArrowDownLeft className="h-3.5 w-3.5" />
            <span>Uang Masuk</span>
          </button>

          <button
            onClick={() => setFilterType('outflow')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold cursor-pointer transition-colors flex items-center gap-1.5 ${
              filterType === 'outflow'
                ? 'bg-neutral-900 text-white'
                : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            <ArrowUpRight className="h-3.5 w-3.5" />
            <span>Uang Keluar</span>
          </button>

          <button
            onClick={() => setFilterType('risk')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold cursor-pointer transition-colors flex items-center gap-1.5 ${
              filterType === 'risk'
                ? 'bg-rose-900 text-white'
                : 'bg-white border border-slate-200 text-rose-700 hover:bg-rose-50'
            }`}
          >
            <AlertCircle className="h-3.5 w-3.5" />
            <span>Siaga Benturan Kas</span>
          </button>
        </div>

        <div className="text-[11px] text-slate-400 font-medium hidden sm:block">
          Sinkronisasi Bank BCA & Faktur Terakhir: Hari ini
        </div>
      </div>

      {/* Events Table / Card Feed */}
      <div className="rounded-2xl border border-slate-200/90 bg-white overflow-hidden shadow-xs">
        <div className="divide-y divide-slate-100">
          {filteredEvents.map((evt) => (
            <div
              key={evt.id}
              className={`p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-colors group ${
                evt.isClashingRisk ? 'bg-rose-50/20' : 'hover:bg-slate-50/60'
              }`}
            >
              {/* Left Info */}
              <div className="flex items-start sm:items-center gap-3.5">
                <div className="text-center shrink-0 w-14 py-1.5 rounded-xl bg-slate-100 border border-slate-200/80">
                  <span className="font-mono text-xs font-extrabold text-slate-900 block leading-tight">
                    {evt.day}
                  </span>
                  <span className="text-[10px] text-slate-500 block leading-tight font-medium">
                    {evt.date.split(' ').slice(0, 2).join(' ')}
                  </span>
                </div>

                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="text-xs sm:text-sm font-bold text-slate-950">
                      {evt.title}
                    </span>
                    {evt.isClashingRisk && (
                      <span className="text-[9px] font-bold text-rose-800 bg-rose-100 px-1.5 py-0.5 rounded border border-rose-200">
                        Titik Kritis Gaji
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-slate-500 flex items-center gap-2">
                    <span>{evt.party}</span>
                    <span>·</span>
                    <span className="capitalize">{evt.category}</span>
                  </div>
                </div>
              </div>

              {/* Right Action & Nominal: Rock-solid Column Alignment */}
              <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-4 sm:gap-6 shrink-0">
                {/* Nominal & Status: Anchored to a fixed-width container for laser-sharp vertical column alignment */}
                <div className="text-left sm:text-right w-36 sm:w-44 shrink-0">
                  <div
                    className={`text-sm sm:text-base font-bold tabular-nums tracking-tight ${
                      evt.type === 'inflow' ? 'text-emerald-700' : 'text-slate-900'
                    }`}
                  >
                    {evt.type === 'inflow' ? '+Rp ' : '-Rp '}
                    {evt.amount.toLocaleString('id-ID')}
                  </div>
                  <div className="text-[11px] text-slate-400 font-medium mt-0.5">
                    Status: <strong className="text-slate-700 font-semibold">{evt.status}</strong>
                  </div>
                </div>

                {/* Action CTA or Verified Status Pill: Fixed width for 100% consistent right margin & alignment */}
                <div className="w-[180px] sm:w-[200px] flex items-center justify-end gap-2 shrink-0">
                  {evt.actionText ? (
                    <button
                      onClick={() => handleAction(evt)}
                      className={`flex-1 inline-flex items-center justify-start gap-2 min-h-[36px] py-1.5 px-3 rounded-xl text-xs font-semibold transition-all cursor-pointer shadow-2xs active:scale-[0.98] text-left ${
                        evt.actionType === 'qris'
                          ? 'bg-neutral-950 hover:bg-neutral-800 text-white'
                          : 'border border-slate-200/90 bg-white hover:bg-slate-50 text-slate-800'
                      }`}
                    >
                      {evt.actionType === 'qris' ? (
                        <QrCode className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                      ) : (
                        <MessageSquare className="h-3.5 w-3.5 text-blue-600 shrink-0" />
                      )}
                      <span className="text-left leading-tight">{evt.actionText}</span>
                    </button>
                  ) : (
                    <div className="flex-1 inline-flex items-center justify-start gap-2 min-h-[36px] py-1.5 px-3 rounded-xl bg-slate-50 border border-slate-200/80 text-xs font-semibold text-slate-600 text-left">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                      <span className="text-left leading-tight">Otomatis Terjadwal</span>
                    </div>
                  )}

                  {/* Delete Button */}
                  <button
                    type="button"
                    onClick={() => handleDeleteEvent(evt.id)}
                    className="opacity-0 group-hover:opacity-100 p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-all cursor-pointer shrink-0"
                    title="Hapus Agenda"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal Dialog: Tambah Agenda Kas Baru */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            onClick={() => setIsAddModalOpen(false)}
            className="fixed inset-0 bg-neutral-950/50 backdrop-blur-xs transition-opacity"
          />

          <div className="relative w-full max-w-lg bg-white rounded-3xl border border-neutral-200/90 shadow-2xl z-10 overflow-hidden flex flex-col my-auto max-h-[90vh] animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-neutral-100 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="h-8 w-8 rounded-xl bg-neutral-950 text-white flex items-center justify-center">
                  <Calendar className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-neutral-950">
                    Tambah Jadwal Arus Kas Baru
                  </h3>
                  <p className="text-[10.5px] text-neutral-500">
                    Catat piutang masuk atau komitmen tempo uang keluar usaha
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="h-7 w-7 rounded-lg text-neutral-400 hover:text-neutral-900 hover:bg-neutral-100 flex items-center justify-center cursor-pointer transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleCreateEvent} className="p-6 space-y-4 overflow-y-auto">
              {/* Jenis Arus Kas */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-neutral-800 block">
                  Jenis Arus Kas <span className="text-rose-500">*</span>
                </label>
                <div className="grid grid-cols-2 gap-2 p-1 bg-neutral-100 rounded-xl">
                  <button
                    type="button"
                    onClick={() => {
                      setNewType('inflow');
                      setNewCategory('piutang');
                      setNewActionType('qris');
                    }}
                    className={`py-2 px-3 rounded-lg text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                      newType === 'inflow'
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : 'text-neutral-600 hover:text-neutral-950'
                    }`}
                  >
                    <ArrowDownLeft className="h-4 w-4" />
                    <span>Uang Masuk</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setNewType('outflow');
                      setNewCategory('supplier');
                      setNewActionType('negotiation');
                    }}
                    className={`py-2 px-3 rounded-lg text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                      newType === 'outflow'
                        ? 'bg-neutral-950 text-white shadow-xs'
                        : 'text-neutral-600 hover:text-neutral-950'
                    }`}
                  >
                    <ArrowUpRight className="h-4 w-4" />
                    <span>Uang Keluar</span>
                  </button>
                </div>
              </div>

              {/* Judul & Nama Pihak */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-neutral-800 block">
                    Nama Transaksi <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder={newType === 'inflow' ? 'Contoh: Piutang Katering Kantor' : 'Contoh: Tempo Supplier Biji Kopi'}
                    className="w-full h-9 px-3 rounded-xl border border-neutral-200 text-xs font-semibold text-neutral-950 placeholder:font-normal placeholder:text-neutral-400 focus:outline-none focus:border-neutral-950 shadow-2xs"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-neutral-800 block">
                    Pihak Lawan Transaksi
                  </label>
                  <input
                    type="text"
                    value={newParty}
                    onChange={(e) => setNewParty(e.target.value)}
                    placeholder="Contoh: Pak Budi / CV Roastery"
                    className="w-full h-9 px-3 rounded-xl border border-neutral-200 text-xs font-semibold text-neutral-950 placeholder:font-normal placeholder:text-neutral-400 focus:outline-none focus:border-neutral-950 shadow-2xs"
                  />
                </div>
              </div>

              {/* Kategori & Tanggal */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-neutral-800 block">
                    {newType === 'inflow' ? 'Kategori Pemasukan' : 'Kategori Pengeluaran'} <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as any)}
                    className="w-full h-9 px-3 rounded-xl border border-neutral-200 text-xs font-semibold text-neutral-950 bg-white focus:outline-none focus:border-neutral-950 shadow-2xs"
                  >
                    {newType === 'inflow' ? (
                      <>
                        <option value="piutang">Piutang Pelanggan</option>
                        <option value="operasional">Penjualan Konsinyasi / Grosir</option>
                      </>
                    ) : (
                      <>
                        <option value="supplier">Tempo Supplier / Vendor</option>
                        <option value="gaji">Gaji Karyawan</option>
                        <option value="sewa">Sewa Tempat / Ruko</option>
                        <option value="operasional">Biaya Operasional Rutin</option>
                      </>
                    )}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-neutral-800 block">
                    Tanggal Rencana Kas <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="date"
                    required
                    value={newDate}
                    onChange={(e) => setNewDate(e.target.value)}
                    className="w-full h-9 px-3 rounded-xl border border-neutral-200 text-xs font-semibold text-neutral-950 focus:outline-none focus:border-neutral-950 shadow-2xs"
                  />
                </div>
              </div>

              {/* Nominal (Rp) */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs font-bold text-neutral-800">
                  <span>Nominal Transaksi (Rp) <span className="text-rose-500">*</span></span>
                  {parseFloat(newAmount) > 0 && (
                    <span className="text-[10.5px] font-bold text-emerald-700">
                      Terbaca: Rp {parseFloat(newAmount).toLocaleString('id-ID')}
                    </span>
                  )}
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-xs font-bold text-neutral-400">
                    Rp
                  </div>
                  <input
                    type="number"
                    required
                    value={newAmount}
                    onChange={(e) => setNewAmount(e.target.value)}
                    placeholder="Contoh: 3500000"
                    className="w-full h-10 pl-9 pr-3 rounded-xl border border-neutral-200 text-xs sm:text-sm font-bold text-neutral-950 tabular-nums placeholder:font-normal placeholder:text-neutral-400 focus:outline-none focus:border-neutral-950 shadow-2xs"
                  />
                </div>
              </div>

              {/* Otomasi Tindakan */}
              <div className="space-y-1.5 pt-1">
                <label className="text-xs font-bold text-neutral-800 block">
                  Aksi Otomasi Terhubung
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {newType === 'inflow' ? (
                    <>
                      <button
                        type="button"
                        onClick={() => setNewActionType('qris')}
                        className={`p-2.5 rounded-xl text-xs font-bold border text-left flex items-center gap-2 cursor-pointer transition-all ${
                          newActionType === 'qris'
                            ? 'bg-emerald-50 text-emerald-900 border-emerald-400 ring-1 ring-emerald-400/30'
                            : 'bg-white text-neutral-600 border-neutral-200 hover:bg-neutral-50'
                        }`}
                      >
                        <QrCode className="h-4 w-4 text-emerald-600 shrink-0" />
                        <div className="truncate">
                          <div>Tagih via QRIS</div>
                          <div className="text-[10px] font-normal opacity-75">Tautan bayar instan</div>
                        </div>
                      </button>

                      <button
                        type="button"
                        onClick={() => setNewActionType('remind')}
                        className={`p-2.5 rounded-xl text-xs font-bold border text-left flex items-center gap-2 cursor-pointer transition-all ${
                          newActionType === 'remind'
                            ? 'bg-blue-50 text-blue-900 border-blue-400 ring-1 ring-blue-400/30'
                            : 'bg-white text-neutral-600 border-neutral-200 hover:bg-neutral-50'
                        }`}
                      >
                        <MessageSquare className="h-4 w-4 text-blue-600 shrink-0" />
                        <div className="truncate">
                          <div>Invoice WhatsApp</div>
                          <div className="text-[10px] font-normal opacity-75">Pengingat santun</div>
                        </div>
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        type="button"
                        onClick={() => setNewActionType('negotiation')}
                        className={`p-2.5 rounded-xl text-xs font-bold border text-left flex items-center gap-2 cursor-pointer transition-all ${
                          newActionType === 'negotiation'
                            ? 'bg-amber-50 text-amber-950 border-amber-400 ring-1 ring-amber-400/30'
                            : 'bg-white text-neutral-600 border-neutral-200 hover:bg-neutral-50'
                        }`}
                      >
                        <MessageSquare className="h-4 w-4 text-amber-600 shrink-0" />
                        <div className="truncate">
                          <div>Draf DP 50% Supplier</div>
                          <div className="text-[10px] font-normal opacity-75">Negosiasi tempo 30H</div>
                        </div>
                      </button>

                      <button
                        type="button"
                        onClick={() => setNewActionType('none')}
                        className={`p-2.5 rounded-xl text-xs font-bold border text-left flex items-center gap-2 cursor-pointer transition-all ${
                          newActionType === 'none'
                            ? 'bg-neutral-100 text-neutral-950 border-neutral-400 ring-1 ring-neutral-400/30'
                            : 'bg-white text-neutral-600 border-neutral-200 hover:bg-neutral-50'
                        }`}
                      >
                        <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                        <div className="truncate">
                          <div>Otomatis Terjadwal</div>
                          <div className="text-[10px] font-normal opacity-75">Tanpa aksi WhatsApp</div>
                        </div>
                      </button>
                    </>
                  )}
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="pt-3 border-t border-neutral-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-neutral-600 hover:text-neutral-950 hover:bg-neutral-100 transition-colors cursor-pointer"
                >
                  Batal
                </button>

                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-bold bg-neutral-950 hover:bg-neutral-850 text-white transition-all shadow-xs cursor-pointer active:scale-[0.98]"
                >
                  Simpan ke Agenda Arus Kas
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

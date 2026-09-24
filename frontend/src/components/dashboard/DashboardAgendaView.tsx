import React, { useState } from 'react';
import {
  Calendar,
  ArrowDownLeft,
  ArrowUpRight,
  AlertCircle,
  CheckCircle2,
  MessageSquare,
  QrCode,
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

  const events: CashEvent[] = [
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
        text: `Selamat siang Bapak/Ibu ${evt.party}, salam sukses selalu 🙏\n\nTerkait tagihan bahan baku *${evt.title}* senilai *Rp ${evt.amount.toLocaleString('id-ID')}*, kami bermaksud mengajukan skema pelunasan bertahap (DP 50% hari ini, sisa tempo 30 hari) agar aliran kas operasional tetap sehat.\n\nApakah memungkinkan untuk dibantu skema tersebut Pak/Bu? Terima kasih banyak atas dukungannya! 🙏`,
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
      <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
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

        {/* Aggregate Cashflow Pills */}
        <div className="flex items-center gap-2 bg-slate-50 p-2 rounded-xl border border-slate-200/80 text-xs">
          <div className="px-2">
            <span className="text-[10px] text-slate-400 block font-medium">Total Masuk:</span>
            <span className="font-bold text-emerald-700 tabular-nums">
              +Rp {totalInflow.toLocaleString('id-ID')}
            </span>
          </div>
          <div className="h-6 w-px bg-slate-200" />
          <div className="px-2">
            <span className="text-[10px] text-slate-400 block font-medium">Total Keluar:</span>
            <span className="font-bold text-slate-900 tabular-nums">
              -Rp {totalOutflow.toLocaleString('id-ID')}
            </span>
          </div>
          <div className="h-6 w-px bg-slate-200" />
          <div className="px-2">
            <span className="text-[10px] text-slate-400 block font-medium">Netto Kas:</span>
            <span className={`font-bold tabular-nums ${netCashflow >= 0 ? 'text-emerald-700' : 'text-rose-600'}`}>
              {netCashflow >= 0 ? '+Rp ' : '-Rp '}
              {Math.abs(netCashflow).toLocaleString('id-ID')}
            </span>
          </div>
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
            <span>Piutang Masuk (+Inflow)</span>
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
            <span>Kewajiban Keluar (-Outflow)</span>
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
              className={`p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-colors ${
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

              {/* Right Action & Nominal */}
              <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-4 shrink-0">
                <div className="text-left sm:text-right">
                  <div
                    className={`text-sm sm:text-base font-extrabold tabular-nums ${
                      evt.type === 'inflow' ? 'text-emerald-700' : 'text-slate-950'
                    }`}
                  >
                    {evt.type === 'inflow' ? '+Rp ' : '-Rp '}
                    {evt.amount.toLocaleString('id-ID')}
                  </div>
                  <div className="text-[10.5px] text-slate-400 font-medium">
                    Status: <strong className="text-slate-700">{evt.status}</strong>
                  </div>
                </div>

                {evt.actionText ? (
                  <button
                    onClick={() => handleAction(evt)}
                    className={`inline-flex items-center gap-1.5 h-8 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-2xs active:scale-95 ${
                      evt.actionType === 'qris'
                        ? 'bg-emerald-950 hover:bg-emerald-900 text-white'
                        : 'border border-slate-200 bg-white hover:bg-slate-100 text-slate-800'
                    }`}
                  >
                    {evt.actionType === 'qris' ? (
                      <QrCode className="h-3.5 w-3.5 text-emerald-400" />
                    ) : (
                      <MessageSquare className="h-3.5 w-3.5 text-slate-600" />
                    )}
                    <span>{evt.actionText}</span>
                  </button>
                ) : (
                  <div className="h-8 w-8 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-400">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

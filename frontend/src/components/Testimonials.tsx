import React from 'react';
import { Quote } from 'lucide-react';

export const Testimonials: React.FC = () => {
  const testimonials = [
    {
      quote: "Kami hampir menghabiskan 14 juta untuk mesin kopi baru karena saldo bank kelihatan cukup. JagaUsaha langsung memperingatkan ada tagihan gaji 3 barista 6 hari lagi. Kalau nekat beli, kas kami minus 3 juta.",
      name: "Arif Wicaksono",
      role: "Owner, Kopi Teras Barokah",
      location: "Tebet, Jakarta Selatan",
      initial: "A"
    },
    {
      quote: "Duit Dingin bikin saya sadar kalau omset harian bukan keuntungan bersih. Sekarang saya tahu persis berapa yang boleh diambil untuk belanja dapur tanpa takut gagal bayar tempo ayam dan minyak goreng.",
      name: "Ratna Sari",
      role: "Pemilik, Ayam Geprek Berkah",
      location: "Serang, Banten",
      initial: "R"
    },
    {
      quote: "Menagih piutang ke pelanggan katering kantor selalu serba salah. Fitur Kolektor Bon Santun membuat pesan pengingat yang sangat sopan lengkap dengan QRIS langsung. 80% piutang cair tepat waktu.",
      name: "Budi Prasetyo",
      role: "Pengelola, Katering Barokah",
      location: "Ciputat, Tangerang Selatan",
      initial: "B"
    }
  ];

  return (
    <section className="py-16 sm:py-24 border-t border-neutral-200/80 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-12">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-100 text-xs font-semibold uppercase tracking-wider text-neutral-600">
            Dampak Nyata
          </div>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-[-0.02em] text-neutral-950">
            Apa kata pemilik usaha tentang JagaUsaha
          </h2>
          <p className="text-sm sm:text-base text-neutral-600">
            Membantu UMKM Indonesia bertransisi dari tebak-tebakan intuisi ke kepastian arus kas.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="rounded-3xl border border-neutral-200/80 bg-neutral-50/60 p-7 shadow-sm flex flex-col justify-between hover:bg-white hover:shadow-md transition-all"
            >
              <div className="space-y-4">
                <Quote className="h-6 w-6 text-neutral-300" />
                <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed italic">
                  “{t.quote}”
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-neutral-200/60 flex items-center gap-3">
                <div className="h-9 w-9 rounded-full bg-neutral-900 text-white flex items-center justify-center font-bold text-xs shrink-0">
                  {t.initial}
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-neutral-950">{t.name}</h4>
                  <p className="text-[11px] text-neutral-500">{t.role}</p>
                  <p className="text-[10px] text-neutral-400">{t.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

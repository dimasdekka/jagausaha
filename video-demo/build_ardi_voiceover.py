import subprocess
import os
import json
import re

audio_dir = "C:/Users/Unicodes/Documents/Developments/Project/JagaUsaha/video-demo/public/audio"
edge_tts_bin = "C:/Users/Unicodes/AppData/Local/hermes/hermes-agent/venv/Scripts/edge-tts.exe"

# 5 High-Energy, Excited, Authentic Founder Scripts (Ardi Voice)
# Rate: +5%, Pitch: +4Hz, Passionate Hackathon Pitch Delivery
# Uses voice_text (natural Indonesian phonetic transliteration for English words)
# and display_text (clean formal typography for subtitles)
scripts = [
    {
        "id": "act1",
        "title": "Hook & Problem",
        "display_text": (
            "Halo rekan-rekan, dan seluruh dewan juri yang terhormat di IDwebhost AI Competition 2026! "
            "Pernah nggak Anda melihat... sebuah kedai kopi yang super ramai pembeli, saldo kas di rekening BCA-nya terlihat belasan juta di awal bulan, "
            "tapi seminggu kemudian... sang pemilik panik luar biasa karena terancam gagal bayar gaji barista atau sewa ruko? "
            "Nah, ini fakta mengejutkan! Menurut data resmi Kementerian Koperasi dan UKM, delapan puluh dua persen kegagalan usaha kecil bukan karena sepi pelanggan... "
            "melainkan karena terjebak ilusi saldo kas operasional! Pemilik merasa uangnya masih banyak, lalu tergiur belanja modal di awal bulan... "
            "tanpa memperhitungkan komitmen jatuh tempo minggu depan! "
            "Untuk itulah, kami hadirkan solusi revolusioner: JagaUsaha! "
            "Autonomous Financial Guardian yang bekerja secara proaktif melindungi likuiditas kas UMKM sebelum krisis terjadi! "
            "Seluruh platform canggih ini di-hosting di CloudBaik Cloud VPS dan ditenagai layanan AI Hosting unggulan dari IDwebhost! "
            "Yuk, langsung saja kita lihat bagaimana sistem cerdas ini beraksi!"
        ),
        "voice_text": (
            "Halo rekan-rekan, dan seluruh dewan juri yang terhormat di IDwebhost E-Ai Kompetisyen 2026! "
            "Pernah nggak Anda melihat... sebuah kedai kopi yang super ramai pembeli, saldo kas di rekening BCA-nya terlihat belasan juta di awal bulan, "
            "tapi seminggu kemudian... sang pemilik panik luar biasa karena terancam gagal bayar gaji barista atau sewa ruko? "
            "Nah, ini fakta mengejutkan! Menurut data resmi Kementerian Koperasi dan UKM, delapan puluh dua persen kegagalan usaha kecil bukan karena sepi pelanggan... "
            "melainkan karena terjebak ilusi saldo kas operasional! Pemilik merasa uangnya masih banyak, lalu tergiur belanja modal di awal bulan... "
            "tanpa memperhitungkan komitmen jatuh tempo minggu depan! "
            "Untuk itulah, kami hadirkan solusi revolusioner: JagaUsaha! "
            "Otonomus Finensyel Gardian yang bekerja secara proaktif melindungi likuiditas kas UMKM sebelum krisis terjadi! "
            "Seluruh platform canggih ini di-hosting di Klaud-Baik Klaud Vi-Pi-Es dan ditenagai layanan E-Ai Hosting unggulan dari IDwebhost! "
            "Yuk, langsung saja kita lihat bagaimana sistem cerdas ini beraksi!"
        )
    },
    {
        "id": "act2",
        "title": "VPS & AI Architecture",
        "display_text": (
            "Sekarang, mari kita masuk ke dashboard dan melihat arsitektur kecerdasan buatan luar biasa yang berjalan di balik layar! "
            "Di menu Log Sensor dan AI Guardian ini, terdapat tiga agen otonom yang berkolaborasi tanpa henti! "
            "Pertama, Sensor Agent... yang membaca mutasi rekening dan transaksi kasir secara otomatis! "
            "Kedua, Simulator Agent... berbasis formula matematika deterministik DLMM dengan tingkat halusinasi nol persen! "
            "Dan ketiga, Advisor Agent... yang siap merumuskan intervensi taktis melalui WhatsApp! "
            "Nah, perhatikan layar terminal SSH langsung ini! "
            "Melalui koneksi aman port empat empat dua dua ke server CloudBaik Cloud VPS dengan alamat IP 103.30.146.174... "
            "layanan jagausaha.service aktif berjalan luar biasa stabil dengan konsumsi memori super efisien! "
            "Ditenagai spesifikasi tangguh empat Core CPU AMD EPYC, empat gigabyte RAM, dan penyimpanan secepat kilat NVMe SSD di data center lokal Indonesia... "
            "layanan AI Hosting IDwebhost memberikan latensi mendekati nol dan keandalan maksimal! "
            "Seluruh mesin otonom ini diorkestrasikan oleh Hermes Agent untuk menjamin privasi penuh dan keamanan data finansial UMKM!"
        ),
        "voice_text": (
            "Sekarang, mari kita masuk ke desh-bord dan melihat arsitektur kecerdasan buatan luar biasa yang berjalan di balik layar! "
            "Di menu Log Sensor dan E-Ai Guardian ini, terdapat tiga agen otonom yang berkolaborasi tanpa henti! "
            "Pertama, Sensor E-jen... yang membaca mutasi rekening dan transaksi kasir secara otomatis! "
            "Kedua, Simulator E-jen... berbasis formula matematika deterministik De-El-Em-Em dengan tingkat halusinasi nol persen! "
            "Dan ketiga, Advaisor E-jen... yang siap merumuskan intervensi taktis melalui Wats-Ap! "
            "Nah, perhatikan layar terminal Es-Es-Ha langsung ini! "
            "Melalui koneksi aman port empat empat dua dua ke server Klaud-Baik Klaud Vi-Pi-Es dengan alamat IP 103.30.146.174... "
            "layanan jagausaha.service aktif berjalan luar biasa stabil dengan konsumsi memori super efisien! "
            "Ditenagai spesifikasi tangguh empat Kor Si-Pi-Yu AMD EPYC, empat gigabait Rem, dan penyimpanan secepat kilat En-Vi-Em-I Es-Es-Di di data center lokal Indonesia... "
            "layanan E-Ai Hosting IDwebhost memberikan latensi mendekati nol dan keandalan maksimal! "
            "Seluruh mesin otonom ini diorkestrasikan oleh Hermes E-jen untuk menjamin privasi penuh dan keamanan data finansial UMKM!"
        )
    },
    {
        "id": "act3",
        "title": "Multi-Modal Ingest & Digital Twin",
        "display_text": (
            "Salah satu kendala terbesar UMKM dalam menggunakan aplikasi keuangan adalah proses input manual yang ribet dan bikin malas! "
            "Tapi di JagaUsaha, kami memecahkan masalah ini dengan solusi satu pintu: Unified Multi-Modal Onboarding! "
            "Cukup satu klik tombol Input Data Usaha! Pemilik usaha bisa langsung mengunggah e-Statement rekening koran BCA dalam format PDF... "
            "laporan kasir POS Moka dalam format Excel... atau bahkan cukup merekam catatan suara santai! "
            "Sensor cerdas kami langsung mengekstrak seluruh data transaksi secara otomatis tanpa perlu diketik manual sedikit pun! Keren banget, kan? "
            "Perhatikan panel Digital Twin di sisi kanan yang langsung terisi sempurna secara instan! "
            "Saldo kas riil terdeteksi delapan belas koma lima juta rupiah... cadangan kas darurat aman tiga juta rupiah... "
            "komitmen gaji barista tujuh koma lima juta rupiah pada tanggal tiga puluh... serta sewa ruko empat koma dua juta rupiah! "
            "Setelah tersimpan, sistem langsung memetakan parameter ini ke dashboard dan menghitung Duit Dingin Aman sebesar tiga koma delapan juta rupiah! "
            "Pemilik usaha kini tahu persis berapa uang yang benar-benar aman untuk dibelanjakan tanpa menyentuh dana operasional!"
        ),
        "voice_text": (
            "Salah satu kendala terbesar UMKM dalam menggunakan aplikasi keuangan adalah proses input manual yang ribet dan bikin malas! "
            "Tapi di JagaUsaha, kami memecahkan masalah ini dengan solusi satu pintu: Yunifaid Multi-Modal On-bording! "
            "Cukup satu klik tombol Input Data Usaha! Pemilik usaha bisa langsung mengunggah i-stet-men rekening koran BCA dalam format PDF... "
            "laporan kasir POS Moka dalam format Excel... atau bahkan cukup merekam catatan suara santai! "
            "Sensor cerdas kami langsung mengekstrak seluruh data transaksi secara otomatis tanpa perlu diketik manual sedikit pun! Keren banget, kan? "
            "Perhatikan panel Dijital Twin di sisi kanan yang langsung terisi sempurna secara instan! "
            "Saldo kas riil terdeteksi delapan belas koma lima juta rupiah... cadangan kas darurat aman tiga juta rupiah... "
            "komitmen gaji barista tujuh koma lima juta rupiah pada tanggal tiga puluh... serta sewa ruko empat koma dua juta rupiah! "
            "Setelah tersimpan, sistem langsung memetakan parameter ini ke desh-bord dan menghitung Duit Dingin Aman sebesar tiga koma delapan juta rupiah! "
            "Pemilik usaha kini tahu persis berapa uang yang benar-benar aman untuk dibelanjakan tanpa menyentuh dana operasional!"
        )
    },
    {
        "id": "act4",
        "title": "Decision Studio & Deficit Detection",
        "display_text": (
            "Nah, sekarang mari kita uji fitur paling spektakuler: Sandbox Simulasi Keputusan Kas! "
            "Bayangkan pemilik kedai Kopi Teras Barokah melihat saldo BCA delapan belas juta rupiah... "
            "lalu tergiur membeli mesin espresso komersial baru seharga empat belas juta rupiah secara tunai! "
            "Pengguna cukup berbicara santai dengan antarmuka suara interaktif VoiceBeam: "
            "Beli mesin espresso empat belas juta tunai aman nggak buat gajian barista minggu depan? "
            "Begitu disimulasikan, mesin deterministik DLMM FastMath langsung membunyikan alarm bahaya! "
            "Lihatlah kurva proyeksi arus kas yang menukik tajam ke bawah garis nol rupiah! "
            "Sistem secara presisi mendeteksi bahwa pada hari ke-enam saat tanggal gajian barista tiba... "
            "kas operasional toko akan mengalami defisit parah hingga minus tiga koma tiga juta rupiah! "
            "Luar biasanya, JagaUsaha tidak cuma memperingatkan... tapi langsung memberikan tombol mitigasi preskriptif: Terapkan DP lima puluh persen atau tujuh juta rupiah! "
            "Begitu tombol diklik, kurva kas seketika pulih melesat kembali ke zona hijau yang aman dengan ketahanan kas yang prima!"
        ),
        "voice_text": (
            "Nah, sekarang mari kita uji fitur paling spektakuler: Saend-boks Simulasi Keputusan Kas! "
            "Bayangkan pemilik kedai Kopi Teras Barokah melihat saldo BCA delapan belas juta rupiah... "
            "lalu tergiur membeli mesin espresso komersial baru seharga empat belas juta rupiah secara tunai! "
            "Pengguna cukup berbicara santai dengan antarmuka suara interaktif Vois-Bim: "
            "Beli mesin espresso empat belas juta tunai aman nggak buat gajian barista minggu depan? "
            "Begitu disimulasikan, mesin deterministik De-El-Em-Em Fas-Maet langsung membunyikan alarm bahaya! "
            "Lihatlah kurva proyeksi arus kas yang menukik tajam ke bawah garis nol rupiah! "
            "Sistem secara presisi mendeteksi bahwa pada hari ke-enam saat tanggal gajian barista tiba... "
            "kas operasional toko akan mengalami defisit parah hingga minus tiga koma tiga juta rupiah! "
            "Luar biasanya, JagaUsaha tidak cuma memperingatkan... tapi langsung memberikan tombol mitigasi preskriptif: Terapkan DP lima puluh persen atau tujuh juta rupiah! "
            "Begitu tombol diklik, kurva kas seketika pulih melesat kembali ke zona hijau yang aman dengan ketahanan kas yang prima!"
        )
    },
    {
        "id": "act5",
        "title": "WhatsApp Negotiation & Closing",
        "display_text": (
            "Setelah keputusan diambil, JagaUsaha langsung membantu eksekusi di lapangan melalui generator negosiasi WhatsApp! "
            "Cukup satu klik tombol Draf WhatsApp! Sistem otomatis meracik draf pesan bisnis formal yang sangat santun, cerdas, dan persuasif! "
            "Pesan ini mengajukan termin pembayaran DP lima puluh persen hari ini dan pelunasan tempo tiga puluh hari ke depan... "
            "lengkap dengan argumen budgeting kas operasional toko yang membuat supplier mesin merasa dihargai dan aman! "
            "Pengguna tinggal menyalin pesan dan mengirimkannya langsung ke vendor! Praktis dan solutif! "
            "Bapak, Ibu, dan dewan juri sekalian... JagaUsaha membuktikan bagaimana perpaduan kecerdasan buatan otonom, "
            "antarmuka bersih dan modern, serta infrastruktur tangguh dari AI Hosting IDwebhost serta CloudBaik Cloud VPS... "
            "mampu memberikan benteng perlindungan nyata bagi jutaan UMKM Indonesia! "
            "Jangan ragu untuk mencoba langsung live demo aplikasi kami di 103.30.146.174 port delapan ribu! "
            "Terima kasih sebesar-besarnya kepada IDwebhost dan CloudBaik atas terselenggaranya kompetisi luar biasa ini! "
            "JagaUsaha... jaga kas usaha Anda sebelum krisis menyapa!"
        ),
        "voice_text": (
            "Setelah keputusan diambil, JagaUsaha langsung membantu eksekusi di lapangan melalui generator negosiasi Wats-Ap! "
            "Cukup satu klik tombol Draf Wats-Ap! Sistem otomatis meracik draf pesan bisnis formal yang sangat santun, cerdas, dan persuasif! "
            "Pesan ini mengajukan termin pembayaran DP lima puluh persen hari ini dan pelunasan tempo tiga puluh hari ke depan... "
            "lengkap dengan argumen budgeting kas operasional toko yang membuat suplayer mesin merasa dihargai dan aman! "
            "Pengguna tinggal menyalin pesan dan mengirimkannya langsung ke vendor! Praktis dan solutif! "
            "Bapak, Ibu, dan dewan juri sekalian... JagaUsaha membuktikan bagaimana perpaduan kecerdasan buatan otonom, "
            "antarmuka bersih dan modern, serta infrastruktur tangguh dari E-Ai Hosting IDwebhost serta Klaud-Baik Klaud Vi-Pi-Es... "
            "mampu memberikan benteng perlindungan nyata bagi jutaan UMKM Indonesia! "
            "Jangan ragu untuk mencoba langsung laif demo aplikasi kami di 103.30.146.174 port delapan ribu! "
            "Terima kasih sebesar-besarnya kepada IDwebhost dan Klaud-Baik atas terselenggaranya kompetisi luar biasa ini! "
            "JagaUsaha... jaga kas usaha Anda sebelum krisis menyapa!"
        )
    }
]

print(">>> [1/5] Generating EXCITED voiceover tracks with Ardi (id-ID-ArdiNeural, +5% Rate, +4Hz Pitch)...")
generated_audios = []
generated_vtts = []

voice_name = "id-ID-ArdiNeural"

for s in scripts:
    mp3_path = os.path.join(audio_dir, f"{s['id']}_ardi_voice.mp3")
    vtt_path = os.path.join(audio_dir, f"{s['id']}_ardi_sub.vtt")
    
    cmd = [
        edge_tts_bin,
        "--voice", voice_name,
        "--rate=+5%",
        "--pitch=+4Hz",
        "--text", s.get("voice_text", s.get("display_text", s.get("text"))),
        "--write-media", mp3_path,
        "--write-subtitles", vtt_path
    ]
    subprocess.run(cmd, check=True)
    generated_audios.append(mp3_path)
    generated_vtts.append(vtt_path)
    print(f"  + Generated Excited {s['id']}: {mp3_path}")

print(">>> [2/5] Parsing subtitles and building continuous master SRT...")
master_srt_path = os.path.join(audio_dir, "master_subtitles.srt")

# Clean phonetic tokens back to formal typography for on-screen subtitles
PHONETIC_CLEANUP = [
    ("E-Ai Kompetisyen", "AI Competition"),
    ("Otonomus Finensyel Gardian", "Autonomous Financial Guardian"),
    ("Klaud-Baik Klaud Vi-Pi-Es", "CloudBaik Cloud VPS"),
    ("Klaud Vi-Pi-Es", "Cloud VPS"),
    ("E-Ai Hosting", "AI Hosting"),
    ("E-Ai Guardian", "AI Guardian"),
    ("desh-bord", "dashboard"),
    ("Desh-bord", "dashboard"),
    ("Sensor E-jen", "Sensor Agent"),
    ("Simulator E-jen", "Simulator Agent"),
    ("Advaisor E-jen", "Advisor Agent"),
    ("Hermes E-jen", "Hermes Agent"),
    ("Es-Es-Ha", "SSH"),
    ("De-El-Em-Em", "DLMM"),
    ("Kor Si-Pi-Yu", "Core CPU"),
    ("gigabait Rem", "gigabyte RAM"),
    ("En-Vi-Em-I Es-Es-Di", "NVMe SSD"),
    ("Yunifaid Multi-Modal On-bording", "Unified Multi-Modal Onboarding"),
    ("i-stet-men", "e-Statement"),
    ("Dijital Twin", "Digital Twin"),
    ("Saend-boks", "Sandbox"),
    ("Vois-Bim", "VoiceBeam"),
    ("Fas-Maet", "FastMath"),
    ("Wats-Ap", "WhatsApp"),
    ("suplayer", "supplier"),
    ("laif demo", "live demo"),
]

def clean_sub_text(text):
    for phon, formal in PHONETIC_CLEANUP:
        text = text.replace(phon, formal)
    return text

def parse_vtt_timestamp(ts_str):
    ts_str = ts_str.strip().replace(',', '.')
    parts = ts_str.split(':')
    if len(parts) == 3:
        h = int(parts[0])
        m = int(parts[1])
        s_parts = parts[2].split('.')
        s = int(s_parts[0])
        ms = int(s_parts[1])
        return h * 3600 + m * 60 + s + ms / 1000.0
    elif len(parts) == 2:
        m = int(parts[0])
        s_parts = parts[1].split('.')
        s = int(s_parts[0])
        ms = int(s_parts[1])
        return m * 60 + s + ms / 1000.0
    return 0.0

def format_srt_timestamp(seconds):
    h = int(seconds // 3600)
    m = int((seconds % 3600) // 60)
    s = int(seconds % 60)
    ms = int(round((seconds - int(seconds)) * 1000))
    return f"{h:02d}:{m:02d}:{s:02d},{ms:03d}"

master_subtitles = []
act_durations = []
current_offset = 0.0

for i, (mp3, vtt) in enumerate(zip(generated_audios, generated_vtts)):
    probe_cmd = ['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'json', mp3]
    res = json.loads(subprocess.check_output(probe_cmd))
    duration = float(res['format']['duration'])
    act_durations.append(duration)
    
    with open(vtt, 'r', encoding='utf-8') as f:
        lines = f.readlines()
    
    line_idx = 0
    while line_idx < len(lines):
        line = lines[line_idx].strip()
        if '-->' in line:
            start_str, end_str = [x.strip() for x in line.split('-->')]
            start_sec = parse_vtt_timestamp(start_str) + current_offset
            end_sec = parse_vtt_timestamp(end_str) + current_offset
            line_idx += 1
            text_lines = []
            while line_idx < len(lines) and lines[line_idx].strip():
                text_lines.append(lines[line_idx].strip())
                line_idx += 1
            
            sub_text = clean_sub_text(" ".join(text_lines))
            if sub_text:
                master_subtitles.append((start_sec, end_sec, sub_text))
        line_idx += 1
    
    current_offset += duration

with open(master_srt_path, 'w', encoding='utf-8') as f:
    for idx, (st, et, text) in enumerate(master_subtitles, 1):
        f.write(f"{idx}\n")
        f.write(f"{format_srt_timestamp(st)} --> {format_srt_timestamp(et)}\n")
        f.write(f"{text}\n\n")

print(f"Master SRT written: {len(master_subtitles)} cues. Total duration: {current_offset:.2f}s ({current_offset/60:.2f} min)")

print(">>> [3/5] Generating kineticSubtitles.ts for Remotion word-by-word highlight...")
def time_to_sec(t_str):
    h, m, rest = t_str.split(':')
    s, ms = rest.split(',')
    return int(h) * 3600 + int(m) * 60 + int(s) + int(ms) / 1000.0

chunked_phrases = []
for idx, (start_sec, end_sec, text_line) in enumerate(master_subtitles):
    duration = end_sec - start_sec
    words = text_line.split()
    if not words:
        continue
    chunk_size = 4
    if len(words) <= 5:
        chunks = [words]
    else:
        chunks = []
        for j in range(0, len(words), chunk_size):
            chunk = words[j:j+chunk_size]
            if len(chunk) == 1 and len(chunks) > 0:
                chunks[-1].extend(chunk)
            else:
                chunks.append(chunk)
    total_words = sum(len(c) for c in chunks)
    cur_start = start_sec
    for chunk in chunks:
        chunk_ratio = len(chunk) / total_words
        chunk_dur = duration * chunk_ratio
        cur_end = cur_start + chunk_dur
        word_list = []
        w_dur = chunk_dur / len(chunk)
        for w_idx, w in enumerate(chunk):
            w_start = cur_start + w_idx * w_dur
            w_end = w_start + w_dur
            word_list.append({
                "word": w,
                "startFrame": round(w_start * 30),
                "endFrame": round(w_end * 30)
            })
        chunked_phrases.append({
            "text": ' '.join(chunk),
            "startFrame": round(cur_start * 30),
            "endFrame": round(cur_end * 30),
            "words": word_list
        })
        cur_start = cur_end

ts_output_path = "C:/Users/Unicodes/Documents/Developments/Project/JagaUsaha/video-demo/src/data/kineticSubtitles.ts"
with open(ts_output_path, 'w', encoding='utf-8') as f:
    f.write("// Auto-generated kinetic word-by-word subtitle timings for Ardi voice\n")
    f.write("export interface WordTiming {\n")
    f.write("  word: string;\n")
    f.write("  startFrame: number;\n")
    f.write("  endFrame: number;\n")
    f.write("}\n\n")
    f.write("export interface SubtitleCue {\n")
    f.write("  text: string;\n")
    f.write("  startFrame: number;\n")
    f.write("  endFrame: number;\n")
    f.write("  words: WordTiming[];\n")
    f.write("}\n\n")
    f.write("export const KINETIC_SUBTITLES: SubtitleCue[] = ")
    json.dump(chunked_phrases, f, indent=2, ensure_ascii=False)
    f.write(";\n")
print(f"Kinetic subtitles TS written: {len(chunked_phrases)} phrases.")

print(">>> [4/5] Concatenating Ardi vocal tracks...")
concat_list = os.path.join(audio_dir, "concat_ardi_voice_list.txt")
with open(concat_list, 'w') as f:
    for a in generated_audios:
        f.write(f"file '{a}'\n")

raw_voice = os.path.join(audio_dir, "raw_concatenated_ardi_voice.mp3")
subprocess.run(['ffmpeg', '-y', '-f', 'concat', '-safe', '0', '-i', concat_list, '-c', 'copy', raw_voice], check=True)

print(">>> [5/5] Mastering vocals with broadcast EQ, warmth, compression, and ambient bed...")
ambient_wav = os.path.join(audio_dir, "ambient_bed.wav")
final_master_mp3 = os.path.join(audio_dir, "engaging_master_voiceover.mp3")

# Excited Broadcast vocal mastering chain:
# highpass 80Hz -> warm presence 300Hz (+2.0dB) -> clarity & excitement 3500Hz (+2.5dB) -> punchy compressor -> loudnorm
mix_cmd = [
    'ffmpeg', '-y',
    '-i', raw_voice,
    '-i', ambient_wav,
    '-filter_complex', (
        "[0:a]highpass=f=80,equalizer=f=300:t=q:w=1.2:g=2.0,equalizer=f=3500:t=q:w=1.5:g=2.5,"
        "acompressor=threshold=-14dB:ratio=3:attack=8:release=50:makeup=3[vocal];"
        "[1:a]volume=0.055[music];"
        "[vocal][music]amix=inputs=2:duration=first:dropout_transition=2,"
        "loudnorm=I=-15:TP=-1.0:LRA=6[out]"
    ),
    '-map', '[out]',
    '-c:a', 'libmp3lame',
    '-b:a', '192k',
    final_master_mp3
]
subprocess.run(mix_cmd, check=True)

print("\n================ ACT TIMINGS & FRAME ALLOCATION ================")
total_frames = 0
for i, d in enumerate(act_durations, 1):
    f_count = round(d * 30)
    total_frames += f_count
    print(f"Act {i}: {d:.2f}s -> {f_count} frames")
print(f"Total: {current_offset:.2f}s -> {total_frames} frames (Target video duration)")
print(f"Master Audio Written: {final_master_mp3}")
print("=================================================================\n")

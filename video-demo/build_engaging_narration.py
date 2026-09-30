import subprocess
import os
import json

audio_dir = "C:/Users/Unicodes/Documents/Developments/Project/JagaUsaha/video-demo/public/audio"
edge_tts_bin = "C:/Users/Unicodes/AppData/Local/hermes/hermes-agent/venv/Scripts/edge-tts.exe"

# 5 Conversational, Lively Scripts (Indonesian)
scripts = [
    {
        "id": "act1",
        "title": "Hook & Problem",
        "text": (
            "Halo Bapak, Ibu, dan dewan juri IDwebhost AI Competition 2026! "
            "Pernah nggak Anda melihat sebuah kedai kopi yang ramai pembeli, saldo kas rekeningnya terlihat belasan juta, "
            "tapi seminggu kemudian sang pemilik panik luar biasa karena terancam gagal bayar gaji barista atau sewa ruko? "
            "Nah, menurut data Kementerian Koperasi dan UKM, delapan puluh dua persen kegagalan usaha kecil bukan karena sepi pelanggan, "
            "melainkan karena ilusi saldo kas operasional. Pemilik merasa uangnya masih banyak, lalu tergiur belanja modal di awal bulan, "
            "tanpa memperhitungkan komitmen jatuh tempo minggu depan. "
            "Untuk menyelesaikan masalah genting inilah, kami membangun JagaUsaha. "
            "JagaUsaha adalah autonomous financial guardian yang bekerja proaktif melindungi likuiditas kas UMKM sebelum krisis terjadi. "
            "Seluruh platform ini di-hosting di CloudBaik Cloud VPS dan ditenagai layanan AI Hosting dari IDwebhost. "
            "Yuk, kita lihat langsung bagaimana sistem cerdas ini bekerja!"
        )
    },
    {
        "id": "act2",
        "title": "VPS & AI Architecture",
        "text": (
            "Sekarang, mari kita masuk ke dashboard dan melihat arsitektur sistem yang berjalan di balik layar. "
            "Di menu Log Sensor & AI Guardian ini, terdapat tiga agen otonom yang bekerja tanpa henti. "
            "Pertama, Sensor Agent yang membaca mutasi rekening dan transaksi kasir. "
            "Kedua, Simulator Agent berbasis formula matematika deterministik DLMM dengan tingkat halusinasi nol persen. "
            "Dan ketiga, Advisor Agent yang merumuskan intervensi taktis melalui WhatsApp. "
            "Perhatikan layar terminal SSH langsung ini. "
            "Melalui koneksi aman port empat empat dua dua ke server CloudBaik Cloud VPS beralamat IP 103.30.146.174, "
            "layanan jagausaha.service aktif berjalan stabil dengan konsumsi memori yang sangat efisien. "
            "Didukung spesifikasi empat Core CPU AMD EPYC, empat gigabyte RAM, dan penyimpanan cepat SSD di data center lokal Indonesia, "
            "layanan AI Hosting IDwebhost memberikan latensi yang sangat rendah dan keandalan tinggi. "
            "Mesin autonomous ini diorkestrasikan oleh Hermes Agent untuk menjamin keamanan dan privasi data finansial UMKM."
        )
    },
    {
        "id": "act3",
        "title": "Multi-Modal Ingest & Digital Twin",
        "text": (
            "Salah satu kendala terbesar UMKM dalam menggunakan aplikasi finansial adalah proses input manual yang ribet. "
            "Di JagaUsaha, kami menghadirkan solusi satu pintu: Unified Multi-Modal Onboarding. "
            "Cukup klik tombol Input Data Usaha. Di sini, pemilik usaha cukup mengunggah e-Statement rekening koran BCA dalam format PDF, "
            "laporan kasir POS Moka dalam format Excel, atau rekaman catatan suara santai. "
            "Sensor cerdas kami langsung mengekstrak seluruh data transaksi secara otomatis. "
            "Perhatikan panel Digital Twin di sisi kanan yang langsung terisi sempurna: "
            "saldo kas riil delapan belas koma lima juta rupiah, cadangan kas darurat aman tiga juta rupiah, "
            "komitmen gaji barista tujuh koma lima juta rupiah pada tanggal tiga puluh, serta sewa ruko empat koma dua juta rupiah. "
            "Formula Safe-to-Spend atau Duit Dingin Aman langsung terhitung otomatis sebesar tiga koma delapan juta rupiah. "
            "Semua terjadi instan tanpa pemilik usaha harus mengetik angka satu per satu!"
        )
    },
    {
        "id": "act4",
        "title": "Decision Studio & Deficit Detection",
        "text": (
            "Sekarang, mari kita uji fitur paling krusial: Sandbox Simulasi Keputusan Kas. "
            "Bayangkan sang pemilik kedai Kopi Teras Barokah melihat saldo BCA delapan belas juta rupiah, "
            "lalu tergiur membeli mesin espresso komersial baru seharga empat belas juta rupiah secara tunai. "
            "Pengguna cukup berbicara dengan antarmuka suara interaktif berteknologi VoiceBeam dari Libraries.dev: "
            "Beli mesin espresso empat belas juta tunai aman nggak buat gajian barista minggu depan? "
            "Begitu disimulasikan, mesin deterministik DLMM FastMath langsung membunyikan alarm bahaya! "
            "Lihat kurva proyeksi arus kas yang anjlok ke zona merah. "
            "Sistem mendeteksi bahwa pada hari ke-enam saat tanggal gajian barista jatuh tempo, "
            "kas operasional toko akan mengalami defisit hingga minus tiga koma tiga juta rupiah! "
            "Hebatnya, JagaUsaha tidak hanya melarang, tapi langsung memberikan tombol solusi: Terapkan DP lima puluh persen atau tujuh juta rupiah. "
            "Begitu tombol diklik, kurva kas seketika pulih dan kembali ke zona hijau yang aman dengan runway positif!"
        )
    },
    {
        "id": "act5",
        "title": "WhatsApp Negotiation & Closing",
        "text": (
            "Setelah keputusan diambil, JagaUsaha membantu eksekusi ke lapangan melalui generator negosiasi WhatsApp. "
            "Cukup klik tombol Draf WhatsApp. Sistem otomatis menyusun draf pesan bisnis formal yang sangat santun dan profesional. "
            "Pesan ini mengajukan termin pembayaran DP lima puluh persen hari ini dan pelunasan tempo tiga puluh hari ke depan, "
            "lengkap dengan alasan budgeting kas operasional toko sehingga menjaga hubungan baik dengan supplier mesin. "
            "Pengguna cukup memilih preset, menyalin pesan dengan satu klik, dan mengirimkannya langsung ke vendor. "
            "Bapak, Ibu, dan dewan juri sekalian, JagaUsaha membuktikan bagaimana integrasi kecerdasan buatan otonom, "
            "antarmuka bersih anti-slop, dan infrastruktur tangguh dari AI Hosting IDwebhost serta CloudBaik Cloud VPS "
            "dapat memberikan perlindungan nyata bagi kelangsungan hidup UMKM Indonesia. "
            "Silakan coba langsung live demo aplikasi kami di alamat 103.30.146.174 port delapan ribu. "
            "Terima kasih banyak kepada IDwebhost dan CloudBaik atas terselenggaranya kompetisi ini. "
            "JagaUsaha, jaga kas usaha Anda sebelum krisis menyapa!"
        )
    }
]

print(">>> [1/4] Generating voiceover tracks and timestamps using edge-tts...")
generated_audios = []
generated_vtts = []

# Voice: id-ID-GadisNeural gives a very lively, natural, friendly, non-robotic tech pitch
voice_name = "id-ID-GadisNeural"

for s in scripts:
    mp3_path = os.path.join(audio_dir, f"{s['id']}_voice.mp3")
    vtt_path = os.path.join(audio_dir, f"{s['id']}_sub.vtt")
    
    cmd = [
        edge_tts_bin,
        "--voice", voice_name,
        "--rate=+4%",
        "--pitch=+1Hz",
        "--text", s["text"],
        "--write-media", mp3_path,
        "--write-subtitles", vtt_path
    ]
    subprocess.run(cmd, check=True)
    generated_audios.append(mp3_path)
    generated_vtts.append(vtt_path)
    print(f"  + Generated {s['id']}: {mp3_path}")

print(">>> [2/4] Parsing subtitles and building continuous master SRT...")
master_srt_path = os.path.join(audio_dir, "master_subtitles.srt")

def parse_vtt_timestamp(ts_str):
    # Format: HH:MM:SS.mmm or MM:SS.mmm (handles both , and .)
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
current_offset = 0.0

for i, (mp3, vtt) in enumerate(zip(generated_audios, generated_vtts)):
    # Get audio duration
    probe_cmd = ['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'json', mp3]
    res = json.loads(subprocess.check_output(probe_cmd))
    duration = float(res['format']['duration'])
    
    with open(vtt, 'r', encoding='utf-8') as f:
        lines = f.readlines()
    
    # Simple VTT parser
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
            
            sub_text = " ".join(text_lines)
            if sub_text:
                master_subtitles.append((start_sec, end_sec, sub_text))
        line_idx += 1
    
    current_offset += duration

# Write SRT file
with open(master_srt_path, 'w', encoding='utf-8') as f:
    for idx, (st, et, text) in enumerate(master_subtitles, 1):
        f.write(f"{idx}\n")
        f.write(f"{format_srt_timestamp(st)} --> {format_srt_timestamp(et)}\n")
        f.write(f"{text}\n\n")

print(f"Master subtitles written: {len(master_subtitles)} cues. Total duration: {current_offset:.2f}s ({current_offset/60:.2f} min)")

print(">>> [3/4] Concatenating vocal tracks...")
concat_list = os.path.join(audio_dir, "concat_voice_list.txt")
with open(concat_list, 'w') as f:
    for a in generated_audios:
        f.write(f"file '{a}'\n")

raw_voice = os.path.join(audio_dir, "raw_concatenated_voice.mp3")
subprocess.run(['ffmpeg', '-y', '-f', 'concat', '-safe', '0', '-i', concat_list, '-c', 'copy', raw_voice], check=True)

print(">>> [4/4] Mastering vocals & mixing with ambient music bed...")
ambient_wav = os.path.join(audio_dir, "ambient_bed.wav")
final_master_mp3 = os.path.join(audio_dir, "engaging_master_voiceover.mp3")

# Master chain:
# Vocal: Highpass 80Hz -> Warmth EQ 220Hz (+2.5dB) -> Clarity EQ 3500Hz (+2dB) -> Smooth Compression -> Broadcast Loudnorm
# Ambient Bed: Volume 0.08 (-22dB) with subtle ducking under voice
mix_cmd = [
    'ffmpeg', '-y',
    '-i', raw_voice,
    '-i', ambient_wav,
    '-filter_complex', (
        "[0:a]highpass=f=80,equalizer=f=220:t=q:w=1:g=2.5,equalizer=f=3500:t=q:w=1.2:g=2.2,"
        "acompressor=threshold=-16dB:ratio=2.5:attack=10:release=60:makeup=2.5[vocal];"
        "[1:a]volume=0.075[music];"
        "[vocal][music]amix=inputs=2:duration=first:dropout_transition=2,"
        "loudnorm=I=-16:TP=-1.5:LRA=7[out]"
    ),
    '-map', '[out]',
    '-c:a', 'libmp3lame',
    '-b:a', '192k',
    final_master_mp3
]

subprocess.run(mix_cmd, check=True)
stat = os.stat(final_master_mp3)
print(">>> FINISHED! Master voiceover created successfully!")
print("Path:", final_master_mp3)
print("Size:", round(stat.st_size / (1024*1024), 2), "MB")

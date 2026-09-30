import os
import sys
import json
import base64
import urllib.request
import subprocess

API_KEY = os.environ.get("ELEVENLABS_API_KEY", "")
VOICE_ID = "JBFqnCBsd6RMkjVDRZzb" # George (Warm, mature, distinguished narrator)
MODEL_ID = "eleven_multilingual_v2"

script_dir = os.path.dirname(os.path.abspath(__file__))
audio_dir = os.path.join(script_dir, "public", "audio")
os.makedirs(audio_dir, exist_ok=True)

scripts = [
    {
        "id": "act1",
        "title": "Hook & Problem",
        "text": (
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
        )
    },
    {
        "id": "act2",
        "title": "VPS & AI Architecture",
        "text": (
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
        )
    },
    {
        "id": "act3",
        "title": "Multi-Modal Ingest & Digital Twin",
        "text": (
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
        )
    },
    {
        "id": "act4",
        "title": "Decision Studio & Deficit Detection",
        "text": (
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
        )
    },
    {
        "id": "act5",
        "title": "WhatsApp Negotiation & Closing",
        "text": (
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
        )
    }
]

print(">>> [1/5] Synthesizing Hyper-Realistic Voiceover via ElevenLabs Multilingual v2...")
generated_audios = []
act_words = [] # list of lists of word dicts

for s in scripts:
    act_id = s["id"]
    text = s["text"]
    mp3_path = os.path.join(audio_dir, f"{act_id}_elevenlabs_voice.mp3")
    json_path = os.path.join(audio_dir, f"{act_id}_elevenlabs_align.json")
    
    print(f"  -> Generating {act_id} ({len(text)} chars)...")
    
    url = f"https://api.elevenlabs.io/v1/text-to-speech/{VOICE_ID}/with-timestamps"
    payload = {
        "text": text,
        "model_id": MODEL_ID,
        "voice_settings": {
            "stability": 0.48,
            "similarity_boost": 0.82,
            "style": 0.12,
            "use_speaker_boost": True
        }
    }
    
    data_bytes = json.dumps(payload).encode('utf-8')
    req = urllib.request.Request(
        url,
        data=data_bytes,
        headers={
            "xi-api-key": API_KEY,
            "Content-Type": "application/json"
        }
    )
    
    with urllib.request.urlopen(req) as resp:
        resp_json = json.loads(resp.read().decode('utf-8'))
    
    # Save audio MP3
    audio_bytes = base64.b64decode(resp_json["audio_base64"])
    with open(mp3_path, "wb") as f:
        f.write(audio_bytes)
    
    # Parse character alignment into words
    alignment = resp_json.get("alignment", {})
    chars = alignment.get("characters", [])
    starts = alignment.get("character_start_times_seconds", [])
    ends = alignment.get("character_end_times_seconds", [])
    
    words = []
    cur_chars = []
    cur_start = None
    cur_end = None
    
    for c, st, et in zip(chars, starts, ends):
        if c.isspace():
            if cur_chars:
                words.append({
                    "word": "".join(cur_chars),
                    "start": cur_start,
                    "end": cur_end
                })
                cur_chars = []
                cur_start = None
                cur_end = None
        else:
            if cur_start is None:
                cur_start = st
            cur_end = et
            cur_chars.append(c)
            
    if cur_chars:
        words.append({
            "word": "".join(cur_chars),
            "start": cur_start,
            "end": cur_end
        })
        
    with open(json_path, "w", encoding="utf-8") as f:
        json.dump(words, f, indent=2)
        
    generated_audios.append(mp3_path)
    act_words.append(words)
    print(f"     [OK] {act_id}: {len(words)} words saved to {mp3_path}")

print(">>> [2/5] Building continuous Master SRT & Subtitles...")
master_srt_path = os.path.join(audio_dir, "master_subtitles.srt")

def format_srt_timestamp(seconds):
    h = int(seconds // 3600)
    m = int((seconds % 3600) // 60)
    s = int(seconds % 60)
    ms = int(round((seconds - int(seconds)) * 1000))
    return f"{h:02d}:{m:02d}:{s:02d},{ms:03d}"

master_subtitles = []
act_durations = []
current_offset = 0.0

for i, (mp3, words) in enumerate(zip(generated_audios, act_words)):
    probe_cmd = ['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'json', mp3]
    res = json.loads(subprocess.check_output(probe_cmd))
    duration = float(res['format']['duration'])
    act_durations.append(duration)
    
    # Chunk words into 3-5 word subtitle phrases
    chunk_size = 4
    for j in range(0, len(words), chunk_size):
        chunk = words[j:j+chunk_size]
        if not chunk:
            continue
        phrase_start = chunk[0]["start"] + current_offset
        phrase_end = chunk[-1]["end"] + current_offset
        phrase_text = " ".join(w["word"] for w in chunk)
        master_subtitles.append((phrase_start, phrase_end, phrase_text))
        
    current_offset += duration

with open(master_srt_path, 'w', encoding='utf-8') as f:
    for idx, (st, et, text) in enumerate(master_subtitles, 1):
        f.write(f"{idx}\n")
        f.write(f"{format_srt_timestamp(st)} --> {format_srt_timestamp(et)}\n")
        f.write(f"{text}\n\n")

print(f"Master SRT written: {len(master_subtitles)} cues. Total duration: {current_offset:.2f}s ({current_offset/60:.2f} min)")

print(">>> [3/5] Generating kineticSubtitles.ts for Remotion word-by-word highlight...")
chunked_phrases = []
for idx, (start_sec, end_sec, text_line) in enumerate(master_subtitles):
    duration = end_sec - start_sec
    words = text_line.split()
    if not words:
        continue
    w_dur = duration / len(words)
    word_list = []
    for w_idx, w in enumerate(words):
        w_start = start_sec + w_idx * w_dur
        w_end = w_start + w_dur
        word_list.append({
            "word": w,
            "startFrame": round(w_start * 30),
            "endFrame": round(w_end * 30)
        })
    chunked_phrases.append({
        "phrase": text_line,
        "startFrame": round(start_sec * 30),
        "endFrame": round(end_sec * 30),
        "words": word_list
    })

ts_content = f"""// AUTO-GENERATED from ElevenLabs Master Audio
export interface WordCue {{
  word: string;
  startFrame: number;
  endFrame: number;
}}

export interface SubtitlePhrase {{
  phrase: string;
  startFrame: number;
  endFrame: number;
  words: WordCue[];
}}

export type SubtitleCue = SubtitlePhrase;

export const KINETIC_SUBTITLES: SubtitlePhrase[] = {json.dumps(chunked_phrases, indent=2)};
"""

ts_path = os.path.join(script_dir, "src", "data", "kineticSubtitles.ts")
os.makedirs(os.path.dirname(ts_path), exist_ok=True)
with open(ts_path, 'w', encoding='utf-8') as f:
    f.write(ts_content)
print(f"Kinetic subtitles TS written: {len(chunked_phrases)} phrases to {ts_path}")

print(">>> [4/5] Concatenating ElevenLabs vocal tracks...")
concat_list_path = os.path.join(audio_dir, "concat_elevenlabs_voice_list.txt")
with open(concat_list_path, 'w', encoding='utf-8') as f:
    for a in generated_audios:
        clean_path = a.replace('\\', '/')
        f.write(f"file '{clean_path}'\n")

raw_vocal_path = os.path.join(audio_dir, "raw_concatenated_elevenlabs_voice.mp3")
cmd_concat = [
    'ffmpeg', '-y', '-f', 'concat', '-safe', '0',
    '-i', concat_list_path,
    '-c', 'copy',
    raw_vocal_path
]
subprocess.run(cmd_concat, check=True)

print(">>> [5/5] Studio Broadcast Mastering with FFmpeg & Warm Ambient Bed...")
ambient_bed_path = os.path.join(audio_dir, "ambient_bed.wav")
final_master_path = os.path.join(audio_dir, "engaging_master_voiceover.mp3")

cmd_master = [
    'ffmpeg', '-y',
    '-i', raw_vocal_path,
    '-i', ambient_bed_path,
    '-filter_complex',
    '[0:a]highpass=f=80,equalizer=f=300:t=q:w=1.0:g=2.0,equalizer=f=3500:t=q:w=1.2:g=2.5,acompressor=threshold=-18dB:ratio=3:attack=8:release=120[voice];'
    '[1:a]volume=0.06[bed];'
    '[voice][bed]amix=inputs=2:duration=first:dropout_transition=2[mixed];'
    '[mixed]loudnorm=I=-16:TP=-1.5:LRA=11[out]',
    '-map', '[out]',
    '-c:a', 'libmp3lame',
    '-b:a', '192k',
    final_master_path
]
subprocess.run(cmd_master, check=True)

print("\n================ ACT TIMINGS & FRAME ALLOCATION ================")
total_frames = 0
for i, (s, dur) in enumerate(zip(scripts, act_durations), 1):
    f_count = round(dur * 30)
    total_frames += f_count
    print(f"Act {i} ({s['id']}): {dur:.2f}s -> {f_count} frames")
print(f"Total: {current_offset:.2f}s -> {total_frames} frames (Target video duration)")
print(f"Master Audio Written: {final_master_path}")
print("=================================================================\n")
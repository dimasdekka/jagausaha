import re
import json

def time_to_sec(t_str):
    # '00:01:23,580'
    h, m, rest = t_str.split(':')
    s, ms = rest.split(',')
    return int(h) * 3600 + int(m) * 60 + int(s) + int(ms) / 1000.0

with open('C:/Users/Unicodes/Documents/Developments/Project/JagaUsaha/video-demo/public/audio/master_subtitles.srt', 'r', encoding='utf-8') as f:
    content = f.read().strip()

blocks = content.split('\n\n')
chunked_phrases = []

for block in blocks:
    lines = block.strip().split('\n')
    if len(lines) < 3:
        continue
    time_line = lines[1]
    text_line = ' '.join(lines[2:])
    
    m = re.match(r'(\d+:\d+:\d+,\d+)\s*-->\s*(\d+:\d+:\d+,\d+)', time_line)
    if not m:
        continue
    start_sec = time_to_sec(m.group(1))
    end_sec = time_to_sec(m.group(2))
    duration = end_sec - start_sec
    
    words = text_line.split()
    if not words:
        continue
        
    # Split into chunks of 3 to 5 words
    chunk_size = 4
    if len(words) <= 5:
        chunks = [words]
    else:
        chunks = []
        for i in range(0, len(words), chunk_size):
            chunk = words[i:i+chunk_size]
            # If the last chunk is just 1 word, merge it with previous
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
        
        # Word-level timing inside this chunk
        word_list = []
        w_dur = chunk_dur / len(chunk)
        for idx, w in enumerate(chunk):
            w_start = cur_start + idx * w_dur
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

print(f"Generated {len(chunked_phrases)} kinetic subtitle chunks from 42 cues.")

# Write TypeScript file
out_ts = 'C:/Users/Unicodes/Documents/Developments/Project/JagaUsaha/video-demo/src/data/kineticSubtitles.ts'
ts_content = f"""// Auto-generated kinetic word-by-word subtitle cues (30 FPS)
export interface SubtitleWord {{
  word: string;
  startFrame: number;
  endFrame: number;
}}

export interface SubtitleCue {{
  text: string;
  startFrame: number;
  endFrame: number;
  words: SubtitleWord[];
}}

export const KINETIC_SUBTITLES: SubtitleCue[] = {json.dumps(chunked_phrases, indent=2, ensure_ascii=False)};
"""

with open(out_ts, 'w', encoding='utf-8') as f:
    f.write(ts_content)

print(f"Wrote to {out_ts}")

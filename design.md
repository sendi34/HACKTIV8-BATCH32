# DESIGN.md — TravelBuddy (Chatbot Tanya-Jawab Perjalanan Jauh)

> Dokumen desain tampilan. Fokus: **pengguna bertanya → AI menjawab → pengguna bertanya lagi.**
> Seperti ChatGPT/Gemini versi khusus perjalanan, dengan maskot dan gradien ungu.

## 1. Konsep

TravelBuddy adalah chatbot tanya-jawab tentang perjalanan jauh: rute, lama perjalanan, tempat istirahat, persiapan, dan hal terkait. Pengguna tidak perlu mengisi form, cukup ngobrol.

**Tidak ada (sengaja dihilangkan):**
- Sidebar history
- Daftar perjalanan
- Trip summary permanen
- Dashboard
- Form booking
- Panel biaya
- Panel peta yang selalu tampil

**Prinsip**
1. Sesederhana mungkin: dua layar saja (Welcome dan Percakapan)
2. Input selalu ada di bawah
3. Maskot memberi karakter, tapi tidak menghalangi percakapan
4. Satu desain yang konsisten di mobile dan desktop

### Nama dan Karakter

| Item | Isi |
|---|---|
| Nama | **TravelBuddy** |
| Tagline | "TravelBuddy, teman tanya perjalanan jauh" |
| Karakter | Robot penjelajah yang ramah, semangat, dan ringkas menjawab |
| Sapaan welcome | "Hai, saya TravelBuddy" |
| Gaya bahasa | Bahasa Indonesia santai-sopan, jawaban singkat dan jelas |


## 2. Alur Layar

```
Welcome Screen ──(kirim pesan pertama / tap saran)──► Conversation Screen
                                                          │
                                       ┌──────────────────┘
                                       ▼
                         tanya lagi · tap saran lanjutan
```

## 3. Layar Welcome

**Isi (urutan dari atas):**
1. Maskot (gambar, besar, tengah)
2. Sapaan: "Hai, saya TravelBuddy"
3. Penjelasan singkat: "Saya bisa membantu menjawab pertanyaan tentang perjalanan jauh."
4. Suggested questions (chip)
5. Input chat (menempel di bawah)

### Mobile

```text
┌─────────────────────────┐
│  [✕]                    │
│                         │
│        AI MASCOT        │
│                         │
│    Hai, saya TravelBuddy      │
│                         │
│  Saya bisa membantu     │
│  menjawab pertanyaan    │
│  tentang perjalanan.    │
│                         │
│  [ Rute perjalanan ]    │
│  [ Lama perjalanan ]    │
│                         │
│  ┌────────────────────┐ │
│  │ Tanyakan sesuatu...│➤│
│  └────────────────────┘ │
└─────────────────────────┘
```

### Desktop

```text
┌───────────────────────────────────────────────────────┐
│  ✦ TravelBuddy                                        ⋯     │
├───────────────────────────────────────────────────────┤
│                                                       │
│                       MASCOT                         │
│                                                       │
│                 Hai, saya TravelBuddy                       │
│       Tanya apa saja tentang perjalanan jauh.         │
│                                                       │
│     [ Rute perjalanan ]  [ Lama perjalanan ]          │
│     [ Tempat istirahat ] [ Persiapan perjalanan ]     │
│                                                       │
│              ┌─────────────────────────┐              │
│              │ Tanyakan sesuatu...   ➤ │              │
│              └─────────────────────────┘              │
└───────────────────────────────────────────────────────┘
```

## 4. Layar Percakapan

**Isi:**
- Header sederhana (kembali/tutup, nama "TravelBuddy", menu ⋯)
- Gelembung pesan pengguna (kanan) dan AI (kiri)
- Avatar maskot kecil di pesan AI
- Suggested questions muncul setelah jawaban AI
- Input tetap di bawah

### Mobile

```text
┌─────────────────────────┐
│ ←  TravelBuddy            ⋯  │
│                         │
│                 ┌─────┐ │
│                 │Saya │ │
│                 │mau  │ │
│                 │ke   │ │
│                 │Bali │ │
│                 └─────┘ │
│                         │
│  ◉ AI                   │
│  Tentu! Saya bisa       │
│  membantu. Kamu         │
│  berangkat dari kota    │
│  mana?                  │
│                         │
│  [Berapa lama?] [Rute?] │
│  ┌────────────────────┐ │
│  │ Tanyakan sesuatu...│➤│
│  └────────────────────┘ │
└─────────────────────────┘
```

### Desktop

```text
┌───────────────────────────────────────────────────────┐
│  ✦ TravelBuddy                                        ⋯     │
├───────────────────────────────────────────────────────┤
│                      ┌──────────────────────────────┐ │
│                      │ Saya mau perjalanan jauh dari│ │
│                      │ [Kota A] ke [Kota B].        │ │
│                      └──────────────────────────────┘ │
│                                                       │
│  ◉ AI                                                 │
│  Tentu. Saya bisa membantu memberikan informasi       │
│  mengenai rute, estimasi waktu, persiapan,            │
│  tempat istirahat, dan hal lainnya.                   │
│                                                       │
│  [Apa rute terbaik?] [Ada tempat istirahat?]          │
│  ┌─────────────────────────────────────────────────┐  │
│  │ Tanyakan sesuatu...                           ➤ │  │
│  └─────────────────────────────────────────────────┘  │
└───────────────────────────────────────────────────────┘
```

Lebar area percakapan di desktop dibatasi **maksimal 760px**, di tengah layar.

## 5. Suggested Questions

**Welcome:**
- Rute perjalanan
- Lama perjalanan
- Tempat istirahat
- Persiapan perjalanan

**Setelah jawaban AI (kontekstual):**
- Berapa lama perjalanan?
- Apa rute terbaik?
- Ada tempat istirahat?
- Apa yang perlu disiapkan?

Aturan: maksimal 3–4 chip, hilang setelah dipilih atau setelah pengguna mengetik sendiri, muncul lagi setelah jawaban AI berikutnya.

## 6. Maskot (Gambar)

Maskot memakai **gambar biasa** (foto/ilustrasi maskot), bukan model 3D.

### Karakter Maskot

Robot kecil bergaya penjelajah, pose melambai (cocok untuk menyapa di welcome screen).

| Bagian | Ciri |
|---|---|
| Kepala | Layar wajah gelap dengan senyum dan mata biru neon (cyan), dilengkapi topi safari krem dan kacamata goggle |
| Badan | Biru dan putih, rompi oranye bersaku |
| Perlengkapan | Kamera, kompas, ransel dengan gulungan peta |
| Kaki | Sepatu bot oranye |

**Warna dari maskot** (perkiraan dari gambar):

| Token | Nilai | Dipakai untuk |
|---|---|---|
| `--mascot-cyan` | `#38D9FF` | Titik status, sorotan kecil, indikator mengetik |
| `--mascot-orange` | `#F0892B` | Tombol kirim, aksen penting |
| `--mascot-tan` | `#C9A66B` | Aksen netral hangat |
| `--mascot-blue` | `#4A6FA5` | Garis dan ikon sekunder |

**Catatan gambar:**
- Hanya **satu file gambar maskot**: `mascot.webp` (seluruh badan, pose melambai, latar transparan).
- Versi mobile (setengah badan) dan avatar kecil **tidak dibuat sebagai file terpisah**. Cukup dipotong lewat CSS (lihat "Cara Memotong dengan CSS").
- Warna biru dan oranye maskot kontras baik dengan latar ungu, jadi tidak perlu diberi garis tepi.

### Lokasi File

```text
static/
└── models/
    └── mascot.webp      ← satu-satunya file maskot (seluruh badan, latar transparan)
```

| Hal | Ketentuan |
|---|---|
| Folder | `static/models/` |
| URL di browser | `/models/mascot.webp` (jika framework menyajikan folder `static/` dari root) |
| Format | WebP atau PNG dengan **latar transparan**, supaya gradien ungu terlihat di belakangnya |
| Ukuran file | ±630 × 1100 px, di bawah 200 KB |
| Desktop (welcome) | Seluruh badan, tinggi ±340px, di tengah |
| Mobile (welcome) | Dipotong dari pinggang ke atas, lebar ±300px, terpotong tepi kanan layar seperti referensi |
| Avatar di percakapan | Dipotong bagian kepala, lingkaran 32–36px |
| Efek | Bayangan lembut (`drop-shadow`) |
| Animasi | Melayang pelan (CSS); nonaktif jika `prefers-reduced-motion` |
| Teks alternatif | `alt="Maskot TravelBuddy"` (avatar: `alt=""`) |

> Gunakan maskot **orisinal** milik TravelBuddy, jangan meniru karakter produk lain.

### Cara Memotong dengan CSS (tanpa file tambahan)

**Desktop (seluruh badan):**

```html
<img src="/models/mascot.webp" alt="Maskot TravelBuddy" class="mascot-full">
```

**Mobile (setengah badan):** bungkus gambar dalam kotak yang memotong bagian bawah.

```html
<div class="mascot-crop">
  <img src="/models/mascot.webp" alt="Maskot TravelBuddy">
</div>
```

**Avatar di pesan AI (kepala):**

```html
<span class="avatar"><img src="/models/mascot.webp" alt=""></span>
```

```css
.mascot-full { height: 340px; width: auto; filter: drop-shadow(0 14px 22px rgba(20, 0, 90, 0.35)); }

/* gambar 300px lebar, tinggi ±524px; tampilkan 64% bagian atas */
.mascot-crop {
  position: absolute; right: -70px; top: 150px;
  width: 300px; height: 335px; overflow: hidden;
  animation: float 4s ease-in-out infinite;      /* animasi di pembungkus, bukan di gambar */
}
.mascot-crop img { display: block; width: 300px; height: auto;
  filter: drop-shadow(0 14px 22px rgba(20, 0, 90, 0.35)); }

/* gambar 42px lebar; geser sedikit supaya kepala di tengah lingkaran */
.avatar { display: inline-block; width: 36px; height: 36px; border-radius: 50%;
  overflow: hidden; background: rgba(255, 255, 255, 0.2); }
.avatar img { display: block; width: 42px; height: auto; margin-left: -5px; }

@keyframes float { 50% { transform: translateY(-8px); } }
@media (prefers-reduced-motion: reduce) { .mascot-crop { animation: none; } }
```

### Kalau Ingin Dipecah Jadi File Terpisah (Opsional)

Pemotongan otomatis bisa menghasilkan tepi yang tidak rapi, jadi lebih aman dipotong manual. Ukuran potongan dinyatakan sebagai persentase dari gambar `mascot.webp`:

| Potongan | Area yang diambil | Ekspor |
|---|---|---|
| Setengah badan | Seluruh lebar, dari atas sampai ±64% tinggi (batas pinggang, di bawah kamera) | `mascot-upper.webp` |
| Avatar kepala | Persegi, mulai ±11% dari kiri, lebar ±86% dari lebar gambar, dimulai dari atas | `mascot-avatar.webp`, 256 × 256 px |

Langkah dengan alat gratis (Photopea di browser, Figma, atau GIMP):
1. Buka `mascot.webp`, gunakan alat *Crop* dengan ukuran di atas.
2. Perbesar 200% dan periksa tepinya (tidak ada halo putih atau tepi bergerigi).
3. Pastikan bagian putih pada badan (dada, lengan atas, pinggul) **tidak ikut transparan**.
4. Ekspor ke WebP dengan latar transparan.

Atau dengan Python (Pillow):

```python
from PIL import Image

im = Image.open("mascot.webp")
w, h = im.size

im.crop((0, 0, w, int(h * 0.64))).save("mascot-upper.webp", quality=90)

side = int(w * 0.86); x0 = int(w * 0.11)
im.crop((x0, 0, x0 + side, side)).resize((256, 256)).save("mascot-avatar.webp", quality=90)
```

Jika dipecah, taruh semua file di `static/models/` dan ganti `src` di HTML sesuai nama filenya.

## 7. Design Tokens

### Warna

| Token | Nilai | Dipakai untuk |
|---|---|---|
| `--bg-from` | `#7C5CFF` | Awal gradien latar |
| `--bg-mid` | `#4F2AF5` | Tengah gradien |
| `--bg-to` | `#3A12D6` | Akhir gradien |
| `--glass` | `rgba(255,255,255,0.16)` | Gelembung sapaan / AI |
| `--glass-border` | `rgba(255,255,255,0.24)` | Garis tipis gelembung |
| `--dark-glass` | `rgba(0,0,0,0.30)` | Chip, input, tombol ikon |
| `--user-bubble` | `#FFFFFF` | Gelembung pengguna |
| `--on-user` | `#2E1065` | Teks di gelembung pengguna |
| `--text` | `#FFFFFF` | Teks utama |
| `--accent` | `#F0892B` | Tombol kirim, sorotan (oranye dari rompi maskot) |
| `--danger` | `#FCA5A5` | Error |

### Tipografi

| Elemen | Ukuran | Berat |
|---|---|---|
| Sapaan welcome | 24–28px | 700 |
| Penjelasan | 16px | 400 |
| Isi pesan | 16px (line-height 1.5) | 400 |
| Chip | 15px | 500 |
| Header | 18px | 600 |

Font: `Outfit` atau `Plus Jakarta Sans`, fallback `system-ui, sans-serif`.

### Bentuk dan Spasi
- Radius gelembung 20px, chip 999px, input 18px
- Skala spasi: 4 · 8 · 12 · 16 · 24 · 32
- Efek kaca: `backdrop-filter: blur(12px)` pada gelembung

## 8. Komponen

| Komponen | Detail |
|---|---|
| Header | Tombol kembali/tutup 44px, judul, menu ⋯ |
| Gelembung pengguna | Kanan, latar putih, teks ungu tua |
| Gelembung AI | Kiri, efek kaca, avatar maskot kecil |
| Chip saran | Pill gelap transparan, 44px tinggi, scroll horizontal di mobile |
| Input | Textarea auto-grow (1–4 baris), tombol kirim bulat 44px, `Enter` kirim, `Shift+Enter` baris baru |
| Indikator mengetik | Tiga titik putih dalam gelembung AI |
| Tombol salin | Muncul di bawah jawaban AI |

## 9. State

| State | Tampilan |
|---|---|
| Welcome | Maskot besar + saran + input |
| AI mengetik | Indikator titik + maskot beranimasi |
| Jawaban panjang | Auto-scroll ke bawah, tombol "ke bawah" jika pengguna scroll ke atas |
| Error | Gelembung dengan tombol "Coba lagi" |
| Offline | Banner kecil di atas input |

## 10. Responsif

| Lebar | Perilaku |
|---|---|
| < 640px | Layar penuh, maskot besar di welcome, chip scroll horizontal |
| 640–1024px | Konten di tengah, maksimal 680px |
| > 1024px | Konten di tengah, maksimal 760px, chip tersusun 2 kolom |

## 11. Aksesibilitas

- Kontras teks minimal 4.5:1 (teks kecil di atas kaca ungu diuji)
- Target sentuh minimal 44 × 44px
- Area pesan `role="log"` + `aria-live="polite"`
- Tombol berikon punya `aria-label` ("Kirim pesan", "Tutup")
- Hormati `prefers-reduced-motion` (matikan animasi maskot)
- Fokus keyboard terlihat jelas

## 12. Checklist Implementasi

- [ ] Welcome screen (mobile dan desktop)
- [ ] Layar percakapan (mobile dan desktop)
- [ ] Taruh `mascot.webp` (satu file) di `static/models/`
- [ ] Potong via CSS untuk mobile (setengah badan) dan avatar kepala
- [ ] Suggested questions awal dan kontekstual
- [ ] Input auto-grow + kirim
- [ ] Indikator mengetik
- [ ] State error / offline
- [ ] Animasi masuk pesan dan maskot
- [ ] Uji aksesibilitas

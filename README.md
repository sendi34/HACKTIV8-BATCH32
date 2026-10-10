# TravelBuddy

TravelBuddy adalah aplikasi chatbot sederhana untuk membantu merencanakan perjalanan. Pengguna dapat bertanya dalam Bahasa Indonesia tentang destinasi, rute, itinerary, transportasi, penginapan, kuliner, anggaran, dan persiapan perjalanan.

## Fitur

- Chat perjalanan dengan AI Gemini.
- Membuat sesi chat baru dan melihat kembali sesi terbaru selama server masih berjalan.
- Saran pertanyaan untuk memulai percakapan.
- Endpoint untuk mengirim prompt teks serta memproses gambar, dokumen, dan audio.
- Tampilan responsif untuk desktop dan perangkat mobile.

## Teknologi

- Node.js dan Express
- HTML, CSS, dan JavaScript
- Google GenAI SDK

## Persiapan

Pastikan Node.js dan npm sudah terpasang. Clone repository, lalu masuk ke folder proyek:

```bash
git clone https://github.com/sendi34/HACKTIV8-BATCH32.git
cd HACKTIV8-BATCH32
```

Pasang dependency:

```bash
npm install
```

Buat file `.env` di folder utama proyek dan isi dengan API key Gemini:

```env
GEMINI_API_KEY=masukkan_api_key_gemini_di_sini
```

Jangan unggah file `.env` atau membagikan API key ke publik.

## Menjalankan aplikasi

Jalankan server:

```bash
node index.js
```

Buka [http://localhost:3000](http://localhost:3000) di browser. Server menggunakan port `3000`.

## API

Semua endpoint tersedia pada server yang sama, di `http://localhost:3000`.

### Sesi chat

| Metode | Endpoint | Kegunaan |
| --- | --- | --- |
| `POST` | `/api/sessions` | Membuat sesi chat baru; body JSON berisi `userId` berupa UUID. |
| `GET` | `/api/sessions?userId=<UUID>` | Mendapatkan daftar sesi milik pengguna. |
| `GET` | `/api/sessions/:sessionId?userId=<UUID>` | Mendapatkan detail dan pesan dalam sesi. |
| `POST` | `/api/chat` | Mengirim pesan; body JSON berisi `userId`, `sessionId`, dan `message`. |

Contoh body untuk membuat sesi:

```json
{
  "userId": "a8098c1a-f86e-11da-bd1a-00112444be1e"
}
```

Contoh body untuk mengirim chat:

```json
{
  "userId": "a8098c1a-f86e-11da-bd1a-00112444be1e",
  "sessionId": "UUID_SESI_CHAT",
  "message": "Rencanakan liburan 3 hari ke Bali untuk 2 orang."
}
```

### Generasi dan pemrosesan media

| Metode | Endpoint | Kegunaan |
| --- | --- | --- |
| `POST` | `/api/generate-text` | Mengirim prompt teks; body JSON berisi `prompt`. |
| `POST` | `/api/process-media` | Memproses gambar, dokumen, atau audio; gunakan `multipart/form-data` dengan field `file` dan prompt opsional. |
| `POST` | `/api/generate-from-image` | Memproses gambar yang diunggah. |
| `POST` | `/api/generate-from-document` | Memproses dokumen yang diunggah. |
| `POST` | `/api/generate-from-audio` | Memproses audio yang diunggah. |

## Catatan

- Data sesi disimpan sementara di memori server, sehingga akan hilang saat server dihentikan atau dimulai ulang.
- Pastikan API key Gemini valid dan memiliki akses ke model yang digunakan aplikasi.
- Jangan pernah memasukkan API key langsung ke file frontend atau repository publik.

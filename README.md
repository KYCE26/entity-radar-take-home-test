# Entity Radar — Tactical Dashboard

![Go](https://img.shields.io/badge/Go-1.20%2B-00ADD8?style=flat-square&logo=go&logoColor=white)
![React](https://img.shields.io/badge/React-Vite-61DAFB?style=flat-square&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-strict-3178C6?style=flat-square&logo=typescript&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-4169E1?style=flat-square&logo=postgresql&logoColor=white)
![Status](https://img.shields.io/badge/status-in%20development-lightgrey?style=flat-square)

Aplikasi pemetaan entitas geospasial full-stack dengan antarmuka bergaya command center. Entity Radar memungkinkan pengguna memantau, menambahkan, dan mengedit data entitas geografis lengkap dengan koordinatnya secara interaktif, langsung dari kanvas peta.

## Demo

| Layanan | URL |
|---|---|
| Frontend (Web App) | [map.portofoliorifky.my.id](https://map.portofoliorifky.my.id) |
| Backend API | [mapapi.portofoliorifky.my.id](https://mapapi.portofoliorifky.my.id) |

## Arsitektur

Frontend dan backend dipisah sepenuhnya agar keduanya bisa dikembangkan, di-deploy, dan diskalakan secara independen.

```
┌─────────────────────┐        REST API        ┌──────────────────────┐
│  React + Vite + TS   │ ──────────────────────▶ │   Go (Gin) + GORM     │
│  Zustand · Leaflet    │ ◀────────────────────── │   PostgreSQL          │
└─────────────────────┘                          └──────────────────────┘
```

### Backend

| Komponen | Pilihan | Alasan |
|---|---|---|
| Framework | Go + Gin | Eksekusi cepat, konsumsi memori kecil, routing efisien untuk RESTful API produksi |
| ORM | GORM | Menyederhanakan interaksi database dan meminimalkan risiko injeksi SQL |
| Database | PostgreSQL | Relasional dan stabil, terbuka untuk kebutuhan spasial lanjutan (PostGIS) ke depannya |

### Frontend

| Komponen | Pilihan | Alasan |
|---|---|---|
| Framework | React (Vite) + TypeScript | Build dan hot-reload cepat; tipe data dari API tervalidasi ketat di sisi klien |
| Styling | Tailwind CSS | Desain kustom kompleks (glassmorphism, dsb.) tanpa file CSS bertumpuk |
| State | Zustand | Manajemen state global ringan, minim boilerplate, cukup tangguh untuk state peta dan form |
| Peta | React-Leaflet + Stadia Maps (Alidade Smooth Dark) | Ringan tanpa proses WebGL berat; palet warna sesuai tema radar taktis |
| Ikon | SVG murni | Seluruh ikon ditulis langsung dengan elemen SVG bawaan, tanpa aset gambar eksternal, sehingga aplikasi memuat lebih cepat |

## Menjalankan Secara Lokal

Prasyarat: Go 1.20+, Node.js 18+, PostgreSQL.

**1. Setup database**

Buat database kosong di PostgreSQL, misalnya `entity_map_db`.

**2. Jalankan backend**

```bash
cd backend
go mod tidy
go run main.go
```

Backend berjalan di port `8085`. Sesuaikan kredensial database di konfigurasi kode atau file `.env` sebelum menjalankan.

**3. Jalankan frontend**

```bash
cd frontend
npm install
npm run dev
```

Frontend dapat diakses di `http://localhost:5173`.

## Keterbatasan Saat Ini

Beberapa hal yang belum berjalan 100% sempurna, dicatat di sini sebagai bahan evaluasi dan transparansi teknis:

- **Akurasi radius geofencing** — lingkaran radius pada marker saat ini murni manipulasi DOM dari Leaflet. Backend belum menghitung batas wilayah secara presisi menggunakan algoritma Haversine.
- **Sinkronisasi real-time** — klien masih mengandalkan polling manual. Belum ada WebSocket atau SSE, sehingga perubahan data dari luar baru terlihat setelah halaman dimuat ulang.
- **Mode offline** — state Zustand bersifat in-memory tanpa Service Worker atau IndexedDB. Jika koneksi terputus, draft form yang belum disimpan akan hilang dan aplikasi tidak bisa dipakai secara luring.
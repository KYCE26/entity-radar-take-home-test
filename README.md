ENTITY RADAR: TACTICAL DASHBOARD
Aplikasi pemetaan entitas geospasial full-stack yang dirancang dengan antarmuka bergaya Command Center. Sistem ini memungkinkan pengguna untuk memantau, menambahkan, dan mengedit data entitas geografis lengkap dengan koordinatnya secara interaktif—langsung dari kanvas peta.

LIVE DEMO
Frontend (Web App): https://map.portofoliorifky.my.id

Backend API: https://mapapi.portofoliorifky.my.id

 TUMPUKAN TEKNOLOGI & ALASAN PEMILIHAN
Proyek ini dibangun dengan memisahkan arsitektur frontend dan backend secara penuh untuk memastikan modularitas dan skalabilitas.

[ ARSITEKTUR BACKEND ]

Go (Golang) & Gin Framework: Gin dipilih murni karena performanya. Eksekusinya sangat cepat, konsumsi memorinya kecil, dan routing-nya sangat efisien untuk merancang RESTful API tingkat produksi.

GORM: Dipakai untuk menyederhanakan interaksi dengan pangkalan data dan meminimalisir risiko injeksi SQL melalui ORM yang aman.

PostgreSQL: Standar industri yang tangguh. Relasional, stabil, dan memiliki dukungan yang sangat baik jika ke depannya proyek ini membutuhkan fungsi spasial tingkat lanjut (seperti PostGIS).

[ ARSITEKTUR FRONTEND ]

React (Vite) + TypeScript: Vite membuat proses build dan hot-reload menjadi sangat cepat. TypeScript dipakai agar tipe data dari API bisa divalidasi dengan ketat di sisi klien, mencegah banyaknya galat saat runtime.

Tailwind CSS: Dipilih untuk kelincahan (agility). Memungkinkan pembuatan desain UI kustom yang kompleks (seperti efek glassmorphism di panel) dengan cepat tanpa perlu membuat fail CSS yang saling bertumpuk.

Zustand: Manajemen state global yang jauh lebih ringan dan minim boilerplate dibandingkan Redux, namun tetap tangguh menangani state peta dan formulir dengan lancar.

React-Leaflet & Stadia Maps: Leaflet sangat ringan untuk merender titik koordinat tanpa membebani peramban web dengan proses WebGL yang berat (seperti Mapbox). Peta dasar menggunakan Alidade Smooth Dark dari Stadia Maps karena palet warnanya sangat sesuai dengan tema radar taktis.

Pure SVG UI: Seluruh ikon (pada sistem Toast, tombol, dan marker radar) ditulis murni menggunakan elemen  dan  bawaan HTML/Tailwind. Tidak ada penggunaan aset gambar eksternal, sehingga aplikasi memuat lebih cepat tanpa beban permintaan HTTP ekstra.

 PANDUAN INSTALASI & EKSEKUSI LOKAL
Pastikan komputermu sudah terpasang Go (v1.20+), Node.js (v18+), dan PostgreSQL.

TAHAP 1: SETUP DATABASE
Buat sebuah pangkalan data kosong di PostgreSQL, misalnya "entity_map_db".

TAHAP 2: JALANKAN BACKEND
Masuk ke dalam folder backend, sesuaikan konfigurasi kredensial basis data di dalam kode (atau via .env jika digunakan), lalu eksekusi perintah terminal berikut:

cd backend
go mod tidy
go run main.go
(Backend akan berjalan di porta 8085)

TAHAP 3: JALANKAN FRONTEND
Buka tab terminal baru, masuk ke folder frontend, dan jalankan peladen pengembangan lokal:

cd frontend
npm install
npm run dev
(Frontend dapat diakses melalui peramban di http://localhost:5173)

 TRANSPARANSI & KETERBATASAN FUNGSIONAL
Sebagai bentuk kejujuran teknis dan bahan evaluasi rekayasa perangkat lunak, berikut adalah beberapa batasan pada sistem saat ini yang belum beroperasi 100% sempurna:

Akurasi Radius Spasial (Geofencing)
Visualisasi lingkaran biru (radius) pada penanda peta saat ini murni menggunakan manipulasi DOM dari bawaan Leaflet. Peladen (backend) belum mengimplementasikan kalkulasi spasial atau batasan wilayah yang presisi menggunakan algoritma Haversine untuk menyaring entitas berdasarkan zona.

Sinkronisasi Real-Time State
Klien masih mengandalkan mekanisme pengambilan data (polling) manual melalui antarmuka. Karena sistem belum mengadopsi protokol komunikasi dua arah seperti WebSockets (WSS) atau Server-Sent Events (SSE), pembaruan data yang terjadi langsung dari luar basis data hanya akan direfleksikan setelah halaman web dimuat ulang.

Resiliensi Jaringan (Offline Mode)
Penyimpanan state saat ini (Zustand) bersifat in-memory. Aplikasi belum didukung oleh Service Workers atau penyimpanan persisten peramban (IndexedDB). Jika koneksi jaringan terputus secara tiba-tiba, perubahan draft pada form tidak akan tersimpan dan aplikasi tidak dapat beroperasi dalam mode luring (offline).
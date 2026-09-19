Entity Radar: Tactical Dashboard

Aplikasi pemetaan entitas geospasial full-stack yang dirancang dengan antarmuka bergaya Command Center. Sistem ini memungkinkan pengguna untuk memantau, menambahkan, dan mengedit data entitas geografis lengkap dengan koordinatnya secara interaktif langsung dari peta.

Live Demo:

Frontend: https://map.portofoliorifky.my.id

Backend API: https://mapapi.portofoliorifky.my.id

Tumpukan Teknologi & Alasan Pemilihan

Proyek ini dibangun dengan memisahkan arsitektur frontend dan backend secara penuh.

Backend

Go (Golang) & Gin Framework: Gin dipilih murni karena performanya. Eksekusinya sangat cepat, konsumsi memorinya kecil, dan routing-nya sangat efisien untuk merancang RESTful API.

GORM: Dipakai untuk menyederhanakan interaksi dengan database dan meminimalisir risiko SQL Injection.

PostgreSQL: Standar industri yang tangguh. Relasional, stabil, dan punya dukungan yang sangat bagus jika ke depannya proyek ini butuh fungsi spasial tingkat lanjut (seperti PostGIS).

Frontend

React (Vite) + TypeScript: Vite bikin proses build dan hot-reload ngebut. TypeScript dipakai biar tipe data dari API bisa divalidasi dengan ketat di sisi klien, mencegah banyak runtime error.

Tailwind CSS: Dipilih untuk kelincahan (agility). Memungkinkan pembuatan desain UI kustom yang kompleks (seperti efek glassmorphism di panel) dengan cepat tanpa perlu membuat file CSS yang menumpuk.

Zustand: Manajemen state yang jauh lebih ringan dan minim boilerplate dibanding Redux, tapi tetap bisa menangani state peta dan form dengan lancar.

React-Leaflet & Stadia Maps: Leaflet sangat ringan untuk sekadar merender titik di peta tanpa membebani browser dengan WebGL berat (seperti Mapbox). Peta dasar menggunakan Alidade Smooth Dark dari Stadia Maps karena warnanya sangat cocok dengan tema radar militer.

Pure SVG UI: Seluruh ikon (pada Toast, tombol, dan marker radar) ditulis murni menggunakan elemen <svg> dan div bawaan HTML/Tailwind. Tidak ada penggunaan aset gambar eksternal atau stiker, sehingga aplikasi lebih ringan dan tidak butuh HTTP request tambahan.

Cara Instalasi & Menjalankan di Lokal

Pastikan komputer sudah terinstal Go (v1.20+), Node.js (v18+), dan PostgreSQL.

1. Setup Database

Buat database kosong di PostgreSQL, misalnya entity_map_db.

2. Jalankan Backend

Masuk ke folder backend, sesuaikan konfigurasi kredensial database di dalam kode (atau via .env jika ada), lalu jalankan:

cd backend
go mod tidy
go run main.go


Backend akan berjalan di port 8085.

3. Jalankan Frontend

Buka terminal baru, masuk ke folder frontend, dan jalankan:

cd frontend
npm install
npm run dev


Frontend bisa diakses melalui browser di http://localhost:5173.

Catatan Fungsional

Aplikasi ini sudah mendukung Cross-Origin Resource Sharing (CORS) dinamis untuk lingkungan lokal maupun deployment produksi di balik reverse proxy.
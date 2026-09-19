# Entity Radar - Backend API Service

Layanan peladen utama untuk sistem pemetaan Entity Radar. Dibangun menggunakan arsitektur ringan yang dioptimalkan untuk kecepatan eksekusi, penanganan rute tingkat tinggi, dan efisiensi memori di lingkungan produksi.

## Tumpukan Teknologi Utama
* **Go (Golang):** Bahasa utama yang menjamin kompilasi biner mandiri dan proses eksekusi asinkron yang efisien.
* **Gin Web Framework:** Dipilih untuk *routing* RESTful berkinerja tinggi.
* **GORM:** Lapisan pemetaan relasional objek (ORM) untuk interaksi basis data yang aman dari injeksi SQL.
* **PostgreSQL:** Pangkalan data relasional standar industri untuk menyimpan data titik geospasial.

## Rincian Fitur Utama
1. **Geospatial CRUD Endpoints:** Menyediakan antarmuka RESTful lengkap (POST, GET, PUT, DELETE) untuk memanipulasi data entitas, menangkap koordinat presisi (lintang/bujur), serta melacak status operasional perangkat/fasilitas.
2. **Reverse Proxy-Ready CORS Middleware:** Sistem penanganan *Cross-Origin Resource Sharing* yang telah diperkeras menggunakan pustaka `gin-contrib/cors`. Konfigurasi ini dirancang agar tahan banting dan tetap menyisipkan *header* otorisasi dengan tepat meski lalu lintas melewati lorong proksi terbalik (seperti Cloudflare Tunnels).
3. **Database Auto-Migration:** Skema basis data disinkronkan secara otomatis oleh GORM saat peladen dihidupkan, meminimalisasi risiko konflik struktur tabel saat aplikasi dipindahkan ke peladen baru.

## Eksekusi Peladen
```bash
go mod tidy
go run main.go
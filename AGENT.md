# Deklarasi Transparansi AI (AI Transparency Document)

Dokumen ini disusun untuk memberikan transparansi operasional terkait pemanfaatan Kecerdasan Buatan (AI) selama siklus pengembangan sistem Entity Radar. AI diposisikan murni sebagai asisten teknis dan mitra diskusi, sementara seluruh keputusan arsitektural, implementasi logika kritis, dan manajemen infrastruktur tetap berada di bawah kendali saya sepenuhnya.

## 1. Lingkup Pemanfaatan AI
*   **Perencanaan Sprint:** AI dimanfaatkan pada tahap awal untuk memecah spesifikasi mentah dari tes (Take-Home Test) menjadi tahapan sprint yang terstruktur (Sprint 1-5), memastikan manajemen waktu yang efisien.
*   **Boilerplate & Scaffolding:** Digunakan untuk mempercepat penulisan kerangka awal kode dasar, seperti konfigurasi Vite, inisiasi kerangka kerja Gin di Go, dan draf awal middleware CORS.
*   **Referensi Sintaks Desain:** AI membantu menyarankan kombinasi kelas utilitas Tailwind CSS untuk mencapai efek visual tertentu (seperti glassmorphism pada panel) dan manipulasi elemen HTML/CSS kustom untuk penanda peta (animasi radar ping) tanpa bergantung pada aset gambar eksternal.

## 2. Kemandirian Pengembang (Batas Keterlibatan AI)
*   **Arsitektur Komponen Antarmuka:** Seluruh struktur interaktivitas dan logika komponen React (seperti integrasi peta, EntityDetail, EntityForm, dan Toast) dikonstruksi, dirakit, dan ditangani pengikatan state-nya secara mandiri. Hal ini mereplikasikan standar kerja profesional saya, di mana saya selalu merancang dan membangun seluruh komponen antarmuka (seperti ekosistem Vue.js pada proyek saya yang lain) secara independen tanpa pendelegasian.
*   **Pengambilan Keputusan Teknologi:** Keputusan menggunakan Zustand (atas alasan efisiensi dibandingkan Redux) dan PostgreSQL (untuk kesiapan skalabilitas data geospasial) murni merupakan pertimbangan teknis pribadi.
*   **Manajemen Infrastruktur Server:** Eksekusi peluncuran aplikasi (deployment) mulai dari penyiapan basis data, kompilasi biner Go untuk lingkungan Linux, penanganan tunneling jaringan, hingga konfigurasi reverse proxy untuk domain produksi dilakukan seratus persen secara manual di server mandiri tanpa campur tangan AI.
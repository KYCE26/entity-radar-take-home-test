```markdown
# Entity Radar - Tactical Dashboard (Frontend)

Antarmuka pengguna interaktif (SPA) yang dirancang dengan estetika *Command Center* militer modern. Dibangun secara modular murni melalui perakitan komponen mandiri tanpa bergantung pada pustaka antarmuka instan (seperti Bootstrap atau MUI).

## Tumpukan Teknologi Utama
* **React + TypeScript (Vite):** Fondasi inti untuk sistem komponen yang cepat dan memastikan keamanan tipe data (*type safety*) pra-kompilasi.
* **Tailwind CSS:** Sistem penataan gaya utama yang memungkinkan iterasi desain kustom dengan sangat lincah.
* **Zustand:** Manajemen *state* terpusat yang ramping.
* **React-Leaflet:** Merender kanvas peta tanpa beban WebGL yang berat.

## Rincian Fitur Utama
1. **Tactical Glassmorphism UI:** Elemen antarmuka melayang dengan efek blur latar belakang, batas tembus pandang, dan desain *emboss* yang dicapai sepenuhnya melalui manipulasi kelas utilitas Tailwind.
2. **Interactive Coordinate Geofencing (Click-to-Pick):** Pengguna tidak perlu mengetik koordinat secara manual. Klik area mana saja pada kanvas peta untuk menangkap koordinat (lat/lon) secara akurat, yang secara otomatis memicu mode penambahan entitas baru.
3. **Dynamic Radar Blips:** Penanda peta (marker) tidak menggunakan gambar aset eksternal. Semuanya direkayasa menggunakan elemen HTML kustom dan animasi CSS murni (*ping* dan *box-shadow*). Warna denyut radar akan beradaptasi secara otomatis mengikuti status operasional entitas (Aktif/Perbaikan/Mati).
4. **Zero-Reload State Management:** Seluruh manipulasi data dikoordinasikan secara sinkron oleh Zustand. Perubahan data (edit/tambah/hapus) akan langsung memperbarui kanvas peta dan panel detail dalam hitungan milidetik tanpa perlu menyegarkan memori peramban.
5. **Custom Visual Error Handling:** Sistem notifikasi peringatan interaktif (*Toast*) yang dilengkapi dengan ikon murni berbasis `<svg>`. Sistem ini menyaring dan menampilkan galat jaringan maupun validasi formulir secara elegan tanpa menginterupsi alur kerja pengguna.

## Eksekusi Klien
```bash
npm install
npm run dev
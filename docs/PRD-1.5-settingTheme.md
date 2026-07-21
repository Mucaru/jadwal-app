# PRD — Jadwal Ku v1.5: Swipe Delete & Theme Picker

**Status:** Planned (belum dikerjakan)
**Versi:** 1.5
**Produk:** Jadwal Ku (offline PWA jadwal & task harian)
**Live:** https://jadwal-app-pi.vercel.app/
**Dependensi:** v1.3 (Recurring Delete Series)

---

## 1. Latar Belakang

Dua masukan terpisah dari penggunaan harian:

1. Menghapus Jadwal recurring butuh 2 tap (tombol ✕ lalu pilih "Ini saja" / "Ini & seterusnya") — terasa berlebihan untuk aksi yang sering dilakukan, terutama untuk kasus paling umum (hapus satu instance saja)
2. Permintaan personalisasi tampilan — kemampuan ganti warna tema aplikasi (indigo default → pink)

## 2. Tujuan

### 2.1 Swipe Delete
Mengganti/melengkapi tombol ✕ dengan gesture swipe-to-delete pada `JadwalCard` dan `TaskCard`, konsisten dengan prinsip "gesture-first, tap-friendly" yang dipegang sejak desain awal (lihat riset UI/UX v1.1).

### 2.2 Theme Picker
Menyediakan pilihan warna tema (indigo / pink) yang bisa diganti user kapan saja, tersimpan sebagai preferensi persisten di device.

## 3. Non-Tujuan

- Tidak membuat sistem tema custom bebas (color picker penuh) — hanya 2 pilihan preset di v1.5
- Tidak mengubah logika hapus grup recurring dari v1.3 (delete series tetap ada, hanya cara memicunya yang disederhanakan)
- Dark mode **tidak** termasuk di v1.5 — tetap terpisah sebagai item roadmap sendiri

## 4. Spesifikasi Fungsional

### 4.1 Swipe to Delete

**Perilaku:**
- Swipe card (Jadwal atau Task) ke kiri memunculkan area aksi merah dengan ikon hapus di belakangnya
- Swipe cukup jauh (melewati threshold ~40% lebar card) atau tap area merah yang muncul → trigger hapus
- Untuk Jadwal **non-recurring**: langsung terhapus, sama seperti tombol ✕ sebelumnya
- Untuk Jadwal **recurring**: swipe memunculkan **1 langkah konfirmasi saja** (bukan 2 tombol terpisah kayak sekarang) — begitu area merah muncul, ada 2 opsi kecil di dalam area itu sendiri ("1x" dan "semua"), dipilih langsung dari hasil swipe, tanpa perlu tap ✕ dulu untuk masuk mode konfirmasi

**Perubahan dari alur v1.3 sebelumnya:**
- Sebelumnya: tap ✕ → card berubah jadi 3 tombol pilihan → pilih salah satu (2 tap)
- Sesudahnya: swipe → langsung pilih opsi dari hasil swipe (1 gesture + 1 tap, atau bisa dibuat 1 aksi kalau user swipe penuh untuk default "1x saja")

**Tombol ✕ existing:** tetap dipertahankan sebagai alternatif non-gesture (untuk aksesibilitas dan konsistensi desktop/testing), tapi bukan lagi satu-satunya jalur.

### 4.2 Theme Picker

**Lokasi:** Menu pengaturan sederhana (ikon gear atau entry baru), bisa diakses dari Header (misal tap ikon kalender area kanan atas diganti jadi menu, atau tambah ikon settings baru di sebelahnya)

**Opsi:**
- Indigo (default, warna saat ini: `#6366F1`)
- Pink (`#EC4899` sebagai warna dasar, disesuaikan skema gradient header & aksen yang konsisten dengan pola desain v1.1)

**Cakupan warna yang berubah:** Header gradient, warna aktif di DateStrip, warna FAB, warna aksen tombol utama (Simpan), warna kategori pill yang aktif, warna progress ring/bar.

**Penyimpanan:** Preferensi tema disimpan di device (localStorage cukup untuk ini, karena bukan data inti yang perlu di-backup lewat Dexie) dan diterapkan ulang otomatis saat app dibuka kembali.

## 5. Kriteria Sukses (Acceptance Criteria)

- [ ] Swipe kiri pada Jadwal/Task memunculkan aksi hapus, tanpa harus tap ✕ dulu
- [ ] Jadwal non-recurring terhapus dalam 1 gesture
- [ ] Jadwal recurring tetap punya pilihan "1x" vs "semua ke depan", tapi dicapai dalam maksimal 1 swipe + 1 tap (bukan tap ✕ + pilih dari 3 tombol seperti sekarang)
- [ ] Tombol ✕ manual tetap berfungsi sebagai alternatif
- [ ] User bisa pilih tema pink dari menu, dan seluruh elemen ber-aksen warna berubah konsisten
- [ ] Pilihan tema tetap tersimpan setelah app ditutup dan dibuka lagi

## 6. Perubahan Teknis (Perkiraan Awal)

| Area | Perubahan |
|---|---|
| `components/schedule/JadwalCard.tsx` | Tambah gesture handler swipe (kemungkinan pakai library ringan seperti `react-swipeable`, atau custom pointer events agar tidak menambah dependency besar) |
| `components/schedule/TaskCard.tsx` | Swipe handler serupa |
| `lib/theme.ts` (baru) | Definisi 2 preset warna, helper apply ke CSS variable |
| `app/globals.css` | Ubah warna hardcoded jadi CSS variable (`--color-primary`, dst) supaya bisa di-switch dinamis |
| Komponen ber-warna indigo (`Header`, `DateStrip`, `AddSheet`, dll) | Ganti class Tailwind hardcoded (`bg-indigo-500`) jadi referensi CSS variable |
| `components/settings/ThemeToggle.tsx` (baru) | UI pemilihan tema |

## 7. Risiko

- Mengganti semua `bg-indigo-500` dkk jadi CSS variable itu perubahan yang menyentuh banyak file sekaligus — perlu dilakukan hati-hati per file agar tidak ada elemen yang "ketinggalan" warna lama
- Gesture swipe di web (bukan native) kadang konflik dengan scroll vertikal list — perlu ditest di device asli, bukan cuma browser desktop
- Menyederhanakan alur hapus recurring dari 2 tap jadi versi swipe perlu tetap mempertahankan "jeda sadar" secukupnya, supaya tidak kejadian hapus tidak sengaja untuk aksi yang tidak bisa di-undo

## 8. Kemungkinan Iterasi Lanjutan (Belum Dikerjakan)

- Undo singkat (toast "Jadwal dihapus, Undo?") sebagai jaring pengaman tambahan untuk swipe delete
- Tema custom bebas (bukan cuma 2 preset)
- Dark mode sebagai tema tambahan di picker yang sama
# PRD — Jadwal Ku v1.3: Recurring Schedule Enhancements

**Status:** Planned (belum dikerjakan)
**Versi:** 1.3
**Produk:** Jadwal Ku (offline PWA jadwal & task harian)
**Live:** https://jadwal-app-pi.vercel.app/
**Dependensi:** v1.2 (Recurring Schedule) — field `recurringId` sudah tersedia di skema

---

## 1. Latar Belakang

v1.2 memperkenalkan Jadwal berulang mingguan, tapi 3 gap teridentifikasi di catatan iterasi lanjutan:

1. Tidak ada indikator visual bahwa suatu Jadwal adalah bagian dari rangkaian berulang
2. Menghapus seluruh rangkaian harus dilakukan manual satu per satu
3. Durasi generate (8 minggu) hardcoded, tidak bisa disesuaikan user

## 2. Tujuan

Melengkapi fitur recurring dari v1.2 supaya pengguna bisa mengenali, mengelola, dan mengatur rangkaian Jadwal berulang secara utuh — bukan cuma bisa membuatnya.

## 3. Scope

### 3.1 Badge Penanda Recurring

**Deskripsi:** `JadwalCard` menampilkan ikon kecil (misal `Repeat` dari lucide-react) di sebelah judul, hanya jika `jadwal.recurringId` terisi.

**Kriteria sukses:**
- [ ] Jadwal hasil recurring menampilkan ikon repeat di card
- [ ] Jadwal biasa (non-recurring) tidak menampilkan ikon apa pun tambahan
- [ ] Tidak ada perubahan pada data — murni kondisional rendering berdasarkan field yang sudah ada

**Perubahan teknis:** `components/schedule/JadwalCard.tsx` — tambah render kondisional ikon.

---

### 3.2 Hapus Semua ke Depan

**Deskripsi:** Saat menghapus satu instance recurring, muncul pilihan: hapus instance ini saja, atau hapus instance ini dan semua yang akan datang (berdasarkan `recurringId` dan tanggal >= tanggal instance yang dihapus).

**Kriteria sukses:**
- [ ] Tap ✕ pada Jadwal recurring memunculkan konfirmasi dengan 2 opsi ("Hapus ini saja" / "Hapus ini & seterusnya")
- [ ] Tap ✕ pada Jadwal biasa tetap langsung hapus tanpa dialog tambahan (tidak ada regresi UX untuk kasus non-recurring)
- [ ] "Hapus ini & seterusnya" hanya menghapus instance dengan `recurringId` sama dan `date >=` tanggal instance yang di-tap — instance di masa lalu dengan `recurringId` sama tidak terpengaruh

**Perubahan teknis:**
- `lib/store.ts` — method baru `deleteJadwalSeries(recurringId, fromDate)`
- `components/schedule/JadwalCard.tsx` — logic tampilkan dialog/opsi saat `recurringId` ada
- Kemungkinan butuh komponen konfirmasi kecil (inline atau modal ringan)

---

### 3.3 Durasi Generate Bisa Diatur

**Deskripsi:** Saat membuat Jadwal recurring di `AddSheet`, user bisa memilih durasi generate (misal pilihan: 4 / 8 / 12 minggu), menggantikan nilai hardcoded 8 minggu saat ini.

**Kriteria sukses:**
- [ ] Muncul pilihan durasi (pill button, konsisten dengan pola UI pilihan hari yang sudah ada) saat toggle "Ulangi tiap minggu" aktif
- [ ] Default tetap 8 minggu jika user tidak mengubah
- [ ] Nilai yang dipilih diteruskan ke `addRecurringJadwal` sebagai parameter `weeksAhead` (parameter ini sudah ada di fungsi, saat ini selalu dipanggil dengan nilai tetap 8)

**Perubahan teknis:** `components/AddSheet.tsx` — tambah state `weeksAhead`, UI pill pilihan durasi, teruskan ke pemanggilan `addRecurringJadwal`.

## 4. Non-Tujuan

- Tidak membuat sistem edit massal ("edit semua ke depan") — di luar scope v1.3, hanya delete yang di-cover
- Tidak menambah jenis rekurensi baru (bulanan, custom interval) — tetap mingguan saja seperti v1.2

## 5. Urutan Pengerjaan yang Disarankan

1. Badge penanda (paling sederhana, tidak menyentuh logic data)
2. Durasi generate (perubahan kecil di form + parameter yang sudah ada)
3. Hapus semua ke depan (paling kompleks, butuh method store baru + UI konfirmasi)

## 6. Risiko

- Dialog konfirmasi hapus menambah 1 langkah interaksi untuk Jadwal recurring — perlu dipastikan tetap terasa cepat, bukan mengganggu alur "tap cepat" yang jadi prinsip utama app ini sejak awal.
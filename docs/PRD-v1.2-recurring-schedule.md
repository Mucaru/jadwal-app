# PRD — Jadwal Ku v1.2: Recurring Schedule

**Status:** Implemented
**Versi:** 1.2
**Produk:** Jadwal Ku (offline PWA jadwal & task harian)
**Live:** https://jadwal-app-pi.vercel.app/

---

## 1. Latar Belakang

Sejak v1, semua Jadwal harus diinput manual satu per satu per tanggal. Untuk kegiatan tetap yang berulang tiap minggu (misal: olahraga tiap Senin-Rabu-Jumat, meeting rutin tiap Selasa), ini bikin input jadi repetitif dan rawan lupa diisi ulang tiap minggu.

## 2. Tujuan

Memungkinkan pengguna membuat satu Jadwal yang otomatis terisi ke beberapa tanggal ke depan berdasarkan pilihan hari dalam seminggu, tanpa harus input manual berulang kali.

## 3. Non-Tujuan (Scope yang Sengaja Dibatasi)

Untuk menghindari kompleksitas kalender rekuren penuh (seperti Google Calendar), fitur ini **sengaja tidak** mencakup:

- Edit massal ("edit semua ke depan" / "edit hanya ini")
- Pengecualian tanggal (skip satu instance tanpa mempengaruhi yang lain)
- Rekurensi non-mingguan (bulanan, tahunan, custom interval)
- Rekurensi tanpa batas waktu (selalu dibatasi jumlah minggu ke depan)

Setiap instance yang di-generate adalah **entry independen** — edit atau hapus satu instance tidak memengaruhi instance lain dalam grup yang sama.

## 4. User Story

> Sebagai pengguna dengan kegiatan tetap mingguan, saya ingin menandai satu Jadwal sebagai "berulang" dan memilih hari-harinya, supaya saya tidak perlu input manual tiap minggu.

## 5. Spesifikasi Fungsional

### 5.1 Trigger
Toggle **"Ulangi tiap minggu"** muncul di form tambah Jadwal (tab "Jadwal" pada `AddSheet`), hanya berlaku untuk tipe Jadwal — tidak tersedia untuk Task.

### 5.2 Input
- Toggle checkbox on/off
- Saat aktif, muncul pilihan hari (Min–Sab) dalam bentuk pill button, multi-select
- Minimal 1 hari harus dipilih agar submit menghasilkan recurring; jika toggle aktif tapi tidak ada hari dipilih, sistem fallback ke perilaku non-recurring (single entry di tanggal yang dipilih)

### 5.3 Generation Logic
- Sistem generate instance untuk **8 minggu ke depan** dari tanggal mulai yang dipilih di kalender
- Setiap instance adalah record `Jadwal` independen dengan `title`, `startTime`, `endTime`, `category` yang sama
- Semua instance dalam satu submit dihubungkan lewat field `recurringId` (UUID) — field ini murni referensi, tidak dipakai untuk logic edit/hapus massal di versi ini

### 5.4 Penyimpanan
- Field baru `recurringId?: string` (opsional) ditambahkan ke tipe `Jadwal` di `lib/db.ts`
- Tidak ada perubahan skema/index Dexie — field disimpan sebagai data biasa, tidak di-index

### 5.5 Interaksi dengan Fitur Lain
- Setiap instance recurring tetap bisa dihapus satu-satu lewat tombol ✕ di `JadwalCard`, sama seperti Jadwal non-recurring
- Belum ada fitur edit Jadwal (berlaku umum, bukan spesifik recurring) — instance recurring mengikuti keterbatasan yang sama

## 6. Kriteria Sukses (Acceptance Criteria)

- [x] User bisa mencentang "Ulangi tiap minggu" dan memilih kombinasi hari apa pun
- [x] Setelah submit, Jadwal muncul otomatis di semua tanggal yang sesuai untuk 8 minggu ke depan
- [x] Setiap instance bisa dihapus individual tanpa memengaruhi instance lain
- [x] Jadwal non-recurring (toggle off) tetap berfungsi seperti sebelumnya, tanpa regresi

## 7. Perubahan Teknis

| File | Perubahan |
|---|---|
| `lib/db.ts` | Tambah field opsional `recurringId` pada interface `Jadwal` |
| `lib/store.ts` | Tambah method `addRecurringJadwal(base, startDate, weekdays, weeksAhead)` — generate & bulk insert instance |
| `components/AddSheet.tsx` | Tambah state `isRecurring`, `selectedDays`; UI toggle + pill hari; routing submit ke `addRecurringJadwal` bila aktif |

## 8. Risiko & Trade-off yang Diketahui

- **8 minggu hardcoded** — belum ada opsi ubah durasi generate. Jika kebutuhan berubah (misal ingin 12 minggu), perlu update manual di kode.
- **Tidak ada indikator visual** di `JadwalCard` bahwa suatu Jadwal adalah bagian dari grup recurring (user tidak tahu mana yang "berulang" vs "sekali" hanya dari tampilan card).
- **Penghapusan grup** tidak didukung — jika user ingin batalkan seluruh rangkaian recurring, harus hapus manual satu-satu.

## 9. Kemungkinan Iterasi Lanjutan (Belum Dikerjakan)

- Badge/ikon kecil di `JadwalCard` untuk menandai instance recurring
- Opsi "Hapus semua ke depan" berdasarkan `recurringId`
- Durasi generate yang bisa diatur user (bukan hardcode 8 minggu)
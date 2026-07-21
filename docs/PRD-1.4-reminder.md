# PRD — Jadwal Ku v1.4: Reminder Jadwal

**Status:** Planned (belum dikerjakan)
**Versi:** 1.4
**Produk:** Jadwal Ku (offline PWA jadwal & task harian)
**Live:** https://jadwal-app-pi.vercel.app/
**Dependensi:** v1.2 (Recurring Schedule)

---

## 1. Latar Belakang

Sejak v1, tidak ada mekanisme pengingat untuk Jadwal. User harus mengingat sendiri kapan harus memulai kegiatan. Karena app ini PWA offline-first tanpa backend, opsi reminder terbatas dibanding app native.

## 2. Batasan Teknis (Penting — Dibaca Sebelum Menilai Fitur Ini)

Ini **bukan** alarm sistem (seperti alarm clock bawaan HP yang bunyi keras dan wajib di-dismiss). Alarm level itu butuh akses native (`AlarmManager` Android), di luar kemampuan web app apa pun tanpa dibungkus jadi APK native.

Yang bisa dicapai dalam scope PWA:

| Pendekatan | Reliability | Butuh Backend? |
|---|---|---|
| Notification Trigger API (`showTrigger`) | Muncul walau app ditutup — **khusus Android Chrome**. Status dukungan browser tidak dapat dipastikan stabil (fitur eksperimental sejak 2019, belum berstatus web standard penuh) | Tidak |
| Local Notification biasa | Hanya jalan kalau app/tab sedang terbuka | Tidak |
| Web Push | Reliable di semua kondisi | Ya (server terpisah) |

**Keputusan:** v1.4 memakai pendekatan **hybrid dengan feature detection** — pakai Notification Trigger kalau didukung browser, fallback ke Local Notification kalau tidak. Web Push **di luar scope** karena bertentangan dengan prinsip offline-first/no-backend yang dipegang sejak v1.

## 3. Tujuan

Memberi pengingat sebelum waktu mulai Jadwal, dengan reliability terbaik yang bisa dicapai tanpa backend, dan tanpa menjanjikan lebih dari yang bisa app ini penuhi.

## 4. Non-Tujuan

- Bukan alarm bunyi keras dengan wajib dismiss
- Bukan reminder untuk Task/deadline (scope v1.4 hanya Jadwal fixed-time)
- Tidak menjamin reminder muncul 100% di semua kondisi (battery saver ekstrem, app force-closed total, dsb tetap bisa menghambat)
- Tidak membangun backend/server terpisah

## 5. User Story

> Sebagai pengguna, saya ingin diingatkan beberapa menit sebelum jadwal saya mulai, supaya saya tidak kelewatan walau tidak sedang membuka app.

## 6. Spesifikasi Fungsional

### 6.1 Permission Notifikasi
- Saat user pertama kali mengaktifkan reminder pada Jadwal apa pun, browser meminta izin notifikasi (`Notification.requestPermission()`)
- Jika ditolak, toggle reminder menampilkan pesan bahwa izin diperlukan, dengan instruksi cara mengaktifkan lewat pengaturan browser

### 6.2 Feature Detection
- App mengecek `'showTrigger' in Notification.prototype` saat inisialisasi
- Jika didukung → gunakan Notification Trigger, tampilkan label "Reminder aktif" tanpa embel-embel
- Jika tidak didukung → gunakan Local Notification, tampilkan label kecil "Reminder hanya muncul saat app terbuka" di dekat toggle, supaya ekspektasi user sesuai kenyataan

### 6.3 Pengaturan Reminder per-Jadwal
- Field baru saat tambah/lihat Jadwal: toggle "Ingatkan saya" + pilihan waktu (5 / 10 / 30 / 60 menit sebelum mulai)
- Berlaku untuk Jadwal biasa maupun tiap instance Jadwal recurring (masing-masing instance independen, konsisten dengan prinsip recurring di v1.2 — bukan pengaturan grup)

### 6.4 Konten Notifikasi
- Judul: nama Jadwal
- Body: waktu mulai dan sisa waktu (misal "Dimulai dalam 10 menit")
- Tap notifikasi membuka app ke tanggal Jadwal terkait

### 6.5 Re-sync Saat App Dibuka
- Setiap kali app dibuka, cek Jadwal hari ini yang reminder-nya belum ter-trigger dan waktunya belum lewat, lalu re-schedule — jaga-jaga untuk browser yang tidak mendukung Notification Trigger atau reminder yang sempat gagal terjadwal

## 7. Kriteria Sukses (Acceptance Criteria)

- [ ] User bisa mengaktifkan reminder per-Jadwal dengan pilihan waktu
- [ ] Permission notifikasi diminta dengan jelas, dengan penanganan yang baik jika ditolak
- [ ] Di browser yang mendukung Notification Trigger, reminder muncul walau app tertutup (diuji di Chrome Android — perangkat utama user)
- [ ] Di browser yang tidak mendukung, reminder tetap muncul selama app/tab terbuka, dengan disclaimer yang jelas di UI
- [ ] Tap notifikasi membuka app ke Jadwal yang relevan

## 8. Perubahan Teknis (Perkiraan Awal)

| Area | Perubahan |
|---|---|
| `lib/db.ts` | Tambah field `reminderMinutesBefore?: number` pada interface `Jadwal` |
| `lib/store.ts` | Update `addJadwal`/`addRecurringJadwal` untuk terima parameter reminder |
| `public/sw.js` (custom service worker logic) | Handler `notificationclick`, logic schedule via `showTrigger` |
| `lib/notifications.ts` (baru) | Modul terpisah: request permission, feature detection, schedule/cancel notification, fallback logic |
| `components/forms/JadwalForm.tsx` | Tambah UI toggle + pilihan menit reminder |
| `app/layout.tsx` atau hook baru | Re-sync reminder saat app dibuka |

## 9. Risiko

- Dukungan browser untuk Notification Trigger tidak bisa dipastikan stabil jangka panjang — perlu monitoring, dan UI harus selalu jujur soal keterbatasan lewat feature detection, bukan asumsi tetap
- User mungkin kecewa jika mengira ini alarm penuh — perlu copy/label yang jelas di UI sejak awal (lihat 6.2)
- Battery optimization Android (terutama merk seperti Xiaomi/Oppo yang agresif membekukan background app) bisa tetap menghambat notifikasi walau API mendukung — di luar kendali app ini

## 10. Kemungkinan Iterasi Lanjutan (Belum Dikerjakan)

- Reminder untuk Task/deadline, bukan hanya Jadwal
- Wrap app jadi APK native (Capacitor) untuk akses alarm sistem penuh — perubahan besar, proyek terpisah dari v1.4
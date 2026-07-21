# Product Requirements Document

## Jadwal Ku v1.5 — Glassmorphism UI/UX Redesign

**Status:** Planned
**Versi:** 1.5
**Produk:** Jadwal Ku
**Platform:** Progressive Web App
**Baseline:** Branch `main` setelah implementasi fitur v1.4
**Fokus rilis:** Visual system, information hierarchy, usability, theme architecture, dan konsistensi interaksi
**Tidak termasuk:** Sinkronisasi cloud, akun pengguna, backend baru, dan full dark mode

---

## 1. Ringkasan

Jadwal Ku v1.5 akan merombak tampilan aplikasi menjadi lebih premium, ringan, dan modern dengan pendekatan glassmorphism yang terinspirasi dari material visual iOS.

Glassmorphism bukan tujuan utama produk. Tujuan utamanya adalah:

1. Membuat jadwal dan task lebih cepat dipindai.
2. Memperjelas hubungan antara tanggal, jadwal, dan task.
3. Mengurangi ruang kosong yang tidak produktif.
4. Meningkatkan hierarki visual antarseksi.
5. Membentuk design system yang konsisten dan mudah dikembangkan.
6. Mempertahankan performa dan pengalaman offline-first.
7. Membuat tampilan terasa premium tanpa mengurangi keterbacaan.

Efek kaca hanya digunakan pada area yang membutuhkan pemisahan layer, seperti header, date strip, card utama, bottom sheet, dan floating action button. Efek tersebut tidak boleh digunakan pada setiap elemen.

---

## 2. Latar Belakang

Versi saat ini sudah memiliki fondasi fungsional yang cukup lengkap:

* Pengelolaan jadwal.
* Pengelolaan task dan subtask.
* Jadwal berulang.
* Swipe to delete.
* Tema indigo dan pink.
* Penyimpanan offline melalui IndexedDB.
* Dukungan PWA.

Namun, antarmuka saat ini masih memiliki beberapa persoalan:

### 2.1 Hierarki visual belum kuat

Section Jadwal dan Tasks hanya dipisahkan melalui label teks. Keduanya belum terasa sebagai kelompok informasi yang memiliki konteks dan prioritas berbeda.

### 2.2 Header terlalu dominan

Header menggunakan area vertikal cukup besar untuk informasi yang relatif sedikit. Pada perangkat dengan layar pendek, bagian konten utama menjadi lebih cepat terdorong ke bawah.

### 2.3 Empty state menggunakan ruang terlalu besar

Empty state Jadwal dan Tasks menggunakan ilustrasi dan struktur yang sama. Ketika data kosong, sebagian besar layar hanya berisi ruang kosong tanpa tindakan yang jelas.

### 2.4 Mini calendar belum membantu perencanaan

Date strip hanya menunjukkan hari dan tanggal. Pengguna belum dapat mengetahui tanggal mana yang memiliki jadwal, task, task selesai, atau task terlambat.

### 2.5 Perilaku tanggal dan task belum konsisten

Pemilihan tanggal memengaruhi daftar jadwal, tetapi tidak memengaruhi daftar task. Pengguna dapat menganggap semua konten di bawah date strip berkaitan dengan tanggal yang dipilih, padahal task masih bersifat global.

### 2.6 Sistem tema belum menjadi design system

Warna utama sudah dapat berubah, tetapi beberapa warna, shadow, empty-state illustration, browser theme color, dan state komponen masih memakai nilai hardcoded.

---

## 3. Tujuan Produk

### 3.1 Tujuan utama

* Menghasilkan antarmuka yang terasa modern dan premium.
* Mempercepat pengguna memahami agenda hari yang dipilih.
* Mengurangi cognitive load pada halaman utama.
* Membuat penggunaan tema indigo dan pink konsisten pada seluruh komponen.
* Membentuk primitive UI yang dapat digunakan kembali.
* Meningkatkan kenyamanan penggunaan pada perangkat mobile.
* Menjaga pengalaman tetap baik ketika blur atau transparansi tidak didukung.

### 3.2 Indikator keberhasilan

Rilis dianggap berhasil ketika:

* Pengguna dapat membedakan Jadwal dan Tasks tanpa membaca seluruh konten.
* Pengguna dapat melihat tanggal yang memiliki aktivitas melalui indikator visual.
* Pengguna dapat memahami bahwa daftar yang tampil berkaitan dengan tanggal terpilih.
* Empty state menyediakan tindakan yang relevan.
* Tidak ada teks dengan kontras rendah akibat transparansi.
* Tema indigo dan pink diterapkan secara konsisten.
* Tampilan tidak berkedip dari tema default ke tema tersimpan saat aplikasi dibuka.
* Seluruh CRUD, recurring schedule, swipe delete, dan penyimpanan offline tetap berjalan.
* Aplikasi tetap nyaman digunakan pada PWA standalone, Safari iOS, dan Chrome Android.

---

## 4. Prinsip Desain

### 4.1 Clarity before decoration

Efek blur, transparansi, gradient, dan shadow tidak boleh mengalahkan informasi utama.

### 4.2 Controlled glassmorphism

Dalam satu viewport, maksimal tiga layer blur utama digunakan secara bersamaan:

1. Header atau app background layer.
2. Date strip atau card layer.
3. Bottom sheet atau floating control layer.

### 4.3 Productivity over imitation

Desain boleh terinspirasi dari iOS, tetapi tidak meniru Control Center atau komponen Apple secara literal. Jadwal Ku harus tetap memiliki identitas visual sendiri.

### 4.4 Consistent interaction

Elemen yang terlihat seperti tombol wajib dapat ditekan. Elemen dekoratif tidak boleh menggunakan container yang menyerupai tombol.

### 4.5 Theme-aware components

Setiap komponen menggunakan semantic design token, bukan warna indigo atau pink secara langsung.

### 4.6 Graceful fallback

Ketika `backdrop-filter` tidak tersedia atau performanya buruk, aplikasi harus menggunakan surface solid dengan kontras yang tetap baik.

---

## 5. Pengguna Sasaran

### Primary user

Pengguna individu yang mencatat jadwal, deadline, task, dan aktivitas berulang melalui smartphone.

### Karakteristik penggunaan

* Membuka aplikasi beberapa kali dalam sehari.
* Membutuhkan informasi singkat dan cepat.
* Sering mengoperasikan aplikasi dengan satu tangan.
* Dapat menggunakan aplikasi pada kondisi pencahayaan berbeda.
* Dapat menjalankan aplikasi melalui browser atau PWA standalone.
* Mengharapkan data tetap tersedia ketika offline.

---

## 6. Ruang Lingkup v1.5

## 6.1 Design token dan theme foundation

Sistem warna harus dipindahkan dari pendekatan warna komponen menjadi semantic token.

Token minimum:

```css
--app-background
--app-background-secondary

--surface-glass
--surface-glass-strong
--surface-solid
--surface-elevated

--border-glass
--border-subtle
--border-focus

--text-primary
--text-secondary
--text-muted
--text-on-accent

--accent
--accent-hover
--accent-soft
--accent-rgb

--success
--warning
--danger

--shadow-sm
--shadow-card
--shadow-floating
--shadow-sheet

--blur-sm
--blur-md
--blur-lg

--radius-card
--radius-panel
--radius-pill
```

Setiap preset tema wajib menyediakan:

* Accent color.
* Accent RGB.
* Soft accent.
* Background gradient.
* Decorative blob colors.
* Browser theme color.
* Shadow tint.

Tidak boleh ada shadow indigo yang tetap muncul ketika pengguna memilih tema pink.

---

## 6.2 App background

Background utama menggunakan mesh gradient atau soft gradient blobs yang ringan.

Ketentuan:

* Tidak menggunakan foto atau aset raster.
* Blob dibuat melalui CSS pseudo-element atau elemen dekoratif.
* Opacity rendah.
* Tidak menerima pointer event.
* Tidak mengganggu keterbacaan card.
* Menyesuaikan preset tema.
* Tidak menggunakan animasi kontinu pada versi 1.5.

Contoh struktur visual:

* Base background abu-abu sangat terang.
* Blob accent di bagian atas.
* Blob sekunder di bagian tengah atau bawah.
* Lapisan grain sangat halus bersifat opsional.

---

## 6.3 Application shell

Shell aplikasi tetap menggunakan pendekatan mobile-first dengan lebar maksimum.

Perubahan wajib:

* FAB diposisikan relatif terhadap application shell.
* Background desktop dibedakan dari background aplikasi.
* Shell mendukung `env(safe-area-inset-top)` dan `env(safe-area-inset-bottom)`.
* Tidak ada horizontal overflow akibat blur atau decorative blob.
* Konten tidak tertutup oleh FAB atau home indicator.

---

## 6.4 Header

Header diubah menjadi compact glass header.

### Isi header

* Greeting.
* Nama pengguna.
* Tanggal lengkap.
* Jumlah jadwal.
* Jumlah task aktif.
* Tombol pemilih tema.

### Perubahan desain

* Tinggi visual dipadatkan.
* Radius bawah tetap besar, tetapi tidak berlebihan.
* Latar menggunakan glass surface kuat.
* Border tipis putih/transparan.
* Shadow menyesuaikan tema.
* Tombol tema memiliki kontras yang jelas.
* Icon kalender tidak menggunakan bentuk tombol apabila tidak memiliki aksi.
* Informasi jumlah jadwal dan task ditampilkan sebagai compact stat pills.
* Tema picker tidak ditempatkan sebagai popover mentah tanpa label.

### Aksesibilitas

* Tombol tema minimal 44 × 44 piksel.
* Memiliki `aria-label`.
* Popover dapat ditutup dengan klik di luar dan tombol Escape.
* State tema aktif dapat dikenali selain hanya melalui warna.

---

## 6.5 Date strip

Date strip menjadi floating glass calendar.

### State tanggal

Setiap tanggal dapat memiliki state berikut:

* Default.
* Today.
* Selected.
* Has schedule.
* Has task.
* Has overdue task.
* Selected and today.

### Indikator

Di bawah angka tanggal ditampilkan maksimal dua indikator kecil:

* Accent dot: memiliki jadwal.
* Secondary dot: memiliki task.
* Danger dot menggantikan task dot ketika terdapat task terlambat.

Indikator tidak boleh menggunakan lebih dari tiga warna sekaligus.

### Interaksi

* Area tekan minimal 44 piksel.
* Scroll horizontal harus terasa natural.
* Tanggal terpilih otomatis terlihat.
* Hari ini memiliki indikator visual walaupun tidak dipilih.
* Pemilihan tanggal memperbarui Jadwal dan Tasks secara konsisten.

---

## 6.6 Model penyajian task berdasarkan tanggal

Pada v1.5, task harus memiliki hubungan yang jelas dengan tanggal terpilih.

### Keputusan produk

Date strip akan memfilter:

* Jadwal berdasarkan tanggal pelaksanaan.
* Task berdasarkan `dueDate`.

### Perilaku yang direkomendasikan

Ketika tanggal hari ini dipilih:

1. Tampilkan task dengan deadline hari ini.
2. Tampilkan task terlambat yang belum selesai pada kelompok **Perlu perhatian**.
3. Task masa depan tidak ditampilkan.

Ketika tanggal selain hari ini dipilih:

1. Tampilkan task dengan deadline pada tanggal tersebut.
2. Task overdue dari tanggal lain tidak ikut tampil.
3. Section Perlu perhatian tidak ditampilkan.

Task tanpa deadline tidak ditampilkan di halaman tanggal. Pengelolaan task tanpa deadline dapat disiapkan untuk halaman khusus pada versi berikutnya.

### Empty state

Pesan harus mengikuti tanggal:

* “Belum ada jadwal hari ini.”
* “Belum ada jadwal pada 23 Juli.”
* “Tidak ada task yang jatuh tempo hari ini.”
* “Tidak ada task yang jatuh tempo pada tanggal ini.”

---

## 6.7 Section hierarchy

Section Jadwal dan Tasks harus memiliki struktur visual yang lebih jelas.

Setiap section memiliki:

* Judul.
* Jumlah item.
* Optional secondary label.
* Konten.
* Empty state atau card list.

Contoh:

```text
Jadwal                         3
Agenda pada tanggal terpilih

[Schedule cards]
```

```text
Tasks                          2
Jatuh tempo hari ini

[Task cards]
```

Tidak perlu membungkus seluruh section dalam satu card glass besar apabila menyebabkan terlalu banyak layer. Hierarki dapat dibentuk melalui spacing, heading, count badge, dan card list.

---

## 6.8 Schedule card

Schedule card menggunakan medium glass surface.

### Informasi utama

* Waktu mulai.
* Waktu selesai.
* Judul jadwal.
* Kategori.
* Status recurring.
* Catatan singkat jika tersedia.

### Peningkatan visual

* Waktu menjadi anchor visual utama.
* Warna kategori digunakan sebagai accent kecil, bukan background penuh.
* Recurring indicator dibuat ringkas.
* Border highlight digunakan untuk memperjelas tepi.
* Shadow lebih ringan daripada FAB dan bottom sheet.
* Transparansi tidak boleh membuat teks sulit dibaca.

### Interaksi

* Swipe to delete tetap dipertahankan.
* Overflow dan radius card harus kompatibel dengan swipe container.
* State delete confirmation tetap jelas.
* Tidak ada animasi blur berat ketika pengguna melakukan swipe.

---

## 6.9 Task card

Task card menggunakan visual family yang sama dengan schedule card.

### Informasi utama

* Checkbox.
* Judul.
* Deadline.
* Progress subtask.
* Jumlah subtask selesai.
* Status overdue.
* Expand/collapse control.

### State

* Normal.
* Completed.
* Overdue.
* Expanded.
* Delete confirmation.

### Peningkatan

* Task selesai menggunakan opacity terkontrol, bukan menjadi terlalu redup.
* Task overdue menggunakan danger accent pada deadline atau border kecil.
* Progress bar menggunakan semantic accent.
* Area checkbox minimal 44 piksel.
* Expand control harus terlihat sebagai kontrol interaktif.

---

## 6.10 Empty state

Empty state tidak lagi menggunakan satu ilustrasi untuk semua konteks.

Dibutuhkan dua variant:

### Schedule empty state

* Ilustrasi kalender atau jam.
* Pesan sesuai tanggal.
* Tombol ringan “Tambah jadwal”.

### Task empty state

* Ilustrasi checklist.
* Pesan sesuai tanggal.
* Tombol ringan “Tambah task”.

### Ketentuan

* Tinggi lebih ringkas.
* Warna mengikuti tema.
* Ilustrasi tidak memiliki warna indigo hardcoded.
* CTA membuka tab yang relevan pada Add Sheet.
* CTA tidak perlu ditampilkan apabila FAB sudah sedang terbuka atau sheet aktif.

---

## 6.11 Floating action button

FAB tetap menjadi entry point utama untuk menambah data.

Perubahan:

* Diposisikan terhadap application shell.
* Mendukung safe-area.
* Diameter utama sekitar 56 piksel.
* Menggunakan accent solid atau glass-accent hybrid.
* Memiliki shadow floating.
* Icon memiliki kontras tinggi.
* State pressed terlihat jelas.
* Tidak menggunakan blur berlebihan.
* Tidak menutupi card terakhir.

---

## 6.12 Add Sheet

Add Sheet menjadi strong glass bottom sheet.

### Perubahan visual

* Backdrop menggunakan dim layer dan blur ringan.
* Sheet menggunakan surface glass kuat atau surface solid semi-transparan.
* Drag handle memiliki kontras cukup.
* Header sticky jika isi form panjang.
* Tab Jadwal dan Task menggunakan segmented control.
* Active tab tidak hanya dibedakan melalui warna teks.

### Perilaku

* Dapat ditutup melalui tombol close, backdrop, dan gesture yang tersedia.
* Tidak tertutup keyboard.
* Mendukung safe-area bawah.
* Posisi scroll tidak menyebabkan header form hilang secara membingungkan.
* Tab yang dibuka melalui empty-state CTA langsung sesuai konteks.

---

## 6.13 Form redesign

JadwalForm dan TaskForm menggunakan field system yang konsisten.

### Field requirement

* Label selalu terlihat.
* Placeholder bukan pengganti label.
* Border dan background menggunakan semantic token.
* Focus ring menggunakan accent.
* Error menggunakan danger token.
* Disabled state terlihat jelas.
* Input memiliki tinggi minimal 44 piksel.
* Pills dan category selectors memiliki selected state yang kuat.
* Primary button tetap terlihat jelas di atas glass surface.

### Validasi

* Error diletakkan dekat field terkait.
* Tombol submit tidak memberikan feedback ganda.
* Loading state mencegah double submit.
* Form tetap dapat digunakan ketika keyboard mobile aktif.

---

## 6.14 Theme picker

Tema v1.5 tetap menyediakan:

* Indigo.
* Pink.

Struktur tema harus memungkinkan preset baru ditambahkan tanpa mengubah banyak komponen.

Setiap opsi menampilkan:

* Nama tema.
* Color preview.
* Selected indicator.
* Accessible label.

Tema tersimpan harus diterapkan sebelum first paint untuk menghindari theme flash.

Browser theme color dan warna PWA perlu mengikuti tema aktif sejauh didukung oleh platform.

---

## 6.15 Typography

Gunakan satu sistem font yang konsisten.

Rekomendasi:

* Manrope untuk heading dan angka penting.
* Inter untuk body dan UI text.

Alternatif yang lebih sederhana:

* Inter digunakan untuk seluruh aplikasi.
* Manrope hanya digunakan untuk greeting dan heading besar.

Ketentuan:

* `body` tidak boleh menimpa font dengan Arial.
* Tidak ada token font yang mengarah pada font yang tidak dimuat.
* Angka waktu menggunakan `font-variant-numeric: tabular-nums`.
* Ukuran teks minimum utama adalah 14 piksel.
* Secondary metadata dapat menggunakan 12–13 piksel dengan kontras memadai.

---

## 6.16 Motion

Motion digunakan secara terbatas untuk:

* Theme picker open/close.
* Bottom sheet open/close.
* Card insertion.
* Expand/collapse task.
* State selection pada date strip.
* FAB pressed state.

Ketentuan:

* Durasi sekitar 150–250 ms.
* Tidak menggunakan spring berlebihan.
* Tidak ada looping decorative animation.
* Mendukung `prefers-reduced-motion`.
* Tidak menambahkan animation library baru pada v1.5.

---

## 6.17 Accessibility

Persyaratan minimum:

* Kontras body text minimal 4.5:1.
* Touch target minimal 44 × 44 piksel.
* Focus-visible tersedia pada seluruh kontrol.
* Status tidak disampaikan hanya melalui warna.
* Icon button memiliki accessible name.
* Modal atau sheet memiliki focus management yang benar.
* Reduced motion didukung.
* Date selector dapat digunakan dengan keyboard.
* Form error dapat dibaca screen reader.
* Decorative blob dan illustration diberi `aria-hidden`.

---

## 6.18 Performance

Glassmorphism tidak boleh secara signifikan menurunkan responsivitas aplikasi.

Ketentuan:

* Maksimal tiga layer blur aktif utama dalam satu viewport.
* Hindari blur pada list container besar.
* Blur diterapkan per card hanya ketika hasil pengujian perangkat nyata tetap stabil.
* Gunakan fallback solid surface melalui `@supports`.
* Decorative background tidak menggunakan gambar beresolusi besar.
* Tidak ada dependensi visual besar baru.
* Swipe dan scroll harus tetap terasa responsif.

---

## 7. Di Luar Scope

Hal berikut tidak dikerjakan pada v1.5:

* Login dan akun pengguna.
* Cloud database.
* Sinkronisasi antarperangkat.
* Push notification.
* Kalender bulanan penuh.
* Drag-and-drop schedule.
* Tema custom dengan color picker.
* Full dark mode.
* Desktop dashboard khusus.
* Bottom navigation baru.
* Integrasi Google Calendar.
* Export atau import data.
* Perubahan besar pada schema IndexedDB.
* Animation framework baru.

Dark mode perlu disiapkan melalui semantic token, tetapi implementasi visual lengkap ditunda ke versi berikutnya.

---

## 8. Struktur Komponen yang Direkomendasikan

```text
app/
├── globals.css
├── layout.tsx
└── page.tsx

components/
├── layout/
│   ├── AppShell.tsx
│   └── Header.tsx
├── schedule/
│   ├── DateStrip.tsx
│   ├── JadwalCard.tsx
│   └── TaskCard.tsx
├── theme/
│   ├── ThemeProvider.tsx
│   └── ThemePicker.tsx
├── ui/
│   ├── GlassSurface.tsx
│   ├── SectionHeader.tsx
│   ├── EmptyState.tsx
│   ├── FloatingActionButton.tsx
│   └── SwipeToDelete.tsx
├── forms/
│   ├── FormField.tsx
│   ├── JadwalForm.tsx
│   └── TaskForm.tsx
└── AddSheet.tsx

hooks/
├── useSchedule.ts
└── useTheme.ts

lib/
├── db.ts
├── store.ts
├── theme.ts
└── utils.ts
```

Tidak seluruh file baru harus dibuat sekaligus. Komponen baru hanya dibuat ketika menghilangkan duplikasi atau menyediakan kontrak visual yang konsisten.

---

## 9. Pemetaan File yang Harus Diubah

| File                                     | Tingkat perubahan | Perubahan utama                                                                            |
| ---------------------------------------- | ----------------: | ------------------------------------------------------------------------------------------ |
| `docs/PRD-v1.5-glassmorphism-ui-ux.md`   |              Baru | Menyimpan dokumen PRD final                                                                |
| `app/globals.css`                        |             Mayor | Membersihkan token, font, shadow, dark-mode parsial, background, glass utilities, fallback |
| `app/layout.tsx`                         |            Sedang | Theme initialization, metadata, viewport theme color, font setup                           |
| `app/page.tsx`                           |             Mayor | App shell, section hierarchy, FAB anchoring, selected-date task rendering                  |
| `lib/theme.ts`                           |             Mayor | Theme preset object dan semantic tokens                                                    |
| `hooks/useTheme.ts`                      |             Mayor | Menghindari theme flash dan menyatukan state                                               |
| `components/theme/ThemeProvider.tsx`     |              Baru | Sumber state tema tingkat aplikasi                                                         |
| `components/theme/ThemePicker.tsx`       |              Baru | Memisahkan UI pemilih tema dari Header                                                     |
| `components/layout/AppShell.tsx`         |     Opsional baru | Shell mobile, desktop backdrop, safe-area, FAB boundary                                    |
| `components/layout/Header.tsx`           |             Mayor | Compact glass header dan stat hierarchy                                                    |
| `components/schedule/DateStrip.tsx`      |             Mayor | Indicator dots, selected/today state, activity summary                                     |
| `components/schedule/JadwalCard.tsx`     |            Sedang | Glass card, hierarchy, recurring state                                                     |
| `components/schedule/TaskCard.tsx`       |            Sedang | Glass card, overdue, progress, completed state                                             |
| `components/ui/GlassSurface.tsx`         |              Baru | Primitive surface dan variant                                                              |
| `components/ui/SectionHeader.tsx`        |              Baru | Heading, subtitle, count                                                                   |
| `components/ui/EmptyState.tsx`           |             Mayor | Variant Jadwal/Task, theme-aware, CTA                                                      |
| `components/ui/FloatingActionButton.tsx` |     Opsional baru | FAB positioning dan interaction                                                            |
| `components/ui/SwipeToDelete.tsx`        |  Minor bila perlu | Hanya untuk kompatibilitas radius/overflow                                                 |
| `components/AddSheet.tsx`                |             Mayor | Glass sheet, segmented control, keyboard dan safe-area                                     |
| `components/forms/JadwalForm.tsx`        |            Sedang | Semantic field styling dan validation state                                                |
| `components/forms/TaskForm.tsx`          |            Sedang | Semantic field styling dan validation state                                                |
| `components/forms/FormField.tsx`         |     Opsional baru | Mengurangi duplikasi field                                                                 |
| `hooks/useSchedule.ts`                   |             Mayor | Memuat jadwal, task tanggal, overdue, dan date summaries                                   |
| `lib/store.ts`                           |             Mayor | Query task per tanggal dan ringkasan aktivitas                                             |
| `public/manifest.json`                   |             Minor | Meninjau theme/background color PWA                                                        |

---

## 10. Kebutuhan Data dan Store

Tambahkan fungsi query atau selector berikut:

```ts
loadJadwalByDate(dateKey)
loadTasksByDueDate(dateKey)
loadOverdueTasks(referenceDate)
loadDateActivitySummary(startDate, endDate)
```

Contoh bentuk ringkasan tanggal:

```ts
type DateActivitySummary = {
  dateKey: string
  scheduleCount: number
  taskCount: number
  overdueTaskCount: number
}
```

Ringkasan ini digunakan oleh DateStrip untuk menampilkan indicator dots.

Tidak perlu menambah tabel baru apabila data dapat dihitung secara efisien dari tabel yang ada.

---

## 11. Acceptance Criteria

### Visual system

* [ ] Seluruh komponen utama menggunakan semantic token.
* [ ] Tidak terdapat shadow indigo hardcoded pada tema pink.
* [ ] Background memiliki visual depth yang halus.
* [ ] Glass surface memiliki fallback solid.
* [ ] Font yang tampil sama dengan font yang dikonfigurasi.

### Header

* [ ] Header lebih ringkas dibandingkan versi saat ini.
* [ ] Icon memiliki kontras yang cukup.
* [ ] Theme picker dapat diakses dan ditutup dengan benar.
* [ ] Calendar icon tidak terlihat interaktif apabila tidak memiliki aksi.

### Date strip

* [ ] Selected date, today, schedule, task, dan overdue dapat dibedakan.
* [ ] Semua tanggal memiliki touch target minimal 44 piksel.
* [ ] Pemilihan tanggal memperbarui Jadwal dan Tasks.
* [ ] Indicator tidak mengganggu keterbacaan angka tanggal.

### Jadwal dan task

* [ ] Section memiliki judul, count, dan contextual subtitle.
* [ ] Schedule card dan Task card tetap mudah dipindai.
* [ ] Swipe to delete tetap bekerja.
* [ ] Task overdue memiliki state yang jelas.
* [ ] Task selesai tetap terbaca.
* [ ] Recurring indicator tetap tersedia.

### Empty state

* [ ] Jadwal dan Tasks memiliki ilustrasi berbeda.
* [ ] Ilustrasi mengikuti tema.
* [ ] Pesan mengikuti tanggal terpilih.
* [ ] CTA membuka tab form yang benar.

### Sheet dan forms

* [ ] Sheet tidak tertutup keyboard atau home indicator.
* [ ] Tab Jadwal dan Task memiliki selected state yang kuat.
* [ ] Focus, error, disabled, dan loading state tersedia.
* [ ] Submit tidak dapat dijalankan dua kali secara cepat.

### Theme

* [ ] Tema tersimpan tampil sebelum first paint.
* [ ] Tidak terjadi kilatan indigo ketika tema pengguna pink.
* [ ] Browser theme color mengikuti tema sejauh platform mendukung.
* [ ] Seluruh warna decorative mengikuti tema.

### Regression

* [ ] Tambah, ubah status, dan hapus jadwal tetap berfungsi.
* [ ] Tambah, checklist, subtask, dan hapus task tetap berfungsi.
* [ ] Recurring schedule tetap berfungsi.
* [ ] IndexedDB lama tetap dapat dibaca.
* [ ] Data tidak hilang setelah update.
* [ ] PWA tetap dapat diinstal dan digunakan secara offline.

---

## 12. Urutan Implementasi

### Tahap 0 — Baseline dan regression guard

1. Dokumentasikan UI sebelum perubahan.
2. Catat seluruh alur utama.
3. Pastikan lint dan build bersih.
4. Buat checklist manual CRUD.
5. Jangan mengubah schema database pada tahap desain.

### Tahap 1 — Theme foundation

1. Rapikan `globals.css`.
2. Hapus root dan font declaration yang saling menimpa.
3. Definisikan semantic token.
4. Ubah struktur `lib/theme.ts`.
5. Terapkan tema sebelum first paint.
6. Siapkan fallback glass.

### Tahap 2 — UI primitives

1. Buat `GlassSurface`.
2. Buat `SectionHeader`.
3. Buat atau rapikan AppShell.
4. Buat background layer.
5. Pastikan primitive tidak memiliki business logic.

### Tahap 3 — Main hierarchy

1. Rombak Header.
2. Rombak DateStrip.
3. Rombak section Jadwal dan Tasks.
4. Perbaiki spacing dan vertical rhythm.
5. Perbaiki posisi FAB.

### Tahap 4 — Cards dan empty states

1. Rombak JadwalCard.
2. Rombak TaskCard.
3. Tambahkan state overdue.
4. Pisahkan empty-state variant.
5. Hubungkan CTA ke AddSheet.

### Tahap 5 — Sheet dan forms

1. Rombak AddSheet.
2. Rapikan segmented control.
3. Samakan seluruh form field.
4. Audit keyboard behavior.
5. Audit loading dan error state.

### Tahap 6 — Date and task semantics

1. Tambahkan query task per tanggal.
2. Tambahkan overdue tasks untuk hari ini.
3. Tambahkan date activity summary.
4. Hubungkan indicator ke DateStrip.
5. Pastikan query tidak menciptakan render loop.

### Tahap 7 — QA dan polish

1. Uji pada lebar 320, 360, 390, 430, dan desktop.
2. Uji Safari iOS.
3. Uji Chrome Android.
4. Uji PWA standalone.
5. Uji reduced motion.
6. Uji fallback tanpa backdrop filter.
7. Uji tema indigo dan pink.
8. Uji data IndexedDB lama.
9. Uji kondisi list panjang.
10. Uji kondisi seluruh section kosong.

---

## 13. Self-Critique PRD v1.5

### 13.1 Risiko glassmorphism berlebihan

Terlalu banyak surface transparan dapat membuat seluruh halaman terlihat kabur dan kehilangan hierarki. Glass tidak otomatis berarti premium.

**Guardrail:** Gunakan glass hanya pada surface yang membutuhkan depth. Gunakan solid atau near-solid surface untuk form dan konten dengan kepadatan tinggi.

### 13.2 Risiko meniru iOS secara dangkal

Menyalin radius, blur, dan gradient dari iOS tanpa menyesuaikan kebutuhan aplikasi dapat menghasilkan tampilan generik dan tidak memiliki identitas.

**Guardrail:** Pertahankan accent theme, struktur card, dan pola informasi Jadwal Ku. Ambil prinsip material, bukan menyalin komponen.

### 13.3 Risiko performa perangkat rendah

Banyak layer `backdrop-filter` dapat menurunkan frame rate saat scroll atau swipe.

**Guardrail:** Batasi blur aktif, uji pada perangkat nyata, dan sediakan fallback solid. Jangan menggunakan animated blur.

### 13.4 Risiko kontras pada tema pink

Pink terang dengan surface putih transparan dapat membuat icon dan teks putih kehilangan kontras.

**Guardrail:** Gunakan accent yang lebih gelap untuk elemen interaktif, overlay gelap tipis jika diperlukan, dan uji contrast ratio secara langsung.

### 13.5 Risiko scope menjadi terlalu besar

PRD ini mencakup visual redesign, theme refactor, task filtering, activity summary, serta accessibility. Jika dikerjakan sekaligus tanpa tahap yang jelas, regression risk akan meningkat.

**Guardrail:** Implementasikan berdasarkan urutan tahap. Theme foundation diselesaikan sebelum komponen visual. Perubahan task semantics dilakukan setelah visual shell stabil.

### 13.6 Perubahan task filtering adalah perubahan perilaku

Memfilter task berdasarkan tanggal dapat berbeda dari kebiasaan pengguna yang sebelumnya melihat semua task sekaligus.

**Guardrail:** Tampilkan overdue incomplete tasks pada hari ini dan pertimbangkan halaman atau filter “Semua task” pada versi berikutnya. Perubahan harus diuji pada pola penggunaan nyata.

### 13.7 Full dark mode belum diselesaikan

Semantic token sudah disiapkan, tetapi dark mode dikeluarkan dari scope. Ini menghasilkan pekerjaan lanjutan.

**Guardrail:** Jangan mempertahankan dark mode parsial yang mencampur background gelap dengan komponen terang. Pada v1.5, gunakan light mode yang konsisten sambil menjaga token siap untuk dark mode.

### 13.8 Belum ada user testing

Kritik visual saat ini berasal dari evaluasi desain dan struktur kode, belum dari observasi pengguna.

**Guardrail:** Setelah prototype pertama, lakukan minimal lima pengujian tugas sederhana:

1. Menemukan jadwal hari tertentu.
2. Mengetahui task yang jatuh tempo.
3. Menambahkan jadwal.
4. Menambahkan task.
5. Mengganti tema.

Catat waktu penyelesaian, kesalahan, dan bagian yang membingungkan.

---

## 14. Definition of Done

Versi 1.5 dinyatakan selesai ketika:

1. Semua acceptance criteria terpenuhi.
2. Build production berhasil.
3. Tidak ada lint error.
4. Data pengguna lama tetap tersedia.
5. CRUD dan recurring schedule tidak mengalami regression.
6. Tema tidak berkedip saat aplikasi dibuka.
7. UI diuji pada perangkat mobile nyata.
8. Scroll dan swipe tetap lancar.
9. Kontras dan touch target lolos audit.
10. Dokumentasi struktur tema dan primitive UI tersedia.
11. Screenshot before-and-after tersimpan.
12. Self-critique setelah implementasi dicatat untuk menentukan scope v1.6.

---

## 15. Rekomendasi Scope v1.6

Berdasarkan hasil evaluasi v1.5, kandidat berikut dapat diprioritaskan:

* Full dark mode.
* Halaman Semua Task.
* Kalender bulanan.
* Search dan filter.
* Data backup/export.
* Notification dan reminder.
* Cloud sync.
* Additional theme presets.
* Widget atau quick action PWA.

Prioritas final v1.6 harus ditentukan berdasarkan hasil penggunaan versi 1.5, bukan hanya kebutuhan visual.

https://chatgpt.com/c/6a5f68f4-4e8c-83ec-a52b-8aa66197dd77
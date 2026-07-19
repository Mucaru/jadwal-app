# Jadwal Ku

Aplikasi jadwal dan task harian offline-first, dibuat buat ngerapihin kegiatan harian yang campur antara jadwal tetap dan deadline project.

**Live demo:** https://jadwal-app-pi.vercel.app/

## Fitur

- **Jadwal** — kegiatan dengan waktu mulai & selesai tetap (fixed-time)
- **Task** — pekerjaan dengan deadline, dilengkapi checklist subtask dan progress bar
- **Offline-first** — semua data tersimpan lokal di device (IndexedDB), tetap jalan tanpa internet
- **Installable (PWA)** — bisa di-"Add to Home Screen" dari HP, jalan fullscreen kayak app native
- **Navigasi 5 hari** — geser antar tanggal lewat strip kalender mini

## Tech Stack

- [Next.js](https://nextjs.org/) (App Router) + TypeScript
- [Tailwind CSS](https://tailwindcss.com/) — styling
- [Dexie.js](https://dexie.org/) — wrapper IndexedDB buat database offline
- [Zustand](https://github.com/pmndrs/zustand) — state management
- [@ducanh2912/next-pwa](https://github.com/DuCanhGH/next-pwa) — service worker & PWA config
- [Vercel](https://vercel.com/) — hosting & deployment

## Struktur Data

- `Jadwal` — title, startTime, endTime, date, category
- `Task` — title, dueDate, completed, category
- `Subtask` — title, done, taskId (relasi ke Task)

Task selesai ditandai manual (tidak otomatis dari subtask); subtask hanya mempengaruhi progress bar.

## Menjalankan secara lokal

```bash
npm install
npm run dev
```

Buka `http://localhost:3000`. Untuk test mode PWA (service worker aktif), build production dulu:

```bash
npm run build
npm run start
```

## Instalasi di HP

1. Buka link live demo di Chrome (Android) atau Safari (iOS)
2. Tap menu (⋮) → **Add to Home Screen** / **Install App**
3. Buka dari home screen — app akan jalan fullscreen tanpa address bar

## Roadmap (v1.1+)

- Reminder/notifikasi
- Recurring schedule (jadwal berulang)
- Kategori dengan color-coding
- Swipe gesture untuk selesai/hapus
- Dark mode

---

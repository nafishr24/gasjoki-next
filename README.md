# GasJoki.id - Website Landing Page

## Deskripsi Proyek

GasJoki.id adalah website landing page untuk layanan joki tugas (ghostwriting) profesional yang membantu siswa dan mahasiswa menyelesaikan tugas sekolah, kuliah, skripsi, tesis, dan berbagai jenis tugas akademik lainnya. Website ini menawarkan layanan cepat, aman, anti-plagiarisme, dengan jaminan nilai memuaskan.

Website ini dibangun sebagai single-page application (SPA) yang responsif dan modern, dengan fokus pada user experience yang baik untuk menarik pelanggan potensial.

## Teknologi yang Digunakan

Proyek ini dibangun menggunakan teknologi modern untuk pengembangan web:

### Frontend Framework

- **React 19** - Library JavaScript untuk membangun antarmuka pengguna
- **TypeScript** - Superset JavaScript yang menambahkan type safety

### Build Tool & Development

- **Vite** - Build tool cepat untuk pengembangan modern
- **ESLint** - Linter untuk menjaga kualitas kode
- **TypeScript ESLint** - Aturan linting khusus untuk TypeScript

### Styling & UI

- **Tailwind CSS** - Framework CSS utility-first untuk styling cepat
- **PostCSS** - Tool untuk memproses CSS
- **Autoprefixer** - Plugin PostCSS untuk menambahkan vendor prefixes otomatis

### Icon Library

- **Lucide React** - Library ikon modern dan konsisten

### Development Dependencies

- **@vitejs/plugin-react** - Plugin Vite untuk React
- **@types/react** & **@types/react-dom** - Type definitions untuk React
- **@types/node** - Type definitions untuk Node.js

## Fitur Utama

- **Landing Page Responsif** - Desain yang menarik dan mobile-friendly
- **Form Pemesanan** - Integrasi dengan WhatsApp untuk komunikasi langsung
- **FAQ Modal** - Jawaban untuk pertanyaan umum pelanggan
- **Animasi & Efek** - Smooth scrolling, typing effect, dan transisi
- **SEO Optimized** - Meta tags dan Open Graph untuk sharing sosial
- **Performance Optimized** - Build dengan Vite untuk loading cepat

## Struktur Proyek

```
joki/
├── public/
│   └── images/          # Gambar dan aset statis
├── src/
│   ├── assets/          # Aset internal (jika ada)
│   ├── components/      # Komponen React
│   │   ├── FAQModal.tsx # Modal FAQ
│   │   └── OrderForm.tsx # Form pemesanan
│   ├── App.tsx          # Komponen utama aplikasi
│   ├── App.css          # Styling utama
│   ├── index.css        # CSS global
│   └── main.tsx         # Entry point aplikasi
├── index.html           # Template HTML utama
├── package.json         # Dependencies dan scripts
├── vite.config.ts       # Konfigurasi Vite
├── tailwind.config.js   # Konfigurasi Tailwind CSS
├── postcss.config.js    # Konfigurasi PostCSS
├── tsconfig.json        # Konfigurasi TypeScript
├── eslint.config.js     # Konfigurasi ESLint
└── README.md            # Dokumentasi proyek (file ini)
```

## Instalasi dan Menjalankan

### Prasyarat

- Node.js (versi 16 atau lebih baru)
- npm atau yarn

### Langkah Instalasi

1. **Clone repository** (jika dari Git)

   ```bash
   git clone <repository-url>
   cd joki
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Jalankan development server**

   ```bash
   npm run dev
   ```

   Server akan berjalan di `http://localhost:5173` (port default Vite)

### Build untuk Production

```bash
npm run build
```

File build akan tersimpan di folder `dist/`

### Preview Build

```bash
npm run preview
```

### Linting

```bash
npm run lint
```

## Scripts yang Tersedia

- `npm run dev` - Jalankan development server dengan hot reload
- `npm run build` - Build aplikasi untuk production
- `npm run preview` - Preview build production secara lokal
- `npm run lint` - Jalankan ESLint untuk memeriksa kode

## Kontribusi

1. Fork repository
2. Buat branch fitur baru (`git checkout -b feature/AmazingFeature`)
3. Commit perubahan (`git commit -m 'Add some AmazingFeature'`)
4. Push ke branch (`git push origin feature/AmazingFeature`)
5. Buat Pull Request

## Lisensi

Proyek ini bersifat privat dan tidak untuk distribusi publik.

## Kontak

Untuk informasi lebih lanjut atau pertanyaan:

- Website: [GasJoki.id](https://gasjoki.id)
- WhatsApp: +62 877-0133-0823
- Email: info@gasjoki.id

---

**Catatan:** Website ini dirancang khusus untuk bisnis joki tugas dan mengikuti praktik etika bisnis yang berlaku. Pastikan untuk mematuhi hukum dan regulasi setempat terkait layanan akademik.

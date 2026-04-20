# Rencana Perbaikan Bug & Penambahan Fitur (Plan)

Dokumen ini berisi panduan teknis (*roadmap*) untuk menyelesaikan masalah *bug* serta penambahan *step* fitur baru dalam aplikasi GasJoki. Panduan ini dirancang cukup detail agar dapat dioper langsung untuk diimplementasikan oleh *Junior Programmer* atau ke agen.

## 1. Fitur Baru: Sensor (Masking) Nama Lengkap pada Testimoni

**Sebab Kebutuhan:** 
Klien saat ini meminta agar privasi pengirim testimoni dijaga melalui penyensoran nama, yakni hanya menampilkan inisial karakter depan dari tiap suku kata nama lengkap (misalnya: "Adi Hidayat" akan dirender menjadi "A** H******"). 

**Perbaikan:**
Di tabel prisma, datanya tetap masuk normal apa adanya, tetapi sisi tampilan komponen React client (yakni `TestimoniClient.tsx`) yang akan mengubah *string* saat perenderan nama.

#### [MODIFY] `src/components/layouts/TestimoniClient.tsx`
Tambahkan fungsi utilitas kecil di atas atau di dalam file, dan panggil saat pemetaan *(mapping)* nama.

```tsx
// 1. Tambahkan fungsi helper masking nama di luar komponen utama / diatas TestimoniClient
const maskName = (name: string) => {
  if (!name) return "";
  return name
    .split(" ")
    .map((word) => {
      // Jika kata nya 1 huruf biarkan, jika lebih, ganti sisa huruf dibelakang awalan dengan (*)
      if (word.length <= 1) return word;
      return word[0] + "*".repeat(word.length - 1);
    })
    .join(" ");
};

// ... pada bagian return komponen TestimoniClient, panggil helper ini saat me-render nama:
// Sebelumnya:
// <p className="font-bold text-white truncate text-sm">{testi.name}</p>

// Menjadi:
// <p className="font-bold text-white truncate text-sm">{maskName(testi.name)}</p>
```

---

## 2. Bug Caching Next.js di Komponen Testimoni (Testimoni Tidak Update Tepat Saat Supabase Berubah)

**Sebab Masalah:** 
Next.js (App Router) secara *default* akan menjadikan rute atau *Server Components* (seperti `Testimoni.tsx` dan `page.tsx`) sebagai statis (SSG / Static Site Generation). Hal ini menyebabkan *query* Prisma `.findMany()` hanya dijalankan ketika *build* atau di-*cache* sedemikian rupa pada saat *rendering* pertama kali. Saat database diperbarui langsung lewat Supabase, sisi antar-muka tak akan diperbarui.

**Perbaikan:**
Kita harus memaksa Next.js untuk menjadikan komponen testimoni tersebut berifat dinamis dengan sintaks fungsional *cache disable* agar status halaman ini ditarik real-time dari request.

#### [MODIFY] `src/components/layouts/Testimoni.tsx`
```tsx
import prisma from "@/lib/prisma";
import type { Testimonial } from "@prisma/client";
import TestimoniClient from "./TestimoniClient";
import { unstable_noStore as noStore } from "next/cache"; // 1. Tambahkan impor noStore

export default async function Testimoni() {
  noStore(); // 2. Tambahkan pemanggilan ini

  let testimonies: Testimonial[] = [];
  try {
    testimonies = await prisma.testimonial.findMany({
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    console.error("Prisma Fetch Error:", error);
  }

  return (
    <section id="testimoni" className="py-16 px-6 bg-black/20">
      <TestimoniClient initialTestimonials={testimonies} />
    </section>
  );
}
```

---

## 3. Bug Potensi Error 500 (Server Crash) pada Input Nama Form

**Sebab Masalah:**
Di *server action* tempat menyimpan form Testimoni, jika variabel `name` memuat spasi kosong tidak lazim dan sistem mecoba mencacah (*split*) lalu memanggil huruf besar di variabel *undefined*, *Server Action* akan panik dan *crash* melempar Exception Array Out of bounds 500.

**Perbaikan:**
Kita cukup melangsungkan trim, validasi whitespace regex yang lebih aman.

#### [MODIFY] `src/app/actions/testimonial.ts`
Ubah baris *generate initial*:
```typescript
  try {
    // Generate initial dari nama secara lebih aman (Fallback string jika nama terdeteksi manipulasi)
    const initial = formData.name
      .trim()
      .split(/\s+/) 
      .map((n) => n[0] || "") 
      .join("")
      .toUpperCase()
      .slice(0, 2) || "?"; 

    const testimonial = await prisma.testimonial.create({
// ...
```

---

## 4. Bug Optimasi Performa Pemuatan Google Font (Arus DOM)

**Sebab Masalah:**
Pada file layout utama (`layout.tsx`), Anda menggunakan `<link href="...">` manual untuk meload Font *Plus Jakarta Sans*. Di framework App router yang modern ini bisa memperlambat metrik situs karena merusak siklus dan FOUT / Fleshed out teks.

**Perbaikan:**
Pindahkan inisiasi font menggunakan fitur modul resmi dari Next.

#### [MODIFY] `src/app/layout.tsx`
```tsx
import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google"; // 1. Tambahkan impor 
import "./globals.css";

// 2. Deklarasikan Font disini
const plusJakarta = Plus_Jakarta_Sans({ 
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "GasJoki - Jasa Joki Game Terpercaya",
  description: "Layanan joki game profesional dan terpercaya untuk berbagai jenis game populer.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      {/* 3. Gunakan properti font internal class di body, jadinya tag <head> font manual nya dihapus */}
      <body className={`${plusJakarta.className} antialiased`} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
```

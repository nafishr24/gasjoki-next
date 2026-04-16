"use client";

import { BookOpen, GraduationCap, ScrollText, Gift } from "lucide-react";
import Button from "../ui/Button";

interface LayananProps {
  pesanWA: (jasa: string) => void;
}

export default function Layanan({ pesanWA }: LayananProps) {
  return (
    <section id="layanan" className="py-16 px-6 relative">
      <div className="container mx-auto">
        <div className="text-center mb-14 reveal">
          <h2 className="text-4xl font-extrabold text-white">
            <span className="fire-emoji">🔥</span> Layanan{" "}
            <span className="gradient-text">Unggulan</span>{" "}
            <span className="fire-emoji">🔥</span>
          </h2>
          <p className="text-slate-400 mt-2">
            Pilih layanan sesuai kebutuhan akademikmu
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="card-vibrant rounded-3xl p-7 transition-all hover:border-blue-400/70 reveal">
            <BookOpen className="w-12 h-12 text-blue-400 mb-5" />
            <h3 className="text-2xl font-bold mb-3 text-white">Tugas Sekolah</h3>
            <p className="text-slate-300 mb-4 text-sm">
              PR, Laporan praktikum, resume, hingga presentasi. SMP/SMA/SMK.
            </p>
            <ul className="text-sm text-slate-300 mb-6 space-y-1">
              <li>✓ Pengerjaan 1x24 jam</li>
              <li>✓ Format rapi & siap kumpul</li>
            </ul>
            <Button
              variant="dark"
              fullWidth
              onClick={() => pesanWA("Tugas Sekolah")}
            >
              Pesan Sekarang →
            </Button>
          </div>
          {/* Card 2 Best Seller */}
          <div className="card-vibrant rounded-3xl p-7 relative border-2 transform md:-translate-y-3 shadow-2xl reveal blinking-border">
            <div className="absolute -top-4 left-6 bg-orange-500 text-white text-xs font-black px-4 py-1.5 rounded-full uppercase tracking-wide shadow-lg">
              ⭐ BEST SELLER
            </div>
            <GraduationCap className="w-12 h-12 text-orange-400 mb-5" />
            <h3 className="text-2xl font-bold mb-3 text-white">Tugas Kuliah</h3>
            <p className="text-slate-300 mb-4 text-sm">
              Makalah, jurnal, studi kasus, SPSS, Matlab, dan analisis data.
            </p>
            <ul className="text-sm text-slate-300 mb-6 space-y-1">
              <li>✓ Dosen ahli & sumber jurnal terpercaya</li>
              <li>✓ Turnitin &lt; 20%</li>
            </ul>
            <Button
              variant="gradient"
              fullWidth
              onClick={() => pesanWA("Tugas Kuliah")}
            >
              Gas Sekarang!
            </Button>
          </div>
          {/* Card 3 */}
          <div className="card-vibrant rounded-3xl p-7 transition-all hover:border-blue-400/70 reveal">
            <ScrollText className="w-12 h-12 text-blue-400 mb-5" />
            <h3 className="text-2xl font-bold mb-3 text-white">Skripsi & Tesis</h3>
            <p className="text-slate-300 mb-4 text-sm">
              Bimbingan Bab 1-5, olah data kuantitatif/kualitatif, revisi, sidang.
            </p>
            <ul className="text-sm text-slate-300 mb-6 space-y-1">
              <li>✓ Konsultasi via zoom/wa</li>
              <li>✓ Revisi tanpa batas sampai lulus</li>
            </ul>
            <Button
              variant="dark"
              fullWidth
              onClick={() => pesanWA("Skripsi/Tesis")}
            >
              Konsultasi Gratis
            </Button>
          </div>
        </div>
        {/* promo banner */}
        <div className="mt-12 text-center bg-gradient-to-r from-blue-900/40 to-orange-900/40 p-4 rounded-2xl backdrop-blur-sm border border-blue-400/40 reveal">
          <p className="text-white font-semibold flex items-center justify-center gap-2 flex-wrap">
            <Gift className="w-5 h-5" /> PROMO KHUSUS: Potongan 15% untuk
            pemesanan pertama + GRATIS cek plagiarisme!
          </p>
        </div>
      </div>
    </section>
  );
}

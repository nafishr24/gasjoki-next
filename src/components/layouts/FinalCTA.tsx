"use client";

import { Clock9, Send } from "lucide-react";
import Button from "../ui/Button";

interface FinalCTAProps {
  pesanWA: (jasa: string) => void;
  scrollToLayanan: () => void;
}

export default function FinalCTA({ pesanWA, scrollToLayanan }: FinalCTAProps) {
  return (
    <section className="py-20 px-6 relative">
      <div className="container mx-auto max-w-4xl text-center card-vibrant rounded-3xl p-10 md:p-14 border border-blue-500/40 reveal">
        <Clock9 className="w-14 h-14 text-orange-400 mx-auto mb-4" />
        <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4">
          Jangan Tunda Lagi!
        </h2>
        <p className="text-slate-300 text-lg mb-6">
          Deadline menghantui? GasJoki.id siap bantu 24 jam. Klik tombol dibawah
          untuk konsultasi GRATIS.
        </p>
        <div className="flex flex-wrap justify-center gap-5">
          <Button
            variant="orange"
            onClick={() => pesanWA("Konsultasi Gratis")}
          >
            <Send className="w-5 h-5" /> Konsultasi Sekarang
          </Button>
          <Button
            variant="outlineBlue"
            onClick={scrollToLayanan}
          >
            Lihat Layanan
          </Button>
        </div>
        <p className="text-slate-500 text-sm mt-6">
          *Garansi uang kembali jika tidak sesuai kesepakatan
        </p>
      </div>
    </section>
  );
}

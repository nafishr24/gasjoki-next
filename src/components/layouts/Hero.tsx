"use client";

import { useEffect, useState } from "react";
import { Zap, Users } from "lucide-react";
import Button from "../ui/Button";

interface HeroProps {
  scrollToLayanan: () => void;
}

export default function Hero({ scrollToLayanan }: HeroProps) {
  const [typedText, setTypedText] = useState("");

  useEffect(() => {
    const texts = [
      "Joki Tugas Cepat & Akurat",
      "Bebas Deadline & Stress",
      "Skripsi Auto ACC",
      "Nilai Memuaskan Tanpa Ribet",
    ];
    let idx = 0;
    let charIndex = 0;
    let currentText = "";
    let timeoutId: any;

    const typeWriter = () => {
      if (charIndex < texts[idx].length) {
        currentText += texts[idx].charAt(charIndex);
        setTypedText(currentText);
        charIndex++;
        timeoutId = setTimeout(typeWriter, 80);
      } else {
        timeoutId = setTimeout(() => {
          charIndex = 0;
          currentText = "";
          idx = (idx + 1) % texts.length;
          setTypedText("");
          typeWriter();
        }, 2500);
      }
    };

    typeWriter();

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <section id="beranda" className="relative pt-36 pb-20 px-6 overflow-hidden">
      <div className="absolute top-40 -left-32 w-96 h-96 bg-blue-600/20 rounded-full blur-[130px]"></div>
      <div className="absolute bottom-20 right-0 w-80 h-80 bg-orange-500/15 rounded-full blur-[120px]"></div>
      <div className="container mx-auto text-center relative z-10">
        <div className="inline-block px-4 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-sm font-semibold backdrop-blur-sm mb-6">
          ⚡ 24/7 Siap Bantu ⚡
        </div>
        <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-6 text-white">
          BUAT APA{" "}
          <span className="text-orange-500 underline decoration-blue-500 decoration-4">
            PUSING
          </span>
          <br />
          & BEGADANG?!
        </h1>
        <div className="text-xl md:text-2xl text-slate-300 mb-4">
          <span id="typewriter" className="font-bold text-blue-400">
            {typedText}
          </span>
          <span className="typed-cursor"></span>
        </div>
        <p className="text-base md:text-lg text-slate-400 max-w-2xl mx-auto mb-8">
          Ratusan mahasiswa & pelajar sudah terbantu. Dapatkan nilai maksimal
          tanpa ribet. <span className="text-orange-400 font-bold">#GasTerus</span>
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button
            variant="orange"
            onClick={scrollToLayanan}
          >
            <Zap className="w-5 h-5" /> Pesan Sekarang
          </Button>
          <Button
            variant="outlineOrange"
            onClick={() =>
              document.getElementById("testimoni")?.scrollIntoView({ behavior: "smooth" })
            }
          >
            <Users className="w-5 h-5 text-orange-400" /> Lihat Testimoni
          </Button>
        </div>
      </div>
    </section>
  );
}

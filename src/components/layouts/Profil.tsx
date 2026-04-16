import Image from "next/image";
import { Crown, BadgeCheck, ShieldCheck, FileText, Repeat } from "lucide-react";

export default function Profil() {
  return (
    <section id="profil" className="py-12 px-6 relative">
      <div className="container mx-auto max-w-5xl card-vibrant rounded-[2.5rem] p-8 md:p-10 border border-blue-500/30 relative overflow-hidden reveal">
        <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
          <div className="flex-shrink-0">
            <div className="relative">
              <Image
                src="/images/foto.webp"
                alt="Founder GasJoki"
                width={256}
                height={256}
                className="w-56 h-56 md:w-64 md:h-64 rounded-3xl object-cover border-4 border-blue-500/40 shadow-2xl transform hover:scale-105 transition duration-500"
              />
              <div className="absolute -bottom-3 -right-3 bg-orange-500 rounded-full p-2 shadow-lg">
                <Crown className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
          <div className="flex-1">
            <h2 className="text-3xl md:text-4xl font-extrabold mb-3 bg-gradient-to-r from-blue-400 to-orange-400 bg-clip-text text-transparent">
              Moh.Nafis Husen Romadani, S.Pd.
            </h2>
            <p className="text-blue-300 font-semibold mb-4 flex items-center gap-2">
              <BadgeCheck className="w-5 h-5" /> Founder & Lead Academic Specialist
            </p>
            <div className="text-slate-300 leading-relaxed space-y-4 text-base text-justify">
              <p>
                Bukan sekadar joki biasa. Kami merupakan tim profesional dengan
                member lulusan kampus terbaik, paham betul standar akademik dari
                sekolah hingga pascasarjana. Didirikan 2024,{" "}
                <span className="text-white font-bold">GasJoki.id</span> hadir
                karena satu keyakinan:{" "}
                <span className="text-orange-300">
                  "Tugas berat bukan berarti harus mengorbankan kesehatan mental dan
                  waktu istirahat."
                </span>
              </p>
              <p>
                Setiap pengerjaan melalui 3 tahap: riset mendalam, penulisan
                sesuai standar ilmiah, dan cek turnitin. Kami menjaga privasi dan
                menjamin orisinalitas. Kamu tinggal duduk manis, kami gas pol!
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                <span className="bg-blue-500/20 px-3 py-1 rounded-full text-sm flex items-center gap-1 text-slate-200">
                  <ShieldCheck className="w-4 h-4" /> 100% Aman
                </span>
                <span className="bg-orange-500/20 px-3 py-1 rounded-full text-sm flex items-center gap-1 text-slate-200">
                  <FileText className="w-4 h-4" /> Anti Plagiat
                </span>
                <span className="bg-green-500/20 px-3 py-1 rounded-full text-sm flex items-center gap-1 text-slate-200">
                  <Repeat className="w-4 h-4" /> Revisi Gratis
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

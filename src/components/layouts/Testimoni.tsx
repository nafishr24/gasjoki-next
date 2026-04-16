import prisma from "@/lib/prisma";
import type { Testimonial } from "@prisma/client";

export default async function Testimoni() {
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
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12 reveal">
          <h2 className="text-4xl font-extrabold text-white">
            💬 Apa Kata <span className="gradient-text">Mereka?</span>
          </h2>
          <p className="text-slate-400">
            Dipercaya 800+ klien dari berbagai universitas & sekolah
          </p>
        </div>
        
        {testimonies.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonies.map((testi) => (
              <div key={testi.id} className="card-testi p-6 rounded-2xl reveal">
                <div className="flex items-center gap-2 text-orange-400 mb-3">
                  ★★★★★
                </div>
                <p className="text-slate-200 italic">{testi.text}</p>
                <div className="flex items-center gap-3 mt-4">
                  <div className={`w-10 h-10 rounded-full ${testi.bgClass || "bg-blue-500/30"} flex items-center justify-center font-bold text-white`}>
                    {testi.initial}
                  </div>
                  <div>
                    <p className="font-bold text-white">{testi.name}</p>
                    <p className="text-xs text-slate-400">{testi.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-slate-400 italic">Belum ada testimoni.</p>
        )}
      </div>
    </section>
  );
}

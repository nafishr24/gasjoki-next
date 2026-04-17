"use client";

import { useState } from "react";
import type { Testimonial } from "@prisma/client";
import { Plus, Star } from "lucide-react";
import Button from "../ui/Button";
import TestiForm from "../../modals/TestiForm";

export default function TestimoniClient({ 
  initialTestimonials 
}: { 
  initialTestimonials: Testimonial[] 
}) {
  const [testimonies, setTestimonies] = useState<Testimonial[]>(initialTestimonials);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleNewTestimonial = (newTesti: Testimonial) => {
    setTestimonies((prev) => [newTesti, ...prev]);
  };

  // Duplicate for seamless marquee
  const displayTestimonies = [...testimonies, ...testimonies];

  return (
    <div className="container mx-auto px-4 max-w-7xl overflow-hidden flex flex-col items-center">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-extrabold text-white">
          💬 Apa Kata <span className="gradient-text">Mereka?</span>
        </h2>
        <p className="text-slate-400">
          Dipercaya 800+ klien dari berbagai universitas & sekolah
        </p>
      </div>

      {testimonies.length > 0 ? (
        <div className="relative group pause-on-hover w-full overflow-x-auto md:overflow-hidden scrollbar-hide cursor-grab active:cursor-grabbing">
          <div className="flex animate-marquee gap-6 py-4 w-max flex-nowrap">
            {/* First Set */}
            <div className="flex gap-6 shrink-0 px-3">
              {testimonies.map((testi) => (
                <div 
                  key={`set1-${testi.id}`} 
                  className="card-testi p-6 rounded-2xl min-w-[320px] max-w-[320px] flex flex-col h-full"
                >
                  <div className="flex items-center gap-1 text-orange-400 mb-3">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-4 h-4 ${i < (testi.rating || 5) ? "fill-orange-400" : "text-slate-600"}`} 
                      />
                    ))}
                  </div>
                  <p className="text-slate-200 italic line-clamp-4 flex-grow text-sm leading-relaxed">{testi.text}</p>
                  <div className="flex items-center gap-3 mt-4 pt-4 border-t border-white/5">
                    <div 
                      className="w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center font-bold text-white shadow-lg"
                      style={{ backgroundColor: testi.bgClass || "#3b82f6" }}
                    >
                      {testi.initial}
                    </div>
                    <div className="overflow-hidden">
                      <p className="font-bold text-white truncate text-sm">{testi.name}</p>
                      <p className="text-xs text-slate-400 truncate">{testi.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/* Second Set (Duplicate for seamlessness) */}
            <div className="flex gap-6 shrink-0 px-3">
              {testimonies.map((testi) => (
                <div 
                  key={`set2-${testi.id}`} 
                  className="card-testi p-6 rounded-2xl min-w-[320px] max-w-[320px] flex flex-col h-full"
                >
                  <div className="flex items-center gap-1 text-orange-400 mb-3">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-4 h-4 ${i < (testi.rating || 5) ? "fill-orange-400" : "text-slate-600"}`} 
                      />
                    ))}
                  </div>
                  <p className="text-slate-200 italic line-clamp-4 flex-grow text-sm leading-relaxed">{testi.text}</p>
                  <div className="flex items-center gap-3 mt-4 pt-4 border-t border-white/5">
                    <div 
                      className="w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center font-bold text-white shadow-lg"
                      style={{ backgroundColor: testi.bgClass || "#3b82f6" }}
                    >
                      {testi.initial}
                    </div>
                    <div className="overflow-hidden">
                      <p className="font-bold text-white truncate text-sm">{testi.name}</p>
                      <p className="text-xs text-slate-400 truncate">{testi.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Gradient Overlays for smooth entry/exit */}
          <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-[#051231]/80 to-transparent z-10 pointer-events-none"></div>
          <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-[#051231]/80 to-transparent z-10 pointer-events-none"></div>
        </div>
      ) : (
        <p className="text-center text-slate-400 italic">Belum ada testimoni.</p>
      )}

      <div className="mt-8 text-center">
        <Button 
          variant="animated-gradient" 
          onClick={() => setIsModalOpen(true)}
          className="group"
        >
          <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform" />
          Tambah Testimoni
        </Button>
      </div>

      <TestiForm 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSuccess={handleNewTestimonial}
      />
    </div>
  );
}

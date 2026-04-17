"use client";

import { useState } from "react";
import { X, Star } from "lucide-react";
import Button from "../components/ui/Button";
import { createTestimonial } from "../app/actions/testimonial";

interface Testimonial {
  id: number;
  text: string;
  name: string;
  role: string;
  initial: string;
  bgClass: string;
  rating: number;
  createdAt: Date;
}

export default function TestiForm({
  isOpen,
  onClose,
  onSuccess,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (testi: Testimonial) => void;
}) {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [rating, setRating] = useState(5);
  const [text, setText] = useState("");
  const [bgClass, setBgClass] = useState("#3b82f6");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const result = await createTestimonial({
      name,
      role,
      rating,
      text,
      bgClass,
    });

    setIsSubmitting(false);
    if (result.success) {
      onSuccess(result.data);
      onClose();
      // Reset form
      setName("");
      setRole("");
      setRating(5);
      setText("");
      setBgClass("#3b82f6");
    } else {
      alert(result.error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm -z-10 w-full h-full"
        onClick={onClose}
      ></div>
      <div className="bg-slate-900 border border-slate-700 w-full max-w-md rounded-2xl shadow-2xl relative animate-in fade-in zoom-in duration-300">
        <Button
          variant="close"
          onClick={onClose}
          className="absolute right-5 top-5 z-10"
        >
          <X className="w-5 h-5" />
        </Button>

        <div className="p-6 md:p-8">
          <h3 className="text-2xl font-bold text-white mb-6 text-center">
            Bagikan <span className="gradient-text">Pengalamanmu</span>
          </h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1">
                Nama Lengkap
              </label>
              <input
                type="text"
                required
                maxLength={100}
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Contoh: Dina Ananda"
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1">
                Asal Sekolah / Kampus
              </label>
              <input
                type="text"
                required
                maxLength={100}
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder="Contoh: Universitas Indonesia"
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">
                Rating
              </label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className="focus:outline-none transition-transform hover:scale-110"
                  >
                    <Star
                      className={`w-8 h-8 ${
                        star <= rating
                          ? "fill-orange-400 text-orange-400"
                          : "text-slate-600"
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1">
                Testimoni
              </label>
              <textarea
                required
                rows={4}
                maxLength={1000}
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Ceritakan pengalamanmu menggunakan layanan kami..."
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">
                Warna Inisial
              </label>
              <div className="flex items-center gap-4">
                <input
                  type="color"
                  value={bgClass}
                  onChange={(e) => setBgClass(e.target.value)}
                  className="w-12 h-12 rounded-lg cursor-pointer bg-transparent border-none"
                />
                <div 
                  className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-white shadow-lg"
                  style={{ backgroundColor: bgClass }}
                >
                  {name ? name.charAt(0).toUpperCase() : "?"}
                </div>
                <span className="text-xs text-slate-500 uppercase font-mono">{bgClass}</span>
              </div>
            </div>

            <Button
              type="submit"
              variant="animated-gradient"
              fullWidth
              disabled={isSubmitting}
              className="mt-6"
            >
              {isSubmitting ? "Mengirim..." : "Kirim Testimoni"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

import { useState } from "react";
import { X, Send } from "lucide-react";
import Button from "../ui/Button";

interface OrderFormProps {
  isOpen: boolean;
  onClose: () => void;
  service: string;
}

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WA_NUMBER || "6287701330823";

export default function OrderForm({
  isOpen,
  onClose,
  service,
}: OrderFormProps) {
  const [nama, setNama] = useState("");
  const [instansi, setInstansi] = useState("");
  const [bantuan, setBantuan] = useState("");

  // Menyesuaikan label berdasarkan jenis layanan
  const isKuliah =
    service.toLowerCase().includes("kuliah") ||
    service.toLowerCase().includes("skripsi") ||
    service.toLowerCase().includes("tesis");

  const instansiLabel = isKuliah ? "Asal Perguruan Tinggi" : "Asal Sekolah";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nama || !instansi || !bantuan) return;

    // Memformat pesan untuk WhatsApp
    const message = `Halo nama saya ${nama} dari ${instansi}. Saya ingin ${bantuan} ke GasJoki.id, apakah dapat berdiskusi lebih lanjut?`;
    const encoded = encodeURIComponent(message);

    window.open(
      `https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}&text=${encoded}`,
      "_blank",
    );

    // Opsional: bersihkan form dan tutup
    setNama("");
    setInstansi("");
    setBantuan("");
    onClose();
  };

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-all duration-300 ease-out ${
        isOpen
          ? "opacity-100 visible pointer-events-auto"
          : "opacity-0 invisible pointer-events-none"
      }`}
    >
      <div 
        className="absolute inset-0 w-full h-full" 
        onClick={onClose}
      ></div>
      <div
        className={`bg-slate-900 border border-slate-700 w-full max-w-md rounded-2xl shadow-2xl relative transform transition-all duration-300 ease-out ${
          isOpen
            ? "scale-100 opacity-100 translate-y-0"
            : "scale-90 opacity-0 translate-y-4"
        }`}
      >
        <Button
          variant="close"
          onClick={onClose}
          className="absolute right-5 top-5 z-10"
        >
          <X className="w-5 h-5" />
        </Button>

        <div className="p-6 md:p-8">
          <h3 className="text-2xl font-bold text-white mb-2">Form Pemesanan</h3>
          <p className="text-slate-400 text-sm mb-6">
            Layanan terpilih:{" "}
            <span className="text-orange-400 font-semibold">{service}</span>
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">
                Nama Lengkap
              </label>
              <input
                type="text"
                required
                value={nama}
                onChange={(e) => setNama(e.target.value)}
                className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                placeholder="Masukkan nama Anda"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">
                {instansiLabel}
              </label>
              <input
                type="text"
                required
                value={instansi}
                onChange={(e) => setInstansi(e.target.value)}
                className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                placeholder={`Masukkan ${instansiLabel.toLowerCase()}`}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">
                Apa yang bisa kami bantu?
              </label>
              <textarea
                required
                value={bantuan}
                onChange={(e) => setBantuan(e.target.value)}
                className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors h-28 resize-none"
                placeholder="Jelaskan jenis tugas, deadline, dan detail lainnya..."
              ></textarea>
            </div>

            <div className="pt-2">
              <Button
                variant="gradient"
                fullWidth
                type="submit"
              >
                <Send className="w-5 h-5" /> Lanjut ke WhatsApp
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

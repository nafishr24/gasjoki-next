import { useState } from "react";
import { X, ChevronDown } from "lucide-react";
import Button from "../ui/Button";

interface FAQ {
  id: number;
  question: string;
  answer: string;
}

const faqs: FAQ[] = [
  {
    id: 1,
    question: "Siapa kita?",
    answer:
      "GasJoki.id adalah tim profesional dengan member lulusan kampus terbaik yang siap membantu menyelesaikan tugas-tugas akademik Anda dari tingkat sekolah hingga pascasarjana. Kami didirikan sejak 2024 dengan komitmen penuh pada kualitas dan orisinalitas.",
  },
  {
    id: 2,
    question: "Layanan apa yang kita berikan?",
    answer:
      "Kami menawarkan bantuan penyelesaian Tugas Sekolah (PR, laporan praktikum), Tugas Kuliah (Makalah, jurnal, SPSS, Matlab), hingga Skripsi & Tesis (Bimbingan Bab 1-5, olah data kuantitatif/kualitatif, revisi). Semua layanan dilengkapi garansi anti plagiat dan revisi gratis.",
  },
];

export default function FAQModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [activeId, setActiveId] = useState<number | null>(null);

  const toggleAccordion = (id: number) => {
    setActiveId((prev) => (prev === id ? null : id));
  };

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center p-4 ${
        isOpen ? "faq-overlay-open" : "faq-overlay-closed"
      }`}
    >
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm -z-10 w-full h-full"
        onClick={onClose}
      ></div>
      <div
        className={`bg-slate-900 border border-slate-700 w-full max-w-md rounded-2xl shadow-2xl relative ${
          isOpen ? "faq-modal-open" : "faq-modal-closed"
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
          <h3 className="text-2xl font-bold text-white mb-6 text-center pr-4">
            FAQ & Pertanyaan
          </h3>

          <div className="space-y-4">
            {faqs.map((faq) => (
              <div
                key={faq.id}
                className="border border-slate-700 rounded-xl overflow-hidden bg-slate-800/50"
              >
                <Button
                  variant="unstyled"
                  onClick={() => toggleAccordion(faq.id)}
                  className="w-full text-left px-5 py-4 flex justify-between items-center text-slate-200 font-medium hover:bg-slate-800/80 transition-colors focus:outline-none"
                >
                  <span className="pr-4">{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-300 ${activeId === faq.id ? "rotate-180" : ""}`}
                  />
                </Button>
                <div
                  className={`overflow-hidden transition-[max-height,opacity] duration-300 ease-in-out ${activeId === faq.id ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}
                >
                  <p className="px-5 pb-4 pt-1 text-slate-400 text-sm leading-relaxed border-t border-slate-700/50 mt-1 pt-3">
                    {faq.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

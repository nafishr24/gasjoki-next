import { Rocket, Award, Lock, CreditCard } from "lucide-react";

export default function WhyChooseUs() {
  const reasons = [
    { title: "Super Cepat", desc: "Deadline mepet? Kami bisa kerjakan dalam hitungan jam.", Icon: Rocket, iconColor: "text-blue-400", bg: "bg-blue-500/20" },
    { title: "Lulusan Ahli", desc: "Tim dari UI, ITB, UGM berpengalaman di bidangnya.", Icon: Award, iconColor: "text-orange-400", bg: "bg-orange-500/20" },
    { title: "100% Privasi", desc: "Data dan identitas dijamin rahasia, tidak bocor.", Icon: Lock, iconColor: "text-blue-400", bg: "bg-blue-500/20" },
    { title: "Harga Bersahabat", desc: "Sesuai kantong mahasiswa, ada promo untuk first order.", Icon: CreditCard, iconColor: "text-orange-400", bg: "bg-orange-500/20" },
  ];

  return (
    <section className="py-12 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12 reveal">
          <h2 className="text-4xl font-extrabold text-white">
            Kenapa Pilih <span className="gradient-text">GasJoki.id</span>?
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-orange-500 mx-auto mt-3 rounded-full"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reasons.map((reason, idx) => (
            <div key={idx} className="card-why p-6 rounded-2xl text-center transition-all hover:border-blue-400/50 reveal">
              <div className={`w-14 h-14 ${reason.bg} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                <reason.Icon className={`w-8 h-8 ${reason.iconColor}`} />
              </div>
              <h3 className="text-xl font-bold mb-2 text-white">{reason.title}</h3>
              <p className="text-slate-300 text-sm">{reason.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

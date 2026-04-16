import { CheckCircle, Star, Clock } from "lucide-react";

export default function Stats() {
  const statsData = [
    { target: 847, suffix: "+", label: "Tugas Terselesaikan", Icon: CheckCircle, iconColor: "text-blue-400" },
    { target: 98, suffix: "%", label: "Kepuasan Klien", Icon: Star, iconColor: "text-orange-400" },
    { target: 24, suffix: "/7", label: "Dukungan Cepat", Icon: Clock, iconColor: "text-blue-400" },
  ];

  return (
    <section className="py-8 px-6 container mx-auto max-w-6xl">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
        {statsData.map((stat, idx) => (
          <div key={idx} className="card-vibrant rounded-2xl p-6 reveal">
            <stat.Icon className={`w-10 h-10 ${stat.iconColor} mx-auto mb-3`} />
            <div className="text-4xl md:text-5xl font-black text-white">
              <span className="counter" data-target={stat.target}>
                0
              </span>
              {stat.suffix}
            </div>
            <p className="text-slate-300 font-semibold mt-2">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

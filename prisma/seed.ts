import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";
import "dotenv/config";

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  const testimonies = [
    {
      text: '"Skripsi saya beres dalam 2 minggu! Tim GasJoki sangat profesional, revisi dikit langsung ACC. Rekomendasi banget!"',
      initial: "DA",
      name: "Dina A.",
      role: "Mahasiswa Psikologi UI",
      bgClass: "#3b82f6",
      rating: 5,
    },
    {
      text: '"Tugas kuliah numpuk, saya order 3 makalah sekaligus. Hasilnya memuaskan, nggak ada revisi berarti. Thank you GasJoki!"',
      initial: "RA",
      name: "Rizky F.",
      role: "Teknik Informatika ITB",
      bgClass: "#f97316",
      rating: 5,
    },
    {
      text: '"Awalnya ragu, ternyata amanah banget. Olah data SPSS selesai 3 jam, dan dijelasin step by step. Top markotop!"',
      initial: "SN",
      name: "Siti N.",
      role: "Ekonomi UGM",
      bgClass: "#3b82f6",
      rating: 4,
    },
  ];

  console.log("Seeding testimonials...");

  for (const testi of testimonies) {
    await prisma.testimonial.create({
      data: testi,
    });
  }

  console.log("Seeding finished.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

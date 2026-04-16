import prisma from "@/lib/prisma";
import type { Testimonial } from "@prisma/client";
import TestimoniClient from "./TestimoniClient";

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
      <TestimoniClient initialTestimonials={testimonies} />
    </section>
  );
}

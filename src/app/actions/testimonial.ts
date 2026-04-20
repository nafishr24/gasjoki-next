"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createTestimonial(formData: {
  name: string;
  role: string;
  rating: number;
  text: string;
  bgClass: string;
}) {
  try {
    // Generate initial from name safely
    const initial = formData.name
      .trim()
      .split(/\s+/)
      .map((n) => n[0] || "")
      .join("")
      .toUpperCase()
      .slice(0, 2) || "?";

    const testimonial = await prisma.testimonial.create({
      data: {
        name: formData.name,
        role: formData.role,
        rating: formData.rating,
        text: formData.text,
        bgClass: formData.bgClass,
        initial,
      },
    });

    revalidatePath("/");
    return { success: true, data: testimonial };
  } catch (error) {
    console.error("Error creating testimonial:", error);
    return { success: false, error: "Gagal menyimpan testimoni" };
  }
}

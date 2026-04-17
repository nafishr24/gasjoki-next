"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { z } from "zod";

// Validation schema
const testimonialSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Nama minimal 2 karakter")
    .max(100, "Nama maksimal 100 karakter"),
  role: z
    .string()
    .trim()
    .min(2, "Profesi minimal 2 karakter")
    .max(100, "Profesi maksimal 100 karakter"),
  rating: z
    .number()
    .int()
    .min(1, "Rating minimal 1")
    .max(5, "Rating maksimal 5"),
  text: z
    .string()
    .trim()
    .min(10, "Testimoni minimal 10 karakter")
    .max(1000, "Testimoni maksimal 1000 karakter"),
  bgClass: z
    .string()
    .regex(/^#[0-9A-Fa-f]{6}$/, "Warna harus format hex yang valid"),
});

export async function createTestimonial(formData: {
  name: string;
  role: string;
  rating: number;
  text: string;
  bgClass: string;
}) {
  try {
    // Validate input
    const validatedData = testimonialSchema.parse(formData);

    // Generate initial from name
    const initial = validatedData.name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);

    const testimonial = await prisma.testimonial.create({
      data: {
        name: validatedData.name,
        role: validatedData.role,
        rating: validatedData.rating,
        text: validatedData.text,
        bgClass: validatedData.bgClass,
        initial,
      },
    });

    revalidatePath("/");
    return { success: true, data: testimonial };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const messages = error.errors.map((e) => e.message).join(", ");
      return { success: false, error: messages };
    }
    console.error("Error creating testimonial:", error);
    return { success: false, error: "Gagal menyimpan testimoni" };
  }
}

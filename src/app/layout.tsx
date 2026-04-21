import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google"; // Add this
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({ 
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "GasJoki - Jasa Joki Tugas Terpercaya",
  description: "Layanan joki tugas profesional dan terpercaya untuk berbagai jenjang pendidikan",
  openGraph: {
    title: "GasJoki - Jasa Joki Tugas Terpercaya",
    description: "Layanan joki tugas profesional dan terpercaya untuk berbagai jenjang pendidikan",
    url: "https://gasjoki-next.vercel.app",
    siteName: "GasJoki",
    images: [
      {
        url: "https://res.cloudinary.com/dyplzsvpr/image/upload/f_auto,q_auto/open-graph-image_omhwpf",
        width: 1200,
        height: 630,
        alt: "GasJoki Thumbnail Image",
      },
    ],
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "GasJoki - Jasa Joki Tugas Terpercaya",
    description: "Layanan joki tugas profesional dan terpercaya untuk berbagai jenjang pendidikan",
    images: ["https://res.cloudinary.com/dyplzsvpr/image/upload/f_auto,q_auto/open-graph-image_omhwpf"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body className={`${plusJakarta.className} antialiased`} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}

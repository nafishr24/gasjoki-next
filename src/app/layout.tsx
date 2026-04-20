import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google"; // Add this
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({ 
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "GasJoki - Jasa Joki Game Terpercaya",
  description: "Layanan joki game profesional dan terpercaya untuk berbagai jenis game populer.",
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

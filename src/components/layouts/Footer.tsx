"use client";

import Image from "next/image";
import { MessageCircle, Mail } from "lucide-react";
import Button from "../ui/Button";

interface FooterProps {
  pesanWA: (jasa: string) => void;
}

export default function Footer({ pesanWA }: FooterProps) {
  return (
    <footer className="py-12 px-6 border-t border-white/5 bg-black/40">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
        <div>
          <Image
            src="/images/logo.webp"
            alt="GasJoki.id"
            width={160}
            height={80}
            className="h-20 md:h-25 w-auto object-contain mx-auto md:mx-0"
          />
          <p className="text-slate-500 text-sm mt-2">#GasTerusTanpaBeban</p>
        </div>
        <div className="flex space-x-5">
          <a
            href="https://instagram.com/gasjoki.id"
            target="_blank"
            rel="noreferrer"
            className="p-3 bg-blue-600/20 hover:bg-blue-600 text-blue-400 hover:text-white rounded-full transition-all flex items-center justify-center relative top-[-4px]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
            </svg>
          </a>
          <Button
            id="waFooterLink"
            variant="unstyled"
            className="p-3 bg-green-600/20 hover:bg-green-600 text-green-400 hover:text-white rounded-full transition-all"
            onClick={() => pesanWA("Konsultasi")}
          >
            <MessageCircle className="w-5 h-5" />
          </Button>
          <a
            href="mailto:nafishusenromadani@gmail.com"
            className="p-3 bg-slate-700/30 hover:bg-slate-600 text-slate-300 rounded-full transition-all"
          >
            <Mail className="w-5 h-5" />
          </a>
        </div>
      </div>
      <div className="mt-8 text-center text-slate-600 text-sm">
        &copy; 2025 GasJoki.id - Solusi Cerdas Akademik. All rights reserved.
      </div>
    </footer>
  );
}

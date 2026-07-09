import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";

import BrandMark from "@/components/BrandMark";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Contact | Prestigious Tech",
  description:
    "Start a Prestigious Tech project inquiry for websites, automation systems, growth funnels, and digital operations.",
};

export default function ContactPage() {
  return (
    <main className="min-h-dvh overflow-x-clip bg-prestige-canvas text-prestige-ink">
      <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-5">
        <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-3 rounded-[1.35rem] border border-white/10 bg-[#0b0707]/82 px-3 shadow-[0_18px_60px_rgba(0,0,0,0.36)] backdrop-blur-xl sm:px-4">
          <Link
            href="/"
            aria-label="Prestigious Tech home"
            className="flex min-w-0 items-center gap-3 rounded-[1rem] px-1 py-1 text-prestige-ink transition duration-300 hover:text-prestige-gold"
          >
            <BrandMark className="h-10 w-10" />
            <span className="hidden font-mono text-[0.68rem] font-semibold uppercase tracking-[0.24em] sm:block">
              Prestigious Tech
            </span>
          </Link>

          <nav aria-label="Contact page navigation" className="flex min-w-0 items-center justify-end gap-2">
            <Link
              href="/#services"
              className="hidden h-10 items-center justify-center rounded-full border border-white/10 px-4 font-mono text-[0.62rem] uppercase tracking-[0.18em] text-prestige-muted transition duration-300 hover:border-prestige-gold/40 hover:text-prestige-ink sm:inline-flex"
            >
              Services
            </Link>
            <Link
              href="/"
              className="inline-flex h-10 items-center justify-center gap-2 rounded-full border border-white/10 px-3 font-mono text-[0.62rem] uppercase tracking-[0.16em] text-prestige-muted transition duration-300 hover:border-prestige-gold/40 hover:text-prestige-ink sm:px-4"
            >
              <ArrowLeft size={14} />
              <span className="hidden sm:inline">Back home</span>
              <span className="sm:hidden">Home</span>
            </Link>
            <a
              href="mailto:systems@presitgious.tech"
              className="inline-flex h-10 items-center justify-center gap-2 rounded-full border border-prestige-gold/40 bg-prestige-gold px-3 font-mono text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-[#170705] transition duration-300 hover:bg-prestige-ink sm:px-4"
            >
              Email
              <ArrowUpRight size={14} />
            </a>
          </nav>
        </div>
      </header>

      <Contact />
      <Footer />
    </main>
  );
}

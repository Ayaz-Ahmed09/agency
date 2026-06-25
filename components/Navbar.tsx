"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback, useRef } from "react";
import {
  Bot,
  Briefcase,
  FolderOpen,
  GitBranch,
  Globe2,
  HelpCircle,
  Home,
  LayoutDashboard,
  Mail,
  Menu,
  X,
} from "lucide-react";
import BrandMark from "@/components/BrandMark";

const navLinks = [
  { id: "hero", name: "Hero", href: "#hero", icon: Home },
  { id: "services", name: "Services", href: "#services", icon: Briefcase },
  { id: "about", name: "About", href: "#about", icon: Globe2 },
  { id: "automations", name: "Automations", href: "#automations", icon: Bot },
  { id: "case-studies", name: "Case studies", href: "#case-studies", icon: FolderOpen },
  { id: "process", name: "Process", href: "#process", icon: GitBranch },
  { id: "faq", name: "FAQ", href: "#faq", icon: HelpCircle },
  { id: "contact", name: "Contact", href: "#contact", icon: Mail },
  { id: "admin", name: "Cockpit", href: "/admin", icon: LayoutDashboard },
] as const;

type NavbarProps = {
  activeId?: string;
  visible?: boolean;
};

export default function Navbar({ activeId = "hero", visible = true }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [autoHidden, setAutoHidden] = useState(false);
  const lastScrollY = useRef(0);
  const scrollDelta = useRef(0);
  const rafRef = useRef<number>(0);

  // Auto-hide on scroll down, show on scroll up
  const handleScroll = useCallback(() => {
    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      const currentY = window.scrollY;
      const delta = currentY - lastScrollY.current;
      scrollDelta.current = delta;

      if (Math.abs(delta) < 2) return;

      if (delta > 0 && currentY > 80) {
        // Scrolling down — hide
        setAutoHidden(true);
      } else {
        // Scrolling up — show
        setAutoHidden(false);
      }

      lastScrollY.current = currentY;
    });
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(rafRef.current);
    };
  }, [handleScroll]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isOpen]);

  const showNavbar = visible && !autoHidden;

  return (
    <>
      <button
        onClick={() => setIsOpen((v) => !v)}
        aria-label={isOpen ? "Close navigation" : "Open navigation"}
        aria-expanded={isOpen}
        aria-controls="mobile-navigation"
        className="fixed left-4 top-4 z-[60] flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-[#0b0707]/88 text-prestige-ink shadow-[0_8px_32px_rgba(0,0,0,0.6)] backdrop-blur-md transition-all duration-300 hover:border-prestige-gold/40 hover:text-prestige-gold active:scale-95 md:hidden"
      >
        <AnimatePresence mode="wait" initial={false}>
          {isOpen ? (
            <motion.div
              key="x"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.18, ease: [0.23, 1, 0.32, 1] }}
            >
              <X size={18} strokeWidth={1.8} />
            </motion.div>
          ) : (
            <motion.div
              key="menu"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.18, ease: [0.23, 1, 0.32, 1] }}
            >
              <Menu size={18} strokeWidth={1.8} />
            </motion.div>
          )}
        </AnimatePresence>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[55] bg-black/40 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.nav
            id="mobile-navigation"
            key="mobile-navigation"
            initial={{ opacity: 0, y: -16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            transition={{ duration: 0.24, ease: [0.23, 1, 0.32, 1] }}
            className="fixed inset-x-3 top-16 z-[56] md:hidden"
          >
            <div className="liquid-fixed max-h-[calc(100dvh-5.25rem)] overflow-y-auto rounded-[1.35rem] p-3">
              <Link
                href="#hero"
                aria-label="Presitgious Tech home"
                className="mb-2 flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-3 py-3 text-prestige-ink transition duration-200 hover:border-white/16"
                onClick={() => setIsOpen(false)}
              >
                <BrandMark className="h-8 w-8 shrink-0" />
                <span className="font-mono text-[0.68rem] font-semibold uppercase tracking-[0.22em]">
                  Presitgious Tech
                </span>
              </Link>

              <div className="grid gap-2">
                {navLinks.map((link) => {
                  const Icon = link.icon;
                  const isActive = activeId === link.id;

                  return (
                    <Link
                      key={link.id}
                      href={link.href}
                      aria-current={isActive ? "page" : undefined}
                      className={`flex min-h-12 items-center gap-3 rounded-2xl border px-3 py-3 transition duration-200 ${
                        isActive
                          ? "border-prestige-gold/40 bg-prestige-gold/12 text-prestige-gold"
                          : "border-white/8 bg-white/[0.02] text-prestige-muted hover:border-white/16 hover:text-prestige-ink"
                      }`}
                      onClick={() => setIsOpen(false)}
                    >
                      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-white/10 bg-white/[0.025]">
                        <Icon size={17} strokeWidth={1.8} />
                      </span>
                      <span className="font-mono text-[0.68rem] font-semibold uppercase tracking-[0.2em]">
                        {link.name}
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {visible && (
          <motion.nav
            key="desktop-sidebar"
            initial={{ opacity: 0, x: -18 }}
            animate={{
              opacity: showNavbar ? 1 : 0,
              x: showNavbar ? 0 : -18,
            }}
            exit={{ opacity: 0, x: -18 }}
            transition={{ duration: 0.28, ease: [0.23, 1, 0.32, 1] }}
            className="fixed left-4 top-1/2 z-[56] hidden -translate-y-1/2 md:block"
            style={{ pointerEvents: showNavbar ? "auto" : "none" }}
          >
            <div className="liquid-fixed flex flex-col items-center gap-3 rounded-[1.75rem] px-2 py-3">
              <Link
                href="#hero"
                aria-label="Presitgious Tech home"
                className="mb-1 flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] text-prestige-ink transition duration-200 hover:border-white/16"
                onClick={() => setIsOpen(false)}
              >
                <BrandMark className="h-7 w-7" />
              </Link>
              {navLinks.map((link) => {
                const Icon = link.icon;
                const isActive = activeId === link.id;

                return (
                  <Link
                    key={link.id}
                    href={link.href}
                    aria-label={link.name}
                    aria-current={isActive ? "page" : undefined}
                    title={link.name}
                    className={`group relative flex h-11 w-11 items-center justify-center rounded-2xl border transition duration-200 ${
                      isActive
                        ? "border-prestige-gold/40 bg-prestige-gold/12 text-prestige-gold"
                        : "border-white/8 bg-white/[0.02] text-prestige-muted hover:border-white/16 hover:text-prestige-ink"
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    <Icon size={17} strokeWidth={1.8} />
                    <span className="pointer-events-none absolute left-[calc(100%+0.8rem)] top-1/2 hidden -translate-y-1/2 rounded-full border border-white/10 bg-[#120c0b]/92 px-3 py-1 font-mono text-[0.6rem] uppercase tracking-[0.22em] text-prestige-ink opacity-0 transition duration-200 group-hover:opacity-100 lg:block">
                      {link.name}
                    </span>
                  </Link>
                );
              })}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}

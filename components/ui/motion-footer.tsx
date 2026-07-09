"use client";

import * as React from "react";
import { useEffect, useRef } from "react";
import { ArrowUp, Heart, LayoutDashboard, Mail, ShieldCheck, Sparkles } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800;900&display=swap');

.cinematic-footer-wrapper {
  font-family: 'Plus Jakarta Sans', var(--font-geist-sans), system-ui, sans-serif;
  -webkit-font-smoothing: antialiased;

  --footer-ink: var(--prestige-ink, #f5f1ea);
  --footer-muted: var(--prestige-muted, #a59b93);
  --footer-canvas: var(--prestige-canvas, #0b0707);
  --footer-panel: var(--prestige-panel, #151010);
  --footer-gold: var(--prestige-gold, #ff5a1f);
  --footer-gold-deep: var(--prestige-gold-deep, #6d120d);

  --pill-bg-1: color-mix(in oklch, var(--footer-ink) 9%, transparent);
  --pill-bg-2: color-mix(in oklch, var(--footer-gold) 11%, transparent);
  --pill-shadow: color-mix(in oklch, black 65%, transparent);
  --pill-highlight: color-mix(in oklch, var(--footer-ink) 18%, transparent);
  --pill-inset-shadow: color-mix(in oklch, var(--footer-gold-deep) 40%, transparent);
  --pill-border: color-mix(in oklch, var(--footer-ink) 13%, transparent);

  --pill-bg-1-hover: color-mix(in oklch, var(--footer-gold) 28%, transparent);
  --pill-bg-2-hover: color-mix(in oklch, var(--footer-ink) 8%, transparent);
  --pill-border-hover: color-mix(in oklch, var(--footer-gold) 55%, transparent);
  --pill-shadow-hover: color-mix(in oklch, var(--footer-gold-deep) 75%, transparent);
  --pill-highlight-hover: color-mix(in oklch, var(--footer-ink) 28%, transparent);
}

@keyframes footer-breathe {
  0% { transform: translate(-50%, -50%) scale(1); opacity: 0.45; }
  100% { transform: translate(-50%, -50%) scale(1.12); opacity: 0.9; }
}

@keyframes footer-scroll-marquee {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}

@keyframes footer-heartbeat {
  0%, 100% { transform: scale(1); filter: drop-shadow(0 0 5px color-mix(in oklch, var(--footer-gold) 45%, transparent)); }
  15%, 45% { transform: scale(1.2); filter: drop-shadow(0 0 14px color-mix(in oklch, var(--footer-gold) 90%, transparent)); }
  30% { transform: scale(1); }
}

.animate-footer-breathe { animation: footer-breathe 8s ease-in-out infinite alternate; }
.animate-footer-scroll-marquee { animation: footer-scroll-marquee 40s linear infinite; }
.animate-footer-heartbeat { animation: footer-heartbeat 2s cubic-bezier(0.25, 1, 0.5, 1) infinite; }

.footer-bg-grid {
  background-size: 56px 56px;
  background-image:
    linear-gradient(to right, color-mix(in oklch, var(--footer-ink) 4%, transparent) 1px, transparent 1px),
    linear-gradient(to bottom, color-mix(in oklch, var(--footer-ink) 3%, transparent) 1px, transparent 1px);
  mask-image: linear-gradient(to bottom, transparent, black 24%, black 78%, transparent);
  -webkit-mask-image: linear-gradient(to bottom, transparent, black 24%, black 78%, transparent);
}

.footer-aurora {
  background:
    radial-gradient(circle at 50% 50%, color-mix(in oklch, var(--footer-gold) 32%, transparent) 0%, color-mix(in oklch, var(--footer-gold-deep) 24%, transparent) 42%, transparent 72%);
}

.footer-glass-pill {
  background: linear-gradient(145deg, var(--pill-bg-1) 0%, var(--pill-bg-2) 100%);
  box-shadow:
    0 10px 30px -10px var(--pill-shadow),
    inset 0 1px 1px var(--pill-highlight),
    inset 0 -1px 2px var(--pill-inset-shadow);
  border: 1px solid var(--pill-border);
  backdrop-filter: blur(18px) saturate(150%);
  -webkit-backdrop-filter: blur(18px) saturate(150%);
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.footer-glass-pill:hover {
  background: linear-gradient(145deg, var(--pill-bg-1-hover) 0%, var(--pill-bg-2-hover) 100%);
  border-color: var(--pill-border-hover);
  box-shadow:
    0 20px 44px -10px var(--pill-shadow-hover),
    inset 0 1px 1px var(--pill-highlight-hover);
  color: var(--footer-ink);
}

.footer-giant-bg-text {
  font-size: clamp(3rem, 18vw, 19rem);
  line-height: 0.72;
  font-weight: 900;
  letter-spacing: -0.085em;
  color: transparent;
  -webkit-text-stroke: 2px rgb(255 255 255 / 0.35);
}

@media (max-width: 640px) {
  .footer-giant-bg-text {
    font-size: clamp(2.7rem, 14.5vw, 4.8rem);
    letter-spacing: -0.075em;
    -webkit-text-stroke-width: 1.2px;
    bottom: 3.5rem;
  }

  .animate-footer-breathe {
    animation: none;
    opacity: 0.35;
  }

  .animate-footer-scroll-marquee {
    animation-duration: 25s;
  }
}

.footer-text-glow {
  background: linear-gradient(180deg, var(--footer-ink) 0%, color-mix(in oklch, var(--footer-ink) 54%, transparent) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
`;

export type MagneticButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    as?: React.ElementType;
  };

const MagneticButton = React.forwardRef<HTMLElement, MagneticButtonProps>(
  ({ className, children, as: Component = "button", ...props }, forwardedRef) => {
    const localRef = useRef<HTMLElement | null>(null);

    useEffect(() => {
      if (typeof window === "undefined") return;
      const element = localRef.current;
      if (!element) return;

      const ctx = gsap.context(() => {
        const handleMouseMove = (e: MouseEvent) => {
          const rect = element.getBoundingClientRect();
          const x = e.clientX - rect.left - rect.width / 2;
          const y = e.clientY - rect.top - rect.height / 2;

          gsap.to(element, {
            x: x * 0.22,
            y: y * 0.22,
            rotationX: -y * 0.08,
            rotationY: x * 0.08,
            scale: 1.035,
            ease: "power2.out",
            duration: 0.35,
          });
        };

        const handleMouseLeave = () => {
          gsap.to(element, {
            x: 0,
            y: 0,
            rotationX: 0,
            rotationY: 0,
            scale: 1,
            ease: "elastic.out(1, 0.35)",
            duration: 1,
          });
        };

        element.addEventListener("mousemove", handleMouseMove);
        element.addEventListener("mouseleave", handleMouseLeave);

        return () => {
          element.removeEventListener("mousemove", handleMouseMove);
          element.removeEventListener("mouseleave", handleMouseLeave);
        };
      }, element);

      return () => ctx.revert();
    }, []);

    return (
      <Component
        ref={(node: HTMLElement | null) => {
          localRef.current = node;
          if (typeof forwardedRef === "function") forwardedRef(node);
          else if (forwardedRef) (forwardedRef as React.MutableRefObject<HTMLElement | null>).current = node;
        }}
        className={cn("cursor-pointer will-change-transform", className)}
        {...props}
      >
        {children}
      </Component>
    );
  }
);
MagneticButton.displayName = "MagneticButton";

const MarqueeItem = () => (
  <div className="flex items-center space-x-10 px-5">
    <span>Digital systems with taste</span> <Sparkles className="h-3.5 w-3.5 text-prestige-gold/70" />
    <span>Conversion-first websites</span> <Sparkles className="h-3.5 w-3.5 text-prestige-gold/70" />
    <span>AI workflow automation</span> <Sparkles className="h-3.5 w-3.5 text-prestige-gold/70" />
    <span>Tracking and growth engines</span> <Sparkles className="h-3.5 w-3.5 text-prestige-gold/70" />
    <span>Premium brand operations</span> <Sparkles className="h-3.5 w-3.5 text-prestige-gold/70" />
  </div>
);

export type CinematicFooterProps = {
  brandWord?: string;
  scrollRootSelector?: string;
};

export function CinematicFooter({ brandWord = "PRETIGIOUS", scrollRootSelector }: CinematicFooterProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const giantTextRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!wrapperRef.current) return;

    const isMobile = window.matchMedia("(max-width: 640px)").matches;

    const scroller = scrollRootSelector
      ? (document.querySelector<HTMLElement>(scrollRootSelector) ?? undefined)
      : undefined;

    const ctx = gsap.context(() => {
      // On mobile skip all GSAP scroll animations — they cause lag on low-end devices
      if (isMobile) return;

      gsap.fromTo(
        giantTextRef.current,
        { y: "10vh", scale: 0.88, opacity: 0 },
        {
          y: "0vh",
          scale: 1,
          opacity: 1,
          ease: "power1.out",
          scrollTrigger: {
            trigger: wrapperRef.current,
            scroller,
            start: "top 88%",
            end: "bottom bottom",
            scrub: 1,
          },
        }
      );

      gsap.fromTo(
        [headingRef.current, linksRef.current],
        { y: 42, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.14,
          ease: "power3.out",
          scrollTrigger: {
            trigger: wrapperRef.current,
            scroller,
            start: "top 70%",
            end: "center center",
            scrub: 1,
          },
        }
      );
    }, wrapperRef);

    const refresh = () => ScrollTrigger.refresh();
    scroller?.addEventListener("scroll", refresh, { passive: true });
    window.addEventListener("resize", refresh);
    ScrollTrigger.refresh();

    return () => {
      scroller?.removeEventListener("scroll", refresh);
      window.removeEventListener("resize", refresh);
      ctx.revert();
    };
  }, [scrollRootSelector]);

  const scrollToTop = () => {
    const scroller = scrollRootSelector ? document.querySelector<HTMLElement>(scrollRootSelector) : null;
    if (scroller) {
      scroller.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />

      <div
        ref={wrapperRef}
        className="relative h-[calc(100dvh-1.5rem)] min-h-[560px] w-full overflow-hidden md:h-[calc(100dvh-2rem)]"
        style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}
      >
        <footer className="absolute bottom-0 left-0 flex h-full min-h-0 w-full flex-col justify-between overflow-hidden bg-[#070303] text-prestige-ink cinematic-footer-wrapper">
          <div className="footer-bg-grid pointer-events-none absolute inset-0 z-0" />

          <div
            ref={giantTextRef}
            className="footer-giant-bg-text pointer-events-none absolute inset-x-0 bottom-3 z-0 select-none overflow-hidden whitespace-nowrap px-2 text-center opacity-90 sm:bottom-4"
          >
            {brandWord}
          </div>

          <div className="absolute left-0 top-8 z-10 w-full -rotate-2 scale-110 overflow-hidden border-y border-white/10 bg-[#0b0707]/70 py-3 shadow-2xl backdrop-blur-md sm:top-10 sm:py-4">
            <div className="flex w-max animate-footer-scroll-marquee font-mono text-[0.62rem] font-bold uppercase tracking-[0.3em] text-prestige-muted sm:text-xs md:text-sm">
              <MarqueeItem />
              <MarqueeItem />
            </div>
          </div>

          <div className="relative z-10 mx-auto mt-16 flex w-full max-w-5xl flex-1 -translate-y-14 flex-col items-center justify-center px-5 text-center sm:mt-20 md:-translate-y-16 md:px-6">
            <p className="mb-5 font-mono text-[0.64rem] font-semibold uppercase tracking-[0.34em] text-prestige-gold sm:mb-6">
              build • automate • grow
            </p>
            <h2
              ref={headingRef}
              className="footer-text-glow mb-5 max-w-4xl text-4xl font-black leading-[0.88] tracking-[-0.085em] sm:text-5xl md:mb-7 md:text-6xl lg:text-7xl"
            >
              Ready to build something sharper?
            </h2>

            <div ref={linksRef} className="flex w-full flex-col items-center gap-5">
              <div className="flex w-full flex-wrap justify-center gap-3 sm:gap-4">
                <MagneticButton
                  as="a"
                  href="mailto:systems@presitgious.tech"
                  className="footer-glass-pill group flex rounded-full px-6 py-3.5 text-sm font-bold text-prestige-ink sm:px-8 sm:py-4 md:text-base items-center gap-3"
                >
                  <Mail className="h-5 w-5 text-prestige-gold transition-colors group-hover:text-prestige-ink" />
                  Start a project
                </MagneticButton>

                <MagneticButton
                  as="a"
                  href="/admin"
                  className="footer-glass-pill group flex rounded-full px-6 py-3.5 text-sm font-bold text-prestige-ink sm:px-8 sm:py-4 md:text-base items-center gap-3"
                >
                  <LayoutDashboard className="h-5 w-5 text-prestige-gold transition-colors group-hover:text-prestige-ink" />
                  Operating cockpit
                </MagneticButton>
              </div>

              <div className="mt-1 flex w-full flex-wrap justify-center gap-2.5 sm:gap-3 md:gap-4">
                <MagneticButton as="a" href="/#services" className="footer-glass-pill rounded-full px-5 py-3 text-xs font-medium text-prestige-muted hover:text-prestige-ink md:text-sm">
                  Services
                </MagneticButton>
                <MagneticButton as="a" href="/#case-studies" className="footer-glass-pill rounded-full px-5 py-3 text-xs font-medium text-prestige-muted hover:text-prestige-ink md:text-sm">
                  Case studies
                </MagneticButton>
                <MagneticButton as="a" href="/#process" className="footer-glass-pill rounded-full px-5 py-3 text-xs font-medium text-prestige-muted hover:text-prestige-ink md:text-sm">
                  Process
                </MagneticButton>
                <MagneticButton as="a" href="/contact" className="footer-glass-pill rounded-full px-5 py-3 text-xs font-medium text-prestige-muted hover:text-prestige-ink md:text-sm">
                  Contact
                </MagneticButton>
              </div>
            </div>
          </div>

          <div className="relative z-20 flex w-full flex-col items-center justify-between gap-4 px-5 pb-5 md:flex-row md:px-10 lg:px-12">
            <div className="order-2 font-mono text-[0.58rem] font-semibold uppercase tracking-[0.24em] text-prestige-muted md:order-1 md:text-xs">
              © 2026 Prestigious Tech. All rights reserved.
            </div>


            <div className="order-3 flex items-center gap-3">
              <div className="hidden items-center gap-2 font-mono text-[0.58rem] uppercase tracking-[0.22em] text-prestige-muted sm:flex">
                <ShieldCheck className="h-4 w-4 text-prestige-gold" />
                controlled growth systems
              </div>
              <MagneticButton
                as="button"
                onClick={scrollToTop}
                aria-label="Back to top"
                className="footer-glass-pill group flex h-12 w-12 items-center justify-center rounded-full text-prestige-muted hover:text-prestige-ink"
              >
                <ArrowUp className="h-5 w-5 transition-transform duration-300 group-hover:-translate-y-1.5" />
              </MagneticButton>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}

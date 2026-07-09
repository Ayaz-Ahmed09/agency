"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Centralised GSAP scroll animation hook.
 * Handles all section animations via ScrollTrigger with the custom viewport scroller.
 * Mobile devices are excluded to avoid jank — the CSS/Framer Motion defaults kick in.
 */
export function useScrollAnimations(viewportRef: React.RefObject<HTMLElement | null>) {
  const ctxRef = useRef<gsap.Context | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const isMobile = window.matchMedia("(max-width: 640px)").matches;
    const scroller = viewportRef.current ?? undefined;

    if (!scroller) return;

    // Kill previous context to avoid duplicates in dev HMR
    ctxRef.current?.revert();

    ctxRef.current = gsap.context(() => {
      // ── 1. SERVICES CARD STACK ─────────────────────────────────────────
      // Each card slides in from alternating sides, then fades up
      const serviceCards = document.querySelectorAll<HTMLElement>("[data-service-card]");
      serviceCards.forEach((card, i) => {
        const dir = i % 2 === 0 ? -60 : 60;
        gsap.fromTo(
          card,
          { x: dir, opacity: 0, filter: "blur(6px)" },
          {
            x: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: 0.85,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              scroller,
              start: "top 88%",
              end: "top 55%",
              scrub: false,
            },
          }
        );
      });

      // ── 2. SECTION HEADINGS (shared pattern) ──────────────────────────
      // clip-path wipe from left + opacity
      const headings = document.querySelectorAll<HTMLElement>("[data-scroll-heading]");
      headings.forEach((el) => {
        gsap.fromTo(
          el,
          { clipPath: "inset(0 100% 0 0)", opacity: 0 },
          {
            clipPath: "inset(0 0% 0 0)",
            opacity: 1,
            duration: 1.1,
            ease: "power4.inOut",
            scrollTrigger: {
              trigger: el,
              scroller,
              start: "top 85%",
              end: "top 45%",
              scrub: false,
            },
          }
        );
      });

      // ── 3. PROCESS TIMELINE ─────────────────────────────────────────────
      // Horizontal slide of step cards with stagger
      const processSteps = document.querySelectorAll<HTMLElement>("[data-process-step]");
      if (processSteps.length) {
        gsap.fromTo(
          processSteps,
          { x: 80, opacity: 0, filter: "blur(4px)" },
          {
            x: 0,
            opacity: 1,
            filter: "blur(0px)",
            stagger: 0.14,
            duration: 0.75,
            ease: "power3.out",
            scrollTrigger: {
              trigger: processSteps[0].parentElement!,
              scroller,
              start: "top 78%",
              end: "top 30%",
              scrub: false,
            },
          }
        );
      }

      // ── 4. VERTICAL PROOF SLIDERS ───────────────────────────────────────
      // Cards scale in from small + fade
      const proofCards = document.querySelectorAll<HTMLElement>("[data-proof-card]");
      proofCards.forEach((card, i) => {
        gsap.fromTo(
          card,
          { scale: 0.82, opacity: 0, y: 40 },
          {
            scale: 1,
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "back.out(1.4)",
            scrollTrigger: {
              trigger: card,
              scroller,
              start: "top 86%",
              end: "top 50%",
              scrub: false,
            },
          }
        );
      });

      // ── 5. TESTIMONIAL SLIDER ────────────────────────────────────────────
      // Fade + subtle upward drift
      const testimonials = document.querySelectorAll<HTMLElement>("[data-testimonial]");
      if (testimonials.length) {
        gsap.fromTo(
          testimonials,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.12,
            duration: 0.85,
            ease: "power3.out",
            scrollTrigger: {
              trigger: testimonials[0].parentElement!,
              scroller,
              start: "top 80%",
              end: "top 40%",
              scrub: false,
            },
          }
        );
      }

      // ── 6. FAQ ACCORDION ─────────────────────────────────────────────────
      // Each FAQ item wipes in from left on scroll
      const faqItems = document.querySelectorAll<HTMLElement>("[data-faq-item]");
      faqItems.forEach((item) => {
        gsap.fromTo(
          item,
          { x: -40, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: item,
              scroller,
              start: "top 90%",
              end: "top 65%",
              scrub: false,
            },
          }
        );
      });

      // ── 7. AUTOMATION SHOWCASE CARDS ─────────────────────────────────────
      // Already handled by framer-motion whileInView, but add GSAP stagger backup
      const autoCards = document.querySelectorAll<HTMLElement>("[data-auto-card]");
      if (autoCards.length) {
        gsap.fromTo(
          autoCards,
          { y: 50, opacity: 0, scale: 0.94 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            stagger: 0.1,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: {
              trigger: autoCards[0].parentElement!,
              scroller,
              start: "top 82%",
              end: "top 40%",
              scrub: false,
            },
          }
        );
      }

      // ── 8. ABOUT / DOTTED MAP SECTION ────────────────────────────────────
      // Section heading wipe + map pins pop in sequentially
      const mapPins = document.querySelectorAll<HTMLElement>("[data-map-pin]");
      if (mapPins.length) {
        gsap.fromTo(
          mapPins,
          { scale: 0, opacity: 0, filter: "blur(8px)" },
          {
            scale: 1,
            opacity: 1,
            filter: "blur(0px)",
            stagger: 0.18,
            duration: 0.7,
            ease: "back.out(2)",
            scrollTrigger: {
              trigger: mapPins[0].parentElement!,
              scroller,
              start: "top 75%",
              end: "top 35%",
              scrub: false,
            },
          }
        );
      }

      // ── 9. STATS / METRICS COUNTER ───────────────────────────────────────
      // Count-up animation triggered on scroll
      const statEls = document.querySelectorAll<HTMLElement>("[data-stat]");
      statEls.forEach((el) => {
        const target = parseFloat(el.dataset.statTarget ?? "0");
        const suffix = el.dataset.statSuffix ?? "";
        const prefix = el.dataset.statPrefix ?? "";
        const isDecimal = target % 1 !== 0;

        gsap.fromTo(
          el,
          { textContent: "0" },
          {
            textContent: target,
            duration: 1.6,
            ease: "power2.out",
            snap: { textContent: isDecimal ? 0.1 : 1 },
            scrollTrigger: {
              trigger: el,
              scroller,
              start: "top 88%",
              toggleActions: "play none none none",
            },
            onUpdate() {
              const val = parseFloat(this.targets()[0].textContent);
              el.textContent = prefix + (isDecimal ? val.toFixed(1) : Math.round(val)) + suffix;
            },
          }
        );
      });

      // ── 10. HERO PARALLAX ELEMENTS ───────────────────────────────────────
      // Subtle scroll-driven parallax on hero words and badges
      const heroParallax = document.querySelectorAll<HTMLElement>("[data-hero-parallax]");
      heroParallax.forEach((el) => {
        const speed = parseFloat(el.dataset.parallaxSpeed ?? "0.3");
        gsap.to(el, {
          y: () => -window.innerHeight * speed,
          ease: "none",
          scrollTrigger: {
            trigger: el.closest("section") ?? el,
            scroller,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      });

      // Refresh ScrollTrigger after all animations are set up
      ScrollTrigger.refresh();
    }, scroller);

    // Re-calculate on resize
    const onResize = () => ScrollTrigger.refresh();
    window.addEventListener("resize", onResize, { passive: true });

    return () => {
      ctxRef.current?.revert();
      window.removeEventListener("resize", onResize);
    };
  }, [viewportRef]);
}
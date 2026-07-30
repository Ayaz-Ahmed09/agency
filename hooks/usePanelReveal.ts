"use client";

import gsap from "gsap";

const STAGGER_SELECTORS = [
  "[data-service-card]",
  "[data-scroll-heading]",
  "[data-process-step]",
  "[data-proof-card]",
  "[data-testimonial]",
  "[data-faq-item]",
  "[data-auto-card]",
  "[data-map-pin]",
];

/**
 * Plays a panel's internal entrance animations once it becomes the active card.
 * Replaces the old ScrollTrigger-based reveals, which no longer make sense now
 * that panels swap in full rather than scrolling into view.
 */
export function revealPanel(panelEl: HTMLElement) {
  return gsap.context(() => {
    STAGGER_SELECTORS.forEach((selector) => {
      const els = panelEl.querySelectorAll<HTMLElement>(selector);
      if (!els.length) return;

      gsap.fromTo(
        els,
        { y: 36, opacity: 0, filter: "blur(6px)" },
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 0.75,
          stagger: 0.08,
          delay: 0.16,
          ease: "power3.out",
        }
      );
    });

    const stats = panelEl.querySelectorAll<HTMLElement>("[data-stat]");
    stats.forEach((el) => {
      const target = parseFloat(el.dataset.statTarget ?? "0");
      const suffix = el.dataset.statSuffix ?? "";
      const prefix = el.dataset.statPrefix ?? "";
      const isDecimal = target % 1 !== 0;

      gsap.fromTo(
        el,
        { textContent: "0" },
        {
          textContent: target,
          duration: 1.4,
          delay: 0.32,
          ease: "power2.out",
          snap: { textContent: isDecimal ? 0.1 : 1 },
          onUpdate() {
            const val = parseFloat(this.targets()[0].textContent as string);
            el.textContent = prefix + (isDecimal ? val.toFixed(1) : Math.round(val)) + suffix;
          },
        }
      );
    });
  }, panelEl);
}

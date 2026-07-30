"use client";

import { ReactNode, useCallback, useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ServicesCardStack from "@/components/ui/services-card-stack";
import DottedMapAbout from "@/components/ui/dotted-map-about";
import AutomationShowcase from "@/components/AutomationShowcase";
import ProcessTimeline from "@/components/ProcessTimeline";
import VerticalProofSliders from "@/components/VerticalProofSliders";
import TestimonialSlider from "@/components/TestimonialSlider";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import ServicePlansModal from "@/components/ServicePlansModal";
import QueryBot from "@/components/QueryBot";
import { useCardStack } from "@/hooks/useCardStack";
import { revealPanel } from "@/hooks/usePanelReveal";

// Maps a nav link's id to the card-stack panel it should jump to, for the
// handful of places where the two ids diverge.
const NAV_ID_TO_PANEL_ID: Record<string, string> = { services: "services-stack" };
const PANEL_ID_TO_NAV_ID: Record<string, string> = { "services-stack": "services" };

export default function Home() {
  const [openPlansFor, setOpenPlansFor] = useState<string | null>(null);

  const panels: { id: string; node: ReactNode }[] = [
    { id: "hero", node: <Hero /> },
    { id: "services-stack", node: <ServicesCardStack onViewPlans={setOpenPlansFor} /> },
    { id: "about", node: <DottedMapAbout /> },
    { id: "automations", node: <AutomationShowcase /> },
    { id: "process", node: <ProcessTimeline /> },
    { id: "proof", node: <VerticalProofSliders /> },
    { id: "testimonials", node: <TestimonialSlider /> },
    { id: "faq", node: <FAQ /> },
    { id: "footer", node: <Footer /> },
  ];

  const { stageRef, panelRefs, registerPanel, registerContent, activeIndex, goToIndex } =
    useCardStack(panels.length);

  useEffect(() => {
    const el = panelRefs.current[activeIndex];
    if (!el) return;
    const ctx = revealPanel(el);
    return () => ctx.revert();
  }, [activeIndex, panelRefs]);

  useEffect(() => {
    const html = document.documentElement;
    const prevHtmlOverflow = html.style.overflow;
    const prevBodyOverflow = document.body.style.overflow;

    html.style.overflow = "hidden";
    document.body.style.overflow = "hidden";

    return () => {
      html.style.overflow = prevHtmlOverflow;
      document.body.style.overflow = prevBodyOverflow;
    };
  }, []);

  const handleNavigate = useCallback(
    (navId: string) => {
      const panelId = NAV_ID_TO_PANEL_ID[navId] ?? navId;
      const index = panels.findIndex((panel) => panel.id === panelId);
      if (index !== -1) goToIndex(index);
    },
    [goToIndex, panels]
  );

  const activePanelId = panels[activeIndex]?.id ?? "hero";
  const navActiveId = PANEL_ID_TO_NAV_ID[activePanelId] ?? activePanelId;
  const isLastPanel = activeIndex === panels.length - 1;

  return (
    <main className="relative h-[100dvh] w-full max-w-full overflow-hidden bg-black">
      <Navbar activeId={navActiveId} visible onNavigate={handleNavigate} />

      <div ref={stageRef} className="card-stage relative h-full w-full overscroll-none">
        {panels.map((panel, index) => (
          <div
            key={panel.id}
            ref={registerPanel(index)}
            data-panel={panel.id}
            className="absolute inset-0 h-full w-full will-change-transform"
          >
            <div ref={registerContent(index)} className="card-panel-scroll h-full w-full overflow-y-auto overscroll-contain">
              <div className="card-panel-shell flex min-h-full flex-col justify-center">{panel.node}</div>
            </div>
          </div>
        ))}
      </div>

      <div
        className="pointer-events-none fixed inset-x-0 bottom-5 z-40 flex justify-center transition-opacity duration-500"
        style={{ opacity: isLastPanel ? 0 : 1 }}
      >
        <div className="liquid-fixed flex animate-bounce items-center gap-1.5 rounded-full px-3 py-1.5 font-mono text-[0.58rem] font-semibold uppercase tracking-[0.22em] text-prestige-muted">
          <span>scroll</span>
          <ChevronDown size={12} strokeWidth={2.4} />
        </div>
      </div>

      <AnimatePresence>
        {openPlansFor !== null && (
          <ServicePlansModal serviceNumber={openPlansFor} onClose={() => setOpenPlansFor(null)} />
        )}
      </AnimatePresence>
      <QueryBot />
    </main>
  );
}

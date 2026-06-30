"use client";

import { ReactNode, useEffect, useEffectEvent, useRef, useState } from "react";
import { AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
// import Services from "@/components/Services";
import ServicesCardStack from "@/components/ui/services-card-stack";
import DottedMapAbout from "@/components/ui/dotted-map-about";
import AutomationShowcase from "@/components/AutomationShowcase";
import CaseStudies from "@/components/CaseStudies";
import ProcessTimeline from "@/components/ProcessTimeline";
import VerticalProofSliders from "@/components/VerticalProofSliders";
import TestimonialSlider from "@/components/TestimonialSlider";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import ServicePlansModal from "@/components/ServicePlansModal";
import QueryBot from "@/components/QueryBot";

const panelOrder = [
  "hero",
  // "services",
  "services-stack",
  "about",
  "automations",
  "case-studies",
  "process",
  "proof",
  "testimonials",
  "faq",
] as const;

type PanelId = (typeof panelOrder)[number];

type PageSectionProps = {
  children: ReactNode;
  id: PanelId;
};

function PageSection({ children, id }: PageSectionProps) {
  return (
    <section id={id} data-panel={id} className="relative w-full scroll-mt-6">
      {children}
    </section>
  );
}

export default function Home() {
  const viewportRef = useRef<HTMLElement | null>(null);
  const [activePanel, setActivePanel] = useState<PanelId>("hero");
  const [openPlansFor, setOpenPlansFor] = useState<string | null>(null);


  const syncActivePanel = useEffectEvent(() => {
    const viewport = viewportRef.current;

    if (!viewport) {
      return;
    }

    const panels = Array.from(viewport.querySelectorAll<HTMLElement>("[data-panel]"));
    const viewportMid = window.innerHeight * 0.5;

    let nextActive: PanelId = "hero";
    let smallestDistance = Number.POSITIVE_INFINITY;

    for (const panel of panels) {
      const rect = panel.getBoundingClientRect();
      const panelCenter = rect.top + rect.height * 0.5;
      const distance = Math.abs(panelCenter - viewportMid);

      if (distance < smallestDistance) {
        smallestDistance = distance;
        nextActive = panel.dataset.panel as PanelId;
      }
    }

    setActivePanel(nextActive);
  });

  useEffect(() => {
    const viewport = viewportRef.current;

    if (!viewport) {
      return;
    }

    let frame = 0;

    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(syncActivePanel);
    };

    syncActivePanel();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", syncActivePanel);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", syncActivePanel);
    };
  }, [syncActivePanel]);

  return (
    <main
      ref={viewportRef}
      className="stack-stage relative w-full max-w-full overflow-x-clip bg-black"
    >
      <Navbar activeId={activePanel} visible />

      <PageSection id="hero">
        <Hero />
      </PageSection>

      <PageSection id="services-stack">
        {/* <Services onViewPlans={setOpenPlansFor} /> */}
        <ServicesCardStack onViewPlans={setOpenPlansFor} />
      </PageSection>

      <PageSection id="about">
        <DottedMapAbout />
      </PageSection>

      <PageSection id="automations">
        <AutomationShowcase />
      </PageSection>

      {/* <PageSection id="case-studies">
        <CaseStudies />
      </PageSection> */}

      <PageSection id="process">
        <ProcessTimeline />
      </PageSection>

      <PageSection id="proof">
        <VerticalProofSliders />
      </PageSection>

      <PageSection id="testimonials">
        <TestimonialSlider />
      </PageSection>

      <PageSection id="faq">
        <FAQ />
      </PageSection>

      <div className="flex flex-col bg-prestige-canvas">
        <Footer />
      </div>

      <AnimatePresence>
        {openPlansFor !== null && (
          <ServicePlansModal
            serviceNumber={openPlansFor}
            onClose={() => setOpenPlansFor(null)}
          />
        )}
      </AnimatePresence>
      <QueryBot />
    </main>
  );
}

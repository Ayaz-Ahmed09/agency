"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Check, Copy, Eye, Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const metrics = [
  { value: "04", label: "controlled service tracks" },
  { value: "27.4k", label: "tracked conversions" },
  { value: "24.8m", label: "reported impressions" },
  { value: "#1", label: "Middle East growth ambition" },
];

const services = [
  {
    number: "01",
    title: "Web development",
    summary:
      "Conversion-focused websites, landing pages, storefronts, dashboards, and custom product interfaces built with speed, taste, and ownership.",
    tags: ["Next.js and React", "Shopify and commerce", "Webflow and WordPress", "Custom portals"],
  },
  {
    number: "02",
    title: "AI automation",
    summary:
      "Workflow automation for intake, CRM routing, lead enrichment, AI replies, reporting, approval queues, and internal operations.",
    tags: ["n8n and Make", "CRM routing", "AI agents", "Custom workflows"],
  },
  {
    number: "03",
    title: "Digital marketing",
    summary:
      "Google Ads growth, SEO foundations, conversion tracking, funnel reporting, campaign cleanup, and landing-page testing.",
    tags: ["Google Ads", "SEO", "Tracking", "Campaign reporting"],
  },
  {
    number: "04",
    title: "Social media handling",
    summary:
      "Content calendars, creative direction, publishing approvals, community replies, performance reports, and reusable brand systems.",
    tags: ["Reels and posts", "Approval flow", "Publishing", "Social reports"],
  },
];

type ServicesProps = {
  onViewPlans: (serviceNumber: string) => void;
};

export default function Services({ onViewPlans }: ServicesProps) {
  return (
    <section
      id="services"
      className="relative overflow-hidden border-y border-white/8 bg-prestige-canvas px-4 py-20 sm:px-6 md:px-8 md:py-28"
    >
      <div className="pointer-events-none absolute left-0 top-10 h-[34rem] w-[14rem] rounded-r-full bg-[radial-gradient(ellipse_at_left,rgba(255,91,25,0.28),transparent_68%)] blur-3xl" />
      <div className="mx-auto grid w-full max-w-7xl gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:gap-14">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <div className="relative overflow-hidden border border-white/12 bg-[#100909]/82 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] sm:p-5">
            <div className="relative aspect-[4/3] overflow-hidden border border-white/10 bg-black">
              <Image
                src="/Lamp.jpeg"
                alt="Warm studio light shaping the Presitgious Tech service system"
                fill
                sizes="(max-width: 1024px) 92vw, 32vw"
                className="object-cover opacity-70 mix-blend-screen"
              />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_58%_35%,rgba(255,126,42,0.28),transparent_35%),linear-gradient(180deg,rgba(5,3,3,0.05),rgba(5,3,3,0.9))]" />
              <div className="absolute left-4 top-4 text-[0.62rem] font-semibold uppercase tracking-[0.32em] text-prestige-gold">
                service map
              </div>
              <div className="absolute bottom-4 left-4 max-w-[15rem]">
                <p className="text-2xl font-semibold leading-[0.94] tracking-[-0.06em] text-prestige-ink sm:text-3xl">
                  Build, automate, market, publish.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 border-x border-b border-white/10">
              {metrics.map((metric) => (
                <div key={metric.label} className="min-h-24 border-r border-t border-white/10 p-4 last:border-r-0 odd:border-r">
                  <div className="font-mono text-2xl text-prestige-ink tabular-nums">{metric.value}</div>
                  <div className="mt-2 max-w-28 text-[0.62rem] uppercase leading-4 tracking-[0.18em] text-prestige-muted">
                    {metric.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="min-w-0">
          <div className="mb-9 grid gap-5 border-b border-white/10 pb-8 md:grid-cols-[1.15fr_0.85fr] md:items-end">
            <div>
              <p className="mb-4 text-[0.65rem] font-semibold uppercase tracking-[0.34em] text-prestige-gold">
                core capabilities
              </p>
              <h2 className="max-w-3xl text-4xl font-semibold leading-[0.92] tracking-[-0.07em] text-prestige-ink text-balance sm:text-5xl md:text-6xl">
                Professional services, one operating system.
              </h2>
            </div>
            <p className="max-w-md text-sm leading-7 text-prestige-muted md:justify-self-end">
              Each service includes the expected sub-services plus custom work. The goal is not a menu of tasks; it is a controlled growth system.
            </p>
          </div>

          <div className="divide-y divide-white/10 border-y border-white/10">
            {services.map((service, index) => (
              <motion.article
                key={service.number}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-8%" }}
                transition={{ duration: 0.55, delay: index * 0.06, ease: [0.32, 0.72, 0, 1] }}
                className="group grid gap-5 px-0 py-6 transition-colors duration-300 hover:bg-white/[0.025] sm:px-4 md:grid-cols-[4rem_minmax(0,1fr)_10rem] md:items-center md:py-7"
              >
                <div className="font-mono text-xs uppercase tracking-[0.22em] text-prestige-gold">{service.number}</div>
                <div className="min-w-0">
                  <h3 className="text-3xl font-semibold leading-[0.95] tracking-[-0.065em] text-prestige-ink sm:text-4xl md:text-5xl">
                    {service.title}
                  </h3>
                  <p className="mt-4 max-w-3xl text-sm leading-7 text-prestige-muted">{service.summary}</p>
                  <div className="mt-5 grid gap-2 sm:grid-cols-2">
                    {service.tags.map((tag) => (
                      <div
                        key={tag}
                        className="prestige-glass-chip flex min-h-11 items-center gap-2 rounded-[1.05rem] px-3 text-xs text-prestige-ink"
                      >
                        <Check size={13} className="relative z-[1] shrink-0 text-prestige-gold" />
                        <span className="relative z-[1] min-w-0 text-pretty">{tag}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <Link
                  href="/contact"
                  className="prestige-glass-button inline-flex h-11 w-fit items-center gap-3 rounded-[1.05rem] px-4 font-mono text-[0.65rem] uppercase tracking-[0.22em] text-prestige-muted md:justify-self-end"
                >
                  <span className="relative z-[1]">discover</span>
                  <Plus size={14} className="relative z-[1]" />
                </Link>
                <button
                  onClick={() => onViewPlans(service.number)}
                  className="flex h-11 w-fit items-center gap-2.5 rounded-[1.05rem] border border-prestige-gold/30 bg-prestige-gold/10 px-4 font-mono text-[0.65rem] uppercase tracking-[0.22em] text-prestige-gold transition-all duration-250 hover:border-prestige-gold/60 hover:bg-prestige-gold/18 active:scale-95 md:justify-self-end"
                >
                  <Eye size={14} className="relative z-[1]" />
                  <span className="relative z-[1]">view plans</span>
                </button>
              </motion.article>
            ))}
          </div>

          <Link
            href="#case-studies"
            className="mt-7 inline-flex items-center gap-3 border border-prestige-gold/50 bg-prestige-gold px-5 py-3 font-mono text-xs font-semibold uppercase tracking-[0.22em] text-[#160806] transition duration-300 hover:bg-prestige-ink"
          >
            view proof
            <ArrowUpRight size={15} />
          </Link>
        </div>
      </div>
    </section>
  );
}

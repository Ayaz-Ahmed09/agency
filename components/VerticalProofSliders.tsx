"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, BarChart3, Globe2 } from "lucide-react";

const adMetrics = [
  { label: "Active campaigns", value: "27", delta: "+18%", graph: "M2 30 L18 26 L34 28 L50 18 L66 21 L82 12 L98 16 L114 7" },
  { label: "Google Ads conversions", value: "27,418", delta: "+42%", graph: "M2 29 L18 31 L34 24 L50 26 L66 16 L82 19 L98 10 L114 5" },
  { label: "Impressions", value: "24.8M", delta: "+31%", graph: "M2 33 L18 26 L34 22 L50 28 L66 18 L82 13 L98 15 L114 8" },
  { label: "Campaign results", value: "4.7x", delta: "ROAS", graph: "M2 31 L18 28 L34 29 L50 18 L66 24 L82 11 L98 14 L114 6" },
];

const regions = ["UAE", "Saudi Arabia", "Qatar", "Kuwait", "Bahrain", "Oman"];

export default function VerticalProofSliders() {
  return (
    <section className="relative overflow-hidden border-y border-white/10 bg-prestige-canvas px-4 py-20 sm:px-6 md:px-8 md:py-24">
      <div className="mx-auto grid w-full max-w-7xl gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-stretch">
        <div className="border border-white/10 bg-[#100909]/78 p-6 sm:p-8">
          <p className="text-[0.65rem] font-semibold uppercase tracking-[0.34em] text-prestige-gold">
            live operations
          </p>
          <h2 className="mt-6 max-w-sm text-4xl font-semibold leading-[0.94] tracking-[-0.065em] text-prestige-ink text-balance sm:text-5xl">
            Real signals. Real results.
          </h2>
          <p className="mt-6 max-w-md text-sm leading-7 text-prestige-muted">
            Google Ads, conversion tracking, impressions, and campaign health stay visible from launch to optimization. The target is clear: become the highest performing agency system in the Middle East.
          </p>

          <div className="mt-8 border-y border-white/10 py-5">
            <div className="flex items-center gap-3 text-prestige-ink">
              <Globe2 size={18} className="text-prestige-gold" />
              <span className="font-mono text-xs uppercase tracking-[0.22em]">Middle East coverage</span>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {regions.map((region) => (
                <span key={region} className="border border-white/10 px-3 py-2 text-xs text-prestige-muted">
                  {region}
                </span>
              ))}
            </div>
          </div>

          <a
            href="/contact"
            className="mt-7 inline-flex items-center gap-3 border border-white/12 px-5 py-3 font-mono text-xs uppercase tracking-[0.22em] text-prestige-muted transition duration-300 hover:border-prestige-gold hover:text-prestige-ink"
          >
            plan growth
            <ArrowUpRight size={15} />
          </a>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {adMetrics.map((metric, index) => (
            <motion.article
              key={metric.label}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-8%" }}
              transition={{ duration: 0.5, delay: index * 0.06, ease: [0.32, 0.72, 0, 1] }}
              className="relative min-h-56 overflow-hidden border border-white/10 bg-[#100909]/82 p-5"
            >
              <div className="absolute inset-0 opacity-35 [background-image:linear-gradient(rgba(255,255,255,0.055)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:42px_42px]" />
              <div className="relative z-10 flex items-start justify-between gap-4">
                <div>
                  <p className="font-mono text-[0.62rem] uppercase tracking-[0.24em] text-prestige-gold">
                    {metric.label}
                  </p>
                  <div className="mt-5 font-mono text-4xl text-prestige-ink tabular-nums sm:text-5xl">
                    {metric.value}
                  </div>
                </div>
                <span className="border border-prestige-gold/30 bg-prestige-gold/10 px-2 py-1 font-mono text-[0.62rem] uppercase tracking-[0.16em] text-prestige-gold">
                  {metric.delta}
                </span>
              </div>

              <div className="relative z-10 mt-8 h-20 border-t border-white/10 pt-5">
                <svg viewBox="0 0 116 38" className="h-full w-full overflow-visible" aria-hidden="true">
                  <path d={metric.graph} fill="none" stroke="rgba(255,90,31,0.95)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d={`${metric.graph} L114 38 L2 38 Z`} fill="rgba(255,90,31,0.12)" />
                </svg>
              </div>

              <div className="relative z-10 mt-5 flex items-center gap-2 text-[0.68rem] uppercase tracking-[0.2em] text-prestige-muted">
                <BarChart3 size={14} className="text-prestige-gold" />
                tracked weekly
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

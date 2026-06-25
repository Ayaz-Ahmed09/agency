"use client";

import { motion } from "framer-motion";
import { Search, Compass, Rocket, BarChart4 } from "lucide-react";

const steps = [
  {
    phase: "01",
    title: "Discovery & System Audit",
    icon: Search,
    description: "We analyze your existing workflows, database structures, marketing channels, and bottlenecks. We find where you are leaking attention or wasting manual team effort.",
    timeframe: "WEEK 1",
  },
  {
    phase: "02",
    title: "Architecture Blueprint",
    icon: Compass,
    description: "Before writing any code, we mapping the API connections, database schemas, page layouts, and webhook paths. You receive a complete architecture doc of the proposed system.",
    timeframe: "WEEK 2",
  },
  {
    phase: "03",
    title: "Execution & Systems Code",
    icon: Rocket,
    description: "We build the custom frontend pages using Next.js/React, code the backend automation routes, configure webhooks, and set up the private approval dashboard.",
    timeframe: "WEEKS 3-5",
  },
  {
    phase: "04",
    title: "Attribution & Scaling",
    icon: BarChart4,
    description: "We connect event tracking to confirm conversions. We monitor live logs inside your dashboard to ensure automation health, while refining marketing funnels.",
    timeframe: "ONGOING",
  },
];

export default function ProcessTimeline() {
  return (
    <section id="process" className="relative py-24 md:py-32 px-4 md:px-8 bg-prestige-canvas overflow-hidden">
      <div className="absolute inset-y-0 right-0 w-[30rem] bg-gradient-to-l from-prestige-gold/5 to-transparent blur-[100px] pointer-events-none" />

      <div className="max-w-5xl w-full mx-auto space-y-20">
        
        {/* Header */}
        <div className="flex flex-col text-left space-y-4 max-w-xl">
          <span className="text-[10px] uppercase tracking-[0.2em] font-mono text-prestige-gold">
            OUR PROTOCOL
          </span>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tighter text-white">
            A predictable path <br />
            from blueprint to code.
          </h2>
          <p className="text-sm text-prestige-muted max-w-md">
            We avoid agency guesswork. We follow a strict engineering protocol to design and build stable, custom systems.
          </p>
        </div>

        {/* Timeline List */}
        <div className="relative border-l border-white/10 ml-4 md:ml-8 pl-8 md:pl-12 space-y-12">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.phase}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="relative group"
              >
                {/* Glowing dot on rail */}
                <div className="absolute -left-[41px] md:-left-[57px] top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-prestige-canvas border border-white/20 group-hover:border-prestige-gold transition-all duration-300">
                  <span className="h-1.5 w-1.5 rounded-full bg-white/40 group-hover:bg-prestige-gold group-hover:scale-125 transition-all duration-300" />
                </div>

                {/* Content Box - Double Bezel Layout */}
                <div className="p-1 rounded-[1.75rem] bg-[#151010]/20 border border-white/5 group-hover:border-prestige-gold/20 hover:shadow-[0_15px_40px_rgba(255,90,31,0.04)] transition-all duration-500 max-w-3xl">
                  <div className="border border-white/5 rounded-[calc(1.75rem-0.375rem)] bg-gradient-to-b from-[#181211]/80 to-[#0e0a0a]/90 p-6 space-y-4 shadow-[inset_0_1px_1px_rgba(255,255,255,0.06)]">
                    
                    {/* Topline */}
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-xs text-prestige-gold font-bold">
                          PHASE {step.phase}
                        </span>
                        <h3 className="text-lg md:text-xl font-bold tracking-tight text-white group-hover:text-prestige-gold transition-colors duration-300">
                          {step.title}
                        </h3>
                      </div>
                      <span className="text-[9px] font-mono font-medium text-prestige-muted border border-white/10 px-2 py-0.5 rounded bg-white/5">
                        {step.timeframe}
                      </span>
                    </div>

                    {/* Description */}
                    <p className="text-xs md:text-sm text-prestige-muted leading-relaxed max-w-2xl font-normal">
                      {step.description}
                    </p>

                    {/* Icon details */}
                    <div className="flex items-center gap-2 text-[9px] uppercase tracking-wider font-mono text-white/40 pt-2">
                      <Icon size={12} className="text-prestige-gold" strokeWidth={1.5} />
                      <span>verified checkpoint</span>
                    </div>

                  </div>
                </div>

              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

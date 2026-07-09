"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";

const faqs = [
  {
    question: "What is your typical project timeline?",
    answer: "A standard custom Next.js build and automation integration takes 4 to 6 weeks from discover to launch. We deliver a detailed system architecture blueprint at the end of Week 2 so you can review exactly how data and screens will flow before we write code.",
  },
  {
    question: "What technologies do you build with?",
    answer: "We are specialized in high-performance Next.js and React for frontends, Python and Node.js for custom automation servers, and Supabase / PostgreSQL for database records. All of our code is styled using Tailwind CSS and runs on edge-optimized hosting.",
  },
  {
    question: "How do your custom automations work?",
    answer: "We write secure serverless endpoints that listen to webhooks from your business apps (e.g. Stripe, Typeform, HubSpot). When triggered, our custom pipelines clean the data, query databases, execute LLM operations, sync records, and send notifications to your Slack or client portals automatically.",
  },
  {
    question: "Do you offer ongoing retainer support?",
    answer: "Yes. We offer dedicated system SLA retainers. We monitor automated webhooks, log API successes/errors, run server backups, and provide conversion optimization tweaks to keep your marketing funnels running smoothly.",
  },
  {
    question: "How do we get started?",
    answer: "You can submit an inquiry through the contact form below or DM 'FUNNEL' for a direct consultation. We will schedule a brief diagnostic call to audit your current channels and layout a system architecture proposal.",
  },
];

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  const toggleFAQ = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section id="faq" className="relative py-24 md:py-32 px-4 md:px-8 bg-prestige-canvas overflow-hidden">
      
      {/* Background glowing circle */}
      <div className="absolute top-1/3 right-1/4 w-[30rem] h-[30rem] rounded-full bg-prestige-gold-deep/5 blur-[100px] pointer-events-none" />

      <div className="max-w-4xl w-full mx-auto grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-12 items-start relative z-10">
        
        {/* Left Column: Title and details */}
        <div className="space-y-6 text-left max-w-sm lg:sticky lg:top-28">
          <span className="text-[10px] uppercase tracking-[0.2em] font-mono text-prestige-gold">
            FAQ
          </span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tighter text-white">
            Commonly <br />
            queried topics.
          </h2>
          <p className="text-xs md:text-sm text-prestige-muted leading-relaxed">
            Have questions about integrations, security, or custom architecture? Here is how we build and deliver digital systems.
          </p>
          <div className="flex items-center gap-2 text-[10px] font-mono text-prestige-muted border border-white/10 px-3 py-1.5 rounded bg-white/5 w-fit">
            <HelpCircle size={12} className="text-prestige-gold" />
            <span>Need custom answers? Ask below.</span>
          </div>
        </div>

        {/* Right Column: Accordion */}
        <div className="space-y-4 w-full">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                data-faq-item
                className="rounded-2xl bg-[#151010]/20 border border-white/5 hover:border-prestige-gold/20 overflow-hidden transition-all duration-300"
              >
                {/* Accordion Trigger */}
                <button
                  onClick={() => toggleFAQ(idx)}
                  className="w-full flex items-center justify-between text-left p-5 md:p-6 transition-colors font-medium text-white hover:text-prestige-gold group"
                >
                  <span className="text-sm md:text-base font-bold tracking-tight pr-4">
                    {faq.question}
                  </span>
                  <span className={`flex-shrink-0 h-8 w-8 rounded-full border border-white/10 group-hover:border-prestige-gold/20 bg-white/5 flex items-center justify-center text-prestige-ink group-hover:text-prestige-gold transform transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}>
                    <ChevronDown size={14} />
                  </span>
                </button>

                {/* Accordion Content */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <div className="px-5 pb-5 md:px-6 md:pb-6 text-xs md:text-sm text-prestige-muted leading-relaxed font-normal border-t border-white/5 pt-4">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

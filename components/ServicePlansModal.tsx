"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Check, Copy, X } from "lucide-react";

// ── Plan data ────────────────────────────────────────────────────────────────

type Plan = {
  name: string;
  tagline: string;
  price: string;
  period: string;
  highlight?: boolean;
  items: string[];
  cta: string;
};

type ServicePlans = {
  number: string;
  service: string;
  plans: Plan[];
};

const ALL_PLANS: ServicePlans[] = [
  {
    number: "01",
    service: "Web Development",
    plans: [
      {
        name: "Ignite",
        tagline: "Launch fast, validate early",
        price: "$1,500",
        period: "/ month",
        items: [
          "1-page landing or portfolio site",
          "Mobile-first responsive build",
          "Contact form + email setup",
          "Basic SEO (meta, OG tags, sitemap)",
          "2 rounds of content revisions / mo",
          "Shared hosting for 12 months",
          "Email support, 5-day turnaround",
        ],
        cta: "Start with Ignite",
      },
      {
        name: "Accelerate",
        tagline: "Scale pages, compound growth",
        price: "$3,500",
        period: "/ month",
        highlight: true,
        items: [
          "Up to 5-page custom website",
          "CMS integration (Sanity / Notion)",
          "Advanced SEO + schema markup",
          "Conversion tracking (GA4 + events)",
          "A/B headline testing",
          "5 rounds of revisions / mo",
          "Priority support, 2-day turnaround",
          "Monthly performance report",
        ],
        cta: "Start with Accelerate",
      },
      {
        name: "Dominate",
        tagline: "Custom builds, zero limits",
        price: "$7,500",
        period: "/ month",
        items: [
          "Unlimited page custom build",
          "E-commerce or member portal ready",
          "Advanced integrations (CRM, ERP)",
          "White-glove onboarding + training",
          "Unlimited revisions",
          "Dedicated project manager",
          "SLA: 24h urgent, 48h standard",
          "Quarterly strategy review call",
        ],
        cta: "Start with Dominate",
      },
    ],
  },
  {
    number: "02",
    service: "AI Automation",
    plans: [
      {
        name: "Signal",
        tagline: "Automate the noise, hear what matters",
        price: "$800",
        period: "/ month",
        items: [
          "3 active workflow automations",
          "1 native integration (CRM / email)",
          "AI-powered email or chat replies",
          "Weekly performance digest",
          "Error monitoring + alerts",
          "Standard email support",
        ],
        cta: "Start with Signal",
      },
      {
        name: "Flow",
        tagline: "Your operations, on autopilot",
        price: "$2,000",
        period: "/ month",
        highlight: true,
        items: [
          "8 active workflow automations",
          "3 native integrations",
          "Custom AI agent setup (n8n / Make)",
          "Slack / Teams real-time alerts",
          "Daily report digest",
          "Approval queue workflows",
          "Priority email + chat support",
          "Monthly optimisation call",
        ],
        cta: "Start with Flow",
      },
      {
        name: "System",
        tagline: "An AI nervous system for your business",
        price: "$4,500",
        period: "/ month",
        items: [
          "Unlimited active workflows",
          "Custom LLM fine-tuning (optional)",
          "Multi-agent orchestration",
          "Dedicated AI infrastructure",
          "24 / 7 incident response",
          "White-glove onboarding (2 weeks)",
          "Quarterly executive briefing",
        ],
        cta: "Start with System",
      },
    ],
  },
  {
    number: "03",
    service: "Digital Marketing",
    plans: [
      {
        name: "Beacon",
        tagline: "Be seen by the right people",
        price: "$1,200",
        period: "/ month",
        items: [
          "Google Ads campaign setup + management",
          "Keyword research + audience targeting",
          "1 dedicated landing page",
          "Conversion tracking (GTM + GA4)",
          "Monthly performance dashboard",
          "Standard email support",
        ],
        cta: "Start with Beacon",
      },
      {
        name: "Catalyst",
        tagline: "Fuel growth with precision campaigns",
        price: "$2,800",
        period: "/ month",
        highlight: true,
        items: [
          "Full Google Ads management",
          "Advanced SEO foundation + content",
          "3 dedicated landing pages",
          "A/B headline + visual testing",
          "Bi-weekly reporting + strategy call",
          "Remarketing + display campaigns",
          "Priority support, same-day response",
          "Dedicated marketing strategist",
        ],
        cta: "Start with Catalyst",
      },
      {
        name: "Epoch",
        tagline: "Dominate every channel, own the market",
        price: "$5,500",
        period: "/ month",
        items: [
          "Multi-channel campaigns (Google + Meta + LinkedIn)",
          "Enterprise SEO + content engine",
          "Custom analytics dashboard",
          "Weekly strategy review calls",
          "White-glove campaign onboarding",
          "Dedicated growth team (3 specialists)",
          "24/7 slack support + monthly executive reports",
        ],
        cta: "Start with Epoch",
      },
    ],
  },
  {
    number: "04",
    service: "Social Media Handling",
    plans: [
      {
        name: "Pulse",
        tagline: "Stay alive in your audience's feed",
        price: "$600",
        period: "/ month",
        items: [
          "8 branded posts / month",
          "Story scheduling (15 stories)",
          "Basic community replies (30 min / day)",
          "Monthly performance recap",
          "Hashtag set per post",
          "Standard email support",
        ],
        cta: "Start with Pulse",
      },
      {
        name: "Wave",
        tagline: "Ride the algorithm, grow consistently",
        price: "$1,500",
        period: "/ month",
        highlight: true,
        items: [
          "16 branded posts / month",
          "4 short-form reels with captions",
          "Full community management",
          "Hashtag + trend strategy",
          "Bi-weekly content calendar",
          "Bi-weekly performance report",
          "Priority email + chat support",
        ],
        cta: "Start with Wave",
      },
      {
        name: "Storm",
        tagline: "A social force your competitors fear",
        price: "$3,000",
        period: "/ month",
        items: [
          "24 branded posts / month",
          "8 reels + 2 long-form videos",
          "Full community management (all platforms)",
          "Influencer outreach coordination",
          "Monthly content strategy document",
          "Daily analytics + weekly insight reports",
          "Dedicated social media strategist",
          "Priority support + weekly sync calls",
        ],
        cta: "Start with Storm",
      },
    ],
  },
];

// ── Component ───────────────────────────────────────────────────────────────

type ServicePlansModalProps = {
  serviceNumber?: string;
  onClose: () => void;
};

export default function ServicePlansModal({ serviceNumber, onClose }: ServicePlansModalProps) {
  const [copied, setCopied] = useState(false);

  // Default to first service if no serviceNumber is passed (for demo/testing)
  const initial = serviceNumber
    ? ALL_PLANS.findIndex((p) => p.number === serviceNumber)
    : 0;
  const [activeTab, setActiveTab] = useState(initial >= 0 ? initial : 0);

  const active = ALL_PLANS[activeTab];

  const handleCopy = () => {
    void navigator.clipboard.writeText("systems@presitgious.tech");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.22 }}
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/70 backdrop-blur-md p-3 sm:p-6"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 24 }}
        transition={{ duration: 0.32, ease: [0.23, 1, 0.32, 1] }}
        className="relative flex max-h-[92dvh] w-full max-w-6xl flex-col overflow-hidden rounded-[2rem] border border-white/12 bg-[#0e0909]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Glass overlay at top */}
        <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-36 bg-gradient-to-b from-[#ff5a1f]/10 to-transparent" />

        {/* Header */}
        <div className="relative z-10 flex w-full items-center justify-between border-b border-white/10 px-6 py-5 sm:px-8 sm:py-6">
          <div>
            <p className="font-mono text-[0.58rem] uppercase tracking-[0.32em] text-prestige-gold sm:text-[0.62rem]">
              service packages
            </p>
            <h2 className="mt-2 text-2xl font-semibold tracking-[-0.06em] text-prestige-ink sm:text-3xl">
              Choose your growth tier
            </h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Close plans"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-prestige-muted transition-all duration-200 hover:border-white/20 hover:text-prestige-ink active:scale-95"
          >
            <X size={17} strokeWidth={1.8} />
          </button>
        </div>

        {/* Service tabs */}
        <div className="relative z-10 flex gap-1.5 border-b border-white/10 px-5 py-3 sm:px-7 sm:gap-2 sm:py-3 overflow-x-auto scrollbar-none">
          {ALL_PLANS.map((sp, i) => (
            <button
              key={sp.number}
              onClick={() => setActiveTab(i)}
              className={`shrink-0 rounded-full px-4 py-2 font-mono text-[0.58rem] uppercase tracking-[0.2em] transition-all duration-250 sm:px-5 sm:py-2.5 sm:text-[0.62rem] ${
                activeTab === i
                  ? "border border-prestige-gold/50 bg-prestige-gold/14 text-prestige-gold"
                  : "border border-white/10 bg-white/[0.03] text-prestige-muted hover:border-white/18 hover:text-prestige-ink"
              }`}
            >
              <span className="mr-1.5 opacity-60">{sp.number}</span>
              {sp.service}
            </button>
          ))}
        </div>

        {/* Plans grid */}
        <div className="relative z-10 flex-1 overflow-y-auto overscroll-contain px-5 pb-8 pt-6 sm:px-7 sm:pb-10 sm:pt-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.26, ease: [0.23, 1, 0.32, 1] }}
              className="grid gap-5 sm:grid-cols-3 sm:gap-4"
            >
              {active.plans.map((plan, i) => (
                <motion.div
                  key={plan.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07, duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                  className={`relative flex flex-col overflow-hidden rounded-[1.5rem] border ${
                    plan.highlight
                      ? "border-prestige-gold/40 bg-[#1c0d0a]/80"
                      : "border-white/10 bg-[#120909]/70"
                  } backdrop-blur-md`}
                >
                  {/* Highlight badge */}
                  {plan.highlight && (
                    <div className="absolute right-5 top-4 z-10 flex items-center gap-1.5 rounded-full border border-prestige-gold/35 bg-prestige-gold/12 px-3 py-1">
                      <span className="h-1.5 w-1.5 rounded-full bg-prestige-gold" />
                      <span className="font-mono text-[0.55rem] uppercase tracking-[0.22em] text-prestige-gold">
                        Most popular
                      </span>
                    </div>
                  )}

                  {/* Top glass sheen */}
                  <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/14 to-transparent" />

                  <div className="flex flex-col gap-5 p-6 sm:p-6">
                    {/* Plan name + tagline */}
                    <div>
                      <h3
                        className={`text-2xl font-semibold tracking-[-0.06em] ${
                          plan.highlight ? "text-prestige-gold" : "text-prestige-ink"
                        }`}
                      >
                        {plan.name}
                      </h3>
                      <p className="mt-1.5 text-[0.68rem] leading-5 text-prestige-muted sm:text-xs">
                        {plan.tagline}
                      </p>
                    </div>

                    {/* Price */}
                    <div className="flex items-baseline gap-1.5">
                      <span
                        className={`text-4xl font-bold tracking-[-0.08em] ${
                          plan.highlight ? "text-prestige-ink" : "text-prestige-ink"
                        }`}
                      >
                        {plan.price}
                      </span>
                      <span className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-prestige-muted">
                        {plan.period}
                      </span>
                    </div>

                    {/* Divider */}
                    <div className="h-px w-full bg-white/10" />

                    {/* Features */}
                    <ul className="flex flex-col gap-3">
                      {plan.items.map((item) => (
                        <li key={item} className="flex items-start gap-2.5">
                          <div className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-prestige-gold/15">
                            <Check size={9} className="text-prestige-gold" strokeWidth={2.5} />
                          </div>
                          <span className="text-xs leading-5 text-prestige-muted sm:text-[0.72rem]">
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>

                    {/* CTA */}
                    <a
                      href="#contact"
                      onClick={onClose}
                      className={`mt-auto inline-flex w-full items-center justify-center gap-2 rounded-[1rem] px-5 py-3.5 font-mono text-[0.65rem] uppercase tracking-[0.22em] transition-all duration-250 active:scale-95 ${
                        plan.highlight
                          ? "border border-prestige-gold/50 bg-prestige-gold text-[#160806] hover:bg-prestige-ink hover:border-prestige-ink"
                          : "border border-white/13 bg-white/[0.05] text-prestige-muted hover:border-white/22 hover:text-prestige-ink"
                      }`}
                    >
                      {plan.cta}
                      <Copy size={12} />
                    </a>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Footer note */}
        <div className="relative z-10 border-t border-white/10 px-6 py-4 sm:px-8">
          <p className="text-center font-mono text-[0.58rem] uppercase tracking-[0.18em] text-prestige-muted">
            All plans include a 30-min onboarding call · No lock-in contracts · Cancel anytime
          </p>
          <button
            onClick={handleCopy}
            className="mt-2 mx-auto flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 font-mono text-[0.58rem] uppercase tracking-[0.18em] text-prestige-muted transition-all duration-200 hover:border-prestige-gold/30 hover:text-prestige-gold"
          >
            {copied ? "Copied!" : "systems@presitgious.tech"}
            <Copy size={10} />
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

"use client";

import { FormEvent, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Bot,
  CheckCircle2,
  CornerDownLeft,
  Loader2,
  MessageSquareText,
  Send,
  X,
} from "lucide-react";

type ChatMessage = {
  id: string;
  role: "bot" | "customer";
  text: string;
};

const quickPrompts = [
  "I need a premium website",
  "Can you build AI automation?",
  "Show me your work",
  "What is the timeline?",
];

const knowledge = [
  {
    match: ["web", "website", "landing", "react", "next", "ecommerce", "portal"],
    answer:
      "For web development, Prestigious Tech builds conversion-focused websites, product portals, dashboards, storefronts, and landing pages in React and Next.js. We usually start by mapping trust points, lead paths, performance goals, and content structure.",
  },
  {
    match: ["ai", "automation", "bot", "workflow", "crm", "agent", "n8n", "make"],
    answer:
      "For custom AI automation, we can build intake bots, CRM routers, AI reply assistants, reporting pipelines, approval flows, and lead scoring systems. The best first step is sharing the repetitive task you want removed from your team.",
  },
  {
    match: ["marketing", "ads", "seo", "campaign", "funnel", "tracking"],
    answer:
      "For digital marketing, we focus on campaign cleanup, Google Ads, SEO foundations, tracking, conversion reporting, and landing page experiments. We connect campaigns to measurable website actions so you can see what is working.",
  },
  {
    match: ["social", "media", "instagram", "facebook", "content", "posts", "reels"],
    answer:
      "For social media handling, we plan calendars, direct creative, prepare posts and reels, manage approvals, handle replies, and report performance. The goal is a reliable publishing system, not random posting.",
  },
  {
    match: ["work", "portfolio", "case", "proof", "trust", "examples", "showcase"],
    answer:
      "You can review the showcase section for six project directions: clinic booking, ecommerce storefront, SaaS operations, property lead funnel, legal intake, and fitness membership. Each one demonstrates a practical client-ready system.",
  },
  {
    match: ["price", "pricing", "cost", "budget", "package", "plan"],
    answer:
      "Pricing depends on scope. A focused landing page, a multi-page website, and a custom automation system are different builds. Use the contact form with your target service and budget range, and we will return a blueprint-style estimate.",
  },
  {
    match: ["time", "timeline", "duration", "launch", "deadline", "weeks"],
    answer:
      "Most focused website or automation builds take 2 to 6 weeks. Larger websites with content, integrations, dashboards, or ongoing marketing systems can run longer. We scope milestones before build work starts.",
  },
  {
    match: ["contact", "email", "call", "start", "book", "hire"],
    answer:
      "To start, send your project summary through the contact form or email systems@presitgious.tech. Include the service you need, your current website or channels, and what outcome you want in the next 30 to 90 days.",
  },
];

const initialMessages: ChatMessage[] = [
  {
    id: "welcome",
    role: "bot",
    text: "Ask about web development, custom AI automation, digital marketing, social media handling, timelines, pricing, or our work showcase.",
  },
];

function answerQuestion(input: string) {
  const normalized = input.toLowerCase();
  const found = knowledge.find((entry) => entry.match.some((word) => normalized.includes(word)));

  if (found) {
    return found.answer;
  }

  return "I can help route this. Tell me whether your priority is a website, custom AI automation, digital marketing, social media handling, or a full growth system, and I will suggest the next step.";
}

export default function QueryBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [input, setInput] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const hasConversation = messages.length > 1;
  const status = useMemo(() => (isThinking ? "reading query" : "ready"), [isThinking]);

  const sendMessage = (value: string) => {
    const clean = value.trim();
    setError("");

    if (!clean) {
      setError("Enter a short question first.");
      inputRef.current?.focus();
      return;
    }

    const customerMessage: ChatMessage = {
      id: `customer-${Date.now()}`,
      role: "customer",
      text: clean,
    };

    setMessages((current) => [...current, customerMessage]);
    setInput("");
    setIsThinking(true);

    window.setTimeout(() => {
      setMessages((current) => [
        ...current,
        {
          id: `bot-${Date.now()}`,
          role: "bot",
          text: answerQuestion(clean),
        },
      ]);
      setIsThinking(false);
    }, 520);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    sendMessage(input);
  };

  return (
    <div className="fixed bottom-4 right-4 z-[70] sm:bottom-6 sm:right-6">
      <AnimatePresence>
        {open && (
          <motion.section
            initial={{ opacity: 0, y: 22, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: 0.24, ease: [0.32, 0.72, 0, 1] }}
            className="mb-3 w-[calc(100vw-2rem)] overflow-hidden rounded-[1.35rem] border border-white/12 bg-[#0d0707]/94 shadow-[inset_0_1px_0_rgba(255,255,255,0.1),0_24px_80px_rgba(0,0,0,0.55)] backdrop-blur-xl sm:w-[25rem]"
            aria-label="Customer query bot"
          >
            <header className="flex items-center justify-between border-b border-white/10 px-4 py-3">
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-full border border-prestige-gold/30 bg-prestige-gold/10 text-prestige-gold">
                  <Bot size={18} strokeWidth={1.8} />
                </span>
                <div>
                  <h2 className="text-sm font-semibold tracking-[-0.02em] text-prestige-ink">Prestigious query bot</h2>
                  <p className="mt-0.5 flex items-center gap-1.5 font-mono text-[0.58rem] uppercase tracking-[0.18em] text-prestige-muted">
                    <CheckCircle2 size={11} className="text-prestige-gold" />
                    {status}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="grid h-9 w-9 place-items-center rounded-full border border-white/10 text-prestige-muted transition hover:border-prestige-gold/40 hover:text-prestige-ink active:scale-95"
                aria-label="Close query bot"
              >
                <X size={16} />
              </button>
            </header>

            <div className="max-h-[24rem] min-h-[18rem] space-y-3 overflow-y-auto px-4 py-4">
              {!hasConversation && (
                <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-4">
                  <MessageSquareText size={18} className="text-prestige-gold" />
                  <p className="mt-3 text-sm leading-6 text-prestige-muted">
                    Choose a prompt or type your own question. Answers are instant and scoped to Prestigious Tech services.
                  </p>
                </div>
              )}

              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.role === "customer" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[86%] rounded-2xl px-3.5 py-3 text-sm leading-6 ${
                      message.role === "customer"
                        ? "bg-prestige-gold text-[#170705]"
                        : "border border-white/10 bg-white/[0.035] text-prestige-ink"
                    }`}
                  >
                    {message.text}
                  </div>
                </div>
              ))}

              {isThinking && (
                <div className="flex justify-start">
                  <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.035] px-3.5 py-3 text-sm text-prestige-muted">
                    <Loader2 size={14} className="animate-spin text-prestige-gold" />
                    Preparing the best route
                  </div>
                </div>
              )}
            </div>

            <div className="border-t border-white/10 p-3">
              <div className="mb-3 flex gap-2 overflow-x-auto pb-1">
                {quickPrompts.map((prompt) => (
                  <button
                    key={prompt}
                    type="button"
                    onClick={() => sendMessage(prompt)}
                    className="shrink-0 rounded-full border border-white/10 bg-white/[0.03] px-3 py-2 font-mono text-[0.58rem] uppercase tracking-[0.16em] text-prestige-muted transition hover:border-prestige-gold/40 hover:text-prestige-ink active:scale-95"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
              <form onSubmit={handleSubmit} className="space-y-2">
                <label htmlFor="query-bot-input" className="sr-only">
                  Ask Prestigious Tech a question
                </label>
                <div className="flex items-center gap-2 rounded-full border border-white/10 bg-[#080505] p-1.5">
                  <input
                    ref={inputRef}
                    id="query-bot-input"
                    value={input}
                    onChange={(event) => setInput(event.target.value)}
                    placeholder="Ask about your project"
                    className="min-w-0 flex-1 bg-transparent px-3 text-sm text-prestige-ink outline-none placeholder:text-prestige-muted/70"
                  />
                  <button
                    type="submit"
                    className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-prestige-gold text-[#170705] transition hover:bg-prestige-ink active:scale-95"
                    aria-label="Send query"
                  >
                    <Send size={15} />
                  </button>
                </div>
                {error && <p className="px-2 text-xs text-prestige-gold">{error}</p>}
              </form>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="group flex h-14 items-center gap-3 rounded-full border border-prestige-gold/35 bg-[#0d0707]/88 px-4 text-prestige-ink shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_18px_55px_rgba(0,0,0,0.46)] backdrop-blur-xl transition hover:border-prestige-gold/70 active:scale-[0.98]"
        aria-expanded={open}
      >
        <span className="grid h-9 w-9 place-items-center rounded-full bg-prestige-gold text-[#170705]">
          {open ? <CornerDownLeft size={16} /> : <Bot size={17} />}
        </span>
        <span className="hidden font-mono text-[0.64rem] font-semibold uppercase tracking-[0.2em] text-prestige-ink sm:block">
          customer query
        </span>
      </button>
    </div>
  );
}

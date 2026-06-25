"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Clipboard, ClipboardCheck, Code2, Download, FileJson, TerminalSquare, Zap } from "lucide-react";

type SnippetMode = "code" | "json" | "script";

type AutomationRecipe = {
  id: string;
  number: string;
  title: string;
  level: string;
  outcome: string;
  summary: string;
  stack: string[];
  metrics: string[];
  snippets: Record<SnippetMode, string>;
};

const automationRecipes: AutomationRecipe[] = [
  {
    id: "lead-router",
    number: "A01",
    title: "Lead qualification + CRM router",
    level: "mid standard",
    outcome: "Turns raw website inquiries into scored CRM deals with owner assignment and Slack alerts.",
    summary:
      "A practical intake flow for agencies, clinics, real estate teams, and B2B sales. It validates the lead, scores intent, assigns the right owner, creates the CRM deal, and posts a concise next-action alert.",
    stack: ["Webhook", "AI scoring", "HubSpot/Pipedrive", "Slack", "Email"],
    metrics: ["< 8 sec routing", "duplicate guard", "hot lead alert"],
    snippets: {
      code: String.raw`// Next.js route handler: app/api/automation/lead-router/route.ts
import { NextResponse } from "next/server";

type Lead = {
  name: string;
  email: string;
  company?: string;
  budget?: string;
  message: string;
  source?: string;
};

const HIGH_INTENT = ["urgent", "pricing", "proposal", "demo", "book", "automation", "redesign"];

function scoreLead(lead: Lead) {
  const text = (lead.message + " " + (lead.budget ?? "")).toLowerCase();
  const intent = HIGH_INTENT.reduce((score, word) => score + (text.includes(word) ? 14 : 0), 0);
  const budget = /5k|10k|enterprise|retainer|monthly|ongoing/i.test(lead.budget ?? "") ? 28 : 8;
  const completeness = [lead.name, lead.email, lead.company, lead.message].filter(Boolean).length * 8;
  return Math.min(100, intent + budget + completeness);
}

export async function POST(req: Request) {
  const lead = (await req.json()) as Lead;
  const score = scoreLead(lead);
  const owner = score >= 70 ? "senior-closer" : score >= 45 ? "growth-team" : "nurture-sequence";

  // Replace these with your CRM + Slack calls.
  const crmPayload = {
    pipeline: score >= 70 ? "hot-opportunities" : "inbound-review",
    owner,
    contact: lead,
    score,
    nextAction: score >= 70 ? "Call within 15 minutes" : "Send qualification email",
  };

  return NextResponse.json({ ok: true, crmPayload });
}`,
      json: JSON.stringify(
        {
          name: "Lead qualification + CRM router",
          trigger: "POST /api/automation/lead-router",
          inputs: ["name", "email", "company", "budget", "message", "source"],
          scoring: {
            hot: ">= 70",
            warm: "45-69",
            nurture: "< 45",
          },
          actions: [
            "dedupe by email",
            "calculate intent score",
            "create/update CRM deal",
            "assign owner by score",
            "send Slack alert for hot lead",
            "start nurture sequence for lower-score lead",
          ],
        },
        null,
        2
      ),
      script: String.raw`#!/usr/bin/env bash
# Smoke test the lead router locally.
curl -X POST http://localhost:3000/api/automation/lead-router \
  -H "Content-Type: application/json" \
  -d '{
    "name":"Maya Khan",
    "email":"maya@example.com",
    "company":"Nova Dental",
    "budget":"10k monthly retainer",
    "message":"We need urgent automation and a website redesign proposal.",
    "source":"pricing-page"
  }' | jq`,
    },
  },
  {
    id: "content-repurposer",
    number: "A02",
    title: "Content repurposing pipeline",
    level: "mini-to-mid",
    outcome: "Converts one long-form note into LinkedIn, X, email, and short-video briefs with approval states.",
    summary:
      "Built for founders and marketing teams that have ideas but inconsistent publishing. It accepts a raw transcript or article, creates channel-specific drafts, stores them for approval, and queues publishing tasks.",
    stack: ["Transcript", "LLM transform", "Airtable/Notion", "Approval", "Scheduler"],
    metrics: ["4 channel drafts", "approval queue", "tone guardrails"],
    snippets: {
      code: String.raw`// TypeScript content transformer primitive
const channels = ["linkedin", "x-thread", "email", "short-video"] as const;

type Channel = (typeof channels)[number];

type Draft = {
  channel: Channel;
  hook: string;
  body: string;
  cta: string;
  status: "needs-review" | "approved";
};

export function createRepurposeBrief(source: string): Draft[] {
  const theme = source.split(".")[0]?.slice(0, 140) || "Practical operating system insight";

  return channels.map((channel) => ({
    channel,
    hook: channel === "x-thread" ? "A practical thread: " + theme : theme,
    body: "Rewrite this source for " + channel + ". Keep it specific, concrete, and non-generic. Source: " + source,
    cta: channel === "email" ? "Reply with your bottleneck" : "Book a systems audit",
    status: "needs-review",
  }));
}`,
      json: JSON.stringify(
        {
          name: "Content repurposing pipeline",
          trigger: "new transcript or raw article",
          channels: ["linkedin", "x-thread", "email", "short-video"],
          guardrails: {
            tone: "specific, practical, no hype",
            forbidden: ["generic AI phrases", "fake metrics", "unsupported claims"],
          },
          approvalStates: ["needs-review", "revision-requested", "approved", "scheduled", "published"],
        },
        null,
        2
      ),
      script: String.raw`#!/usr/bin/env node
// Minimal local content repurposer CLI.
const fs = require("fs");
const source = fs.readFileSync(process.argv[2] || "./source.txt", "utf8");
const channels = ["linkedin", "x-thread", "email", "short-video"];
const drafts = channels.map(channel => ({
  channel,
  status: "needs-review",
  prompt: "Create a " + channel + " draft from this source. Be concrete and conversion-aware.\n\n" + source
}));
fs.writeFileSync("repurposed-drafts.json", JSON.stringify(drafts, null, 2));
console.log("Created " + drafts.length + " drafts -> repurposed-drafts.json");`,
    },
  },
  {
    id: "invoice-followup",
    number: "A03",
    title: "Invoice follow-up + payment recovery",
    level: "mid standard",
    outcome: "Detects unpaid invoices, sends polite staged reminders, and escalates only when needed.",
    summary:
      "A useful back-office automation for agencies and service businesses. It checks invoice age, avoids weekends, sends the right message stage, logs every touch, and alerts finance before escalation.",
    stack: ["Stripe/Xero", "Cron", "Email", "Slack", "Audit log"],
    metrics: ["3-stage reminders", "weekend safe", "audit trail"],
    snippets: {
      code: String.raw`type Invoice = {
  id: string;
  clientEmail: string;
  amountDue: number;
  dueDate: string;
  reminderStage?: 0 | 1 | 2 | 3;
};

function daysLate(dueDate: string) {
  return Math.floor((Date.now() - new Date(dueDate).getTime()) / 86_400_000);
}

export function nextReminder(invoice: Invoice) {
  const late = daysLate(invoice.dueDate);
  if (late < 1) return null;

  const stage = late >= 14 ? 3 : late >= 7 ? 2 : 1;
  if ((invoice.reminderStage ?? 0) >= stage) return null;

  return {
    invoiceId: invoice.id,
    stage,
    subject: stage === 1 ? "Quick invoice reminder" : stage === 2 ? "Invoice still pending" : "Action needed on overdue invoice",
    tone: stage === 3 ? "firm but professional" : "polite and helpful",
  };
}`,
      json: JSON.stringify(
        {
          name: "Invoice follow-up + payment recovery",
          schedule: "0 10 * * 1-5",
          rules: [
            { daysLate: 1, action: "polite reminder" },
            { daysLate: 7, action: "second reminder + payment link" },
            { daysLate: 14, action: "finance escalation" },
          ],
          safety: ["no duplicate reminders", "skip weekends", "log every message", "manual override allowed"],
        },
        null,
        2
      ),
      script: String.raw`#!/usr/bin/env bash
# Daily cron shape: fetch unpaid invoices, calculate stage, notify finance.
set -euo pipefail
TODAY=$(date +%F)
echo "[$TODAY] checking unpaid invoices..."
# Replace invoices.json with Stripe/Xero API output.
jq -r '.invoices[] | select(.status=="unpaid") | [.id,.clientEmail,.dueDate,.amountDue] | @tsv' invoices.json \
  | while IFS=$'\t' read -r id email due amount; do
      echo "queue reminder check: $id $email due=$due amount=$amount"
    done`,
    },
  },
];

const modeMeta: Record<SnippetMode, { label: string; icon: typeof Code2; extension: string }> = {
  code: { label: "View code", icon: Code2, extension: "ts" },
  json: { label: "View JSON", icon: FileJson, extension: "json" },
  script: { label: "View script", icon: TerminalSquare, extension: "sh" },
};

function downloadText(filename: string, content: string) {
  const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(url);
}

export default function AutomationShowcase() {
  const [activeRecipe, setActiveRecipe] = useState(automationRecipes[0].id);
  const [mode, setMode] = useState<SnippetMode>("code");
  const [copied, setCopied] = useState(false);

  const recipe = useMemo(
    () => automationRecipes.find((item) => item.id === activeRecipe) ?? automationRecipes[0],
    [activeRecipe]
  );

  const snippet = recipe.snippets[mode];
  const extension = modeMeta[mode].extension;

  const copySnippet = async () => {
    await navigator.clipboard.writeText(snippet);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1400);
  };

  return (
    <section id="automations" className="relative overflow-hidden bg-[#090505] px-4 py-20 sm:px-6 md:px-8 md:py-28">
      <div className="pointer-events-none absolute left-1/2 top-0 h-[38rem] w-[70vw] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,90,31,0.18),transparent_64%)] blur-3xl" />
      <div className="pointer-events-none absolute inset-0 opacity-25 [background-image:linear-gradient(rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] [background-size:54px_54px] [mask-image:linear-gradient(to_bottom,transparent,black_18%,black_82%,transparent)]" />

      <div className="relative z-10 mx-auto w-full max-w-7xl">
        <div className="grid gap-8 border-y border-white/10 py-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
          <div>
            <p className="mb-4 flex items-center gap-2 text-[0.65rem] font-semibold uppercase tracking-[0.34em] text-prestige-gold">
              <Zap size={15} /> live automation recipes
            </p>
            <h2 className="max-w-4xl text-4xl font-semibold leading-[0.9] tracking-[-0.075em] text-prestige-ink text-balance sm:text-5xl md:text-6xl">
              Real workflows your team can copy, test, and turn into production systems.
            </h2>
          </div>
          <p className="max-w-lg text-sm leading-7 text-prestige-muted lg:justify-self-end">
            These are intentionally practical: small enough to understand, strong enough to demonstrate the value of a serious automation plan. Use the code, JSON, or script view to copy and prototype.
          </p>
        </div>

        <div className="mt-8 grid gap-5 lg:grid-cols-[0.82fr_1.18fr]">
          <div className="space-y-3">
            {automationRecipes.map((item, index) => {
              const isActive = item.id === recipe.id;
              return (
                <motion.button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setActiveRecipe(item.id);
                    setCopied(false);
                  }}
                  initial={{ opacity: 0, x: -18 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-10%" }}
                  transition={{ duration: 0.45, delay: index * 0.06 }}
                  className={`group w-full overflow-hidden rounded-[1.6rem] border p-4 text-left transition-all duration-300 ${
                    isActive
                      ? "border-prestige-gold/55 bg-prestige-gold/10 shadow-[0_24px_80px_rgba(255,90,31,0.12)]"
                      : "border-white/10 bg-white/[0.025] hover:border-white/18 hover:bg-white/[0.04]"
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="font-mono text-[0.62rem] uppercase tracking-[0.24em] text-prestige-gold">{item.number} / {item.level}</div>
                      <h3 className="mt-4 text-2xl font-semibold leading-[0.95] tracking-[-0.06em] text-prestige-ink sm:text-3xl">
                        {item.title}
                      </h3>
                    </div>
                    <span className={`mt-1 grid h-9 w-9 shrink-0 place-items-center rounded-full border ${isActive ? "border-prestige-gold/50 bg-prestige-gold text-[#180704]" : "border-white/10 text-prestige-muted"}`}>
                      <Check size={15} />
                    </span>
                  </div>
                  <p className="mt-4 text-sm leading-6 text-prestige-muted">{item.outcome}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {item.metrics.map((metric) => (
                      <span key={metric} className="rounded-full border border-white/10 bg-black/20 px-3 py-1.5 font-mono text-[0.58rem] uppercase tracking-[0.18em] text-prestige-muted">
                        {metric}
                      </span>
                    ))}
                  </div>
                </motion.button>
              );
            })}
          </div>

          <motion.div layout className="overflow-hidden rounded-[2rem] border border-white/10 bg-[#100909]/88 shadow-[0_30px_90px_rgba(0,0,0,0.35)]">
            <div className="border-b border-white/10 p-5 sm:p-6">
              <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
                <div>
                  <p className="font-mono text-[0.62rem] uppercase tracking-[0.24em] text-prestige-gold">{recipe.number} automation blueprint</p>
                  <h3 className="mt-3 text-3xl font-semibold leading-[0.95] tracking-[-0.065em] text-prestige-ink sm:text-4xl">
                    {recipe.title}
                  </h3>
                  <p className="mt-4 max-w-2xl text-sm leading-7 text-prestige-muted">{recipe.summary}</p>
                </div>
                <div className="flex flex-wrap gap-2 xl:max-w-xs xl:justify-end">
                  {recipe.stack.map((item) => (
                    <span key={item} className="prestige-glass-chip rounded-full px-3 py-2 text-xs text-prestige-ink">
                      <span className="relative z-[1]">{item}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3 border-b border-white/10 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
              <div className="flex flex-wrap gap-2">
                {(Object.keys(modeMeta) as SnippetMode[]).map((nextMode) => {
                  const Icon = modeMeta[nextMode].icon;
                  return (
                    <button
                      key={nextMode}
                      type="button"
                      onClick={() => setMode(nextMode)}
                      className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-2 font-mono text-[0.62rem] uppercase tracking-[0.18em] transition-all ${
                        mode === nextMode
                          ? "border-prestige-gold/60 bg-prestige-gold text-[#180704]"
                          : "border-white/10 bg-white/[0.03] text-prestige-muted hover:border-prestige-gold/40 hover:text-prestige-ink"
                      }`}
                    >
                      <Icon size={13} />
                      {modeMeta[nextMode].label}
                    </button>
                  );
                })}
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={copySnippet}
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-2 font-mono text-[0.62rem] uppercase tracking-[0.18em] text-prestige-muted transition-all hover:border-prestige-gold/40 hover:text-prestige-ink"
                >
                  {copied ? <ClipboardCheck size={13} className="text-prestige-gold" /> : <Clipboard size={13} />}
                  {copied ? "copied" : "copy"}
                </button>
                <button
                  type="button"
                  onClick={() => downloadText(`${recipe.id}.${extension}`, snippet)}
                  className="inline-flex items-center gap-2 rounded-full border border-prestige-gold/35 bg-prestige-gold/10 px-3.5 py-2 font-mono text-[0.62rem] uppercase tracking-[0.18em] text-prestige-gold transition-all hover:bg-prestige-gold hover:text-[#180704]"
                >
                  <Download size={13} />
                  download
                </button>
              </div>
            </div>

            <div className="relative min-h-[28rem] overflow-hidden bg-black/42">
              <div className="absolute left-0 right-0 top-0 z-10 flex h-10 items-center gap-2 border-b border-white/10 bg-black/70 px-4 backdrop-blur-md">
                <span className="h-2.5 w-2.5 rounded-full bg-[#ff6b42]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#f2b950]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#56c271]" />
                <span className="ml-3 truncate font-mono text-[0.58rem] uppercase tracking-[0.2em] text-white/45">
                  {recipe.id}.{extension}
                </span>
              </div>
              <AnimatePresence mode="wait">
                <motion.pre
                  key={`${recipe.id}-${mode}`}
                  initial={{ opacity: 0, y: 18, filter: "blur(8px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -12, filter: "blur(8px)" }}
                  transition={{ duration: 0.32, ease: [0.32, 0.72, 0, 1] }}
                  className="h-[34rem] overflow-auto px-4 pb-6 pt-14 font-mono text-[0.72rem] leading-6 text-[#f8e9df] [tab-size:2] sm:px-6"
                >
                  <code>{snippet}</code>
                </motion.pre>
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

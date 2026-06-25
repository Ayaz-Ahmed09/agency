"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Activity,
  CheckCircle,
  XCircle,
  Clock,
  Send,
  RefreshCw,
  Terminal,
  TrendingUp,
  ThumbsUp,
  ThumbsDown,
  Layers,
  ArrowUpRight,
  Eye,
  AlertCircle,
  Settings
} from "lucide-react";
import Link from "next/link";

// Initial Mock Logs
const initialLogs = [
  { id: 1, event: "stripe.checkout.completed", status: "success", time: "Just now", details: "Customer: alex@gmail.com - $5,000.00" },
  { id: 2, event: "openai.document.synthesize", status: "success", time: "2 mins ago", details: "Parsed: system_brief.pdf - Tokens: 4,120" },
  { id: 3, event: "linkedin.post.publish", status: "success", time: "12 mins ago", details: "Published ID: li_98412 - Channel: Company Page" },
  { id: 4, event: "meta.conversions.api_send", status: "success", time: "24 mins ago", details: "Event: lead - Match Score: 92%" },
  { id: 5, event: "auth.user.signup_hook", status: "success", time: "1 hour ago", details: "Created Supabase auth record for user ID: 89a2b" },
  { id: 6, event: "mailgun.invoice.notify", status: "error", time: "2 hours ago", details: "Failed sending receipt: API key mismatch on environment" },
];

// Initial Approvals
const initialApprovals = [
  {
    id: "ap-1",
    title: "Meta Ad Copy & Creative v2",
    channel: "Meta Ads",
    preview: "Tired of manual lead tracking? We build automated Supabase workflows that sync conversions directly to your dashboard.",
    status: "pending",
  },
  {
    id: "ap-2",
    title: "LinkedIn Thought Leadership Post",
    channel: "LinkedIn",
    preview: "Why we standardise on Next.js 16. In digital engineering, speed isn't a vanity metric — it is the bedrock of search positioning and ad conversion.",
    status: "pending",
  },
];

// Initial Queue
const initialQueue = [
  { id: "q-1", title: "TypeScript Interface Best Practices", platform: "X.com", schedule: "Scheduled for Today at 18:30" },
  { id: "q-2", title: "Case Study Launch: Zenvia headless migration", platform: "LinkedIn", schedule: "Scheduled for Tomorrow at 09:00" },
];

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<"health" | "approvals" | "queue" | "metrics">("health");
  const [logs, setLogs] = useState(initialLogs);
  const [approvals, setApprovals] = useState(initialApprovals);
  const [queue, setQueue] = useState(initialQueue);
  const [isRunningTest, setIsRunningTest] = useState(false);
  const [apiStates, setApiStates] = useState({
    supabase: true,
    stripe: true,
    openai: true,
    meta: true,
  });

  // Trigger Mock Hook
  const triggerMockHook = () => {
    setIsRunningTest(true);
    setTimeout(() => {
      const mockEvents = [
        { event: "stripe.checkout.completed", details: "Customer: dev@next.js - $2,500.00" },
        { event: "openai.document.synthesize", details: "Parsed: project_blueprint.docx - Tokens: 2,450" },
        { event: "meta.conversions.api_send", details: "Event: purchase - Match Score: 98%" },
        { event: "auth.user.signup_hook", details: "Created Supabase record for user ID: 21x8z" },
      ];
      const selected = mockEvents[Math.floor(Math.random() * mockEvents.length)];
      const newLog = {
        id: Date.now(),
        event: selected.event,
        status: "success",
        time: "Just now",
        details: selected.details,
      };
      setLogs((prev) => [newLog, ...prev.slice(0, 7)]);
      setIsRunningTest(false);
    }, 600);
  };

  // Toggle API State
  const toggleApi = (api: keyof typeof apiStates) => {
    setApiStates((prev) => ({ ...prev, [api]: !prev[api] }));
  };

  // Handle Approvals
  const handleApproval = (id: string, action: "approved" | "changes") => {
    setApprovals((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: action } : item))
    );
  };

  // Publish Now
  const handlePublishNow = (id: string) => {
    const item = queue.find((q) => q.id === id);
    if (!item) return;

    // Add log
    const newLog = {
      id: Date.now(),
      event: `${item.platform.toLowerCase()}.post.publish`,
      status: "success",
      time: "Just now",
      details: `Instantly published queued item: "${item.title.substring(0, 20)}..."`,
    };

    setLogs((prev) => [newLog, ...prev]);
    setQueue((prev) => prev.filter((q) => q.id !== id));
  };

  return (
    <main className="min-h-[100dvh] bg-prestige-canvas px-4 py-28 text-prestige-ink overflow-hidden select-none relative">
      {/* Glow layers */}
      <div className="absolute top-1/4 left-1/4 w-[30rem] h-[30rem] rounded-full bg-prestige-gold/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[35rem] h-[35rem] rounded-full bg-prestige-gold-deep/10 blur-[130px] pointer-events-none" />

      <div className="mx-auto max-w-6xl space-y-8 relative z-10">
        
        {/* Cockpit Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/5">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-prestige-gold animate-ping" />
              <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-prestige-gold font-bold">
                OPERATIONAL FLIGHT DECK
              </span>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tighter text-white">
              System Dashboard.
            </h1>
            <p className="text-xs md:text-sm text-prestige-muted max-w-lg">
              Interact with this live preview panel to see how we build back-end pipelines. Check logs, approve assets, or trigger automations.
            </p>
          </div>
          
          <Link
            href="/"
            className="group flex items-center gap-2.5 rounded-full border border-white/10 hover:border-prestige-gold/20 bg-white/5 hover:bg-prestige-gold/5 text-prestige-ink px-5 py-2.5 text-xs uppercase tracking-widest font-bold transition-all duration-300"
          >
            Return Home
          </Link>
        </div>

        {/* Cockpit Layout */}
        <div className="grid gap-8 lg:grid-cols-[250px_1fr]">
          
          {/* Sidebar Tabs */}
          <div className="space-y-4">
            <span className="block text-[8px] uppercase tracking-widest font-mono text-prestige-muted font-bold pl-3">
              CONTROL NAVIGATION
            </span>
            <div className="flex flex-row lg:flex-col overflow-x-auto lg:overflow-x-visible gap-2 pb-2 lg:pb-0">
              <button
                onClick={() => setActiveTab("health")}
                className={`flex items-center gap-3 w-full text-left px-4 py-3 rounded-xl text-xs uppercase tracking-wider font-bold transition-all duration-300 border ${
                  activeTab === "health"
                    ? "bg-prestige-gold/10 border-prestige-gold/30 text-prestige-gold"
                    : "bg-white/5 border-transparent text-prestige-muted hover:text-white hover:bg-white/10"
                }`}
              >
                <Activity size={14} />
                <span>Automation Health</span>
              </button>

              <button
                onClick={() => setActiveTab("approvals")}
                className={`flex items-center gap-3 w-full text-left px-4 py-3 rounded-xl text-xs uppercase tracking-wider font-bold transition-all duration-300 border ${
                  activeTab === "approvals"
                    ? "bg-prestige-gold/10 border-prestige-gold/30 text-prestige-gold"
                    : "bg-white/5 border-transparent text-prestige-muted hover:text-white hover:bg-white/10"
                }`}
              >
                <CheckCircle size={14} />
                <span>Creative Approvals</span>
              </button>

              <button
                onClick={() => setActiveTab("queue")}
                className={`flex items-center gap-3 w-full text-left px-4 py-3 rounded-xl text-xs uppercase tracking-wider font-bold transition-all duration-300 border ${
                  activeTab === "queue"
                    ? "bg-prestige-gold/10 border-prestige-gold/30 text-prestige-gold"
                    : "bg-white/5 border-transparent text-prestige-muted hover:text-white hover:bg-white/10"
                }`}
              >
                <Send size={14} />
                <span>Publishing Queue</span>
              </button>

              <button
                onClick={() => setActiveTab("metrics")}
                className={`flex items-center gap-3 w-full text-left px-4 py-3 rounded-xl text-xs uppercase tracking-wider font-bold transition-all duration-300 border ${
                  activeTab === "metrics"
                    ? "bg-prestige-gold/10 border-prestige-gold/30 text-prestige-gold"
                    : "bg-white/5 border-transparent text-prestige-muted hover:text-white hover:bg-white/10"
                }`}
              >
                <TrendingUp size={14} />
                <span>Growth Metrics</span>
              </button>
            </div>

            {/* Static System Health Widget */}
            <div className="hidden lg:block p-4 rounded-2xl bg-[#151010]/30 border border-white/5 space-y-4">
              <span className="block text-[8px] uppercase tracking-widest font-mono text-prestige-muted font-bold">
                API CONNECTIONS
              </span>
              <div className="space-y-2.5">
                {Object.entries(apiStates).map(([key, state]) => (
                  <div key={key} className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-prestige-ink uppercase">{key}</span>
                    <button
                      onClick={() => toggleApi(key as keyof typeof apiStates)}
                      className={`h-4 w-8 rounded-full p-0.5 transition-all duration-300 ${
                        state ? "bg-green-500/20 border border-green-500/30" : "bg-red-500/20 border border-red-500/30"
                      }`}
                    >
                      <div className={`h-2.5 w-2.5 rounded-full transition-all duration-300 ${
                        state ? "bg-green-500 translate-x-4" : "bg-red-500 translate-x-0"
                      }`} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Main Dashboard Display Area */}
          <div className="p-1 rounded-[2rem] bg-[#151010]/35 border border-white/10 backdrop-blur-xl">
            <div className="border border-white/5 rounded-[calc(2rem-0.375rem)] bg-gradient-to-b from-[#181211]/90 to-[#0e0a0a]/95 p-6 md:p-8 space-y-6 shadow-[inset_0_1px_1px_rgba(255,255,255,0.08)] min-h-[30rem]">
              
              {/* Active display depending on tab */}
              <AnimatePresence mode="wait">
                
                {/* 1. HEALTH / LOGS TAB */}
                {activeTab === "health" && (
                  <motion.div
                    key="health"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    <div className="flex items-center justify-between gap-4 flex-wrap">
                      <div className="space-y-1">
                        <h3 className="text-lg font-bold text-white uppercase tracking-wider font-mono flex items-center gap-2">
                          <Terminal size={16} className="text-prestige-gold" />
                          Live Event Logs
                        </h3>
                        <p className="text-xs text-prestige-muted font-mono">
                          Webhook callbacks and API handler loops running in current cycle.
                        </p>
                      </div>
                      
                      <button
                        onClick={triggerMockHook}
                        disabled={isRunningTest}
                        className="group flex items-center gap-2 rounded-full bg-prestige-gold hover:bg-prestige-gold/90 text-[#0b0707] px-4 py-2 text-[10px] uppercase tracking-wider font-black transition-all duration-300 disabled:opacity-50"
                      >
                        <RefreshCw size={12} className={isRunningTest ? "animate-spin" : "group-hover:rotate-18" } />
                        {isRunningTest ? "TRIGGERING..." : "TRIGGER MOCK HOOK"}
                      </button>
                    </div>

                    <div className="space-y-3 font-mono">
                      {logs.map((log) => (
                        <div
                          key={log.id}
                          className="p-3.5 rounded-xl bg-[#0b0707]/60 border border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-2.5 text-left text-xs"
                        >
                          <div className="flex items-center gap-3">
                            {log.status === "success" ? (
                              <span className="flex h-2 w-2 rounded-full bg-green-500" />
                            ) : (
                              <span className="flex h-2 w-2 rounded-full bg-red-500" />
                            )}
                            <span className="font-bold text-white">{log.event}</span>
                            <span className="text-prestige-muted text-[10px] truncate max-w-[280px] md:max-w-none">
                              {log.details}
                            </span>
                          </div>
                          <span className="text-[10px] text-prestige-muted text-right flex-shrink-0">
                            {log.time}
                          </span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* 2. CREATIVE APPROVALS TAB */}
                {activeTab === "approvals" && (
                  <motion.div
                    key="approvals"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    <div className="space-y-1">
                      <h3 className="text-lg font-bold text-white uppercase tracking-wider font-mono">
                        Asset Approval Pipeline
                      </h3>
                      <p className="text-xs text-prestige-muted font-mono">
                        Review mock copies and graphics ready for production deployment.
                      </p>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2">
                      {approvals.map((item) => (
                        <div
                          key={item.id}
                          className="p-1 rounded-2xl bg-[#0b0707]/40 border border-white/10 hover:border-prestige-gold/20 flex flex-col justify-between"
                        >
                          <div className="p-4 space-y-4">
                            <div className="flex items-center justify-between">
                              <span className="text-[9px] font-mono text-prestige-gold bg-prestige-gold/10 border border-prestige-gold/20 px-2 py-0.5 rounded">
                                {item.channel.toUpperCase()}
                              </span>
                              <span className={`text-[9px] font-mono px-2 py-0.5 rounded border uppercase ${
                                item.status === "pending"
                                  ? "text-yellow-500 bg-yellow-500/10 border-yellow-500/20"
                                  : item.status === "approved"
                                  ? "text-green-500 bg-green-500/10 border-green-500/20"
                                  : "text-red-500 bg-red-500/10 border-red-500/20"
                              }`}>
                                {item.status}
                              </span>
                            </div>
                            <h4 className="text-sm font-bold text-white tracking-tight">
                              {item.title}
                            </h4>
                            <p className="text-xs text-prestige-muted leading-relaxed font-mono bg-[#0b0707]/60 p-3 rounded-lg border border-white/5">
                              "{item.preview}"
                            </p>
                          </div>

                          {item.status === "pending" && (
                            <div className="border-t border-white/5 grid grid-cols-2 p-1.5 gap-1.5">
                              <button
                                onClick={() => handleApproval(item.id, "changes")}
                                className="flex items-center justify-center gap-1.5 rounded-lg bg-red-500/15 border border-red-500/25 hover:bg-red-500/25 text-red-500 py-2 text-[10px] uppercase tracking-wider font-bold transition-all duration-300"
                              >
                                <ThumbsDown size={12} />
                                Request Changes
                              </button>
                              <button
                                onClick={() => handleApproval(item.id, "approved")}
                                className="flex items-center justify-center gap-1.5 rounded-lg bg-green-500/15 border border-green-500/25 hover:bg-green-500/25 text-green-500 py-2 text-[10px] uppercase tracking-wider font-bold transition-all duration-300"
                              >
                                <ThumbsUp size={12} />
                                Approve
                              </button>
                            </div>
                          )}

                          {item.status !== "pending" && (
                            <div className="border-t border-white/5 p-3 text-center text-[10px] font-mono uppercase text-prestige-muted bg-[#0b0707]/10 rounded-b-2xl">
                              Status Lock: {item.status}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* 3. PUBLISHING QUEUE TAB */}
                {activeTab === "queue" && (
                  <motion.div
                    key="queue"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    <div className="space-y-1">
                      <h3 className="text-lg font-bold text-white uppercase tracking-wider font-mono">
                        Social Publishing Queue
                      </h3>
                      <p className="text-xs text-prestige-muted font-mono">
                        Approved assets awaiting scheduled publication routines.
                      </p>
                    </div>

                    <div className="space-y-4">
                      {queue.length === 0 ? (
                        <div className="py-12 text-center text-xs font-mono text-prestige-muted border border-dashed border-white/10 rounded-xl">
                          All posts in queue have been successfully published.
                        </div>
                      ) : (
                        queue.map((item) => (
                          <div
                            key={item.id}
                            className="p-4 rounded-xl bg-[#0b0707]/50 border border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-4 text-left font-mono"
                          >
                            <div className="space-y-1.5">
                              <div className="flex items-center gap-2">
                                <span className="text-[9px] uppercase font-bold text-prestige-gold bg-prestige-gold/10 border border-prestige-gold/20 px-2 py-0.5 rounded">
                                  {item.platform}
                                </span>
                                <span className="text-[10px] text-prestige-muted flex items-center gap-1">
                                  <Clock size={10} />
                                  {item.schedule}
                                </span>
                              </div>
                              <p className="text-xs font-bold text-white">
                                {item.title}
                              </p>
                            </div>

                            <button
                              onClick={() => handlePublishNow(item.id)}
                              className="flex items-center justify-center gap-1.5 rounded-lg bg-prestige-gold text-[#0b0707] px-4 py-2 text-[10px] uppercase tracking-wider font-black transition-all duration-300"
                            >
                              <Send size={10} />
                              Publish Now
                            </button>
                          </div>
                        ))
                      )}
                    </div>
                  </motion.div>
                )}

                {/* 4. METRICS & ATTRIBUTION TAB */}
                {activeTab === "metrics" && (
                  <motion.div
                    key="metrics"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    <div className="space-y-1">
                      <h3 className="text-lg font-bold text-white uppercase tracking-wider font-mono">
                        Attribution & Performance metrics
                      </h3>
                      <p className="text-xs text-prestige-muted font-mono">
                        Aggregated client conversion funnel statistics.
                      </p>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 font-mono">
                      
                      <div className="p-4 rounded-xl bg-[#0b0707]/50 border border-white/5 space-y-1 text-left">
                        <span className="block text-[8px] uppercase tracking-widest text-prestige-muted">
                          AD SPEND (META/GOOGLE)
                        </span>
                        <span className="text-lg font-black text-white">$4,200.00</span>
                        <span className="text-[9px] text-green-500 block">+14% vs last week</span>
                      </div>

                      <div className="p-4 rounded-xl bg-[#0b0707]/50 border border-white/5 space-y-1 text-left">
                        <span className="block text-[8px] uppercase tracking-widest text-prestige-muted">
                          CONVERSIONS
                        </span>
                        <span className="text-lg font-black text-white">124 Leads</span>
                        <span className="text-[9px] text-green-500 block">+21% vs last week</span>
                      </div>

                      <div className="p-4 rounded-xl bg-[#0b0707]/50 border border-white/5 space-y-1 text-left">
                        <span className="block text-[8px] uppercase tracking-widest text-prestige-muted">
                          CUSTOMER CAC
                        </span>
                        <span className="text-lg font-black text-prestige-gold">$33.87</span>
                        <span className="text-[9px] text-green-500 block">-34% efficiency boost</span>
                      </div>

                      <div className="p-4 rounded-xl bg-[#0b0707]/50 border border-white/5 space-y-1 text-left">
                        <span className="block text-[8px] uppercase tracking-widest text-prestige-muted">
                          ESTIMATED ROAS
                        </span>
                        <span className="text-lg font-black text-white">3.4x</span>
                        <span className="text-[9px] text-green-500 block">Optimal health range</span>
                      </div>

                    </div>

                    {/* Funnel source distribution */}
                    <div className="p-5 rounded-xl bg-[#0b0707]/50 border border-white/5 space-y-4 text-left">
                      <span className="block text-[9px] uppercase tracking-widest font-mono text-prestige-muted font-bold">
                        LEAD CONVERSION SOURCES
                      </span>
                      <div className="space-y-3 font-mono text-xs">
                        
                        <div className="space-y-1.5">
                          <div className="flex justify-between font-bold text-white text-[10px]">
                            <span>Google Search Ads</span>
                            <span>42% (52 leads)</span>
                          </div>
                          <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                            <div className="h-full bg-prestige-gold rounded-full" style={{ width: "42%" }} />
                          </div>
                        </div>

                        <div className="space-y-1.5">
                          <div className="flex justify-between font-bold text-white text-[10px]">
                            <span>Meta Retargeting</span>
                            <span>38% (47 leads)</span>
                          </div>
                          <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                            <div className="h-full bg-prestige-gold rounded-full" style={{ width: "38%" }} />
                          </div>
                        </div>

                        <div className="space-y-1.5">
                          <div className="flex justify-between font-bold text-white text-[10px]">
                            <span>LinkedIn Organic / Cold DM</span>
                            <span>20% (25 leads)</span>
                          </div>
                          <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                            <div className="h-full bg-prestige-gold rounded-full" style={{ width: "20%" }} />
                          </div>
                        </div>

                      </div>
                    </div>
                  </motion.div>
                )}

              </AnimatePresence>

            </div>
          </div>

        </div>

      </div>
    </main>
  );
}

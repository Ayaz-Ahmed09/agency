"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Phone, ArrowUpRight, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import BrandMark from "@/components/BrandMark";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: "web-dev",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate submission
    setTimeout(() => {
      setSubmitted(true);
    }, 800);
  };

  return (
    <section id="contact" className="relative overflow-hidden bg-prestige-canvas px-4 py-24 md:px-8 md:py-32">
      <Image
        src="/brand/logo-construction-panel.jpg"
        alt=""
        fill
        sizes="100vw"
        className="pointer-events-none select-none object-cover opacity-[0.18] mix-blend-screen"
      />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,90,31,0.15),transparent_28rem),linear-gradient(180deg,rgba(11,7,7,0.78),rgba(11,7,7,0.94)_52%,#0b0707)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/12 to-transparent" />

      <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-16 items-start relative z-10">
        
        {/* Left Column: Direct Info */}
        <div className="space-y-8 text-left max-w-sm">
          <div className="space-y-4">
            <span className="text-[10px] uppercase tracking-[0.2em] font-mono text-prestige-gold">
              START A CONVERSATION
            </span>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tighter text-white">
              Let's engineer <br />
              your growth system.
            </h2>
            <p className="text-xs md:text-sm text-prestige-muted leading-relaxed font-normal">
              Have an active channel bottleneck, a website redesign, or an automation requirement? Reach out for a blueprint analysis.
            </p>
          </div>

          <div className="space-y-6 pt-6">
            <div className="flex items-center gap-4 group">
              <div className="h-10 w-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-prestige-muted group-hover:text-prestige-gold group-hover:border-prestige-gold/30 transition-all duration-300">
                <Mail size={16} strokeWidth={1.5} />
              </div>
              <div>
                <span className="block text-[8px] uppercase tracking-widest font-mono text-prestige-muted">
                  EMAIL US DIRECTLY
                </span>
                <a href="mailto:systems@presitgious.tech" className="text-sm font-bold text-white hover:text-prestige-gold font-mono transition-colors">
                  systems@presitgious.tech
                </a>
              </div>
            </div>

            <div className="flex items-center gap-4 group">
              <div className="h-10 w-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-prestige-muted group-hover:text-prestige-gold group-hover:border-prestige-gold/30 transition-all duration-300">
                <Phone size={16} strokeWidth={1.5} />
              </div>
              <div>
                <span className="block text-[8px] uppercase tracking-widest font-mono text-prestige-muted">
                  CALL OR TEXT
                </span>
                <a href="tel:+13128471928" className="text-sm font-bold text-white hover:text-prestige-gold font-mono transition-colors">
                  +1 (312) 847-1928
                </a>
              </div>
            </div>

            <div className="flex items-center gap-4 group">
              <div className="h-10 w-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-prestige-muted group-hover:text-prestige-gold group-hover:border-prestige-gold/30 transition-all duration-300">
                <MapPin size={16} strokeWidth={1.5} />
              </div>
              <div>
                <span className="block text-[8px] uppercase tracking-widest font-mono text-prestige-muted">
                  HEADQUARTERS
                </span>
                <span className="text-sm font-bold text-white font-mono">
                  Remote-first studio
                </span>
              </div>
            </div>
          </div>

          <div className="glass-gold overflow-hidden rounded-[1.65rem] p-2">
            <div className="relative z-[1] overflow-hidden rounded-[1.35rem] border border-white/10 bg-[#0b0707]">
              <div className="flex items-center gap-3 border-b border-white/10 px-4 py-3">
                <BrandMark className="h-9 w-9" />
                <div>
                  <div className="font-mono text-[0.62rem] uppercase tracking-[0.22em] text-prestige-gold">
                    business card
                  </div>
                  <div className="mt-1 text-xs text-prestige-muted">
                    Prestige in motion.
                  </div>
                </div>
              </div>
              <div className="relative aspect-[1.18/1] overflow-hidden">
                <Image
                  src="/brand/business-card-panel.jpg"
                  alt="Prestigious Tech black and gold business card"
                  fill
                  sizes="(max-width: 1024px) 92vw, 26rem"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Dynamic Intake Form - Double Bezel Layout */}
        <div className="w-full max-w-2xl rounded-[2.5rem] border border-white/10 bg-[#151010]/54 p-1 shadow-[0_30px_100px_rgba(0,0,0,0.38)] transition-all duration-500 hover:border-prestige-gold/20">
          <div className="rounded-[calc(2.5rem-0.375rem)] border border-white/5 bg-gradient-to-b from-[#181211]/96 to-[#0b0808]/98 p-6 shadow-[inset_0_1px_1px_rgba(255,255,255,0.08)] md:p-10">
            
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-16 text-center space-y-4"
              >
                <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-prestige-gold/15 border border-prestige-gold/30 text-prestige-gold">
                  <CheckCircle2 size={32} />
                </div>
                <h3 className="text-2xl font-bold text-white tracking-tight">
                  Blueprint inquiry received.
                </h3>
                <p className="text-xs md:text-sm text-prestige-muted max-w-sm mx-auto leading-relaxed">
                    Our systems director will review your details and reply with a diagnostic audit route within 24 hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="text-xs uppercase tracking-widest font-bold text-prestige-gold hover:text-white transition-colors pt-4"
                >
                  Submit another inquiry
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Name */}
                <div className="space-y-2">
                  <label htmlFor="name" className="block text-[9px] uppercase tracking-widest font-mono text-prestige-muted font-bold">
                    YOUR FULL NAME
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter your name"
                    className="prestige-input"
                  />
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-[9px] uppercase tracking-widest font-mono text-prestige-muted font-bold">
                    EMAIL ADDRESS
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="you@company.com"
                    className="prestige-input"
                  />
                </div>

                {/* Service Selection */}
                <div className="space-y-2">
                  <label htmlFor="service" className="block text-[9px] uppercase tracking-widest font-mono text-prestige-muted font-bold">
                    REQUIRED SERVICE
                  </label>
                  <select
                    id="service"
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="prestige-input appearance-none cursor-pointer"
                    style={{ backgroundPosition: "right 1rem center", backgroundImage: "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23ff5a1f' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e\")", backgroundRepeat: "no-repeat", backgroundSize: "1.25rem" }}
                  >
                    <option value="web-dev" className="bg-[#151010] text-prestige-ink">Professional Web Development</option>
                    <option value="automation" className="bg-[#151010] text-prestige-ink">AI Automation Systems</option>
                    <option value="marketing" className="bg-[#151010] text-prestige-ink">Growth Funnels & Marketing</option>
                    <option value="social" className="bg-[#151010] text-prestige-ink">Social Media Handling</option>
                  </select>
                </div>

                {/* Message */}
                <div className="space-y-2">
                  <label htmlFor="message" className="block text-[9px] uppercase tracking-widest font-mono text-prestige-muted font-bold">
                    PROJECT SUMMARY & GOALS
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Outline what you want us to design and build, including any custom automations or pages needed..."
                    className="prestige-input py-3 resize-none"
                  />
                </div>

                {/* Submit button following Button-in-Button design */}
                <div className="pt-4">
                  <button
                    type="submit"
                    className="group relative flex items-center justify-between w-full rounded-full bg-prestige-gold hover:bg-prestige-gold/90 text-[#0b0707] pl-8 pr-3 py-3 text-xs uppercase tracking-widest font-black transition-all duration-300 hover:scale-[1.01] active:scale-[0.98] cursor-pointer"
                  >
                    <span>Request System Blueprint</span>
                    <span className="flex items-center justify-center rounded-full bg-[#0b0707]/10 w-8 h-8 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300">
                      <ArrowUpRight size={14} strokeWidth={2.5} />
                    </span>
                  </button>
                </div>

              </form>
            )}

          </div>
        </div>

      </div>
    </section>
  );
}

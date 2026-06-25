"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";

const testimonials = [
  {
    quote: "Presitgious Tech completely rebuilt our headless e-commerce frontend. The Next.js architecture is incredibly fast, and our store conversion rate surged from 2.6% to 4.2% within the first month. They are engineers with exceptional design taste.",
    author: "Sarah Jenkins",
    role: "Founder, Zenvia Store",
    project: "Headless E-Commerce Overhaul",
  },
  {
    quote: "The custom publishing cockpit they built for us has automated our entire media workflow. We save at least 25 hours a week in asset approvals and publishing across channels. Truly invaluable systems.",
    author: "Marc Chen",
    role: "Operations Director, Qubix",
    project: "Media Automation Cockpit",
  },
  {
    quote: "They designed conversion landers that look expensive and actually convert. The custom server-side attribution tracking they hooked up finally gave us absolute clarity on our paid acquisition ROAS.",
    author: "Devon Harris",
    role: "Growth Lead, MaxFlow",
    project: "Growth Funnels & Attribution",
  },
];

export default function TestimonialSlider() {
  const [activeIdx, setActiveIdx] = useState(0);

  const nextSlide = () => {
    setActiveIdx((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setActiveIdx((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 7000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative py-24 px-4 md:px-8 bg-prestige-canvas overflow-hidden">
      
      {/* Background glowing circle */}
      <div className="absolute bottom-1/3 left-1/2 -translate-x-1/2 w-[35rem] h-[35rem] rounded-full bg-prestige-gold-deep/10 blur-[120px] pointer-events-none" />

      <div className="max-w-4xl w-full mx-auto space-y-12 relative z-10">
        
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-xl mx-auto">
          <span className="text-[10px] uppercase tracking-[0.2em] font-mono text-prestige-gold">
            PROOF OF DELIVERED VALUE
          </span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tighter text-white">
            Trusted by founders <br />
            and growth operators.
          </h2>
        </div>

        {/* Slider Card - Double Bezel Layout */}
        <div className="p-1 rounded-[2.5rem] bg-[#151010]/30 border border-white/10 hover:border-prestige-gold/20 transition-all duration-500 relative">
          
          {/* Inner bezel */}
          <div className="border border-white/5 rounded-[calc(2.5rem-0.375rem)] bg-gradient-to-b from-[#181211]/95 to-[#0b0808]/98 p-8 md:p-12 space-y-8 shadow-[inset_0_1px_1px_rgba(255,255,255,0.08)] relative overflow-hidden min-h-[22rem] flex flex-col justify-between">
            
            {/* Absolute watermark quotes */}
            <Quote size={120} className="absolute -top-6 -right-6 text-white/[0.02] rotate-180 pointer-events-none" />
            
            {/* Stars Row */}
            <div className="flex gap-1 text-prestige-gold">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={14} fill="currentColor" stroke="none" />
              ))}
            </div>

            {/* Quote content inside AnimatePresence */}
            <div className="relative flex-1 flex items-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIdx}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-6"
                >
                  <p className="text-lg md:text-2xl font-medium tracking-tight text-white leading-relaxed font-sans italic">
                    "{testimonials[activeIdx].quote}"
                  </p>
                  
                  {/* Author meta */}
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-4 border-t border-white/5">
                    <div>
                      <h4 className="text-sm font-bold text-white uppercase tracking-wider">
                        {testimonials[activeIdx].author}
                      </h4>
                      <p className="text-xs text-prestige-muted">
                        {testimonials[activeIdx].role}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 text-[10px] font-mono text-prestige-gold bg-prestige-gold/10 border border-prestige-gold/20 px-3 py-1 rounded-full">
                      <span>PROJECT: {testimonials[activeIdx].project}</span>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation Buttons and Dots */}
            <div className="flex items-center justify-between pt-6">
              {/* Dots */}
              <div className="flex gap-2">
                {testimonials.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveIdx(idx)}
                    aria-label={`Go to testimonial ${idx + 1}`}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      activeIdx === idx ? "w-6 bg-prestige-gold" : "w-1.5 bg-white/20 hover:bg-white/40"
                    }`}
                  />
                ))}
              </div>

              {/* Prev / Next */}
              <div className="flex items-center gap-3">
                <button
                  onClick={prevSlide}
                  aria-label="Previous testimonial"
                  className="h-10 w-10 rounded-full border border-white/10 hover:border-prestige-gold/30 bg-white/5 hover:bg-prestige-gold/5 flex items-center justify-center text-prestige-ink hover:text-prestige-gold transition-all duration-300"
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  onClick={nextSlide}
                  aria-label="Next testimonial"
                  className="h-10 w-10 rounded-full border border-white/10 hover:border-prestige-gold/30 bg-white/5 hover:bg-prestige-gold/5 flex items-center justify-center text-prestige-ink hover:text-prestige-gold transition-all duration-300"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}

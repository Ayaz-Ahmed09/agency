"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Star } from "lucide-react";
import CurvedLoop from "./CurvedLoop";
import TextPressure from "./TextPressure";

const reviewers = [
  { name: "RZ", tone: "from-[#ff9f6e] to-[#6d120d]" },
  { name: "AK", tone: "from-[#f5f1ea] to-[#ff5a1f]" },
  { name: "MS", tone: "from-[#ff7840] to-[#211210]" },
  { name: "HN", tone: "from-[#a59b93] to-[#3a1711]" },
];

// Variation 1: Original with dual floating paths
function Variation1() {
  const paths = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    d: `M-${480 - i * 15} -${189 + i * 20}C-${200} ${200} ${500} ${500} ${600} ${1000}`,
    width: 0.005 + i * 0.02,
  }));

  const pathsReverse = Array.from({ length: 30 }, (_, i) => ({
    id: i + 32,
    d: `M${580 - i * 50} -${189 + i * 50}C${100} ${200} ${300} ${400} ${600} ${800}`,
    width: 1.25 + i * 0.01,
  }));

  return (
    <div className="relative flex h-full min-h-0 w-full items-center justify-center overflow-hidden bg-black">
      <div className="absolute inset-0 pointer-events-none">
        <svg
          className="h-full w-full text-orange-500"
          viewBox="20 0 406 306"
          fill="none"
        >
          {paths.map((path) => (
            <motion.path
              key={path.id}
              d={path.d}
              stroke="currentColor"
              strokeWidth={path.width}
              strokeOpacity={0.01 + path.id * 0.06}
              initial={{ pathLength: 1, opacity: 0.8 }}
              animate={{
                pathLength: 3,
                opacity: [0.2, 1, 0.1],
                pathOffset: [0., 1, 0],
              }}
              transition={{
                duration: 40 + Math.random() * 40,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          ))}
          {pathsReverse.map((path) => (
            <motion.path
              key={path.id}
              d={path.d}
              stroke="currentColor"
              strokeWidth={path.width}
              strokeOpacity={0.1 + (path.id - 6) * 0.08}
              initial={{ pathLength: 0.3, opacity: 0.6 }}
              animate={{
                pathLength: 3,
                opacity: [0.3, 0.6, 0.3],
                pathOffset: [0, 1, 0],
              }}
              transition={{
                duration: 20 + Math.random() * 10,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          ))}
        </svg>
      </div>

      <div className="container relative z-10 mx-auto px-4 text-center md:px-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
          className="mx-auto flex max-w-4xl flex-col items-center"
        >
          <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.035] px-3 py-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-md">
            <div className="flex -space-x-2">
              {reviewers.map((reviewer) => (
                <span
                  key={reviewer.name}
                  className={`grid h-7 w-7 place-items-center rounded-full border border-[#0b0707] bg-gradient-to-br ${reviewer.tone} text-[0.55rem] font-bold text-[#170705] shadow-[0_6px_18px_rgba(0,0,0,0.28)]`}
                  aria-label={`${reviewer.name} client avatar`}
                >
                  {reviewer.name}
                </span>
              ))}
            </div>
            <div className="h-7 w-px bg-white/10" />
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-0.5 text-prestige-gold" aria-label="Five star reviews">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={13} fill="currentColor" strokeWidth={1.6} />
                ))}
              </span>
              <span className="font-mono text-[0.58rem] font-semibold uppercase tracking-[0.18em] text-prestige-muted">
                client rated
              </span>
            </div>
          </div>

          <div className="mb-8 w-full" style={{ height: 'clamp(60px, 12vw, 120px)' }}>
            <TextPressure
              text="Prestigious Tech"
              flex={true}
              alpha={false}
              stroke={false}
              width={true}
              weight={true}
              italic={true}
              scale={true}
              textColor="#f5f1ea"
              minFontSize={36}
            />
          </div>

          <div className="group relative w-full max-w-[21rem] sm:w-auto sm:max-w-none">
            <Link
              href="#services"
              className="inline-flex min-h-14 w-full items-center justify-center gap-3 rounded-[1.15rem] border border-prestige-gold/65 bg-prestige-gold px-5 py-4 text-center font-mono text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-[#170705] shadow-[0_18px_50px_rgba(255,90,31,0.22),inset_0_1px_0_rgba(255,255,255,0.3)] transition-all duration-300 hover:border-[#ff9a66] hover:bg-[#ff7840] active:translate-y-px sm:min-h-16 sm:w-auto sm:px-7 sm:text-xs sm:tracking-[0.22em]"
              aria-label="Explore services"
            >
              <span className="whitespace-nowrap text-white">
                Explore services
              </span>
              <ArrowRight
                size={16}
                strokeWidth={2.2}
                color="white"
                className="shrink-0 transition-transform duration-300 group-hover:translate-x-1 "
              />
            </Link>
          </div>

        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 lg:top-0 top-[70%] w-full pointer-events-none translate-y-[30%] sm:translate-y-[20%] md:translate-y-0">
        <CurvedLoop
          marqueeText="✦ AI Automation ✦ Web Development ✦ Digital Marketing ✦"
          speed={1.5}
          curveAmount={300}
          direction="left"
          interactive={true} className={undefined}        />
      </div>
    </div>
  );
}

export default function BackgroundPathsShowcase() {
  return (
    <div className="h-[100dvh] min-h-[100dvh] w-full overflow-hidden bg-black">
      <Variation1 />
    </div>
  );
}

"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Star } from "lucide-react";

const agencyWords = "Presitgious Tech".split(" ");

const reviewers = [
  { name: "RZ", tone: "from-[#ff9f6e] to-[#6d120d]" },
  { name: "AK", tone: "from-[#f5f1ea] to-[#ff5a1f]" },
  { name: "MS", tone: "from-[#ff7840] to-[#211210]" },
  { name: "HN", tone: "from-[#a59b93] to-[#3a1711]" },
];

// Variation 1: Original with dual floating paths
function Variation1() {
  const words = agencyWords;

  const paths = Array.from({ length: 36 }, (_, i) => ({
    id: i,
    d: `M-${380 - i * 5} -${189 + i * 6}C-${380 - i * 5} -${189 + i * 6} -${
      312 - i * 5
    } ${216 - i * 6} ${152 - i * 5} ${343 - i * 6}C${616 - i * 5} ${
      470 - i * 6
    } ${684 - i * 5} ${875 - i * 6} ${684 - i * 5} ${875 - i * 6}`,
    width: 0.5 + i * 0.03,
  }));

  const pathsReverse = Array.from({ length: 36 }, (_, i) => ({
    id: i + 36,
    d: `M-${380 - i * -5} -${189 + i * 6}C-${380 - i * -5} -${189 + i * 6} -${
      312 - i * -5
    } ${216 - i * 6} ${152 - i * -5} ${343 - i * 6}C${616 - i * -5} ${
      470 - i * 6
    } ${684 - i * -5} ${875 - i * 6} ${684 - i * -5} ${875 - i * 6}`,
    width: 0.5 + i * 0.03,
  }));

  return (
    <div className="relative flex h-full min-h-0 w-full items-center justify-center overflow-hidden bg-black">
      <div className="absolute inset-0 pointer-events-none">
        <svg
          className="h-full w-full text-orange-500"
          viewBox="0 0 696 316"
          fill="none"
        >
          {paths.map((path) => (
            <motion.path
              key={path.id}
              d={path.d}
              stroke="currentColor"
              strokeWidth={path.width}
              strokeOpacity={0.1 + path.id * 0.03}
              initial={{ pathLength: 0.3, opacity: 0.6 }}
              animate={{
                pathLength: 1,
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
          {pathsReverse.map((path) => (
            <motion.path
              key={path.id}
              d={path.d}
              stroke="currentColor"
              strokeWidth={path.width}
              strokeOpacity={0.1 + (path.id - 36) * 0.03}
              initial={{ pathLength: 0.3, opacity: 0.6 }}
              animate={{
                pathLength: 1,
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

          <h1 className="mb-8 text-4xl font-bold tracking-tighter text-prestige-ink sm:text-5xl md:text-6xl">
            {words.map((word, wordIndex) => (
              <span key={wordIndex} className="mr-4 inline-block last:mr-0">
                {word.split("").map((letter, letterIndex) => (
                  <motion.span
                    key={`${wordIndex}-${letterIndex}`}
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{
                      delay: wordIndex * 0.1 + letterIndex * 0.03,
                      type: "spring",
                      stiffness: 150,
                      damping: 25,
                    }}
                    className="inline-block text-prestige-ink"
                  >
                    {letter}
                  </motion.span>
                ))}
              </span>
            ))}
          </h1>

          <div className="group relative w-full max-w-[21rem] sm:w-auto sm:max-w-none">
            <Link
              href="#services"
              className="inline-flex min-h-14 w-full items-center justify-center gap-3 rounded-[1.15rem] border border-prestige-gold/65 bg-prestige-gold px-5 py-4 text-center font-mono text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-[#170705] shadow-[0_18px_50px_rgba(255,90,31,0.22),inset_0_1px_0_rgba(255,255,255,0.3)] transition-all duration-300 hover:border-[#ff9a66] hover:bg-[#ff7840] active:translate-y-px sm:min-h-16 sm:w-auto sm:px-7 sm:text-xs sm:tracking-[0.22em]"
              aria-label="Explore services"
            >
              <span className="whitespace-nowrap">
                Explore services
              </span>
              <ArrowRight
                size={16}
                strokeWidth={2.2}
                className="shrink-0 transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </div>
        </motion.div>
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

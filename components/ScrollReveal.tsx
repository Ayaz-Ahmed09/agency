"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
  duration?: number;
}

export default function ScrollReveal({
  children,
  delay = 0,
  direction = "up",
  duration = 0.8,
}: ScrollRevealProps) {
  const directions = {
    up: { y: 40, x: 0 },
    down: { y: -40, x: 0 },
    left: { y: 0, x: 40 },
    right: { y: 0, x: -40 },
  };

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: directions[direction].y,
        x: directions[direction].x,
        filter: "blur(8px)",
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        x: 0,
        filter: "blur(0px)",
      }}
      viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
      transition={{
        duration: duration,
        delay: delay,
        ease: [0.25, 0.8, 0.25, 1], // Custom smooth cubic bezier
      }}
    >
      {children}
    </motion.div>
  );
}

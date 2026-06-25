"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function TechCompanyHero() {
  const title = "Elevate Your Digital Presence";
  const words = title.split(" ");

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

  const services = [
    {
      icon: "⚡",
      title: "Web Development",
      description: "Custom websites & web applications",
    },
    {
      icon: "🤖",
      title: "AI Automation",
      description: "Intelligent workflow solutions",
    },
    {
      icon: "📊",
      title: "Digital Marketing",
      description: "Data-driven growth strategies",
    },
    {
      icon: "💬",
      title: "Social Media",
      description: "Engagement & brand management",
    },
  ];

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-black">
      {/* Animated Background Paths */}
      <div className="absolute inset-0 pointer-events-none">
        <svg
          className="w-full h-full text-orange-500"
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

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
          className="max-w-7xl mx-auto"
        >
          {/* Main Heading */}
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-block mb-6"
            >
              <span className="text-orange-500 text-sm md:text-base font-semibold tracking-wider uppercase">
                Premium Digital Solutions
              </span>
            </motion.div>

            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6 tracking-tight">
              {words.map((word, wordIndex) => (
                <span key={wordIndex} className="inline-block mr-3 last:mr-0">
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
                      className="inline-block text-white"
                    >
                      {letter}
                    </motion.span>
                  ))}
                </span>
              ))}
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-12"
            >
              Transform your business with cutting-edge technology and strategic
              digital solutions tailored for the modern era
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-20"
            >
              <Button className="px-8 py-6 text-lg font-semibold bg-orange-600 hover:bg-orange-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group">
                <span className="opacity-90 group-hover:opacity-100 transition-opacity">
                  Start Your Project
                </span>
                <span className="ml-3 opacity-70 group-hover:opacity-100 group-hover:translate-x-1.5 transition-all duration-300">
                  →
                </span>
              </Button>
              <Button
                variant="outline"
                className="px-8 py-6 text-lg font-semibold bg-transparent hover:bg-white/5 text-white border-2 border-white/20 hover:border-orange-500/50 rounded-xl transition-all duration-300"
              >
                View Our Work
              </Button>
            </motion.div>
          </div>

          {/* Services Grid */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto"
          >
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4 + index * 0.1, duration: 0.6 }}
                className="relative group"
              >
                <div className="relative bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-orange-500/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-orange-500/10">
                  {/* Icon */}
                  <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    {service.icon}
                  </div>

                  {/* Title */}
                  <h3 className="text-white text-xl font-bold mb-2">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-400 text-sm">{service.description}</p>

                  {/* Hover Accent */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-orange-500/0 to-orange-600/0 group-hover:from-orange-500/5 group-hover:to-orange-600/5 transition-all duration-300 pointer-events-none" />
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Stats Section */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8, duration: 0.8 }}
            className="flex flex-wrap justify-center gap-12 mt-20 pt-20 border-t border-white/10"
          >
            {[
              { value: "500+", label: "Projects Delivered" },
              { value: "98%", label: "Client Satisfaction" },
              { value: "50+", label: "Team Experts" },
              { value: "24/7", label: "Support Available" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 2 + index * 0.1, duration: 0.5 }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-bold text-orange-500 mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-400 text-sm uppercase tracking-wider">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Gradient Overlay at Bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent pointer-events-none" />
    </div>
  );
}

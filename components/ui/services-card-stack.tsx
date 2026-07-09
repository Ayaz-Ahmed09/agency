"use client"

import { useState } from "react"
import { motion, AnimatePresence, useReducedMotion } from "framer-motion"
import { Check, ChevronLeft, ChevronRight, Eye } from "lucide-react"
import Image from "next/image"

interface ServiceCard {
  id: number
  serviceIndex: number
}

const services = [
  {
    number: "01",
    title: "Web Development",
    description: "Conversion-focused websites, landing pages, storefronts, dashboards, and custom product interfaces built with speed, taste, and ownership.",
    tags: ["Next.js and React", "Shopify and commerce", "Webflow and WordPress", "Custom portals"],
    image: "/services/web-development.jpg",
    imageAlt: "Web development workstation with a live website build and code editor",
  },
  {
    number: "02",
    title: "AI Automation",
    description: "Workflow automation for intake, CRM routing, lead enrichment, AI replies, reporting, approval queues, and internal operations.",
    tags: ["n8n and Make", "CRM routing", "AI agents", "Custom workflows"],
    image: "/services/ai-automation.jpg",
    imageAlt: "AI automation control room with connected workflow systems",
  },
  {
    number: "03",
    title: "Digital Marketing",
    description: "Google Ads growth, SEO foundations, conversion tracking, funnel reporting, campaign cleanup, and landing-page testing.",
    tags: ["Google Ads", "SEO", "Tracking", "Campaign reporting"],
    image: "/services/digital-marketing.jpg",
    imageAlt: "Digital marketing analytics desk with campaign performance charts",
  },
  {
    number: "04",
    title: "Social Media Handling",
    description: "Content calendars, creative direction, publishing approvals, community replies, performance reports, and reusable brand systems.",
    tags: ["Reels and posts", "Approval flow", "Publishing", "Social reports"],
    image: "/services/social-media-handling.jpg",
    imageAlt: "Social media content studio with a phone camera rig and editing screen",
  },
]

const initialCards: ServiceCard[] = [
  { id: 1, serviceIndex: 0 },
  { id: 2, serviceIndex: 1 },
  { id: 3, serviceIndex: 2 },
]

const positionStyles = [
  { scale: 1, y: 10 },
  { scale: 0.955, y: -22 },
  { scale: 0.91, y: -54 },
]

const exitAnimation = {
  y: 410,
  scale: 1,
  zIndex: 10,
}

const enterAnimation = {
  y: -54,
  scale: 0.91,
}

function ServiceCardContent({
  serviceIndex,
  onViewPlans,
}: {
  serviceIndex: number
  onViewPlans: (serviceNumber: string) => void
}) {
  const service = services[serviceIndex]

  return (
    <div className="flex h-full w-full flex-col gap-4">
      <div className="relative flex h-[188px] w-full items-center justify-center overflow-hidden rounded-[1.15rem] border border-white/10 bg-prestige-panel shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] sm:h-[220px] md:h-[232px]">
        <Image
          src={service.image}
          alt={service.imageAlt}
          fill
          sizes="(max-width: 640px) 91vw, (max-width: 768px) 440px, 480px"
          className="select-none object-cover"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,5,5,0.02),rgba(8,5,5,0.34)),radial-gradient(circle_at_72%_16%,rgba(255,90,31,0.24),transparent_40%)]" />
      </div>

      <div className="flex flex-1 flex-col px-2 pb-2 sm:px-3 sm:pb-3">
        <div className="mb-2 font-mono text-[0.6rem] font-semibold uppercase tracking-[0.28em] text-prestige-gold">
          {service.number} / core capability
        </div>
        <h3 className="text-2xl font-semibold leading-[0.92] tracking-[-0.06em] text-prestige-ink sm:text-3xl">
          {service.title}
        </h3>
        <p className="mt-3 line-clamp-3 text-sm leading-6 text-prestige-muted">
          {service.description}
        </p>

        <div className="mt-auto grid grid-cols-2 gap-2 pt-4">
          {service.tags.map((tag) => (
            <span
              key={tag}
              className=" liquid-fixed inline-flex min-h-9 items-center gap-1.5 rounded-[0.85rem] px-2.5 py-1 text-[0.58rem] font-medium leading-4 text-prestige-ink sm:text-[0.62rem]"
            >
              <Check size={11} className="relative z-[1] shrink-0 text-prestige-gold" />
              <span className="relative z-[1] min-w-0 text-pretty">{tag}</span>
            </span>
          ))}
        </div>

        <button
          type="button"
          onClick={() => onViewPlans(service.number)}
          className="mt-4 inline-flex h-11 w-full items-center justify-center gap-2 rounded-[1.05rem] border border-prestige-gold/60 bg-prestige-gold px-4 font-mono text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-[#170705] shadow-[0_18px_44px_rgba(255,90,31,0.16),inset_0_1px_0_rgba(255,255,255,0.28)] transition-all duration-300 hover:border-[#ff9a66] hover:bg-[#ff7a42] active:translate-y-px"
          aria-label={`See plans for ${service.title}`}
        >
          <Eye size={14} strokeWidth={2} />
          <span>see plan</span>
        </button>
      </div>
    </div>
  )
}

function AnimatedServiceCard({
  card,
  index,
  isAnimating,
  onViewPlans,
}: {
  card: ServiceCard
  index: number
  isAnimating: boolean
  onViewPlans: (serviceNumber: string) => void
}) {
  const { scale, y } = positionStyles[index] ?? positionStyles[2]
  const zIndex = index === 0 && isAnimating ? 10 : 3 - index
  const reduceMotion = useReducedMotion()

  const exitAnim = !reduceMotion && index === 0 ? exitAnimation : undefined
  const initialAnim = !reduceMotion && index === 2 ? enterAnimation : false

  return (
    <motion.div
      key={card.id}
      data-service-card
      initial={initialAnim}
      animate={{ y, scale }}
      exit={exitAnim}
      transition={
        reduceMotion
          ? { duration: 0 }
          : {
            type: "spring",
            duration: 1,
            bounce: 0,
          }
      }
      style={{
        zIndex,
        left: "50%",
        x: "-50%",
        bottom: 0,
      }}
      className="backdrop-blur-md absolute flex h-[452px] w-[min(91vw,23rem)] items-center justify-center rounded-[1.35rem] p-1.5 shadow-[0_34px_96px_rgba(0,0,0,0.44),inset_0_1px_0_rgba(255,255,255,0.1)] will-change-transform sm:h-[504px] sm:w-[27.5rem] md:h-[526px] md:w-[30rem]"
    >
      <div className="relative z-[1] h-full w-full overflow-hidden rounded-[1.05rem] border border-white/10 bg-[linear-gradient(180deg,rgba(17,10,9,0.86),rgba(7,4,4,0.95))] p-2.5">
        <ServiceCardContent serviceIndex={card.serviceIndex} onViewPlans={onViewPlans} />
      </div>
    </motion.div>
  )
}

export default function ServicesCardStack({
  onViewPlans,
}: {
  onViewPlans: (serviceNumber: string) => void
}) {
  const [cards, setCards] = useState(initialCards)
  const [isAnimating, setIsAnimating] = useState(false)
  const [nextId, setNextId] = useState(4)
  const currentLabel = services[cards[0]?.serviceIndex ?? 0].title

  const handleNext = () => {
    if (isAnimating) return
    setIsAnimating(true)

    const lastServiceIndex = cards[2].serviceIndex
    const nextServiceIndex = (lastServiceIndex + 1) % services.length

    setCards([...cards.slice(1), { id: nextId, serviceIndex: nextServiceIndex }])
    setNextId((prev) => prev + 1)

    setTimeout(() => {
      setIsAnimating(false)
    }, 50)
  }

  const handlePrev = () => {
    if (isAnimating) return
    setIsAnimating(true)

    const firstServiceIndex = cards[0].serviceIndex
    const prevServiceIndex = ((firstServiceIndex - 1) % services.length + services.length) % services.length

    setCards([{ id: nextId, serviceIndex: prevServiceIndex }, ...cards.slice(0, 2)])
    setNextId((prev) => prev + 1)

    setTimeout(() => {
      setIsAnimating(false)
    }, 50)
  }

  return (
    <div
      id="services"
      className="relative flex min-h-[760px] w-full flex-col items-center justify-center overflow-hidden   bg-prestige-canvas px-4 py-16 sm:min-h-[860px] sm:px-6 md:min-h-[900px] md:px-8 md:py-24"
    >
      <div className="pointer-events-none absolute left-0 top-8 h-[32rem] w-[16rem] rounded-r-full bg-[radial-gradient(ellipse_at_left,rgba(255,91,25,0.24),transparent_68%)] blur-3xl" />
      <div className="pointer-events-none absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.026)_1px,transparent_1px)] [background-size:72px_72px] [mask-image:linear-gradient(to_bottom,transparent,black_18%,black_86%,transparent)]" />

      <div className="relative z-[1] mb-8 w-full max-w-3xl text-center sm:mb-10">
        <p className="mb-3 font-mono text-[0.6rem] font-semibold uppercase tracking-[0.34em] text-prestige-gold">
          core capabilities
        </p>
        <h2 className="mx-auto max-w-3xl text-4xl font-semibold leading-[0.9] tracking-[-0.07em] text-prestige-ink text-balance sm:text-5xl md:text-6xl">
          Professional services, one operating system.
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-prestige-muted">
          Pick the service track, then open the plan that matches your current growth stage.
        </p>
      </div>

      <div className="relative z-[1] h-[536px] w-full max-w-[38rem] overflow-hidden sm:h-[596px] md:h-[620px]">
        <AnimatePresence initial={false}>
          {cards.slice(0, 3).map((card, index) => (
            <AnimatedServiceCard
              key={card.id}
              card={card}
              index={index}
              isAnimating={isAnimating}
              onViewPlans={onViewPlans}

            />
          ))}
        </AnimatePresence>
      </div>

      <div className="relative z-[2] -mt-px flex w-full max-w-[38rem] items-center justify-center gap-3 border-t border-white/10 py-5 sm:gap-4">
        <button
          onClick={handlePrev}
          className="glass-gold flex h-10 w-10 cursor-pointer select-none items-center justify-center rounded-[1.05rem] text-prestige-muted transition-all hover:text-prestige-ink active:scale-[0.98]"
          aria-label="Previous service"
        >
          <ChevronLeft size={16} className="relative z-[1]" strokeWidth={2.2} />
        </button>

        <span className="min-w-0 p-2 border-px border-orange-600 rounded-xl flex-1 text-center shadow-[0px_3px_10px_rgba(255,60,0,0.64),inset_0_1px_0_rgba(255,255,255,0.1)] font-mono text-[0.58rem] font-semibold uppercase tracking-[0.18em] text-prestige-muted sm:min-w-[180px] sm:flex-none sm:text-[0.62rem] sm:tracking-[0.22em]">
          {currentLabel}
        </span>

        <button
          onClick={handleNext}
          className="glass-gold flex h-10 w-10 cursor-pointer select-none items-center justify-center rounded-[1.05rem] text-prestige-muted transition-all hover:text-prestige-ink active:scale-[0.98]"
          aria-label="Next service"
        >
          <ChevronRight size={16} className="relative z-[1]" strokeWidth={2.2} />
        </button>
      </div>
    </div>
  )
}

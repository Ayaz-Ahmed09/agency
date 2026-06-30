"use client";

import { motion } from "framer-motion";
import { ArrowDownToLine, ArrowRight, ExternalLink, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const projects = [
  {
    number: "01",
    title: "Gulf Residence",
    type: "Completed real estate website",
    label: "completed project",
    description:
      "A polished property website with Arabic-first luxury positioning, cinematic villa imagery, service blocks, and a full-page sales narrative.",
    features: ["Luxury property story", "Arabic-first layout", "Full-page visual funnel"],
    image: "/project-templates/ourrealestate-project.jpeg",
    primaryHref: "/project-templates/ourrealestate-project.jpeg",
    primaryLabel: "view project",
    downloadPrimary: false,
    tags: ["Real estate", "Done project", "Luxury landing"],
  },
  {
    number: "02",
    title: "Atlas Realty",
    type: "Free real estate lead funnel",
    label: "free template",
    description:
      "Real estate template built around neighborhood discovery, broker routing, and property inquiry capture for agencies and solo brokers.",
    features: ["Neighborhood sections", "Inquiry CTA path", "Broker lead routing"],
    image: "/project-templates/atlas-realty.png",
    primaryHref: "/project-templates/html/atlas-realty.html",
    primaryLabel: "download code",
    downloadPrimary: true,
    tags: ["Real estate", "Lead capture", "Free template"],
  },
  {
    number: "03",
    title: "Aurelia Home",
    type: "Free ecommerce storefront",
    label: "free template",
    description:
      "Editorial ecommerce template with campaign hero, collection highlights, social proof, and a conversion-ready footer for premium storefronts.",
    features: ["Collection grid", "Campaign hero", "Checkout CTA path"],
    image: "/project-templates/aurelia-home.png",
    primaryHref: "/project-templates/html/aurelia-home.html",
    primaryLabel: "download code",
    downloadPrimary: true,
    tags: ["Ecommerce", "Campaign pages", "Free template"],
  },
  {
    number: "04",
    title: "Nova Smile Clinic",
    type: "Free clinic booking website",
    label: "free template",
    description:
      "Trust-first service template with booking flow, service cards, provider content, testimonials, and a clear inquiry funnel for real practices.",
    features: ["Booking-first hero", "Provider proof block", "Consultation CTA path"],
    image: "/project-templates/nova-smile-clinic.png",
    primaryHref: "/project-templates/html/nova-smile-clinic.html",
    primaryLabel: "download code",
    downloadPrimary: true,
    tags: ["Clinic", "Booking", "Free template"],
  },
  {
    number: "05",
    title: "FlowOps Console",
    type: "Free SaaS launch page",
    label: "free template",
    description:
      "High-contrast SaaS template with product dashboard preview, feature depth, pricing rationale, and demo capture for software teams.",
    features: ["Dashboard-led hero", "Pricing section ready", "Demo conversion CTA"],
    image: "/project-templates/flowops-saas.png",
    primaryHref: "/project-templates/html/flowops-saas.html",
    primaryLabel: "download code",
    downloadPrimary: true,
    tags: ["SaaS", "Product marketing", "Free template"],
  },
  {
    number: "06",
    title: "Harbor Legal",
    type: "Free legal intake website",
    label: "free template",
    description:
      "Refined service template for studios, consultancies, and firms with a strong narrative flow, credibility signals, and contact action.",
    features: ["Editorial hero", "Process section", "Inquiry and intake path"],
    image: "/project-templates/harbor-law.png",
    primaryHref: "/project-templates/html/harbor-law.html",
    primaryLabel: "download code",
    downloadPrimary: true,
    tags: ["Legal", "Intake", "Free template"],
  },
  {
    number: "07",
    title: "PulseFit Studio",
    type: "Free fitness membership site",
    label: "free template",
    description:
      "Fitness website template with class schedules, membership prompts, coach proof, and a trial funnel for studios that sell recurring plans.",
    features: ["Class schedule", "Trial funnel", "Membership CTA"],
    image: "/project-templates/pulsefit-studio.png",
    primaryHref: "/project-templates/html/pulsefit-studio.html",
    primaryLabel: "download code",
    downloadPrimary: true,
    tags: ["Fitness", "Membership", "Free template"],
  },
] as const;

export default function CaseStudies() {
  return (
    <section id="case-studies" className="relative overflow-hidden bg-prestige-deep px-4 py-20 sm:px-6 md:px-8 md:py-28">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="pointer-events-none absolute right-[-7rem] top-12 h-[30rem] w-[18rem] rounded-full bg-[linear-gradient(90deg,transparent,rgba(255,85,20,0.16),rgba(255,170,50,0.28),rgba(255,75,16,0.12),transparent)] blur-2xl" />

      <div className="mx-auto w-full max-w-7xl">
        <div className="grid gap-8 border-y border-white/10 py-8 md:grid-cols-[1.2fr_0.8fr] md:items-end">
          <div>
            <p className="mb-4 text-[0.65rem] font-semibold uppercase tracking-[0.34em] text-prestige-gold">project and template library</p>
            <h2 className="max-w-4xl text-4xl font-semibold leading-[0.92] tracking-[-0.07em] text-prestige-ink text-balance sm:text-5xl md:text-6xl">
              Real project previews and free templates that look ready to sell.
            </h2>
          </div>
          <p className="max-w-lg text-sm leading-7 text-prestige-muted md:justify-self-end">
            The old case-study framing is now a practical showcase: one delivered real estate build plus free website templates customers can preview, download, and adapt.
          </p>
        </div>

        <div className="mt-8 grid gap-5 lg:grid-cols-2">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} delay={index * 0.06} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project, delay = 0 }: { project: (typeof projects)[number]; delay?: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8%" }}
      transition={{ duration: 0.55, delay, ease: [0.32, 0.72, 0, 1] }}
      className="group overflow-hidden rounded-[1.75rem] border border-white/10 bg-prestige-panel/80 transition duration-300 hover:border-prestige-gold/50"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-black">
        <div className="absolute left-0 right-0 top-0 z-10 flex h-9 items-center gap-2 border-b border-white/10 bg-black/70 px-4 backdrop-blur-md">
          <span className="h-2.5 w-2.5 rounded-full bg-prestige-gold" />
          <span className="h-2.5 w-2.5 rounded-full bg-status-warning" />
          <span className="h-2.5 w-2.5 rounded-full bg-status-success" />
          <span className="ml-3 min-w-0 truncate font-mono text-[0.58rem] uppercase tracking-[0.18em] text-white/48">
            {project.title.toLowerCase().replaceAll(" ", "-")}.website.preview
          </span>
        </div>
        <Image
          src={project.image}
          alt={`${project.title} realistic website preview`}
          fill
          sizes="(max-width: 1024px) 92vw, 46vw"
          className="object-cover object-top opacity-92 transition duration-700 group-hover:scale-[1.025] group-hover:opacity-100"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_50%,rgba(6,3,3,0.82))]" />
      </div>

      <div className="p-5 sm:p-7">
        <div className="flex items-start justify-between gap-4">
          <p className="font-mono text-[0.65rem] uppercase tracking-[0.24em] text-prestige-gold">
            {project.number} / {project.type}
          </p>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-2 font-mono text-[0.58rem] uppercase tracking-[0.2em] text-prestige-muted">
            <Sparkles size={12} />
            {project.label}
          </span>
        </div>

        <h3 className="mt-8 text-4xl font-semibold uppercase leading-[0.88] tracking-[-0.065em] text-prestige-ink text-balance sm:text-5xl">
          {project.title}
        </h3>
        <p className="mt-5 text-sm leading-7 text-prestige-muted">{project.description}</p>

        <div className="mt-6 grid gap-2 sm:grid-cols-3">
          {project.features.map((item) => (
            <div key={item} className="rounded-2xl border border-white/10 bg-black/20 px-3 py-3 text-xs leading-5 text-prestige-ink">
              {item}
            </div>
          ))}
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span key={tag} className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-2 font-mono text-[0.58rem] uppercase tracking-[0.18em] text-prestige-muted">
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href={project.primaryHref}
            download={project.downloadPrimary}
            className="inline-flex items-center gap-2 border border-prestige-gold/35 bg-prestige-gold px-4 py-3 font-mono text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-prestige-canvas transition duration-300 hover:bg-prestige-ink"
          >
            {project.downloadPrimary ? <ArrowDownToLine size={14} /> : <ExternalLink size={14} />}
            {project.primaryLabel}
          </a>
          <a
            href={project.image}
            download
            className="inline-flex items-center gap-2 border border-white/10 bg-white/[0.03] px-4 py-3 font-mono text-[0.65rem] uppercase tracking-[0.22em] text-prestige-muted transition duration-300 hover:border-prestige-gold/40 hover:text-prestige-ink"
          >
            download preview
            <ArrowRight size={13} />
          </a>
          <Link href="/contact" className="inline-flex items-center gap-2 border border-white/10 bg-white/[0.03] px-4 py-3 font-mono text-[0.65rem] uppercase tracking-[0.22em] text-prestige-muted transition duration-300 hover:border-prestige-gold/40 hover:text-prestige-ink">
            scope similar build
            <ExternalLink size={13} />
          </Link>
        </div>
      </div>
    </motion.article>
  );
}

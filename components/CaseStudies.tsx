"use client";

import { motion } from "framer-motion";
import { ArrowDownToLine, ArrowUpRight, ExternalLink } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const projects = [
  {
    number: "01",
    title: "Nova Smile Clinic",
    type: "Dental booking portal",
    description:
      "A complete clinic website template with appointment booking, service discovery, doctor profiles, insurance pre-check, and a staff-ready lead intake path.",
    achieved: ["38% faster booking path", "12 service page system", "CRM-ready patient intake"],
    image: "/project-templates/nova-smile-clinic.jpg",
    tags: ["Appointment booking", "Doctor profiles", "Insurance pre-check"],
  },
  {
    number: "02",
    title: "Aurelia Home",
    type: "Luxury ecommerce storefront",
    description:
      "A premium home decor storefront template with campaign hero, product collections, cart recovery structure, trust blocks, and clean checkout event planning.",
    achieved: ["2.1s perceived page flow", "Cart recovery structure", "SEO collection layout"],
    image: "/project-templates/aurelia-home.jpg",
    tags: ["Product catalog", "Cart recovery", "Campaign landing"],
  },
  {
    number: "03",
    title: "FlowOps Console",
    type: "SaaS operations website",
    description:
      "A dark SaaS template built around dashboard previews, onboarding steps, role-based value blocks, pricing conversion, and demo-request capture.",
    achieved: ["14 UI screens planned", "Auth-ready sections", "Demo request funnel"],
    image: "/project-templates/flowops-saas.jpg",
    tags: ["Dashboard preview", "Role onboarding", "Pricing flow"],
  },
  {
    number: "04",
    title: "Atlas Realty",
    type: "Property lead funnel",
    description:
      "A real-estate website template with property discovery, location landing pages, lead qualification, broker routing, and WhatsApp handoff moments.",
    achieved: ["22 geo page framework", "15-minute lead handoff", "Broker routing logic"],
    image: "/project-templates/atlas-realty.jpg",
    tags: ["Property search", "Broker routing", "WhatsApp handoff"],
  },
  {
    number: "05",
    title: "Harbor Legal",
    type: "Law firm intake website",
    description:
      "A professional legal services template with practice-area pages, consultation booking, case-fit intake, evidence upload direction, and matter triage copy.",
    achieved: ["31% more consult intent", "Secure form structure", "Matter triage flow"],
    image: "/project-templates/harbor-law.jpg",
    tags: ["Case intake", "Practice pages", "Consultation calendar"],
  },
  {
    number: "06",
    title: "PulseFit Studio",
    type: "Fitness membership platform",
    description:
      "A high-energy fitness studio template with class schedules, coach profiles, membership plans, trial booking, and retention email handoff points.",
    achieved: ["4 booking flows", "Stripe-ready membership", "Retention email path"],
    image: "/project-templates/pulsefit-studio.jpg",
    tags: ["Class booking", "Membership plans", "Coach profiles"],
  },
];

export default function CaseStudies() {
  return (
    <section id="case-studies" className="relative overflow-hidden bg-[#090505] px-4 py-20 sm:px-6 md:px-8 md:py-28">
      <div className="pointer-events-none absolute right-[-7rem] top-12 h-[36rem] w-[18rem] rounded-full bg-[linear-gradient(90deg,transparent,rgba(255,85,20,0.18),rgba(255,170,50,0.34),rgba(255,75,16,0.16),transparent)] blur-md" />
      <div className="pointer-events-none absolute inset-x-0 top-1/2 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="mx-auto w-full max-w-7xl">
        <div className="grid gap-8 border-y border-white/10 py-8 md:grid-cols-[1.2fr_0.8fr] md:items-end">
          <div>
            <p className="mb-4 text-[0.65rem] font-semibold uppercase tracking-[0.34em] text-prestige-gold">owned website templates</p>
            <h2 className="max-w-4xl text-4xl font-semibold leading-[0.92] tracking-[-0.07em] text-prestige-ink text-balance sm:text-5xl md:text-6xl">
              Six original project designs built to look like sellable client-ready systems.
            </h2>
          </div>
          <p className="max-w-lg text-sm leading-7 text-prestige-muted md:justify-self-end">
            These are Presitgious Tech-owned design directions, not outside references. Each card includes a matching generated template preview, practical outcomes, and a downloadable design image.
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
      className="group overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#110909]/84 transition duration-300 hover:border-prestige-gold/50"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-black">
        <div className="absolute left-0 right-0 top-0 z-10 flex h-9 items-center gap-2 border-b border-white/10 bg-black/70 px-4 backdrop-blur-md">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff6b42]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#f2b950]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#56c271]" />
          <span className="ml-3 min-w-0 truncate font-mono text-[0.58rem] uppercase tracking-[0.18em] text-white/48">
            {project.title.toLowerCase().replaceAll(" ", "-")}.presitgious.tech
          </span>
        </div>
        <Image
          src={project.image}
          alt={`${project.title} complete website template preview`}
          fill
          sizes="(max-width: 1024px) 92vw, 46vw"
          className="object-cover object-top opacity-90 transition duration-700 group-hover:scale-[1.025] group-hover:opacity-100"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_48%,rgba(6,3,3,0.82))]" />
      </div>

      <div className="p-5 sm:p-7">
        <div className="flex items-start justify-between gap-4">
          <p className="font-mono text-[0.65rem] uppercase tracking-[0.24em] text-prestige-gold">
            {project.number} / {project.type}
          </p>
          <Link href="#contact" aria-label={`Start a build like ${project.title}`} className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-white/10 text-prestige-muted transition duration-300 hover:border-prestige-gold hover:text-prestige-ink">
            <ArrowUpRight size={15} />
          </Link>
        </div>

        <h3 className="mt-8 text-4xl font-semibold uppercase leading-[0.88] tracking-[-0.065em] text-prestige-ink text-balance sm:text-5xl">
          {project.title}
        </h3>
        <p className="mt-5 text-sm leading-7 text-prestige-muted">{project.description}</p>

        <div className="mt-6 grid gap-2 sm:grid-cols-3">
          {project.achieved.map((item) => (
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
            href={project.image}
            download
            className="inline-flex items-center gap-2 border border-prestige-gold/35 bg-prestige-gold px-4 py-3 font-mono text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-[#170705] transition duration-300 hover:bg-prestige-ink"
          >
            <ArrowDownToLine size={14} />
            get template
          </a>
          <Link href="#contact" className="inline-flex items-center gap-2 border border-white/10 bg-white/[0.03] px-4 py-3 font-mono text-[0.65rem] uppercase tracking-[0.22em] text-prestige-muted transition duration-300 hover:border-prestige-gold/40 hover:text-prestige-ink">
            scope similar build
            <ExternalLink size={13} />
          </Link>
        </div>
      </div>
    </motion.article>
  );
}

// components/HowItWorks/HowItWorks.jsx
"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SparklesIcon } from "@heroicons/react/24/solid";
import { slideInFromTop, slideInFromLeft, slideInFromRight } from "@/lib/motion";
import { FaSearch, FaUsersCog, FaChartLine } from "react-icons/fa";
import { HiChevronDown } from "react-icons/hi";

interface ProcessStepProps {
  icon: React.ElementType;
  title: string;
  description: string;
  details: string[];
  delay: number;
}
interface FaqItem { q: string; a: string; }

// ====== Anim helpers ======
const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, delay } },
});
const listStagger = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { when: "beforeChildren", staggerChildren: 0.06 } } };
const listItem = { hidden: { opacity: 0, y: 6 }, show: { opacity: 1, y: 0, transition: { duration: 0.25 } } };

// ====== Small bits ======
const Pill: React.FC<React.PropsWithChildren> = ({ children }) => (
  <div className="Welcome-box py-[8px] px-[7px] border border-[#7042f88b] opacity-[0.9] mb-4 inline-flex items-center">
    <SparklesIcon className="text-[#b49bff] mr-[10px] h-5 w-5" />
    <span className="Welcome-text text-[13px] text-white">{children}</span>
  </div>
);

const ProcessStep: React.FC<ProcessStepProps> = ({ icon: Icon, title, description, details, delay }) => (
  <motion.div
    variants={fadeUp(delay)}
    initial="hidden"
    whileInView="show"
    viewport={{ once: true, amount: 0.35 }}
    whileHover={{ scale: 1.02 }}
    transition={{ type: "spring", stiffness: 240, damping: 18 }}
    className="flex flex-col p-6 rounded-xl border border-[#7042f88b] bg-gradient-to-br from-[#1a0f3d]/10 to-[#2e1d5a]/10 backdrop-blur-md shadow-lg h-full cursor-pointer"
  >
    <div className="mb-4 flex items-center gap-3">
      <div className="flex items-center justify-center w-14 h-14 rounded-full bg-[#b49bff]/20">
        <Icon className="text-[#b49bff] text-2xl" />
      </div>
      <h4 className="text-2xl font-semibold text-white">{title}</h4>
    </div>
    <p className="text-gray-300 text-base mb-4">{description}</p>
    <motion.ul
      variants={listStagger}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
      className="space-y-1 text-sm text-gray-300 pl-5 list-disc"
    >
      {details.map((d, i) => (
        <motion.li key={i} variants={listItem}>{d}</motion.li>
      ))}
    </motion.ul>
  </motion.div>
);

const FAQRow = ({ q, a }: FaqItem) => {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      transition={{ type: "spring", stiffness: 220, damping: 18 }}
      className="rounded-xl p-[1px] bg-gradient-to-r from-purple-500/30 via-indigo-400/20 to-cyan-400/30"
    >
      <div className="rounded-xl bg-white/5 border border-white/10 overflow-hidden">
        <button
          onClick={() => setOpen((o) => !o)}
          className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-white/10 transition"
        >
          <span className="text-white font-medium">{q}</span>
          <HiChevronDown
            className={`w-5 h-5 text-gray-300 transition-transform ${open ? "rotate-180" : ""}`}
          />
        </button>
        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              key="content"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.28 }}
              className="px-4 pb-4 text-gray-300"
            >
              {a}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};


/** =========================
 *  VISUAL PIPELINE (new)
 *  ========================= */
const VisualPipeline = ({ steps }: { steps: string[] }) => {
  return (
    <div className="w-full">
      {/* Desktop: horizontal glowing SVG line + chips */}
      <div className="relative hidden md:block">
        {/* SVG line */}
        <motion.svg
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="absolute left-0 right-0 top-1/2 -translate-y-1/2 w-full h-16"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="gp" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#8b5cf6" />
              <stop offset="50%" stopColor="#7c9cfb" />
              <stop offset="100%" stopColor="#22d3ee" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="4.5" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          {/* animated line */}
          <motion.line
            x1="6%" y1="50%" x2="94%" y2="50%"
            stroke="url(#gp)"
            strokeWidth="6"
            strokeLinecap="round"
            style={{ filter: "url(#glow)" }}
            strokeDasharray="8 10"
            initial={{ strokeDashoffset: 160 }}
            animate={{ strokeDashoffset: 0 }}
            transition={{ duration: 2.2, ease: "easeOut" }}
          />
        </motion.svg>

        {/* Step chips */}
        <div className="relative flex items-center justify-between">
          {steps.map((label, i) => (
            <motion.div
              key={label}
              initial={{ y: 10, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ delay: 0.1 + i * 0.08, type: "spring", stiffness: 220, damping: 20 }}
              whileHover={{ y: -4, scale: 1.02 }}
              className="flex flex-col items-center"
            >
              {/* number pin */}
              <div className="w-10 h-10 rounded-full bg-white/10 border border-white/20 backdrop-blur-md flex items-center justify-center shadow-md">
                <span className="text-white/90 text-sm font-semibold">{i + 1}</span>
              </div>
              {/* label chip */}
              <div className="mt-2 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm whitespace-nowrap shadow-sm">
                {label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Mobile: vertical timeline */}
      <div className="relative md:hidden">
        {/* vertical gradient spine */}
        <div className="absolute left-5 top-0 bottom-0 w-[3px] bg-gradient-to-b from-purple-500 via-indigo-400 to-cyan-400 rounded-full opacity-80" />
        <div className="space-y-6 pl-10">
          {steps.map((label, i) => (
            <motion.div
              key={label}
              initial={{ x: -8, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ delay: 0.05 + i * 0.06 }}
              className="relative"
            >
              {/* node */}
              <div className="absolute -left-6 top-1 w-4 h-4 rounded-full bg-white/90 shadow-[0_0_18px_rgba(124,92,246,0.7)]" />
              {/* card */}
              <div className="px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm shadow-sm">
                <span className="mr-2 text-white/60 font-semibold">{i + 1}.</span>
                {label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

/** =========================
 *  MAIN SECTION
 *  ========================= */
export const HowItWorks = () => {
  const faqs: FaqItem[] = [
    { q: "How fast can we get started?", a: "Within 7–10 days after the audit." },
    { q: "Do you work in my niche?", a: "Yes, We train teams per industry and tailor SOPs to your workflows." },
    { q: "Can I use my own tools/CRM?", a: "100%. We integrate into your stack and enhance it with automation when needed." },
    { q: "Can I change or add team members?", a: "Yes, Your Delivery Manager handles scale-up/scale-down within days." },
  ];

  return (
    <section id="how-it-works" className="relative flex flex-col items-center justify-center min-h-screen w-full h-full py-20 px-4 md:px-8 lg:px-16 overflow-hidden">
      <div className="relative z-10 w-full max-w-6xl flex flex-col items-center">
        {/* Title */}
        <div className="flex justify-center items-center mb-8">
          <motion.div variants={slideInFromTop} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <Pill>How It Works</Pill>
          </motion.div>
        </div>

        {/* Hero */}
        <div className="text-center max-w-4xl">
          <motion.h2 variants={slideInFromLeft(0.4)} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-4xl md:text-5xl font-bold text-white leading-tight mb-4">
            From First Call to Full Ops. Here’s How We Plug In
          </motion.h2>
          <motion.p variants={slideInFromRight(0.6)} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-lg md:text-xl text-gray-300 mb-8">
            We build your offshore team and backend delivery system so you focus on growth while we handle the rest.
          </motion.p>
          <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.8, duration: 0.5 }} className="text-white text-5xl">↓</motion.div>
        </div>

        {/* Lock/Video (as-is) */}
        <motion.div variants={fadeUp(0.8)} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.25 }} className="relative w-full mx-auto mb-12 rounded-xl overflow-hidden shadow-2xl flex items-center justify-center">
          <div className="absolute z-20 flex flex-col items-center justify-center w-full h-full pointer-events-none">
            <div className="flex flex-col items-center group w-auto h-auto">
              <img src="/lock-top.png" alt="Lock top" width={70} height={70} className="translate-y-5 transition-all duration-200 group-hover:translate-y-11" />
              <img src="/lock-main.png" alt="Lock main" width={100} height={100} className="z-10" />
            </div>
            <div className="Welcome-box px-[15px] py-[4px] z-[20] border my-[20px] border-[#7042F88B] opacity-[0.9]">
              <h1 className="Welcome-text text-[12px]">Your Services will be Secure with SynCuraLegacy</h1>
            </div>
          </div>
          <video loop muted autoPlay playsInline preload="auto" className="w-full h=[480px] md:h-[480px] h-[360px] object-cover z-10">
            <source src="/videos/encryption-bg.webm" type="video/webm" />
          </video>
        </motion.div>

        {/* 3-Step Process */}
        <motion.h3 variants={fadeUp(0.1)} initial="hidden" whileInView="show" viewport={{ once: true }} className="text-3xl md:text-4xl font-bold text-white mb-6 text-center">
           3 Step Process
        </motion.h3>

        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <ProcessStep
            icon={FaSearch}
            title="Step 1: Audit"
            description="We start with a deep dive into your current operations, delivery capacity, and growth goals."
            details={[
              "Business & team analysis",
              "Current tools, CRMs, SOPs, and delivery model",
              "Identify bottlenecks & time drains",
              "Output: A custom operations blueprint (your backend game plan)",
            ]}
            delay={0.15}
          />
          <ProcessStep
            icon={FaUsersCog}
            title="Step 2: Assemble"
            description="We match you with a UK/US based Project Delivery Manager and build your offshore backend team."
            details={[
              "Paired with your Delivery Manager",
              "Recruit, train, and assign VAs (5–10 as needed)",
              "Set up systems, Slack channels, CRM workflows, etc.",
              "Roles: Admin Assistants, Appointment Setters, Sales/CRM Support, Customer Support, Reporting & QA VAs",
            ]}
            delay={0.25}
          />
          <ProcessStep
            icon={FaChartLine}
            title="Step 3: Scale"
            description="With your backend running smoothly, scale sales, delivery, or client service without hiring headaches."
            details={[
              "Weekly syncs with your Project Manager",
              "Monthly performance reports",
              "Scale or shrink team size easily",
              "Optional: performance based billing (pay‑per‑lead or per‑output)",
            ]}
            delay={0.35}
          />
        </div>

        {/* ===== Visual Pipeline (refined) ===== */}
        <div className="w-full mb-16">
          <motion.h4
            variants={fadeUp(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="text-2xl md:text-3xl font-semibold text-white mb-6 text-center"
          >
            Visual Pipeline
          </motion.h4>

          {/* Wrapper with subtle card background to group the pipeline */}
          <motion.div whileHover={{ scale: 1.01 }}
            transition={{ type: "spring", stiffness: 220, damping: 18 }}
            className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-4 md:p-6 cursor-default md:cursor-pointer"
          >
            {/* Desktop: horizontal track with milestone cards */}
            <div className="hidden md:flex flex-col gap-8">
              {/* glowing gradient track */}
              <div className="relative">
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[6px] rounded-full"
                  style={{
                    background:
                      "linear-gradient(90deg, rgba(139,92,246,0.8), rgba(124,156,251,0.8), rgba(34,211,238,0.8))",
                    boxShadow:
                      "0 0 18px rgba(139,92,246,0.5), 0 0 24px rgba(124,156,251,0.35), 0 0 28px rgba(34,211,238,0.35)",
                  }}
                />
                {/* milestones */}
                <div className="relative z-10 grid grid-cols-6">
                  {[
                    "Book a Call",
                    "Audit & Blueprint",
                    "PD Manager Assigned",
                    "Team Assembled",
                    "Systems Live",
                    "Weekly / Monthly Reports",
                  ].map((label, i) => (
                    <motion.div
                      key={label}
                      initial={{ y: 10, opacity: 0 }}
                      whileInView={{ y: 0, opacity: 1 }}
                      viewport={{ once: true, amount: 0.6 }}
                      transition={{ delay: 0.1 + i * 0.08, type: "spring", stiffness: 220, damping: 20 }}
                      whileHover={{ y: -4, scale: 1.02 }}
                      className={`flex flex-col items-center ${i % 2 ? "mt-8" : "-mt-8"}`}
                    >
                      <div className="w-10 h-10 rounded-full bg-white/10 border border-white/20 backdrop-blur-md flex items-center justify-center shadow-md">
                        <span className="text-white/90 text-sm font-semibold">{i + 1}</span>
                      </div>
                      <div className="mt-2 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm text-center shadow-sm whitespace-nowrap">
                        {label}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Mobile: vertical timeline with nodes */}
            <div className="md:hidden relative">
              <div className="absolute left-5 top-0 bottom-0 w-[3px] bg-gradient-to-b from-purple-500 via-indigo-400 to-cyan-400 rounded-full opacity-80" />
              <div className="space-y-6 pl-10">
                {[
                  "Book a Call",
                  "Audit & Blueprint",
                  "PD Manager Assigned",
                  "Team Assembled",
                  "Systems Live",
                  "Weekly / Monthly Reports",
                ].map((label, i) => (
                  <motion.div
                    key={label}
                    initial={{ x: -8, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    viewport={{ once: true, amount: 0.6 }}
                    transition={{ delay: 0.05 + i * 0.06 }}
                    className="relative"
                  >
                    <div className="absolute -left-6 top-1 w-4 h-4 rounded-full bg-white/90 shadow-[0_0_18px_rgba(124,92,246,0.7)]" />
                    <div className="px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm shadow-sm">
                      <span className="mr-2 text-white/60 font-semibold">{i + 1}.</span>
                      {label}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* ===== Built for Busy Founders (recreated) ===== */}
        <div className="w-full mb-16">
          <motion.div whileHover={{ scale: 1.01 }}
            transition={{ type: "spring", stiffness: 220, damping: 18 }}
            className="max-w-5xl mx-auto rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-6 md:p-8 relative overflow-hidden cursor-pointer"
          >
            {/* soft gradient glow */}
            <div className="pointer-events-none absolute -top-24 -right-20 w-[420px] h-[420px] rounded-full blur-3xl opacity-30 bg-gradient-to-br from-purple-500/40 via-indigo-400/30 to-cyan-300/30" />
            <motion.h3
              variants={slideInFromLeft(0.2)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold text-white text-center mb-6"
            >
              Built for Busy Founders. Designed to Scale.
            </motion.h3>

            {/* perfectly aligned checklist (2 cols on md+) */}
            <motion.ul
              variants={listStagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4"
            >
              {[
                "You only manage one person (we handle the rest)",
                "Instant access to trained staff",
                "Everything is systems driven not dependent on freelancers",
                "Your backend grows as your revenue grows",
              ].map((pt, i) => (
                <motion.li key={i} variants={listItem} whileHover={{ x: 2 }}>
                  <div className="flex items-start gap-3">
                    {/* fixed marker keeps text perfectly aligned */}
                    <div className="mt-[3px] w-6 h-6 shrink-0 rounded-full bg-gradient-to-br from-purple-500/30 to-cyan-400/30 border border-white/20 flex items-center justify-center">
                      <span className="text-white/90 text-[12px] leading-none">✓</span>
                    </div>
                    <p className="text-gray-300 text-base md:text-lg leading-relaxed">{pt}</p>
                  </div>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        </div>

        {/* FAQ */}
        <div className="w-full max-w-3xl mb-16">
          <motion.h3 variants={fadeUp(0.1)} initial="hidden" whileInView="show" viewport={{ once: true }} className="text-3xl md:text-4xl font-bold text-white mb-6 text-center">
            FAQs
          </motion.h3>
          <div className="space-y-3">
            {faqs.map((f) => (
              <FAQRow key={f.q} q={f.q} a={f.a} />
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center max-w-3xl">
          <motion.h3 variants={slideInFromTop} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-3xl md:text-4xl font-bold text-white mb-4">
            Want Your Backend to Just Work?
          </motion.h3>
          <motion.p variants={slideInFromLeft(0.3)} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-lg md:text-xl text-gray-300 mb-8">
            Let’s map out your operations game plan no obligation.
          </motion.p>
          <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} className="px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold rounded-full shadow-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-300">
            Book a Free Strategy Call
          </motion.button>
        </div>
      </div>
    </section>
  );
};

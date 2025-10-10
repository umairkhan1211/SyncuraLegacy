// components/sections/CaseStudies.jsx
"use client";

import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { SparklesIcon } from "@heroicons/react/24/solid";
import {
  slideInFromTop,
  slideInFromLeft,
  slideInFromRight,
} from "@/lib/motion";

/* ---------------- Data ---------------- */
const caseStudiesData = [
  {
    id: 1,
    company: "BritTalent",
    industry: "Staffing & Recruitment",
    challenge:
      "Overwhelmed internal team, no delivery process, constant bottlenecks with candidate management.",
    solution:
      "Assigned UK-based Project Delivery Manager, hired & trained 6 VAs for sourcing, CRM updates, scheduling. Built automations in GHL + Slack + Airtable. Delivered SOPs.",
    results: [
      "Team capacity grew by 300%",
      "Cut lead response time up to 3 days",
      "6 placements/month to 18+ within 60 days",
    ],
    logo: "/brittalent.jpg",
  },
  {
    id: 2,
    company: "Exerra AI",
    industry: "AI & Marketing Automation",
    challenge:
      "Delivery was falling behind sales. No structured onboarding or fulfillment.",
    solution:
      "Assigned Project Delivery Manager with SaaS experience. Built onboarding flows in Slack + Notion. Recruited 5 VAs for daily task execution. Integrated ClickUp, GHL, Zapier.",
    results: [
      "Client onboarding dropped to 2 days",
      "Founders fully removed from delivery ops",
      "10 new clients onboarded in 30 days with 0 drop-off",
    ],
    logo: "/exerra_ai_logo.jpg",
  },
  {
    id: 3,
    company: "MoveWise",
    industry: "Real Estate Tech",
    challenge:
      "Manual lead follow-up, agents missing appointments, poor CRM hygiene.",
    solution:
      "VA team to manage CRM (FollowUpBoss) + call center reps. Built lead scoring and assignment rules. Weekly performance reports for brokers.",
    results: [
      "40% improvement in call-to-appointment ratio",
      "$80K booked in listings within 45 days",
      "CRM hygiene maintained 95%+",
    ],
    logo: "/movewise_logo.jpg",
  },
];

/* ------------- Visual Breakdown Diagram (curved, premium, fixed) ------------- */
const VisualBreakdownDiagram = ({ steps }) => {
  // Positions for 7-step default; fallback auto-calculates for any length
  const nodePositions = React.useMemo(() => {
    if (steps.length === 7) {
      return [
        { left: "5%",  top: "68%" },
        { left: "19%", top: "28%" },
        { left: "33%", top: "78%" },
        { left: "47%", top: "32%" },
        { left: "61%", top: "76%" },
        { left: "76%", top: "36%" },
        { left: "90%", top: "66%" },
      ];
    }
    // Fallback: distribute along a gentle sine curve
    return steps.map((_, i) => {
      const t = (i + 1) / (steps.length + 1);      // 0..1 (skip edges)
      const left = `${t * 100}%`;
      const y = 0.62 - 0.28 * Math.sin(t * Math.PI * 1.15); // smooth wave
      const top = `${y * 100}%`;
      return { left, top };
    });
  }, [steps]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      className="w-full rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-5 md:p-7 relative overflow-hidden"
    >
      {/* soft radial atmosphere */}
      <div className="pointer-events-none absolute inset-0 opacity-30 [background:radial-gradient(60%_60%_at_50%_0%,rgba(124,156,251,.25),transparent_60%)]" />

      {/* ===== Desktop: Curved glowing wave ===== */}
      <div className="hidden md:block relative h-[320px]">
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1200 400" preserveAspectRatio="none">
          <defs>
            <linearGradient id="vbGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#8b5cf6" />
              <stop offset="50%" stopColor="#7c9cfb" />
              <stop offset="100%" stopColor="#22d3ee" />
            </linearGradient>
            <filter id="vbGlow">
              <feGaussianBlur stdDeviation="6" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* subtle rail underlay for depth */}
          <path
            d="M 40 260 C 220 120, 380 330, 560 180 S 900 290, 1160 210"
            fill="none"
            stroke="rgba(255,255,255,0.08)"
            strokeWidth="18"
            strokeLinecap="round"
          />

          {/* animated gradient wave */}
          <motion.path
            d="M 40 260 C 220 120, 380 330, 560 180 S 900 290, 1160 210"
            fill="none"
            stroke="url(#vbGrad)"
            strokeWidth="8"
            strokeLinecap="round"
            style={{ filter: "url(#vbGlow)" }}
            strokeDasharray="14 14"
            initial={{ pathLength: 0, strokeDashoffset: 140 }}
            whileInView={{ pathLength: 1, strokeDashoffset: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.6, ease: "easeOut" }}
            opacity={0.95}
          />
        </svg>

        {/* pins: node ABOVE, label BELOW (all steps) */}
        {steps.map((label, i) => {
          const pos = nodePositions[i];
          return (
            <motion.div
              key={label}
              className="absolute flex flex-col items-center"
              style={{ left: pos.left, top: pos.top, transform: "translate(-50%, -50%)" }}
              initial={{ opacity: 0, scale: 0.9, y: 8 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ delay: 0.06 + i * 0.06, type: "spring", stiffness: 240, damping: 20 }}
              whileHover={{ scale: 1.08, y: -4 }}
              aria-label={label}
            >
              {/* glow halo */}
              <span className="absolute -z-10 w-16 h-16 rounded-full bg-gradient-to-br from-purple-500/25 via-indigo-400/25 to-cyan-300/25 blur-xl" />
              {/* node (top) */}
              <div className="w-11 h-11 rounded-full bg-white/10 border border-white/20 backdrop-blur-md flex items-center justify-center shadow-md">
                <span className="text-white/90 text-sm font-semibold">{i + 1}</span>
              </div>
              {/* label (bottom) */}
              <div className="mt-2 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm text-center shadow-sm whitespace-nowrap">
                {label}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* ===== Mobile: vertical timeline stays the same ===== */}
      <div className="md:hidden relative">
        <div className="absolute left-5 top-0 bottom-0 w-[3px] bg-gradient-to-b from-purple-500 via-indigo-400 to-cyan-400 rounded-full opacity-80" />
        <div className="space-y-6 pl-10">
          {steps.map((label, i) => (
            <motion.div
              key={label}
              initial={{ x: -8, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ delay: 0.05 + i * 0.05 }}
              className="relative"
            >
              <div className="absolute -left-6 top-1 w-4 h-4 rounded-full bg-white shadow-[0_0_18px_rgba(124,92,246,0.75)]" />
              <div className="px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm shadow-sm">
                <span className="mr-2 text-white/60 font-semibold">{i + 1}.</span>
                {label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export const CaseStudies = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section
      id="case-studies"
      className="relative flex flex-col items-center justify-center w-full py-20 px-4 md:px-8 lg:px-16 overflow-hidden"
    >
      {/* Header */}
      <div ref={ref} className="text-center w-full mb-16">
        <div className="flex justify-center items-center mb-8">
          <motion.div
            variants={slideInFromTop}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="Welcome-box py-[8px] px-[7px] border border-[#7042f88b] opacity-[0.9] flex items-center"
          >
            <SparklesIcon className="text-[#b49bff] mr-[10px] h-5 w-5" />
            <h1 className="Welcome-text text-[13px] text-white">
              Case Studies
            </h1>
          </motion.div>
        </div>

        <motion.h2
          variants={slideInFromLeft(0.5)}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="text-4xl md:text-5xl font-bold text-white leading-tight mb-4"
        >
          Real Companies. Real Results.
        </motion.h2>
        <motion.p
          variants={slideInFromRight(0.7)}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="text-lg md:text-xl text-gray-300 mb-8"
        >
          See how we&apos;ve helped growing businesses like yours scale backend
          operations, build teams, and streamline systems all with a dedicated
          delivery model.
        </motion.p>
      </div>

      {/* Grid */}
      <motion.div
        variants={slideInFromTop}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        transition={{ delay: 1, duration: 0.8 }}
        className="w-full max-w-7xl"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {caseStudiesData.map((study) => (
            <motion.div
              key={study.id}
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 220, damping: 18 }}
              className="bg-[#301e6b5a] p-6 rounded-xl border border-[#7042f88b] shadow-lg flex flex-col h-full"
            >
              {study.logo && (
                <img
                  src={study.logo}
                  alt={`${study.company} Logo`}
                  className="h-12 object-contain mb-4 mx-auto border border-[#7042f88b]"
                />
              )}
              <h3 className="text-2xl font-bold text-white mb-2 text-center">
                {study.company}
              </h3>
              <p className="text-md text-gray-200 mb-4 text-center">
                ({study.industry})
              </p>

              <div className="flex-grow">
                <h4 className="text-lg font-semibold text-[#b49bff] mb-2 flex items-center">
                  <SparklesIcon className="h-5 w-5 mr-2 text-purple-400" />{" "}
                  Challenge:
                </h4>
                <p className="text-gray-200 text-sm mb-4">{study.challenge}</p>

                <h4 className="text-lg font-semibold text-[#b49bff] mb-2 flex items-center">
                  <SparklesIcon className="h-5 w-5 mr-2 text-purple-400" /> Our
                  Solution:
                </h4>
                <p className="text-gray-200 text-sm mb-4">{study.solution}</p>

                <h4 className="text-lg font-semibold text-[#b49bff] mb-2 flex items-center">
                  <SparklesIcon className="h-5 w-5 mr-2 text-purple-400" />{" "}
                  Results:
                </h4>
                <ul className="list-disc list-inside text-gray-200 text-sm">
                  {study.results.map((result, i) => (
                    <li key={i} className="mb-1">
                      {result}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* ------------ SECTION 4: What We Did (Visual Breakdown) ------------ */}
      <div className="w-full max-w-7xl mt-20">
        <motion.h3
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-white text-center mb-6"
        >
          What We Did{" "}
        </motion.h3>

        <VisualBreakdownDiagram
          steps={[
            "Client Entry",
            "Audit",
            "Delivery Manager Assigned",
            "Team Built",
            "System Implemented",
            "Weekly/Monthly Reporting",
            "Ongoing Optimization",
          ]}
        />
      </div>

      {/* ------------ SECTION 5: Video Testimonials ------------ */}
      <div className="w-full max-w-7xl mt-20">
        <motion.h3
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-white text-center mb-3"
        >
          Video Testimonials
        </motion.h3>
        <p className="text-center text-white/80 mb-8">
          “We went from overwhelmed to organized. Syncura gave us structure,
          speed, and serious growth.”
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Replace src/poster with your actual files or Loom embeds */}
          <motion.div
            whileHover={{ scale: 1.01 }}
            transition={{ type: "spring", stiffness: 220, damping: 18 }}
            className="rounded-xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-md"
          >
            <video
              controls
              playsInline
              preload="metadata"
              poster="/videos/testimonial1-poster.jpg"
              className="w-full h-[240px] md:h-[300px] object-cover"
            >
              <source src="/videos/testimonial1.mp4" type="video/mp4" />
            </video>
            <div className="p-4 text-white/90 text-sm">
              Founder, BritTalent — delivery rebuilt end-to-end
            </div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.01 }}
            transition={{ type: "spring", stiffness: 220, damping: 18 }}
            className="rounded-xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-md"
          >
            <video
              controls
              playsInline
              preload="metadata"
              poster="/videos/testimonial2-poster.jpg"
              className="w-full h-[240px] md:h-[300px] object-cover"
            >
              <source src="/videos/testimonial2.mp4" type="video/mp4" />
            </video>
            <div className="p-4 text-white/90 text-sm">
              CEO, Exerra AI — onboarding time slashed
            </div>
          </motion.div>
        </div>
      </div>

      {/* ------------ SECTION 6: CTA Block ------------ */}
      <div className="w-full max-w-6xl mt-20">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-8 md:p-10 text-center relative overflow-hidden"
        >
          <div className="pointer-events-none absolute -top-24 -right-20 w-[420px] h-[420px] rounded-full blur-3xl opacity-30 bg-gradient-to-br from-purple-500/40 via-indigo-400/30 to-cyan-300/30" />
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-3">
            Let’s Build Your Case Study Next
          </h3>
          <p className="text-white/80 max-w-2xl mx-auto mb-6">
            If you want a team that handles the backend while you grow the
            frontend, we’d love to work with you.
          </p>
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.98 }}
            className="px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold rounded-full shadow-lg hover:from-purple-700 hover:to-indigo-700 transition-all"
          >
            Book a Free Strategy Call
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

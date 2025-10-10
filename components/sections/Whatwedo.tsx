// components/WhatWeDo/WhatWeDo.jsx
"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { SparklesIcon } from "@heroicons/react/24/solid";
import { slideInFromLeft, slideInFromRight, slideInFromTop } from "@/lib/motion";

// Service icons
import { FaPhoneAlt, FaUsers, FaHandshake, FaCogs, FaMoneyBillWave } from "react-icons/fa";

// “What Makes Us Different” icons
import {
  HiOutlineGlobeAlt,
  HiOutlineAcademicCap,
  HiOutlineChartSquareBar,
  HiOutlineSwitchHorizontal,
  HiOutlineLightningBolt,
  HiOutlineTrendingUp,
} from "react-icons/hi";

// --------------------
// Types (if using TS in .jsx, keep or remove as needed)
// --------------------
interface ServiceCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
  benefits?: string[];
  roles?: string[];
  delay: number;
}

interface DiffItem {
  icon: React.ElementType;
  title: string;
  desc?: string;
}

// --------------------
// Small UI bits
// --------------------
const Pill = ({ children }: { children: React.ReactNode }) => (
  <div className="Welcome-box py-[8px] px-[7px] border border-[#7042f88b] opacity-[0.9] mb-4 inline-flex items-center">
    <SparklesIcon className="text-[#b49bff] mr-[10px] h-5 w-5" />
    <span className="Welcome-text text-[13px] text-white">{children}</span>
  </div>
);

// Card for services
const ServiceCard: React.FC<ServiceCardProps> = ({
  icon: Icon,
  title,
  description,
  benefits,
  roles,
  delay,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay }}
      className="bg-gradient-to-br from-purple-500/40 to-cyan-500/30 backdrop-blur-lg p-6 rounded-xl shadow-lg border border-[#7042f88b] flex flex-col items-start text-white max-w-sm mx-auto h-full hover:scale-[1.02] transition-transform duration-300 ease-in-out"
    >
      <div className="mb-4 flex items-center space-x-3 justify-center w-full">
        <Icon className="text-[#b49bff] text-2xl" />
        <h3 className="text-xl font-semibold text-white">{title}</h3>
      </div>

      <p className="text-gray-200 text-sm flex-grow text-center">{description}</p>

      {benefits?.length ? (
        <div className="mt-3 w-full">
          <h4 className="font-medium text-white mb-1">Benefits:</h4>
          <ul className="list-disc list-inside text-gray-200 text-xs space-y-1">
            {benefits.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
      ) : null}

      {roles?.length ? (
        <div className="mt-3 w-full">
          <h4 className="font-medium text-white mb-1">Roles include:</h4>
          <ul className="list-disc list-inside text-gray-200 text-xs space-y-1">
            {roles.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
      ) : null}
    </motion.div>
  );
};

// Bullet item for the “What Makes Us Different” section
const DifferenceBullet = ({ Icon, title, desc }: { Icon: React.ElementType; title: string; desc?: string }) => (
  <div className="flex items-start gap-3 p-4 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition">
    <div className="shrink-0 mt-1">
      <Icon className="text-[#b49bff] w-6 h-6" />
    </div>
    <div>
      <div className="text-white font-semibold">{title}</div>
      {desc ? <div className="text-gray-300 text-sm">{desc}</div> : null}
    </div>
  </div>
);

export const WhatWeDo = () => {
  // Data for “What Makes Us Different”
  const differences: DiffItem[] = [
    { icon: HiOutlineGlobeAlt, title: "UK/US-Based Project Managers" },
    { icon: HiOutlineAcademicCap, title: "VAs Trained on Your Tools & Industry" },
    { icon: HiOutlineChartSquareBar, title: "Performance Reporting & Dashboards" },
    { icon: HiOutlineSwitchHorizontal, title: "Systems-Driven, Not Freelance Chaos" },
    { icon: HiOutlineLightningBolt, title: "7-Day Onboarding Process" },
    { icon: HiOutlineTrendingUp, title: "Easily Scalable — Add/Remove Staff in Days" },
  ];

  return (
    <section
      id="what-we-do"
      className="flex flex-col items-center justify-center gap-14 h-full relative overflow-hidden py-20 px-4 md:px-8 lg:px-16"
    >
      {/* Intro */}
      <div className="text-center max-w-4xl">
        <div className="flex justify-center items-center">
          <motion.div variants={slideInFromTop} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <Pill>What We Do</Pill>
          </motion.div>
        </div>

        <motion.h2
          variants={slideInFromLeft(0.5)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          className="text-3xl md:text-5xl font-bold text-white leading-tight mb-4"
        >
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">
            We Build the Systems & Infrastructure
          </span>{" "}
          Behind High Growth SMEs.
        </motion.h2>

        <motion.p
          variants={slideInFromRight(0.7)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          className="text-base md:text-xl text-gray-300"
        >
          Whether you're an agency, startup, or small business, we plug in the right people, systems, and leadership to
          help you scale affordably and reliably.
        </motion.p>
      </div>

      {/* Core Services */}
      <div className="w-full max-w-6xl">
        <motion.h3
          variants={slideInFromLeft(0.9)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-white text-center mb-10"
        >
          Our Core Services
        </motion.h3>

        {/* 3-up */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          <ServiceCard
            icon={FaPhoneAlt}
            title="Call Center as a Service"
            description="Scalable call center solutions with trained agents for outbound sales, lead gen, appointment setting, and inbound support."
            benefits={["No need to manage reps or tech", "Performance tracking included", "Fast launch & scale-ready"]}
            delay={0.2}
          />
          <ServiceCard
            icon={FaUsers}
            title="Offshore Staffing"
            description="Pre-vetted, trained VAs and offshore talent matched to your business — from customer support to executive assistants."
            roles={["Admin assistants", "Customer support", "Sales/CRM assistants", "Social media and tech VAs"]}
            delay={0.4}
          />
          <ServiceCard
            icon={FaHandshake}
            title="Project Delivery Teams"
            description="Every client gets a UK/US-based Project Delivery Manager who leads a pod of 5–10 offshore team members. You deal with one expert — we handle the backend."
            benefits={["Consistency, accountability, results", "Manager who speaks your business language", "Each manager handles 10–20 clients"]}
            delay={0.6}
          />
        </div>

        {/* 2-up */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <ServiceCard
            icon={FaCogs}
            title="Systems & SOP Building"
            description="We don’t just throw people at your business. We design the systems that keep them efficient — from onboarding to task flow."
            benefits={["SOPs", "KPIs & dashboards", "Slack & CRM automations", "GHL/Notion/Zapier integrations"]}
            delay={0.8}
          />
          <ServiceCard
            icon={FaMoneyBillWave}
            title="Performance"
            description="For lead-gen or sales-heavy clients, we offer pay‑per‑performance options so you only pay when results are delivered."
            benefits={["Pay per lead", "Pay per appointment", "Pay per qualified action (CPA model)"]}
            delay={1.0}
          />
        </div>
      </div>

      {/* =========================
          Section 3: What Makes Us Different
          ========================= */}
      <div className="w-full max-w-6xl">
        <motion.h3
          variants={slideInFromLeft(0.3)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-white text-center mb-4"
        >
          Why We’re Not Your Average VA or Staffing Company
        </motion.h3>

        <motion.p
          variants={slideInFromRight(0.4)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center text-gray-300 max-w-3xl mx-auto mb-8"
        >
          Systems over chaos. Clear reporting. Senior leadership that understands your market.
        </motion.p>

        {/* Side-by-side bullet grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
          {differences.map((d, idx) => (
            <motion.div
              key={d.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
            >
              <DifferenceBullet Icon={d.icon} title={d.title} />
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <div className="flex justify-center mt-10">
          <motion.div initial={{ opacity: 0, scale: 0.98 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}>
            <Link
              href="#join-now" // or "/book-call" if you prefer the booking route
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-cyan-500 text-white font-semibold shadow-lg hover:brightness-110 active:scale-95 transition"
            >
              Book a Strategy Call
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Background video */}
      <div className="w-full h-full absolute top-0 left-0 z-[-10] opacity-30 pointer-events-none">
        <video className="w-full h-full object-cover" preload="auto" playsInline loop muted autoPlay>
          <source src="/videos/skills-bg.webm" type="video/webm" />
        </video>
      </div>
    </section>
  );
};

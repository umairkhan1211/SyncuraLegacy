// components/sections/PricingPlans.jsx
'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  SparklesIcon,
  CheckCircleIcon,
  XCircleIcon,
} from '@heroicons/react/24/solid';
import { CheckIcon } from '@heroicons/react/24/outline';
import { slideInFromTop, slideInFromLeft, slideInFromRight } from '@/lib/motion';

const includedFeatures = [
  'A dedicated UK/US Project Delivery Manager',
  'VAs trained in your tools, systems & workflows',
  'Weekly reporting and team performance insights',
  'Full backend team setup: Slack, SOPs, CRM, automations',
  "Scale up or down with just 1 week's notice",
  'Ongoing support and optimization',
];

const addOnsData = [
  {
    name: 'Additional VAs',
    description: 'Add extra capacity beyond base tier.',
    price: '+$597/mo per VA',
  },
  {
    name: 'Sales/Cold Calling Agents',
    description: 'For outbound & appointment-setting support.',
    price: 'Custom',
  },
  {
    name: 'Full Tech Automation (GHL, Zapier, Notion, Slack)',
    description: 'End-to-end workflow mapping and automation.',
    price: '$1,997 one-time',
  },
  {
    name: 'Performance-Based Delivery',
    description: 'Pay-per-lead or show-up.',
    price: "Custom pricing (let's talk)",
  },
];

const testimonials = [
  {
    company: 'BritTalent',
    before:
      'Manual follow-ups, slow onboarding, and scattered SOPs stalled pipeline.',
    after:
      'Centralized workflows, faster onboarding, and a steady flow of booked calls.',
  },
  {
    company: 'Exerra AI',
    before:
      'Founders stuck in ops; outreach/CRM tasks eating the week.',
    after:
      'Ops offloaded to a trained pod; founders focus on sales & delivery.',
  },
  {
    company: 'MoveWise',
    before:
      'Leads ignored on weekends; no consistent show-up process.',
    after:
      '24/7 coverage, show-up reminders, and clean CRM notes for handoff.',
  },
];

const faqs = [
  {
    q: 'Is there a setup fee?',
    a: 'No setup fees for monthly plans. Only automation projects have a one-time fee.',
  },
  {
    q: 'Can I change plans later?',
    a: 'Absolutely scale up or down based on your business needs.',
  },
  {
    q: 'Are your VAs industry-trained?',
    a: "Yes, and they're matched based on your niche and tool stack.",
  },
  {
    q: 'What if I already have a team?',
    a: 'We can integrate your current team or rebuild it with better infrastructure.',
  },
];

export const PricingPlans = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section
      id="pricing-plans"
      className="relative flex flex-col items-center justify-center w-full py-20 px-4 md:px-8 lg:px-16 overflow-hidden"
    >
      {/* Header */}
      <div ref={ref} className="text-center w-full mb-16">
        <div className="flex justify-center items-center mb-8">
          <motion.div
            variants={slideInFromTop}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="Welcome-box py-[8px] px-[7px] border border-[#7042f88b] opacity-[0.9] flex items-center rounded-full"
          >
            <SparklesIcon className="text-[#b49bff] mr-[10px] h-5 w-5" />
            <h1 className="Welcome-text text-[13px] text-white">
              Pricing & Plans
            </h1>
          </motion.div>
        </div>

        <motion.h2
          variants={slideInFromLeft(0.5)}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="text-4xl md:text-5xl font-bold text-white leading-tight mb-4"
        >
          Simple, Scalable Pricing That Powers Your Backend
        </motion.h2>

        <motion.p
          variants={slideInFromRight(0.7)}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="text-lg md:text-xl text-gray-300 mb-8"
        >
          From lean teams to full operational pods — choose the right backend
          support to scale your business faster and smarter.
        </motion.p>

        {/* Primary CTA (always visible) */}
        <motion.div
          variants={slideInFromTop}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="flex justify-center"
        >
          <Link
            href="/book-call"
            aria-label="Book a free strategy call"
            className="px-8 py-3 rounded-full text-lg font-bold text-white shadow-xl transition-all duration-300 transform hover:scale-105
              bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700
              border border-purple-400"
          >
            Book a Free Strategy Call
          </Link>
        </motion.div>
      </div>

      {/* Core Inclusions */}
      <motion.div
        variants={slideInFromTop}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        transition={{ delay: 0.2, duration: 0.8 }}
        className="w-full max-w-6xl"
      >
        <div className="relative p-8 rounded-3xl overflow-hidden bg-[#1a0f3d] border border-[#7042f88b] shadow-2xl mb-12">
          <div className="absolute inset-0 z-0 opacity-20">
            <div className="w-full h-full bg-gradient-to-br from-purple-800 to-indigo-900 rounded-3xl" />
          </div>

          <div className="relative z-10">
            <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-6">
              <div className="text-center md:text-left">
                <h3 className="text-3xl md:text-4xl font-extrabold text-[#b49bff]">
                  What’s Included in Every Plan
                </h3>
                <p className="text-lg text-gray-300 mt-2">
                  All plans include the same reliable backbone. Scale up
                  capacity whenever you’re ready.
                </p>
              </div>

              <Link
                href="/book-call"
                className="px-6 py-3 rounded-full text-base font-bold text-white shadow-xl transition-all duration-300 hover:scale-105
                bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700
                border border-purple-400"
              >
                Book a Free Strategy Call
              </Link>
            </div>

            <ul className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 text-white">
              {includedFeatures.map((feature, idx) => (
                <li key={idx} className="flex items-start text-lg">
                  <CheckIcon className="h-6 w-6 text-green-400 mr-3 flex-shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ---------- Section 2: Add‑On Options ---------- */}
        <div className="w-full mb-16">
          <motion.h3
            variants={slideInFromTop}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="text-3xl md:text-4xl font-bold text-white mb-6 text-center"
          >
            Add‑On Options (Optional Upgrades)
          </motion.h3>
          <motion.p
            variants={slideInFromTop}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            transition={{ delay: 0.15 }}
            className="text-md text-gray-300 mb-8 text-center"
          >
            Customize your plan with specialized services to fit your unique needs.
          </motion.p>

          {/* Mobile: cards */}
          <div className="grid grid-cols-1 gap-6 md:hidden">
            {addOnsData.map((addon, i) => (
              <div
                key={i}
                className="p-6 rounded-2xl bg-[#0f0b22] border border-[#3b2a7a] shadow-lg"
              >
                <div className="flex items-center justify-between">
                  <h4 className="text-xl font-semibold text-white">
                    {addon.name}
                  </h4>
                  <span className="text-[#b49bff] font-semibold">
                    {addon.price}
                  </span>
                </div>
                <p className="text-gray-300 mt-2">{addon.description}</p>
              </div>
            ))}
          </div>

          {/* Desktop: table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="min-w-full text-left text-sm md:text-base bg-[#0f0b22] border border-[#3b2a7a] rounded-2xl overflow-hidden">
              <thead className="bg-[#161132] text-white">
                <tr>
                  <th className="px-6 py-4 font-semibold">Add‑On</th>
                  <th className="px-6 py-4 font-semibold">Description</th>
                  <th className="px-6 py-4 font-semibold">Price</th>
                </tr>
              </thead>
              <tbody className="text-gray-200">
                {addOnsData.map((addon, i) => (
                  <tr
                    key={i}
                    className="border-t border-[#3b2a7a] hover:bg-[#130e2a]"
                  >
                    <td className="px-6 py-4">{addon.name}</td>
                    <td className="px-6 py-4">{addon.description}</td>
                    <td className="px-6 py-4 text-[#b49bff] font-semibold">
                      {addon.price}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ---------- Section 3: Cost Comparison Chart ---------- */}
        <div className="w-full mb-16">
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-6 text-center">
            Cost Comparison
          </h3>

          {/* Mobile: stacked feature cards */}
          <div className="md:hidden space-y-6">
            {[
              {
                label: 'Monthly Cost',
                ours: '$1,997–$6,997',
                theirs: '$7,000–$15,000+',
              },
              {
                label: 'Project Manager Included?',
                ours: (
                  <span className="inline-flex items-center gap-2">
                    <CheckCircleIcon className="h-5 w-5 text-green-400" />
                    Yes
                  </span>
                ),
                theirs: (
                  <span className="inline-flex items-center gap-2">
                    <XCircleIcon className="h-5 w-5 text-rose-400" />
                    No
                  </span>
                ),
              },
              { label: 'Time to Launch', ours: '7–10 days', theirs: '30–60 days' },
              {
                label: 'Training Needed?',
                ours: (
                  <span className="inline-flex items-center gap-2">
                    <XCircleIcon className="h-5 w-5 text-emerald-400 rotate-45" />
                    None
                  </span>
                ),
                theirs: (
                  <span className="inline-flex items-center gap-2">
                    <CheckCircleIcon className="h-5 w-5 text-amber-400" />
                    Yes
                  </span>
                ),
              },
              {
                label: 'Easily Scalable?',
                ours: (
                  <span className="inline-flex items-center gap-2">
                    <CheckCircleIcon className="h-5 w-5 text-green-400" />
                    Yes
                  </span>
                ),
                theirs: (
                  <span className="inline-flex items-center gap-2">
                    <XCircleIcon className="h-5 w-5 text-rose-400" />
                    No
                  </span>
                ),
              },
              {
                label: 'Fully Managed?',
                ours: (
                  <span className="inline-flex items-center gap-2">
                    <CheckCircleIcon className="h-5 w-5 text-green-400" />
                    Yes
                  </span>
                ),
                theirs: (
                  <span className="inline-flex items-center gap-2">
                    <XCircleIcon className="h-5 w-5 text-rose-400" />
                    No
                  </span>
                ),
              },
            ].map((row, i) => (
              <div
                key={i}
                className="rounded-2xl border border-[#3b2a7a] bg-[#0f0b22] p-5"
              >
                <div className="text-gray-300">{row.label}</div>
                <div className="mt-2 grid grid-cols-2 gap-3">
                  <div>
                    <div className="text-xs text-gray-400">Syncura Legacy</div>
                    <div className="text-white">{row.ours}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-400">In‑House Hire</div>
                    <div className="text-white">{row.theirs}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop: table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="min-w-full text-left text-sm md:text-base bg-[#0f0b22] border border-[#3b2a7a] rounded-2xl overflow-hidden">
              <thead className="bg-[#161132] text-white">
                <tr>
                  <th className="px-6 py-4 font-semibold w-1/3">Feature</th>
                  <th className="px-6 py-4 font-semibold">Syncura Legacy</th>
                  <th className="px-6 py-4 font-semibold">In‑House Hire</th>
                </tr>
              </thead>
              <tbody className="text-gray-200">
                <tr className="border-t border-[#3b2a7a]">
                  <td className="px-6 py-4">Monthly Cost</td>
                  <td className="px-6 py-4">$1,997–$6,997</td>
                  <td className="px-6 py-4">$7,000–$15,000+</td>
                </tr>
                <tr className="border-t border-[#3b2a7a]">
                  <td className="px-6 py-4">Project Manager Included?</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center gap-2">
                      <CheckCircleIcon className="h-5 w-5 text-green-400" />
                      Yes
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center gap-2">
                      <XCircleIcon className="h-5 w-5 text-rose-400" />
                      No
                    </span>
                  </td>
                </tr>
                <tr className="border-t border-[#3b2a7a]">
                  <td className="px-6 py-4">Time to Launch</td>
                  <td className="px-6 py-4">7–10 days</td>
                  <td className="px-6 py-4">30–60 days</td>
                </tr>
                <tr className="border-t border-[#3b2a7a]">
                  <td className="px-6 py-4">Training Needed?</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center gap-2">
                      <XCircleIcon className="h-5 w-5 text-emerald-400 rotate-45" />
                      None
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center gap-2">
                      <CheckCircleIcon className="h-5 w-5 text-amber-400" />
                      Yes
                    </span>
                  </td>
                </tr>
                <tr className="border-t border-[#3b2a7a]">
                  <td className="px-6 py-4">Easily Scalable?</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center gap-2">
                      <CheckCircleIcon className="h-5 w-5 text-green-400" />
                      Yes
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center gap-2">
                      <XCircleIcon className="h-5 w-5 text-rose-400" />
                      No
                    </span>
                  </td>
                </tr>
                <tr className="border-t border-[#3b2a7a]">
                  <td className="px-6 py-4">Fully Managed?</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center gap-2">
                      <CheckCircleIcon className="h-5 w-5 text-green-400" />
                      Yes
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center gap-2">
                      <XCircleIcon className="h-5 w-5 text-rose-400" />
                      No
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* ---------- Section 4: Visual Testimonials ---------- */}
        <div className="w-full mb-16">
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-6 text-center">
            Visual Testimonials
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className="rounded-2xl border border-[#3b2a7a] bg-[#0f0b22] p-6"
              >
                <div className="text-white text-xl font-semibold mb-4">
                  {t.company}
                </div>
                <div className="space-y-4">
                  <div className="bg-[#140f2d] rounded-xl p-4">
                    <div className="text-xs uppercase tracking-wide text-rose-300 mb-1">
                      Before
                    </div>
                    <p className="text-gray-300">{t.before}</p>
                  </div>
                  <div className="bg-[#111c3b] rounded-xl p-4">
                    <div className="text-xs uppercase tracking-wide text-emerald-300 mb-1">
                      After
                    </div>
                    <p className="text-gray-200">{t.after}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ---------- Section 5: FAQ (accordion) ---------- */}
        <div className="w-full mb-16">
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-6 text-center">
            Section 5: FAQ
          </h3>
          <div className="space-y-4 max-w-4xl mx-auto">
            {faqs.map((item, i) => (
              <details
                key={i}
                className="group rounded-2xl border border-[#3b2a7a] bg-[#0f0b22] p-5"
              >
                <summary className="cursor-pointer text-white font-semibold list-none flex items-center justify-between">
                  <span>{item.q}</span>
                  <span className="ml-4 transition-transform group-open:rotate-45 text-[#b49bff]">
                    +
                  </span>
                </summary>
                <p className="mt-3 text-gray-300">{item.a}</p>
              </details>
            ))}
          </div>
        </div>

        {/* ---------- Section 6: CTA Banner ---------- */}
        <div className="w-full">
          <div className="relative overflow-hidden rounded-3xl border border-[#7042f88b] bg-gradient-to-r from-indigo-900 via-purple-800 to-indigo-900 p-8 md:p-12">
            <div className="relative z-10">
              <h3 className="text-2xl md:text-3xl font-extrabold text-white">
                Let’s Build the Backend That Helps You Scale Without Burnout
              </h3>
              <p className="text-gray-200 mt-2 max-w-2xl">
                Plug a trained, fully managed team into your business and
                reclaim your week.
              </p>
              <div className="mt-6">
                <Link
                  href="/book-call"
                  className="inline-flex items-center justify-center px-6 py-3 rounded-full text-base md:text-lg font-bold text-white shadow-xl transition-all duration-300 hover:scale-105
                  bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700
                  border border-purple-400"
                >
                  Book a Free Strategy Call
                </Link>
              </div>
            </div>

            {/* soft glow */}
            <div
              aria-hidden="true"
              className="absolute -top-24 -right-24 h-64 w-64 rounded-full blur-3xl opacity-30 bg-purple-500"
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
};

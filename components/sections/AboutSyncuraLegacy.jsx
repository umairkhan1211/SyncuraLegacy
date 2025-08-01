// components/sections/AboutSyncuraLegacy.jsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { SparklesIcon, CheckIcon, RocketLaunchIcon, GlobeAltIcon, UsersIcon } from '@heroicons/react/24/solid';
import { slideInFromTop, slideInFromLeft, slideInFromRight } from '@/lib/motion';

const poweredByData = [
  {
    name: "BritTalent",
    description: "Staffing & Recruiting Agency",
    story: "We built and trained a full sourcing, scheduling, and reporting team — helping the founders focus on client strategy instead of spreadsheets.",
    icon: <UsersIcon className="h-8 w-8 text-[#b49bff]" />
  },
  {
    name: "Bright Edge (Partner)",
    description: "Automation Agency",
    story: "I co-built Bright Edge with a strong delivery foundation — we implemented onboarding flows, built out automations, and trained backend support to scale client delivery seamlessly.",
    icon: <RocketLaunchIcon className="h-8 w-8 text-[#b49bff]" />
  },
  {
    name: "Exerra AI",
    description: "AI & Workflow Automation Startup",
    story: "We manage their backend so the founders can focus on sales. That means trained VAs running Notion, Slack, ClickUp, and CRM ops — all coordinated by their PD Manager.",
    icon: <SparklesIcon className="h-8 w-8 text-[#b49bff]" />
  },
  {
    name: "Thread Trax",
    description: "Final Expense Insurance Call Center",
    story: "Thread Trax is powered entirely by Syncura's infrastructure — from scripting and training to QA systems and performance tracking. Our backend enables consistent delivery and live agent performance across the board.",
    icon: <GlobeAltIcon className="h-8 w-8 text-[#b49bff]" />
  },
];

export const AboutSyncuraLegacy = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="about" className="relative flex flex-col items-center justify-center w-full py-20 px-4 md:px-8 lg:px-16 overflow-hidden">
      <div ref={ref} className="text-center w-full mb-16">
        <div className="flex justify-center items-center mb-8">
          <motion.div
            variants={slideInFromTop}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="Welcome-box py-[8px] px-[7px] border border-[#7042f88b] opacity-[0.9] flex items-center"
          >
            <SparklesIcon className="text-[#b49bff] mr-[10px] h-5 w-5" />
            <h1 className="Welcome-text text-[13px] text-white">About Syncura Legacy</h1>
          </motion.div>
        </div>
      </div>
      
      <div className="w-full max-w-7xl">
        {/* Founder's Quote */}
        <motion.div
          variants={slideInFromLeft(0.5)}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="relative z-10 p-8 md:p-12 mb-16 rounded-3xl overflow-hidden bg-gradient-to-br from-purple-800 to-indigo-900 shadow-2xl text-center"
        >
          <p className="text-xl md:text-2xl italic font-light text-gray-200">
            &quot;I&apos;m Building the Backend I Wish I Had — One That Actually Feels Like It&apos;s Part of Your Business.&quot;
          </p>
          <p className="mt-4 text-lg font-semibold text-white">Areeb Fahim, Founder of Syncura Legacy</p>
        </motion.div>

        {/* Founder's Story */}
        <motion.div
          variants={slideInFromRight(0.7)}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="relative z-10 text-white leading-relaxed mb-16 bg-[#030014]"
        >
          <h3 className="text-3xl md:text-4xl font-bold mb-6 text-[#b49bff]"> Hi, I&apos;m Areeb</h3>
          <p className="text-lg text-gray-300 mb-4">
            When I started scaling my own company, I went through what most founders experience: Too many tasks, too little structure, and way too much time spent managing people instead of leading the business.
          </p>
          <p className="text-lg text-gray-300 mb-8">
            I tried hiring offshore. I tried working with VAs. I even looked into traditional BPOs. But here&apos;s what I found — and what nobody tells you up front:
          </p>
          <p className="text-xl font-bold text-white mb-2">
            Most outsourced support feels like you&apos;re managing a team that doesn&apos;t belong to you.
          </p>
          <ul className="list-disc list-inside text-lg text-gray-300 mb-8 ml-4">
            <li>You&apos;re stuck explaining things over and over again.</li>
            <li>You&apos;re chasing updates.</li>
            <li>You&apos;re managing chaos, not solving it.</li>
            <li>And most of the time, the people you&apos;re dealing with don&apos;t understand your market, your culture, or your urgency — let alone the way you speak or sell.</li>
          </ul>
        </motion.div>

        {/* What I Built Instead */}
        <motion.div
          variants={slideInFromLeft(0.9)}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="relative z-10 text-white leading-relaxed mb-16 bg-[#030014]"
        >
          <h3 className="text-3xl md:text-4xl font-bold mb-6 text-[#b49bff]"> What I Built Instead</h3>
          <p className="text-lg text-gray-300 mb-4">
            I built a model that gave me freedom, clarity, and control. A backend team that worked behind a UK or US-based Delivery Manager who understood my tone, my speed, and my standards.
          </p>
          <p className="text-lg text-gray-300 mb-4">
            Behind that manager was a fully trained offshore team — VAs, appointment setters, admin pros, CRM operators — all following SOPs I didn&apos;t have to create myself. That model became Syncura Legacy.
          </p>
          <p className="text-xl font-bold text-white mb-2">
            Today, we help other founders get the same thing:
          </p>
          <ul className="list-disc list-inside text-lg text-gray-300 mb-8 ml-4">
            <li>A single point of contact who "gets" them</li>
            <li>A team that&apos;s already trained, aligned, and managed</li>
            <li>Systems that scale without their constant supervision</li>
          </ul>
        </motion.div>

        {/* Why Syncura Legacy Works */}
        <motion.div
          variants={slideInFromRight(1.1)}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="relative z-10 text-white leading-relaxed mb-16 bg-[#030014]"
        >
          <h3 className="text-3xl md:text-4xl font-bold mb-6 text-[#b49bff]">Why Syncura Legacy Works</h3>
          <p className="text-lg text-gray-300 mb-4">
            We don&apos;t just provide people. We provide structure. We provide bandwidth. We provide peace of mind. And we do it in a way that founders can actually trust — because the person you speak to isn&apos;t 12 time zones away and reading from a script. They&apos;re someone local. Someone strategic. Someone who already has a team behind them.
          </p>
          <p className="text-xl font-bold text-white mb-2">
            You don't feel like you're outsourcing. You feel like you're scaling.
          </p>
        </motion.div>

        {/* Syncura Legacy Powers - Unique Card Layout */}
        <motion.div
          variants={slideInFromTop}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          transition={{ delay: 1.3, duration: 0.8 }}
          className="relative z-10 mb-16"
        >
          <h3 className="text-3xl md:text-4xl font-bold text-white text-center mb-8">
            <SparklesIcon className="h-8 w-8 text-purple-400 inline-block mr-2 align-middle" />
            Syncura Legacy Powers
            <SparklesIcon className="h-8 w-8 text-purple-400 inline-block ml-2 align-middle" />
          </h3>
          <p className="text-lg text-gray-300 text-center mb-10">
            Here&apos;s a look at a few companies already powered by our backend delivery model:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {poweredByData.map((item, index) => (
              <motion.div
                key={index}
                variants={slideInFromLeft(0.1 * index)}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                className="bg-[#1a0f3d] p-6 rounded-2xl border border-[#7042f88b] shadow-xl flex flex-col h-full transition-transform duration-300 hover:scale-105"
              >
                <div className="flex items-center mb-4">
                  <div className="p-3 rounded-full bg-indigo-700">{item.icon}</div>
                  <div className="ml-4">
                    <h4 className="text-2xl font-bold text-white">{item.name}</h4>
                    <p className="text-md text-gray-300">{item.description}</p>
                  </div>
                </div>
                <p className="text-sm text-gray-200">{item.story}</p>
              </motion.div>
            ))}
          </div>
          <p className="text-lg text-gray-300 text-center mt-10">
            These aren&apos;t just clients. Some are partners, others are extensions of my own entrepreneurial journey. All of them prove that your business doesn&apos;t need more tools or people — it needs a system and a team that actually works together.
          </p>
        </motion.div>

        {/* Why "Legacy"? */}
        <motion.div
          variants={slideInFromLeft(1.5)}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="relative z-10 text-white text-center mb-16"
        >
          <h3 className="text-4xl md:text-5xl font-extrabold text-[#b49bff] mb-4">
             Why “Legacy”?
          </h3>
          <p className="text-xl md:text-2xl font-light text-gray-300 max-w-4xl mx-auto">
            Because what you&apos;re building shouldn&apos;t burn you out. It should outlast you. Your backend — your systems, your people, your delivery — is your legacy. Let&apos;s build it right.
          </p>
        </motion.div>

        {/* Final CTA */}
        <motion.div
          variants={slideInFromTop}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          transition={{ delay: 1.8, duration: 0.8 }}
          className="relative z-10 text-center"
        >
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Let&apos;s Talk
          </h3>
          <p className="text-lg text-gray-300 mb-8">
            If you&apos;re ready to scale your business without scaling your headaches, I&apos;d love to chat.
          </p>
          <a
            href="/schedule" // You can change this to a specific link
            className="px-10 py-4 rounded-full text-lg font-bold text-white shadow-xl transition-all duration-300 transform hover:scale-105
            bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700
            border border-purple-400"
          >
            Book Your Free Strategy Call
          </a>
        </motion.div>
      </div>
    </section>
  );
};

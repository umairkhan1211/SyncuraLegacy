// components/sections/PricingPlans.jsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { SparklesIcon } from '@heroicons/react/24/solid';
import { CheckIcon } from '@heroicons/react/24/outline'; // Using an outline checkmark for a modern look
import { slideInFromTop, slideInFromLeft, slideInFromRight } from '@/lib/motion';

const includedFeatures = [
  "A dedicated UK/US Project Delivery Manager",
  "VAs trained in your tools, systems & workflows",
  "Weekly reporting and team performance insights",
  "Full backend team setup: Slack, SOPs, CRM, automations",
  "Scale up or down with just 1 week's notice",
  "Ongoing support and optimization",
];

const addOnsData = [
  {
    name: "Additional VAs",
    description: "Add extra capacity beyond the base tier.",
    price: "+$597/mo per VA"
  },
  {
    name: "Sales/Cold Calling Agents",
    description: "For outbound & appointment-setting support.",
    price: "Custom"
  },
  {
    name: "Full Tech Automation",
    description: "End-to-end workflow mapping and automation (GHL, Zapier, Notion, Slack).",
    price: "$1,997 one-time"
  },
  {
    name: "Performance-Based Delivery",
    description: "Pay-per-lead or show-up.",
    price: "Custom pricing (let&apos;s talk)"
  },
];

export const PricingPlans = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="pricing-plans" className="relative flex flex-col items-center justify-center w-full py-20 px-4 md:px-8 lg:px-16 overflow-hidden">
      <div ref={ref} className="text-center w-full mb-16">
        <div className="flex justify-center items-center mb-8">
          <motion.div
            variants={slideInFromTop}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="Welcome-box py-[8px] px-[7px] border border-[#7042f88b] opacity-[0.9] flex items-center"
          >
            <SparklesIcon className="text-[#b49bff] mr-[10px] h-5 w-5" />
            <h1 className="Welcome-text text-[13px] text-white">Pricing & Plans</h1>
          </motion.div>
        </div>

        <motion.h2
          variants={slideInFromLeft(0.5)}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="text-4xl md:text-5xl font-bold text-white leading-tight mb-4"
        >
          Simple, Scalable Pricing That Powers Your Backend
        </motion.h2>
        <motion.p
          variants={slideInFromRight(0.7)}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="text-lg md:text-xl text-gray-300 mb-8"
        >
          From lean teams to full operational pods — choose the right backend support to scale your business faster and smarter.
        </motion.p>
      </div>

      <motion.div
        variants={slideInFromTop}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        transition={{ delay: 1, duration: 0.8 }}
        className="w-full max-w-6xl"
      >
        {/* Core Pricing Card */}
        <div className="relative p-8 rounded-3xl overflow-hidden bg-[#1a0f3d] border border-[#7042f88b] shadow-2xl mb-12">
          {/* Decorative Gradient Background */}
          <div className="absolute inset-0 z-0 opacity-20">
            <div className="w-full h-full bg-gradient-to-br from-purple-800 to-indigo-900 rounded-3xl"></div>
          </div>
          <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start justify-between">
            <div className="text-center md:text-left mb-8 md:mb-0">
              <h3 className="text-4xl md:text-5xl font-extrabold text-[#b49bff]">What's Included in Every Plan</h3>
              <p className="text-xl text-gray-300 mt-2">All our plans are built around a foundational support system.</p>
            </div>
            <a 
              href="#" // You can change this to a specific link
              className="px-8 py-3 rounded-full text-lg font-bold text-white shadow-xl transition-all duration-300 transform hover:scale-105
              bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700
              border border-purple-400"
            >
              Book a Free Strategy Call
            </a>
          </div>

          <div className="relative z-10 mt-10">
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 text-white">
              {includedFeatures.map((feature, index) => (
                <li key={index} className="flex items-start text-lg">
                  <CheckIcon className="h-6 w-6 text-green-400 mr-3 flex-shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Add-ons Section */}
        <div className="text-center w-full my-12">
          <motion.h3
            variants={slideInFromTop}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="text-3xl md:text-4xl font-bold text-white mb-6"
          >
            Add-ons to Supercharge Your Team
          </motion.h3>
          <motion.p
            variants={slideInFromTop}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            transition={{ delay: 0.3 }}
            className="text-md text-gray-300 mb-8"
          >
            Customize your plan with specialized services to fit your unique needs.
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {addOnsData.map((addon, index) => (
            <motion.div
              key={index}
              variants={slideInFromLeft(0.1 * index)}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              className="relative p-6 rounded-2xl bg-[#1a0f3d] border border-[#7042f88b] shadow-lg flex flex-col h-full"
            >
              <h4 className="text-2xl font-bold text-white">{addon.name}</h4>
              <p className="text-gray-300 mt-2 flex-grow">{addon.description}</p>
              <div className="mt-4">
                <span className="text-2xl font-semibold text-[#b49bff]">{addon.price}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

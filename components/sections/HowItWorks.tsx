// components/HowItWorks/HowItWorks.jsx
"use client";

import React from 'react';
import { motion } from "framer-motion";
import { SparklesIcon } from "@heroicons/react/24/solid";
import Image from "next/image"; // Assuming Next.js Image component
import { slideInFromTop, slideInFromLeft, slideInFromRight } from "@/lib/motion"; // Assuming these are defined

// Importing icons for the steps
import { FaSearch, FaUsersCog, FaChartLine } from 'react-icons/fa'; // Using Font Awesome icons for steps

// Component for each step in the process
interface ProcessStepProps {
  icon: React.ElementType;
  title: string;
  description: string;
  details: string[];
  delay: number;
}

const ProcessStep: React.FC<ProcessStepProps> = ({ icon: Icon, title, description, details, delay }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: delay }}
      className="flex flex-col items-center text-center p-6 rounded-xl border border-[#7042f88b] bg-gradient-to-br from-[#1a0f3d]/10 to-[#2e1d5a]/10 backdrop-blur-md  shadow-lg h-full"
    >
      <div className="mb-4 flex items-center justify-center w-16 h-16 rounded-full bg-[#b49bff]/20">
        <Icon className="text-[#b49bff] text-3xl" />
      </div>
      <h4 className="text-2xl font-semibold text-white mb-3">{title}</h4>
      <p className="text-gray-300 text-base mb-4 flex-grow">{description}</p>
      {/* <ul className="list-disc list-inside text-gray-300 text-sm text-left w-full">
        {details.map((item, i) => (
          <li key={i} className="mb-1">{item}</li>
        ))}
      </ul> */}
    </motion.div>
  );
};

export const HowItWorks = () => {
  return (
    <section
      id="how-it-works" // ID for navigation
      className="relative flex flex-col items-center justify-center min-h-screen w-full h-full py-20 px-4 md:px-8 lg:px-16 overflow-hidden"
    >
      {/* Content Wrapper */}
      <div className="relative z-10 w-full max-w-6xl flex flex-col items-center">
        {/* Section Title */}
        <div className="flex justify-center items-center mb-8">
          <motion.div
            variants={slideInFromTop}
            className="Welcome-box py-[8px] px-[7px] border border-[#7042f88b] opacity-[0.9] mb-4"
          >
            <SparklesIcon className="text-[#b49bff] mr-[10px] h-5 w-5" />
            <h1 className="Welcome-text text-[13px] text-white">How It Works</h1>
          </motion.div>
        </div>

        {/* Hero / Overview Section */}
        <div className="text-center max-w-4xl ">
          <motion.h2
            variants={slideInFromLeft(0.5)}
            className="text-4xl md:text-5xl font-bold text-white leading-tight mb-4"
          >
            From First Call to Full Ops – Here&apos;s How We Plug In
          </motion.h2>
          <motion.p
            variants={slideInFromRight(0.7)}
            className="text-lg md:text-xl text-gray-300 mb-8"
          >
            We&apos;ve simplified the process of building your offshore team and backend delivery system — so you can focus on growth while we handle the rest.
          </motion.p>
          {/* Optional: A simple visual separator or arrow to indicate flow */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="text-white text-6xl"
          >
            &#8595; {/* Down arrow character */}
          </motion.div>
        </div>

        {/* Video Section - Now in-content with Lock Image */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }} // Added delay to appear after arrow
          className="relative w-full  mx-auto mb-10 rounded-xl overflow-hidden shadow-2xl  flex items-center justify-center" // Added flex, items-center, justify-center for centering content
        >
          {/* Lock Image and Text Overlay */}
          <div className="absolute z-20 flex flex-col items-center justify-center w-full h-full"> {/* Adjusted positioning */}
            <div className="flex flex-col items-center group cursor-pointer w-auto h-auto">
              <Image
                src="/lock-top.png"
                alt="Lock top"
                width={70}
                height={70}
                className="translate-y-5 transition-all duration-200 group-hover:translate-y-11"
              />
              <Image
                src="/lock-main.png"
                alt="Lock main"
                width={100}
                height={100}
                className="z-10"
              />
            </div>

            <div className="Welcome-box px-[15px] py-[4px] z-[20] border my-[20px] border-[#7042F88B] opacity-[0.9]">
              <h1 className="Welcome-text text-[12px]">Your Services will be Secure with SynCuraLegacy</h1>
            </div>

         
          </div>

          {/* Video */}
          <video
            loop
            muted
            autoPlay
            playsInline
            preload="auto"
            className="w-full h-[500px] object-cover z-10" // Ensure video is behind the lock content but still visible
          >
            <source src="/videos/encryption-bg.webm" type="video/webm" />
          </video>
        </motion.div>

        {/* The 3-Step Process Section */}
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <ProcessStep
            icon={FaSearch}
            title="Step 1: Audit"
            description="We start with a deep dive into your current operations, delivery capacity, and growth goals."
            details={[
              "Business & team analysis",
              "Current tools, CRMs, SOPs, delivery model",
              "Identify bottlenecks & time drains",
              "Output: A custom operations blueprint (your backend gameplan)",
            ]}
            delay={0.2}
          />
          <ProcessStep
            icon={FaUsersCog}
            title="Step 2: Assemble"
            description="We match you with a UK/US-based Project Delivery Manager and build your offshore backend team."
            details={[
              "You&apos;re paired with your Delivery Manager",
              "We recruit, train, and assign VAs (5–10 based on your needs)",
              "Setup of systems, Slack channels, CRM workflows, etc.",
              "Roles Covered: Admin Assistants, Appointment Setters, Sales/CRM Support, Customer Support, Reporting & QA VAs",
            ]}
            delay={0.4}
          />
          <ProcessStep
            icon={FaChartLine}
            title="Step 3: Scale"
            description="With your backend running smoothly, you can scale sales, delivery, or client service — without hiring headaches."
            details={[
              "Weekly syncs with your Project Manager",
              "Monthly performance reports",
              "Scale or shrink team size easily",
              "Optional: performance-based billing models (pay-per-lead or per-output)",
            ]}
            delay={0.6}
          />
        </div>

        {/* Why This Works Section */}
        <div className="text-center max-w-4xl mb-16">
          <motion.h3
            variants={slideInFromLeft(0.8)}
            className="text-3xl md:text-4xl font-bold text-white mb-6"
          >
            Built for Busy Founders. Designed to Scale.
          </motion.h3>
          <motion.ul
            variants={slideInFromRight(1.0)}
            className="list-disc list-inside text-gray-300 text-lg md:text-xl space-y-2 mx-auto max-w-2xl"
          >
            <li>You only manage one person (we handle the rest)</li>
            <li>Instant access to trained staff</li>
            <li>Everything we do is systems-driven, — not dependent on freelancers</li>
            <li>Your backend grows as your revenue grows</li>
          </motion.ul>
        </div>

        {/* Final CTA Section */}
        <div className="text-center max-w-3xl">
          <motion.h3
            variants={slideInFromTop}
            className="text-3xl md:text-4xl font-bold text-white mb-4"
          >
            Want Your Backend to Just Work?
          </motion.h3>
          <motion.p
            variants={slideInFromLeft(0.5)}
            className="text-lg md:text-xl text-gray-300 mb-8"
          >
            Let&apos;s map out your operations gameplan — no obligation.
          </motion.p>
          <motion.button
            variants={slideInFromTop}
            className="px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold rounded-full shadow-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 ease-in-out transform hover:scale-105"
          >
            Book a Free Strategy Call
          </motion.button>
        </div>
      </div>
    </section>
  );
};

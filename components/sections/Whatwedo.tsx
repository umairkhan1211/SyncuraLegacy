// components/WhatWeDo/WhatWeDo.jsx
"use client";

import React from 'react';
import { motion } from "framer-motion";
import { SparklesIcon } from "@heroicons/react/24/solid";
import Image from 'next/image'; // Assuming you have Next.js Image component
import { slideInFromLeft, slideInFromRight, slideInFromTop } from "@/lib/motion"; // Assuming these are defined in your lib/motion.js

// Import specific icons from react-icons
import { FaPhoneAlt, FaUsers, FaHandshake, FaCogs, FaMoneyBillWave } from 'react-icons/fa'; // Using Font Awesome icons

// Define the structure for each service card
interface ServiceCardProps {
  icon: React.ElementType; // Icon is now a React component
  title: string;
  description: string;
  benefits?: string[]; // Optional list of benefits
  roles?: string[]; // Optional list of roles
  delay: number; // Animation delay for staggered appearance
}

// Service Card Component
const ServiceCard: React.FC<ServiceCardProps> = ({ icon: Icon, title, description, benefits, roles, delay }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: delay }}
     className="bg-gradient-to-br from-purple-500/40 to-cyan-500/30 backdrop-blur-lg p-6 rounded-xl shadow-lg border border-[#7042f88b] flex flex-col items-start text-white max-w-sm mx-auto h-full hover:scale-105 transition-transform duration-300 ease-in-out"
>
      <div className="mb-4 flex items-center space-x-3 justify-center w-full   ">
      <div>
        {/* Render the React Icon component */}
        <Icon className="text-[#b49bff] text-2xl" />
      </div>
      <div>
      <h3 className="text-xl font-semibold text-white">{title}</h3>
      </div>
      </div>
      <p className="text-gray-200 text-sm  flex-grow text-center">{description}</p>
      {(benefits && benefits.length > 0) && (
        <div className="mt-2">
          <h4 className="font-medium text-white mb-1">Benefits:</h4>
          <ul className="list-disc list-inside text-gray-200 text-xs">
            {benefits.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
      )}
      {(roles && roles.length > 0) && (
        <div className="mt-2">
          <h4 className="font-medium text-white mb-1">Roles include:</h4>
          <ul className="list-disc list-inside text-gray-200 text-xs">
            {roles.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
      )}
    </motion.div>
  );
};

export const WhatWeDo = () => {
  return (
    <section
      id="what-we-do"
      className="flex flex-col items-center justify-center gap-8 h-full relative overflow-hidden py-20 px-4 md:px-8 lg:px-16"
    >
      {/* Intro Section */}
      <div className="text-center max-w-4xl mb-12">
        <div className="flex justify-center items-center ">
          <motion.div
            variants={slideInFromTop}
            className="Welcome-box py-[8px] px-[7px] border border-[#7042f88b] opacity-[0.9] mb-4"
          >
            <SparklesIcon className="text-[#b49bff] mr-[10px] h-5 w-5" />
            <h1 className="Welcome-text text-[13px] text-white">What We Do</h1>
          </motion.div>
        </div>

        <motion.h2
          variants={slideInFromLeft(0.5)}
          className="text-3xl md:text-5xl text-bold text-white leading-tight mb-4 "
        >
 
               <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">
              We  Build the Systems & Infrastructure
            </span>{" "}
          Behind High-Growth SMEs.
        </motion.h2>
        <motion.p
          variants={slideInFromRight(0.7)}
          className="text-base md:text-xl text-gray-400 mb-8"
        >
          Whether you're an agency, startup, or small business, we plug in the right people, systems, and leadership to help you scale — affordably and reliably.
        </motion.p>
    
      </div>

      {/* Our Core Services Section */}
      <div className="w-full max-w-6xl">
        <motion.h3
          variants={slideInFromLeft(0.9)}
          className="text-3xl md:text-4xl font-bold text-white text-center mb-10"
        >
          Our Core Services
        </motion.h3>

        {/* First three cards in a 3-column grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          <ServiceCard
            icon={FaPhoneAlt} // React Icon
            title="Call Center as a Service"
            description="Scalable call center solutions with trained agents for outbound sales, lead gen, appointment setting, and inbound support."
            benefits={[
              "No need to manage reps or tech",
              "Performance tracking included",
              "Fast launch & scale-ready",
            ]}
            delay={0.2}
          />
          <ServiceCard
            icon={FaUsers} // React Icon
            title="Offshore Staffing"
            description="Pre-vetted, trained VAs and offshore talent matched to your business — from customer support to executive assistants."
            roles={[
              "Admin assistants",
              "Customer support",
              "Sales/CRM assistants",
              "Social media and tech VAs",
            ]}
            delay={0.4}
          />
          <ServiceCard
            icon={FaHandshake} // React Icon
            title="Project Delivery Teams"
            description="Every client gets a UK/US-based Project Delivery Manager who leads a pod of 5-10 offshore team members. You deal with one expert — we handle the backend."
            benefits={[
              "Consistency, accountability, results",
              "Managed that who speaks your business language",
              "Each manager handles 10-20 clients",
            ]}
            delay={0.6}
          />
        </div>

        {/* Last two cards in a 2-column grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <ServiceCard
            icon={FaCogs} // React Icon
            title="Systems & SOP Building"
            description="We don&apos;t just throw people at your business. We design the systems that keep them efficient, — from onboarding to task flow."
            benefits={[
              "SOPs",
              "KPIs & dashboards",
              "Slack & CRM automations",
              "GHL/Notion/Zapier integrations",
            ]}
            delay={0.8}
          />
          <ServiceCard
            icon={FaMoneyBillWave} // React Icon
            title="Performance"
            description="For lead-gen or sales-heavy clients, we offer pay-per-performance options so you only pay when results are delivered."
            benefits={[
              "Pay per lead",
              "Pay per appointment",
              "Pay per qualified action (CPA model)",
            ]}
            delay={1.0}
          />
        </div>
      </div>

      {/* Background Video - Retained from previous code */}
      <div className="w-full h-full absolute top-0 left-0 z-[-10] opacity-30">
        <video
          className="w-full h-full object-cover" // Use object-cover to ensure video fills the container
          preload="auto" // Changed from "false" to "auto" for better loading
          playsInline
          loop
          muted
          autoPlay
        >
          <source src="/videos/skills-bg.webm" type="video/webm" />
        </video>
      </div>
    </section>
  );
};

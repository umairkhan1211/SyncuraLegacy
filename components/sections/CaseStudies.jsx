// components/sections/CaseStudies.jsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { SparklesIcon } from '@heroicons/react/24/solid';
import { slideInFromTop, slideInFromLeft, slideInFromRight } from '@/lib/motion';

// Data for the case studies
const caseStudiesData = [
  {
    id: 1,
    company: "BritTalent",
    industry: "Staffing & Recruitment",
    challenge: "Overwhelmed internal team, no delivery process, constant bottlenecks with candidate management.",
    solution: "Assigned UK-based Project Delivery Manager, hired & trained 6 VAs for sourcing, CRM updates, scheduling. Built automations in GHL + Slack + Airtable. Delivered SOPs.",
    results: [
      "Team capacity grew by 300%",
      "Cut lead response time upto 3 days ",
      "6 placements/month to 18+ within 60 days"
    ],
    logo: "/brittalent.jpg" // Placeholder, replace with actual logo path if available
  },
  {
    id: 2,
    company: "Exerra AI",
    industry: "AI & Marketing Automation",
    challenge: "Delivery was falling behind sales. No structured onboarding or fulfillment.",
    solution: "Assigned Project Delivery Manager with SaaS experience. Built onboarding flows in Slack + Notion. Recruited 5 VAs for daily task execution. Integrated ClickUp, GHL, Zapier.",
    results: [
      "Client onboarding dropped upt 2 days",
      "Founders fully removed from delivery ops",
      "10 new clients onboarded in 30 days with 0 drop-off"
    ],
    logo: "/exerra_ai_logo.jpg" // Placeholder
  },
  {
    id: 3,
    company: "MoveWise",
    industry: "Real Estate Tech",
    challenge: "Manual lead follow-up, agents missing appointments, poor CRM hygiene.",
    solution: "VA team to manage CRM (FollowUpBoss) + call center reps. Built lead scoring and assignment rules. Weekly performance reports for brokers.",
    results: [
      "40% improvement in call-to-appointment ratio",
      "$80K booked in listings within 45 days",
      "CRM hygiene maintained 95%+"
    ],
    logo: "/movewise_logo.jpg" // Placeholder
  }
];

export const CaseStudies = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="case-studies" className="relative flex flex-col items-center justify-center w-full py-20 px-4 md:px-8 lg:px-16  overflow-hidden">
      <div ref={ref} className="text-center w-full mb-16">
        <div className="flex justify-center items-center mb-8">
          <motion.div
            variants={slideInFromTop}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="Welcome-box py-[8px] px-[7px] border border-[#7042f88b] opacity-[0.9] flex items-center"
          >
            <SparklesIcon className="text-[#b49bff] mr-[10px] h-5 w-5" />
            <h1 className="Welcome-text text-[13px] text-white">Case Studies</h1>
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
          See how we&apos;ve helped growing businesses like yours scale backend operations, build teams, and streamline systems — all with a dedicated delivery model.
        </motion.p>
      </div>

      <motion.div
        variants={slideInFromTop}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        transition={{ delay: 1, duration: 0.8 }}
        className="w-full max-w-7xl"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {caseStudiesData.map((study) => (
            <div key={study.id} className="bg-[#301e6b5a] p-6 rounded-xl border border-[#7042f88b] shadow-lg flex flex-col h-full">
              {study.logo && (
                <img src={study.logo} alt={`${study.company} Logo`} className="h-12 object-contain mb-4 mx-auto border border-[#7042f88b] " />
              )}
              <h3 className="text-2xl font-bold text-white mb-2 text-center">{study.company}</h3>
              <p className="text-md text-gray-200 mb-4 text-center">({study.industry})</p>
              
              <div className="flex-grow">
                <h4 className="text-lg font-semibold text-[#b49bff] mb-2 flex items-center"><SparklesIcon className="h-5 w-5 mr-2 text-purple-400"/> Challenge:</h4>
                <p className="text-gray-200 text-sm mb-4">{study.challenge}</p>

                <h4 className="text-lg font-semibold text-[#b49bff] mb-2 flex items-center"><SparklesIcon className="h-5 w-5 mr-2 text-purple-400"/> Our Solution:</h4>
                <p className="text-gray-200 text-sm mb-4">{study.solution}</p>

                <h4 className="text-lg font-semibold text-[#b49bff] mb-2 flex items-center"><SparklesIcon className="h-5 w-5 mr-2 text-purple-400"/> Results:</h4>
                <ul className="list-disc list-inside text-gray-200 text-sm">
                  {study.results.map((result, i) => (
                    <li key={i} className="mb-1">{result}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

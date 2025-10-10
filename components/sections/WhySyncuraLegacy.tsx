"use client";

import React, { useRef } from 'react';
import { motion } from "framer-motion";
import { SparklesIcon } from "@heroicons/react/24/solid";
import { useInView } from "react-intersection-observer";
import { slideInFromTop, slideInFromLeft, slideInFromRight } from "@/lib/motion";
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

const comparisonData = [
  { feature: "UK/US Delivery Manager", syncura: true, vaAgencies: false, freelancers: false, inHouse: true },
  { feature: "Scalable Trained VA Team", syncura: true, vaAgencies: true, freelancers: false, inHouse: false },
  { feature: "SOP + System Building", syncura: true, vaAgencies: false, freelancers: false, inHouse: true },
  { feature: "Transparent Pricing", syncura: true, vaAgencies: false, freelancers: false, inHouse: false },
  { feature: "Fast Launch (7–10 days)", syncura: true, vaAgencies: false, freelancers: true, inHouse: false },
  { feature: "Performance-Based Options", syncura: true, vaAgencies: false, freelancers: false, inHouse: false },
];

export const WhySyncuraLegacy = () => {
  const videoRef = useRef(null);
 const [refHero, inViewHero] = useInView({ threshold: 0.01, triggerOnce: true });

  const [refComparison, inViewComparison] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="why-syncura-legacy" className="relative flex flex-col items-center justify-center min-h-screen w-full h-full py-20 px-4 md:px-8 lg:px-16  overflow-hidden">
      <div ref={refHero} className="text-center w-full mb-16">
        <div className="flex justify-center items-center mb-8">
          <motion.div  initial="hidden" animate={inViewHero ? "visible" : "hidden"} className="Welcome-box py-[8px] px-[7px] border border-[#7042f88b] opacity-[0.9] flex items-center">
            <SparklesIcon className="text-[#b49bff] mr-[10px] h-5 w-5" />
            <h1 className="Welcome-text text-[13px] text-white">Why Syncura Legacy</h1>
          </motion.div>
        </div>

        <motion.h2 variants={slideInFromLeft(0.1)} initial="hidden" animate={inViewHero ? "visible" : "hidden"} className="text-3xl md:text-4xl font-bold text-white leading-tight mt-4 mb-4">
          We're the Team Behind the Teams That Scale
        </motion.h2>
        <motion.p variants={slideInFromRight(0.2)} initial="hidden" animate={inViewHero ? "visible" : "hidden"} className="text-base md:text-lg text-gray-300 mt-3 mb-8">
          Syncura Legacy exists to give small businesses access to enterprise-grade backend infrastructure without the overhead.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={inViewHero ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
          transition={{ delay: 0.4, duration: 0.4 }}
          className="relative w-full h-[50vh] md:h-[70vh] lg:h-[80vh] rounded-xl overflow-hidden shadow-2xl border border-[#7042f88b] mt-8 bg-black"
        >
          <video 
            ref={videoRef}
            autoPlay
            muted 
            loop
            playsInline 
            className="w-full h-full object-cover"
          >
            <source src="/videos/3163534-uhd_3840_2160_30fps.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </motion.div>
      </div>

      <div ref={refComparison} className="w-full max-w-6xl mt-10">
        <motion.h3 variants={slideInFromTop} initial="hidden" animate={inViewComparison ? "visible" : "hidden"} className="text-2xl md:text-5xl font-bold text-white text-center mb-14">
          Why Founders Choose Syncura Over VAs, Freelancers, or In House Teams
        </motion.h3>

        <div className="overflow-x-auto">
          <motion.table
            initial="hidden"
            animate={inViewComparison ? "visible" : "hidden"}
            variants={{ visible: { transition: { staggerChildren: 0.1 } }, hidden: {} }}
            className="w-full table-auto border-collapse rounded-xl overflow-hidden text-left min-w-[700px]"
          >
            <thead>
              <tr className="bg-gradient-to-r from-purple-700 to-indigo-700 text-white text-lg font-semibold text-center">
                <motion.th variants={slideInFromLeft(0.2)} className="p-4 border-r border-[#7042f88b] rounded-tl-xl">Feature</motion.th>
                <motion.th variants={slideInFromTop} className="p-4 border-r border-[#7042f88b]">Syncura Legacy</motion.th>
                <motion.th variants={slideInFromTop} className="p-4 border-r border-[#7042f88b]">VA Agencies</motion.th>
                <motion.th variants={slideInFromTop} className="p-4 border-r border-[#7042f88b]">Freelancers</motion.th>
                <motion.th variants={slideInFromRight(0.2)} className="p-4 rounded-tr-xl">In-House Staff</motion.th>
              </tr>
            </thead>
            <tbody>
              {comparisonData.map((row, index) => (
                <motion.tr key={row.feature} variants={slideInFromLeft(0.1 * (index + 1))} className={`text-center border-t border-[#7042f88b] ${index % 2 === 0 ? 'bg-[#1a0f3d]' : 'bg-[#2e1d5a]'}`}>
                  <td className="p-4 text-white font-medium border-r border-[#7042f88b]">{row.feature}</td>
                  <td className="p-4 text-center border-r border-[#7042f88b]">{row.syncura ? <FaCheckCircle className="text-green-400 text-xl mx-auto" /> : <FaTimesCircle className="text-red-400 text-xl mx-auto" />}</td>
                  <td className="p-4 text-center border-r border-[#7042f88b]">{row.vaAgencies ? <FaCheckCircle className="text-green-400 text-xl mx-auto" /> : <FaTimesCircle className="text-red-400 text-xl mx-auto" />}</td>
                  <td className="p-4 text-center border-r border-[#7042f88b]">{row.freelancers ? <FaCheckCircle className="text-green-400 text-xl mx-auto" /> : <FaTimesCircle className="text-red-400 text-xl mx-auto" />}</td>
                  <td className="p-4 text-center">{row.inHouse ? <FaCheckCircle className="text-green-400 text-xl mx-auto" /> : <FaTimesCircle className="text-red-400 text-xl mx-auto" />}</td>
                </motion.tr>
              ))}
            </tbody>
          </motion.table>
        </div>
      </div>
    </section>
  );
};
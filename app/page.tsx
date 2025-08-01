'use client';

import { useState, useEffect } from "react";
import Loader from "@/components/Loader/loader";

import { Hero } from "@/components/main/hero";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { WhatWeDo } from "@/components/sections/Whatwedo";
import { WhySyncuraLegacy } from "@/components/sections/WhySyncuraLegacy";
import { CaseStudies } from "@/components/sections/CaseStudies";
import { PricingPlans } from "@/components/sections/PricingPlans";
import { AboutSyncuraLegacy } from "@/components/sections/AboutSyncuraLegacy";


export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000); // Delay for effect — adjust as needed

    return () => clearTimeout(timer);
  }, []);

  if (loading) return <Loader />;

  return (
    <main className="h-full w-full">
      <div className="flex flex-col gap-20">
        <Hero />
        <WhatWeDo />
        <HowItWorks />
        <WhySyncuraLegacy />
        <CaseStudies />
        <PricingPlans />
        <AboutSyncuraLegacy/>
      </div>
    </main>
  );
}

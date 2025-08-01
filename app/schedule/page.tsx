'use client';

import { useEffect, useState } from "react";
import  CustomCalendly from "../../components/CustomCalendly/CustomCalendly";
import Loader from "@/components/Loader/loader";

const SchedulePage = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay for effect (can be removed or replaced with real check)
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000); // 1 second delay

    return () => clearTimeout(timer);
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="min-h-screen text-gray-200 flex items-center justify-center py-20">
      <CustomCalendly />
    </div>
  );
};

export default SchedulePage;

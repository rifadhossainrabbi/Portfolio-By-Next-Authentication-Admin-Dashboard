'use client';
import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import NavSideBar from '@/components/layout/NavSideBar';
import Loader from '@/components/layout/Loader';
import ClickSpark from '@/components/animations/ClickSpark';
import ParticlesBackground from '@/components/ParticlesBackground';

export default function ClientLayout({ children }) {
  const [isLoading, setIsLoading] = useState(true);

  // লোডিং শেষ হলে এই ফাংশনটি কল হবে
  const handleLoadingFinished = () => {
    console.log('Loading finished, switching to main content...');
    setIsLoading(false);
    // যখন প্রজেক্ট লাইভ করবেন তখন নিচের লাইনটি আনকমেন্ট করতে পারেন
    // sessionStorage.setItem('hasLoaded', 'true');
  };

  return (
    <AnimatePresence mode="wait">
      {isLoading ? (
        <Loader key="loader" onFinished={handleLoadingFinished} />
      ) : (
        <ClickSpark
          key="main-content"
          sparkColor="#22d3ee"
          sparkSize={10}
          sparkRadius={20}
          duration={600}
        >
          <div className="relative min-h-screen w-full bg-[#010714] flex flex-col lg:flex-row">
            <ParticlesBackground />
            <NavSideBar />

            <main className="relative z-10 flex-1 min-h-screen pt-20 lg:pt-0 ml-0 lg:ml-24 xl:ml-28 overflow-x-hidden transition-all duration-300">
              {children}
            </main>
          </div>
        </ClickSpark>
      )}
    </AnimatePresence>
  );
}

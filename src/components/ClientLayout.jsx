'use client';
import React, { useState } from 'react';
import NavSideBar from '@/components/layout/NavSideBar';
import ClickSpark from '@/components/animations/ClickSpark';
// import Loader from '@/components/animations/Loader'; // পাাথ ঠিক করে নিন
import { AnimatePresence } from 'framer-motion';
import Loader from './layout/Loader';

export default function ClientLayout({ children }) {
  // লোডার দেখানোর জন্য স্টেট
  const [isLoading, setIsLoading] = useState(true);

  return (
    <ClickSpark
      key="main-content"
      sparkColor="#22d3ee"
      sparkSize={10}
      sparkRadius={20}
      duration={600}
    >
      <div className="relative min-h-screen w-full bg-[#010714] flex flex-col md:flex-row">
        {/* লোডার ম্যানেজমেন্ট */}
        <AnimatePresence mode="wait">
          {isLoading && (
            <Loader key="site-loader" onFinished={() => setIsLoading(false)} />
          )}
        </AnimatePresence>

        {/* লোডিং শেষ হওয়ার পর মেইন কন্টেন্ট দেখাবে (অথবা প্যারালাল লোড হবে) */}
        {!isLoading && (
          <>
            <NavSideBar />
            <main className="relative z-10 flex-1 min-h-screen pt-16 md:pt-0 ml-0 md:ml-20 lg:ml-28 overflow-x-hidden transition-all duration-300">
              {children}
            </main>
          </>
        )}
      </div>
    </ClickSpark>
  );
}

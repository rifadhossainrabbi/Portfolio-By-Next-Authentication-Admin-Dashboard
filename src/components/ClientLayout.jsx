'use client';
import React from 'react';
import NavSideBar from '@/components/layout/NavSideBar';
import ClickSpark from '@/components/animations/ClickSpark';

export default function ClientLayout({ children }) {
  return (
    <ClickSpark
      key="main-content"
      sparkColor="#22d3ee"
      sparkSize={10}
      sparkRadius={20}
      duration={600}
    >
      <div className="relative min-h-screen w-full bg-[#010714] flex flex-col md:flex-row">
        <NavSideBar />
        <main className="relative z-10 flex-1 min-h-screen pt-16 md:pt-0 ml-0 md:ml-20 lg:ml-28 overflow-x-hidden transition-all duration-300">
          {children}
        </main>
      </div>
    </ClickSpark>
  );
}

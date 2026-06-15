'use client';
import DashboardNavbar from '@/components/dashboard/DashboardNavbar';
import React from 'react';
import { Toaster } from 'react-hot-toast';
import Particles from '@/components/Particales'; // পাথ ঠিক আছে কি না দেখে নিন

export default function DashboardLayout({ children }) {
  return (
    <div className="relative min-h-screen bg-[#010714] flex flex-col lg:flex-row overflow-hidden">
      {/* --- গ্লোবাল পার্টিকেল ব্যাকগ্রাউন্ড (পুরো ড্যাশবোর্ডের জন্য) --- */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Particles
          particleColors={['#0ea5e9', '#22d3ee', '#3b82f6', '#1d4ed8']}
          particleCount={3500}
          particleSpread={18}
          speed={0.5}
          particleBaseSize={200}
          moveParticlesOnHover={true}
          alphaParticles={false}
          disableRotation={true}
        />
      </div>

      {/* টোস্ট কন্টেইনার */}
      <Toaster position="top-center" reverseOrder={false} />

      {/* --- UI লেয়ার (z-10 ব্যবহার করা হয়েছে যাতে পার্টিকেলের উপরে থাকে) --- */}
      <div className="relative z-10 flex flex-col lg:flex-row w-full">
        {/* ড্যাশবোর্ড সাইডবার/ন্যাভবার */}
        <DashboardNavbar />

        <div className="flex-1 flex flex-col overflow-hidden lg:mr-72">
          <main className="flex-1 overflow-y-auto p-6 md:p-10 no-scrollbar">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}

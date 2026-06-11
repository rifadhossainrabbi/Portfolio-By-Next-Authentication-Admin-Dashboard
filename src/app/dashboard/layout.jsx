'use client';
import DashboardNavbar from '@/components/dashboard/DashboardNavbar';
import React from 'react';
import { Toaster } from 'react-hot-toast'; // Toaster ইমপোর্ট করুন

export default function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen bg-[#010714] flex flex-col lg:flex-row overflow-hidden">
      {/* টোস্ট কন্টেইনার */}
      <Toaster position="top-center" reverseOrder={false} />

      <DashboardNavbar />

      <div className="flex-1 flex flex-col overflow-hidden lg:mr-72">
        <main className="flex-1 overflow-y-auto p-6 md:p-10 no-scrollbar">
          {children}
        </main>
      </div>
    </div>
  );
}

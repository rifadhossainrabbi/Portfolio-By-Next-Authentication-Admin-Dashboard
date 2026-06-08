import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import ClientLayout from '@/components/ClientLayout';
// ধাপ ১-এর কম্পোনেন্ট

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

// এখন এখানে metadata একদম ঠিকঠাক কাজ করবে
export const metadata = {
  title: 'Rifad Hossain Rabbi | Portfolio',
  description: 'Digital Creator & Web Developer',
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="bg-[#020617] text-white min-h-full flex overflow-x-hidden selection:bg-blue-500/30">
        {/* ক্লায়েন্ট র‍্যাপারটি এখানে ব্যবহার করা হলো */}
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}

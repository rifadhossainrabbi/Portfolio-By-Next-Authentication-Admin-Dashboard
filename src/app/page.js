import HeroSection from "@/components/HeroSection";

export default function Home() {
  return (
    // আমরা যেহেতু Layout-এ অলরেডি ফ্লেক্স এবং ব্যাকগ্রাউন্ড সেট করেছি,
    // তাই এখানে শুধু HeroSection টি ইমপোর্ট করলেই হবে।
    <>
      <HeroSection />

      {/* ভবিষ্যতে আপনি যদি হোম পেজে আরও সেকশন যোগ করতে চান 
          (যেমন: FeaturedProjects), সেগুলো এই HeroSection এর নিচে একটার পর একটা দিবেন। */}
    </>
  );
}

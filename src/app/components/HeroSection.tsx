'use client'
import React from "react";
import Image from "next/image";
import CurrentDate from "./CurrentDate";

const HeroSection = () => {
  const handleScrollToProducts = () => {
    document
      .getElementById("all-products-area")
      ?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
  };

  return (
    <section className="w-full bg-[#F0F5F0] py-5">
      <div className="container mx-auto px-4">
        <div className="mx-auto flex h-auto max-w-/[1118px] flex-col items-center justify-between gap-6 rounded-xl bg-[#FAFCFA] md:flex-row">
          {/* Left Content */}
          <div className="ml-10 flex-1">
            <div className="badge badge-success badge-soft">
              <CurrentDate className="font-bold text-green-600" />
            </div>

            <h1 className="mt-3 text-2xl font-bold text-gray-900 md:text-4xl">
              আজকের বাজারের দাম এক নজরে
            </h1>

            <p className="mt-4 leading-7 text-gray-600">
              চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম —
              বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং
              দামের পরিবর্তন এক জায়গায়।
            </p>

            <button
              type="button"
              onClick={handleScrollToProducts}
              className="mt-2 rounded-lg bg-[#05893E] px-4 py-2 text-white shadow-md shadow-[#22C55E]"
            >
              সব পণ্য দেখুন
            </button>
          </div>

          {/* Right Image */}
          <div className="shrink-0">
            <Image
              src="/bazar-hero.png"
              alt="আজকের বাজারের পণ্য"
              width={315}
              height={263}
              priority
              className="h-/[263px] w-/[315px] object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

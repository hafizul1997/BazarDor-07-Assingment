
import React from "react";
import CurrentDate from "./CurrentDate";
import Image from "next/image";

const HeroSection = () => {
  return (
    <section className="w-full bg-[#F0F5F0] py-5">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row max-w-[#1118px] h-auto rounded-xl bg-[#FAFCFA]">

          {/* Left Content */}
          <div className="flex-1 ml-10">
            <div className="badge badge-success badge-soft">  
            <CurrentDate  className="text-green-600 font-bold"/>
            </div>
            <h1 className="mt-3 text-2xl font-bold text-gray-900 md:text-4xl">
              আজকের বাজারের দাম এক নজরে
            </h1>

            <p className="mt-4 leading-7 text-gray-600">
              চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম —
              বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং
              দামের পরিবর্তন এক জায়গায়।
            </p>

            <button className="bg-[#05893E] text-white shadow-md shadow-[#22C55E]  px-4 py-2 rounded-lg mt-2">
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


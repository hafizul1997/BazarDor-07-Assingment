'use client'
import Image from "next/image";
import SignInUpButton from "./header-button/SignInUpButton";
import Navlinks from "./Navlinks";
import React, { Suspense } from "react";
import Marque from "./Marque";
import CurrentDate from "./CurrentDate";


const HeaderPage = () => {
  
  return (
    <header className="w-full py-5 bg-[#F0F5F0]">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between gap-3">
          
          {/* Logo + Title + Date */}
          <div className="flex items-center gap-4">
            <div className="flex h-10 w-10 items-center justify-center bg-[#05893e]">
              <Image
                src="/logo.png"
                alt="বাজার দর logo"
                width={30}
                height={30}
              />
            </div>
            <div> 
            <h1 className="text-2xl font-bold">
              বাজার দর
            </h1>
            <div className="text-sm text-gray-600 ">
            <Suspense fallback={<span>তারিখ লোড হচ্ছে...</span>}>
              <CurrentDate />
             </Suspense>
            </div>
           </div>
          </div>
          {/* Sign In / Sign Up */}
          <SignInUpButton />
        </div>
      </div>
        {/* Divider */}
          <div className="mt-5 border-t border-gray-300"></div>
          <div className="container mx-auto">
                <Navlinks />
          </div>
           {/* Divider */}
          <div className="mt-2 border-t border-gray-300"></div>
          <Marque />
    </header>
  );
};

export default HeaderPage;
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SignInUpButton() {
  const pathname = usePathname();

  const isSignIn = pathname === "/sign-in";
  const isSignUp = pathname === "/sign-up" || pathname === "/";

  return (
    <div className="flex gap-3">
      <Link
        href="/sign-in"
        className={`btn rounded-xl px-4 py-2 font-bold transition-all duration-200 ${
          isSignIn
            ? "bg-[#05893E] text-white shadow-md shadow-green-600"
            : "bg-transparent text-gray-700 hover:bg-[#05893E] hover:text-white hover:shadow-md hover:shadow-green-600"
        }`}
      >
        সাইন ইন
      </Link>

      <Link
        href="/sign-up"
        className={`btn rounded-xl px-4 py-2 font-bold transition-all duration-200 ${
          isSignUp
            ? "bg-[#05893E] text-white shadow-md shadow-green-600"
            : "bg-transparent text-gray-700 hover:bg-[#05893E] hover:text-white hover:shadow-md hover:shadow-green-600"
        }`}
      >
        সাইন আপ
      </Link>
    </div>
  );
}
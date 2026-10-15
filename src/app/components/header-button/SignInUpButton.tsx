"use client";

import Link from "next/link";
import { authClient } from "@/lib/auth-client";

export default function SignInUpButton() {
  const { data: session, isPending } = authClient.useSession();

  if (isPending || session?.user) {
    return null;
  }

  return (
    <div className="flex items-center gap-2">
      <Link
        href="/sign-in"
        className="rounded-lg bg-[#05893E] px-3 py-2 text-sm font-semibold text-white transition hover:bg-green-700 sm:px-4"
      >
        সাইন ইন
      </Link>

      <Link
        href="/sign-up"
        className="rounded-lg border border-[#05893E] px-3 py-2 text-sm font-semibold text-[#05893E] transition hover:bg-green-50 sm:px-4"
      >
        সাইন আপ
      </Link>
    </div>
  );
}
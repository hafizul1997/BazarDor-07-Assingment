"use client";

import Link from "next/link";
import { authClient } from "@/lib/auth-client";

export default function SignInUpButton() {
  const { data: session, isPending } = authClient.useSession();

  if (isPending || session?.user) {
    return null;
  }

  return (
    <div className="flex items-center gap-1.5 min-[400px]:gap-2">
  <Link
    href="/sign-in"
    className="shrink-0 rounded-md bg-[#05893E] px-2 py-1.5 text-xs font-semibold text-white transition hover:bg-green-700 min-[400px]:rounded-lg min-[400px]:px-3 min-[400px]:py-2 min-[400px]:text-sm sm:px-4"
  >
    সাইন ইন
  </Link>

  <Link
    href="/sign-up"
    className="shrink-0 rounded-md border border-[#05893E] px-2 py-1.5 text-xs font-semibold text-[#05893E] transition hover:bg-green-50 min-[400px]:rounded-lg min-[400px]:px-3 min-[400px]:py-2 min-[400px]:text-sm sm:px-4"
  >
    সাইন আপ
  </Link>
</div>
  );
}
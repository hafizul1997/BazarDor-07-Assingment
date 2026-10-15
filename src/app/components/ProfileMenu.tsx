"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronDown, LogOut, UserRound } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import Image from "next/image";
export default function ProfileMenu() {
  const { data: session, isPending } = authClient.useSession();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const user = session?.user;

  useEffect(() => {
    function handleOutsideClick(event: MouseEvent) {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  if (isPending || !user) {
    return null;
  }

  async function handleLogout() {
    await authClient.signOut();
    setOpen(false);
    router.replace("/");
    router.refresh();
  }

  const image = user.image;
  const initial = user.name?.trim()?.charAt(0)?.toUpperCase() || "U";

  return (
    <div className="relative" ref={menuRef}>
      <button
        type="button"
        onClick={() => setOpen((previous) => !previous)}
        aria-expanded={open}
        aria-label="Open profile menu"
        className="flex items-center gap-2 rounded-full border border-gray-200 bg-white p-1.5 pr-3 transition hover:bg-green-50"
      >
        {image ? (
          <Image
  src={image}
  alt={user.name || "User"}
  width={36}
  height={36}
  className="h-9 w-9 rounded-full object-cover"
/>
        ) : (
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#05893E] font-bold text-white">
            {initial}
          </span>
        )}

        <span className="hidden max-w-28 truncate text-sm font-semibold sm:block">
          {user.name}
        </span>

        <ChevronDown size={16} />
      </button>

      {open && (
        <div className="absolute right-0 z-50 mt-2 w-56 rounded-xl border border-gray-100 bg-white p-2 shadow-lg">
          <div className="border-b border-gray-100 px-3 py-2">
            <p className="truncate text-sm font-semibold text-gray-900">
              {user.name}
            </p>
            <p className="truncate text-xs text-gray-500">
              {user.email}
            </p>
          </div>

          <Link
            href="/profile"
            onClick={() => setOpen(false)}
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-gray-700 hover:bg-green-50 hover:text-[#05893E]"
          >
            <UserRound size={17} />
            আমার প্রোফাইল
          </Link>

          <button
            type="button"
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm text-red-600 hover:bg-red-50"
          >
            <LogOut size={17} />
            লগআউট
          </button>
        </div>
      )}
    </div>
  );
}
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

interface Category {
  id: string;
  slug: string;
  nameBn: string;
  icon: string;
}

interface CategoryLinksProps {
  categories: Category[];
}

// Different color for each category
const categoryColors: Record<string, string> = {
  chal: "#F59E0B",       // 🟡 চাল
  dal: "#EF4444",        // 🔴 ডাল
  tel: "#EAB308",        // 🟡 তেল
  alu: "#A855F7",        // 🟣 আলু
  peyaj: "#EC4899",      // 🩷 পেঁয়াজ
  roshun: "#6366F1",     // 🔵 রসুন
  mach: "#0EA5E9",       // 🔵 মাছ
  mangsho: "#DC2626",    // 🔴 মাংস
  dim: "#F97316",        // 🟠 ডিম
  sobji: "#16A34A",      // 🟢 সবজি
};

const CategoryLinks = ({ categories }: CategoryLinksProps) => {
  const pathname = usePathname();

  return (
    <nav className="flex gap-10 ml-10 py-5 font-bold">
      {categories.map((category) => {
        const isActive = pathname === `/category/${category.slug}`;

        const color =
          categoryColors[category.slug] || "#05893E";

        return (
          <Link
            key={category.id}
            href={`/category/${category.slug}`}
            style={
              {
                "--category-color": color,
              } as React.CSSProperties
            }
            className={`
              group flex items-center gap-1
              border-b-2 border-transparent
              pb-1
              transition-all duration-200

              hover:text-[var(--category-color)]
              hover:border-[var(--category-color)]

              ${
                isActive
                  ? "text-[var(--category-color)] border-[var(--category-color)]"
                  : "text-gray-700"
              }
            `}
          >
            <span>{category.icon}</span>

            <span>{category.nameBn}</span>
          </Link>
        );
      })}
    </nav>
  );
};

export default CategoryLinks;
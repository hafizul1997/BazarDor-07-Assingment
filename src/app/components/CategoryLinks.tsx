
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface Category {
  id: string;
  slug: string;
  nameBn: string;
  icon: string;
}

interface CategoryLinksProps {
  categories: Category[];
}

const CategoryLinks = ({ categories }: CategoryLinksProps) => {
  const pathname = usePathname();

  return (
    <nav className="w-full px-2 py-3 sm:px-4 sm:py-4 lg:py-5">
      <div className="flex w-full flex-wrap items-center gap-2 sm:gap-3 lg:ml-6">
        {categories.map((category) => {
          const isActive =
            pathname === `/category/${category.slug}`;

          return (
            <Link
              key={category.id}
              href={`/category/${category.slug}`}
              className={`
                inline-flex shrink-0 items-center justify-center gap-1.5
                rounded-lg border border-transparent
                px-2.5 py-2
                text-xs font-bold
                transition-colors duration-200
                min-[375px]:px-3 min-[375px]:text-sm
                sm:gap-2 sm:px-4 sm:py-2.5
                sm:text-sm
                lg:text-base
                ${
                  isActive
                    ? "bg-[#05893E] text-white"
                    : "bg-transparent text-gray-700 hover:bg-[#05893E] hover:text-white"
                }
              `}
            >
              <span className="text-sm sm:text-base">
                {category.icon}
              </span>

              <span>{category.nameBn}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default CategoryLinks;
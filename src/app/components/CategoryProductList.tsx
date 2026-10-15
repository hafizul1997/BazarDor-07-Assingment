
"use client";

import type { Product } from "@/types/product";
import { useMemo, useState } from "react";
import ProductCard from "@/app/components/ProductCard";

interface Props {
  products: Product[];
}

export default function CategoryProductList({ products }: Props) {
  const [sortBy, setSortBy] = useState("default");

  const sortedProducts = useMemo(() => {
    const result = Array.isArray(products) ? [...products] : [];

    if (sortBy === "low") {
      result.sort((a, b) => a.today - b.today);
    } else if (sortBy === "high") {
      result.sort((a, b) => b.today - a.today);
    } else if (sortBy === "name") {
      result.sort((a, b) =>
        a.nameBn.localeCompare(b.nameBn, "bn")
      );
    }

    return result;
  }, [products, sortBy]);

  return (
    <div className="w-full">
      {/* Sorting Section */}
      <div className="mb-5 w-full rounded-xl border border-gray-200 bg-white p-4">
        <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-gray-500">
            মোট{" "}
            <span className="font-semibold text-gray-900">
              {sortedProducts.length}
            </span>{" "}
            টি পণ্য
          </p>

          {/* Sorting Dropdown */}
          <div className="flex w-full items-center justify-between gap-3 sm:w-auto sm:justify-end">
            <label
              htmlFor="product-sort"
              className="shrink-0 text-sm text-gray-600"
            >
              সাজান:
            </label>

            <select
              id="product-sort"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full cursor-pointer rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-gray-700 outline-none focus:border-green-600 sm:w-56"
            >
              <option value="default">ডিফল্ট</option>
              <option value="low">দাম: কম থেকে বেশি</option>
              <option value="high">দাম: বেশি থেকে কম</option>
              <option value="name">নাম অনুযায়ী</option>
            </select>
          </div>
        </div>
      </div>

      {/* Product Card Grid */}
      {sortedProducts.length > 0 ? (
        <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {sortedProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>
      ) : (
        <div className="w-full rounded-xl border border-gray-200 bg-white px-4 py-12 text-center">
          <p className="text-4xl">🛒</p>

          <p className="mt-3 font-medium text-gray-700">
            এই ক্যাটাগরিতে কোনো পণ্য পাওয়া যায়নি।
          </p>
        </div>
      )}
    </div>
  );
}


import React from "react";
import type { Product } from "../page";
import Link from "next/link";
interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const isUp = product.today > product.yesterday;
  const isDown = product.today < product.yesterday;

  const percentage =
    product.yesterday > 0
      ? (Math.abs(product.today - product.yesterday) /
          product.yesterday) *
        100
      : 0;

  const arrow = isUp ? "▲" : isDown ? "▼" : "—";

  const color = isUp
    ? "text-red-600"
    : isDown
      ? "text-green-600"
      : "text-gray-500";

  const bgColor = isUp
    ? "bg-red-50"
    : isDown
      ? "bg-green-50"
      : "bg-gray-100";

  return (
    <Link
  href={`/product/${product.id}`}
  className="text-green-700 hover:underline"
>   
    <article
      className={`rounded-xl border border-gray-200 bg-white p-3 shadow-sm transition-all duration-200 hover:shadow-md ${
        isUp
          ? "hover:border-red-200"
          : isDown
            ? "hover:border-green-200"
            : "hover:border-gray-300"
      }`}
    >
      {/* Card Header */}
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-gray-50 text-2xl">
          {product.categoryIcon || product.image || "🛒"}
        </div>

        <div className="min-w-0 flex-1">
          <h3 className="truncate text-base font-bold text-gray-800">
            {product.nameBn}
          </h3>

          <p className="mt-0.5 text-xs text-gray-500">
            প্রতি {product.unit || "কেজি"}
          </p>
        </div>
      </div>

      {/* Today's Price + Dynamic Indicator */}
      <div className="mt-4 flex items-center justify-between gap-2">
        <div>
          <p className="text-xs text-gray-500">
            আজকের দাম
          </p>

          <p className="mt-1 text-xl font-extrabold text-gray-900">
            ৳{product.today.toLocaleString("en-US")}
          </p>
        </div>

        <div
          className={`flex shrink-0 items-center gap-1 rounded-md px-2 py-1.5 ${bgColor} ${color}`}
        >
          <span className="text-sm font-bold">
            {arrow}
          </span>

          <span className="text-xs font-bold">
            {percentage.toFixed(1)}%
          </span>
        </div>
      </div>
    </article>
    </Link>
  );
};

export default ProductCard;
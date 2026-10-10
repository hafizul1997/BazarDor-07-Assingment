
import React from "react";

interface Product {
  id: number;
  nameBn: string;
  categoryIcon?: string;
  image?: string;
  unit: string;
  today: number;
  yesterday: number;
  change: {
    dir: "up" | "down" | "same";
    pct: number;
  };
}

const PriceUp = async () => {
  const res = await fetch(
    "https://api.abcz.workers.dev/api/bazardor/products",
    {
      next: { revalidate: 300 },
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  const data: Product[] = await res.json();

  const increased = data.filter(
    (product) => product.today > product.yesterday
  );

  return (
    <section className="container mx-auto px-4 py-6">
      {/* Section Header */}
      <div className="mb-5 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-50 text-red-600">
          <span className="text-sm font-bold">▲</span>
        </div>

        <div>
          <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">
            আজকের দাম বেড়েছে
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            যেসব পণ্যের দাম বেড়েছে
          </p>
        </div>
      </div>

      {/* Product Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {increased.map((product) => {
          const percentage =
            product.yesterday > 0
              ? ((product.today - product.yesterday) /
                  product.yesterday) *
                100
              : 0;

          return (
            <article
              key={product.id}
              className="rounded-xl border border-gray-200 bg-white p-3 shadow-sm transition-all duration-200 hover:border-red-200 hover:shadow-md"
            >
              {/* Card Header: Icon + Name + Unit */}
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-gray-50 text-2xl">
                  {product.categoryIcon || "🛒"}
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

              {/* Card Body: Today's Price + Increase */}
              <div className="mt-4 flex items-center justify-between gap-2">
                <div>
                  <p className="text-xs text-gray-500">
                    আজকের দাম
                  </p>

                  <p className="mt-1 text-xl font-extrabold text-gray-900">
                    ৳{product.today.toLocaleString("en-US")}
                  </p>
                </div>

                {/* Small Red Up-Right Arrow + Percentage */}
                <div className="flex shrink-0 items-center gap-1 rounded-md bg-red-50 px-2 py-1.5 text-red-600">
                      <span className="text-sm font-bold">▲</span>
                  <span className="text-xs font-bold">
                    {percentage.toFixed(1)}%
                  </span>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {/* Empty State */}
      {increased.length === 0 && (
        <p className="py-8 text-center text-sm text-gray-500">
          বর্তমানে দাম বেড়েছে এমন কোনো পণ্য নেই।
        </p>
      )}
    </section>
  );
};

export default PriceUp;
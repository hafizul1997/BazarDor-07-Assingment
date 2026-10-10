
"use client";

import { useMemo, useState } from "react";

interface Market {
  market: string;
  division: string;
  min: number;
  max: number;
}

interface Props {
  markets: Market[];
  unit: string;
}

export default function MarketPrices({ markets, unit }: Props) {
  const [selectedDivision, setSelectedDivision] = useState("all");
  const [search, setSearch] = useState("");

  const divisions = useMemo(
    () => [...new Set(markets.map((market) => market.division))],
    [markets]
  );

  const filteredMarkets = useMemo(() => {
    return markets.filter((market) => {
      const matchesDivision =
        selectedDivision === "all" ||
        market.division === selectedDivision;

      const matchesSearch = market.market
        .toLowerCase()
        .includes(search.toLowerCase());

      return matchesDivision && matchesSearch;
    });
  }, [markets, selectedDivision, search]);

  const formatPrice = (price: number) =>
    `৳${price.toLocaleString("bn-BD")}`;

  return (
    <section className="mt-6 w-full overflow-hidden rounded-2xl border border-gray-200 bg-white">
      <div className="border-b border-gray-200 p-4 sm:p-6">
        <h2 className="text-xl font-bold text-gray-900">
          বাজার অনুযায়ী দাম
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          বাজার নির্বাচন করে সর্বনিম্ন ও সর্বোচ্চ দাম দেখুন
        </p>

        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
          <select
            value={selectedDivision}
            onChange={(e) => setSelectedDivision(e.target.value)}
            className="w-full rounded-lg border border-gray-200 bg-white px-3 py-3 text-sm outline-none focus:border-green-600"
            aria-label="বিভাগ নির্বাচন করুন"
          >
            <option value="all">সকল বিভাগ</option>
            {divisions.map((division) => (
              <option key={division} value={division}>
                {division}
              </option>
            ))}
          </select>

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="বাজারের নাম লিখুন..."
            className="w-full rounded-lg border border-gray-200 px-3 py-3 text-sm outline-none focus:border-green-600"
          />
        </div>
      </div>

      <div className="p-4">
        <p className="mb-3 text-sm text-gray-500">
          পাওয়া গেছে {filteredMarkets.length}টি বাজার
        </p>

        {filteredMarkets.length > 0 ? (
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
            {filteredMarkets.map((market) => (
              <article
                key={`${market.market}-${market.division}`}
                className="rounded-xl border border-gray-200 p-4 transition hover:border-green-300"
              >
                <h3 className="font-bold text-gray-900">
                  {market.market}
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                  {market.division}
                </p>

                <div className="mt-4 grid grid-cols-2 gap-3">
                  <div className="rounded-lg bg-green-50 p-3">
                    <p className="text-xs text-gray-500">
                      সর্বনিম্ন দাম
                    </p>
                    <p className="mt-1 font-bold text-green-700">
                      {formatPrice(market.min)}
                    </p>
                  </div>

                  <div className="rounded-lg bg-red-50 p-3">
                    <p className="text-xs text-gray-500">
                      সর্বোচ্চ দাম
                    </p>
                    <p className="mt-1 font-bold text-red-600">
                      {formatPrice(market.max)}
                    </p>
                  </div>
                </div>

                <p className="mt-3 text-xs text-gray-500">
                  প্রতি {unit} · পার্থক্য{" "}
                  {formatPrice(market.max - market.min)}
                </p>
              </article>
            ))}
          </div>
        ) : (
          <p className="py-10 text-center text-sm text-gray-500">
            কোনো বাজার পাওয়া যায়নি।
          </p>
        )}
      </div>
    </section>
  );
}

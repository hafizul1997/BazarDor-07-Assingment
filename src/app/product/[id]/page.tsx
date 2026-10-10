
import { notFound } from "next/navigation";
import PriceCard from "@/app/components/PriceCard";
import MarketTable from "@/app/components/MarketTable";

interface MarketItem {
  market: string;
  division: string;
  min: number;
  max: number;
}

interface ProductData {
  id: number;
  nameBn: string;
  categoryNameBn: string;
  categoryIcon: string;
  image: string;
  unit: string;
  today: number;
  yesterday: number;
  lastWeek: number;
  lastMonth: number;
  change: {
    dir: "up" | "down" | "same";
    pct: number;
  };
  markets: MarketItem[];
}

interface Props {
  params: Promise<{ id: string }>;
}

function formatPrice(price: number) {
  return `৳${price.toLocaleString("bn-BD")}`;
}

export default async function ProductPage({ params }: Props) {
  const { id } = await params;

  const res = await fetch(
    `https://openapi.programming-hero.com/api/bazardor/products/${id}`,
    { cache: "no-store" }
  );

  if (!res.ok) notFound();

  const json = await res.json();
  const data: ProductData = json.data ?? json;

  if (!data || !data.nameBn) notFound();

  const markets = Array.isArray(data.markets) ? data.markets : [];

  const difference = data.today - data.yesterday;

  const percentage =
    data.yesterday > 0
      ? (difference / data.yesterday) * 100
      : 0;

  const lowest = markets.length
    ? Math.min(...markets.map((market) => market.min))
    : 0;

  const highest = markets.length
    ? Math.max(...markets.map((market) => market.max))
    : 0;

  const average =
    markets.length > 0
      ? markets.reduce(
          (sum, market) => sum + (market.min + market.max) / 2,
          0
        ) / markets.length
      : 0;

  const isUp = difference > 0;
  const isDown = difference < 0;

  // Convert API market data to the shape expected by MarketTable.
  const marketList = markets.map((market) => ({
    market_name: market.market,
    division: market.division,
    lowest_price: market.min,
    highest_price: market.max,
    average_price: (market.min + market.max) / 2,
  }));

  return (
    <main className="min-h-screen w-full bg-gray-50 px-4 py-6 sm:px-6 lg:px-8">
      {/* Product Header */}
     {/* Product Header + Price Comparison */}
<section className="w-full rounded-2xl border border-gray-200 bg-white p-4 sm:p-6">
  <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

    {/* Left: Product Image and Details */}
    <div className="flex min-w-0 items-center gap-3 sm:gap-4">
      <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-xl bg-gray-100 text-4xl sm:h-24 sm:w-24 sm:text-5xl">
        {data.image || data.categoryIcon || "🛒"}
      </div>

      <div className="min-w-0">
        <p className="text-sm text-green-700">
          {data.categoryIcon} {data.categoryNameBn}
        </p>

        <h1 className="mt-1 text-xl font-bold text-gray-900 sm:text-2xl">
          {data.nameBn}
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          প্রতি {data.unit}
        </p>

        {/* Today's Price Change — same product card */}
        <div
          className={`mt-3 flex flex-wrap items-center gap-1.5 text-sm font-semibold sm:text-base ${
            isUp
              ? "text-red-600"
              : isDown
                ? "text-green-600"
                : "text-gray-500"
          }`}
        >
          <span>
            {isUp ? "↑" : isDown ? "↓" : "—"}
          </span>

          <span>
            {isUp
              ? `আজ দাম বেড়েছে ${formatPrice(Math.abs(difference))}`
              : isDown
                ? `আজ দাম কমেছে ${formatPrice(Math.abs(difference))}`
                : "আজ দামের পরিবর্তন নেই"}
          </span>
        </div>
      </div>
    </div>

    {/* Right: Today's Price and Percentage */}
    <div className="shrink-0 border-t border-gray-100 pt-4 text-left sm:border-l sm:border-t-0 sm:pl-6 sm:pt-0 sm:text-right">
      <p className="text-sm text-gray-500">
        আজকের দাম
      </p>

      <p className="mt-1 text-2xl font-bold text-gray-900 sm:text-3xl">
        {formatPrice(data.today)}
      </p>

      <p className="mt-1 text-sm text-gray-500">
        প্রতি {data.unit}
      </p>

      <span
        className={`mt-2 inline-flex items-center rounded-full px-3 py-1 text-sm font-semibold ${
          isUp
            ? "bg-red-50 text-red-600"
            : isDown
              ? "bg-green-50 text-green-700"
              : "bg-gray-100 text-gray-600"
        }`}
      >
        {isUp ? "↑" : isDown ? "↓" : "—"}{" "}
        {Math.abs(percentage).toFixed(2)}%
      </span>
    </div>

  </div>
</section>

      
{/* Price Summary */}

<section className="mt-6">
  <h2 className="mb-3 text-xl font-bold text-gray-900">
    দামের সারসংক্ষেপ
  </h2>

  <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">

    {/* Lowest Price - Green Price */}
    <div className="rounded-xl border border-gray-200 bg-white p-4">
      <p className="text-sm font-medium text-gray-700">
        সর্বনিম্ন দাম
      </p>

      <p className="mt-2 text-2xl font-bold text-green-600">
        {formatPrice(lowest)}
      </p>

      <p className="mt-3 text-sm text-gray-700">
        সবচেয়ে কম দামের বাজার:{" "}
        {markets.length
          ? markets.reduce((a, b) => a.min <= b.min ? a : b).market
          : "তথ্য পাওয়া যায়নি"}
      </p>
    </div>

    {/* Highest Price - Red Price */}
    <div className="rounded-xl border border-gray-200 bg-white p-4">
      <p className="text-sm font-medium text-gray-700">
        সর্বাধিক দাম
      </p>

      <p className="mt-2 text-2xl font-bold text-red-600">
        {formatPrice(highest)}
      </p>

      <p className="mt-3 text-sm text-gray-700">
        সবচেয়ে বেশি দামের বাজার:{" "}
        {markets.length
          ? markets.reduce((a, b) => a.max >= b.max ? a : b).market
          : "তথ্য পাওয়া যায়নি"}
      </p>
    </div>

    {/* Average Price - Green Price */}
    <div className="rounded-xl border border-gray-200 bg-white p-4">
      <p className="text-sm font-medium text-gray-700">
        গড় দাম
      </p>

      <p className="mt-2 text-2xl font-bold text-green-600">
        {formatPrice(Math.round(average))}
      </p>

      <p className="mt-3 text-sm text-gray-700">
        সব বাজারের দামের গড়
      </p>
    </div>

  </div>
</section>

      {/* Market Selection and Details */}
      <section className="mt-6 w-full rounded-2xl border border-gray-200 bg-white p-4 sm:p-6">
        <h2 className="mb-2 text-xl font-bold text-gray-900">
          বাজার অনুযায়ী দাম
        </h2>

        <p className="mb-5 text-sm text-gray-500">
          প্রতিটি বাজারের সর্বনিম্ন ও সর্বোচ্চ দাম তুলনা করুন।
        </p>

        <MarketTable markets={marketList} />
      </section>
    </main>
  );
}

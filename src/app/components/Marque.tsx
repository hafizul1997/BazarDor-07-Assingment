
interface Product {
  id: number;
  slug: string;
  nameBn: string;
  categoryIcon: string;
  unit: string;
  today: number;
  yesterday: number;
  change: {
    dir: "up" | "down" | "same";
    pct: number;
  };
}

const Marque = async () => {
  const res = await fetch(
    "https://api.abcz.workers.dev/api/bazardor/products",
    { next: { revalidate: 300 } }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  const data: Product[] = await res.json();

  const products = data.filter(
    (p) => p.today !== p.yesterday
  );

  if (products.length === 0) {
    return null;
  }

  return (
    <section className="overflow-hidden border-y border-gray-100 bg-white py-1">
      <div className="flex w-max animate-marquee items-center">
        {[...products, ...products].map((p, index) => {
          const isUp = p.today > p.yesterday;

          return (
            <div
              key={`${p.id}-${index}`}
              className="flex shrink-0 items-center gap-1.5 border-r border-gray-100 bg-white px-3 py-1"
            >
              <span className="text-base">
                {p.categoryIcon}
              </span>

              <span className="text-xs font-medium text-gray-700">
                {p.nameBn}
              </span>

              <span className="text-sm font-bold text-gray-900">
                ৳{p.today}
              </span>

              <span className="text-[10px] text-gray-400">
                /{p.unit}
              </span>

              <span
                className={`flex items-center gap-0.5 rounded px-1 py-0.5 text-[10px] font-semibold ${
                  isUp
                    ? "bg-red-50 text-red-500"
                    : "bg-green-50 text-green-600"
                }`}
              >
                {isUp ? "▲ +" : "▼ -"}
                {Math.abs(p.change.pct)}%
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Marque;


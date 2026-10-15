import { Suspense } from "react";
import CategoryProductList from "@/app/components/CategoryProductList";

interface Category {
  id: string | number;
  slug: string;
  nameBn: string;
  icon: string;
}

interface Product {
  id: string | number;
  slug: string;
  nameBn: string;
  categoryNameBn?: string;
  categoryIcon?: string;
  categorySlug?: string;
  categoryId?: string | number;
  unit: string;
  image: string;
  today: number;
  yesterday: number;
  lastWeek: number;
  lastMonth: number;
  change: {
    dir: "up" | "down" | "same";
    pct: number;
  };
}

interface PageProps {
  params: Promise<{ CategoryId: string }>;
}

async function getCategories(): Promise<Category[]> {
  const res = await fetch(
    "https://api.abcz.workers.dev/api/bazardor/categories",
    { next: { revalidate: 300 } }
  );

  if (!res.ok) {
    throw new Error("ক্যাটাগরি লোড করা যায়নি");
  }

  const data = await res.json();

  return Array.isArray(data)
    ? data
    : Array.isArray(data?.data)
      ? data.data
      : [];
}

async function getProducts(): Promise<Product[]> {
  const res = await fetch(
    "https://api.abcz.workers.dev/api/bazardor/products",
    { next: { revalidate: 300 } }
  );

  if (!res.ok) {
    throw new Error("পণ্য লোড করা যায়নি");
  }

  const data = await res.json();

  return Array.isArray(data)
    ? data
    : Array.isArray(data?.data)
      ? data.data
      : [];
}

export default function CategoryPage({ params }: PageProps) {
  return (
    <Suspense
      fallback={
        <main className="w-full px-4 py-8 sm:px-6 lg:px-8">
          <p className="text-gray-600">ক্যাটাগরি লোড হচ্ছে...</p>
        </main>
      }
    >
      <CategoryPageContent params={params} />
    </Suspense>
  );
}

async function CategoryPageContent({ params }: PageProps) {
  const { CategoryId } = await params;

  const [categories, products] = await Promise.all([
    getCategories(),
    getProducts(),
  ]);

  const category = categories.find(
    (item) =>
      item.slug.toLowerCase() === CategoryId.toLowerCase() ||
      String(item.id) === CategoryId
  );

  if (!category) {
    return (
      <main className="w-full px-4 py-8 sm:px-6 lg:px-8">
        <h1 className="text-xl font-bold text-gray-800">
          ক্যাটাগরি পাওয়া যায়নি
        </h1>
      </main>
    );
  }

  const categoryProducts = products.filter((product) => {
    const matchesSlug =
      product.categorySlug?.toLowerCase() ===
      category.slug.toLowerCase();

    const matchesId =
      product.categoryId !== undefined &&
      String(product.categoryId) === String(category.id);

    const matchesName =
      product.categoryNameBn === category.nameBn;

    return matchesSlug || matchesId || matchesName;
  });

  return (
    <main className="min-h-screen w-full px-4 py-6 sm:px-6 lg:px-8">
      <section className="w-full rounded-xl border border-gray-200 bg-white p-4 sm:p-5">
        <div className="flex items-center gap-4">
          <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-xl bg-gray-100 text-4xl sm:h-24 sm:w-24 sm:text-5xl">
            {category.icon || "🛒"}
          </div>

          <div>
            <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
              {category.nameBn}
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              মোট {categoryProducts.length} টি পণ্যের দাম ও পরিবর্তন
            </p>
          </div>
        </div>
      </section>

      <section className="mt-6 w-full">
        <CategoryProductList products={categoryProducts} />
      </section>
    </main>
  );
}
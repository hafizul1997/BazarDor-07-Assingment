import HeroSection from "./components/HeroSection";
import PriceUp from "./components/Priceup";
import PriceDown from "./components/PriceDown";
import AllProducts from "./components/AllProducts";
import type { Product } from "@/types/product";

const HomePage = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/bazardor/products",
    { next: { revalidate: 300 } }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  const products: Product[] = await res.json();

  const increased = products.filter(
    (product) => product.today > product.yesterday
  );

  const decreased = products.filter(
    (product) => product.today < product.yesterday
  );

  return (
    <main className="bg-[#F0F5F0]">
      <HeroSection />
      <PriceUp products={increased} />
      <PriceDown products={decreased} />
      <AllProducts products={products} />
      <hr className="border-t border-gray-200" />
    </main>
  );
};

export default HomePage;

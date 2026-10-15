import type { Product } from "@/types/product";
import ProductCard from "./ProductCard";

interface Props {
  products: Product[];
}

const PriceDown = ({ products }: Props) => {
  return (
    <section className="mx-auto container px-4 py-8">
      <h2 className="mb-5 text-2xl font-bold text-gray-900">
  <span className="text-green-600">▼</span> আজ দাম কমেছে
</h2>

      {products.length === 0 ? (
        <p className="text-gray-500">দাম কমেছে এমন কোনো পণ্য নেই।</p>
      ) : (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
};

export default PriceDown;
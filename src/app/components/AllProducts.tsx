import type { Product } from "../page";
import ProductCard from "./ProductCard";

interface Props {
  products: Product[];
}

const AllProducts = ({ products }: Props) => {
  return (
    <section className="mx-auto container px-4 py-8 pb-20">
      <h2 className="mb-5 text-2xl font-bold text-gray-900">
        সব পণ্য
      </h2>
        <p className="mb-5 text-sm text-gray-500">
     মোট {products.length} টি পণ্য দেখানো হচ্ছে
</p>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default AllProducts;
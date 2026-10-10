import React from "react";
import CategoryLinks from "./CategoryLinks";

interface Category {
  id: string;
  slug: string;
  nameBn: string;
  icon: string;
}

const Navlinks = async () => {
  const res = await fetch(
    "https://api.abcz.workers.dev/api/bazardor/categories"
  );

  const data: Category[] = await res.json();

  return <CategoryLinks categories={data} />;
};

export default Navlinks;
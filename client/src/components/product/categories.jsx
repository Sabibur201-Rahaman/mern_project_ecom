import React from "react";
import ProductStore from "../../store/ProductStore";
import CategoriesSkeleton from "./../../skeleton/CategoriesSkeleton";
function Categories() {
    const { ListByCategory } = ProductStore();

  if (ListByCategory === null) {
    return <CategoriesSkeleton />;
  } else {
    return <div>categories</div>;
  }
}

export default Categories;

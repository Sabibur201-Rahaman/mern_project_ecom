import React, { useEffect } from "react";
import ProductStore from "../store/ProductStore";
import { useParams } from "react-router-dom";
import LayOut from './../components/layout/LayOut';
import ProductList from "../components/product/ProductList";

function ProductByCategory() {
  const { ListByCategoryRequest } = ProductStore();
  const { id } = useParams();
  useEffect(() => {
    (async () => {
      await ListByCategoryRequest(id);
    })();
  }, []);
  return (
    <LayOut>
      <ProductList/>
    </LayOut>
  );
}

export default ProductByCategory;

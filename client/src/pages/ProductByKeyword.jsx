import React, { useEffect } from "react";
import ProductStore from "../store/ProductStore";
import { useParams } from "react-router-dom";
import LayOut from './../components/layout/LayOut';
import ProductList from "../components/product/ProductList";

function ProductByKeyword() {
  const { ListByKeyWordRequest } = ProductStore();
  const { keyword } = useParams();
  useEffect(() => {
    (async () => {
      await ListByKeyWordRequest(keyword);
    })();
  }, [keyword]);
  return (
    <LayOut>
      <ProductList />
    </LayOut>
  );
}

export default ProductByKeyword;

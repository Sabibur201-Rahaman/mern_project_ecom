import React, { useEffect } from "react";
import LayOut from "../components/layout/LayOut";
import Brands from "../components/product/brands";
import ProductStore from "../store/ProductStore";
import { useParams } from "react-router-dom";
import Details from "../components/product/Details";

function ProductDetails() {
    const {id}=useParams()
  const {BrandList,DetailListRequest, ReviewListRequest, BrandListRequest } =
    ProductStore();
  useEffect(() => {
    (async () => {
      await DetailListRequest(id);
      await ReviewListRequest(id);
     BrandList===null?await BrandListRequest():null
    })();
  }, []);
  return (
    <LayOut>
      <Details/>
      <Brands />
    </LayOut>
  );
}

export default ProductDetails;

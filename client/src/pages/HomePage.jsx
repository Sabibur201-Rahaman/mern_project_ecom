import React, { useEffect } from 'react'
import ProductStore from '../store/ProductStore'
import FeatureStore from '../store/FeatureStore'
import Brands from '../components/product/brands'
import Categories from '../components/product/categories'
import Products from '../components/product/products'
import Slider from '../components/product/slider'
import Feature from '../components/feature/feature'
import LayOut from '../components/layout/LayOut'
function HomePage() {
  const {BrandListRequest,SliderListRequest,CategoryListRequest,ListByRemarkRequest} = ProductStore()
  const {FeatureListRequest}=FeatureStore()


   useEffect(() => {
   (async () => {
    await SliderListRequest()
    await FeatureListRequest()
    await CategoryListRequest()
    await ListByRemarkRequest("new")
     await BrandListRequest()
     
  })()
  }, [])
  
  return (
    <LayOut>
      {/* <p>{JSON.stringify(BrandList)}</p> */}
      <Slider/>
      <Feature/>
      <Categories/>
      <Products/>
      <Brands/>
      </LayOut>
    
  )
}

export default HomePage

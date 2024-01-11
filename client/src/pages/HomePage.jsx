import React from 'react'
import ProductStore from '../store/ProductStore'
import AppNavBar from '../components/layout/AppNavbar';
import Footer from '../components/layout/Footer';
import SliderSkeleton from '../skeleton/SliderSkeleton';
import LayOut from '../components/layout/LayOut';
import FeaturesSkeleton from '../skeleton/FeaturesSkeleton';
import CategoriesSkeleton from '../skeleton/CategoriesSkeleton';
import ProductsSkeleton from '../skeleton/ProductsSkeleton';
function HomePage() {
  const { BrandList, BrandListRequest } = ProductStore()
  // const { BrandList = [], BrandListRequest = () => {} } = productStore() || {}

  // useEffect(() => {
  //   (async () => {
      // await BrandListRequest()
  //   })()
  // }, [])
  
  return (
    <LayOut>
      {/* <p>{JSON.stringify(BrandList)}</p> */}
      
      <AppNavBar/>
      <SliderSkeleton/>
      <FeaturesSkeleton/>
      <CategoriesSkeleton/>
      <ProductsSkeleton/>
      <Footer/>
      </LayOut>
    
  )
}

export default HomePage

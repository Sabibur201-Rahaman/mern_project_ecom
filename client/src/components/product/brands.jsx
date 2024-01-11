import React from 'react'
import ProductStore from '../../store/ProductStore'
import BrandsSkeleton from '../../skeleton/BrandsSkeleton'
export default function Brands() {
    const {BrandList}=ProductStore()

    if (!BrandList) {
        return <BrandsSkeleton />;
      } else {
        return <div>Brands</div>;
      }
      
  
}

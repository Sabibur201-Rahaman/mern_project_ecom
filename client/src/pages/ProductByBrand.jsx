import React, { useEffect } from 'react'
import ProductStore from '../store/ProductStore'
import { useParams } from 'react-router-dom'
import LayOut from './../components/layout/LayOut';
import ProductList from '../components/product/ProductList';

function ProductByBrand() {
    const{ListByBrandRequest}=ProductStore()
    const {id}=useParams()
    useEffect(()=>{
        (async()=>{
            await ListByBrandRequest(id)
        })()
    },[])
  return (
    <LayOut>
      <ProductList/>
    </LayOut>
  )
}

export default ProductByBrand

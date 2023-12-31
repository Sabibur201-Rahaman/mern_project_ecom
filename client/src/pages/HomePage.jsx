import React, { useEffect } from 'react'
import ProductStore from '../store/ProductStore'

function HomePage() {
  const { BrandList, BrandListRequest } = ProductStore()
  // const { BrandList = [], BrandListRequest = () => {} } = productStore() || {}

  useEffect(() => {
    (async () => {
      await BrandListRequest()
    })()
  }, [])
  
  return (
    <div>
      <p>{JSON.stringify(BrandList)}</p>
    </div>
  )
}

export default HomePage

import React from 'react'
import ProductStore from '../../store/ProductStore'

export default function Products() {
    const { ListByRemark} = ProductStore()

  return (
    <div>Products</div>
  )
}

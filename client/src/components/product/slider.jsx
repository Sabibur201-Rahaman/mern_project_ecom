import React from 'react'
import ProductStore from '../../store/ProductStore'
import BrandsSkeleton from '../../skeleton/BrandsSkeleton'

export default function Slider() {
    const { SliderList} = ProductStore()

    if(SliderList===null){
        return <BrandsSkeleton/>

    }
    else{
        return (
            <div>Slider</div>
          )
    }
  
}

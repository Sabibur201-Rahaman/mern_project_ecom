import React from 'react'
import ProductStore from '../../store/ProductStore'
import ImageGallery from 'react-image-gallery'
import 'react-image-gallery/styles/css/image-gallery.css'
function ProductImage() {
  const{DetailList}=ProductStore()
let images=[
  {original:DetailList[0]['details']['image'],thumbnail:DetailList[0]['details']['image']},
  // {original:DetailList[0]['details']['image2'],thumbnail:DetailList[0]['details']['image2']},
  // {original:DetailList[0]['details']['image3'],thumbnail:DetailList[0]['details']['image3']},

]
  return (
    <div>
      <ImageGallery autoPlay={true} items={images}/>
    </div>
  )
}

export default ProductImage

import React from 'react'
import ProductStore from '../../store/ProductStore'
import ImageGallery from 'react-image-gallery'
import 'react-image-gallery/styles/css/image-gallery.css'
function ProductImage() {
  const{DetailList}=ProductStore()
let images=[
  {original:DetailList[0]['details']['img1'],thumbnail:DetailList[0]['details']['img1']},
  {original:DetailList[0]['details']['img2'],thumbnail:DetailList[0]['details']['img2']},
  {original:DetailList[0]['details']['img3'],thumbnail:DetailList[0]['details']['img3']},

]
  return (
    <div>
      <ImageGallery autoPlay={true} items={images}/>
    </div>
  )
}

export default ProductImage

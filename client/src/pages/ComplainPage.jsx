import React, { useEffect } from 'react'
import LayOut from '../components/layout/LayOut'
import LegalContents from '../components/feature/LegalContents'
import FeatureStore from '../store/FeatureStore'

function ComplainPage() {
  const{LegalDetailsRequest}=FeatureStore()
  useEffect(()=>{
      (async()=>{
          await LegalDetailsRequest('complain')
      })()
  },[])
return (
  <LayOut>
      <LegalContents/>
  </LayOut>
)
}

export default ComplainPage

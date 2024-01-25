import React, { useEffect } from 'react'
import FeatureStore from '../store/FeatureStore'
import LegalContents from '../components/feature/LegalContents'
import LayOut from '../components/layout/LayOut'

function TermsPage() {
  const{LegalDetailsRequest}=FeatureStore()
  useEffect(()=>{
      (async()=>{
          await LegalDetailsRequest('terms')
      })()
  },[])
return (
  <LayOut>
      <LegalContents/>
  </LayOut>
)
}

export default TermsPage

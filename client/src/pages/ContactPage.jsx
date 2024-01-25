import React, { useEffect } from 'react'
import LayOut from '../components/layout/LayOut'
import LegalContents from '../components/feature/LegalContents'
import FeatureStore from '../store/FeatureStore'

function ContactPage() {
  const{LegalDetailsRequest}=FeatureStore()
  useEffect(()=>{
      (async()=>{
          await LegalDetailsRequest('contact')
      })()
  },[])
return (
  <LayOut>
      <LegalContents/>
  </LayOut>
)
}

export default ContactPage

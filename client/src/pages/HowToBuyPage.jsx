import React, { useEffect } from 'react'
import LayOut from '../components/layout/LayOut'
import LegalContents from '../components/feature/LegalContents'
import FeatureStore from '../store/FeatureStore'

function HowToBuyPage() {
  const{LegalDetailsRequest}=FeatureStore()
    useEffect(()=>{
        (async()=>{
            await LegalDetailsRequest('howtobuy')
        })()
    },[])
  return (
    <LayOut>
        <LegalContents/>
    </LayOut>
  )
}

export default HowToBuyPage

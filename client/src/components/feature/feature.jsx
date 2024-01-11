import React from 'react'
import FeatureStore from '../../store/FeatureStore'
import FeaturesSkeleton from './../../skeleton/FeaturesSkeleton';
const{FeatureList}=FeatureStore
export default function Feature() {
    if(FeatureList===null){
        return<FeaturesSkeleton/>
    }
    else{
        return (
            <div>Feature</div>
          )
    }
  
}

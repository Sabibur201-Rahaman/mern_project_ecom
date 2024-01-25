import React from "react";
import LegalDetailsSkeleton from "../../skeleton/LegalDetailsSkeleton";
import FeatureStore from "../../store/FeatureStore";
import parse from "html-react-parser";



function LegalContents() {
    const {LegalDetails}=FeatureStore();
    console.log(LegalDetails)
    if(LegalDetails===null){
        return <LegalDetailsSkeleton/>
    }
    else{
        return (
            <div className="container mt-3">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card p-4">
                            {parse(LegalDetails[0]['description'])}
                        </div>
                    </div>
                </div>
            </div>
        );
    }}

export default LegalContents;

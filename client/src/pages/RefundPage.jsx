import React, { useEffect } from "react";
import FeatureStore from "../store/FeatureStore";
import LayOut from "../components/layout/LayOut";
import LegalContents from "../components/feature/LegalContents";

function RefundPage() {
  const { LegalDetailsRequest } = FeatureStore();
  useEffect(() => {
    (async () => {
      await LegalDetailsRequest("refund");
    })();
  }, []);
  return (
    <LayOut>
      <LegalContents />
    </LayOut>
  );
}

export default RefundPage;

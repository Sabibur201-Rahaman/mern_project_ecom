import React from "react";
import HomePage from "./pages/HomePage";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductByBrand from "./pages/ProductByBrand";
import ProductByCategory from "./pages/ProductByCategory";
import ProductByKeyword from "./pages/ProductByKeyword";
import ProductDetails from "./pages/ProductDetails";
import LoginPage from "./pages/LoginPage";
import OtpPage from "./pages/OtpPage";
import AboutPage from "./pages/AboutPage";
import RefundPage from './pages/RefundPage';
import TermsPage from './pages/TermsPage';
import PrivacyPage from './pages/PrivacyPage';
import ComplainPage from './pages/ComplainPage';
import ContactPage from './pages/ContactPage';
import HowToBuyPage from './pages/HowToBuyPage';

function App() {
  return (
    <div>
      <h2>hello this is frontend development</h2>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/by-brand/:id" element={<ProductByBrand />} />
          <Route path="/by-category/:id" element={<ProductByCategory />} />
          <Route path="/by-keyword/:keyword" element={<ProductByKeyword />} />
          <Route path="/details/:id" element={<ProductDetails />} />

          <Route path="/login" element={<LoginPage/>} />
          <Route path="/otp" element={<OtpPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/complain" element={<ComplainPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/howtobuy" element={<HowToBuyPage />} />  //it created some issue with link path but solved the issues
          <Route path="/refund" element={<RefundPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

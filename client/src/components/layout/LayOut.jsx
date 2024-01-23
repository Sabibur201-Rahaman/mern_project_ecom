import React from "react";
import Footer from "./Footer.jsx";
import AppNavbar from "./AppNavbar.jsx";
import { Toaster } from 'react-hot-toast';

function LayOut(props) {
  return (
    <div>
      <AppNavbar />
      {props.children}
      <Toaster position="bottom-center" />
      <Footer />
    </div>
  );
}

export default LayOut;

import React from "react";
import ABClogo from "./images/abc-logo.png";
import hrcLogo from "./images/hrc-logo.png";
import "./App.css";

import InvoiceApp from "./InvoiceApp";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <div className="home">
        <div className="Header">
          <div className="ABClogo">
            <img src={ABClogo} alt="logo1" />
          </div>
          <div className="hrcLogo">
            <img src={hrcLogo} alt="logo2" />
          </div>
        </div>
        <h3 className="text">Invoice List</h3>
        <InvoiceApp />
        <Footer />
      </div>
    </>
  );
}

export default App;

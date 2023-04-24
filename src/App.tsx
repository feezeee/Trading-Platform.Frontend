import { BrowserRouter, Route, Router, Routes } from "react-router-dom";

import Footer from "../src/components/Footer";
import Header from "../src/components/Header";
import LogoutModal from "./components/logout_modal/LogoutModal";
import ProductPage from "../src/pages/ProductPage";
import React from "react";

export interface IAppProps {}

const App: React.FunctionComponent<IAppProps> = (props) => {
  return (
    <div className="d-flex flex-column h-100 overflow-auto">
      <BrowserRouter>
        <Header />
        <LogoutModal />
        <div>
          <Routes>
            <Route path="/products" element={<ProductPage />} />
            <Route path="/" element={<ProductPage />} />
            <Route path="*" element={<div style={{ height: "100%" }}></div>} />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
};

export default App;

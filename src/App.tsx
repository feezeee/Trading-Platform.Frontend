import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import React, { useState } from "react";

import Footer from "../src/components/Footer";
import Header from "../src/components/Header";
import { JsxElement } from "typescript";
import LogoutModal from "./components/logout_modal/LogoutModal";
import ProductPage from "../src/pages/ProductPage";

export interface IAppProps {}

const App: React.FunctionComponent<IAppProps> = (props) => {
  const [hideSearchField, setHideSearchFieldStatus] = useState<boolean>(false);
  return (
    <div className="d-flex flex-column h-100 overflow-auto">
      <BrowserRouter>
        <Header hideSearchField={hideSearchField} />
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

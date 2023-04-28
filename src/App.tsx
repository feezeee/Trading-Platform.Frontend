import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import React, { useState } from "react";

import LoginModal from "./components/login/LoginModal";
import ProductPage from "../src/pages/ProductPage";
import ProfilePage from "./pages/ProfilePage";

export interface IAppProps {}

const App: React.FunctionComponent<IAppProps> = (props) => {
  return (
    // <div className="d-flex flex-column h-100 overflow-auto">
      <BrowserRouter>        
        <Routes>
          <Route path="/products" element={<ProductPage />} />
          <Route path="/" element={<ProductPage />} />
          <Route path="/my-profile" element={<ProfilePage />} />
          <Route path="/login" element={<LoginModal/>} />
        </Routes>
      </BrowserRouter>
    // </div>
  );
};

export default App;

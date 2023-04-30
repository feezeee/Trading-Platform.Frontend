import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import React, { useState } from "react";

import LoginModal from "./components/login_modal/LoginModal";
import ProductPage from "../src/pages/ProductPage";
import ProfilePage from "./pages/ProfilePage";

export interface IAppProps {}

const App: React.FunctionComponent<IAppProps> = (props) => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/products" element={<ProductPage />} />
        <Route path="/" element={<ProductPage />} />
        <Route path="/my-profile" element={<ProfilePage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

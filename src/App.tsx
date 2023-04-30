import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import React, { useState } from "react";

import ProductPage from "./pages/ProductsPage";
import ProfilePage from "./pages/ProfilePage";
import ProductInformationPage from "./pages/ProductInformationPage";

export interface IAppProps {}

const App: React.FunctionComponent<IAppProps> = (props) => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/products" element={<ProductPage />} />
        <Route path="/" element={<ProductPage />} />
        <Route path="/my-profile" element={<ProfilePage />} />
        <Route path="/products/:id" element={<ProductInformationPage/>}/>
      </Routes>
    </BrowserRouter>
  );
};

export default App;

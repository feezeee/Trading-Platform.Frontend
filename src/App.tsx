import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import React, { useState } from "react";

import MyProductsPage from "./pages/MyProductsPage";
import ProductInformationPage from "./pages/ProductInformationPage";
import ProductPage from "./pages/ProductsPage";
import ProfilePage from "./pages/ProfilePage";

export interface IAppProps {}

const App: React.FunctionComponent<IAppProps> = (props) => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/products" element={<ProductPage />} />
        <Route path="/" element={<ProductPage />} />
        <Route path="/my-profile" element={<ProfilePage />} />
        <Route path="/products/:id" element={<ProductInformationPage/>}/>
        <Route path="/my-products" element={<MyProductsPage/>}/>
      </Routes>
    </BrowserRouter>
  );
};

export default App;

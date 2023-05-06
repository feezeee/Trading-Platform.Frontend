import "react-responsive-carousel/lib/styles/carousel.min.css";

import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import React, { useState } from "react";

import AddProductPage from "./pages/AddProductPage";
import MyProductInfPage from "./pages/MyProductInfPage";
import MyProductsPage from "./pages/MyProductsPage";
import ProductInformationPage from "./pages/ProductInformationPage";
import ProductPage from "./pages/ProductsPage";
import ProductsPage from "./pages/ProductsPage";
import ProfilePage from "./pages/ProfilePage";
import мProductInformationPage from "./pages/ProductInformationPage";

export interface IAppProps {}

const App: React.FunctionComponent<IAppProps> = (props) => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/products" element={<ProductPage />} />
        <Route path="/" element={<ProductPage />} />
        <Route path="/my-profile" element={<ProfilePage />} />
        <Route path="/products/add" element={<AddProductPage />}/>
        <Route path="/products/:id" element={<мProductInformationPage/>}/>
        {/* <Route path="/my-products" element={<ProductsPage/>}/> */}
        <Route path="/my-products/:id" element={<MyProductInfPage/>}/>
      </Routes>
    </BrowserRouter>
  );
};

export default App;

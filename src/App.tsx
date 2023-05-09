import "react-responsive-carousel/lib/styles/carousel.min.css";

import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import React, { useState } from "react";

import AddProductPage from "./pages/AddProductPage";
import CategoriesPage from "./pages/CategoriesPage";
import MyMessagesPage from "./pages/MyMessagesPage";
import MyProductInformationPage from "./pages/MyProductInformationPage";
import MyProductsPage from "./pages/MyProductsPage";
import ProductInformationPage from "./pages/ProductInformationPage";
import ProductsPage from "./pages/ProductsPage";
import ProfilePage from "./pages/ProfilePage";
import UsersPage from "./pages/UsersPage";

export interface IAppProps {}

const App: React.FunctionComponent<IAppProps> = (props) => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/" element={<ProductsPage />} />
        <Route path="/products/:id" element={<ProductInformationPage/>}/>
        <Route path="/my-products" element={<MyProductsPage/>}/>
        <Route path="/products/add" element={<AddProductPage />}/>
        <Route path="/my-products/:id" element={<MyProductInformationPage/>}/>
        <Route path="/categories" element={<CategoriesPage/>}/>
        <Route path="/users" element={<UsersPage/>}/>
        <Route path="/profile/:id" element={<ProfilePage />} />        
        <Route path="/my-messages" element={<MyMessagesPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

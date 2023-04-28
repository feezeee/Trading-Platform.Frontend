import React, { useEffect, useState } from "react";

import Filter from "../components/filters/Filter";
import Footer from "../components/Footer";
import { GetProductEntity } from "../core/entities/product/GetProductEntity";
import Header from "../components/Header";
import LoginModal from "../components/login/LoginModal";
import LogoutModal from "../components/logout_modal/LogoutModal";
import ProductItem from "../components/products/ProductItem";
import { ProductService } from "../core/services/ProductService";

export interface IProductPageProps {}

const ProductPage: React.FunctionComponent<IProductPageProps> = (props) => {
  const [products, setProducts] = useState<GetProductEntity[]>([]);
  const [isAuthorize, setIsAuthorize] = useState(
    localStorage.getItem("isAuthorize") != null &&
  (localStorage.getItem("isAuthorize") === "true" ||
    localStorage.getItem("isAuthorize") === "1"));

  var productService = new ProductService();
      
  useEffect(() => {
    const fetchData = async () => {
      setProducts(await productService.getProducts());
    };
    fetchData();
  }, []);
  return (
    <div className="d-flex flex-column min-vh-100">
      <Header hideSearchField={false} isAuthorize={isAuthorize} />
      { isAuthorize ? <LogoutModal /> : <LoginModal />}

      <div className="container py-5">
        <div className="d-flex">
          <div style={{ minWidth: 250 }}></div>
          <div style={{ width: 250 }} className="position-fixed">
            <Filter />
          </div>
          <div className="container-fluid">
            <div className="row flex-wrap g-3">
              {products.map((product) => (
                <div className="d-flex col-xxl-3 col-xl-3 col-lg-4 col-md-12 col-sm-12 col-x-12 justify-content-center">
                  <ProductItem product={product} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductPage;

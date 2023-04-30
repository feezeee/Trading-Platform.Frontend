import React, { useEffect, useState } from "react";

import Filter from "../components/filters/Filter";
import Footer from "../components/Footer";
import { GetProductEntity } from "../core/entities/product/GetProductEntity";
import { GetUserShortEntity } from "../core/entities/user/GetUserShortEntity";
import Header from "../components/Header";
import LoginModal from "../components/login_modal/LoginModal";
import LogoutModal from "../components/logout_modal/LogoutModal";
import ProductItem from "../components/products/ProductItem";
import { ProductService } from "../core/services/ProductService";
import { UserService } from "../core/services/UserService";
import localStorageKeys from "../core/localStorageKeys";

export interface IProductPageProps {}

const ProductPage: React.FunctionComponent<IProductPageProps> = (props) => {
  const [products, setProducts] = useState<GetProductEntity[]>([]);
  const [authorizeShortUser, setAuthorizeShortUser] =
    useState<GetUserShortEntity | null>(null);

  var productService = new ProductService();
  var userService = new UserService();

  const checkUser = async () => {
    const userId: string | null = localStorage.getItem(localStorageKeys.userId);
    const firstName: string | null = localStorage.getItem(
      localStorageKeys.firstName
    );
    const lastName: string | null = localStorage.getItem(
      localStorageKeys.lastName
    );
    const nickname: string | null = localStorage.getItem(
      localStorageKeys.nickname
    );
    const registrationDate: string | null = localStorage.getItem(
      localStorageKeys.registrationDate
    );

    if (
      userId == null ||
      firstName == null ||
      lastName == null ||
      nickname == null ||
      registrationDate == null
    ) {
      setAuthorizeShortUser(null);
    } else {
      const shortUserEntity: GetUserShortEntity = {
        id: userId,
        firstName: firstName,
        lastName: lastName,
        nickname: nickname,
        registrationDate: registrationDate,
      };
      setAuthorizeShortUser(shortUserEntity);
    }

    // const token = localStorage.getItem(localStorageKeys.accessToken);
    // if (token != null){
    //   setAuthorizeShortUser(await userService.getShortUserByToken(token));
    // }
    // else {
    //   setAuthorizeShortUser(null)
    // }
  };

  useEffect(() => {
    checkUser();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setProducts(await productService.getProducts());
    };
    fetchData();
  }, []);

  return (
    <div className="d-flex flex-column min-vh-100">
      <Header searchFieldIsHidden={false} shortUser={authorizeShortUser} />
      {authorizeShortUser != null ? (
        <LogoutModal successLogout={checkUser} />
      ) : (
        <LoginModal successLogin={checkUser} />
      )}
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

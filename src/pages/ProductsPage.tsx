import React, { useEffect, useState } from "react";

import Filter from "../components/filters/Filter";
import Footer from "../components/Footer";
import { GetProductEntity } from "../core/entities/product/GetProductEntity";
import { GetUserShortEntity } from "../core/entities/user/GetUserShortEntity";
import Header from "../components/Header";
import MyLoginModal from "../components/login_modal/MyLoginModal";
import MyLogoutModal from "../components/logout_modal/MyLogoutModal";
import MyRegistrationModal from "../components/registration_modal/MyRegistrationModal";
import ProductItem from "../components/products/ProductItem";
import { ProductService } from "../core/services/ProductService";
import { UserService } from "../core/services/UserService";
import localStorageKeys from "../core/localStorageKeys";

export interface IProductPageProps {}

const ProductPage: React.FunctionComponent<IProductPageProps> = (props) => {
  const [products, setProducts] = useState<GetProductEntity[]>([]);
  const [authorizeShortUser, setAuthorizeShortUser] =
    useState<GetUserShortEntity | null>(null);

  const [productsIsFectching, setProductsIsFectching] = useState(true);

  const [loginModalIsShowed, showLoginModal] = useState(false);
  const [registrationModalIsShowed, showRegistrationModal] = useState(false);

  const [logoutModalIsShowed, showLogoutModal] = useState(false);

  var productService = new ProductService();

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
      setProductsIsFectching(false);
    };
    setProductsIsFectching(true);
    fetchData();    
  }, []);

  return (
    <div className="d-flex flex-column min-vh-100">
      <Header
        searchFieldIsHidden={false}
        shortUser={authorizeShortUser}
        login={() => showLoginModal(!loginModalIsShowed)}
        logout={() => showLogoutModal(!logoutModalIsShowed)}
        registration={() => showRegistrationModal(!registrationModalIsShowed)}
      />
      {authorizeShortUser != null ? (
        <MyLogoutModal
          modalShow={logoutModalIsShowed}
          hideModal={() => {
            showLogoutModal(!logoutModalIsShowed);
          }}
          successLogout={checkUser}
        />
      ) : (
        <div>
          <MyLoginModal
            modalShow={loginModalIsShowed}
            hideModal={() => {
              showLoginModal(!loginModalIsShowed);
            }}
            successLogin={checkUser}
          />
          <MyRegistrationModal
            modalShow={registrationModalIsShowed}
            hideModal={() => {
              showRegistrationModal(!registrationModalIsShowed);
            }}
          />
        </div>
      )}

      <div className="container py-5">
        <div className="d-flex">
          <div style={{ minWidth: 250 }}></div>
          <div style={{ width: 250 }} className="position-fixed">
            <Filter />
          </div>
          <div style={{ minHeight: "65vh" }} className="container-fluid">
            {productsIsFectching === true ? (
              <div style={{ zIndex: 2 }} className="d-flex h-100 w-100 justify-content-center align-items-center">                
                  <div
                    style={{ width: 100, height: 100 }}
                    className="spinner-border text-secondary"
                    role="status"
                  >
                    <span className="visually-hidden">Загрузка...</span>
                  </div>
              </div>
            ) : (
              <div className="row flex-wrap g-3">
                {products.map((product) => (
                  <div className="d-flex col-xxl-3 col-xl-3 col-lg-4 col-md-12 col-sm-12 col-x-12 justify-content-center">
                    <ProductItem product={product} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductPage;

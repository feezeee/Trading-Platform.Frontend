import "react-responsive-carousel/lib/styles/carousel.min.css";

import React, { useEffect, useState } from "react";

import { Card } from "react-bootstrap";
import { Carousel } from "react-responsive-carousel";
import { CategoryService } from "../core/services/CategoryService";
import Filter from "../components/filters/Filter";
import Footer from "../components/Footer";
import { GetCategoryEntity } from "../core/entities/category/GetCategoryEntity";
import { GetProductEntity } from "../core/entities/product/GetProductEntity";
import { GetUserShortEntity } from "../core/entities/user/GetUserShortEntity";
import Header from "../components/Header";
import MyLoginModal from "../components/login_modal/MyLoginModal";
import MyLogoutModal from "../components/logout_modal/MyLogoutModal";
import MyRegistrationModal from "../components/registration_modal/MyRegistrationModal";
import NoImage from "../images/noImage.png";
import ProductInfMenu from "../components/productMenu/ProductInfMenu";
import ProductItem from "../components/products/ProductItem";
import { ProductService } from "../core/services/ProductService";
import { UserService } from "../core/services/UserService";
import localStorageKeys from "../core/localStorageKeys";
import moment from "moment";
import { prettyDOM } from "@testing-library/react";
import { useParams } from "react-router-dom";

export interface IProductInformationPageProps {}

const ProductInformationPage: React.FunctionComponent<
  IProductInformationPageProps
> = (props) => {
  const { id } = useParams();
  const [product, setProduct] = useState<GetProductEntity | null>(null);
  const [productIsFectching, setProductIsFectching] = useState(true);

  const [categories, setCategories] = useState<GetCategoryEntity[]>([]);

  const [authorizeShortUser, setAuthorizeShortUser] =
    useState<GetUserShortEntity | null>(null);

  const [loginModalIsShowed, showLoginModal] = useState(false);
  const [registrationModalIsShowed, showRegistrationModal] = useState(false);
  const [logoutModalIsShowed, showLogoutModal] = useState(false);

  const productService = new ProductService();
  const categoryService = new CategoryService();

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
  };

  useEffect(() => {
    checkUser();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setProduct(await productService.getProductById(id ?? ""));
      setCategories(await categoryService.getCategories());
      setProductIsFectching(false);
    };
    setProductIsFectching(true);
    fetchData();
  }, []);

  return (
    <div className="d-flex flex-column min-vh-100">
      <Header
        searchFieldIsHidden={true}
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
          <div style={{ minHeight: "65vh" }} className="container-fluid">
            {productIsFectching === true ? (
              <div
                style={{ zIndex: 2 }}
                className="d-flex h-100 w-100 justify-content-center align-items-center"
              >
                <div
                  style={{ width: 100, height: 100 }}
                  className="spinner-border text-secondary"
                  role="status"
                >
                  <span className="visually-hidden">Загрузка...</span>
                </div>
              </div>
            ) : product != null && (
              <ProductInfMenu categories={categories} product={product!} showWriteButton={true} />
            )}
          </div>
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default ProductInformationPage;

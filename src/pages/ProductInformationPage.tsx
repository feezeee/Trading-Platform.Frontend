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
import ProductItem from "../components/products/ProductItem";
import { ProductService } from "../core/services/ProductService";
import { UserService } from "../core/services/UserService";
import localStorageKeys from "../core/localStorageKeys";
import { prettyDOM } from "@testing-library/react";
import { useParams } from "react-router-dom";
import moment from "moment";

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
            ) : (
              <div className="d-flex flex-column">
                <div className="row">
                  <div className="col">
                    <div style={{ width: 700 }}>
                      <Carousel
                        autoPlay={true}
                        dynamicHeight={true}
                        width={700}
                        showStatus={false}
                        showArrows={true}
                        infiniteLoop={true}
                      >
                        {product?.images.length == 0
                          ? [
                              <div>
                                <img
                                  className="rounded"
                                  src={NoImage}
                                  alt=""
                                  onError={(event) => {
                                    event.currentTarget.src = NoImage;
                                  }}
                                />
                              </div>,
                            ]
                          : product?.images.map((url) => (
                              <div>
                                <img
                                  className="rounded"
                                  src={url}
                                  alt=""
                                  onError={(event) => {
                                    event.currentTarget.src = NoImage;
                                  }}
                                />
                              </div>
                            ))}
                      </Carousel>
                    </div>
                  </div>
                  <div className="col">
                    <div>
                      {product?.price == null ? (
                        <p style={{ fontSize: 24 }}>
                          <strong>{`Договорная`}</strong>
                        </p>
                      ) : (
                        <p style={{ fontSize: 24 }}>
                          <strong>{`${product?.price} р.`}</strong>
                        </p>
                      )}
                    </div>
                    <div>
                      <p style={{ fontSize: 24 }} className="text-break text-">
                        <strong>{`${product?.name}`}</strong>
                      </p>
                    </div>
                    <hr />
                    <div>
                      <p style={{ fontSize: 16 }} className="text-break text-">
                        {/* const year = date.getFullYear();
const month = ("0" + (date.getMonth() + 1)).slice(-2);
const day = ("0" + date.getDate()).slice(-2);
const hours = ("0" + date.getHours()).slice(-2);
const minutes = ("0" + date.getMinutes()).slice(-2);
const seconds = ("0" + date.getSeconds()).slice(-2); */}
                        {/* {`Дата размещения: ${product?.createdAt.}`} */}
                        {`Дата размещения: ${
                          product!.createdAt.toLocaleString("ru-Ru", { 
                            year: 'numeric', 
                            month: 'numeric', 
                            day: 'numeric',  
                            hour: 'numeric', 
                            minute: 'numeric'
                          })
                        }`}
                      </p>
                    </div>
                    <hr />
                    {product?.phoneNumbers.length !== 0 && (
                      <div>
                        {product?.phoneNumbers.map((phoneNumber) => (
                          <div>
                            <p>{phoneNumber}</p>
                          </div>
                        ))}
                        <hr />
                      </div>
                    )}
                    <div className="d-flex justify-content-center">
                      <button className="btn btn-outline-success w-100">
                        Написать
                      </button>
                      <div
                        role="button"
                        className="d-flex justify-content-center align-items-center mx-3"
                      >
                        <i className="bi bi-heart-fill text-danger"></i>
                      </div>
                    </div>
                    <div className="d-flex"></div>
                  </div>
                </div>
                <div className="row">
                  <div className="d-flex flex-column">
                    <div className="row">
                      <div className="d-flex flex-column">
                        <p>
                          <strong>Описание</strong>
                        </p>
                        <p>{product?.description}</p>
                      </div>
                    </div>
                    <hr />
                    <div className="row">
                      <div className="d-flex flex-column">
                        <div className="row">
                          <p>
                            <strong>Категории</strong>
                          </p>
                        </div>
                        <div className="d-flex flex-wrap">
                          {product?.categoryIdArr.map(
                            (categoryId) =>
                              categories.find((t) => t.id == categoryId) !==
                                null && (
                                <div className="mx-2">
                                  <span>
                                    {
                                      categories.find(
                                        (t) => t.id == categoryId
                                      )!.name
                                    }
                                  </span>
                                </div>
                              )
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default ProductInformationPage;

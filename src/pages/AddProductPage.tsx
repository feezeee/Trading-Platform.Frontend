import ProductAddMenu, { CreateProductValues } from "../components/productMenu/ProductAddMenu";
import React, { useEffect, useState } from "react";

import { Carousel } from "react-responsive-carousel";
import CategoryEditable from "../components/category_editable/CategoryEditable";
import { CategoryService } from "../core/services/CategoryService";
import { GetCategoryEntity } from "../core/entities/category/GetCategoryEntity";
import { GetUserShortEntity } from "../core/entities/user/GetUserShortEntity";
import Header from "../components/Header";
import { ImageService } from "../core/services/ImageService";
import MyLoginModal from "../components/login_modal/MyLoginModal";
import MyLogoutModal from "../components/logout_modal/MyLogoutModal";
import MyRegistrationModal from "../components/registration_modal/MyRegistrationModal";
import NoImage from "../images/noImage.png";
import { PostProductEntity } from "../core/entities/product/PostProductEntity";
import { ProductService } from "../core/services/ProductService";
import TextInputPhoneNumberWithDeleteButton from "../components/phone_number_editable/TextInputPhoneNumberWithDeleteButton";
import localStorageKeys from "../core/localStorageKeys";
import { useNavigate } from "react-router-dom";

export interface IAddProductPageProps {}

const AddProductPage: React.FunctionComponent<IAddProductPageProps> = (
  props
) => {
  const [authorizeShortUser, setAuthorizeShortUser] =
    useState<GetUserShortEntity | null>(null);

  const [productIsCreating, setProductIsCreating] = useState(false);

  const [loginModalIsShowed, showLoginModal] = useState(false);
  const [registrationModalIsShowed, showRegistrationModal] = useState(false);

  const [logoutModalIsShowed, showLogoutModal] = useState(false);

  const [categories, setCategories] = useState<GetCategoryEntity[]>([]);

  const productService = new ProductService();
  const categoryService = new CategoryService();
  const imageService = new ImageService();

  const navigate = useNavigate();

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
      navigate("/products");
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
    const fetchCategories = async () => {
      setCategories(await categoryService.getCategories());
    };
    fetchCategories();
    checkUser();
  }, []);

  const addProductClick = async (createProduct: CreateProductValues) => {
    setProductIsCreating(true);
    let newImagesUrls: string[] = [];
    for (let i = 0; i < createProduct.imageFileArr.length; i++) {
      const response = await imageService.uploadImage(createProduct.imageFileArr[i], null);
      if (response != null) {
        newImagesUrls = [...newImagesUrls, response.imageUrl];
      }
    }

    const postProduct: PostProductEntity = {
      userId: authorizeShortUser!.id,
      categories: createProduct.categoryIdArr,
      description: createProduct.description,
      name: createProduct.name,
      phoneNumbers: createProduct.phoneNumberArr,
      price: createProduct.price,
      images: newImagesUrls,
    };
    await productService.createProduct(postProduct);
    navigate("/my-products");
    setProductIsCreating(false);
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      {/* <Header
        searchFieldIsHidden={true}
        shortUser={authorizeShortUser}
        login={() => showLoginModal(!loginModalIsShowed)}
        logout={() => showLogoutModal(!logoutModalIsShowed)}
        registration={() => showRegistrationModal(!registrationModalIsShowed)}
      /> */}
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
          <div style={{ minHeight: "80vh" }} className="container-fluid">
            {productIsCreating === true ? (
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
              <ProductAddMenu
                categories={categories}
                onSave={addProductClick}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProductPage;

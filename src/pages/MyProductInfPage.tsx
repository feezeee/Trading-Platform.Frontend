import ProductEditMenu, {
  UpdateProductValues,
} from "../components/productMenu/ProductEditMenu";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Carousel } from "react-responsive-carousel";
import CategoryEditable from "../components/category_editable/CategoryEditable";
import { CategoryService } from "../core/services/CategoryService";
import { GetCategoryEntity } from "../core/entities/category/GetCategoryEntity";
import { GetProductEntity } from "../core/entities/product/GetProductEntity";
import { GetUserShortEntity } from "../core/entities/user/GetUserShortEntity";
import Header from "../components/Header";
import { ImageService } from "../core/services/ImageService";
import LoadingScreen from "../components/loading_screen/LoadingScreen";
import ModalWithTwoButtons from "../components/modals/ModalWithTwoButtons";
import MyLoginModal from "../components/login_modal/MyLoginModal";
import MyLogoutModal from "../components/logout_modal/MyLogoutModal";
import MyRegistrationModal from "../components/registration_modal/MyRegistrationModal";
import NoImage from "../images/noImage.png";
import { PostProductEntity } from "../core/entities/product/PostProductEntity";
import ProductInfMenu from "../components/productMenu/ProductInfMenu";
import { ProductService } from "../core/services/ProductService";
import TextInputPhoneNumberWithDeleteButton from "../components/phone_number_editable/TextInputPhoneNumberWithDeleteButton";
import localStorageKeys from "../core/localStorageKeys";

export interface IAddProductPageProps {}

const MyProductInfPage: React.FunctionComponent<IAddProductPageProps> = (
  props
) => {
  const { id } = useParams();

  const [authorizeShortUser, setAuthorizeShortUser] =
    useState<GetUserShortEntity | null>(null);

  const [isLoading, setIsLoading] = useState(false);

  const [loginModalIsShowed, showLoginModal] = useState(false);
  const [registrationModalIsShowed, showRegistrationModal] = useState(false);

  const [logoutModalIsShowed, showLogoutModal] = useState(false);

  const [categories, setCategories] = useState<GetCategoryEntity[]>([]);

  const productService = new ProductService();
  const categoryService = new CategoryService();

  const [product, setProduct] = useState<GetProductEntity | null>(null);

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
      setProduct(await productService.getProductById(id!));
      setIsLoading(false);
    };
    setIsLoading(true);
    if (id === undefined) {
      navigate("/my-products");
      return;
    }
    fetchCategories();
    checkUser();
  }, []);

  const [isEditable, setIsEditable] = useState(false);

  const [isDelete, setIsDelete] = useState(false);
  const [showDeletingLoading, setShowDeletingLoading] = useState(false);

  const deleteProduct = async () => {
    setShowDeletingLoading(true);
    if (product === null) {
      setShowDeletingLoading(false);
      return;
    }
    const response = await productService.deleteProduct(product.id);
    navigate("/my-products");
    setShowDeletingLoading(false);
  };

  const updateProduct = async (updateProduct: UpdateProductValues) => {
    console.log("updatePRoduct");
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
      <ModalWithTwoButtons
        text="Вы уверены, что хотите удалить?"
        cancelText="Нет"
        submitText="Да"
        modalShow={isDelete}
        onCancel={() => setIsDelete(false)}
        onSubmit={deleteProduct}
        showLoading={showDeletingLoading}
      />
      <div className="position-relative">
        {isLoading === true && <LoadingScreen zIndex={2} />}
        <div className="container py-5">
          <div className="d-flex">
            <div style={{ minHeight: "80vh" }} className="container-fluid">
              {isLoading === false && product !== null && (
                <div className="d-flex flex-column">
                  <div className="d-flex justify-content-end py-3">
                    <div className="btn-group" role="group">
                      {isEditable === false && (
                        <button
                          onClick={() => setIsEditable(true)}
                          className="btn btn-outline-success"
                        >
                          <div className="d-flex justify-content-center align-items-center">
                            <i className="bi bi-pencil"></i>
                          </div>
                        </button>
                      )}
                      <button
                        onClick={() => setIsDelete(true)}
                        className="btn btn-outline-danger"
                      >
                        <div className="d-flex justify-content-center align-items-center">
                          <i className="bi bi-trash"></i>
                        </div>
                      </button>
                    </div>
                  </div>
                  {isEditable === false && (
                    <ProductInfMenu
                      categories={categories}
                      product={product}
                      showWriteButton={false}
                    />
                  )}
                  {isEditable === true && (
                    <ProductEditMenu
                      product={product}
                      categories={categories}
                      onSave={updateProduct}
                      onCancel={() => setIsEditable(false)}
                    />
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProductInfPage;

import React, { useEffect, useState } from "react";

import { Carousel } from "react-responsive-carousel";
import CategoryEditable from "../components/category_editable/CategoryEditable";
import { CategoryService } from "../core/services/CategoryService";
import { GetCategoryEntity } from "../core/entities/category/GetCategoryEntity";
import { GetUserShortEntity } from "../core/entities/user/GetUserShortEntity";
import Header from "../components/Header";
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

  const [productImageUrls, setProductImageUrls] = useState<string[]>([]);
  const [productImages, setProductImages] = useState<File[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState<number | null>(
    null
  );

  const [productName, setProductName] = useState<string>("");
  const [productNameIsValid, setProductNameIsValid] = useState(false);

  const [productDescription, setProductDescription] = useState<string>("");
  const [productDescriptionIsValid, setProductDescriptionIsValid] =
    useState(false);

  const [productPrice, setProductPrice] = useState<string | null>(null);
  const [productPriceIsValid, setProductPriceIsValid] = useState(true);

  const [productPhoneNumbers, setProductPhoneNumbers] = useState<string[]>([]);
  const [productPhoneNumbersIsValid, setproductPhoneNumbersIsValid] = useState<
    boolean[]
  >([]);

  const [productCategories, setProductCategories] = useState<string[]>([]);

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

  const productPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.currentTarget.value.length == 0) {
      setProductPrice(null);
      setProductPriceIsValid(true);
      return;
    }

    const pattern = /^\d+([.]\d{1,2})?$/;
    const isValid = pattern.test(event.currentTarget.value);
    setProductPriceIsValid(isValid);
    setProductPrice(event.currentTarget.value);
  };

  const productNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.currentTarget.value.length == 0) {
      setProductName("");
      setProductNameIsValid(false);
    } else {
      setProductName(event.currentTarget.value);
      setProductNameIsValid(true);
    }
  };

  const productDescriptionChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    if (event.currentTarget.value.length == 0) {
      setProductDescription("");
      setProductDescriptionIsValid(false);
    } else {
      setProductDescription(event.currentTarget.value);
      setProductDescriptionIsValid(true);
    }
  };

  const addPhoneNumber = () => {
    if (productPhoneNumbers.length < 3) {
      setProductPhoneNumbers([...productPhoneNumbers, ""]);
      setproductPhoneNumbersIsValid([...productPhoneNumbersIsValid, false]);
    }
  };

  const removePhoneNumber = (index: number) => {
    const newTextInputList = [...productPhoneNumbers];
    newTextInputList.splice(index, 1);
    setProductPhoneNumbers(newTextInputList);

    const newValidations = [...productPhoneNumbersIsValid];
    newValidations.splice(index, 1);
    setproductPhoneNumbersIsValid(newValidations);

    // setproductPhoneNumbersIsValid(productPhoneNumbersIsValid.splice(index, 1));
  };

  const productPhoneNumberChange = (index: number, value: string) => {
    const newTextInputList = [...productPhoneNumbers];
    newTextInputList[index] = value;
    setProductPhoneNumbers(newTextInputList);
    if (value.includes("_") || value.length < 19) {
      const newValidations = [...productPhoneNumbersIsValid];
      newValidations[index] = false;
      setproductPhoneNumbersIsValid(newValidations);
    } else {
      const newValidations = [...productPhoneNumbersIsValid];
      newValidations[index] = true;
      setproductPhoneNumbersIsValid(newValidations);
    }
  };

  const categoryClick = (id: string, isCheck: boolean) => {
    if (isCheck === true) {
      setProductCategories([...productCategories, id]);
    } else {
      const newProducts = [...productCategories];
      newProducts.splice(newProducts.indexOf(id), 1);
      setProductCategories(newProducts);
    }
  };

  const addProductClick = async () => {
    setProductIsCreating(true);
    const postProduct: PostProductEntity = {
      userId: authorizeShortUser!.id,
      categories: productCategories,
      description: productDescription,
      name: productName,
      phoneNumbers: productPhoneNumbers,
      price: Number(productPrice),
      images: [],
    };
    await productService.createProduct(postProduct);
    navigate("/my-products");
    setProductIsCreating(false);
  };

  const selectImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files as FileList;
    if (selectedFiles != null && selectedFiles.length > 0)
    {
      if (currentImageIndex == null){
        setCurrentImageIndex(0)
      }

      setProductImages([...productImages, selectedFiles?.[0]]);

      setProductImageUrls([
        ...productImageUrls,
        URL.createObjectURL(selectedFiles?.[0]),
      ]);
    }    
    event.target.value = ""
  };

  const handleSlideChange = (index: number) => {
    setCurrentImageIndex(index);
  };

  const removeImage = () => {
    if (currentImageIndex != null){
      const productImagesArr = [...productImages]
      productImagesArr.splice(currentImageIndex, 1)
      setProductImages(productImagesArr)

      const productImagesUrlsArr = [...productImageUrls]
      productImagesUrlsArr.splice(currentImageIndex, 1)
      setProductImageUrls(productImagesUrlsArr)
      if (currentImageIndex == 0){
        setCurrentImageIndex(null)
      }
      else if (currentImageIndex == productImagesUrlsArr.length){
        setCurrentImageIndex(currentImageIndex - 1)
      }
    }
    
  }

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
              <div className="d-flex flex-column h-100">
                <div className="row">
                  <div className="col">
                    <div>
                      {productImageUrls.length == 0 ? (
                        <div style={{ width: 700, height: 500 }} className="d-flex justify-content-center">
                          <img className="h-100" src={NoImage}/>
                        </div>
                      ) : (
                        <div style={{ width: 700 }}>
                          <Carousel
                            selectedItem={currentImageIndex!}
                            autoPlay={false}
                            dynamicHeight={true}
                            width={700}
                            showStatus={false}
                            showArrows={true}
                            infiniteLoop={true}
                            onChange={handleSlideChange}
                          >
                            {productImageUrls.map((url) => (
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
                      )}
                    </div>
                    <div>
                      <div className="d-flex flex-column justify-content-center">
                        <div className="d-flex justify-content-center mt-2">
                          <input
                            className="d-none"
                            id="loadedFile"
                            type="file"
                            accept="image/*"
                            onChange={selectImage}
                          />
                          <button
                            className="btn btn-success my-2"
                            onClick={() => {
                              (
                                document.getElementById(
                                  "loadedFile"
                                ) as HTMLInputElement
                              ).click();
                            }}
                          >
                            Добавить изображение
                          </button>
                        </div>
                        <div className="d-flex justify-content-center my-2">
                          <button
                            disabled={currentImageIndex !== null ? false : true}
                            className="btn border-0"
                            onClick={removeImage}
                          >
                            Удалить изображение
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col">
                    <div>
                      <label className="form-label" htmlFor="inputProductPrice">
                        Цена
                      </label>
                      <input
                        id="inputProductPrice"
                        pattern="^\d+([.]\d{1,2})?$"
                        className={`form-control ${
                          productPriceIsValid !== true
                            ? "is-invalid"
                            : "is-valid"
                        }`}
                        type="text"
                        placeholder="Договорная"
                        value={
                          productPrice === null ? "" : productPrice.toString()
                        }
                        onChange={productPriceChange}
                      />
                    </div>
                    <div className="mt-3">
                      <label className="form-label" htmlFor="inputProductName">
                        Название
                      </label>
                      <input
                        id="inputProductName"
                        className={`form-control ${
                          productNameIsValid !== true
                            ? "is-invalid"
                            : "is-valid"
                        }`}
                        type="text"
                        required
                        value={productName}
                        onChange={productNameChange}
                      />
                    </div>
                    {/* <hr /> */}
                    <hr />
                    <div className="mt-3">
                      <label className="form-label" htmlFor="inputProductName">
                        Номер телефона
                      </label>
                      {productPhoneNumbers.map((phoneNumber, index) => (
                        <div className="mb-3">
                          <TextInputPhoneNumberWithDeleteButton
                            index={index}
                            value={phoneNumber}
                            onChange={(value) => {
                              productPhoneNumberChange(index, value);
                            }}
                            onDelete={() => removePhoneNumber(index)}
                            isValid={productPhoneNumbersIsValid[index]}
                          />
                        </div>
                      ))}

                      <button
                        disabled={productPhoneNumbers.length > 2}
                        onClick={addPhoneNumber}
                        className="btn w-100 border"
                      >
                        <div className="d-flex justify-content-center align-items-center">
                          <i
                            style={{
                              fontSize: "2em",
                              lineHeight: "0.5em",
                            }}
                            className="bi bi-plus w-100 h-100"
                          />
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
                <div className="row h-100">
                  <div className="d-flex flex-column">
                    <div className="row">
                      <div className="d-flex flex-column">
                        <label
                          className="form-label"
                          htmlFor="inputProductDescription"
                        >
                          Описание
                        </label>
                        <textarea
                          style={{ height: "auto" }}
                          id="inputProductDescription"
                          className={`form-control ${
                            productDescriptionIsValid !== true
                              ? "is-invalid"
                              : "is-valid"
                          }`}
                          value={productDescription}
                          required
                          onChange={productDescriptionChange}
                        />
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
                          {categories.map((category, index) => (
                            <CategoryEditable
                              isCheck={
                                productCategories.find(
                                  (t) => category.id === t
                                ) !== undefined
                                  ? true
                                  : false
                              }
                              categoryId={category.id}
                              categoryName={category.name}
                              onClick={categoryClick}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="row mt-auto">
                      <div className="d-flex justify-content-center">
                        <button
                          disabled={
                            productNameIsValid === true &&
                            productPriceIsValid === true &&
                            productPhoneNumbersIsValid.find(
                              (t) => t == false
                            ) == undefined &&
                            productDescriptionIsValid === true &&
                            productCategories.length > 0
                              ? false
                              : true
                          }
                          className="btn btn-success"
                          onClick={addProductClick}
                        >
                          Добавить
                        </button>
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

export default AddProductPage;

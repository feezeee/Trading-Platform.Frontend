import React, { useState } from "react";

import API_URLS from "../../core/apiUrls";
import { Carousel } from "react-responsive-carousel";
import CarouselImage from "../carousel_image/CarouselImage";
import CategoryClickable from "../category_clickable/CategoryClickable";
import { GetCategoryEntity } from "../../core/entities/category/GetCategoryEntity";
import { GetProductEntity } from "../../core/entities/product/GetProductEntity";
import NoImage from "../../images/noImage.png";
import TextInputPhoneNumberWithDeleteButton from "../phone_number_editable/TextInputPhoneNumberWithDeleteButton";

export interface IProductEditMenuProps {
  product: GetProductEntity;
  onSave: (updateProduct: UpdateProductValues) => void;
  onCancel: () => void;
  categories: GetCategoryEntity[];
}

export interface UpdateProductValues {
  id: string;
  name: string;
  description: string;
  price: number | null;
  imageFileArr: File[];
  imageUrlArr: string[];
  phoneNumberArr: string[];
  categoryIdArr: string[];
}

const ProductEditMenu: React.FunctionComponent<IProductEditMenuProps> = (
  props
) => {
  const [productImageUrls, setProductImageUrls] = useState<string[]>(
    props.product.images
  );
  const [productImages, setProductImages] = useState<File[]>(
    []
    // Array.from({ length: props.product.images.length }, () => new File([], ""))
  );
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

  const [productName, setProductName] = useState<string>(props.product.name);
  const [productNameIsValid, setProductNameIsValid] = useState(true);

  const [productDescription, setProductDescription] = useState<string>(
    props.product.description
  );
  const [productDescriptionIsValid, setProductDescriptionIsValid] =
    useState(true);

  const [productPrice, setProductPrice] = useState<string | null>(
    props.product.price === null ? null : props.product.price.toString()
  );
  const [productPriceIsValid, setProductPriceIsValid] = useState(true);

  const [productPhoneNumbers, setProductPhoneNumbers] = useState<string[]>(
    props.product.phoneNumbers
  );
  const [productPhoneNumbersIsValid, setproductPhoneNumbersIsValid] = useState<
    boolean[]
  >(Array.from({ length: props.product.phoneNumbers.length }, () => true));

  const [productCategoryIds, setProductCategories] = useState<string[]>(
    props.product.categoryIdArr
  );

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
      setProductCategories([...productCategoryIds, id]);
    } else {
      const newProducts = [...productCategoryIds];
      newProducts.splice(newProducts.indexOf(id), 1);
      setProductCategories(newProducts);
    }
  };

  const updateProductClick = () => {
    const updateProduct: UpdateProductValues = {
      id: props.product.id,
      name: productName,
      description: productDescription,
      price: productPrice === null ? null : Number(productPrice),
      phoneNumberArr: productPhoneNumbers,
      categoryIdArr: productCategoryIds,
      imageFileArr: productImages,
      imageUrlArr: productImageUrls,
    };
    props.onSave(updateProduct);
  };

  const selectImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files as FileList;
    if (selectedFiles != null && selectedFiles.length > 0) {
      if (currentImageIndex == null) {
        setCurrentImageIndex(0);
      }

      setProductImages([...productImages, selectedFiles?.[0]]);

      // setProductImageUrls([
      //   ...productImageUrls,
      //   URL.createObjectURL(selectedFiles?.[0]),
      // ]);
    }
    event.target.value = "";
  };

  const removeImage = () => {
    if (currentImageIndex !== null) {
      const productImagesArr = [...productImages];
      const productImagesUrlsArr = [...productImageUrls];
      if (currentImageIndex > productImageUrls.length - 1) {
        const newIndex = currentImageIndex - productImageUrls.length;
        productImagesArr.splice(newIndex, 1);
        setProductImages(productImagesArr);
      } else if (currentImageIndex <= productImageUrls.length - 1) {
        productImagesUrlsArr.splice(currentImageIndex, 1);
        setProductImageUrls(productImagesUrlsArr);
      }

      let newIndex = 0;
      const totalSize = productImagesUrlsArr.length + productImagesArr.length;
      if (currentImageIndex > totalSize - 1) {
        newIndex = totalSize - 1;
      }
      if (newIndex < 0) {
        newIndex = 0;
      }
      setCurrentImageIndex(newIndex);

      // if (currentImageIndex === 0 && (productImageUrls.length > 1 || productImages.length > 1 )) {
      //   setCurrentImageIndex(0);
      // }
      // else if (currentImageIndex === 0 && (productImageUrls.length === 0 && productImages.length > 1 )) {
      //   setCurrentImageIndex(0);
      // }
      // else if (currentImageIndex === 0 && (productImageUrls.length > 1 && productImages.length === 0 )) {
      //   setCurrentImageIndex(0);
      // }
      // else if (currentImageIndex === productImageUrls.length && productImages.length === 0) {
      //   setCurrentImageIndex(currentImageIndex - 1);
      // }
      // else if (currentImageIndex === productImages.length && productImageUrls.length === 0) {
      //   setCurrentImageIndex(currentImageIndex - 1);
      // }
      // else if (currentImageIndex === 0) {
      //   setCurrentImageIndex(0)
      // }
    }
  };

  return (
    <div className="d-flex flex-column">
      <div className="row">
        <div className="col">
          <div className="d-flex justify-content-center">
            <CarouselImage
              autoPlay={true}
              carouselIndex={currentImageIndex}
              onChangeCarouselIndex={(index) => {
                setCurrentImageIndex(index);
              }}
              imageUrlArr={[
                ...productImageUrls.map(
                  (image) => API_URLS.REACT_APP_IMAGES_API_URL + image
                ),
                ...productImages.map((file) => URL.createObjectURL(file)),
              ]}
              width={640}
              height={480}
            />
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
                      document.getElementById("loadedFile") as HTMLInputElement
                    ).click();
                  }}
                >
                  Добавить изображение
                </button>
              </div>
              <div className="d-flex justify-content-center my-2">
                <button
                  disabled={
                    productImageUrls.length === 0 && productImages.length === 0
                      ? true
                      : false
                  }
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
              <strong>Цена</strong>
            </label>
            <input
              id="inputProductPrice"
              pattern="^\d+([.]\d{1,2})?$"
              className={`form-control ${
                productPriceIsValid !== true ? "is-invalid" : "is-valid"
              }`}
              type="text"
              placeholder="Договорная"
              value={productPrice === null ? "" : productPrice.toString()}
              onChange={productPriceChange}
            />
          </div>
          <div className="mt-3">
            <label className="form-label" htmlFor="inputProductName">
              <strong>Название</strong>
            </label>
            <input
              id="inputProductName"
              className={`form-control ${
                productNameIsValid !== true ? "is-invalid" : "is-valid"
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
              <strong>Номер телефона</strong>
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
              <label className="form-label" htmlFor="inputProductDescription">
                <strong>Описание</strong>
              </label>
              <textarea
                style={{ height: "auto" }}
                id="inputProductDescription"
                className={`form-control ${
                  productDescriptionIsValid !== true ? "is-invalid" : "is-valid"
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
                {props.categories.map((category, index) => (
                  <CategoryClickable
                    isCheck={
                      productCategoryIds.find((t) => category.id === t) !==
                      undefined
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
              <div className="mt-5 w-50 d-flex justify-content-around">
                <button
                  disabled={
                    productNameIsValid === true &&
                    productPriceIsValid === true &&
                    productPhoneNumbersIsValid.find((t) => t == false) ==
                      undefined &&
                    productDescriptionIsValid === true &&
                    productCategoryIds.length > 0
                      ? false
                      : true
                  }
                  className="btn btn-success"
                  onClick={updateProductClick}
                >
                  Сохранить
                </button>
                <button className="btn btn-danger" onClick={props.onCancel}>
                  Отмена
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductEditMenu;

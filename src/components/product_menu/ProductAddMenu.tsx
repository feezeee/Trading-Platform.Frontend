import React, { useState } from "react";

import { Carousel } from "react-responsive-carousel";
import CategoryEditable from "../category_editable/CategoryEditable";
import { GetCategoryEntity } from "../../core/entities/category/GetCategoryEntity";
import NoImage from "../../images/noImage.png";
import TextInputPhoneNumberWithDeleteButton from "../phone_number_editable/TextInputPhoneNumberWithDeleteButton";

export interface IProductAddMenuProps {
  onSave: (createProduct: CreateProductValues) => void;
  categories: GetCategoryEntity[];
}

export interface CreateProductValues {
  name: string;
  description: string;
  price: number | null;
  imageFileArr: File[];
  phoneNumberArr: string[];
  categoryIdArr: string[];
}

const ProductAddMenu: React.FunctionComponent<IProductAddMenuProps> = (
  props
) => {
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

  const [productCategoryIds, setProductCategories] = useState<string[]>([]);

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

  const addProductClick = () => {
    const postProduct: CreateProductValues = {
      name: productName,
      description: productDescription,
      price: productPrice === null ? null : Number(productPrice),
      phoneNumberArr: productPhoneNumbers,
      categoryIdArr: productCategoryIds,
      imageFileArr: productImages,
    };
    props.onSave(postProduct);
  };

  const selectImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files as FileList;
    if (selectedFiles != null && selectedFiles.length > 0) {
      if (currentImageIndex == null) {
        setCurrentImageIndex(0);
      }

      setProductImages([...productImages, selectedFiles?.[0]]);

      setProductImageUrls([
        ...productImageUrls,
        URL.createObjectURL(selectedFiles?.[0]),
      ]);
    }
    event.target.value = "";
  };

  const handleSlideChange = (index: number) => {
    setCurrentImageIndex(index);
  };

  const removeImage = () => {
    if (currentImageIndex != null) {
      const productImagesArr = [...productImages];
      productImagesArr.splice(currentImageIndex, 1);
      setProductImages(productImagesArr);

      const productImagesUrlsArr = [...productImageUrls];
      productImagesUrlsArr.splice(currentImageIndex, 1);
      setProductImageUrls(productImagesUrlsArr);
      if (currentImageIndex === 0 && productImagesUrlsArr.length > 1) {
        setCurrentImageIndex(0);
      } else if (currentImageIndex === productImagesUrlsArr.length) {
        setCurrentImageIndex(currentImageIndex - 1);
      }
      else if (currentImageIndex === 0) {
        setCurrentImageIndex(null);
      }
    }
  };

  return (
    <div className="d-flex flex-column">
      <div className="row">
        <div className="col">
          <div className="d-flex justify-content-center">
            {productImageUrls.length == 0 ? (
              <div
                style={{ width: 700, height: 500 }}
                className="d-flex justify-content-center"
              >
                <img className="h-100" src={NoImage} />
              </div>
            ) : (
              <div style={{ width: 500 }}>
                <Carousel
                  selectedItem={currentImageIndex!}
                  autoPlay={false}
                  dynamicHeight={false}
                  showStatus={false}
                  showArrows={true}
                  infiniteLoop={true}
                  onChange={handleSlideChange}                  
                >
                  {productImageUrls.map((url) => (
                    <div className="rounded overflow-hidden" style={{maxHeight: 600}}>
                      <img
                        className="h-100"
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
                      document.getElementById("loadedFile") as HTMLInputElement
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
                  <CategoryEditable
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
                onClick={addProductClick}
              >
                Добавить
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductAddMenu;

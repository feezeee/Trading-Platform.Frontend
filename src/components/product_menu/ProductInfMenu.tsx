import React, { useState } from "react";

import CarouselImage from "../carousel_image/CarouselImage";
import { GetCategoryEntity } from "../../core/entities/category/GetCategoryEntity";
import { GetProductEntity } from "../../core/entities/product/GetProductEntity";

export interface IProductInfMenuProps {
  product?: GetProductEntity;
  categories: GetCategoryEntity[];
  showWriteButton: boolean;
}

const ProductInfMenu: React.FunctionComponent<IProductInfMenuProps> = ({
  categories,
  showWriteButton,
  product = {
    id: "",
    name: "",
    price: null,
    createdAt: new Date(),
    images: [],
    categoryIdArr: [],
    description: "",
    phoneNumbers: [],
    userId: "",
  },
}) => {
  const [carouselImgIndex, setCarouselImgIndex] = useState<number>(0);

  return (
    <div className="d-flex flex-column">
      <div className="row">
        <div className="col">
          <div className="d-flex justify-content-center">
            <CarouselImage
              autoPlay={true}
              carouselIndex={carouselImgIndex}
              onChangeCarouselIndex={(index) => {
                setCarouselImgIndex(index);
              }}
              imageUrlArr={product.images}
            />
          </div>
        </div>
        <div className="col">
          <div>
            {product.price == null ? (
              <p style={{ fontSize: 24 }}>
                <strong>{`Договорная`}</strong>
              </p>
            ) : (
              <p style={{ fontSize: 24 }}>
                <strong>{`${product.price} р.`}</strong>
              </p>
            )}
          </div>
          <div>
            <p style={{ fontSize: 24 }} className="text-break text-">
              <strong>{`${product.name}`}</strong>
            </p>
          </div>
          <hr />
          <div>
            <p style={{ fontSize: 16 }} className="text-break text-">
              {`Дата размещения: ${product.createdAt.toLocaleString("ru-Ru", {
                year: "numeric",
                month: "numeric",
                day: "numeric",
                hour: "numeric",
                minute: "numeric",
              })}`}
            </p>
          </div>
          <hr />
          {product.phoneNumbers.length !== 0 && (
            <div>
              {product.phoneNumbers.map((phoneNumber, index) => (
                <div key={phoneNumber + index}>
                  <p>{phoneNumber}</p>
                </div>
              ))}
              <hr />
            </div>
          )}
          {showWriteButton === true && (
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
          )}

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
              <p>{product.description}</p>
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
                {product.categoryIdArr.map(
                  (categoryId) =>
                    categories.find((t) => t.id == categoryId) !== null && (
                      <div id={categoryId} className="mx-2">
                        <span>
                          {categories.find((t) => t.id == categoryId)!.name}
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
  );
};

export default ProductInfMenu;

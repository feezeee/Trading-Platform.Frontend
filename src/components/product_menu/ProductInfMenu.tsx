import React, { useState } from "react";

import API_URLS from "../../core/apiUrls";
import CarouselImage from "../carousel_image/CarouselImage";
import { GetCategoryEntity } from "../../core/entities/category/GetCategoryEntity";
import { GetFullUserEntity } from "../../core/entities/user/GetFullUserEntity";
import { GetProductEntity } from "../../core/entities/product/GetProductEntity";
import NoImage from "../../images/noImage.png";

export interface IProductInfMenuProps {
  product?: GetProductEntity;
  categories: GetCategoryEntity[];
  showWriteButton: boolean;
  onClickWriteButton: () => void;
  remoteUser?: GetFullUserEntity;
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
  onClickWriteButton,
  remoteUser = null,
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
              imageUrlArr={product.images.map(
                (image) => API_URLS.REACT_APP_IMAGES_API_URL + image
              )}
              width={640}
              height={480}
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
          {remoteUser !== null && (
            <div className="d-flex p-2">
              <div>
                <CarouselImage
                  autoPlay={false}
                  carouselIndex={0}
                  imageUrlArr={[
                    remoteUser!.profileImageUrl === null
                      ? NoImage
                      : API_URLS.REACT_APP_IMAGES_API_URL +
                        remoteUser!.profileImageUrl,
                  ]}
                  onChangeCarouselIndex={() => {}}
                  height={120}
                  width={83}
                />
              </div>
              <div className="d-flex ms-2">
                <p className="text-truncate m-auto">{`${remoteUser!.lastName} ${remoteUser!.firstName}`}</p>
              </div>
            </div>
          )}
          {showWriteButton === true && (
            <div className="d-flex justify-content-center">
              <button
                onClick={() => onClickWriteButton()}
                className="btn btn-outline-success w-100"
              >
                Написать
              </button>
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
                    categories.find((t) => t.id == categoryId) !==
                      undefined && (
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

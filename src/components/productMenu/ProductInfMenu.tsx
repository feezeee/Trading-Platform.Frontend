import React, { useState } from "react";

import { Carousel } from "react-responsive-carousel";
import CategoryEditable from "../category_editable/CategoryEditable";
import { GetCategoryEntity } from "../../core/entities/category/GetCategoryEntity";
import { GetProductEntity } from "../../core/entities/product/GetProductEntity";
import NoImage from "../../images/noImage.png";
import TextInputPhoneNumberWithDeleteButton from "../phone_number_editable/TextInputPhoneNumberWithDeleteButton";

export interface IProductInfMenuProps {
  product: GetProductEntity;
  categories: GetCategoryEntity[];
  showWriteButton: boolean;
}

const ProductInfMenu: React.FunctionComponent<IProductInfMenuProps> = (
  props
) => {
  return (
    <div>
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
                {props.product.images.length == 0
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
                  : props.product.images.map((url) => (
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
              {props.product.price == null ? (
                <p style={{ fontSize: 24 }}>
                  <strong>{`Договорная`}</strong>
                </p>
              ) : (
                <p style={{ fontSize: 24 }}>
                  <strong>{`${props.product.price} р.`}</strong>
                </p>
              )}
            </div>
            <div>
              <p style={{ fontSize: 24 }} className="text-break text-">
                <strong>{`${props.product.name}`}</strong>
              </p>
            </div>
            <hr />
            <div>
              <p style={{ fontSize: 16 }} className="text-break text-">
                {`Дата размещения: ${props.product.createdAt.toLocaleString(
                  "ru-Ru",
                  {
                    year: "numeric",
                    month: "numeric",
                    day: "numeric",
                    hour: "numeric",
                    minute: "numeric",
                  }
                )}`}
              </p>
            </div>
            <hr />
            {props.product.phoneNumbers.length !== 0 && (
              <div>
                {props.product.phoneNumbers.map((phoneNumber) => (
                  <div>
                    <p>{phoneNumber}</p>
                  </div>
                ))}
                <hr />
              </div>
            )}
            {props.showWriteButton === true && (
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
                <p>{props.product.description}</p>
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
                  {props.product.categoryIdArr.map(
                    (categoryId) =>
                      props.categories.find((t) => t.id == categoryId) !==
                        null && (
                        <div className="mx-2">
                          <span>
                            {
                              props.categories.find((t) => t.id == categoryId)!
                                .name
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
    </div>
  );
};

export default ProductInfMenu;

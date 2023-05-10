import React, { useState } from "react";

import API_URLS from "../../core/apiUrls";
import { Console } from "console";
import { GetProductEntity } from "../../core/entities/product/GetProductEntity";
import NoImage from "../../images/noImage.png";
import { useNavigate } from "react-router-dom";

export interface IProductItemProps {
  product: GetProductEntity;
  onClick: (id: string) => void
}

const ProductItem: React.FunctionComponent<IProductItemProps> = (props) => {
  console.log((props.product.images || [])[0]);
  const [imageSrc, setImageSrc] = useState<string>(
    props.product.images[0] ?? ""
  );
  const handleImageError = () => {
    setImageSrc(NoImage);
  };

  const handleClick = () => {
    props.onClick(props.product.id)    
  }

  return (
    <div
      role="button"
      key={props.product.id}
      className="card p-0"
      style={{ width: 220, height: 360 }}
      onClick={handleClick}
    >
      <div
        style={{ width: "100%", height: 220 }}
        className="d-flex justify-content-center align-content-center overflow-hidden rounded-top"
      >
        <img
          src={API_URLS.REACT_APP_IMAGES_API_URL + imageSrc}
          onError={handleImageError}
          alt=""
        />
      </div>

      <div className="card-body">
        <div className="d-flex justify-content-between">
          <strong
            style={{
              fontSize: 16,
              overflow: "hidden",
              display: "-webkit-box",
              WebkitLineClamp: 1,
              lineClamp: 1,
              WebkitBoxOrient: "vertical",
            }}
            className="mb-1"
          >
            {props.product.price == null
              ? "Договорная"
              : props.product.price + " р."}
          </strong>
          <div
            role="button"
            className="d-flex justify-content-center align-items-center"
          >
            {/* <i className="bi bi-heart-fill text-danger"></i> */}
          </div>
        </div>

        <p
          style={{
            overflow: "hidden",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            lineClamp: 2,
            WebkitBoxOrient: "vertical",
          }}
          className="card-text"
        >
          {props.product.name}
        </p>
      </div>
    </div>
  );
};

export default ProductItem;

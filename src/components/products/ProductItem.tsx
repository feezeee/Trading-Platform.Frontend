import React, { useState } from "react";

import { GetProductEntity } from "../../core/entities/products/GetProductEntity";
import NoImage from "../../images/noImage.png";

export interface IProductItemProps {
  product: GetProductEntity
}

const ProductItem: React.FunctionComponent<IProductItemProps> = (props) => {
  const [imageSrc, setImageSrc] = useState<string>("");
  const handleImageError = () => {
    setImageSrc(NoImage);
  };

  return (
    <div key={props.product.id} className="card p-0" style={{ width: 200, height: 360 }}>
      <img src={imageSrc} onError={handleImageError} alt="Картинка" />
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
            {props.product.price == null ? "Договорная" : props.product.price + " р."}
          </strong>
          <div role="button" className="d-flex justify-content-center align-items-center">
            <i className="bi bi-heart-fill text-danger"></i>
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

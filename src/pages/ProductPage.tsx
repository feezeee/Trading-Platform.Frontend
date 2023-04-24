import React, { useEffect, useState } from "react";

import { GetProductEntity } from "../core/entities/products/GetProductEntity";
import { GetProductResponse } from "../core/data/models/products/GetProductResponse";
import ProductItem from "../components/products/ProductItem";
import axios from 'axios';

export interface IProductPageProps {}

const ProductPage: React.FunctionComponent<IProductPageProps> = (props) => {
  const [products, setProducts] = useState<GetProductEntity[]>([]);

  useEffect(() => {
    axios.get<GetProductEntity[]>('http://localhost:8002/api/products')
      .then(response => setProducts(response.data))
      .catch(error => console.log(error));
  }, []);

  return (
    <div className="container">
      <div className="row flex-wrap g-3">
        {products.map((product) => (
          <div className="d-flex col-lg-3 col-md-3 col-sm-6 justify-content-center">
            <ProductItem
              product={product}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductPage;

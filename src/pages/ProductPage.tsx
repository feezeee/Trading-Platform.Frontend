import React, { useEffect, useState } from "react";

import Filter from "../components/filters/Filter";
import { GetProductEntity } from "../core/entities/products/GetProductEntity";
import { GetProductResponse } from "../core/data/models/products/GetProductResponse";
import ProductItem from "../components/products/ProductItem";
import axios from "axios";

export interface IProductPageProps {}

const ProductPage: React.FunctionComponent<IProductPageProps> = (props) => {
  const [products, setProducts] = useState<GetProductEntity[]>([]);

  useEffect(() => {
    axios
      .get<GetProductEntity[]>("http://localhost:8002/api/products")
      .then((response) => setProducts(response.data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="container pt-5">
      <div className="d-flex">
        <div style={{minWidth: 250}}>
          
        </div>
        <div style={{width: 250}}  className="position-fixed">
          <Filter/>
        </div>
        <div className="container-fluid">
          <div className="row flex-wrap g-3">
            {products.map((product) => (
              <div className="d-flex col-xxl-3 col-xl-3 col-lg-4 col-md-12 col-sm-12 col-x-12 justify-content-center">
                <ProductItem product={product} />
              </div>
            ))} 
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;

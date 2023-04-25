import React, { useEffect, useState } from "react";

import Filter from "../components/filters/Filter";
import { GetProductEntity } from "../core/entities/products/GetProductEntity";
import ProductItem from "../components/products/ProductItem";
import { ProductService } from "../core/services/ProductService";

export interface IProductPageProps {}

const ProductPage: React.FunctionComponent<IProductPageProps> = (props) => {
  const [products, setProducts] = useState<GetProductEntity[]>([]);
  var productService = new ProductService();
  useEffect(() => {
    const fetchData = async () => {
      setProducts(await productService.getProducts())
   }
   fetchData();     
  }, []);

  return (
    <div className="container py-5">
      <div className="d-flex">
        <div style={{ minWidth: 250 }}></div>
        <div style={{ width: 250 }} className="position-fixed">
          <Filter />
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

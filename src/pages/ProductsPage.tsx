import Filter, { FilterValues } from "../components/filters/Filter";
import React, { useEffect, useState } from "react";

import { GetProductEntity } from "../core/entities/product/GetProductEntity";
import MyContainer from "../components/containers/MyContainer";
import ProductItem from "../components/product/ProductItem";
import { ProductService } from "../core/services/ProductService";
import { useNavigate } from "react-router";

export interface IProductsPageProps {}

const ProductsPage: React.FunctionComponent<IProductsPageProps> = (props) => {

  const [productsIsFectching, setProductsIsFectching] = useState(true);

  const [products, setProducts] = useState<GetProductEntity[]>([]);

  const productService = new ProductService();

  const onShowByFilters = async (res: FilterValues) => {
    setProductsIsFectching(true);
    setProducts(
      await productService.getProducts(
        undefined,
        res.fromPrice,
        res.toPrice,
        res.priceIsSet,
        res.imagesAreSet
      )
    );
    setProductsIsFectching(false);
  };

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setProducts(await productService.getProducts());
      setProductsIsFectching(false);
    };
    setProductsIsFectching(true);
    fetchData();
  }, []);

  return (
    <MyContainer
      onSearch={() => {}}
      isLoading={productsIsFectching}
      searchFieldIsHidden={false}
    >
      <div className="d-flex p-3">
        <div style={{ minWidth: 250 }}></div>
        <div
          style={{ width: 250 }}
          className="position-fixed p-2 rounded shadow"
        >
          <Filter
            isDisabled={productsIsFectching}
            onShowByFilters={(res) => {
              onShowByFilters(res);
            }}
          />
        </div>
        <div className="container-fluid">
          {productsIsFectching === false && (
            <div className="row flex-wrap g-3">
              {products.map((product) => (
                <div className="d-flex col-xxl-3 col-xl-3 col-lg-4 col-md-12 col-sm-12 col-x-12 justify-content-center">
                  <ProductItem
                    onClick={(id) => {
                      navigate(`/products/${id}`);
                    }}
                    product={product}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </MyContainer>
  );
};

export default ProductsPage;

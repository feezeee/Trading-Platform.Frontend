import Filter, { FilterValues } from "../components/filters/Filter";
import React, { useEffect, useState } from "react";

import { GetProductEntity } from "../core/entities/product/GetProductEntity";
import LoadingScreen from "../components/loading_screen/LoadingScreen";
import MyContainer from "../components/containers/MyContainer";
import ProductItem from "../components/products/ProductItem";
import { ProductService } from "../core/services/ProductService";
import { useNavigate } from "react-router";

export interface IProductsPageProps {}

const ProductsPage: React.FunctionComponent<IProductsPageProps> = (props) => {
  const [isMyContainerLoading, setIsMyContainerLoading] = useState(false);

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
      isLoading={isMyContainerLoading}
      searchFieldIsHidden={false}
    >
      <div className="d-flex">
        <div style={{ minWidth: 250 }}></div>
        <div style={{ width: 250 }} className="position-fixed">
          <Filter
            isDisabled={productsIsFectching}
            onShowByFilters={(res) => {
              onShowByFilters(res);
            }}
          />
        </div>
        <div style={{minHeight: "80vh"}} className="container-fluid">
          {productsIsFectching === true ? (
            <div className="position-relative h-100 w-100">
                <LoadingScreen showBackground={false} zIndex={2}/>
            </div>
          ) : (            
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

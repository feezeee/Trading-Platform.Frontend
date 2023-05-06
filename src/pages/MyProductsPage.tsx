import React, { useEffect, useState } from "react";

import FloatRoundedButton from "../components/float_rounded_button/FloatRoundedButton";
import { GetProductEntity } from "../core/entities/product/GetProductEntity";
import MyContainer from "../components/containers/MyContainer";
import ProductItem from "../components/products/ProductItem";
import { ProductService } from "../core/services/ProductService";
import localStorageKeys from "../core/localStorageKeys";
import { useNavigate } from "react-router-dom";

export interface IMyProductsPageProps {}

const MyProductsPage: React.FunctionComponent<IMyProductsPageProps> = (props) => {
  const [isMyContainerLoading, setIsMyContainerLoading] = useState(true);

  const [myProducts, setMyProducts] = useState<GetProductEntity[]>([]);

  const productService = new ProductService();

  const userId = localStorage.getItem(localStorageKeys.userId);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      if (userId == null) {
        navigate("/products");
        return;
      }
      setMyProducts(await productService.getProducts(userId));
      setIsMyContainerLoading(false);
    };
    setIsMyContainerLoading(true);
    fetchData();
  }, []);

  const addNewProduct = () => {
    navigate("/products/add");
  };

  return (
    <MyContainer
      onSearch={() => {}}
      isLoading={isMyContainerLoading}
      searchFieldIsHidden={true}
      onLogout={(status) => {
        navigate("/products")
      }}  
    >
      <div className="d-flex">
        <div className="container-fluid">
          {myProducts.map((product, index) => (
            <div key={product.name + index} className="d-flex col-xxl-3 col-xl-3 col-lg-4 col-md-12 col-sm-12 col-x-12 justify-content-center">
              <ProductItem
                onClick={(id) => {
                  navigate(`/products/${id}`);
                }}
                product={product}
              />
            </div>
          ))}
          <div>
            <FloatRoundedButton onClick={addNewProduct} />
          </div>
        </div>
      </div>
    </MyContainer>
  );
};

export default MyProductsPage;

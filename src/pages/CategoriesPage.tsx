import React, { useEffect, useState } from "react";

import CategoryItemAdmin from "../components/category/CategoryItemAdmin";
import { CategoryService } from "../core/services/CategoryService";
import FloatRoundedButton from "../components/float_rounded_button/FloatRoundedButton";
import { GetCategoryEntity } from "../core/entities/category/GetCategoryEntity";
import { GetFullUserEntity } from "../core/entities/user/GetFullUserEntity";
import { GetProductEntity } from "../core/entities/product/GetProductEntity";
import MyContainer from "../components/containers/MyContainer";
import ProductItem from "../components/product/ProductItem";
import { ProductService } from "../core/services/ProductService";
import localStorageKeys from "../core/localStorageKeys";
import { useNavigate } from "react-router-dom";

export interface IMyProductsPageProps {}

const CategoriesPage: React.FunctionComponent<IMyProductsPageProps> = (
  props
) => {
  const [isMyContainerLoading, setIsMyContainerLoading] = useState(true);

  const [categories, setCategories] = useState<GetCategoryEntity[]>([]);

  const categoryService = new CategoryService();

  const userJson = localStorage.getItem(localStorageKeys.user);
  const userLocalStorage: GetFullUserEntity | null = userJson === null ? null : JSON.parse(userJson);  

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      if (userLocalStorage === null) {
        navigate("/products");
        return;
      }
      if (userLocalStorage.roles.find((item) => item.name === "admin") === undefined){
        navigate("/products")
        return;
      }
      setCategories(await categoryService.getCategories());
      setIsMyContainerLoading(false);
    };
    setIsMyContainerLoading(true);
    fetchData();
  }, []);

  const addNewProduct = () => {
    navigate("/products/add");
  };

  const reloadCategories = async () => {
    setIsMyContainerLoading(true);
    setCategories(await categoryService.getCategories());
    setIsMyContainerLoading(false);
  }

  return (
    <MyContainer
      onSearch={() => {}}
      isLoading={isMyContainerLoading}
      searchFieldIsHidden={true}
      onLogout={(status) => {
        navigate("/products");
      }}
    >
      <div className="d-flex">
        <div className="container-fluid">
          <div className="row flex-wrap g-3">
            {categories.map((category, index) => (
              <div
                key={category.name + index}
                className="d-flex col-xxl-4 col-xl-4 col-lg-4 col-md-12 col-sm-12 col-x-12 justify-content-center"
              >
                <CategoryItemAdmin reloadCategories={reloadCategories} category={category} />
                
              </div>
            ))}
          </div>
          <div>
            <FloatRoundedButton onClick={addNewProduct} />
          </div>
        </div>
      </div>
    </MyContainer>
  );
};

export default CategoriesPage;

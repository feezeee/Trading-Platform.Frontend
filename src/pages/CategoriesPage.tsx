import React, { useEffect, useState } from "react";

import CategoryItemAdminCreate from "../components/category/CategoryItemAdminCreate";
import CategoryItemAdminUpdate from "../components/category/CategoryItemAdminUpdate";
import { CategoryService } from "../core/services/CategoryService";
import FloatRoundedButton from "../components/float_rounded_button/FloatRoundedButton";
import { GetCategoryEntity } from "../core/entities/category/GetCategoryEntity";
import { GetFullUserEntity } from "../core/entities/user/GetFullUserEntity";
import { GetProductEntity } from "../core/entities/product/GetProductEntity";
import MyContainer from "../components/containers/MyContainer";
import { PostCategoryEntity } from "../core/entities/category/PostCategoryEntity";
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
  const userLocalStorage: GetFullUserEntity | null =
    userJson === null ? null : JSON.parse(userJson);

  const navigate = useNavigate();
  const fetchData = async () => {
    setIsMyContainerLoading(true);
    if (userLocalStorage === null) {
      navigate("/products");
      return;
    }
    if (
      userLocalStorage.roles.find((item) => item.name === "admin") === undefined
    ) {
      navigate("/products");
      return;
    }
    setCategories(await categoryService.getCategories());
    setIsMyContainerLoading(false);
  };
  useEffect(() => {    
    fetchData();
  }, []);

  const [showCategoryItemCreate, setShowCategoryItemCreate] = useState(false);

  const [createCategoryName, setCreateCategoryName] = useState("");

  const [createCategoryNameIsFree, setCreateCategoryNameIsFree] =
    useState(true);

  const [createCategoryModalLoading, setCreateCategoryModalLoading] =
    useState(false);

  const cancelCreatingCategory = () => {
    setShowCategoryItemCreate(false);
    setCreateCategoryName("");
    setCreateCategoryNameIsFree(true);
  };

  const addNewCategory = async (categoryName: string) => {
    setCreateCategoryModalLoading(true);
    const createCategory: PostCategoryEntity = {
      name: categoryName,
    };
    const response = await categoryService.postCategory(createCategory);
    if (response !== null) {
      setCreateCategoryModalLoading(false);
      cancelCreatingCategory();
      await fetchData()
    } else {
      setCreateCategoryModalLoading(false);
    }
  };

  const onChangeCreateCategoryName = async (categoryName: string) => {
    setCreateCategoryName(categoryName);
    const isFree = await categoryService.categoryIsFree(categoryName);
    setCreateCategoryNameIsFree(isFree.isFree);
  };

  const reloadCategories = async () => {
    setIsMyContainerLoading(true);
    setCategories(await categoryService.getCategories());
    setIsMyContainerLoading(false);
  };

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
        <CategoryItemAdminCreate
          cancelText="Отмена"
          submitText="Добавить"
          modalShow={showCategoryItemCreate}
          categoryName={createCategoryName}
          categoryNameIsFree={createCategoryNameIsFree}
          onCancel={cancelCreatingCategory}
          onChangeCategoryName={onChangeCreateCategoryName}
          onSubmit={(categoryName) => addNewCategory(categoryName)}
          showLoading={createCategoryModalLoading}
        />
        <div className="container-fluid">
          <div className="row flex-wrap g-3">
            {categories.map((category, index) => (
              <div
                key={category.name + index}
                className="d-flex col-xxl-4 col-xl-4 col-lg-4 col-md-12 col-sm-12 col-x-12 justify-content-center"
              >
                <CategoryItemAdminUpdate
                  reloadCategories={reloadCategories}
                  category={category}
                />
              </div>
            ))}
          </div>
          <div>
            <FloatRoundedButton
              onClick={() => {
                setShowCategoryItemCreate(true);
              }}
            />
          </div>
        </div>
      </div>
    </MyContainer>
  );
};

export default CategoriesPage;

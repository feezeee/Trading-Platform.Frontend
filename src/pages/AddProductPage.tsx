import ProductAddMenu, {
  CreateProductValues,
} from "../components/product_menu/ProductAddMenu";
import React, { useEffect, useState } from "react";

import { CategoryService } from "../core/services/CategoryService";
import FloatRoundedButton from "../components/float_rounded_button/FloatRoundedButton";
import { GetCategoryEntity } from "../core/entities/category/GetCategoryEntity";
import { GetFullUserEntity } from "../core/entities/user/GetFullUserEntity";
import { GetProductEntity } from "../core/entities/product/GetProductEntity";
import { ImageService } from "../core/services/ImageService";
import MyContainer from "../components/containers/MyContainer";
import { PostProductEntity } from "../core/entities/product/PostProductEntity";
import ProductItem from "../components/product/ProductItem";
import { ProductService } from "../core/services/ProductService";
import localStorageKeys from "../core/localStorageKeys";
import { useNavigate } from "react-router-dom";

export interface IAddProductPageProps {}

const AddProductPage: React.FunctionComponent<IAddProductPageProps> = (
  props
) => {
  const [isMyContainerLoading, setIsMyContainerLoading] = useState(false);

  const [categories, setCategories] = useState<GetCategoryEntity[]>([]);

  const productService = new ProductService();
  const imageService = new ImageService();
  const categoryService = new CategoryService();

  const userJson = localStorage.getItem(localStorageKeys.user);
  const userLocalStorage: GetFullUserEntity | null =
    userJson === null ? null : JSON.parse(userJson);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      setCategories(await categoryService.getCategories());
    };
    fetchCategories();
  }, []);

  const addProductClick = async (createProduct: CreateProductValues) => {
    if (userLocalStorage === null) {
      navigate("/products");
      return;
    }
    setIsMyContainerLoading(true);

    let newImagesUrls: string[] = [];
    for (let i = 0; i < createProduct.imageFileArr.length; i++) {
      const response = await imageService.uploadImage(
        createProduct.imageFileArr[i],
        null
      );
      if (response != null) {
        newImagesUrls = [...newImagesUrls, response.imageUrl];
      }
    }

    const postProduct: PostProductEntity = {
      userId: userLocalStorage.id,
      categories: createProduct.categoryIdArr,
      description: createProduct.description,
      name: createProduct.name,
      phoneNumbers: createProduct.phoneNumberArr,
      price: createProduct.price,
      images: newImagesUrls,
    };
    await productService.createProduct(postProduct);
    navigate("/my-products");
    setIsMyContainerLoading(false);
  };

  return (
    <MyContainer
      searchText=""
      onChangeSearchText={() => {}}
      isLoading={isMyContainerLoading}
      searchFieldIsHidden={true}
      onLogout={(status) => {
        navigate("/products");
      }}
    >
      <div className="d-flex">
        <div className="container-fluid p-3">
          <ProductAddMenu categories={categories} onSave={addProductClick} />
        </div>
      </div>
    </MyContainer>
  );
};

export default AddProductPage;

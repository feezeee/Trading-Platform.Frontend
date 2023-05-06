import ProductAddMenu, {
  CreateProductValues,
} from "../components/product_menu/ProductAddMenu";
import React, { useEffect, useState } from "react";

import { CategoryService } from "../core/services/CategoryService";
import FloatRoundedButton from "../components/float_rounded_button/FloatRoundedButton";
import { GetCategoryEntity } from "../core/entities/category/GetCategoryEntity";
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
  const userId = localStorage.getItem(localStorageKeys.userId);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      setCategories(await categoryService.getCategories());
    };
    fetchCategories();
  }, []);

  const addProductClick = async (createProduct: CreateProductValues) => {
    if (userId === null) {
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
      userId: userId,
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
      onSearch={() => {}}
      isLoading={isMyContainerLoading}
      searchFieldIsHidden={true}
      onLogout={(status) => {
        navigate("/products");
      }}
    >
      <div className="d-flex">
        <div className="container-fluid">
          <ProductAddMenu categories={categories} onSave={addProductClick} />
        </div>
      </div>
    </MyContainer>
  );
};

export default AddProductPage;

import ProductEditMenu, {
  UpdateProductValues,
} from "../components/product_menu/ProductEditMenu";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { CategoryService } from "../core/services/CategoryService";
import FloatRoundedButton from "../components/float_rounded_button/FloatRoundedButton";
import { GetCategoryEntity } from "../core/entities/category/GetCategoryEntity";
import { GetProductEntity } from "../core/entities/product/GetProductEntity";
import { ImageService } from "../core/services/ImageService";
import ModalWithTwoButtons from "../components/modals/ModalWithTwoButtons";
import MyContainer from "../components/containers/MyContainer";
import ProductInfMenu from "../components/product_menu/ProductInfMenu";
import ProductItem from "../components/product/ProductItem";
import { ProductService } from "../core/services/ProductService";
import { PutProductEntity } from "../core/entities/product/PutProductEntity";
import localStorageKeys from "../core/localStorageKeys";

export interface IMyProductInformationPageProps {}

const MyProductInformationPage: React.FunctionComponent<
  IMyProductInformationPageProps
> = (props) => {
  const { id } = useParams();

  const [isMyContainerLoading, setIsMyContainerLoading] = useState(true);
  const [product, setProduct] = useState<GetProductEntity | null>(null);
  const [categories, setCategories] = useState<GetCategoryEntity[]>([]);

  const productService = new ProductService();
  const categoryService = new CategoryService();
  const imageService = new ImageService();

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      setCategories(await categoryService.getCategories());
      setProduct(await productService.getProductById(id!));
      setIsMyContainerLoading(false);
    };
    setIsMyContainerLoading(true);
    if (id === undefined) {
      navigate("/my-products");
      return;
    }
    fetchCategories();
  }, []);

  const [isEditable, setIsEditable] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [showDeletingLoading, setShowDeletingLoading] = useState(false);

  const deleteProduct = async () => {
    setShowDeletingLoading(true);
    if (product === null) {
      setShowDeletingLoading(false);
      return;
    }
    const response = await productService.deleteProduct(product.id);
    navigate("/my-products");
    setShowDeletingLoading(false);
  };

  const updateProduct = async (updateProduct: UpdateProductValues) => {
    setIsMyContainerLoading(true);
    let newImagesUrls: string[] = updateProduct.imageUrlArr;
    for (let i = 0; i < updateProduct.imageFileArr.length; i++) {
      const response = await imageService.uploadImage(
        updateProduct.imageFileArr[i],
        null
      );
      if (response != null) {
        newImagesUrls = [...newImagesUrls, response.imageUrl];
      }
    }

    const putProduct: PutProductEntity = {
      id: updateProduct.id,
      name: updateProduct.name,
      price: updateProduct.price,
      categories: updateProduct.categoryIdArr,
      description: updateProduct.description,
      phoneNumbers: updateProduct.phoneNumberArr,
      images: newImagesUrls,
    };
    const product = await productService.updateProduct(putProduct);
    setProduct(product);
    setIsMyContainerLoading(false);
    setIsEditable(false);
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
        <div className="container-fluid p-3">
          <ModalWithTwoButtons
            text="Вы уверены, что хотите удалить?"
            cancelText="Нет"
            submitText="Да"
            modalShow={isDelete}
            onCancel={() => setIsDelete(false)}
            onSubmit={deleteProduct}
            showLoading={showDeletingLoading}
          />
          <div className="d-flex flex-column">
            <div className="d-flex justify-content-end">
              <div className="btn-group" role="group">
                {isEditable === false && (
                  <button
                    onClick={() => setIsEditable(true)}
                    className="btn btn-outline-success"
                  >
                    <div className="d-flex justify-content-center align-items-center">
                      <i className="bi bi-pencil"></i>
                    </div>
                  </button>
                )}
                <button
                  onClick={() => setIsDelete(true)}
                  className="btn btn-outline-danger"
                >
                  <div className="d-flex justify-content-center align-items-center">
                    <i className="bi bi-trash"></i>
                  </div>
                </button>
              </div>
            </div>
            {product === null && (
              <ProductInfMenu categories={[]} showWriteButton={false} />
            )}
            {product !== null && isEditable === false && (
              <ProductInfMenu
                categories={categories}
                product={product}
                showWriteButton={false}
              />
            )}
            {product !== null && isEditable === true && (
              <ProductEditMenu
                product={product}
                categories={categories}
                onSave={updateProduct}
                onCancel={() => setIsEditable(false)}
              />
            )}
          </div>
        </div>
      </div>
    </MyContainer>
  );
};

export default MyProductInformationPage;

import React, { useEffect, useState } from "react";

import { CategoryService } from "../core/services/CategoryService";
import { GetCategoryEntity } from "../core/entities/category/GetCategoryEntity";
import { GetProductEntity } from "../core/entities/product/GetProductEntity";
import MyContainer from "../components/containers/MyContainer";
import ProductInfMenu from "../components/productMenu/ProductInfMenu";
import { ProductService } from "../core/services/ProductService";
import { useParams } from "react-router";

export interface IProductInformationPageProps {}

const ProductInformationPage: React.FunctionComponent<IProductInformationPageProps> = (props) => {
  const { id } = useParams();
  const [isMyContainerLoading, setIsMyContainerLoading] = useState(true);

  const [product, setProduct] = useState<GetProductEntity | null>(null);

  const [categories, setCategories] = useState<GetCategoryEntity[]>([]);

  const productService = new ProductService();
  const categoryService = new CategoryService();

  useEffect(() => {
    const fetchData = async () => {
      setProduct(await productService.getProductById(id ?? ""));
      setCategories(await categoryService.getCategories());
      setIsMyContainerLoading(false);
    };
    setIsMyContainerLoading(true);
    fetchData();
  }, []);

  return (
    <MyContainer
      onSearch={() => {}}
      isLoading={isMyContainerLoading}
      searchFieldIsHidden={true}
    >
      <div className="d-flex">
        <div className="container-fluid">
          {isMyContainerLoading === true ? (
            <ProductInfMenu
              categories={[]}
              showWriteButton={true}
            />
          ) : (
            product != null && (
              <ProductInfMenu
                product={product}
                categories={categories}
                showWriteButton={true}
              />
            )
          )}
        </div>
      </div>
    </MyContainer>
  );
};

export default ProductInformationPage;

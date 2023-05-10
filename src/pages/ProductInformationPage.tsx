import ProductEditMenu, {
  UpdateProductValues,
} from "../components/product_menu/ProductEditMenu";
import React, { useEffect, useState } from "react";

import { CategoryService } from "../core/services/CategoryService";
import ChatModal from "../components/chat/ChatModal";
import { ChatService } from "../core/services/ChatService";
import { GetCategoryEntity } from "../core/entities/category/GetCategoryEntity";
import { GetFullUserEntity } from "../core/entities/user/GetFullUserEntity";
import { GetProductEntity } from "../core/entities/product/GetProductEntity";
import { ImageService } from "../core/services/ImageService";
import ModalWithTwoButtons from "../components/modals/ModalWithTwoButtons";
import MyContainer from "../components/containers/MyContainer";
import ProductInfMenu from "../components/product_menu/ProductInfMenu";
import { ProductService } from "../core/services/ProductService";
import { PutProductEntity } from "../core/entities/product/PutProductEntity";
import localStorageKeys from "../core/localStorageKeys";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router";

export interface IProductInformationPageProps {}

const ProductInformationPage: React.FunctionComponent<
  IProductInformationPageProps
> = (props) => {
  const { id } = useParams();

  const [isMyContainerLoading, setIsMyContainerLoading] = useState(true);
  const [product, setProduct] = useState<GetProductEntity | null>(null);
  const [categories, setCategories] = useState<GetCategoryEntity[]>([]);

  const [user, setUser] = useState<GetFullUserEntity | null>(null);

  const productService = new ProductService();
  const categoryService = new CategoryService();
  const imageService = new ImageService();

  const navigate = useNavigate();

  const fetchCategories = async () => {
    setCategories(await categoryService.getCategories());
  };

  const fetchProducts = async () => {
    setProduct(await productService.getProductById(id!));
  };

  const fetchUserFromLocalStorage = () => {
    const userJson = localStorage.getItem(localStorageKeys.user);
    const userLocalStorage: GetFullUserEntity | null =
      userJson === null ? null : JSON.parse(userJson);
    setUser(userLocalStorage);
  };

  useEffect(() => {
    const fetch = async () => {
      setIsMyContainerLoading(true);
      if (id === undefined) {
        navigate("/products");
        return;
      }
      await fetchProducts();
      await fetchCategories();
      fetchUserFromLocalStorage();
      setIsMyContainerLoading(false);
    };
    fetch();
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
    navigate("/products");
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
    setRemoteUserId(product?.userId ?? null);
    setIsMyContainerLoading(false);
    setIsEditable(false);
  };

  const [remoteUserId, setRemoteUserId] = useState<string | null>(null);

  const [sendMessageModalIsShow, setSendMessageModalIsShow] = useState(false);

  const [messageIsSending, setMessageIsSending] = useState(false)

  const chatService = new ChatService();

  const sendMessage = async (message: string) => {
    setMessageIsSending(true)
    if (user !== null && remoteUserId !== null) {
      await chatService.sendMessage(message, user.id, remoteUserId);
    }
    setMessageIsSending(false)
    setSendMessageModalIsShow(false)
  };

  const onClickSendMessageButton = () => {
    setRemoteUserId(product!.userId)
    setSendMessageModalIsShow(true);
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
          <ModalWithTwoButtons
            text="Вы уверены, что хотите удалить?"
            cancelText="Нет"
            submitText="Да"
            modalShow={isDelete}
            onCancel={() => setIsDelete(false)}
            onSubmit={deleteProduct}
            showLoading={showDeletingLoading}
          />
          {user !== null && remoteUserId !== null && (
            <ChatModal
              currentUserId={user.id}
              modalShow={sendMessageModalIsShow}
              onCancel={() => setSendMessageModalIsShow(false)}
              onSubmit={sendMessage}
              remoteUserId={remoteUserId}
              showLoading={messageIsSending}
            />
          )}

          <div className="d-flex flex-column">
            <div className="d-flex justify-content-end">
              <div className="btn-group" role="group">
                {user !== null &&
                  product !== null &&
                  (user.roles.find((item) => item.name === "admin") !==
                    undefined ||
                    product.userId === user.id) && [
                    isEditable === false && (
                      <button
                        onClick={() => setIsEditable(true)}
                        className="btn btn-outline-success"
                      >
                        <div className="d-flex justify-content-center align-items-center">
                          <i className="bi bi-pencil"></i>
                        </div>
                      </button>
                    ),
                    <button
                      onClick={() => setIsDelete(true)}
                      className="btn btn-outline-danger"
                    >
                      <div className="d-flex justify-content-center align-items-center">
                        <i className="bi bi-trash"></i>
                      </div>
                    </button>,
                  ]}
              </div>
            </div>
            {(product === null || user === null) &&  (
              <ProductInfMenu
                categories={[]}
                showWriteButton={false}
                onClickWriteButton={() => {}}
              />
            )}
            {product !== null && user !== null && isEditable === false && (
              <ProductInfMenu
                categories={categories}
                product={product}
                showWriteButton={user.id !== product.userId}
                onClickWriteButton={() => onClickSendMessageButton()}
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

export default ProductInformationPage;

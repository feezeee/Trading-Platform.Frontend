import ProfileEdit, {
  ProfileEditResult,
} from "../components/profile/ProfileEdit";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import CarouselImage from "../components/carousel_image/CarouselImage";
import { GetFullUserEntity } from "../core/entities/user/GetFullUserEntity";
import { ImageService } from "../core/services/ImageService";
import LoadingScreen from "../components/loading_screen/LoadingScreen";
import MyContainer from "../components/containers/MyContainer";
import { ProductService } from "../core/services/ProductService";
import ProfileInf from "../components/profile/ProfileInf";
import { UpdateUserEntity } from "../core/entities/user/UpdateUserEntity";
import { UserService } from "../core/services/UserService";
import { editableInputTypes } from "@testing-library/user-event/dist/utils";
import localStorageKeys from "../core/localStorageKeys";
import { GetRoleEntity } from "../core/entities/role/GetRoleEntity";
import { RoleService } from "../core/services/RoleService";
import ModalWithTwoButtons from "../components/modals/ModalWithTwoButtons";

export interface IProfilePageProps {}

const ProfilePage: React.FunctionComponent<IProfilePageProps> = (props) => {
  const { id } = useParams();
  const [isMyContainerLoading, setIsMyContainerLoading] = useState(true);

  const [user, setUser] = useState<GetFullUserEntity | null>(null);
  const [countOfProducts, setCountOfProducts] = useState(0);
  const [roles, setRoles] = useState<GetRoleEntity[]>([]);

  const [currentUserFromLocalStorage, setCurrentUserFromLocalStorage] =
    useState<GetFullUserEntity | null>(null);

  const userService = new UserService();
  const productService = new ProductService();
  const imageService = new ImageService();
  const roleService = new RoleService();
  const navigate = useNavigate();

  const fetchCurrentUserFromLocalStorage = () => {
    const userJson = localStorage.getItem(localStorageKeys.user);
    const userLocalStorage: GetFullUserEntity | null =
      userJson === null ? null : JSON.parse(userJson);
    if (userLocalStorage === null) {
      navigate("/products");
    }
    setCurrentUserFromLocalStorage(userLocalStorage);
  };

  const fetchRoles = async () => {
    setRoles(await roleService.getAll());
  };

  const fetchUser = async () => {
    setUser(await userService.getUserById(id!));
  };

  const fetchCountOfPRoducts = async () => {
    setCountOfProducts((await productService.getProducts(id!)).length);
  };

  useEffect(() => {
    const fetch = async () => {
      setIsMyContainerLoading(true);
      await fetchUser();
      await fetchRoles();
      await fetchCountOfPRoducts();
      fetchCurrentUserFromLocalStorage();
      setIsMyContainerLoading(false);
    };
    fetch();
  }, []);

  const [isEditable, setIsEditable] = useState(false);
  const [isDelete, setIsDelete] = useState(false);

  const onSaveEdits = async (editUserProfile: ProfileEditResult) => {
    setIsMyContainerLoading(true);

    let newImagesUrl: string | null = editUserProfile.profileImageUrl;

    if (editUserProfile.profileImageFile !== null) {
      const response = await imageService.uploadImage(
        editUserProfile.profileImageFile,
        null
      );
      if (response != null) {
        newImagesUrl = response.imageUrl;
      }
    }

    const updateUser: UpdateUserEntity = {
      id: editUserProfile.userId,
      firstName: editUserProfile.firstName,
      lastName: editUserProfile.lastName,
      nickname: editUserProfile.nickname,
      profileImageUrl: newImagesUrl,
    };

    const responseUpdating = await userService.updateUser(updateUser);
    const responseSetupRoles = await roleService.setUpRoles(
      editUserProfile.userId,
      editUserProfile.roleIdArr
    );
    setIsMyContainerLoading(false);
    if (responseUpdating === true && responseSetupRoles === true) {
      setIsEditable(false);
      setIsMyContainerLoading(true);
      await fetchUser();
      await fetchRoles();
      await fetchCountOfPRoducts();
      setIsMyContainerLoading(false);
    }
  };

  const [deleteLoading, setDeleteLoading] = useState(false)

  const deleteUser = async () => {
    setDeleteLoading(true)
    const response = await userService.deleteUser(id!);
    setDeleteLoading(false)
    if (response === true){
      setIsDelete(false)
      navigate("/products")
    }
  }

  return (
    <MyContainer
      onSearch={() => {}}
      isLoading={isMyContainerLoading}
      searchFieldIsHidden={true}
      onLogout={() => {
        navigate("/products");
      }}
    >
      <div className="container-fluid p-0 position-relative h-100">
        <ModalWithTwoButtons 
        text="Вы уверены, что хотите удалить пользователя?"
        cancelText="Нет"
        submitText="Да"
        showLoading={deleteLoading}
        modalShow={isDelete}
        onCancel={()=>setIsDelete(false)}
        onSubmit={deleteUser}/>
        <div className="p-3 h-100 d-flex flex-column w-100">
          <div className="d-flex justify-content-end">
            <div className="btn-group" role="group">
              {currentUserFromLocalStorage !== null &&
                user !== null &&
                isEditable === false &&
                (currentUserFromLocalStorage.roles.find(
                  (item) => item.name === "admin"
                ) !== undefined ||
                  currentUserFromLocalStorage.id === id) && (
                  <button
                    onClick={() => setIsEditable(true)}
                    className="btn btn-outline-success"
                  >
                    <div className="d-flex justify-content-center align-items-center">
                      <i className="bi bi-pencil"></i>
                    </div>
                  </button>
                )}
              {currentUserFromLocalStorage !== null &&
                currentUserFromLocalStorage.roles.find(
                  (item) => item.name === "admin"
                ) !== undefined && (
                  <button
                    onClick={() => setIsDelete(true)}
                    className="btn btn-outline-danger"
                  >
                    <div className="d-flex justify-content-center align-items-center">
                      <i className="bi bi-trash"></i>
                    </div>
                  </button>
                )}
            </div>
          </div>
          {currentUserFromLocalStorage !== null &&
            user !== null &&
            isEditable === false && (
              <ProfileInf
                user={user}
                countOfProducts={countOfProducts}
                roles={roles}
                currentUser={currentUserFromLocalStorage}
              />
            )}
          {currentUserFromLocalStorage !== null &&
            user !== null &&
            isEditable === true && (
              <ProfileEdit
                user={user}
                onSave={onSaveEdits}
                onCancel={() => {
                  setIsEditable(false);
                }}
                roles={roles}
                currentUser={currentUserFromLocalStorage}
              />
            )}
        </div>
      </div>
    </MyContainer>
  );
};

export default ProfilePage;

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

export interface IProfilePageProps {}

const ProfilePage: React.FunctionComponent<IProfilePageProps> = (props) => {
  const { id } = useParams();
  const [isMyContainerLoading, setIsMyContainerLoading] = useState(true);

  const [user, setUser] = useState<GetFullUserEntity | null>(null);
  const [countOfProducts, setCountOfProducts] = useState(0);
  const [roles, setRoles] = useState<GetRoleEntity[]>([]);

  const userJson = localStorage.getItem(localStorageKeys.user);
  const userLocalStorage: GetFullUserEntity | null =
    userJson === null ? null : JSON.parse(userJson);

  const userService = new UserService();
  const productService = new ProductService();
  const imageService = new ImageService();
  const roleService = new RoleService();
  const navigate = useNavigate();

  if (userLocalStorage === null) {
    navigate("/products");
  }

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

    const response = await userService.updateUser(updateUser);
    setIsMyContainerLoading(false);
    if (response === true) {
      setIsEditable(false);
      setIsMyContainerLoading(true);
      await fetchUser();
      await fetchRoles();
      await fetchCountOfPRoducts();
      setIsMyContainerLoading(false);
    }
  };

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
        <div className="p-3 h-100 d-flex flex-column w-100">
          <div className="d-flex justify-content-end">
            <div className="btn-group" role="group">
              {userLocalStorage !== null &&
                user !== null &&
                isEditable === false &&
                (userLocalStorage.roles.find(
                  (item) => item.name === "admin"
                ) !== undefined ||
                  userLocalStorage.id === id) && (
                  <button
                    onClick={() => setIsEditable(true)}
                    className="btn btn-outline-success"
                  >
                    <div className="d-flex justify-content-center align-items-center">
                      <i className="bi bi-pencil"></i>
                    </div>
                  </button>
                )}
              {userLocalStorage !== null &&
                user !== null &&
                (userLocalStorage.roles.find(
                  (item) => item.name === "admin"
                ) !== undefined ||
                  userLocalStorage.id === id) && (
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
          {user !== null && isEditable === false && (
            <ProfileInf
              user={user}
              countOfProducts={countOfProducts}
              roles={roles}
            />
          )}
          {user !== null && isEditable === true && (
            <ProfileEdit
              user={user}
              onSave={onSaveEdits}
              onCancel={() => {
                setIsEditable(false);
              }}
            />
          )}
        </div>
      </div>
    </MyContainer>
  );
};

export default ProfilePage;

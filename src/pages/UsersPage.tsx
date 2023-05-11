import React, { useEffect, useState } from "react";

import API_URLS from "../core/apiUrls";
import CarouselImage from "../components/carousel_image/CarouselImage";
import { GetFullUserEntity } from "../core/entities/user/GetFullUserEntity";
import { GetRoleEntity } from "../core/entities/role/GetRoleEntity";
import MyContainer from "../components/containers/MyContainer";
import { RoleService } from "../core/services/RoleService";
import { UserService } from "../core/services/UserService";
import localStorageKeys from "../core/localStorageKeys";
import { useNavigate } from "react-router-dom";

export interface IRolesPageProps {}

const UsersPage: React.FunctionComponent<IRolesPageProps> = (props) => {
  const [isMyContainerLoading, setIsMyContainerLoading] = useState(true);

  const [roles, setRoles] = useState<GetRoleEntity[]>([]);

  const [users, setUsers] = useState<GetFullUserEntity[]>([]);

  const navigate = useNavigate();

  const userJson = localStorage.getItem(localStorageKeys.user);
  const userLocalStorage: GetFullUserEntity | null =
    userJson === null ? null : JSON.parse(userJson);

  const userService = new UserService();

  const fetchUsers = async () => {
    setIsMyContainerLoading(true);
    setUsers(await userService.getAllFullInformation());
    setIsMyContainerLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const onUserClick = (user: GetFullUserEntity) => {
    navigate(`/profile/${user.id}`);
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
          <div className="row flex-wrap g-3">
            {users.map((item, index) => (
              <div
                key={item.id + index}
                className="d-flex col-xxl-4 col-xl-4 col-lg-4 col-md-12 col-sm-12 col-x-12 justify-content-center"
              >
                <div
                  onClick={() => onUserClick(item)}
                  role="btn"
                  className="btn border d-flex w-100"
                >
                  <div className="d-flex">
                    <CarouselImage
                      width={83}
                      height={120}
                      autoPlay={false}
                      carouselIndex={0}
                      imageUrlArr={[
                        item.profileImageUrl !== null
                          ? API_URLS.REACT_APP_IMAGES_API_URL +
                            item.profileImageUrl
                          : "",
                      ]}
                      onChangeCarouselIndex={() => {}}
                    />
                  </div>
                  <div className="d-flex flex-column ps-2">
                    <p className="d-flex m-0">
                      <strong>{`${item.lastName} ${item.firstName}`}</strong>
                    </p>
                    <span className="d-flex">{item.nickname}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MyContainer>
  );
};

export default UsersPage;

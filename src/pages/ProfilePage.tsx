import React, { useEffect, useState } from "react";

import { GetUserShortEntity } from "../core/entities/user/GetUserShortEntity";
import MyContainer from "../components/containers/MyContainer";
import { UserService } from "../core/services/UserService";
import localStorageKeys from "../core/localStorageKeys";
import { useNavigate } from "react-router-dom";

export interface IProfilePageProps {}

const ProfilePage: React.FunctionComponent<IProfilePageProps> = (props) => {
  const [isMyContainerLoading, setIsMyContainerLoading] = useState(true);

  const [user, setUser] = useState<GetUserShortEntity | null>(null);
  const userId = localStorage.getItem(localStorageKeys.userId);

  const userService = new UserService();
  const navigate = useNavigate();
  if (userId === null) {
    navigate("/products");
  }

  useEffect(() => {
    const fetchData = async () => {
      setUser(await userService.getUserById(userId!));
    };
    fetchData();
  }, []);

  return (
    <MyContainer
      onSearch={() => {}}
      isLoading={isMyContainerLoading}
      searchFieldIsHidden={true}
    >
      <div className="container-fluid">
        {user !== null && (
          <div className="d-flex">
            <div className="d-flex flex-column">
              <img
                width="280px"
                className="rounded"
                height="310px"
                src="https://mobimg.b-cdn.net/v3/fetch/1b/1bbe0c30fd8b9cd89656e6dc6d5e59a7.jpeg"
              />
              <button type="button" className="btn mt-3">
                Изменить фото
              </button>
            </div>
            <div className="w-100 ps-5">
              <div className="row">
                <p className="text-break">
                  <strong>{user.lastName + " " + user.firstName}</strong>
                </p>
              </div>
              <div className="row">
                <div>
                  <span>Псевдоним: </span>
                  <strong>{user.nickname}</strong>
                </div>
              </div>
              <div className="row">
                <div>
                  <span>Дата регистрации: </span>
                  <strong>{user.registrationDate}</strong>
                </div>
              </div>
              <div className="row">
                <div>
                  <span>Количество размещенных объявлений: </span>
                  <strong>0</strong>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </MyContainer>

    // <div className="d-flex flex-column min-vh-100">
    //   {/* <Header hideSearchField={true} isAuthorize={true}/> */}
    //   <div className="container py-5">
    // {user != null ? (
    //   <div className="d-flex">
    //     <div className="d-flex flex-column">
    //       <img
    //         width="280px"
    //         className="rounded"
    //         height="310px"
    //         src="https://mobimg.b-cdn.net/v3/fetch/1b/1bbe0c30fd8b9cd89656e6dc6d5e59a7.jpeg"
    //       />
    //       <button type="button" className="btn mt-3">Изменить фото</button>
    //     </div>

    //     <div className="w-100 ps-5">
    //       <div className="row">
    //         <p className="text-break">
    //           <strong>{user.lastName + " " + user.firstName}</strong>
    //         </p>
    //       </div>
    //       <div className="row">
    //         <div>
    //           <span>Псевдоним: </span>
    //           <strong>{user.nickname}</strong>
    //         </div>
    //       </div>
    //       <div className="row">
    //         <div>
    //           <span>Дата регистрации: </span>
    //           <strong>{user.registrationDate}</strong>
    //         </div>
    //       </div>
    //       <div className="row">
    //         <div>
    //           <span>Количество размещенных объявлений: </span>
    //           <strong>0</strong>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    //     ) : (
    //       ""
    //     )}
    //   </div>
    //   {/* <Footer /> */}
    // </div>
  );
};

export default ProfilePage;

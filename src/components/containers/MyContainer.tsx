import React, { FC, useEffect, useState } from "react";

import { GetFullUserEntity } from "../../core/entities/user/GetFullUserEntity";
import Header from "../Header";
import LoadingScreen from "../loading_screen/LoadingScreen";
import MyLoginModal from "../login_modal/MyLoginModal";
import MyLogoutModal from "../logout_modal/MyLogoutModal";
import MyRegistrationModal from "../registration_modal/MyRegistrationModal";
import localStorageKeys from "../../core/localStorageKeys";
import { useNavigate } from "react-router";

interface IMyContainerProps {
  isLoading: boolean;
  searchFieldIsHidden: boolean;
  children: React.ReactNode;
  onSearch: (query: string) => void;
  onLogin?: (status: boolean) => void;
  onLogout?: (status: boolean) => void;
}

function MyContainer({
  isLoading,
  searchFieldIsHidden,
  children,
  onSearch,
  onLogin,
  onLogout,
}: IMyContainerProps) {
  const [authorizeUser, setAuthorizeUser] =
    useState<GetFullUserEntity | null>(null);

  const [loginModalIsShowed, showLoginModal] = useState(false);
  const [registrationModalIsShowed, showRegistrationModal] = useState(false);

  const [logoutModalIsShowed, showLogoutModal] = useState(false);

  const checkUser = () => {
    const userJson = localStorage.getItem(localStorageKeys.user);
    if (userJson === null) {
      setAuthorizeUser(null);
      return;
    }
    const user: GetFullUserEntity = JSON.parse(userJson);
    setAuthorizeUser(user)
  };

  useEffect(() => {
    checkUser();
  }, []);

  function rgba(arg0: number, arg1: number, arg2: number, arg3: number): import("csstype").Property.BackgroundColor | undefined {
    throw new Error("Function not implemented.");
  }

  return (
    <div className="d-flex flex-column min-vh-100">
      <Header
        searchFieldIsHidden={searchFieldIsHidden}
        shortUser={authorizeUser}
        login={() => showLoginModal(!loginModalIsShowed)}
        logout={() => showLogoutModal(!logoutModalIsShowed)}
        registration={() => showRegistrationModal(!registrationModalIsShowed)}
        onSearch={onSearch}
        roles={authorizeUser === null ? ["user"] : authorizeUser.roles.map((item) => (item.name))}
      />
      {authorizeUser != null ? (
        <MyLogoutModal
          modalShow={logoutModalIsShowed}
          hideModal={() => {
            showLogoutModal(!logoutModalIsShowed);
          }}
          successLogout={() => {
            checkUser();
            if (onLogout !== undefined) {
              onLogout(true);
            }
          }}
        />
      ) : (
        <div>
          <MyLoginModal
            modalShow={loginModalIsShowed}
            hideModal={() => {
              showLoginModal(!loginModalIsShowed);
            }}
            successLogin={() => {
              checkUser();
              if (onLogin !== undefined) {
                onLogin(true);
              }
            }}
          />
          <MyRegistrationModal
            modalShow={registrationModalIsShowed}
            hideModal={() => {
              showRegistrationModal(!registrationModalIsShowed);
            }}
          />
        </div>
      )}
      <div className="d-flex flex-grow-1">
        <div className="position-relative flex-grow-1 p-3">
          {isLoading === true && <LoadingScreen zIndex={10} />}
          <div style={{backgroundColor: 'rgba(255, 255, 255,  0.9)'}} className="container p-0 rounded shadow overflow-hidden h-100">{children}</div>
        </div>
      </div>
    </div>
  );
}

export default MyContainer;

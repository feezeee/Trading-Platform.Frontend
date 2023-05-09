import React, { FC, useEffect, useState } from "react";

import ChangePasswordModal from "../modals/ChangePasswordModal";
import { GetFullUserEntity } from "../../core/entities/user/GetFullUserEntity";
import Header from "../Header";
import LoadingScreen from "../loading_screen/LoadingScreen";
import MyLoginModal from "../login_modal/MyLoginModal";
import MyLogoutModal from "../logout_modal/MyLogoutModal";
import MyRegistrationModal from "../registration_modal/MyRegistrationModal";
import { RefreshTokensService } from "../../core/services/RefreshTokensService";
import { UserService } from "../../core/services/UserService";
import localStorageKeys from "../../core/localStorageKeys";
import { useNavigate } from "react-router";

interface IMyContainerProps {
  isLoading: boolean;
  searchFieldIsHidden: boolean;
  children: React.ReactNode;
  onLogin?: (status: boolean) => void;
  onLogout?: (status: boolean) => void;
  searchText: string;
  onChangeSearchText: (text: string) => void
}

function MyContainer({
  isLoading,
  searchFieldIsHidden,
  children,
  onLogin,
  onLogout,
  onChangeSearchText,
  searchText
}: IMyContainerProps) {
  const [authorizeUser, setAuthorizeUser] = useState<GetFullUserEntity | null>(
    null
  );

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
    setAuthorizeUser(user);
  };

  useEffect(() => {
    checkUser();
  }, []);

  function rgba(
    arg0: number,
    arg1: number,
    arg2: number,
    arg3: number
  ): import("csstype").Property.BackgroundColor | undefined {
    throw new Error("Function not implemented.");
  }

  const [isChangePassword, setIsChangePassword] = useState(false);

  const [showChangingPasswordLoading, setShowChangingPasswordLoading] = useState(false)

  const userService = new UserService();
  const refreshTokensService = new RefreshTokensService();

  const changePassword = async (newPassword: string) => {
    setShowChangingPasswordLoading(true)
    let response = await userService.changePassword(newPassword)
    if (response === false){
      await refreshTokensService.refreshTokens()
      response = await userService.changePassword(newPassword)
    }
    setShowChangingPasswordLoading(false)
    if (response === true){
      setIsChangePassword(false)
    }
  }

  return (
    <div className="d-flex flex-column min-vh-100">
      <Header
        searchFieldIsHidden={searchFieldIsHidden}
        shortUser={authorizeUser}
        login={() => showLoginModal(!loginModalIsShowed)}
        logout={() => showLogoutModal(!logoutModalIsShowed)}
        registration={() => showRegistrationModal(!registrationModalIsShowed)}
        onChangeSearchText={onChangeSearchText}
        searchText={searchText}
        roles={
          authorizeUser === null
            ? ["user"]
            : authorizeUser.roles.map((item) => item.name)
        }
        changePassword={() => {
          setIsChangePassword(true);
        }}
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
      <ChangePasswordModal
        modalShow={isChangePassword}
        onCancel={() => setIsChangePassword(false)}
        onSubmit={(newPassword) => {changePassword(newPassword)}}
        showLoading={showChangingPasswordLoading}
      />
      <div className="d-flex flex-grow-1">
        <div className="flex-grow-1 p-3">
          <div
            style={{ backgroundColor: "rgba(255, 255, 255,  0.9)" }}
            className="container p-0 rounded shadow overflow-hidden h-100 position-relative"
          >
            {isLoading === true && <LoadingScreen zIndex={10} />}
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyContainer;

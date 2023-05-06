import React, { FC, useEffect, useState } from "react";

import { GetUserShortEntity } from "../../core/entities/user/GetUserShortEntity";
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
  const [authorizeShortUser, setAuthorizeShortUser] =
    useState<GetUserShortEntity | null>(null);

  const [loginModalIsShowed, showLoginModal] = useState(false);
  const [registrationModalIsShowed, showRegistrationModal] = useState(false);

  const [logoutModalIsShowed, showLogoutModal] = useState(false);

  const checkUser = async () => {
    const userId: string | null = localStorage.getItem(localStorageKeys.userId);
    const firstName: string | null = localStorage.getItem(
      localStorageKeys.firstName
    );
    const lastName: string | null = localStorage.getItem(
      localStorageKeys.lastName
    );
    const nickname: string | null = localStorage.getItem(
      localStorageKeys.nickname
    );
    const registrationDate: string | null = localStorage.getItem(
      localStorageKeys.registrationDate
    );

    if (
      userId == null ||
      firstName == null ||
      lastName == null ||
      nickname == null ||
      registrationDate == null
    ) {
      setAuthorizeShortUser(null);
    } else {
      const shortUserEntity: GetUserShortEntity = {
        id: userId,
        firstName: firstName,
        lastName: lastName,
        nickname: nickname,
        registrationDate: registrationDate,
      };
      setAuthorizeShortUser(shortUserEntity);
    }
  };

  useEffect(() => {
    checkUser();
  }, []);

  return (
    <div className="d-flex flex-column min-vh-100">
      <Header
        searchFieldIsHidden={searchFieldIsHidden}
        shortUser={authorizeShortUser}
        login={() => showLoginModal(!loginModalIsShowed)}
        logout={() => showLogoutModal(!logoutModalIsShowed)}
        registration={() => showRegistrationModal(!registrationModalIsShowed)}
        onSearch={onSearch}
      />
      {authorizeShortUser != null ? (
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
        <div className="position-relative flex-grow-1">
          {isLoading === true && <LoadingScreen zIndex={2} />}
          <div className="container py-3">{children}</div>
        </div>
      </div>
    </div>
  );
}

export default MyContainer;

// import * as bootstrap from "bootstrap";

import React, { useState } from "react";

import { UserService } from "../../core/services/UserService";
import localStorageKeys from "../../core/localStorageKeys";

export interface ILoginProps {
  successLogin: () => void;
}

interface FormValues {
  nickname: string;
  password: string;
}

const LoginModal: React.FunctionComponent<ILoginProps> = (props) => {
  const [formValues, setFormValues] = useState<FormValues>({
    nickname: "",
    password: "",
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const [loginProcessIsStarted, setLoginProcess] = useState(false);

  const [dataIncorrect, setDataIncorrect] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoginProcess(true);
    const userService = new UserService();
    var userToken = await userService.authorizeUser({
      nickname: formValues.nickname,
      password: formValues.password,
    });
    if (userToken != null) {
      localStorage.setItem(localStorageKeys.accessToken, userToken.accessToken);
      localStorage.setItem(
        localStorageKeys.refreshToken,
        userToken.refreshToken
      );

      var shortUserEntity = await userService.getShortUserByToken(
        userToken.accessToken
      );

      localStorage.setItem(localStorageKeys.userId, shortUserEntity!.id);
      localStorage.setItem(
        localStorageKeys.nickname,
        shortUserEntity!.nickname
      );
      localStorage.setItem(
        localStorageKeys.firstName,
        shortUserEntity!.firstName
      );
      localStorage.setItem(
        localStorageKeys.lastName,
        shortUserEntity!.lastName
      );
      localStorage.setItem(
        localStorageKeys.registrationDate,
        shortUserEntity!.registrationDate
      );
      props.successLogin();
    } else {
      setDataIncorrect(true);
    }
    setLoginProcess(false);
  };

  return (
    <div
      className="modal fade"
      id="loginModal"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex={-1}
      aria-labelledby="staticBackdropLabel"
      aria-hidden="false"
    >
      <div
        style={{ minWidth: 150 }}
        className="modal-dialog modal-dialog-centered"
      >
        <div className="modal-content">
          <div className="modal-body p-4 position-relative">
            <button
              type="button"
              style={{ top: 5, right: 5 }}
              className="btn-close position-absolute"
              data-bs-dismiss="modal"
              aria-label="Закрыть"
            />
            <form onSubmit={handleSubmit} className="position-relative">
              <div className="mb-3">
                <label htmlFor="nickname" className="form-label">
                  Псевдоним
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="nickname"
                  id="nickname"
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Пароль
                </label>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  id="password"
                  onChange={handleInputChange}
                />
              </div>
              <div className="d-flex justify-content-center mt-3">
                <button type="submit" className="btn btn-success">
                  Войти
                </button>
              </div>
            </form>
            {loginProcessIsStarted && (
              <div className="position-absolute top-0 bottom-0 start-0 end-0 d-flex justify-content-center align-items-center bg-secondary bg-opacity-50">
                <div
                  style={{ width: 100, height: 100 }}
                  className="spinner-border text-secondary"
                  role="status"
                >
                  <span className="visually-hidden">Загрузка...</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;

// import * as bootstrap from "bootstrap";

import React, { useRef, useState } from "react";

import { Modal } from "react-bootstrap";
import { UserService } from "../../core/services/UserService";
import localStorageKeys from "../../core/localStorageKeys";

export interface ILoginProps {
  modalShow: boolean;
  hideModal: () => void;
  successLogin: () => void;
}

interface FormValues {
  nickname: string;
  password: string;
}

const MyLoginModal: React.FunctionComponent<ILoginProps> = (props) => {
  const modalRef = useRef<HTMLDivElement>(null);

  const [formValues, setFormValues] = useState<FormValues>({
    nickname: "",
    password: "",
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
    setDataIncorrect(false);
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

      var user = await userService.getFullUserByToken(
        userToken.accessToken
      );
      localStorage.setItem(localStorageKeys.user, JSON.stringify(user))
      props.hideModal();
      props.successLogin();
    } else {
      setDataIncorrect(true);
    }
    setLoginProcess(false);
  };

  return (
    <Modal show={props.modalShow} centered>
      <Modal.Body>
        <button
          type="button"
          style={{ top: 5, right: 5, zIndex: 1 }}
          className="btn-close position-absolute"
          onClick={props.hideModal}
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
          <div className="d-flex justify-content-center">
            <p className="m-0"></p>
          </div>

          {dataIncorrect && (
            <div className="d-flex justify-content-center">
              <p className="text-danger m-0">
                Неверный псевдоним и(или) пароль
              </p>
            </div>
          )}

          <div className="d-flex justify-content-center mt-3">
            <button type="submit" className="btn btn-success">
              Войти
            </button>
          </div>
        </form>
        {loginProcessIsStarted && (
          <div
            style={{ zIndex: 2 }}
            className="position-absolute top-0 bottom-0 start-0 end-0 d-flex justify-content-center align-items-center bg-secondary bg-opacity-50"
          >
            <div
              style={{ width: 100, height: 100 }}
              className="spinner-border text-secondary"
              role="status"
            >
              <span className="visually-hidden">Загрузка...</span>
            </div>
          </div>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default MyLoginModal;

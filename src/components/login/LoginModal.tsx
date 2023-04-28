import React, { useState } from "react";
import { UserService } from "../../core/services/UserService";
import localStorageKeys from "../../core/localStorageKeys";

export interface ILoginProps {}

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

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const userService = new UserService();
    var userToken = await userService.authorizeUser({
      nickname: formValues.nickname,
      password: formValues.password,
    });
    if (userToken != null){
      localStorage.setItem(localStorageKeys.accessToken, userToken.accessToken)
      localStorage.setItem(localStorageKeys.refreshToken, userToken.refreshToken)
      localStorage.setItem(localStorageKeys.nickname, formValues.nickname)
    }    
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
          <div className="modal-body p-4">
            <button
              type="button"
              style={{ top: 5, right: 5 }}
              className="btn-close position-absolute"
              data-bs-dismiss="modal"
              aria-label="Закрыть"
            />
            <form onSubmit={handleSubmit}>
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
              <button type="submit" className="btn btn-success">
                Войти
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;

import React, { useState } from "react";

import localStorageKeys from "../../core/localStorageKeys";

export interface ILogoutModalProps {
  successLogout: () => void
}

const LogoutModal: React.FunctionComponent<ILogoutModalProps> = (props) => {
  const [loginProcessIsStarted, setLoginProcess] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoginProcess(true);
      localStorage.removeItem(localStorageKeys.accessToken);
      localStorage.removeItem(localStorageKeys.refreshToken);           
      localStorage.removeItem(localStorageKeys.userId);
      localStorage.removeItem(localStorageKeys.nickname);
      localStorage.removeItem(localStorageKeys.firstName)
      localStorage.removeItem(localStorageKeys.lastName)
      localStorage.removeItem(localStorageKeys.registrationDate)
      props.successLogout()  
  };

  return (
    <div
      className="modal fade"
      id="logoutModal"
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
          <div className="modal-body">
            <button
              type="button"
              style={{ top: 5, right: 5 }}
              className="btn-close position-absolute"
              data-bs-dismiss="modal"
              aria-label="Закрыть"
            />
            <p style={{ fontSize: 18 }} className="text-center mt-4">
              <strong>Вы уверены, что хотите выйти?</strong>
            </p>
            <form onSubmit={handleSubmit}
              style={{ maxWidth: 200 }}
              className="d-flex justify-content-between m-auto"
            >
              <button type="submit" className="btn btn-success">
                Да
              </button>
              <button
                type="button"
                className="btn btn-danger"
                data-bs-dismiss="modal"
              >
                Нет
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;

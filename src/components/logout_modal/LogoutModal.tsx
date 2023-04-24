import React from "react";

export interface ILogoutModalProps {}

const LogoutModal: React.FunctionComponent<ILogoutModalProps> = (props) => {
  return (
    <div
      className="modal fade"
      id="staticBackdrop"
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
            <div
              style={{ maxWidth: 200 }}
              className="d-flex justify-content-between m-auto"
            >
              <button type="button" className="btn btn-success">
                Да
              </button>
              <button
                type="button"
                className="btn btn-danger"
                data-bs-dismiss="modal"
              >
                Нет
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;

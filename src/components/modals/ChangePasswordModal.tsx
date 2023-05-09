// import * as bootstrap from "bootstrap";

import React, { useEffect, useRef, useState } from "react";

import { Modal } from "react-bootstrap";

export interface IChangePasswordModalProps {
  modalShow: boolean;
  onCancel: () => void;
  onSubmit: (newPassword: string) => void;
  showLoading: boolean;
}

const ChangePasswordModal: React.FunctionComponent<
  IChangePasswordModalProps
> = (props) => {
  const [newPasswordInput, setNewPasswordInput] = useState("");
  const [newPasswordRepeatInput, setNewPasswordRepeatInput] = useState("");

  const [passwordsIncorrect, setPasswordsIncorrect] = useState<boolean | null>(
    null
  );

  useEffect(() => {
    if (newPasswordInput.length === 0 && newPasswordRepeatInput.length === 0) {
      setPasswordsIncorrect(null);
    } else if (newPasswordInput.length !== newPasswordRepeatInput.length) {
      setPasswordsIncorrect(true);
    } else if (newPasswordInput !== newPasswordRepeatInput) {
      setPasswordsIncorrect(true);
    } else {
      setPasswordsIncorrect(false);
    }
  }, [newPasswordInput, newPasswordRepeatInput]);

  return (
    <Modal show={props.modalShow} centered>
      <Modal.Body>
        <button
          type="button"
          style={{ top: 5, right: 5 }}
          className="btn-close position-absolute"
          onClick={props.onCancel}
        />
        <div className="p-3">
          <div className="row m-2">
            <input
              minLength={8}
              required
              placeholder="Новый пароль"
              className="form-control"
              type="password"
              value={newPasswordInput}
              onChange={(event) => {
                setNewPasswordInput(event.target.value);
              }}
            />
          </div>
          <div className="row m-2">
            <input
              minLength={8}
              required
              placeholder="Повтроите новый пароль"
              className="form-control"
              type="password"
              value={newPasswordRepeatInput}
              onChange={(event) => {
                setNewPasswordRepeatInput(event.target.value);
              }}
            />
          </div>
          {passwordsIncorrect === true && (
            <div className="row m-2">
              <div className="col d-flex justify-content-center">
                <p className="p-0 m-0 text-danger">Пароли не совпадают!</p>
              </div>
            </div>
          )}
        </div>

        <form
          onSubmit={(event) => {
            event.preventDefault();
            props.onSubmit(newPasswordInput);
          }}
          style={{ maxWidth: 200 }}
          className="d-flex justify-content-between m-auto"
        >
          <button
            disabled={
              newPasswordInput.length >= 8 &&
              newPasswordRepeatInput.length >= 8 &&
              newPasswordInput === newPasswordRepeatInput
                ? false
                : true
            }
            type="submit"
            className="btn btn-success"
          >
            Изменить
          </button>
          <button
            type="button"
            className="btn btn-danger"
            onClick={props.onCancel}
          >
            Отмена
          </button>
        </form>
        {props.showLoading && (
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

export default ChangePasswordModal;

// import * as bootstrap from "bootstrap";

import React, { useRef, useState } from "react";

import { Modal } from "react-bootstrap";
import { UserService } from "../../core/services/UserService";
import localStorageKeys from "../../core/localStorageKeys";

export interface IAddProductModalProps {
  modalShow: boolean;
  hideModal: () => void;
  successCreate: () => void;
}

const AddProductModal: React.FunctionComponent<IAddProductModalProps> = (props) => {
  const [creationProcessIsStarted, setCreationProcess] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setCreationProcess(true);
    // Добавляем товар
    // localStorage.removeItem(localStorageKeys.accessToken);
    // localStorage.removeItem(localStorageKeys.refreshToken);
    // localStorage.removeItem(localStorageKeys.userId);
    // localStorage.removeItem(localStorageKeys.nickname);
    // localStorage.removeItem(localStorageKeys.firstName);
    // localStorage.removeItem(localStorageKeys.lastName);
    // localStorage.removeItem(localStorageKeys.registrationDate);
    props.hideModal();
    props.successCreate();
  };

  return (
    <Modal show={props.modalShow} centered>
      <Modal.Body>
        <button
          type="button"
          style={{ top: 5, right: 5 }}
          className="btn-close position-absolute"
          onClick={props.hideModal}
        />
        <p style={{ fontSize: 18 }} className="text-center mt-4">
          <strong>Вы уверены, что хотите выйти?</strong>
        </p>
        <form
          onSubmit={handleSubmit}
          style={{ maxWidth: 200 }}
          className="d-flex justify-content-between m-auto"
        >
          <button type="submit" className="btn btn-success">
            Да
          </button>
          <button
            type="button"
            className="btn btn-danger"
            onClick={props.hideModal}
          >
            Нет
          </button>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default AddProductModal;

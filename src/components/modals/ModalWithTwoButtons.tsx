// import * as bootstrap from "bootstrap";

import React, { useRef, useState } from "react";

import { Modal } from "react-bootstrap";
import { UserService } from "../../core/services/UserService";
import localStorageKeys from "../../core/localStorageKeys";

export interface IModalWithTwoButtonsProps {
  text: string;
  modalShow: boolean;
  cancelText: string;
  submitText: string;
  onCancel: () => void;
  onSubmit: () => void;
  showLoading: boolean;
}

const ModalWithTwoButtons: React.FunctionComponent<
  IModalWithTwoButtonsProps
> = (props) => {
  return (
    <Modal show={props.modalShow} centered>
      <Modal.Body>
        <button
          type="button"
          style={{ top: 5, right: 5 }}
          className="btn-close position-absolute"
          onClick={props.onCancel}
        />
        <p style={{ fontSize: 18 }} className="text-center mt-4">
          <strong>{props.text}</strong>
        </p>
        <form
          onSubmit={(event) => {
            event.preventDefault()
            props.onSubmit()
          }}
          style={{ maxWidth: 200 }}
          className="d-flex justify-content-between m-auto"
        >
          <button type="submit" className="btn btn-success">
            {props.submitText}
          </button>
          <button
            type="button"
            className="btn btn-danger"
            onClick={props.onCancel}
          >
            {props.cancelText}
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

export default ModalWithTwoButtons;

// import * as bootstrap from "bootstrap";

import React, { useEffect, useRef, useState } from "react";

import { GetFullUserEntity } from "../../core/entities/user/GetFullUserEntity";
import { Modal } from "react-bootstrap";

export interface IChangePasswordModalProps {
  remoteUserId: string;
  currentUserId: string;
  modalShow: boolean;
  onCancel: () => void;
  onSubmit: (message: string) => void;
  showLoading: boolean;
}

const ChatModal: React.FunctionComponent<IChangePasswordModalProps> = (
  props
) => {
  const [message, setMessage] = useState("");

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
              minLength={1}
              required
              placeholder="Сообщение"
              className="form-control"
              type="text"
              value={message}
              onChange={(event) => {
                setMessage(event.target.value);
              }}
            />
          </div>
        </div>

        <form
          onSubmit={(event) => {
            event.preventDefault();
            props.onSubmit(message);
            setMessage("")
          }}
          style={{ maxWidth: 200 }}
          className="d-flex justify-content-between m-auto"
        >
          <button
            disabled={message.length > 0 ? false : true}
            type="submit"
            className="btn btn-success"
          >
            Отправить
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

export default ChatModal;

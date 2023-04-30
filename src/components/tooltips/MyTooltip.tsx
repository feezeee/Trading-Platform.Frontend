import React, { useState } from "react";
import { Toast, ToastContainer } from "react-bootstrap";

export interface ITooltipsProps {}

const MyTooltip: React.FunctionComponent<ITooltipsProps> = (props) => {
  const [show, setShow] = useState(true);
  // const [toastQueue, ]

  const toggleShow = () => {
    setShow(!show);
  }

  return (
    <ToastContainer className="position-fixed" position="bottom-end">
      <Toast bg="primary" show={show} onClose={toggleShow} autohide>
        <Toast.Header>
          <strong className="mr-auto">Bootstrap</strong>
        </Toast.Header>
        <Toast.Body>Hello, world!</Toast.Body>
      </Toast>
    </ToastContainer>

    // <div>
    //   <button
    //     type="button"
    //     className="btn btn-primary"
    //     id="liveToastBtn"
    //     onClick={() => {
    //       bootstrap
    //       // document.getElementById("liveToast") as
    //     }}
    //   >
    //     Показать пример
    //   </button>
    //   <div className="toast-container position-fixed bottom-0 end-0 p-3">
    //     <div
    //       id="liveToast"
    //       className="toast fade show"
    //       role="alert"
    //       aria-live="assertive"
    //       aria-atomic="true"
    //     >
    //       <div className="toast-header">
    //         <img src="..." className="rounded me-2" alt="..." />
    //         <strong className="me-auto">Bootstrap</strong>
    //         <small>11 мин назад</small>
    //         <button
    //           type="button"
    //           className="btn-close"
    //           data-bs-dismiss="toast"
    //           aria-label="Закрыть"
    //         ></button>
    //       </div>
    //       <div className="toast-body">Привет, мир! Это тост-сообщение.</div>
    //     </div>
    //   </div>
    // </div>
  );
};

export default MyTooltip;

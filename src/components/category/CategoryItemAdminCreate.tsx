import { Modal } from "react-bootstrap";

export interface ICategoryItemAdminCreateProps {
  modalShow: boolean;
  cancelText: string;
  submitText: string;
  categoryName: string;
  categoryNameIsFree: boolean;
  onCancel: () => void;
  onSubmit: (categoryName: string) => void;
  onChangeCategoryName: (categoryName: string) => void;
  showLoading: boolean;
}

const CategoryItemAdminCreate: React.FunctionComponent<
  ICategoryItemAdminCreateProps
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
        <div className="m-3">
          <input
            className={`form-control w-100 ${
              props.categoryName.length > 0 && props.categoryNameIsFree
                ? "is-valid"
                : "is-invalid"
            }`}
            type="text"
            value={props.categoryName}
            onChange={(event) => props.onChangeCategoryName(event.target.value)}
          />
        </div>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            props.onSubmit(props.categoryName);
          }}
          style={{ maxWidth: 200 }}
          className="d-flex justify-content-between m-auto"
        >
          <button
            disabled={
              props.categoryName.length > 0 && props.categoryNameIsFree
                ? false
                : true
            }
            type="submit"
            className="btn btn-success"
          >
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

export default CategoryItemAdminCreate;

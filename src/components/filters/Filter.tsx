export interface IFilterProps {}

const Filter: React.FunctionComponent<IFilterProps> = (props) => {
  return (
    <div className="w-100">
      <form className="w-100">
        <div className="row m-0">
          <div className="d-flex flex-column p-0">
            <strong className="w-100">Цена</strong>
            <div className="input-group mt-2">
              <input
                type="text"
                className="form-control"
                placeholder="От"
                aria-label="От"
              />
              <input
                type="text"
                className="form-control"
                placeholder="До"
                aria-label="До"
              />
            </div>
            <div className="mt-2">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="priceSetOrNot"
                  id="priceSet"
                  value="priceSet"
                />
                <label className="form-check-label" htmlFor="priceSet">
                  Цена указана
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="priceSetOrNot"
                  id="priceNotSet"
                  value="priceNotSet"
                />
                <label className="form-check-label" htmlFor="priceNotSet">
                  Цена не указана
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="priceSetOrNot"
                  id="priceSetOrNot"
                  value="priceSetOrNot"
                  defaultChecked
                />
                <label className="form-check-label" htmlFor="priceSetOrNot">
                  Неважно
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className="row m-0 mt-3">
          <div className="d-flex flex-column p-0">
            <strong className="w-100">Фото</strong>
            <div className="mt-2">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="imageExistOrNot"
                  id="imageExist"
                  value="imageExist"
                />
                <label className="form-check-label" htmlFor="imageExist">
                  Только с фото
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="imageExistOrNot"
                  id="imageNotExist"
                  value="imageNotExist"
                />
                <label className="form-check-label" htmlFor="imageNotExist">
                  Только без фото
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="imageExistOrNot"
                  id="imageExistOrNot"
                  value="imageExistOrNot"
                  defaultChecked
                />
                <label className="form-check-label" htmlFor="imageExistOrNot">
                  Неважно
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className="row m-0 mt-3">
          <button type="submit" className="btn btn-success">
            Показать
          </button>
        </div>
        <div className="row m-0 mt-2">
          <button
            className="d-flex align-items-center justify-content-center btn"
            type="reset"
          >
            <i className="bi bi-x-lg"></i>
            <span className="form-check-label ms-1">Очистить</span>
          </button>

          {/* <div
            role="button"
            className="d-flex align-items-center justify-content-center p-0"
          >
            <i className="bi bi-x-lg"></i>
            <label className="form-check-label ms-1">Очистить</label>
          </div> */}
        </div>
      </form>
    </div>
  );
};

export default Filter;

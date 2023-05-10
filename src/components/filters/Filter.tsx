import { useState } from "react";

export interface IFilterProps {
  onShowByFilters: (res: FilterValues) => void;
  isDisabled: boolean;
}

export interface FilterValues {
  fromPrice: number | undefined;
  toPrice: number | undefined;
  priceIsSet: boolean | undefined;
  imagesAreSet: boolean | undefined;
}

const Filter: React.FunctionComponent<IFilterProps> = (props) => {
  const [formValues, setFormValues] = useState<FilterValues>({
    fromPrice: undefined,
    toPrice: undefined,
    priceIsSet: undefined,
    imagesAreSet: undefined,
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const clearFilters = () => {
    setFormValues({
      fromPrice: undefined,
      toPrice: undefined,
      priceIsSet: undefined,
      imagesAreSet: undefined,
    });
  };

  const onShowByFilters = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    props.onShowByFilters(formValues);
  };

  return (
    <div className="w-100">
      <form onSubmit={(event) => onShowByFilters(event)} className="w-100">
        <div className="row m-0">
          <div className="d-flex flex-column p-0">
            <strong className="w-100">Цена</strong>
            <div className="input-group mt-2">
              <input
                disabled={props.isDisabled}
                type="number"
                className="form-control"
                name="fromPrice"
                placeholder="От"
                aria-label="От"
                onChange={handleInputChange}
              />
              <input
                disabled={props.isDisabled}
                type="number"
                className="form-control"
                name="toPrice"
                placeholder="До"
                aria-label="До"
                onChange={handleInputChange}
              />
            </div>
            <div className="mt-2">
              <div className="form-check">
                <input
                  disabled={props.isDisabled}
                  className="form-check-input"
                  type="radio"
                  name="priceIsSet"
                  id="priceIsSetId"
                  value="true"
                  onChange={handleInputChange}
                />
                <label className="form-check-label" htmlFor="priceIsSetId">
                  Цена указана
                </label>
              </div>
              <div className="form-check">
                <input
                  disabled={props.isDisabled}
                  className="form-check-input"
                  type="radio"
                  name="priceIsSet"
                  id="priceIsNotSetId"
                  value="false"
                  onChange={handleInputChange}
                />
                <label className="form-check-label" htmlFor="priceIsNotSetId">
                  Цена не указана
                </label>
              </div>
              <div className="form-check">
                <input
                  disabled={props.isDisabled}
                  className="form-check-input"
                  type="radio"
                  name="priceIsSet"
                  id="priceIsSetOrNotId"
                  value={undefined}
                  defaultChecked
                  onChange={handleInputChange}
                />
                <label className="form-check-label" htmlFor="priceIsSetOrNotId">
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
                  disabled={props.isDisabled}
                  className="form-check-input"
                  type="radio"
                  name="imagesAreSet"
                  id="imagesAreSetId"
                  value="true"
                  onChange={handleInputChange}
                />
                <label className="form-check-label" htmlFor="imagesAreSetId">
                  Только с фото
                </label>
              </div>
              <div className="form-check">
                <input
                  disabled={props.isDisabled}
                  className="form-check-input"
                  type="radio"
                  name="imagesAreSet"
                  id="imagesAreNotSetId"
                  value="false"
                  onChange={handleInputChange}
                />
                <label className="form-check-label" htmlFor="imagesAreNotSetId">
                  Только без фото
                </label>
              </div>
              <div className="form-check">
                <input
                  disabled={props.isDisabled}
                  className="form-check-input"
                  type="radio"
                  name="imagesAreSet"
                  id="imagesAreSetOrNotId"
                  value={undefined}
                  defaultChecked
                  onChange={handleInputChange}
                />
                <label className="form-check-label" htmlFor="imagesAreSetOrNotId">
                  Неважно
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className="row m-0 mt-3">
          <button
            disabled={props.isDisabled}
            type="submit"
            className="btn btn-success"
          >
            Показать
          </button>
        </div>
        <div className="row m-0 mt-2">
          <button
            disabled={props.isDisabled}
            onClick={clearFilters}
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

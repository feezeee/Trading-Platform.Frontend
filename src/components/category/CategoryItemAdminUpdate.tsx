import React, { useState } from "react";

import { CategoryService } from "../../core/services/CategoryService";
import { GetCategoryEntity } from "../../core/entities/category/GetCategoryEntity";
import ModalWithTwoButtons from "../modals/ModalWithTwoButtons";
import { PutCategoryEntity } from "../../core/entities/category/PutCategoryEntity";

export interface ICategoryItemAdminUpdateProps {
  category: GetCategoryEntity;
  reloadCategories: () => void
}

const CategoryItemAdminUpdate: React.FunctionComponent<ICategoryItemAdminUpdateProps> = (
  props
) => {
  const [category, setCategory] = useState(props.category);
  const [categoryName, setCategoryName] = useState(props.category.name);

  const [canApply, setCanApply] = useState(false);

  const [categoryNameIsFree, setCategoryNameIsFree] = useState<boolean>(true);

  const categoryService = new CategoryService();

  const onChangeCategoryName = async (name: string) => {
    setCategoryName(name);

    if (name === category.name) {
      setCanApply(false);
      setCategoryNameIsFree(true);
      return;
    }
    const nameIsFree = await categoryService.categoryIsFree(name);
    setCategoryNameIsFree(nameIsFree.isFree);
    if (nameIsFree.isFree) {
      setCanApply(true);
    } else {
      setCanApply(false);
    }
  };

  const resetName = () => {
    setCategoryName(category.name);
    setCanApply(false);
    setCategoryNameIsFree(true);
  };

  const apply = async () => {
    if (categoryNameIsFree && canApply) {
      const putCategory: PutCategoryEntity = {
        id: props.category.id,
        name: categoryName,
      };
      const response = await categoryService.putCategory(putCategory);
      if (response !== null) {
        setCategoryName(response.name);
        setCategory(response);
        setCanApply(false);
        setCategoryNameIsFree(true);
      }
    }
  };

  const showDeleteModal = () => {
    setModalDeleteCategoryShow(true)
  }
  
  const deleteCategory = async () => {
    setShowLoading(true)
    const response = await categoryService.deleteCategory(category.id);
    setShowLoading(false)
    setModalDeleteCategoryShow(false)
    props.reloadCategories();
  };

  const [showLoading, setShowLoading] = useState(false);
  const [modalDeleteCategoryShow, setModalDeleteCategoryShow] = useState(false);
  return (
    <div className="d-flex w-100">
      <ModalWithTwoButtons
        onCancel={() => {
          setModalDeleteCategoryShow(false)
        }}
        onSubmit={() => {
          deleteCategory()
        }}
        text={"Вы уверены, что хотите удалить категорию?"}
        modalShow={modalDeleteCategoryShow}
        cancelText={"Нет"}
        submitText={"Да"}
        showLoading={showLoading}
      />
      <div className="input-group w-100" role="group">
        <input
          type="text"
          className={`form-control ${
            canApply
              ? "is-valid"
              : categoryName !== category.name && "is-invalid"
          }`}
          value={categoryName}
          onChange={(event) => {
            onChangeCategoryName(event.target.value);
          }}
        />
        <button
          disabled={!canApply}
          onClick={() => {
            apply();
          }}
          className="btn btn-success"
        >
          <div className="d-flex justify-content-center align-items-center">
            <i className="bi bi-check2"></i>
          </div>
        </button>
        <button
          disabled={categoryName === category.name}
          onClick={() => {
            resetName();
          }}
          className="btn btn-primary"
        >
          <div className="d-flex justify-content-center align-items-center">
            <i className="bi bi-x"></i>
          </div>
        </button>
        <button onClick={showDeleteModal} className="btn btn-outline-danger">
          <div className="d-flex justify-content-center align-items-center">
            <i className="bi bi-trash"></i>
          </div>
        </button>
      </div>
    </div>
  );
};

export default CategoryItemAdminUpdate;

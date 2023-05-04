import React, { useState } from "react";

export interface ICategoryEditableProps {
  categoryId: string;
  categoryName: string;
  onClick: (categoryId: string, isCheck: boolean) => void;
  isCheck: boolean
  // onChange: (value: string) => void;
  // onDelete: () => void;
  // isValid: boolean;
}

const CategoryEditable: React.FunctionComponent<
  ICategoryEditableProps
> = (props) => {
  // const [productPhoneNumbersIsValid, setProductPhoneNumbersIsValid] = useState<boolean>(false);

  // const [isCheck, setIsCheck] = useState(props.isCheck == null ? false : props.isCheck);
  
  const onClick = () => {
    // setIsCheck(!isCheck);
    props.onClick(props.categoryId, !props.isCheck);
  }

  return (
    <div
      style={{ cursor: "pointer" }}
      className={`rounded border p-2 m-2 btn ${props.isCheck === true ? "btn-dark" : ""}`}
      onClick={onClick}
    >
      <span>{props.categoryName}</span>
    </div>
  );
};

export default CategoryEditable;

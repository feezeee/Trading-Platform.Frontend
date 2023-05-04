import React, { useState } from "react";

import InputMask from 'react-input-mask';

export interface ITextInputPhoneNumberWithDeleteButtonProps {
  index: number;
  value: string;
  onChange: (value: string) => void;
  onDelete: () => void;
  isValid: boolean;
}

const TextInputPhoneNumberWithDeleteButton: React.FunctionComponent<
  ITextInputPhoneNumberWithDeleteButtonProps
> = (props) => {
  // const [productPhoneNumbersIsValid, setProductPhoneNumbersIsValid] = useState<boolean>(false);
  

  return (
    <div className="input-group">
      <InputMask
        mask="+375 (99) 999-99-99"
        className={`form-control ${props.isValid === true ? "is-valid" : "is-invalid"}`}
        value={props.value}
        onChange={(event) => {props.onChange(event.target.value)}}
        required
        placeholder="Номер телефона"
        aria-label="Номер телефона"
        id={`inputMaskPhoneNumber${props.index}`}
        aria-describedby={`spanPhoneNumber${props.index}`}
      />
      <span
        className="input-group-text btn btn-danger"
        id={`spanPhoneNumber${props.index}`}
        // id={`spanPhoneNumber${index}`}
        onClick={() => {props.onDelete()}}
      >
        <i className="bi bi-trash"></i>
      </span>
    </div>
  );
};

export default TextInputPhoneNumberWithDeleteButton;
function userRef(arg0: null) {
  throw new Error("Function not implemented.");
}


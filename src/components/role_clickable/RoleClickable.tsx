import React, { useState } from "react";

export interface IRoleClickableProps {
  roleId: string;
  roleName: string;
  onClick: (roleId: string, isCheck: boolean) => void;
  isCheck: boolean
}

const RoleClickable: React.FunctionComponent<
  IRoleClickableProps
> = (props) => { 
  const onClick = () => {
    props.onClick(props.roleId, !props.isCheck);
  }

  return (
    <div
      style={{ cursor: "pointer" }}
      className={`rounded border p-2 m-2 btn ${props.isCheck === true ? "btn-dark" : ""}`}
      onClick={onClick}
    >
      <span>{props.roleName}</span>
    </div>
  );
};

export default RoleClickable;

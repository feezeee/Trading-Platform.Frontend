import React from "react";

interface IProps {
  productCount: number;
  messageCount: number;
  ariaLabelledby: string;
}

const ProfileMenu: React.FC<IProps> = ({
  productCount,
  messageCount,
  ariaLabelledby,
}) => {
  return (
    <ul
      style={{ fontSize: 18 }}
      className="bg-white dropdown-menu dropdown-menu-end"
      aria-labelledby={ariaLabelledby}
    >
      <li>
        <a className="dropdown-item" href="/my-profile">
          Мой профиль
        </a>
      </li>
      <li>
        <hr className="dropdown-divider" />
      </li>
      <li>
        <a className="dropdown-item" href="/my-messages">
          <span className="pe-2">Мои сообщения</span>
          {messageCount > 1 && (
            <span className="badge bg-danger">
              {messageCount > 99 ? "+99" : messageCount}
            </span>
          )}
        </a>
      </li>
      <li>
        <a className="dropdown-item" href="/my-products">
          <span className="pe-2">Мои товары</span>
          {productCount > 1 && (
            <span className="badge bg-danger">
              {productCount > 99 ? "+99" : productCount}
            </span>
          )}
        </a>
      </li>
      <li>
        <hr className="dropdown-divider" />
      </li>
      <li>
        <div
          role="button"
          className="dropdown-item"
          data-bs-toggle="modal"
          data-bs-target="#staticBackdrop"
        >
          Выход
        </div>        
      </li>
      
    </ul>
  );
};
export default ProfileMenu;

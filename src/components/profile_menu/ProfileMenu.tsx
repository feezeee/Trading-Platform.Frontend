import React from "react";

export interface IProfileMenuProps {
  // productCount: number;
  messageCount: number;
  ariaLabelledby: string;
  logout: () => void;
  roles: string[];
  userId: string;
}

const ProfileMenu: React.FunctionComponent<IProfileMenuProps> = (props) => {
  return (
    <ul
      style={{ fontSize: 18 }}
      className="bg-white dropdown-menu dropdown-menu-end"
      aria-labelledby={props.ariaLabelledby}
    >
      <li>
        <a className="dropdown-item" href={`/profile/${props.userId}`}>
          Мой профиль
        </a>
      </li>
      <li>
        <hr className="dropdown-divider" />
      </li>
      {(props.roles.includes("user") || props.roles.includes("admin")) && (
        <li>
          <a className="dropdown-item" href="/my-messages">
            <span className="pe-2">Мои сообщения</span>
            {props.messageCount > 1 && (
              <span className="badge bg-danger">
                {props.messageCount > 99 ? "+99" : props.messageCount}
              </span>
            )}
          </a>
        </li>
      )}
      {(props.roles.includes("user") || props.roles.includes("admin")) && (
        <li>
          <a className="dropdown-item" href="/my-products">
            <span className="pe-2">Мои товары</span>
            {/* {props.productCount > 1 && (
            <span className="badge bg-danger">
              {props.productCount > 99 ? "+99" : props.productCount}
            </span>
          )} */}
          </a>
        </li>
      )}
      {props.roles.includes("admin") && [
        <li>
          <hr className="dropdown-divider" />
        </li>,
        <li>
          <a className="dropdown-item" href="/categories">
            <span className="pe-2">Категории</span>
          </a>
        </li>,
        <li>
        <a className="dropdown-item" href="/users">
          <span className="pe-2">Пользователи</span>
        </a>
      </li>,
      ]}

      <li>
        <hr className="dropdown-divider" />
      </li>
      <li>
        <div role="button" className="dropdown-item" onClick={props.logout}>
          Выход
        </div>
      </li>
    </ul>
  );
};
export default ProfileMenu;

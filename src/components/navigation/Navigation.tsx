import React, { useState } from "react";

import { GetFullUserEntity } from "../../core/entities/user/GetFullUserEntity";
import ProfileMenu from "../profile_menu/ProfileMenu";
import logo from "../../images/logo.png";
import profileIcon from "../../images/profile-icon.png";

export interface INavbarProps {
  shortUser: GetFullUserEntity | null;
  searchFieldIsHidden: boolean;
  login: () => void;
  logout: () => void;
  registration: () => void;
  onSearch: (query: string) => void;
}

const Navbar: React.FC<INavbarProps> = (props) => {
  const [searchInputValue, setSearchInputValue] = useState("");

  return (
    <div className="border-bottom shadow-sm">
      <div className="container">
        <nav className="navbar navbar-expand">
          <div className="container-fluid justify-content-start">
            <a className="navbar-brand" href="/products">
              <img
                className="d-inline-block"
                src={logo}
                alt="Куплю | Продам"
                width="50"
                height="50"
              />
            </a>
            <div className="w-100">
              {!props.searchFieldIsHidden ? (
                <div className="input-group">
                  <input
                    id="floatSearch"
                    className="form-control"
                    type="search"
                    placeholder="Поиск"
                    aria-label="Поиск"
                    value={searchInputValue}
                    onChange={(event) => {
                      setSearchInputValue(event.target.value)
                    }}  
                  />
                  <button onClick={() => props.onSearch(searchInputValue)} className="btn btn-success" type="submit">
                    Поиск
                  </button>
                </div>
              ) : (
                ""
              )}
            </div>
            {props.shortUser != null ? (
              <div className="w-25 ms-3 marquee">
                {props.shortUser.firstName.length > 0 ? (
                  <span>
                    {"Добро пожаловать, " + props.shortUser.firstName + "!"}
                  </span>
                ) : (
                  <span>{"Добро пожаловать"}</span>
                )}
              </div>
            ) : (
              ""
            )}
            {props.shortUser != null ? (
              <div className="btn-group rounded-circle border text-center ms-3 p-0">
                <div
                  role="button"
                  className="dropdown"
                  id="dropdownMenuProfile"
                  data-bs-toggle="dropdown"
                  data-bs-auto-close="true"
                  aria-expanded="false"
                >
                  <div
                    className="d-flex align-items-center justify-content-center"
                    style={{ width: 50, height: 50 }}
                  >
                    <img width={25} height={25} src={profileIcon} alt="" />
                  </div>
                </div>
                <ProfileMenu
                  // productCount={100}
                  messageCount={12}
                  ariaLabelledby="dropdownMenuProfile"
                  logout={props.logout}
                />
              </div>
            ) : (
              <div className="ms-3 d-flex">
                <button
                  onClick={props.login}
                  type="submit"
                  className=" btn btn-outline-success"
                >
                  Войти
                </button>
                <button
                  type="submit"
                  className="ms-3 btn btn-outline-success"
                  onClick={props.registration}
                >
                  Регситрация
                </button>
              </div>
            )}
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;

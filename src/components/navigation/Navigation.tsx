import React, { useState } from "react";

import { GetUserShortEntity } from "../../core/entities/user/GetUserShortEntity";
import LoginModal from "../login_modal/LoginModal";
import ProfileMenu from "../profile_menu/ProfileMenu";
import logo from "../../images/logo.png";
import profileIcon from "../../images/profile-icon.png";

export interface INavbarProps {
  shortUser: GetUserShortEntity | null,
  searchFieldIsHidden: boolean
}

const Navbar: React.FC<INavbarProps> = (props) => { 
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
                <form className={"d-flex w-100"} role="search">
                  <input
                    id="floatSearch"
                    className="form-control"
                    type="search"
                    placeholder="Поиск"
                    aria-label="Поиск"
                  />
                  <button className="btn btn-success" type="submit">
                    Поиск
                  </button>
                </form>
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
            ) : ("")}
            {/* {props.userFirstName == null ? (
              <div className="d-flex ms-5">
                <div className="d-flex btn">
                  <img src={profileIcon} alt="" width="25" height="25" />
                  <p className="m-0 ms-3">Войти</p>
                </div>
              </div>
            ) : (
              <div className="w-25 ms-3 marquee">
                <span>{"Добро пожаловать, " + props.userFirstName + "!"}</span>
              </div>
            )} */}
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
                  productCount={100}
                  messageCount={12}
                  ariaLabelledby="dropdownMenuProfile"
                />
              </div>
            ) : (
              <button
                data-bs-toggle="modal"
                data-bs-target="#loginModal"
                type="submit"
                className="ms-3 btn btn-outline-success"
              >
                Войти
              </button>
            )}
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;

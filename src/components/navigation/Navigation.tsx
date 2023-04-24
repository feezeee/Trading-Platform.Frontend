import React, { useState } from "react";

import ProfileMenu from "../profile_menu/ProfileMenu";
import logo from "../../images/logo.png";
import profileIcon from "../../images/profile-icon.png";

interface IProps {
  userFirstName: string | null;
  userProfileUrl: string | null;
}

const Navbar: React.FC<IProps> = ({ userFirstName, userProfileUrl }) => {
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
            <form className="d-flex w-100" role="search">
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

            {userFirstName == null ? (
              <div className="d-flex ms-5">
                <div className="d-flex btn">
                  <img src={profileIcon} alt="" width="25" height="25" />
                  <p className="m-0 ms-3">Войти</p>
                </div>
              </div>
            ) : (
              <div className="w-25 ms-3 marquee">
                <span>{"Добро пожаловать, " + userFirstName + "!"}</span>
              </div>
            )}
            <div className="btn-group rounded-circle border text-center ms-3 p-0">
              <div
                role="button"
                className="dropdown"
                id="dropdownMenuProfile"
                data-bs-toggle="dropdown"
                data-bs-auto-close="outside"
                aria-expanded="false"
              >
                <div
                  className="d-flex align-items-center justify-content-center"
                  style={{ width: 50, height: 50 }}
                >
                  <img
                    width={25}
                    height={25}
                    src={userProfileUrl ?? profileIcon}
                    alt=""
                  />
                </div>
              </div>
              <ProfileMenu
                productCount={100}
                messageCount={12}
                ariaLabelledby="dropdownMenuProfile"
              />
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;

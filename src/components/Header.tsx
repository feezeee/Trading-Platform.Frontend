import React, { useState } from "react";

import { GetFullUserEntity } from "../core/entities/user/GetFullUserEntity";
import Navigation from "./navigation/Navigation";

export interface IHeaderProps {
  shortUser: GetFullUserEntity | null;
  searchFieldIsHidden: boolean;
  login: () => void;
  logout: () => void;
  registration: () => void;
  roles: string[];
  changePassword: () => void;
  searchText: string;
  onChangeSearchText: (newSearchText: string) => void;
}

const Header: React.FunctionComponent<IHeaderProps> = (props) => {
  return (
    <header className="bg-white">
      <Navigation
        searchFieldIsHidden={props.searchFieldIsHidden}
        user={props.shortUser}
        login={props.login}
        logout={props.logout}
        registration={props.registration}
        roles={props.roles}
        changePassword={props.changePassword}
        searchInputValue={props.searchText}
        onChangeSearchInputValue={(text) => props.onChangeSearchText(text)}
      />
    </header>
  );
};

export default Header;

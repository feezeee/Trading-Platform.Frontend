import React, { useState } from "react";

import { GetFullUserEntity } from "../core/entities/user/GetFullUserEntity";
import Navigation from "./navigation/Navigation";

export interface IHeaderProps {
  shortUser: GetFullUserEntity | null;
  searchFieldIsHidden: boolean;
  login: () => void;
  logout: () => void;
  registration: () => void;
  onSearch: (query: string) => void;
  roles: string[];
  changePassword: () => void;
}

const Header: React.FunctionComponent<IHeaderProps> = (props) => {
  return (
    <header className="bg-white rounded-bottom-4">
      <Navigation
        onSearch={props.onSearch}
        searchFieldIsHidden={props.searchFieldIsHidden}
        user={props.shortUser}
        login={props.login}
        logout={props.logout}
        registration={props.registration}
        roles={props.roles}
        changePassword={props.changePassword}
      />
    </header>
  );
};

export default Header;

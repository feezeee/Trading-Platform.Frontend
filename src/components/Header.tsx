import React, { useState } from "react";

import { GetUserShortEntity } from "../core/entities/user/GetUserShortEntity";
import Navigation from "./navigation/Navigation";

export interface IHeaderProps {
  shortUser: GetUserShortEntity | null
  searchFieldIsHidden: boolean;
  login: () => void,
  logout: () => void,
  registration: () => void,
  onSearch: (query: string) => void;
}

const Header: React.FunctionComponent<IHeaderProps> = (props) => {
  return (
    <header>
      <Navigation onSearch={props.onSearch} searchFieldIsHidden={props.searchFieldIsHidden} shortUser={props.shortUser} login={props.login} logout={props.logout} registration={props.registration} />
    </header>
  );
};

export default Header;

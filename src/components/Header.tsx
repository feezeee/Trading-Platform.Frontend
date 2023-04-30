import React, { useState } from "react";

import { GetUserShortEntity } from "../core/entities/user/GetUserShortEntity";
import Navigation from "./navigation/Navigation";

export interface IHeaderProps {
  shortUser: GetUserShortEntity | null
  searchFieldIsHidden: boolean;
}

const Header: React.FunctionComponent<IHeaderProps> = (props) => {
  return (
    <header>
      <Navigation searchFieldIsHidden={props.searchFieldIsHidden} shortUser={props.shortUser} />
    </header>
  );
};

export default Header;

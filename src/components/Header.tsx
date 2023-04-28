import Navigation from "./navigation/Navigation";
import React from "react";

export interface IHeaderProps {
    hideSearchField: boolean,
    isAuthorize: boolean,
}

const Header: React.FunctionComponent<IHeaderProps> = (props) => {
  return (
    <header>
      <Navigation userFirstName={"Denis"} hideSearchField={props.hideSearchField} isAuthorize={props.isAuthorize} />
    </header>
  );
};

export default Header;

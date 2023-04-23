import Navigation from "../components/smart/Navigation/Navigation"
import React from "react";

export interface IHeaderProps {}


const Header: React.FunctionComponent<IHeaderProps> = (props) => {
    return (
        <header><Navigation userFirstName={"Denis"} userProfileUrl={null}/></header>
    )
}

export default Header
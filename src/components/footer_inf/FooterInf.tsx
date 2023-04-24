import React from "react";

export interface IFooterInfProps {}


const FooterInf: React.FunctionComponent<IFooterInfProps> = (props) => {
    return (
        <div style={{height: 120,backgroundColor: "#292929"}} className="">
            <span className="text-info">Footer</span>
        </div>
    )
};

export default FooterInf
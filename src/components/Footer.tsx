import FooterInf from "./footer_inf/FooterInf"

export interface IFooterProps {}

const Footer: React.FunctionComponent<IFooterProps> = (props) => {
    return (
        <footer className="mt-auto"><FooterInf/></footer>
    )
}

export default Footer
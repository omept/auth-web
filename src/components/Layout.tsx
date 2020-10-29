import { NavBar } from "./NavBar";
import Wrapper, { WrapperVariant } from "./Wrapper";

export type LayoutProps = {
    variant: WrapperVariant,
    children
}
export const Layout: React.FC<LayoutProps> = ({ children, variant }) => {

    return (
        <>
            <NavBar />
            <Wrapper variant={variant}>
                {children}
            </Wrapper>
        </>
    )
};

export default Layout;
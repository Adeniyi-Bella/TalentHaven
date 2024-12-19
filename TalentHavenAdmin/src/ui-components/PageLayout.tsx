import { pagesPropsInterface } from "../types/types";
import NavBar from "./nav-bar/Navbar";


export const PageLayout = ({children}: pagesPropsInterface) => {
    return (
        <>
            <NavBar />
            <br/>
            {children}
        </>
    );
};
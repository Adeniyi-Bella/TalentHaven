import { Routes, Route } from "react-router-dom";
import { Home } from "../pages/Home";
import { AddPosition } from "../pages/AddPosition";
// import UserProfile from "../pages/user-profile/UserProfile";

/**
 * Component for defining application routes.
 * Uses React Router to manage navigation between different pages.
 * @returns {JSX.Element} The component containing application routes.
 */
export default function PagesRouters(): JSX.Element {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path= "/add" element = {<AddPosition />} />
        </Routes>
    );
}
/**
 * @file Navbar.tsx
 * @description Manages what user sees in the Navbar depending on authentication status
 */

import { Link } from "react-router-dom";
import WelcomeName from "../WelcomeName";
import SignInSignOutButton from "./SignInSignOutButton";
import "./Navbar.css";

/**
 * NavBar Component
 * 
 * This component represents the navigation bar of the application. It includes:
 * - A logo that links to the home page on the left hand side.
 * - A welcome message that greets an authenticated user by name.
 * - A user icon with a dropdown icon at the side.
 * @returns {JSX.Element} The rendered navigation bar depending on if the user is authenticated or not.
 */
const NavBar = (): JSX.Element => {
    return (
        <div className="navbar-parent">
            {/** 
              * Home Page Image
              * Clicking the image navigates the user to the root path ("/").
              */}
            <Link to="/">
                <img
                    className="navbar-islkocher-image"
                    src="./logo.png"
                    alt="ISL Kocher Baustelle Manager"
                />
            </Link>

            {/** 
              * Welcome Message
              * Displays a personalized welcome message for authenticated user.
              */}
            <WelcomeName />

            {/** 
              * Authentication Button
              * Handles user sign-in and sign-out functionality.
              */}
            <SignInSignOutButton />
        </div>
    );
};

export default NavBar;

import { useMsal } from "@azure/msal-react";
import "./Navbar.css";

export const SignOutButton = () => {
    const { instance } = useMsal();
    
        const handleLogout = () => {
            instance.logoutPopup();
        }
    
        return (
            <div>
                <button
                className="navbar-signin-button"
                    onClick={() => handleLogout()}
                >
                    Ausmelden
                </button>
            </div>
        )
};
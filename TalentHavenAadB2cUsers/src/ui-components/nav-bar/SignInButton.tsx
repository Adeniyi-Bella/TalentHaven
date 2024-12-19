import { useMsal } from "@azure/msal-react";
import { loginRequestAdB2C } from "../../config/azureADB2CAuthConfig";
import "./Navbar.css";

export const SignInButton = () => {
    const { instance } = useMsal();

    const handleLogin = () => {

        instance.loginPopup(loginRequestAdB2C);

    }

    return (
        <div>
            <button
            className="navbar-signin-button"
                onClick={() => handleLogin()}
            >
                Anmelden
            </button>
        </div>
    )
};

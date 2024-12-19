import { useMsal } from "@azure/msal-react";
import { loginRequestMicrosoftEntraID } from "../../config/azureADMicrosoftEntraIDAuthConfig";
import "./Navbar.css";

export const SignInButton = () => {
    const { instance } = useMsal();

    const handleLogin = () => {

        instance.loginPopup(loginRequestMicrosoftEntraID);

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

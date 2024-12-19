import { useIsAuthenticated, useMsal } from "@azure/msal-react";
import { SignInButton } from "./SignInButton";
import { SignOutButton } from "./SignOutButton";
import { InteractionStatus } from "@azure/msal-browser";

/**
 * This component dynamically displays either a user to sign-in or a user icon with dropdown icon for other functionalities including signing out
 * based on the user's authentication status. It utilizes MSAL's React hooks to determine authentication state and interaction progress.
 * - If the user is authenticated, the `User Icon Button` is displayed.
 * - If the user is not authenticated and the interaction status is idle, the `SignInButton` is displayed.
 * @returns {JSX.Element | null} The rendered sign-in or user icon, or `null` during redirect/startup processing.
 */
const SignInSignOutButton = (): JSX.Element | null => {
    const { inProgress } = useMsal();
    const isAuthenticated = useIsAuthenticated();

    if (isAuthenticated) {
        return <SignOutButton />;
    } else if (inProgress !== InteractionStatus.Startup && inProgress !== InteractionStatus.HandleRedirect) {
        return <SignInButton />;
    } else {
        return null;
    }
};

export default SignInSignOutButton;

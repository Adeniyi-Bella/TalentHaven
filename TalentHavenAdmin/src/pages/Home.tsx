import { AuthenticatedTemplate, UnauthenticatedTemplate } from "@azure/msal-react";

export function Home() {
    return (
        <>
            <AuthenticatedTemplate>
                Here is the Admin Page. Anything can be here
            </AuthenticatedTemplate>

            <UnauthenticatedTemplate>
                Please sign-in to see your profile information.
            </UnauthenticatedTemplate>
        </>
    );
}
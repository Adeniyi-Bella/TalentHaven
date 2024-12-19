/**
 * @file App.tsx
 * @description Main application component for managing routes, layout, and authentication using MSAL.
 * Includes integration with React Router for navigation and Azure MSAL for authentication.
 */

import { MsalProvider } from "@azure/msal-react";
import { PageLayout } from "./ui-components/PageLayout";
import { interfaceMsalInstance } from "./types/types";
import PagesRouters from "./routes/PagesRouters";

/**
 * Main application component.
 * Provides MSAL authentication context and sets up page routing.
 *
 * @param {pca} : props - Contains the MSAL instance used for authentication.
 * @type {interfaceMsalInstance}
 * @returns {JSX.Element} The root application component rendered in main.tsx.
 */
function App({ pca }: interfaceMsalInstance): JSX.Element {

    return (
       
        <MsalProvider instance={pca}>
            <PageLayout>
                <PagesRouters />
            </PageLayout>
        </MsalProvider>
    );
}

export default App;
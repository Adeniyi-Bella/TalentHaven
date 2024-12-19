/**
 * @file main.tsx
 * Entry point for the React application.
 * Called directly from index.html
 * @description Initializes the MSAL instance for Azure AD B2C authentication,
 * sets up event callbacks, react client side routing and renders the React application.
 */

import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";

/**
 * Importing required modules from MSAL (Microsoft Authentication Library) for browser.
 * - PublicClientApplication: Main class for managing user authentication and authorization.
 * - EventType: Enum defining various MSAL event types.
 * - EventMessage: Interface representing an event message object.
 * - AuthenticationResult: Interface representing the result of an authentication flow.
 */
import { PublicClientApplication, EventType, EventMessage, AuthenticationResult } from "@azure/msal-browser";

/**
 * Importing the configuration for Azure AD B2C authentication.
 * This configuration defines client ID, authority, redirect URIs, and other authentication settings.
 */
import { msalConfigAdB2c } from "./config/azureADB2CAuthConfig.ts";

/**
 * Creating an instance of PublicClientApplication with the provided MSAL configuration.
 * This instance will handle authentication operations throughout the application.
 */
export const msalInstanceADB2C = new PublicClientApplication(msalConfigAdB2c);

/**
 * Immediately invoked asynchronous function to initialize the application and MSAL.
 * Handles account management, event subscriptions, and renders the React application.
 */
(async () => {
    try {
        // Initialize the MSAL instance before using it.
        await msalInstanceADB2C.initialize();

        /**
         * If no active account is set, but accounts are available in the cache, 
         * set the first available account as the active account.
         * This logic can be customized based on application requirements.
         */
        if (!msalInstanceADB2C.getActiveAccount() && msalInstanceADB2C.getAllAccounts().length > 0) {
            msalInstanceADB2C.setActiveAccount(msalInstanceADB2C.getAllAccounts()[0]);
        }

        /**
         * Register an event callback for handling MSAL events.
         * Specifically listens for the LOGIN_SUCCESS event to set the active account 
         * upon a successful login.
         * @param {EventMessage} event - The event message object dispatched by MSAL.
         */
        msalInstanceADB2C.addEventCallback((event: EventMessage) => {
            if (event.eventType === EventType.LOGIN_SUCCESS && event.payload) {
                const payload = event.payload as AuthenticationResult;
                const account = payload.account;
                msalInstanceADB2C.setActiveAccount(account);
            }
        });

        /**
         * Render the React application using ReactDOM.createRoot.
         * The application is wrapped in a Router to enable client-side routing.
         */
        const root = ReactDOM.createRoot(
            document.getElementById("root") as HTMLElement
        );

        root.render(
            <Router>
                {/* Pass the MSAL instance to the App component as a prop */}
                <App pca={msalInstanceADB2C} />
            </Router>
        );
    } catch (error) {
        /**
         * Handle initialization errors and log them to the console.
         */
        console.error("Error initializing MSAL instance:", error);
    }
})();

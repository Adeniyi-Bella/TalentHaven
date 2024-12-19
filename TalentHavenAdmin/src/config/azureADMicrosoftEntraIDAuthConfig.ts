/**
 * Importing the Configuration type from Azure MSAL (Microsoft Authentication Library).
 * This module helps manage authentication and user login sessions.
 */
import { Configuration } from "@azure/msal-browser";

/**
 * Environment variables for configuration, to be injected during build time.
 * Can have different values for different environments (e.g., development, production).
 * These values are injected into the application at build time using environment variables.
 * @type {string} microsoftEntraTenantID - Tenant ID of the registered application.
 * @type {string} microsoftEntraClientID - Client ID of the registered application.
 * @type {string} redirectUri - The URL where the user will be redirected after login.
 * @throws {Error} If any of the required environment variables are not properly configured.
 */
// const b2cSignupSigninUserFlow: string = import.meta.env.VITE_REACT_APP_USER_FLOW;
const microsoftEntraClientID: string = import.meta.env.VITE_REACT_APP_AZURE_ADMIN_CLIENT_ID;
const microsoftEntraTenantID: string = import.meta.env.VITE_REACT_APP_ADMIN_TENANT_ID;
const redirectUri: string = import.meta.env.VITE_REACT_REDIRECT_URI_AFTER_LOGIN;

if (!microsoftEntraClientID || !microsoftEntraTenantID || !redirectUri) {
    throw new Error("Environment variables are not properly configured.");
}

/**
 * Configuration object for MSAL.
 * Defines the library's interaction with Azure AD B2C for authentication.
 * @type {Configuration}
 */
export const msalConfigMicrosoftEntraClientID: Configuration = {
    auth: {
        /**
         * The unique identifier for the Azure AD application.
         * @type {string}
         */
        clientId: microsoftEntraClientID,

        /**
         * The authority URL for the Azure AD B2C tenant and user flow.
         * @type {string}
         */
        authority: `https://login.microsoftonline.com/${microsoftEntraTenantID}`,

        /**
         * The URL where the user will be redirected after login.
         * @type {string}
         */
        redirectUri: redirectUri,
    },
    cache: {
        /**
         * Specifies where tokens are stored. Options: 'localStorage' or 'sessionStorage'.
         * @type {string}
         */
        cacheLocation: "localStorage",

        /**
         * Enables storing the authentication state in cookies for improved cross-browser compatibility.
         * @type {boolean}
         */
        storeAuthStateInCookie: true,
    },
};

/**
 * Scopes you add here will be prompted for user consent during sign-in.
 * By default, MSAL.js will add OIDC scopes (openid, profile, email) to any login request.
 * For more information about OIDC scopes, visit: 
 * https://docs.microsoft.com/en-us/azure/active-directory/develop/v2-permissions-and-consent#openid-connect-scopes
 */
export const loginRequestMicrosoftEntraID = {
    scopes: ["User.Read"]
};


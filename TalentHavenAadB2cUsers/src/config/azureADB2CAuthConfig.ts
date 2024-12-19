/**
 * Importing the Configuration type from Azure MSAL (Microsoft Authentication Library).
 * This module helps manage authentication and user login sessions.
 */
import { Configuration } from "@azure/msal-browser";
 
/**
 * Environment variables for configuration, to be injected during build time.
 * Can have different values for different environments (e.g., development, production).
 * These values are injected into the application at build time using environment variables.
 * @type {string} b2cSignupSigninUserFlow - The user flow defining authentication scenarios.
 * @type {string} b2cTenantName - Azure AD B2C tenant name.
 * @type {string} b2cClientId - Client ID of the registered application.
 * @type {string} b2cRedirectUriAfterLogin - The URL where the user will be redirected after login.
 * @type {string} b2cRedirectUriAfterLogout - The URL where the user will be redirected after logout.
 * @throws {Error} If any of the required environment variables are not properly configured.
 */
const b2cSignupSigninUserFlow: string = import.meta.env.VITE_REACT_APP_USER_FLOW;
const b2cTenantName: string = import.meta.env.VITE_REACT_APP_TENANT_NAME;
const b2cClientId: string = import.meta.env.VITE_REACT_APP_AZURE_CLIENT_ID;
const b2cRedirectUriAfterLogin: string = import.meta.env.VITE_REACT_REDIRECT_URI_AFTER_LOGIN;
const b2cRedirectUriAfterLogout: string = import.meta.env.VITE_REACT_REDIRECT_URI_AFTER_LOGOUT;

if (!b2cSignupSigninUserFlow || !b2cTenantName || !b2cClientId || !b2cRedirectUriAfterLogin || !b2cRedirectUriAfterLogout) {
    throw new Error("Environment variables are not properly configured.");
}

/**
 * Configuration object for MSAL.
 * Defines the library's interaction with Azure AD B2C for authentication.
 * @type {Configuration}
 */
export const msalConfigAdB2c: Configuration = {
    auth: {
        /**
         * The unique identifier for the Azure AD application.
         * @type {string}
         */
        clientId: b2cClientId,

        /**
         * The authority URL for the Azure AD B2C tenant and user flow.
         * @type {string}
         */
        authority: `https://${b2cTenantName}.b2clogin.com/${b2cTenantName}.onmicrosoft.com/${b2cSignupSigninUserFlow}`,

        /**
         * List of trusted domains for authentication requests.
         * @type {string[]}
         */
        knownAuthorities: [`${b2cTenantName}.b2clogin.com`],

        /**
         * The URL where the user will be redirected after login.
         * @type {string}
         */
        redirectUri: b2cRedirectUriAfterLogin,

        /**
         * The URL where the user will be redirected after logout.
         * @type {string}
         */
        postLogoutRedirectUri: b2cRedirectUriAfterLogout,

        /**
         * Determines if users are redirected to the original request URL after authentication.
         * @type {boolean}
         */
        navigateToLoginRequestUrl: true,
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

const allScopes = [
    "openid", // Grants access to basic user information.
    "profile", // Accesses the user's profile information.
    "email", // Retrieves the user's email address.
];

/**
 * Login request configuration.
 * Specifies the permissions (scopes) and prompt behavior for user login.
 * @type {}
 */
export const loginRequestAdB2C = {
    scopes: allScopes,
};

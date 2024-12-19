import { IPublicClientApplication } from "@azure/msal-browser";

export interface interfaceMsalInstance {
    pca: IPublicClientApplication;
}

export interface loginRequestInterface {
    scopes: string[];
    prompt: string;
}

export interface pagesPropsInterface {
    children?: React.ReactNode;
}
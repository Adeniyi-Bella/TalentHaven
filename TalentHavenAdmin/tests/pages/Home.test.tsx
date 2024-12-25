/**
 * @file Home.test.tsx
 * @description Tests for the Home component, verifying authenticated and unauthenticated views.
 */

import { it, expect, describe, beforeEach, afterEach } from "vitest"
import { render, screen } from "@testing-library/react";
import { Home } from "../../src/pages/Home";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom/vitest";
import { MsalProvider } from "@azure/msal-react";
import { MsalReactTester } from "msal-react-tester";

/**
 * Test suite for the Home page.
 * Uses MSAL React Tester library to differentiate between an authenticated and unauthenticated user
 * It does not connect to Azure AD, but instead uses a mock up solution.
 */
describe("Home", () => {
    let msalTester: MsalReactTester;

    /**
    * Sets up MSAL React Tester before each test.
    * 
    */
    beforeEach(() => {
        msalTester = new MsalReactTester();
        msalTester.spyMsal();
    });

    /**
     * Resets MSAL React Tester after each test.
     */
    afterEach(() => {
        msalTester.resetSpyMsal();
    });

    /**
     * Test to verify the authenticated view renders correctly when the user is logged in.
     */
    it("renders the authenticated view when user is logged in", async () => {

        await msalTester.isLogged();

        render(
            <MsalProvider instance={msalTester.client}>
                <MemoryRouter>
                    <Home />
                </MemoryRouter>
            </MsalProvider>
        );

        await msalTester.waitForRedirect();

        const addButton = screen.getByText("ADDS");
        const editButton = screen.getByText("EDIT/DELETE");
        expect(addButton).toBeInTheDocument();
        expect(editButton).toBeInTheDocument();

        /**
        * Logs the Dom element.
        */
        screen.debug();

    });

    /**
    * Test to verify the unauthenticated view renders correctly when the user is logged out.
    */
    it("renders the unauthenticated view when user is logged out", async () => {
        await msalTester.isNotLogged();

        render(
            <MsalProvider instance={msalTester.client}>
                <MemoryRouter>
                    <Home />
                </MemoryRouter>
            </MsalProvider >
        );

        await msalTester.waitForRedirect();

        const unauthenticatedMessage = screen.getByText(
            "Please sign-in to see your profile information."
        );
        expect(unauthenticatedMessage).toBeInTheDocument();

        expect(screen.queryByText("ADDS")).not.toBeInTheDocument();
        expect(screen.queryByText("EDIT/DELETE")).not.toBeInTheDocument();

        screen.debug();
    });
});

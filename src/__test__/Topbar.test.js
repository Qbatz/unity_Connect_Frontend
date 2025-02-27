import { render, screen } from "@testing-library/react";
import TopBar from "../Component/TopBar";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";

describe('checks for top bar UI', () => {
    it('it should check for topbar UI and action', () => {
        render(
            <BrowserRouter>
                <TopBar />
            </BrowserRouter>
        )

        const buttonMenu = screen.getByTestId('button-menu');
        const buttonSignIn = screen.getByTestId('button-sign-in')
        expect(buttonMenu).toBeInTheDocument()
        expect(buttonSignIn).toBeInTheDocument()
        userEvent.click(buttonMenu)
        userEvent.click(buttonSignIn)
        expect(global.window.location.pathname).toBe('/sign-in')
    })

    it('it should check for topbar UI and action for create-account', () => {
        render(
            <BrowserRouter>
                <TopBar />
            </BrowserRouter>
        )

        const buttonMenu = screen.getByTestId('button-menu');
        const buttonCreateAccount = screen.getByTestId('button-create-account');
        expect(buttonMenu).toBeInTheDocument()
        expect(buttonCreateAccount).toBeInTheDocument();
        userEvent.click(buttonMenu)
        userEvent.click(buttonCreateAccount)
        expect(global.window.location.pathname).toBe('/create-account')
    })

    it('it should check for topbar UI and action for login and navigate to login screen', () => {
        render(
            <BrowserRouter>
                <TopBar />
            </BrowserRouter>
        )

        const buttonMenu = screen.getByTestId('button-menu');
        expect(buttonMenu).toBeInTheDocument()
        userEvent.click(buttonMenu)

        const buttonSignIn = screen.getByTestId('button-signin')
        expect(buttonSignIn).toBeInTheDocument()
        userEvent.click(buttonSignIn)
        expect(global.window.location.pathname).toBe('/sign-in')
    })

    it('it should check for topbar UI and action for login and navigate to create account screen', () => {
        render(
            <BrowserRouter>
                <TopBar />
            </BrowserRouter>
        )

        const buttonMenu = screen.getByTestId('button-menu');
        expect(buttonMenu).toBeInTheDocument()
        userEvent.click(buttonMenu);
        const buttonCreateAccount = screen.getByTestId('button-create-account-2')
        expect(buttonCreateAccount).toBeInTheDocument()
        userEvent.click(buttonCreateAccount)
        expect(global.window.location.pathname).toBe('/create-account')
    })
})
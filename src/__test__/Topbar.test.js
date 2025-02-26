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
})
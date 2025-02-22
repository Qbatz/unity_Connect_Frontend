import { render, screen } from "@testing-library/react";
import CreateAccount from "../../Pages/AccountManagement/CreateAccount";
import userEvent from '@testing-library/user-event'
import configureStore from 'redux-mock-store';
import { Provider, useSelector } from "react-redux";
import { MemoryRouter } from "react-router-dom";

describe('checks for Create account', () => {

    const mockStore = configureStore()
    const store = mockStore({
       
            CreateAccount: {
                statusCodeCreateAccount: 200
            }

    })

    it('checks for UI render', () => {

        render(<Provider store={store}>
            <MemoryRouter>
                <CreateAccount />
            </MemoryRouter>
        </Provider>
        )
        expect(screen.getByTestId('create-account')).toBeInTheDocument()
        const inputEmail = screen.getByTestId('input-email')
        const firstName = screen.getByTestId('input-fname')
        const lasttName = screen.getByTestId('input-lname')
        const password = screen.getByTestId('input-password')
        const conPassword = screen.getByTestId('con-password')
        const mobileNumber = screen.getByTestId('input-mobile')
        const buttonSHowConfirmPassword = screen.getByTestId('show-confirm-password')
        const buttonShowPassword = screen.getByTestId('button-show-password')
        const buttonSubmit = screen.getByTestId('button-submit')
        expect(inputEmail).toBeInTheDocument();
        expect(firstName).toBeInTheDocument();
        expect(lasttName).toBeInTheDocument();
        expect(password).toBeInTheDocument();
        expect(conPassword).toBeInTheDocument();
        expect(mobileNumber).toBeInTheDocument()
        expect(buttonSHowConfirmPassword).toBeInTheDocument()
        expect(buttonShowPassword).toBeInTheDocument()
        expect(buttonSubmit).toBeInTheDocument()

        userEvent.type(inputEmail, 'abd@gmail.com')
        userEvent.type(firstName, 'Test')
        userEvent.type(lasttName, 'User')
        userEvent.type(password, 'abcdef')
        userEvent.type(conPassword, 'abcdef')
        userEvent.type(mobileNumber, '9876654439')
        userEvent.click(buttonSHowConfirmPassword)
        userEvent.click(buttonShowPassword)
        userEvent.click(buttonSubmit)

    })

    it('it should throw error when passing null values', () => {
        render(<Provider store={store}>
            <MemoryRouter>
            <CreateAccount />
            </MemoryRouter>
        </Provider>)
        expect(screen.getByTestId('create-account')).toBeInTheDocument()
        const inputEmail = screen.getByTestId('input-email')
        const firstName = screen.getByTestId('input-fname')
        const lasttName = screen.getByTestId('input-lname')
        const password = screen.getByTestId('input-password')
        const conPassword = screen.getByTestId('con-password')
        const mobileNumber = screen.getByTestId('input-mobile')
        const buttonSHowConfirmPassword = screen.getByTestId('show-confirm-password')
        const buttonShowPassword = screen.getByTestId('button-show-password')
        const buttonSubmit = screen.getByTestId('button-submit')
        userEvent.type(firstName, ' ')
        expect(buttonSubmit).toBeInTheDocument()

        userEvent.click(buttonSubmit)

    })
})
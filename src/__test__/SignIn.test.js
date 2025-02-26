/* eslint-env jest */
import { render, screen,act } from "@testing-library/react";
import SignIn from "../Pages/AccountManagement/SignIn";
import configureStore from 'redux-mock-store';
import { Provider } from "react-redux";
import userEvent from '@testing-library/user-event'
import { BrowserRouter, MemoryRouter } from "react-router-dom";

jest.useFakeTimers()
describe('test signIn UI', () => {

    beforeEach(() => {
        jest.useFakeTimers(); // Mock timers
      });
    
      afterEach(() => {
        jest.useRealTimers(); // Restore real timers
      });

    const mockStore = configureStore()
        const store = mockStore({
            SignIn: {
                isLoggedIn: false,
                statusCode: 100
              },
    
        })

    it('it will check for UI renders', () => {
        render(
            <Provider store={store}>
                <BrowserRouter>
                <SignIn />
                </BrowserRouter>
            </Provider>
        )

        const inputEmail = screen.getByTestId('input-email');
        const inputPassword = screen.getByTestId('input-password');
        const showPassword = screen.getByTestId('button-show-password');
        const buttonSubmit = screen.getByTestId('button-submit');
        const createAccount = screen.getByTestId('link-create-account');
        expect(inputEmail).toBeInTheDocument();
        expect(inputPassword).toBeInTheDocument();
        expect(showPassword).toBeInTheDocument();
        expect(buttonSubmit).toBeInTheDocument()
        expect(createAccount).toBeInTheDocument();

        userEvent.type(inputEmail, 'abcd@gmail.com')
        userEvent.type(inputPassword, 'abcdef')
        userEvent.click(showPassword)
        userEvent.click(buttonSubmit)
        userEvent.click(createAccount);
        expect(global.window.location.pathname).toBe('/create-account')

    })

    it('it should check for empty email id and password', () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                <SignIn />
                </MemoryRouter>
            </Provider>
        )

        const inputEmail = screen.getByTestId('input-email')
        const inputPassword = screen.getByTestId('input-password')
        const buttonSubmit = screen.getByTestId('button-submit')

        userEvent.type(inputEmail, ' ')
        userEvent.type(inputPassword, ' ')
        userEvent.click(buttonSubmit)
        const errorEmailLabel = screen.getByTestId('label-error-email')
        expect(errorEmailLabel).toBeInTheDocument();
        userEvent.type(inputEmail, "abcd@gmail.com")
        expect(errorEmailLabel).not.toBeInTheDocument();
    })

    it('it should check for invalid email id and password', () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                <SignIn />
                </MemoryRouter>
            </Provider>
        )

        const inputEmail = screen.getByTestId('input-email')
        const inputPassword = screen.getByTestId('input-password')
        const buttonSubmit = screen.getByTestId('button-submit')

        userEvent.type(inputEmail, ' ')
        userEvent.type(inputPassword, ' ')
        userEvent.click(buttonSubmit)
        const errorEmailLabel = screen.getByTestId('label-error-email')
        const errorPasswordLabel = screen.getByTestId('input-error-password')
        expect(errorEmailLabel).toBeInTheDocument();
        expect(errorPasswordLabel).toBeInTheDocument();
        userEvent.type(inputEmail, "abcd@gmail.com");
        jest.advanceTimersByTime(2000);
        userEvent.type(inputPassword, 'abcdef');
        jest.advanceTimersByTime(2000);
        expect(errorEmailLabel).not.toBeInTheDocument();
        expect(errorPasswordLabel).not.toBeInTheDocument();
    })

    it('it should validate invalid emailId', () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                <SignIn />
                </MemoryRouter>
            </Provider>
        )

        const inputEmail = screen.getByTestId('input-email')
        userEvent.type(inputEmail, 'abcd')
        const buttonSubmit = screen.getByTestId('button-submit')

        userEvent.click(buttonSubmit)
        const errorEmailLabel = screen.getByTestId('label-error-email')
        expect(errorEmailLabel).toBeInTheDocument();
    })

    it('it returns status 200 from server', () => {

        const store = mockStore({
            SignIn: {
                isLoggedIn: true,
                statusCode: 200,
                signinsuccessstatuscode: 200
              },
    
        })
        render(
            <Provider store={store}>
                <MemoryRouter>
                <SignIn />
                </MemoryRouter>
            </Provider>
        )
        act(() => {
            jest.advanceTimersByTime(100);
          });
    })

    it('it should return invalid emailId and password from server', () => {
        const store = mockStore({
            SignIn: {
                isLoggedIn: false,
                statusCode: 201,
                errorPassword: "Invalid Passord",
                errorEmail: "Invalid Email Id"
              },
    
        })
        render(
            <Provider store={store}>
                <BrowserRouter>
                <SignIn />
                </BrowserRouter>
            </Provider>
        )

        expect(screen.getByTestId('img-logo')).toBeInTheDocument();
        userEvent.click(screen.getByTestId('img-logo'))
        expect(global.window.location.pathname).toBe('/LandingPage')
    })

})
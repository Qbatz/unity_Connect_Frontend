import { render, screen } from '@testing-library/react';
import App from './App';
import configureStore from 'redux-mock-store';
import { Provider, useSelector } from "react-redux";
import SignIn from './Pages/AccountManagement/SignIn';
import { decryptLogin, encryptPassword, decryptPassword } from './Crypto/Utils';

jest.mock('./Crypto/Utils', () => ({
  decryptLogin: jest.fn(),
  encryptPassword: jest.fn(),
  decryptPassword: jest.fn()
}))
test('renders learn react link', () => {
  const mockStore = configureStore()
  const store = mockStore({
    SignIn: {
      isLoggedIn: false
    },
    CreateAccount: {
      statusCodeCreateAccount: 100
    }
  })
  localStorage.setItem("unity_connect_login", "encryptedData");

  render(<Provider store={store}>
    <App />
  </Provider>);
  const linkElement = screen.getByTestId("container");
  expect(linkElement).toBeInTheDocument();
});

test('renders when user is not logged id', () => {
  decryptLogin.mockReturnValue('true');
  decryptPassword.mockReturnValue('abcd')
  const mockStore = configureStore()
  const store = mockStore({
    SignIn: {
      isLoggedIn: true
    },
    CreateAccount: {
      statusCodeCreateAccount: 100
    }
  })

  localStorage.setItem("unity_connect_login", "encryptedData");

  render(<Provider store={store}>
    <App />
  </Provider>);
  const linkElement = screen.getByTestId("container");
  expect(linkElement).toBeInTheDocument();
})

import { render, screen } from '@testing-library/react';
import App from './App';
import configureStore from 'redux-mock-store';
import { Provider } from "react-redux";
import { encryptData, decryptData } from './Crypto/Utils';

jest.mock('./Crypto/Utils', () => ({
  encryptData: jest.fn(),
  decryptData: jest.fn()
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
  const linkElement = screen.getByTestId("parent");
  expect(linkElement).toBeInTheDocument();
});

test('renders when user is not logged id', () => {
  decryptData.mockReturnValue('true');
  encryptData.mockReturnValue('abcd')
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
  const linkElement = screen.getByTestId("parent");
  expect(linkElement).toBeInTheDocument();
})

import { render, screen } from '@testing-library/react';
import App from './App';
import configureStore from 'redux-mock-store';
import { Provider } from "react-redux";
import { encryptData, decryptData } from './Crypto/Utils';
import Cookies from 'universal-cookie';

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

test('it should checks for access denied', () => {
  let cookies = {
    get: jest.fn((key) => {
      if (key === 'Unity_ConnectToken_Access-Denied') return 200;
      return null;
    }),
    set: jest.fn(),
  };

  jest.spyOn(Cookies.prototype, 'get').mockImplementation(cookies.get);
  jest.spyOn(Cookies.prototype, 'set').mockImplementation(cookies.set);
  const mockStore = configureStore()
  const store = mockStore({
    SignIn: {
      isLoggedIn: false
    },
    CreateAccount: {
      statusCodeCreateAccount: 100
    }
  })
  cookies.get.mockReturnValue(206);
  localStorage.setItem("unity_connect_login", "encryptedData");
  

  render(<Provider store={store}>
    <App />
  </Provider>);


})

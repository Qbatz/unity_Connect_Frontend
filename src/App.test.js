import { render, screen } from '@testing-library/react';
import App from './App';
import configureStore from 'redux-mock-store';
import { Provider, useSelector } from "react-redux";

test('renders learn react link', () => {
  const mockStore = configureStore()
  const store = mockStore({
  })
  render(<Provider store={store}>
    <App />
  </Provider>);
  const linkElement = screen.getByTestId("container");
  expect(linkElement).toBeInTheDocument();
});

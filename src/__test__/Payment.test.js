import { render } from "@testing-library/react";
import Payment from "../Pages/Settings/Payment";
import { Provider } from "react-redux";
import configureStore from 'redux-mock-store';

describe('Load UI for Payments', () => {

    const mockStore = configureStore()
                const store = mockStore({
            
                })
    it('it should check for UI renders', () => {
        render(
            <Provider store={store}>
                <Payment />
            </Provider>
        )
    })
})
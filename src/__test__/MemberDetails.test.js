import { render, screen } from "@testing-library/react";
import MemberDetails from "../Pages/Members/MemberDetails";
import { Provider } from "react-redux";
import configureStore from 'redux-mock-store';
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";

describe('it should check the member details', () => {

    const mockStore = configureStore()
        const store = mockStore({
            Member: {
                Memberdata: [],
                statusCodeMemberList: 200
            }
        })
    
    it('it will render the member details', () => {
        const props = {
            User_Name: 'ABCD',
            Member_Id: 1234
        }
        render(
        <Provider store={store}>
            <BrowserRouter>
                <MemberDetails member={props}/>
            </BrowserRouter>
        </Provider>)

        const userInfoDiv = screen.getByTestId('userinfo-div');
        expect(userInfoDiv).toBeInTheDocument();
        const divTabs = screen.getByTestId('div-tabs');
        expect(divTabs).toBeInTheDocument();

        const tabButton = screen.getByTestId('button-tab-0');
        expect(tabButton).toBeInTheDocument();

        userEvent.click(tabButton)
    })
})
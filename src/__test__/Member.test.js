import { render, screen } from "@testing-library/react";
import Members from "../Pages/Members/Member";
import { Provider } from "react-redux";
import configureStore from 'redux-mock-store';
import userEvent from "@testing-library/user-event";


describe('it should load the member UI', () => {

    const mockStore = configureStore()
    const store = mockStore({
        Member: {
            Memberdata: [],
            statusCodeMemberList: 200
        }
    })

    it('it should render member UI', () => {
        render(<Provider store={store}>
            <Members />
        </Provider>)

        const membersTab = screen.getByTestId('members-tab')
        expect(membersTab).toBeInTheDocument();
        expect(membersTab.children).toHaveLength(2);
        const activeTab = screen.getByTestId('button-tab-0');

        userEvent.click(activeTab);
        const activeMemberDiv = screen.getByTestId('active-member-div')
        expect(activeMemberDiv).toBeInTheDocument();

        const inactiveTab = screen.getByTestId('button-tab-1');
        userEvent.click(inactiveTab);
        const inactiveMemberDiv = screen.getByTestId('inactive-member-div');
        expect(inactiveMemberDiv).toBeInTheDocument();
    })
})
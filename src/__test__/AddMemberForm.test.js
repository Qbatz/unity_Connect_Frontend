import { render, screen } from "@testing-library/react";
import AddMemberForm from "../Members/AddMemberForm";
import { Provider } from "react-redux";
import configureStore from 'redux-mock-store';
import userEvent from '@testing-library/user-event'

describe('it should check for add member form UI', () => {

    const mockStore = configureStore()
    const store = mockStore({

        addMember: {
            statusCodeForAddUser: 200
        }

    })

    const onClose = jest.fn()

    it('it should render a basic UI', () => {
        render(<Provider store={store}>
            <AddMemberForm onClose={onClose}/>
        </Provider>)

        const buttonClose = screen.getByTestId('button-close')
        expect(buttonClose).toBeInTheDocument()
        const inputMemberId = screen.getByTestId('input-member-id');
        const inputUserName = screen.getByTestId('input-user-name');
        const inputMemberEmail = screen.getByTestId('input-member-email');
        const inputMobileNo = screen.getByTestId('input-member-phone');
        const inputJoiningDate = screen.getByTestId('input-joining-data');
        const inputMemberAddress = screen.getByTestId('input-member-address');
        expect(inputMemberId).toBeInTheDocument();
        expect(inputUserName).toBeInTheDocument();
        expect(inputMemberEmail).toBeInTheDocument();
        expect(inputMobileNo).toBeInTheDocument();
        expect(inputJoiningDate).toBeInTheDocument();
        expect(inputMemberAddress).toBeInTheDocument();

        userEvent.type(inputMemberId, 'abcd1234');
        userEvent.type(inputMemberEmail, 'abcd1234@gmail.com');
        userEvent.type(inputUserName, 'abcd1234');
        userEvent.type(inputMobileNo, '9876543210');
        userEvent.type(inputJoiningDate, '28-02-2025');
        userEvent.type(inputMemberAddress, 'abcd1234, abcd, state');

        userEvent.click(buttonClose)

    })
})
import { render, screen } from "@testing-library/react";
import AddMemberForm from "../Members/AddMemberForm";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import configureStore from 'redux-mock-store';
import userEvent from '@testing-library/user-event'

describe('it should check for add member form UI', () => {

    const mockStore = configureStore()
    const store = mockStore({

        addMember: {
            statusCodeForAddUser: 200
        }

    })

    it('it should render a basic UI', () => {
        render(<Provider store={store}>
            <AddMemberForm />
        </Provider>)

        const buttonClose = screen.getByTestId('button-close')
        expect(buttonClose).toBeInTheDocument()
        userEvent.click(buttonClose)
    })
})
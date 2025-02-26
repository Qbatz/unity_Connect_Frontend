import { render, screen } from "@testing-library/react";
import NonActivemember from "../Members/NonActivemember";
import configureStore from 'redux-mock-store';
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";

describe('test UI for non active members', () => {
    const mockStore = configureStore()
    const store = mockStore({

        Member: {
            Memberdata: [],
            statusCodeMemberList: 200
        }

    })

    it('it will check for non active members UI', () => {
        render(<Provider store={store}>
            <MemoryRouter>
                <NonActivemember />
            </MemoryRouter>
    
        </Provider>)

        expect(screen.getByTestId('button-add-member')).toBeInTheDocument()
    })


    it('it will check for non active members UI when it has more than one member', () => {
        const store = mockStore({

            Member: {
                Memberdata: [{
                    User_Name: 'ABCD',
                    Member_Id: 100,
                    subscription: 'Subscribed',
                    Status: 'Active',
                    Email_Id: 'abcd@gmail.com',
                    Mobile_No: '98766543728',
                    Address: 'Test address',
                    Joining_Date: '26-Feb-2025'
                },
                {
                    User_Name: 'XYZ',
                    Member_Id: 101,
                    subscription: 'Subscribed',
                    Status: 'Inactive',
                    Email_Id: 'abcd@gmail.com',
                    Mobile_No: '98766543728',
                    Address: 'Test address',
                    Joining_Date: '26-Feb-2025'
                }],
                statusCodeMemberList: 200
            }
    
        })

        render(<Provider store={store}>
            <MemoryRouter>
                <NonActivemember />
            </MemoryRouter>
    
        </Provider>)

        expect(screen.getByTestId('button-add-member')).toBeInTheDocument();
        const buttonToggleMenu = screen.getByTestId('button-toggle-menu0');
        userEvent.click(buttonToggleMenu)
        const editContainer = screen.getByTestId('edit-container')
        expect(editContainer).toBeInTheDocument()

        userEvent.click(document.body)
        userEvent.click(buttonToggleMenu);
        userEvent.click(buttonToggleMenu)
    })
})
import { render, screen } from "@testing-library/react";
import Activemember from "../Pages/Members/Activemember";
import { Provider } from "react-redux";
import configureStore from 'redux-mock-store';
import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";


describe('checks for active members', () => {
     const mockStore = configureStore()
        const store = mockStore({
    
            Member: {
                ActiveMemberdata: [],  
                statusCodeMemberList: 200
            }
    
        })

    it('checks UI for active members', () => {
        render(
            <Provider store={store}>
                  <MemoryRouter>
                <Activemember />
                </MemoryRouter>
            </Provider>
        )
    })

    it('it will check for non active members UI when it has more than one member', async () => {
        const store = mockStore({

            Member: {
                ActiveMemberdata: [{
                    User_Name: 'ABCD',
                    Member_Id: 100,
                    subscription: 'Subscribed',
                    Status: 'Active',
                    Email_Id: 'abcd@gmail.com',
                    Mobile_No: '98766543728',
                    Address: 'Test address',
                    Joining_Date: '26-Feb-2025'
                }],
                NonActiveMemberdata : [
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
            },
            addMember: {
                statusCodeForAddUser: 100
            }
    
        })

        render(<Provider store={store}>
            <MemoryRouter>
                <Activemember />
            </MemoryRouter>
    
        </Provider>)

        // const buttonAddMember = screen.getByTestId('button-add-member')
        // expect(buttonAddMember).toBeInTheDocument();
        const buttonToggleMenu = screen.getByTestId('button-toggle-menu0');
        userEvent.click(buttonToggleMenu)
        const editContainer = screen.getByTestId('edit-container')
        expect(editContainer).toBeInTheDocument()

        const buttonEditMember = screen.getByTestId('button-edit-member-0')
        expect(buttonEditMember).toBeInTheDocument()
        userEvent.click(buttonEditMember)
        
        userEvent.click(document.body)
        userEvent.click(buttonToggleMenu);
        userEvent.click(buttonToggleMenu)
        // userEvent.click(buttonAddMember)
    })
})
import { render, screen } from "@testing-library/react";
import Sidebar from "../Component/Sidebar";
import configureStore from 'redux-mock-store';
import { Provider } from "react-redux";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
describe('render and check sidebar functionalities', () => {
    
    const mockStore = configureStore()
            const store = mockStore({
                addMember: {
                    statusCodeForAddUser : 200
                  },
                  Settings: {
                    statusCodeMemberID : 200
                  },
                Member: {
                    ActiveMemberdata: [],  
                    NonActiveMemberdata: [] ,
                    statusCodeMemberList:200
                },  
                Loan: {
                    statusCodeLoans: 200
                },
                Statement: {
                    id: 0,
                    StatementList: [],
                    statusCodeForStatement:0,
                    StatementErrorMsg: '',
                },
                Expenses: {
                    getexpenses: []
                },
                SignIn: {
                    profileDetailsList: []
                },
                Report: {
                    statusCodeLoans: 200,
                    getReport: {
                        unsuccessfullPayment: []
                    }
                }
        
            })

    it('it should check for side bar UI', () => {
        render(<Provider store={store}>
            <MemoryRouter>
                <Sidebar />
            </MemoryRouter>
        </Provider>)

        expect(screen.getByTestId('container-main')).toBeInTheDocument();
        const toggleButton = screen.getByTestId('button-toggle')
        const menuItem = screen.getByTestId('menu-item-0')
        // expect(toggleButton).toBeInTheDocument();
        expect(menuItem).toBeInTheDocument()
        userEvent.click(toggleButton)
        userEvent.click(menuItem)
    })

    it('it should check for collapse the sidebar', () => {
        render(<Provider store={store}>
            <MemoryRouter>
                <Sidebar />
            </MemoryRouter>
        </Provider>)

        expect(screen.getByTestId('container-main')).toBeInTheDocument();

    })

    it('it should UI and select member', () => {
        render(<Provider store={store}>
               <MemoryRouter>
                    <Sidebar />
            </MemoryRouter>
        </Provider>)

        expect(screen.getByTestId('container-main')).toBeInTheDocument();
        // const defaultItem = screen.getByTestId('div-dashboard')
        // expect(defaultItem).toBeInTheDocument();
        const menuItem = screen.getByTestId('menu-item-1')
        expect(menuItem).toBeInTheDocument();
        userEvent.click(menuItem)
       
    })

    it('it should UI and select member for window width < 768', () => {
        Object.defineProperty(window, "innerWidth", {
            writable: true, 
            configurable: true, 
            value: 500, 
          });

        render(<Provider store={store}>
            <MemoryRouter>
            <Sidebar />
            </MemoryRouter>
        </Provider>)

        expect(screen.getByTestId('container-main')).toBeInTheDocument();
        
    })

})
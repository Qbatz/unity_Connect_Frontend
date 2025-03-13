import AddLoanForm from "../Pages/Loan/AddLoanForm";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from 'redux-mock-store';
import userEvent from "@testing-library/user-event";

describe('it should check for add loan form', () => {

    const mockStore = configureStore()
    const store = mockStore({

        Loan: {
            statusCodeLoans: 200,
            getLoanTab: [{
                Approved_Amount: null,
                Approvel_Date: null,
                Member_Id: 1,
                Loan_Id: 1001,
                Loan_Amount: 100000,
                Witness_Details: [{
                    Widness_Id: 1,
                    Id: 100,
                    User_Name: 'Test User',
                    Member_Id: 2
                }]
            }]
        },
        Member: {
            ActiveMemberdata: [{ Id: 1, User_Name: 'Member 1' }]
        }

    })

    it('it should check for the basic render', () => {
        render(<Provider store={store}>
            <AddLoanForm />
        </Provider>)

        expect(screen.getByTestId('div-container')).toBeInTheDocument();
    })

    it('it should check for the basic render and click the loan request', () => {
        render(<Provider store={store}>
            <AddLoanForm />
        </Provider>)

        const buttonRequestLoan = screen.getByTestId('button-request-loan')
        expect(buttonRequestLoan).toBeInTheDocument();
        userEvent.click(buttonRequestLoan)
        const divModel = screen.getByTestId('div-model');
        const divClose = screen.getByTestId('img-close')
        expect(divModel).toBeInTheDocument();
        expect(divClose).toBeInTheDocument();
        userEvent.click(divClose);
        expect(divModel).not.toBeInTheDocument();
    })

    it('it should check for the basic render and add witness', () => {
        render(<Provider store={store}>
            <AddLoanForm />
        </Provider>)
        
        const buttonRequestLoan = screen.getByTestId('button-request-loan');
        expect(buttonRequestLoan).toBeInTheDocument();
        userEvent.click(buttonRequestLoan);
        screen.debug();
        // const addWitness = screen.getByTestId('div-add-witness-0');
        // expect(addWitness).toBeInTheDocument();
    })

})
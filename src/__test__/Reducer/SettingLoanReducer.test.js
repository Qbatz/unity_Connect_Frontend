import SettingLoanReducer, { initialState } from "../../Redux/Reducer/SettingLoanReducer";

describe('it will check for settings loan reducers', () => {
    it('it will check for SETTINGADDLOAN', () => {
        const action = {
            type: 'SETTINGADDLOAN',
            payload: {
                loan_name: 'ABC',
                due_on: '28-02-25',
                due_type: 'Daily',
                due_count: 1,
                statusCode: 200,
                interest: '6.5'
            }
        }
        expect(SettingLoanReducer(initialState, action)).toStrictEqual({
            loanname: "ABC",
            dueon: "28-02-25",
            duetype: "Daily",
            dueamount: 1,
            statusCodeLoans: 0,
            statusCodeLoansAdd: 200,
            interest: "6.5",
            getLoan: [],
        })
    })

    it('it will check for SETTINGSGETLOAN', () => {
        const action = {
            type: 'SETTINGSGETLOAN',
            payload: {
                response: [],
                statusCode: 200
            }
        }
        expect(SettingLoanReducer(initialState, action)).toStrictEqual({
            loanname: '',
            dueon: '',
            duetype: '',
            dueamount: '',
            statusCodeLoans: 200,
            statusCodeLoansAdd: 0,
            getLoan: [],
            interest: ''
        })
    })

    it('it will check for CLEARSETTINGLOAN', () => {
        const action = {
            type: 'CLEARSETTINGLOAN',

        }
        expect(SettingLoanReducer({ ...initialState, statusCodeLoans: 200 }, action)).toStrictEqual({
            loanname: '',
            dueon: '',
            duetype: '',
            dueamount: '',
            statusCodeLoans: 0,
            statusCodeLoansAdd: 0,
            getLoan: [],
            interest: ''
        })
    })
})


export const initialState = {
    memberid: "",
    witnessid: "",
    loanamount: "",
    statusCodeLoans: 0,
    id: "",
    getLoanTab: [],
    approveid: "",
    loantype: "",
    eligibleloanamount: "",
    interest: "",
    loanstatus: '',
    loanid: '',
    statusCodeLoansAddLoan: 0,
    statusCodewitness: 0,
    statusCodeRejectLoan: 0,
};

const LoanReducer = (state = initialState, action) => {


    switch (action.type) {
        case "LOANADD":
            return {
                ...state,

                statusCodeLoansAddLoan: action.statusCode,
            };


        case "GETLOAN":
            return {
                ...state, getLoanTab: action.payload.response, statusCodeLoans: action.payload.statusCode
            };

        case "ADDWITNESS":
            return {
                ...state,

                statusCodewitness: action.statusCodewitness,
            };
        case "CLEAR_ADDWITNESS":
            return {
                ...state,
                statusCodewitness: 0
            };

        case "APPROVALLOAN":
            return {
                ...state,
                approveid: action.payload.id,
                loantype: action.payload.loan_type,
                eligibleloanamount: action.payload.loan_amount,
                statusCodeLoans: 200,
                interest: action.payload.interest,

            };


        case "REJECTLOAN":
            return {
                ...state,
                loanstatus: action.payload.loan_status,
                loanid: action.payload.id,
                statusCodeRejectLoan: action.statusCodeReject,
            };
        case "CLEAR_REJECTLOAN":
            return {
                ...state,
                statusCodeRejectLoan: 0,
            };
            
        case "CLEARLOAN":
            return {
                ...state,
                statusCodeLoans: 0,
            };
        case "CLEARLOANADDED":
            return {
                ...state,
                statusCodeLoansAddLoan: 0,
            };

        default:
            return state;
    }
};

export default LoanReducer;

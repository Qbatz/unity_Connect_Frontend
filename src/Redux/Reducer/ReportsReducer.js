export const initialState = {
    paidstart: '',
    paidend: '',
    unpaidstart: '',
    unpaidend: '',
    getReport: [],
    statusCodeLoans: 0,
};

const ReportReducer = (state = initialState, action) => {
    switch (action.type) {
        case "REPORTADD":
            return {
                ...state,
                paidstart: action.payload.start_date_Paid || '',
                paidend: action.payload.end_date_Paid || '',
                unpaidstart: action.payload.start_date_UnPaid || '',
                unpaidend: action.payload.end_date_UnPaid || '',
                getReport: action.payload.reports || action.payload || [], 
                statusCodeLoans: 200,
            };

        case "GETREPORT":
            return {
                ...state,
                getReport: action.payload.response || [], 
                statusCodeLoans: action.payload.statusCodeLoan,
            };

        case "CLEARREPORTS":
            return {
                ...state,
                statusCodeLoans: 0,
            };

        default:
            return state;
    }
};

export default ReportReducer;

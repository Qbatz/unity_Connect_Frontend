export const initialState = {
    successreport: [],
    unsuccessreport: [],
    statusCodeSuccess: 0,
    statusCodeUnSuccess: 0,
};

const ReportReducer = (state = initialState, action) => {
    switch (action.type) {


        case "SUCCESSREPORT":
            return {
                ...state, successreport: action.payload.response.data

                , statusCodeSuccess: action.payload.statusCode
            };
        case 'CLEAR_STATUS_CODE_SUCCESSREPORT':
            return { ...state, statusCodeSuccess: 0 }

        case "UNSUCCESSREPORT":
            return {
                ...state, unsuccessreport: action.payload.response.data

                , statusCodeUnSuccess: action.payload.statusCode
            };
        case 'CLEAR_STATUS_CODE_UNSUCCESSREPORT':
            return { ...state, statusCodeUnSuccess: 0 }

        default:
            return state;
    }
};

export default ReportReducer;

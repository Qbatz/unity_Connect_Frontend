export const initialState = {
    successreport: [],
    unsuccessreport: [],
    statusCodeSuccess: 0,
    statusCodeUnSuccess: 0,
    total_Received_Amount: '',
    SuccessPDF: {},
    SuccessExcel: {},
    UnSuccessPDF: {},
    UnSuccessExcel: {},
    StatusCodeForSuccessPDF: 0,
    StatusCodeForSuccessExcel: 0,
    StatusCodeForUnSuccessPDF: 0,
    StatusCodeForUnSuccessExcel: 0,

};

const ReportReducer = (state = initialState, action) => {



    switch (action.type) {

        case "SUCCESSREPORT":
            return {
                ...state, successreport: action.payload.response,
                total_Received_Amount: action.payload.total_Received_Amount,
                statusCodeSuccess: action.payload.statusCode,

            };
        case 'CLEAR_STATUS_CODE_SUCCESSREPORT':
            return { ...state, statusCodeSuccess: 0 }

        case "UNSUCCESSREPORT":
            return {
                ...state, unsuccessreport: action.payload.response, statusCodeUnSuccess: action.payload.statusCode,

            };
        case 'CLEAR_STATUS_CODE_UNSUCCESSREPORT':
            return { ...state, statusCodeUnSuccess: 0 }

        case 'SUCCESSREPORTPDF':
            return { ...state, SuccessPDF: action.payload.response, StatusCodeForSuccessPDF: action.payload.statusCode }

        case 'CLEAR_SUCCESS_PDF':
            return { ...state, StatusCodeForSuccessPDF: 0 }

        case 'SUCCESSREPORTEXCEL':
            return { ...state, SuccessExcel: action.payload.response, StatusCodeForSuccessExcel: action.payload.statusCode }

        case 'CLEAR_SUCCESS_EXCEL':
            return { ...state, StatusCodeForSuccessExcel: 0 }


        case 'UNSUCCESSREPORTPDF':
            return { ...state, UnSuccessPDF: action.payload.response, StatusCodeForUnSuccessPDF: action.payload.statusCode }

        case 'CLEAR_UNSUCCESS_PDF':
            return { ...state, StatusCodeForUnSuccessPDF: 0 }



        case 'UNSUCCESSREPORTEXCEL':
            return { ...state, UnSuccessExcel: action.payload.response, StatusCodeForUnSuccessExcel: action.payload.statusCode }

        case 'CLEAR_UNSUCCESS_EXCEL':
            return { ...state, StatusCodeForUnSuccessExcel: 0 }

        default:
            return state;
    }
};

export default ReportReducer;

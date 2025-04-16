export const initialState = {
    successreport: [],
    unsuccessreport: [],
    statusCodeSuccess: 0,
    statusCodeUnSuccess: 0,
    total_Received_Amount: '',
    successExcelUrl: '',
    successPdfUrl: '',
    unsuccessPdfUrl: '',
    unsuccessExcelUrl: ''


};

const ReportReducer = (state = initialState, action) => {



    switch (action.type) {

        case "SUCCESSREPORT":
            return {
                ...state, successreport: action.payload.response,
                total_Received_Amount: action.payload.total_Received_Amount,
                statusCodeSuccess: action.payload.statusCode,
                successExcelUrl: action.payload.urls.excelURL,
                successPdfUrl: action.payload.urls.pdfURL
            };
        case 'CLEAR_STATUS_CODE_SUCCESSREPORT':
            return { ...state, statusCodeSuccess: 0 }

        case "UNSUCCESSREPORT":
            return { ...state, unsuccessreport: action.payload.response, statusCodeUnSuccess: action.payload.statusCode, unsuccessExcelUrl: action.payload.urls.excelURL,
                unsuccessPdfUrl: action.payload.urls.pdfURL };
        case 'CLEAR_STATUS_CODE_UNSUCCESSREPORT':
            return { ...state, statusCodeUnSuccess: 0 }

        default:
            return state;
    }
};

export default ReportReducer;

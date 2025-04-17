export const initialState = {
    successreport: [],
    unsuccessreport: [],
    statusCodeSuccess: 0,
    statusCodeUnSuccess: 0,
    total_Received_Amount: '',
    pdfURL_Success:'',
    excelURL_Success :'',
    pdfURL_Unsuccess:'',
    excelURL_Unsuccess :'',

};

const ReportReducer = (state = initialState, action) => {



    switch (action.type) {

        case "SUCCESSREPORT":
            return {
                ...state, successreport: action.payload.response.data,
                total_Received_Amount: action.payload.total_Received_Amount,
                statusCodeSuccess: action.payload.statusCode,
                pdfURL_Success: action.payload.pdfURL,
                excelURL_Success: action.payload.excelURL

            };
        case 'CLEAR_STATUS_CODE_SUCCESSREPORT':
            return { ...state, statusCodeSuccess: 0 }

        case "UNSUCCESSREPORT":
            return { ...state, unsuccessreport: action.payload.response, statusCodeUnSuccess: action.payload.statusCode,
                
                pdfURL_Unsuccess: action.payload.pdfURL,
                excelURL_Unsuccess: action.payload.excelURL
             };
        case 'CLEAR_STATUS_CODE_UNSUCCESSREPORT':
            return { ...state, statusCodeUnSuccess: 0 }

        default:
            return state;
    }
};

export default ReportReducer;

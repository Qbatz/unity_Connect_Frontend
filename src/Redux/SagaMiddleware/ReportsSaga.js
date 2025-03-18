// import { call, takeEvery, put } from 'redux-saga/effects';
// import { ReportsAction} from '../Action/ReportsAction';
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import Cookies from 'universal-cookie';

// function* ReportsFilter(action) {
//     try {
//         const response = yield call(ReportsAction, action.payload);
//         console.log("report response:",response);
        
//         if (response?.status === 200 || response?.statusCode === 200) {
//             yield put({
//                 type: "REPORTADD",
//                 payload: response.data,
//             });

//             toast.success("Loan added successfully!", {
//                 position: "bottom-center",
//                 autoClose: 2000,
//                 hideProgressBar: true,
//             });
//         } else {
//             console.error("Error Response:", response);
//             toast.error("Failed to add loan");
//         }
//     } catch (error) {
//         console.error("Saga API Error:", error.response || error);
//         toast.error("API Error: Failed to add loan");
//     }
// }


// //GETREPORT

// function* GetrReportSaga(action) {

//     const response = yield call(ReportsAction, action.payload);



//     if (response.status === 200) {
//         yield put({
//             type: 'GETREPORT',
//             payload: { response: response.data.data, statusCodeLoan: response.status },
//         });


//     }
//     if (response) {
//         refreshToken(response);
//     }
// }




// function refreshToken(response) {
//     const cookies = new Cookies();
//     if (response?.refresh_token) {
//         cookies.set("UnityConnectToken", response.refresh_token, { path: "/" });
//     } else if (response?.status === 206 || response?.statusCode === 206) {
//         cookies.set("Unity_ConnectToken_Access-Denied", response.status, { path: "/" });
//     }
// }

// function* ReportSaga() {
//     yield takeEvery('REPORTS_FILTER', ReportsFilter);
//     yield takeEvery("GET_REPORT", GetrReportSaga);
   
// }

// export default ReportSaga;

import { call, takeEvery, put } from 'redux-saga/effects';
import { ReportsAction } from '../Action/ReportsAction';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'universal-cookie';

function* ReportsFilter(action) {
    try {
        const response = yield call(ReportsAction, action.payload);
        console.log("report response:", response);

        if (response?.status === 200 || response?.statusCode === 200) {
            yield put({
                type: "REPORTADD",
                payload: response.data,
            });

            toast.success("Report filtered successfully!", {
                position: "bottom-center",
                autoClose: 2000,
                hideProgressBar: true,
            });
        } else {
            console.error("Error Response:", response);
            toast.error("Failed to filter reports");
        }
    } catch (error) {
        console.error("Saga API Error:", error.response || error);
        toast.error("API Error: Failed to fetch reports");
    }
}

// GET REPORT SAGA
function* GetrReportSaga(action) {
    try {
        const response = yield call(ReportsAction, action.payload);
        console.log("Saga Response:", response);

        if (response.status === 200) {
            yield put({
                type: "GETREPORT",
                payload: { response: response.data, statusCodeLoan: response.status },
            });
        }

        if (response) {
            refreshToken(response);
        }
    } catch (error) {
        console.error("Get Report Saga Error:", error);
    }
}

function refreshToken(response) {
    const cookies = new Cookies();
    if (response?.refresh_token) {
        cookies.set("UnityConnectToken", response.refresh_token, { path: "/" });
    } else if (response?.status === 206 || response?.statusCode === 206) {
        cookies.set("Unity_ConnectToken_Access-Denied", response.status, { path: "/" });
    }
}

function* ReportSaga() {
    yield takeEvery('REPORTS_FILTER', ReportsFilter);
    yield takeEvery("GET_REPORT", GetrReportSaga);
}

export default ReportSaga;

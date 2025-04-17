import { call, takeEvery, put } from 'redux-saga/effects';
import { SuccessReportsAction, UnSuccessReportsAction } from '../Action/ReportsAction';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'universal-cookie';



function* SuccessReportSaga(action) {
    try {
        const response = yield call(SuccessReportsAction, action.payload);



        if (response.status === 200) {
            yield put({
                type: "SUCCESSREPORT",
                payload: {
                    response: response.data.data || response.data || [],
                    statusCode: response.status || response.data.statusCode,
                    total_Received_Amount: response.data.total_Received_Amount || 0,
                    pdfURL :  response.data.pdfURL, excelURL: response.data.excelURL
                },
            });
        }

        if (response) {
            refreshToken(response);
        }
    } catch (error) {
        console.error("Get Report Saga Error:", error);
    }
}

function* UnSuccessReportSaga(action) {
    try {
        const response = yield call(UnSuccessReportsAction, action.payload);


        if (response.status === 200) {
            yield put({
                type: "UNSUCCESSREPORT",
                payload: { response: response.data.data || response.data || [], statusCode: response.status || response.data.statusCode, pdfURL :  response.data.pdfURL, excelURL: response.data.excelURL },
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

    yield takeEvery("SUCCESS_REPORT", SuccessReportSaga);
    yield takeEvery("UNSUCCESS_REPORT", UnSuccessReportSaga);
}

export default ReportSaga;



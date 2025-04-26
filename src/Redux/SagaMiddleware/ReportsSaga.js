import { call, takeEvery, put } from 'redux-saga/effects';
import { SuccessReportsAction, UnSuccessReportsAction, SuccessReportsPDF, SuccessReportsEXCEL, UnSuccessReportsPDF, UnSuccessReportsEXCEL } from '../Action/ReportsAction';
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
                    urls: response.data
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
                payload: { response: response.data.data || response.data || [], statusCode: response.status || response.data.statusCode, urls: response.data },
            });
        }

        if (response) {
            refreshToken(response);
        }
    } catch (error) {
        console.error("Get Report Saga Error:", error);
    }
}

function* SuccessReportPDF(action) {

    const response = yield call(SuccessReportsPDF, action.payload);


    if (response.status === 200) {
        yield put({
            type: "SUCCESSREPORTPDF",
            payload: { response: response.data.pdfURL || response.data || [], statusCode: response.status || response.data.statusCode, urls: response.data },
        });
    }

    if (response) {
        refreshToken(response);
    }

}


function* SuccessReportEXCEL(action) {

    const response = yield call(SuccessReportsEXCEL, action.payload);



    if (response.status === 200) {
        yield put({
            type: "SUCCESSREPORTEXCEL",
            payload: { response: response.data.excelURL || response.data || [], statusCode: response.status || response.data.statusCode, urls: response.data },
        });
    }

    if (response) {
        refreshToken(response);
    }

}

function* UnSuccessReportPDF(action) {

    const response = yield call(UnSuccessReportsPDF, action.payload);


    if (response.status === 200) {
        yield put({
            type: "UNSUCCESSREPORTPDF",
            payload: { response: response.data.pdfURL || response.data || [], statusCode: response.status || response.data.statusCode, urls: response.data },
        });
    }

    if (response) {
        refreshToken(response);
    }

}

function* UnSuccessReportEXCEL(action) {

    const response = yield call(UnSuccessReportsEXCEL, action.payload);


    if (response.status === 200) {
        yield put({
            type: "UNSUCCESSREPORTEXCEL",
            payload: {
                response: response.data.excelURL
                    || response.data || [], statusCode: response.status || response.data.statusCode, urls: response.data
            },
        });
    }

    if (response) {
        refreshToken(response);
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
    yield takeEvery("SUCCESS_PDF", SuccessReportPDF);
    yield takeEvery("SUCCESS_EXCEL", SuccessReportEXCEL);
    yield takeEvery("UNSUCCESS_PDF", UnSuccessReportPDF);
    yield takeEvery("UNSUCCESS_EXECL", UnSuccessReportEXCEL)
}

export default ReportSaga;



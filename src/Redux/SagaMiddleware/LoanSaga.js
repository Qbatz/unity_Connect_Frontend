import { call, takeEvery, put } from 'redux-saga/effects';
import { AddLoan, GetLoan, AddWitness, AddApproval, RejectLoan } from '../Action/LoanAction';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'universal-cookie';

function* LoanAddRequest(action) {

    const response = yield call(AddLoan, action.payload);


    if (response?.status === 200 || response?.data.statusCode === 200) {

        yield put({
            type: "LOANADD",
            payload: response.data,
            statusCode: response.data.statusCode
        });
        yield put({ type: 'GET_LOAN' });

        toast.success(response.data.message, {
            position: "bottom-center",
            autoClose: 2000,
            hideProgressBar: true,
            closeButton: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            style: {
                backgroundColor: "#E6F6E6",
                color: "black",
                borderRadius: "60px",
                fontFamily: "Gilroy",
                fontWeight: 600,
                fontSize: 14,
                textAlign: "start",
                display: "flex",
                alignItems: "center",
                padding: "10px",
            },
        });
    }
    else {
        console.error("Error Response:", response);
        toast.success(response.data.message, {
            position: "bottom-center",
            autoClose: 2000,
            hideProgressBar: true,
            closeButton: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            style: {
                backgroundColor: "#E6F6E6",
                color: "black",
                borderRadius: "60px",
                fontFamily: "Gilroy",
                fontWeight: 600,
                fontSize: 14,
                textAlign: "start",
                display: "flex",
                alignItems: "center",
                padding: "10px",
            },
        });

    }

    if (response) {
        refreshToken(response);
    }
}



function* GetLoanSaga(action) {

    const response = yield call(GetLoan, action.payload);




    if (response.status === 200) {
        yield put({
            type: 'GETLOAN',
            payload: { response: response.data.data, statusCode: response.status },
        });


    }
    if (response) {
        refreshToken(response);
    }
}


function* AddWitnessSaga(action) {

    const response = yield call(AddWitness, action.payload);


    if (response?.status === 200 || response?.statusCode === 200) {
        yield put({
            type: "ADDWITNESS",
            payload: response.data,
            statusCodewitness: response.data.statusCode
        });


        toast.success(response.data.message, {
            position: "bottom-center",
            autoClose: 2000,
            hideProgressBar: true,
            closeButton: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            style: {
                backgroundColor: "#E6F6E6",
                color: "black",
                borderRadius: "60px",
                fontFamily: "Gilroy",
                fontWeight: 600,
                fontSize: 14,
                textAlign: "start",
                display: "flex",
                alignItems: "center",
                padding: "10px",
            },
        });
    } else {
        console.error("Error Response:", response);
        toast.error("Failed to add witness");
    }

    if (response) {
        refreshToken(response);
    }
}


function* LoanApproval(action) {



    const response = yield call(AddApproval, action.payload);


    if (response?.status === 200 || response?.statusCode === 200) {
        yield put({
            type: "APPROVALLOAN",
            payload: response.data,
            statusCodeApproval: response.data.statusCode
        });

        toast.success(response.data.message, {
            position: "bottom-center",
            autoClose: 2000,
            hideProgressBar: true,
            closeButton: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            style: {
                backgroundColor: "#E6F6E6",
                color: "black",
                borderRadius: "60px",
                fontFamily: "Gilroy",
                fontWeight: 600,
                fontSize: 14,
                textAlign: "start",
                display: "flex",
                alignItems: "center",
                padding: "10px",
            },
        });
    } else {
        console.error("Error Response:", response);
        toast.error("Failed to approve loan");
    }

    if (response) {
        refreshToken(response);
    }
}

function* LoanRejection(action) {

    const response = yield call(RejectLoan, action.payload);


    if (response?.status === 200 || response?.statusCode === 200) {
        yield put({
            type: "REJECTLOAN",
            payload: response.data,
            statusCodeReject: response.data.statusCode
        });

        toast.success(response.data.message, {
            position: "bottom-center",
            autoClose: 2000,
            hideProgressBar: true,
            closeButton: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            style: {
                backgroundColor: "#E6F6E6",
                color: "black",
                borderRadius: "60px",
                fontFamily: "Gilroy",
                fontWeight: 600,
                fontSize: 14,
                textAlign: "start",
                display: "flex",
                alignItems: "center",
                padding: "10px",
            },
        });
    } else {
        console.error("Error Response:", response);
        toast.error("Failed to reject loan");
    }

    if (response) {
        refreshToken(response);
    }
}


function refreshToken(response) {


    if (response.data && response.data.refresh_token) {
        const refreshTokenGet = response.data.refresh_token
        const cookies = new Cookies()
        cookies.set('UnityConnectToken', refreshTokenGet, { path: '/' });
    } else if (response.status === 206) {
        const message = response.status
        const cookies = new Cookies()
        cookies.set('Unity_ConnectToken_Access-Denied', message, { path: '/' });

    }

}

function* LoanSaga() {
    yield takeEvery('LOAN_ADD', LoanAddRequest);
    yield takeEvery("GET_LOAN", GetLoanSaga);
    yield takeEvery('ADD_WITNESS', AddWitnessSaga);
    yield takeEvery('ADD_APPROVAL', LoanApproval);
    yield takeEvery('LOAN_REJECT', LoanRejection);
}

export default LoanSaga;

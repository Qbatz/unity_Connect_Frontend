import { call, takeEvery, put } from 'redux-saga/effects';
import { AddLoan, GetLoan, AddWitness, AddApproval, RejectLoan } from '../Action/LoanAction';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'universal-cookie';

function* LoanAddRequest(action) {
    try {
        const response = yield call(AddLoan, action.payload);
        if (response?.status === 200 || response?.statusCode === 200) {
            yield put({
                type: "LOANADD",
                payload: response.data,
            });

            toast.success("Loan added successfully!", {
                position: "bottom-center",
                autoClose: 2000,
                hideProgressBar: true,
            });
        } else {
            console.error("Error Response:", response);
            toast.error("Failed to add loan", {
                position: "bottom-center",
                autoClose: 2000,
                hideProgressBar: true,
            });
        }
    } catch (error) {
        console.error("Saga API Error:", error.response || error);
        toast.error("API Error: Failed to add loan");
    }
}



function* GetLoanSaga(action) {

    const response = yield call(GetLoan, action.payload);



    if (response.status === 200) {
        yield put({
            type: 'GETLOAN',
            payload: { response: response.data.data, statusCodeLoan: response.status },
        });


    }
    if (response) {
        refreshToken(response);
    }
}


function* AddWitnessSaga(action) {
    try {
        const response = yield call(AddWitness, action.payload);

        if (response?.status === 200 || response?.statusCode === 200) {
            yield put({
                type: "ADDWITNESS",
                payload: response.data,
            });

            toast.success("Witness added successfully!", {
                position: "bottom-center",
                autoClose: 2000,
                hideProgressBar: true,
            });
        } else {
            console.error("Error Response:", response);
            toast.error("Failed to add witness");
        }
    } catch (error) {
        console.error("Saga API Error:", error.response || error);
        toast.error("API Error: Failed to add witness");
    }
}


function* LoanApproval(action) {


    try {
        const response = yield call(AddApproval, action.payload);

        if (response?.status === 200 || response?.statusCode === 200) {
            yield put({
                type: "APPROVALLOAN",
                payload: response.data,
            });

            toast.success("Loan Approved successfully!", {
                position: "bottom-center",
                autoClose: 2000,
                hideProgressBar: true,
            });
        } else {
            console.error("Error Response:", response);
            toast.error("Failed to approve loan");
        }
    } catch (error) {
        console.error("Saga API Error:", error.response || error);
        toast.error("API Error: Failed to approve loan");
    }
}

function* LoanRejection(action) {
    try {
        const response = yield call(RejectLoan, action.payload);

        if (response?.status === 200 || response?.statusCode === 200) {
            yield put({
                type: "REJECTLOAN",
                payload: response.data,
            });

            toast.success("Loan Rejected successfully!", {
                position: "bottom-center",
                autoClose: 2000,
                hideProgressBar: true,
            });
        } else {
            console.error("Error Response:", response);
            toast.error("Failed to reject loan");
        }
    } catch (error) {
        console.error("Saga API Error:", error.response || error);
        toast.error("API Error: Failed to reject loan");
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

function* LoanSaga() {
    yield takeEvery('LOAN_ADD', LoanAddRequest);
    yield takeEvery("GET_LOAN", GetLoanSaga);
    yield takeEvery('ADD_WITNESS', AddWitnessSaga);
    yield takeEvery('ADD_APPROVAL', LoanApproval);
    yield takeEvery('LOAN_REJECT', LoanRejection);
}

export default LoanSaga;

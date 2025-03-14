import { call, takeEvery, put } from 'redux-saga/effects';
import { ExpensesGetAction, AddExpensesAction, DeleteExpensesAction } from '../Action/ExpensesAction';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'universal-cookie';
import { toast } from 'react-toastify';

function* handleExpenses() {

    const response = yield call(ExpensesGetAction);




    if (response.statusCode === 200 || response.status === 200) {
        yield put({
            type: 'GET_EXPENSES',
            payload: { response: response.data, statusCode: response.statusCode || response.status },
        });

    } else if (response.status === 201 || response.statusCode === 201) {

        yield put({ type: 'ERROR', payload: response.data.message });
    }
    if (response) {
        refreshToken(response);
    }
}



function* handleAddExpenses(action) {



    const response = yield call(AddExpensesAction, action.payload);



    if (response.statusCode === 200 || response.status === 200) {

        yield put({
            type: 'ADD_EXPENSES',
            payload: { response: response.data, statusCode: response.statusCode || response.status },
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

    }
    if (response) {
        refreshToken(response);
    }
}


function* handledeleteExpenses(action) {

    const response = yield call(DeleteExpensesAction, action.payload);


    var toastStyle = {
        backgroundColor: "#E6F6E6",
        color: "black",
        width: "auto",
        borderRadius: "60px",
        height: "20px",
        fontFamily: "Gilroy",
        fontWeight: 600,
        fontSize: 14,
        textAlign: "start",
        display: "flex",
        alignItems: "center",
        padding: "10px",

    };

    if (response.statusCode === 200 || response.status === 200) {
        yield put({
            type: 'DELETE_EXPENSES',
            payload: { response: response.data, statusCode: response.statusCode || response.status },
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
            style: toastStyle,
        });

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

function* ExpensesSaga() {
    yield takeEvery('GETEXPENSES', handleExpenses);
    yield takeEvery('ADDEXPENSES', handleAddExpenses);
    yield takeEvery('DELETEEXPENSES', handledeleteExpenses);
}
export default ExpensesSaga;
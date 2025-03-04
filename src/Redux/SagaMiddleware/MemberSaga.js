import { call, takeEvery, put } from 'redux-saga/effects';
import { ActiveMemberGetAction, ActiveMemberDeleteAction, ActiveMemberStatusAction, addMember,MemberOverviewAction } from '../Action/MemberAction';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'universal-cookie';

function* handleMemberList() {

    const response = yield call(ActiveMemberGetAction);

    if (response.statusCode === 200 || response.status === 200) {
        yield put({
            type: 'GET_MEMBER',
            payload: { response: response.data, statusCode: response.statusCode || response.status },
        });

    } else if (response.status === 201 || response.statusCode === 201) {

        yield put({ type: 'ERROR', payload: response.data.message });
    }
    if (response) {
        refreshToken(response);
    }
}

function* handledeleteMember(action) {

    const response = yield call(ActiveMemberDeleteAction, action.payload);
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
            type: 'DELETE_MEMBER',
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

function* handleStatusMember(action) {

    const response = yield call(ActiveMemberStatusAction, action.payload);


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
            type: 'STATUS_MEMBER',
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

function* handleAddMember(datum) {

    const response = yield call(addMember, datum.payload);

    if (response.statusCode === 200 || response.status === 200) {

        yield put({
            type: 'ADD_USER_SUCCESS',
            payload: { response: response.data, statusCode: response.statusCode || response.status },
        });

        toast.success(response.message, {
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

    } else if (response.statusCode === 202) {
        yield put({ type: 'PHONE_ERROR', payload: response.message });
    } else if (response.statusCode === 203) {
        yield put({ type: 'EMAIL_ERROR', payload: response.message });
    }
    if (response) {
        refreshToken(response);
    }
}

function* handleOverview(action) {

    const response = yield call(MemberOverviewAction, action.payload);


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
            type: 'OVERVIEW_MEMBER',
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


function* MemberSaga() {
    yield takeEvery('MEMBERLIST', handleMemberList);
    yield takeEvery('DELETEMEMBER', handledeleteMember);
    yield takeEvery('CHANGE_STATUS', handleStatusMember);
    yield takeEvery('MEMBERINFO', handleAddMember);
    yield takeEvery('MEMBEROVERVIEW',handleOverview)
}

export default MemberSaga;

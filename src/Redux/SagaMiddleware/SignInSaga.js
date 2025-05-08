import { call, takeEvery, put } from 'redux-saga/effects';
import { SignIncall, ProfileDetails, ProfileDetailsUpdate, UpdatePassword } from '../Action/SignInAction';
import { toast } from 'react-toastify';
import Cookies from 'universal-cookie';


export function* SignIn(action) {
    try {
        const response = yield call(SignIncall, action.payload);

        var toastStyle = {
            backgroundColor: "#E6F6E6",
            color: "black",
            width: "300px",
            borderRadius: "60px",
            height: "20px",
            fontFamily: "Gilroy",
            fontWeight: 600,
            fontSize: 14,
            textAlign: "start",
            display: "flex",
            alignItems: "center",
            padding: "13px",
        };

        if (response.status === 200 && response.data.statusCode === 200) {

            yield put({
                type: 'SIGNIN-INFO',
                payload: {
                    token: response.data.token,
                    message: response.data.message,
                    statusCode: response.status,
                    members: response.data.members,
                    loans: response.data.loans,
                    transactions: response.data.transactions
                }
            });
            toast.success(response.message || "Sign-in successful!", {
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
        else if (response.status === 201) {
            yield put({ type: 'ERROR_EMAIL', payload: response.data.message });
        } else if (response.status === 202) {
            yield put({ type: 'ERROR_PASSWORD', payload: response.data.message });
        }

    } catch (error) {
        console.error("Sign-in failed", error);
        yield put({ type: 'ERROR_EMAIL', payload: 'Error' });
    }

}

export function* handleProfileDetails(action) {


    const response = yield call(ProfileDetails, action.payload);



    if (response.status === 200 && response.data.statusCode === 200) {
        yield put({
            type: 'PROFILE_DETAILS_LIST',
            payload: {
                data: response.data.data,
                statusCode: response.status,
                loans: response.data.loans,
                members: response.data.members,
                transactions: response.data.transactions


            }
        });
    } else if (response.status === 203) {
        yield put({ type: 'PROFILE_DETAILS_ERROR', payload: response.data.message });
    }
    if (response) {
        refreshToken(response);
    }


}


function* handleProfileDetailsUpdate(datum) {

    const response = yield call(ProfileDetailsUpdate, datum.payload);

    if (response.statusCode === 200 || response.status === 200) {


        var toastStyle = {
            backgroundColor: "#E6F6E6",
            color: "black",
            width: "300px",
            borderRadius: "60px",
            height: "20px",
            fontFamily: "Gilroy",
            fontWeight: 600,
            fontSize: 14,
            textAlign: "start",
            display: "flex",
            alignItems: "center",
            padding: "13px",
        };
        toast.success(response.message || "Profile updated successfully!", {
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

        yield put({
            type: 'PROFILE_DETAILS_UPDATE_LIST',
            payload: { statusCode: response.statusCode || response.status },
        });


    } else if (response.status === 201 || response.statusCode === 201) {
        yield put({ type: 'PROFILE_DETAILS_UPDATE_ERROR', payload: response.message });
    }
    if (response) {
        refreshToken(response);
    }

}

export function* handleUpdatePassword(action) {


    const response = yield call(UpdatePassword, action.payload);

    var toastStyle = {
        backgroundColor: "#E6F6E6",
        color: "black",
        width: "300px",
        borderRadius: "60px",
        height: "20px",
        fontFamily: "Gilroy",
        fontWeight: 600,
        fontSize: 14,
        textAlign: "start",
        display: "flex",
        alignItems: "center",
        padding: "13px",
    };

    if (response.status === 200 && response.data.statusCode === 200) {
        yield put({
            type: 'UPDATE_PASSWORD',
            payload: {
                message: response.data.message,
                statusCode: response.status
            }
        });
        toast.success(response.message || "Password updated successfully!", {
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
    else if (response.status === 201) {
        yield put({ type: 'UPDATE_PASSWORD_ERROR', payload: response.data.message });
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

function* SignInSaga() {
    yield takeEvery('SIGNININFO', SignIn);
    yield takeEvery('PROFILEDETAILS', handleProfileDetails);
    yield takeEvery('PROFILEDETAILSUPDATE', handleProfileDetailsUpdate);
    yield takeEvery('UPDATEPASSWORD', handleUpdatePassword);
}

export default SignInSaga;




import { call, takeEvery, put } from 'redux-saga/effects';
import { SignIncall } from '../Action/SignInAction';
import { toast } from 'react-toastify';
import Cookies from 'universal-cookie';

function* SignIn(action) {
    try {
        const response = yield call(SignIncall, action.payload);

        var toastStyle = {
            backgroundColor: "#E6F6E6",
            color: "black",
            width : "300px",
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

        if (response.status === 200 || response.statusCode === 200) {
            yield put({
                type: 'SIGNIN-INFO',
                payload: {
                    response: response.data,
                    statusCode: response.status || response.statusCode
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
            if (response) {
                refreshToken(response);
              }
        }
        else if (response.status === 203 || response.statusCode === 203) {
            yield put({ type: 'ERROR_EMAIL', payload: response.data.message });
        } else if (response.status === 202 || response.statusCode === 202) {
            yield put({ type: 'ERROR_PASSWORD', payload: response.data.message });
        }

    } catch (error) {
        console.error("Sign-in failed", error);
    }
   
}

function refreshToken(response) {
    if (response.data && response.data.refresh_token) {
       const refreshTokenGet = response.data.refresh_token
       const cookies = new Cookies()
       cookies.set('token', refreshTokenGet, { path: '/' });
    } else if (response.status === 206) {
       const message = response.status
       const cookies = new Cookies()
       cookies.set('access-denied', message, { path: '/' });
 
    }
    
 
 }

function* SignInSaga() {
    yield takeEvery('SIGNININFO', SignIn);
}

export default SignInSaga;




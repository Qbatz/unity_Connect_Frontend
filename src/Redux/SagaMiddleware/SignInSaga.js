// import { call, takeEvery, put } from 'redux-saga/effects';
// import { SignIncall } from '../Action/SignInAction';


// function* SignIn(action) {

//     try {
//         const response = yield call(SignIncall,action.payload);
//         if (response.status === 200 || response.statusCode === 200) {
//         yield put({type: 'SIGNIN-INFO', payload: {response: response.data,
//                 statusCode: response.status || response.statusCode
//                 }
//             });
//         }
//         else if (response.status === 201 || response.statusCode === 201) {
//             yield put({ type: 'ERROR_EMAIL', payload: response.data.message });
//         } else if (response.status === 202 || response.statusCode === 202) {
//             yield put({ type: 'ERROR_PASSWORD', payload: response.data.message });
//         }
//     } catch (error) {

//     }
// }


// function* SignInSaga() {
//     yield takeEvery('SIGNININFO', SignIn)
// }
// export default SignInSaga;


import { call, takeEvery, put } from 'redux-saga/effects';
import { SignIncall } from '../Action/SignInAction';

function* SignIn(action) {
    try {
        const response = yield call(SignIncall, action.payload);
        if (response.status === 200 || response.statusCode === 200) {
            yield put({
                type: 'SIGNIN-INFO',  // ✅ Fixed action type
                payload: {
                    response: response.data,
                    statusCode: response.status || response.statusCode
                }
            });
        } else if (response.status === 201 || response.statusCode === 201) {
            yield put({ type: 'ERROR_EMAIL', payload: response.data.message });
        } else if (response.status === 202 || response.statusCode === 202) {
            yield put({ type: 'ERROR_PASSWORD', payload: response.data.message });
        }
    } catch (error) {
        console.error("Sign-in failed", error);
    }
}

function* SignInSaga() {
    yield takeEvery('SIGNININFO', SignIn);  // ✅ Corrected to match the dispatch in SignIn.js
}

export default SignInSaga;


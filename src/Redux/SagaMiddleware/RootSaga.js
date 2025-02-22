import {all} from 'redux-saga/effects';
// import SignInSaga from '../SagaMiddleware/SignInSaga';
import CreateAccountSaga from './CreateAccountSaga';

function* RootSaga() {
    
yield all([
    // SignInSaga(),
    CreateAccountSaga(),

])
}
export default RootSaga;
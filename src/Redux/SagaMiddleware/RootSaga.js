import { all } from 'redux-saga/effects';
import SignInSaga from '../SagaMiddleware/SignInSaga';
import CreateAccountSaga from './CreateAccountSaga';
import SettingSaga from './SettingSaga';
function* RootSaga() {

    yield all([
        SignInSaga(),
    CreateAccountSaga(),
    SettingSaga(),

    ])
}
export default RootSaga;
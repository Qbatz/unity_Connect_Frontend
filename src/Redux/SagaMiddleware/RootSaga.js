import { all } from 'redux-saga/effects';
import SignInSaga from '../SagaMiddleware/SignInSaga';
import CreateAccountSaga from './CreateAccountSaga';
import SettingSaga from './SettingSaga';import AddMemberSaga from './AddMemberSaga';

function* RootSaga() {

    yield all([
        SignInSaga(),
        CreateAccountSaga(),
    SettingSaga(),
        AddMemberSaga(),

    ])
}
export default RootSaga;
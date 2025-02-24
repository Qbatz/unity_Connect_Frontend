import { all } from 'redux-saga/effects';
import SignInSaga from '../SagaMiddleware/SignInSaga';
import CreateAccountSaga from './CreateAccountSaga';
import AddMemberSaga from './AddMemberSaga';

function* RootSaga() {

    yield all([
        SignInSaga(),
        CreateAccountSaga(),
        AddMemberSaga(),

    ])
}
export default RootSaga;
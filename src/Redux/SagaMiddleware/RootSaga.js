import { all } from 'redux-saga/effects';
import SignInSaga from '../SagaMiddleware/SignInSaga';
import CreateAccountSaga from './CreateAccountSaga';
import AddMemberSaga from './AddMemberSaga';
import SettingAddExpensesSaga from './SettingExpensesSage';
function* RootSaga() {

    yield all([
        SignInSaga(),
        CreateAccountSaga(),
        AddMemberSaga(),
    SettingAddExpensesSaga(),
    ])
}
export default RootSaga;
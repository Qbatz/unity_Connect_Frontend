import { all } from 'redux-saga/effects';
import SignInSaga from '../SagaMiddleware/SignInSaga';
import CreateAccountSaga from './CreateAccountSaga';
import SettingAddExpensesSaga from './SettingExpensesSage';
function* RootSaga() {

    yield all([
        SignInSaga(),
    CreateAccountSaga(),
    SettingAddExpensesSaga(),
    ])
}
export default RootSaga;
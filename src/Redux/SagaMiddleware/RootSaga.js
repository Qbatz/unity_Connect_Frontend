import { all } from 'redux-saga/effects';
import SignInSaga from '../SagaMiddleware/SignInSaga';
import CreateAccountSaga from './CreateAccountSaga';
import SettingSaga from './SettingSaga';
import SettingAddExpensesSaga from './SettingExpensesSage';
import AddMemberSaga from './AddMemberSaga';

function* RootSaga() {

    yield all([
        SignInSaga(),
        CreateAccountSaga(),
    SettingSaga(),
        AddMemberSaga(),
    SettingAddExpensesSaga(),
    ])
}
export default RootSaga;
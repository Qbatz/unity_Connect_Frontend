import { all } from 'redux-saga/effects';
import SignInSaga from '../SagaMiddleware/SignInSaga';
import CreateAccountSaga from './CreateAccountSaga';
import SettingSaga from './SettingSaga';
import AddMemberSaga from './AddMemberSaga';
import SettingAddExpensesSaga from './SettingExpensesSaga'; 
import MemberSaga from './MemberSaga';

function* RootSaga() {

    yield all([
        SignInSaga(),
        CreateAccountSaga(),
        SettingSaga(),
        AddMemberSaga(),
        SettingAddExpensesSaga(),
        MemberSaga(),


    ])
}
export default RootSaga;
import { all } from 'redux-saga/effects';
import SignInSaga from '../SagaMiddleware/SignInSaga';
import CreateAccountSaga from './CreateAccountSaga';
import SettingSaga from './SettingSaga';
import SettingAddExpensesSaga from './SettingExpensesSaga';
import MemberSaga from './MemberSaga';
import LoanSaga from './LoanSaga';
import StatementSaga from './StatementSaga';
import ReportSaga from './ReportsSaga';

function* RootSaga() {

    yield all([
        SignInSaga(),
        CreateAccountSaga(),
        SettingSaga(),
        SettingAddExpensesSaga(),
        MemberSaga(),
        LoanSaga(),
        StatementSaga(),
        ReportSaga(),
    ])
}
export default RootSaga;
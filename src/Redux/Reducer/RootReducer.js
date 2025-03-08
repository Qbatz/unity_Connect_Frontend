import { combineReducers } from "redux";
import SignInReducer from "../Reducer/SignInReducer";
import CreateAccountReducer from "./CreateAccountReducer";
import SettingReducer from "./SettingReducer";
import SettingAddExpensesReducer from "./SettingsExpensesReducer";
import MemberListReducer from "./MemberReducer";
import SettingLoanReducer from "./SettingLoanReducer";
import LoanReducer from "./LoanReducer";
import StatementReducer from "./StatementReducer";

const RootReducer = combineReducers({
    SignIn: SignInReducer,
    CreateAccount: CreateAccountReducer,
    Settings: SettingReducer,
    SettingExpenses: SettingAddExpensesReducer,
    Member: MemberListReducer,
    SettingLoan: SettingLoanReducer,
    Loan:LoanReducer,
    Statement: StatementReducer,
})
export default RootReducer;
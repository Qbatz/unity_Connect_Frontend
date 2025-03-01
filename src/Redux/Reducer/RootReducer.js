import { combineReducers } from "redux";
import SignInReducer from "../Reducer/SignInReducer";
import CreateAccountReducer from "./CreateAccountReducer";
import SettingReducer from "./SettingReducer";
// import AddMemberReducer from "./AddMemberReducer";
import SettingAddExpensesReducer from "./SettingsExpensesReducer";
import MemberListReducer from "./MemberReducer";
import SettingLoanReducer from "./SettingLoanReducer";

const RootReducer = combineReducers({
    SignIn: SignInReducer,
    CreateAccount: CreateAccountReducer,
    Settings: SettingReducer,
    SettingExpenses: SettingAddExpensesReducer,
    // addMember: AddMemberReducer,
    Member: MemberListReducer,
    SettingLoan: SettingLoanReducer,

})
export default RootReducer;
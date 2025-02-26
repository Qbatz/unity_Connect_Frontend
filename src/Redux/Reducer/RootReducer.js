import { combineReducers } from "redux";
import SignInReducer from "../Reducer/SignInReducer";
import CreateAccountReducer from "./CreateAccountReducer";
import SettingReducer from "./SettingReducer";
import AddMemberReducer from "./AddMemberReducer";
import SettingAddExpensesReducer from "./SettingsExpensesReducer";
const RootReducer = combineReducers({
    SignIn: SignInReducer,
    CreateAccount: CreateAccountReducer,
 Settings:SettingReducer,
SettingExpenses:SettingAddExpensesReducer,
    addMember: AddMemberReducer,
})
export default RootReducer;
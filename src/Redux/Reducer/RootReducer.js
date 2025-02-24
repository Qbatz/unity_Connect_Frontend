import { combineReducers } from "redux";
import SignInReducer from "../Reducer/SignInReducer";
import CreateAccountReducer from "./CreateAccountReducer";
import SettingReducer from "./SettingReducer";
import AddMemberReducer from "./AddMemberReducer";
import SettingAddExpensesReducer from "./SettingExpensesReducer";
const RootReducer = combineReducers({
    SignIn: SignInReducer,
    CreateAccount: CreateAccountReducer,
 Settings:SettingReducer,

    addMember: AddMemberReducer,
 SettingAddExpenses:SettingAddExpensesReducer,
})
export default RootReducer;
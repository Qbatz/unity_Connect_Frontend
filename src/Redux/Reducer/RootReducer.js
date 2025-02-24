import { combineReducers } from "redux";
import SignInReducer from "../Reducer/SignInReducer";
import CreateAccountReducer from "./CreateAccountReducer";
import AddMemberReducer from "./AddMemberReducer";
import SettingAddExpensesReducer from "./SettingExpensesReducer";
const RootReducer = combineReducers({
    SignIn: SignInReducer,
    CreateAccount: CreateAccountReducer,
    addMember: AddMemberReducer,
 SettingAddExpenses:SettingAddExpensesReducer,
})
export default RootReducer;
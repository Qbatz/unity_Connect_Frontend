import { combineReducers } from "redux";
import SignInReducer from "../Reducer/SignInReducer";
import CreateAccountReducer from "./CreateAccountReducer";
import SettingAddExpensesReducer from "./SettingExpensesReducer";
const RootReducer = combineReducers({
    SignIn: SignInReducer,
 CreateAccount:CreateAccountReducer,
 SettingAddExpenses:SettingAddExpensesReducer,
})
export default RootReducer;
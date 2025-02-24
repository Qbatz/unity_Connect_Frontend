import { combineReducers } from "redux";
import SignInReducer from "../Reducer/SignInReducer";
import CreateAccountReducer from "./CreateAccountReducer";
import SettingReducer from "./SettingReducer";

const RootReducer = combineReducers({
    SignIn: SignInReducer,
 CreateAccount:CreateAccountReducer,
 Settings:SettingReducer,

})
export default RootReducer;
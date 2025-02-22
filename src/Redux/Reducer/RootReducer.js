import { combineReducers } from "redux";
// import SignInReducer from "../Reducer/SignInReducer";
import CreateAccountReducer from "./CreateAccountReducer";

const RootReducer = combineReducers({
// SignIn:SignInReducer,
 CreateAccount:CreateAccountReducer,
})
export default RootReducer;
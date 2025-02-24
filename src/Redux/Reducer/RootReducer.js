import { combineReducers } from "redux";
import SignInReducer from "../Reducer/SignInReducer";
import CreateAccountReducer from "./CreateAccountReducer";
import AddMemberReducer from "./AddMemberReducer";

const RootReducer = combineReducers({
    SignIn: SignInReducer,
    CreateAccount: CreateAccountReducer,
    addMember: AddMemberReducer,
})
export default RootReducer;
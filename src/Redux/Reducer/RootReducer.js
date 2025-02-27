import { combineReducers } from "redux";
import SignInReducer from "../Reducer/SignInReducer";
import CreateAccountReducer from "./CreateAccountReducer";
import SettingReducer from "./SettingReducer";
import AddMemberReducer from "./AddMemberReducer";
import MemberListReducer from "./MemberReducer";
const RootReducer = combineReducers({
    SignIn: SignInReducer,
    CreateAccount: CreateAccountReducer,
 Settings:SettingReducer,

    addMember: AddMemberReducer,
    Member: MemberListReducer,
})
export default RootReducer;
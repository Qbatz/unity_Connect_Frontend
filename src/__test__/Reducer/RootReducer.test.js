import RootReducer from "../../Redux/Reducer/RootReducer";
import SignInReducer from "../../Redux/Reducer/SignInReducer";
import CreateAccountReducer from "../../Redux/Reducer/CreateAccountReducer";
import SettingReducer from "../../Redux/Reducer/SettingReducer";
// import AddMemberReducer from "../../Redux/Reducer/AddMemberReducer";
import MemberListReducer from "../../Redux/Reducer/MemberReducer";
import SettingLoanReducer from "../../Redux/Reducer/SettingLoanReducer";
import SettingAddExpensesReducer from "../../Redux/Reducer/SettingsExpensesReducer";

describe('it should check for root reducer', () => {
    it('checks for common reducer', () => {
        const initialState = RootReducer(undefined, { type: "INIT" });
        expect(initialState).toEqual({
            SignIn: SignInReducer(undefined, { type: "INIT" }),
            CreateAccount: CreateAccountReducer(undefined, { type: "INIT" }),
            Settings: SettingReducer(undefined, { type: "INIT" }),
            // addMember: AddMemberReducer(undefined, { type: "INIT" }),
            Member: MemberListReducer(undefined, { type: "INIT" }),
            SettingExpenses:SettingAddExpensesReducer(undefined, { type: "INIT" }),
            SettingLoan:SettingLoanReducer(undefined, { type: "INIT" })
        });
    })
})
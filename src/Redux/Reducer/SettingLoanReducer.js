export const initialState = {
  loanname: "",
  dueon: "",
  duetype: "",
  dueamount: "",
  statusCodeLoans: 0,
  interest: "",
  getLoan: [],
  statusCodeLoansAdd: 0,
};

const SettingLoanReducer = (state = initialState, action) => {

  switch (action.type) {
    case "SETTINGADDLOAN":
      return {
        ...state,
        loanname: action.payload.loan_name,
        dueon: action.payload.due_on,
        duetype: action.payload.due_type,
        dueamount: action.payload.due_count,
        statusCodeLoansAdd: action.payload.statusCode,
        interest: action.payload.interest,
      };

    case "SETTINGSGETLOAN":
      return {
        ...state, getLoan: action.payload.response, statusCodeLoans: action.payload.statusCode
      };


    case "CLEARSETTINGLOAN":
      return {
        ...state,
        statusCodeLoans: 0,
      };
    case "CLEAR_SETTING_LOAN_ADD":
      return {
        ...state,
        statusCodeLoansAdd: 0,
      };

    default:
      return state;
  }
};

export default SettingLoanReducer;

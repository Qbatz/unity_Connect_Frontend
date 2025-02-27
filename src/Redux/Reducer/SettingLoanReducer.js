const initialState = {
  loanname: "",
  dueon: "",
  duetype: "",
  dueamount: "",
  statusCodeLoan: 0,
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
        statusCodeLoan: action.payload.statusCode,
      };

    case "CLEARSETTINGLOAN":
      return {
        ...state,
        statusCodeLoan: 0,
      };

    default:
      return state;
  }
};

export default SettingLoanReducer;

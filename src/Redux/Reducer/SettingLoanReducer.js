export const initialState = {
  loanname: "",
  dueon: "",
  duetype: "",
  dueamount: "",
  statusCodeLoans: 0,
  getLoan:[],
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
        statusCodeLoans: action.payload.statusCode,
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

    default:
      return state;
  }
};

export default SettingLoanReducer;

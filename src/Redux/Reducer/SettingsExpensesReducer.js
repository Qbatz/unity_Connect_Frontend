const initialState = {
    categoryname: "",
    subcategoryname: "",
    id: 1,
    statusCodeSettingsAddExpenses: 0,
    getExpenseData:[],
  };
  
  const SettingAddExpensesReducer = (state = initialState, action) => {
    
  
  
    switch (action.type) {
      case "SETTINGADDEXPENSES":
        return {
          ...state,
          categoryname: action.payload.category_Name,
          subcategoryname: action.payload.sub_Category,
          statusCodeSettingsAddExpenses: action.payload.statusCode,
        };

        case 'SETTINGGETEXPENSES':
          return { ...state, getExpenseData: action.payload.response, statusCodeSettingsAddExpenses: action.payload.statusCode }
    

      case "CLEARSETTINGADDEXPENSES":
        return {
          ...state,
          statusCodeSettingsAddExpenses: 0,
        };
  
      default:
        return state;
    }
  };
  
  export default SettingAddExpensesReducer;
export const initialState = {
  categoryname: "",
  subcategoryname: "",
  id: 0,
  statusCodeSettingsAddExpenses: 0,
  getExpenseData: [],
  CategoryError: ''
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

    case 'CATEGORY_ERROR':
      return { ...state, CategoryError: action.payload }

    case 'CLEAR_CATEGORY_ERROR':
      return { ...state, CategoryError: '' }

    default:
      return state;
  }
};

export default SettingAddExpensesReducer;
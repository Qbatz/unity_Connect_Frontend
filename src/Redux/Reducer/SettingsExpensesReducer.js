export const initialState = {
 
    categoryname:'',
    subcategoryname:'',
    id:0,
    statusCodeSettingsAddExpenses:0,
 
 }
 const SettingAddExpensesReducer = (state = initialState, action) => {
 
 
      switch (action.type) {

          case 'SETTINGADDEXPENSES':
          return { ...state, categoryname: action.payload.category_Name, subcategoryname: action.payload.sub_Category,
            
           }
           case 'CLEARSETTINGADDEXPENSES':
           return{ ...state, statusCodeSettingsAddExpenses:0
                }

            default:
                return state
            }

 }
 export default SettingAddExpensesReducer;
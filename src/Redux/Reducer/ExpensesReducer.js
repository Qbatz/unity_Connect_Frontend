export const initialState = {
    id: 0,
    getexpenses: [],
    statusCodeExpenses: 0,
    addexpenses: '',
    statusCodeAddExpenses: 0,
    deleteExpensesStatusCode: 0
}

const ExpensesReducer = (state = initialState, action) => {
    console.log("action", action.payload);


    switch (action.type) {

        case 'GET_EXPENSES':
            return {
                ...state, getexpenses: action.payload.response.data

                , statusCodeExpenses: action.payload.statusCode
            }
        case 'CLEAR_STATUS_CODE_GET_EXPENSES':
            return { ...state, statusCodeExpenses: 0 }



        case 'ADD_EXPENSES':
            return {
                ...state, getexpenses: action.payload.response.data

                , statusCodeAddExpenses: action.payload.statusCode
            }
        case 'CLEAR_STATUS_CODE_ADD_EXPENSES':
            return { ...state, statusCodeAddExpenses: 0 }

        case 'DELETE_EXPENSES':
            return { ...state, deleteExpensesStatusCode: action.payload.statusCode }
        case 'CLEAR_DELETE_EXPENSES':
            return { ...state, deleteExpensesStatusCode: 0 }

        default:
            return state;

    }


}
export default ExpensesReducer;
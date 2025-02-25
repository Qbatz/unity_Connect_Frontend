
const initialState = {
    Users: [],
    addUser: [],
    statusCodeForAddUser: 0,
    phoneError: '',
    emailError: '',
    
}

const AddMemberReducer = (state = initialState, action) => {
   console.log("action",action.payload);
   
    switch (action.type) {


        case'ADD_USER_SUCCESS':
            return { ...state, addUser: action.payload.message, statusCodeForAddUser: action.payload.statusCode }
        case 'CLEAR_STATUS_CODES':
            return { ...state, statusCodeForAddUser: 0 }


        case 'PHONE_ERROR':
            return { ...state, phoneError: action.payload }

        case 'CLEAR_PHONE_ERROR':
            return { ...state, phoneError: '' }

        case 'EMAIL_ERROR':
            return { ...state, emailError: action.payload }

        case 'CLEAR_EMAIL_ERROR':
            return { ...state, emailError: '' }



    }
    return state;
}
export default AddMemberReducer;
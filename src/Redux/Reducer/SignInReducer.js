const initialState = {
    id: 0,
    email_Id: '',
    password: '',
    errorEmail: '',
    errorPassword: '',
    statusCode: 0,
};

const SignInReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ERROR_EMAIL':
            return { ...state, errorEmail: action.payload };
        case 'ERROR_PASSWORD':
            return { ...state, errorPassword: action.payload };
        case 'SIGNIN-SUCCESS':
            return { ...state, statusCode: 200, errorEmail: '', errorPassword: '' };
        case 'CLEAR_ERROR_EMAIL':
            return { ...state, errorEmail: '', statusCode: 0 };
        case 'CLEAR_ERROR_PASSWORD':
            return { ...state, errorPassword: '', statusCode: 0 };
        default:
            return state;
    }
};
export default SignInReducer;

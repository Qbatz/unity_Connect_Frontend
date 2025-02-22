// const initialState = {
//     id: 0,
//     email_Id: '',
//     password: '',
//     errorEmail: '',
//     errorPassword: '',
//     errorMessage: '',
//     statusCode: 0,
//     signInformation: [],
// }
// const SignInReducer = (state = initialState, action) => {
//     console.log("action", action)
//     switch (action.type) {

//         case 'SIGNIN-INFO':
//             return { ...state, signInformation: action.payload.statusCode }

//         // case 'SIGNIN-INFO':
//         //     return { ...state, signInformation: action.payload.response.Data, email_Id: action.payload.response.email_Id, password: action.payload.response.password, errorEmail: '', errorPassword: '', errorMessage: '', statusCode: action.payload.statusCode, 
//         //     JWTtoken: action.payload.response.token
//         //      }
      
//     }

//     return state
// }
// export default SignInReducer;


const initialState = {
    id: 0,
    email_Id: '',
    password: '',
    errorEmail: '',
    errorPassword: '',
    errorMessage: '',
    statusCode: 0,
    signInformation: [],
};

const SignInReducer = (state = initialState, action) => {
    console.log("action", action);
    switch (action.type) {
        case 'SIGNIN-INFO':
            return { 
                ...state, 
                signInformation: action.payload.response,  // ✅ Fixed response update
                statusCode: action.payload.statusCode 
            };

        default:
            return state;  // ✅ Added default case to avoid returning undefined state
    }
};

export default SignInReducer;

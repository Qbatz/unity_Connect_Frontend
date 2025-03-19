export const initialState = {
   id: 0,
   statusCodeTwo: 0,
   EmailId: '',
   Password: '',
   MobileNo: '',
   Name: '',
   errorMessage: '',
   accountMgs: {},
   IsEnable: '',
   accountList: [],
   statusCodeForAccount: 0,
   statusCodeCreateAccount: 0,
   message: '',
   emailError: '',
   mobileError: '',
   email_mobile_Error: '',
   passwordDoesnotMatchError: '',

}
const CreateAccountReducer = (state = initialState, action) => {



   switch (action.type) {
      case 'ERROR':
         return { ...state, errorMessage: action.payload }
      case 'CREATEACCOUNTPAGE':
         return { ...state, MobileNo: action.payload.phone, EmailId: action.payload.email_id, Password: action.payload.password, Name: action.payload.name, accountMgs: action.payload.response, statusCodeCreateAccount: action.payload.statusCode }
      case 'CLEAR_STATUS_CODE_CREATE_ACCOUNT':
         return { ...state, statusCodeCreateAccount: 0 }
      case 'CREATEACCOUNT':
         return { ...state, MobileNo: action.payload.phone, EmailId: action.payload.email_id, Password: action.payload.password, Name: action.payload.name, accountMgs: action.payload.response, statusCodeForAccount: action.payload.statusCode }
      case 'CLEAR_STATUS_CODE_ACCOUNT':
         return { ...state, statusCodeForAccount: 0, }

      case 'CLEAR_UPDATE_STATUS_CODE_ACCOUNT':
         return { ...state, statuscodeforUpdateprofile: 0 }
      case 'PASSWORD-UPDATE':
         return { ...state, message: action.payload.message }


      case 'ACCOUNT_DETAILS':
         return { ...state, accountList: [action.payload.response], statusCodeForAccountList: action.payload.statusCode }

      case 'CLEAR_ACCOUNT_STATUS_CODE':
         return { ...state, statusCodeForAccountList: 0 }

      case 'EMAIL_ERROR':
         return { ...state, emailError: action.payload }

      case 'CLEAR_EMAIL_ERROR':
         return { ...state, emailError: '' }

      case 'MOBILE_ERROR':
         return { ...state, mobileError: action.payload }

      case 'CLEAR_MOBILE_ERROR':
         return { ...state, mobileError: '' }
      case 'EMAIL_MOBILE_ERROR':
         return { ...state, email_mobile_Error: action.payload }

      case 'CLEAR_EMAIL_MOBILE_ERROR':
         return { ...state, email_mobile_Error: '' }

      case 'PASSWORD_DOESNT_ERROR':
         return { ...state, passwordDoesnotMatchError: action.payload }
      case 'CLEAR_PASSWORD_DOESNT_ERROR':
         return { ...state, passwordDoesnotMatchError: '' }

      default:
         return state;
   }

}
export default CreateAccountReducer;
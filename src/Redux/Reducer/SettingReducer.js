const initialState = {
    MemberIDprefix:'',
    MemberIdsuffix:'',
    statusCodeMemberID:0,
    LoanIDprefix:'',
    LoanIDsuffix:'',
    statusCodeLoanID:0,
 
 }
 const SettingReducer = (state = initialState, action) => {
 
 
      switch (action.type) {
      
          case 'SETTINGS_MEMBER_ID':
          return { ...state, MemberIDprefix: action.payload.prefix, MemberIdsuffix: action.payload.suffix, statusCodeMemberID:action.payload.statusCode}
          case 'CLEAR_STATUS_CODE_MEMBER_ID':
             return {...state, statusCodeMemberID:0}

             case 'SETTINGS_LOAN_ID':
          return { ...state, LoanIDprefix: action.payload.prefix, LoanIDsuffix: action.payload.suffix, statusCodeLoanID:action.payload.statusCode}
          case 'CLEAR_STATUS_CODE_LOAN_ID':
             return {...state, statusCodeLoanID:0}  
         default:
            return state;
}

 }
 export default SettingReducer;
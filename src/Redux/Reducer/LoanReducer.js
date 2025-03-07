export const initialState = {
    memberid: "",
    witnessid: "",
    loanamount: "",
    statusCodeLoans: 0,
    id:"",
  getLoanTab:[],
  
  };
  
const LoanReducer = (state = initialState, action) => {
    switch (action.type) {
        case "LOANADD":
            return {
                ...state,
                memberid: action.payload.member_id,
                witnessid: action.payload.widness_ids,
                loanamount: action.payload.loan_amount,
                statusCodeLoans: 200,
            };

            
            case "GETLOAN":
                return {
                   ...state, getLoanTab: action.payload.response, statusCodeLoans: action.payload.statusCode 
                };

                case "ADDWITNESS":
                    return {
                        ...state,
                        memberid: action.payload.member_id ?? state.memberid,
                        witnessid: action.payload.widness_ids,
                        id:action.payload.id,
                        statusCodeLoans: 200,
                    };
                

            

        case "CLEARLOAN":
            return {
                ...state,
                statusCodeLoans: 0,
            };

        default:
            return state;
    }
};

  export default LoanReducer;
  
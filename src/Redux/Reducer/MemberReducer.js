const initialState = {
    id: 0,
   statusCodeMemberList:0,
    Memberdata:[],
 
 }
 const MemberListReducer = (state = initialState, action) => {
    
   
      switch (action.type) {
      
          case 'GET_MEMBER':
          return { ...state, Memberdata: action.payload.response.data,statusCodeMemberList:action.payload.statusCode}
          case 'CLEAR_STATUS_CODE_MEMBER_LIST':
             return {...state, statusCodeMemberList:0}

        
     
}

return state
 }
 export default MemberListReducer;
const initialState = {
    id: 0,
    statusCodeMemberList: 0,
    Memberdata: [],
    deleteMemberStatusCode:0

}
const MemberListReducer = (state = initialState, action) => {


    switch (action.type) {

        case 'GET_MEMBER':
            return { ...state, Memberdata: action.payload.response.data, statusCodeMemberList: action.payload.statusCode }
        case 'CLEAR_STATUS_CODE_MEMBER_LIST':
            return { ...state, statusCodeMemberList: 0 }

            case 'DELETE_MEMBER':
            return { ...state, deleteMemberStatusCode: action.payload.statusCode }
        case 'CLEAR _DELETE_MEMBER':
            return { ...state, deleteMemberStatusCode: 0 }

        default:
            return state;

    }


}
export default MemberListReducer;
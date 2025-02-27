import AddMemberReducer from "../../Redux/Reducer/AddMemberReducer";
import { initialState } from "../../Redux/Reducer/AddMemberReducer";

describe('it will check for add member reducer', () => {
    

    it('it checks and return the member reducer CLEAR_EMAIL_ERROR_TEST', () => {
        const action = {
            type: 'CLEAR_EMAIL_ERROR_INVALID_TEST',
            payload: ''
        }

        const addMemberReducer = AddMemberReducer({}, action)
        expect(addMemberReducer).toStrictEqual({})
    })

    it('it checks and return the member reducer ADD_USER_SUCCESS', () => {
        const action = {
            type: 'ADD_USER_SUCCESS',
            payload: {
                message: 'Added User Successfully',
                statusCode: 200
            }
        }

        expect(AddMemberReducer(initialState, action)).toStrictEqual({
            Users: [],
            addUser: 'Added User Successfully',
            statusCodeForAddUser: 200,
            statusCodeClearForAddUser: 0,
            phoneError: '',
            emailError: '',
            
        })
    })

    it('it checks and return the member reducer CLEAR_STATUS_CODES', () => {
        const action = {
            type: 'CLEAR_STATUS_CODES',
            payload: {
            }
        }

        expect(AddMemberReducer({...initialState, statusCodeForAddUser: 200}, action)).toStrictEqual({
            Users: [],
            addUser: [],
            statusCodeForAddUser: 200,
            statusCodeClearForAddUser: 0,
            phoneError: '',
            emailError: '',
            
        })
    })

    it('it checks and return the member reducer PHONE_ERROR', () => {
        const action = {
            type: 'PHONE_ERROR',
            payload: 'Invalid Phone Number'
        }

        expect(AddMemberReducer({...initialState, statusCodeForAddUser: 200}, action)).toStrictEqual({
            Users: [],
            addUser: [],
            statusCodeForAddUser: 200,
            statusCodeClearForAddUser: 0,
            phoneError: 'Invalid Phone Number',
            emailError: '',
            
        })
    })

    it('it checks and return the member reducer CLEAR_PHONE_ERROR', () => {
        const action = {
            type: 'CLEAR_PHONE_ERROR',
            payload: ''
        }

        expect(AddMemberReducer({...initialState, phoneError: 'Invalid Phone Number'}, action)).toStrictEqual({
            Users: [],
            addUser: [],
            statusCodeForAddUser: 0,
            statusCodeClearForAddUser: 0,
            phoneError: '',
            emailError: '',
            
        })
    })

    it('it checks and return the member reducer EMAIL_ERROR', () => {
        const action = {
            type: 'EMAIL_ERROR',
            payload: 'Invalid Email'
        }

        expect(AddMemberReducer({...initialState, phoneError: 'Invalid Phone Number'}, action)).toStrictEqual({
            Users: [],
            addUser: [],
            statusCodeForAddUser: 0,
            statusCodeClearForAddUser: 0,
            phoneError: 'Invalid Phone Number',
            emailError: 'Invalid Email',
            
        })
    })

    it('it checks and return the member reducer CLEAR_EMAIL_ERROR', () => {
        const action = {
            type: 'CLEAR_EMAIL_ERROR',
            payload: ''
        }

        expect(AddMemberReducer({...initialState, emailError: 'Invalid Email'}, action)).toStrictEqual({
            Users: [],
            addUser: [],
            statusCodeForAddUser: 0,
            statusCodeClearForAddUser: 0,
            phoneError: '',
            emailError: '',
            
        })
    })
})
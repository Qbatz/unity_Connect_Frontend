import SignInReducer from "../../Redux/Reducer/SignInReducer";
import { initialState as INITIAL_STATE } from "../../Redux/Reducer/SignInReducer";

describe('check for sign in reducer', () => {

    it('it should check for No INITIAL STATE', () => {
        const action = {
            type: 'CLEAR_ERROR_PASSWORD1',
            payload: ''
        }

        const signIn = SignInReducer({}, action)
        expect(signIn).toEqual({})
    })

    it('it should check for SIGNIN-INFO', () => {
        const action = {
            type: 'SIGNIN-INFO',
            payload: {
                statusCode: 200,
                token: 'ABCD1234'
            }
        }
        const signIn = SignInReducer(INITIAL_STATE, action)
        expect(signIn).toEqual({
            id: 0,
            email_Id: '',
            password: '',
            errorEmail: '',
            errorPassword: '',
            signinsuccessstatuscode: 200,
            JWTtoken: 'ABCD1234',
            statusCode: 0,
            isLoggedIn: false
        })
    })

    it('it should check for REMOVE_LOGIN_STATUS_CODE', () => {
        const action = {
            type: 'REMOVE_LOGIN_STATUS_CODE',
        }
        const signIn = SignInReducer(INITIAL_STATE, action)
        expect(signIn).toEqual({
            id: 0,
            email_Id: '',
            password: '',
            errorEmail: '',
            errorPassword: '',
            signinsuccessstatuscode: 0,
            JWTtoken: '',
            statusCode: 0,
            isLoggedIn: false
        })
    })

    it('it should check for EMAIL_ERROR', () => {
        const action = {
            type: 'ERROR_EMAIL',
            payload: 'Email Error'
        }

        const signIn = SignInReducer({...INITIAL_STATE, JWTtoken: 'ABCD123' }, action)
        expect(signIn).toEqual({
            id: 0,
            email_Id: '',
            password: '',
            errorEmail: 'Email Error',
            errorPassword: '',
            signinsuccessstatuscode: 0,
            JWTtoken: 'ABCD123',
            statusCode: 0,
            isLoggedIn: false
        })
    })

    it('it should check for ERROR_PASSWORD', () => {
        const action = {
            type: 'ERROR_PASSWORD',
            payload: 'Password Error'
        }

        const signIn = SignInReducer({...INITIAL_STATE, JWTtoken: 'ABCD123' }, action)
        expect(signIn).toEqual({
            id: 0,
            email_Id: '',
            password: '',
            errorEmail: '',
            errorPassword: 'Password Error',
            signinsuccessstatuscode: 0,
            JWTtoken: 'ABCD123',
            statusCode: 0,
            isLoggedIn: false
        })
    })

    it('it should check for SIGNIN-SUCCESS', () => {
        const action = {
            type: 'SIGNIN-SUCCESS',
            payload: ''
        }

        const signIn = SignInReducer({...INITIAL_STATE, JWTtoken: 'ABCD123' }, action)
        expect(signIn).toEqual({
            id: 0,
            email_Id: '',
            password: '',
            errorEmail: '',
            errorPassword: '',
            signinsuccessstatuscode: 0,
            JWTtoken: 'ABCD123',
            statusCode: 0,
            isLoggedIn: true
        })
    })

    it('it should check for LOGOUT', () => {
        const action = {
            type: 'LOGOUT',
            payload: ''
        }

        const signIn = SignInReducer({...INITIAL_STATE, JWTtoken: '' }, action)
        expect(signIn).toEqual({
            id: 0,
            email_Id: '',
            password: '',
            errorEmail: '',
            errorPassword: '',
            signinsuccessstatuscode: 0,
            JWTtoken: '',
            statusCode: 0,
            isLoggedIn: false
        })
    })

    it('it should check for CLEAR_ERROR_EMAIL', () => {
        const action = {
            type: 'CLEAR_ERROR_EMAIL',
            payload: ''
        }

        const signIn = SignInReducer({...INITIAL_STATE, statusCode: 200, errorEmail: 'Email Error' }, action)
        expect(signIn).toEqual({
            id: 0,
            email_Id: '',
            password: '',
            errorEmail: '',
            errorPassword: '',
            signinsuccessstatuscode: 0,
            JWTtoken: '',
            statusCode: 0,
            isLoggedIn: false
        })
    })

    it('it should check for CLEAR_ERROR_PASSWORD', () => {
        const action = {
            type: 'CLEAR_ERROR_PASSWORD',
            payload: ''
        }

        const signIn = SignInReducer({...INITIAL_STATE, statusCode: 200, errorPassword: 'Password Error' }, action)
        expect(signIn).toEqual({
            id: 0,
            email_Id: '',
            password: '',
            errorEmail: '',
            errorPassword: '',
            signinsuccessstatuscode: 0,
            JWTtoken: '',
            statusCode: 0,
            isLoggedIn: false
        })
    })
})
import CreateAccountReducer from "../../Redux/Reducer/CreateAccountReducer";

describe('it should check for create acoount reducer', () => {
    const INITIAL_STATE = {
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

    it('it should check for ERROR', () => {
        const action = {
            type: 'ERROR',
            payload: 'Invalid'
        }

        expect(CreateAccountReducer(INITIAL_STATE, action)).toStrictEqual({
            id: 0,
            statusCodeTwo: 0,
            EmailId: '',
            Password: '',
            MobileNo: '',
            Name: '',
            errorMessage: 'Invalid',
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
        })
    })

    it('it should check for CREATEACCOUNTPAGE', () => {
        const action = {
            type: 'CREATEACCOUNTPAGE',
            payload: {
                phone: '9876543210',
                email_id: 'abcd@gmail.com',
                password: 'qwer1234',
                name: 'Abcd',
                response: 'success',
                statusCode: 200
            }
        }

        expect(CreateAccountReducer(INITIAL_STATE, action)).toStrictEqual({
            id: 0,
            statusCodeTwo: 0,
            EmailId: 'abcd@gmail.com',
            Password: 'qwer1234',
            MobileNo: '9876543210',
            Name: 'Abcd',
            errorMessage: '',
            accountMgs: 'success',
            IsEnable: '',
            accountList: [],
            statusCodeForAccount: 0,
            statusCodeCreateAccount: 200,
            message: '',
            emailError: '',
            mobileError: '',
            email_mobile_Error: '',
            passwordDoesnotMatchError: '',
        })
    })

    it('it should check for CLEAR_STATUS_CODE_CREATE_ACCOUNT', () => {
        const action = {
            type: 'CLEAR_STATUS_CODE_CREATE_ACCOUNT',
            payload: {
                phone: '9876543210',
                email_id: 'abcd@gmail.com',
                password: 'qwer1234',
                name: 'Abcd',
                response: 'success'
            }
        }

        expect(CreateAccountReducer({
            ...INITIAL_STATE, MobileNo: '9876543210',
            EmailId: 'abcd@gmail.com',
            Password: 'qwer1234',
            Name: 'Abcd'
        }, action)).toStrictEqual({
            id: 0,
            statusCodeTwo: 0,
            EmailId: 'abcd@gmail.com',
            Password: 'qwer1234',
            MobileNo: '9876543210',
            Name: 'Abcd',
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
        })
    })

    it('it should check for CREATEACCOUNT', () => {
        const action = {
            type: 'CREATEACCOUNT',
            payload: {
                phone: '6767676767',
                email_id: 'abcdxyz@gmail.com',
                password: 'qwer@1234',
                name: 'Tester',
                response: 'success',
                statusCode: 200
            }
        }

        expect(CreateAccountReducer({
            ...INITIAL_STATE, MobileNo: '9876543210',
            EmailId: 'abcd@gmail.com',
            Password: 'qwer1234',
            Name: 'Abcd'
        }, action)).toStrictEqual({
            id: 0,
            statusCodeTwo: 0,
            EmailId: 'abcdxyz@gmail.com',
            Password: 'qwer@1234',
            MobileNo: '6767676767',
            Name: 'Tester',
            errorMessage: '',
            accountMgs: 'success',
            IsEnable: '',
            accountList: [],
            statusCodeForAccount: 200,
            statusCodeCreateAccount: 0,
            message: '',
            emailError: '',
            mobileError: '',
            email_mobile_Error: '',
            passwordDoesnotMatchError: '',
        })
    })

    it('it should check for CLEAR_STATUS_CODE_ACCOUNT', () => {
        const action = {
            type: 'CLEAR_STATUS_CODE_ACCOUNT',
            payload: ''
        }

        expect(CreateAccountReducer({
            ...INITIAL_STATE, MobileNo: '9876543210',
            EmailId: 'abcd@gmail.com',
            Password: 'qwer1234',
            Name: 'Abcd'
        }, action)).toStrictEqual({
            id: 0,
            statusCodeTwo: 0,
            EmailId: 'abcd@gmail.com',
            Password: 'qwer1234',
            MobileNo: '9876543210',
            Name: 'Abcd',
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
        })
    })

    it('it should check for CLEAR_UPDATE_STATUS_CODE_ACCOUNT', () => {
        const action = {
            type: 'CLEAR_UPDATE_STATUS_CODE_ACCOUNT',
            payload: {
                phone: '6767676767',
                email_id: 'abcdxyz@gmail.com',
                password: 'qwer@1234',
                name: 'Tester',
                response: 'success',
                statusCode: 200
            }
        }

        expect(CreateAccountReducer({
            ...INITIAL_STATE,
        }, action)).toStrictEqual({
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
            statuscodeforUpdateprofile: 0
        })
    })

})
import SettingReducer from "../../Redux/Reducer/SettingReducer";
import { initialState as INITIAL_STATE } from "../../Redux/Reducer/SettingReducer";

describe('it checks on settings reducer', () => {
   

    it('it will check for SETTINGS_MEMBER_ID', () => {
        const action = {
            type: 'SETTINGS_MEMBER_ID',
            payload: {
                prefix: 'A',
                suffix: 'A',
                statusCode: 200
            }
        }

        expect(SettingReducer(INITIAL_STATE, action)).toStrictEqual({
            MemberIDprefix: 'A',
            MemberIdsuffix: 'A',
            statusCodeMemberID: 200,
            LoanIDprefix: '',
            LoanIDsuffix: '',
            statusCodeLoanID: 0,
            error: '',
            TransactionIDprefix: '',
            TransactionIDsuffix: '',
            statusCodeTransactionID: 0,
        })
    })

    it('it will check for CLEAR_STATUS_CODE_MEMBER_ID', () => {
        const action = {
            type: 'CLEAR_STATUS_CODE_MEMBER_ID',
            payload: {
                prefix: 'A',
                suffix: 'A',
                statusCode: 200
            }
        }

        expect(SettingReducer({...INITIAL_STATE, MemberIDprefix: 'A',  MemberIdsuffix: 'A',
            statusCodeMemberID: 200}, action)).toStrictEqual({
            MemberIDprefix: 'A',
            MemberIdsuffix: 'A',
            statusCodeMemberID: 0,
            LoanIDprefix: '',
            LoanIDsuffix: '',
            statusCodeLoanID: 0,
            error: '',
            TransactionIDprefix: '',
            TransactionIDsuffix: '',
            statusCodeTransactionID: 0,
        })
    })

    it('it will check for SETTINGS_LOAN_ID', () => {
        const action = {
            type: 'SETTINGS_LOAN_ID',
            payload: {
                prefix: 'A',
                suffix: 'A',
                statusCode: 200
            }
        }

        expect(SettingReducer({...INITIAL_STATE, MemberIDprefix: 'A',  MemberIdsuffix: 'A'}, action)).toStrictEqual({
            MemberIDprefix: 'A',
            MemberIdsuffix: 'A',
            statusCodeMemberID: 0,
            LoanIDprefix: 'A',
            LoanIDsuffix: 'A',
            statusCodeLoanID: 200,
            error: '',
            TransactionIDprefix: '',
            TransactionIDsuffix: '',
            statusCodeTransactionID: 0,
        })
    })

    it('it will check for CLEAR_STATUS_CODE_LOAN_ID', () => {
        const action = {
            type: 'CLEAR_STATUS_CODE_LOAN_ID',
            payload: {
                prefix: 'A',
                suffix: 'A',
                statusCode: 200
            }
        }

        expect(SettingReducer({...INITIAL_STATE, LoanIDprefix: 'A',  LoanIDsuffix: 'A', statusCodeLoanID: 200}, action)).toStrictEqual({
            MemberIDprefix: '',
            MemberIdsuffix: '',
            statusCodeMemberID: 0,
            LoanIDprefix: 'A',
            LoanIDsuffix: 'A',
            statusCodeLoanID: 0,
            error: '',
            TransactionIDprefix: '',
            TransactionIDsuffix: '',
            statusCodeTransactionID: 0,
        })
    })

    it('it will check for ERROR', () => {
        const action = {
            type: 'ERROR',
            payload: 'Invalid Request'
        }

        expect(SettingReducer({...INITIAL_STATE, LoanIDprefix: 'A',  LoanIDsuffix: 'A'}, action)).toStrictEqual({
            MemberIDprefix: '',
            MemberIdsuffix: '',
            statusCodeMemberID: 0,
            LoanIDprefix: 'A',
            LoanIDsuffix: 'A',
            statusCodeLoanID: 0,
            error: 'Invalid Request',
            TransactionIDprefix: '',
            TransactionIDsuffix: '',
            statusCodeTransactionID: 0,
        })
    })

    it('it will check for CLEAR_ERROR', () => {
        const action = {
            type: 'CLEAR_ERROR',
            payload: 'Invalid Request'
        }

        expect(SettingReducer({...INITIAL_STATE, error: 'Invalid Request'}, action)).toStrictEqual({
            MemberIDprefix: '',
            MemberIdsuffix: '',
            statusCodeMemberID: 0,
            LoanIDprefix: '',
            LoanIDsuffix: '',
            statusCodeLoanID: 0,
            error: '',
            TransactionIDprefix: '',
            TransactionIDsuffix: '',
            statusCodeTransactionID: 0,
        })
    })

    it('it will check for DEFAULT_CASE', () => {
        const action = {
            type: 'CLEAR_ERROR_TYPE',
            payload: 'Invalid Request'
        }

        expect(SettingReducer({...INITIAL_STATE}, action)).toStrictEqual({
            MemberIDprefix: '',
            MemberIdsuffix: '',
            statusCodeMemberID: 0,
            LoanIDprefix: '',
            LoanIDsuffix: '',
            statusCodeLoanID: 0,
            error: '',
            TransactionIDprefix: '',
            TransactionIDsuffix: '',
            statusCodeTransactionID: 0,
        })
    })
})

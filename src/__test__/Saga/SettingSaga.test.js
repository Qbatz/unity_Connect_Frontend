import { runSaga } from 'redux-saga';
import { SettingMemberID, SettingLoanID } from '../../Redux/SagaMiddleware/SettingSaga';
import { SettingMemberIDAction, SettingLoanIDAction } from '../../Redux/Action/SettingAction';

jest.mock('react-toastify', () => ({
    toast: {
        success: jest.fn(),
        error: jest.fn(),
    },
}));

jest.mock('../../Redux/Action/SettingAction', () => ({
    SettingMemberIDAction: jest.fn(),
    SettingLoanIDAction: jest.fn()
}));

describe('it should check for settings saga', () => {
   
    it('it should check for SettingMemberID', async () => {
        const mockAction = { type: 'SETTINGSMEMBERID', payload: { } };
        const mockResponse = {
            status: 200,
            data: {
                message: "Login successful",
                statusCode: 200,
                token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcl9uYW1lIjoiY2NjIiwiaWF0IjoxNzQwMzkyNTI0LCJleHAiOjE3NDAzOTYxMjR9.9LS6--AYmEgYFprJF9EjimUt6Z0B24v32rxEFaXk_nI"
            }


        };
        let dispatchedActions = [];
        SettingMemberIDAction.mockResolvedValue(mockResponse);

        await runSaga(
            {
                dispatch: (action) => {

                    return dispatchedActions.push(action)
                }
            },
            SettingMemberID,
            mockAction
        ).toPromise();

        expect(dispatchedActions[0]).toStrictEqual({
            type: "SETTINGS_MEMBER_ID",
            payload: {
                response: mockResponse.data,
                statusCode: mockResponse.status
            }
        })
    })

    it('it should check for SettingLoanID', async () => {
        const mockAction = { type: 'SETTINGSLOANID', payload: { } };
        const mockResponse = {
            status: 200,
            data: {
                message: "Login successful",
                statusCode: 200,
                token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcl9uYW1lIjoiY2NjIiwiaWF0IjoxNzQwMzkyNTI0LCJleHAiOjE3NDAzOTYxMjR9.9LS6--AYmEgYFprJF9EjimUt6Z0B24v32rxEFaXk_nI"
            }


        };
        let dispatchedActions = [];
        SettingLoanIDAction.mockResolvedValue(mockResponse);

        await runSaga(
            {
                dispatch: (action) => {

                    return dispatchedActions.push(action)
                }
            },
            SettingLoanID,
            mockAction
        ).toPromise();

        expect(dispatchedActions[0]).toStrictEqual({
            type: "SETTINGS_LOAN_ID",
            payload: {
                response: mockResponse.data,
                statusCode: mockResponse.status
            }
        })
    })
})
import { runSaga } from 'redux-saga';
import { handleAddMember } from "../../Redux/SagaMiddleware/AddMemberSaga";
import { addMember } from "../../Redux/Action/AddMemberAction";

jest.mock('react-toastify', () => ({
    toast: {
        success: jest.fn(),
        error: jest.fn(),
    },
}));

jest.mock('../../Redux/Action/AddMemberAction', () => ({
    addMember: jest.fn()
}));

describe('cases for add member sagas', () => {
    it('it should handle for add user', async () => {
        const mockAction = { type: 'MEMBERINFO', payload: {} };

        const mockResponse = {
            status: 200,
            message: "Added successfully",
        };

        let dispatchedActions = [];
        addMember.mockResolvedValue(mockResponse);

        await runSaga(
            {
                dispatch: (action) => {
                    return dispatchedActions.push(action)
                }
            },
            handleAddMember,
            mockAction
        ).toPromise();

        expect(dispatchedActions[0]).toStrictEqual({
            type: "ADD_USER_SUCCESS",
            payload: {
                response: mockResponse.message,
                statusCode: mockResponse.status
            }
        })
    })

    it('it should handle for add user shows 202', async () => {
        const mockAction = { type: 'MEMBERINFO', payload: {} };

        const mockResponse = {
            status: 202,
            message: "Phone number already registered",
            statusCode: 202
        };

        let dispatchedActions = [];
        addMember.mockResolvedValue(mockResponse);

        await runSaga(
            {
                dispatch: (action) => {
                    return dispatchedActions.push(action)
                }
            },
            handleAddMember,
            mockAction
        ).toPromise();

        expect(dispatchedActions[0]).toStrictEqual({
            type: "PHONE_ERROR",
            payload: mockResponse.message
        })
    })

    it('it should handle for add user shows 203', async () => {
        const mockAction = { type: 'MEMBERINFO', payload: {} };

        const mockResponse = {
            status: 203,
            message: "Email already registered",
            statusCode: 203
        };

        let dispatchedActions = [];
        addMember.mockResolvedValue(mockResponse);

        await runSaga(
            {
                dispatch: (action) => {
                    return dispatchedActions.push(action)
                }
            },
            handleAddMember,
            mockAction
        ).toPromise();

        expect(dispatchedActions[0]).toStrictEqual({
            type: "EMAIL_ERROR",
            payload: mockResponse.message
        })
    })
})
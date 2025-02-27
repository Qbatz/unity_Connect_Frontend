import { runSaga } from 'redux-saga';
import { SignIn } from '../../Redux/SagaMiddleware/SignInSaga';
import { SignIncall } from '../../Redux/Action/SignInAction';


jest.mock('react-toastify', () => ({
    toast: {
        success: jest.fn(),
        error: jest.fn(),
    },
}));

jest.mock('../../Redux/Action/SignInAction', () => ({
    SignIncall: jest.fn()
}))

describe('SignIn Saga', () => {
    const mockAction = { type: 'SIGNININFO', payload: { email: 'abcd@example.com', password: 'abcd123' } };
   
    it('it should return the signIn success', async () => {

        const mockResponse = {
            status: 200,
            data: {
                    message: "Login successful",
                    statusCode: 200,
                    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcl9uYW1lIjoiY2NjIiwiaWF0IjoxNzQwMzkyNTI0LCJleHAiOjE3NDAzOTYxMjR9.9LS6--AYmEgYFprJF9EjimUt6Z0B24v32rxEFaXk_nI"
                }
            
           
        };
        let dispatchedActions = [];
        SignIncall.mockResolvedValue(mockResponse);
       

        await runSaga(
            {
                dispatch: (action) => {
                   
                    return dispatchedActions.push(action)
                }
            },
            SignIn,
            mockAction
        ).toPromise();

        expect(dispatchedActions[0]).toStrictEqual({
            type: "SIGNIN-INFO",
            payload: mockResponse.data
        })

    })

    it('it should return the failure with 203', async () => {
        const mockResponse = {
            status: 203,
            data: {
                message: "Invalid Email Id!"
            }
        };
        let dispatchedActions = [];
        SignIncall.mockResolvedValue(mockResponse);

        await runSaga(
            {
                dispatch: (action) => {
                   
                    return dispatchedActions.push(action)
                }
            },
            SignIn,
            mockAction
        ).toPromise();

        expect(dispatchedActions[0]).toStrictEqual({
            type: "ERROR_EMAIL",
            payload: mockResponse.data.message
        })
    })

    it('it should return the failure with 202', async () => {
        const mockResponse = {
            status: 202,
            data: {
                message: "Invalid Password!"
            }
        };
        let dispatchedActions = [];
        SignIncall.mockResolvedValue(mockResponse);

        await runSaga(
            {
                dispatch: (action) => {
                   
                    return dispatchedActions.push(action)
                }
            },
            SignIn,
            mockAction
        ).toPromise();

        expect(dispatchedActions[0]).toStrictEqual({
            type: 'ERROR_PASSWORD',
            payload: mockResponse.data.message
        })
    })

    it('it should throw the network error', async () => {
        const mockError = new Error("Network Error");
        let dispatchedActions = [];
        SignIncall.mockRejectedValue(mockError);

        await runSaga(
            {
                dispatch: (action) => {
                   
                    return dispatchedActions.push(action)
                }
            },
            SignIn,
            mockAction
        ).toPromise();

        expect(dispatchedActions[0]).toStrictEqual({
            type: 'ERROR_EMAIL',
            payload: 'Error'
        })
    })
})


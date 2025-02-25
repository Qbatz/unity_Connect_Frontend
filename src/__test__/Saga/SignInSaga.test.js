import { runSaga } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import SignInSaga, { SignIn } from '../../Redux/SagaMiddleware/SignInSaga';
import { SignIncall } from '../../Redux/Action/SignInAction';
import { toast } from 'react-toastify';


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
   
    it.only('it should return the signIn success', async () => {

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
})


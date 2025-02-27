import { refreshToken } from "../../Config/Tokenizer";
import Cookies from 'universal-cookie';

jest.mock('universal-cookie');

describe('this will check for refresh token', () => {

    let setter;
    beforeEach(() => {
        setter = jest.fn();
        Cookies.mockImplementation(() => ({
            set: setter,
        }));
    });

    it('it will successfully create new token', () => {
        const mockResponse = { refresh_token: 'new_refresh_token' };
        refreshToken(mockResponse);
        expect(setter).toHaveBeenCalledWith('UnityConnectToken', 'new_refresh_token', { path: '/' });
    })

    it('it will check for status code 206', () => {
        const mockResponse = { status: 206 };
        refreshToken(mockResponse);
        expect(setter).toHaveBeenCalledWith('Unity_ConnectToken_Access-Denied', 206, { path: '/' });
    })

    it('it will check for statusCode 206', () => {
        const mockResponse = { statusCode: 206 };
        refreshToken(mockResponse);
        expect(setter).toHaveBeenCalledWith('Unity_ConnectToken_Access-Denied', 206, { path: '/' });
    })
})
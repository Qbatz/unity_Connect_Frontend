import Cookies from 'universal-cookie';

export function refreshToken(response) {
     
    if (response && response.refresh_token) {
       const refreshTokenGet = response.refresh_token
       const cookies = new Cookies()
       cookies.set('UnityConnectToken', refreshTokenGet, { path: '/' });
    } else if (response.status === 206 || response.statusCode === 206) {
       const message = response.status ||  response.statusCode   
       const cookies = new Cookies()
       cookies.set('Unity_ConnectToken_Access-Denied', message, { path: '/' });
    }
 
 }
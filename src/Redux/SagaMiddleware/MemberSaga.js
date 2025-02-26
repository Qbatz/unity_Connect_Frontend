import { call, takeEvery, put } from 'redux-saga/effects';
import { ActiveMemberGetAction } from '../Action/MemberAction';

import Cookies from 'universal-cookie';

function* handleMemberList(action) {
   
    const response = yield call(ActiveMemberGetAction, action.payload);
   
    
     if (response.statusCode === 200 || response.status === 200) {
        yield put({
            type: 'GET_MEMBER',
            payload: { response:response.data, statusCode: response.statusCode || response.status },
        });

    } 
     if (response) {
            refreshToken(response);
        }
}

function refreshToken(response) {
  
   
   if (response.data && response.data.refresh_token) {
      const refreshTokenGet = response.data.refresh_token
      const cookies = new Cookies()
      cookies.set('UnityConnectToken', refreshTokenGet, { path: '/' });
   } else if (response.status === 206) {
      const message = response.status     
      const cookies = new Cookies()
      cookies.set('Unity_ConnectToken_Access-Denied', message, { path: '/' });

   }

}


function* MemberSaga() {
    yield takeEvery('MEMBERLIST', handleMemberList);
}

export default MemberSaga;

import { call, takeEvery, put } from 'redux-saga/effects';
import { ActiveMemberGetAction } from '../Action/MemberAction';
import { toast } from 'react-toastify';
import Cookies from 'universal-cookie';

function* handleMemberList(action) {
   
    const response = yield call(ActiveMemberGetAction, action.payload);
   
    console.log("action",action);
    

    if (response.statusCode === 200 || response.status === 200) {
        yield put({
            type: 'GET_MEMBER',
            payload: { response:response.data, statusCode: response.statusCode || response.status },
        });

        toast.success(response.data.message, {
            position: "bottom-center",
            autoClose: 2000,
            hideProgressBar: true,
            closeButton: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            style: {
                backgroundColor: "#E6F6E6",
                color: "black",
                borderRadius: "60px",
                fontFamily: "Gilroy",
                fontWeight: 600,
                fontSize: 14,
                textAlign: "start",
                display: "flex",
                alignItems: "center",
                padding: "10px",
            },
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

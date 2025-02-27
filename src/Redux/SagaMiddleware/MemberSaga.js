import { call, takeEvery, put } from 'redux-saga/effects';
import { ActiveMemberGetAction,ActiveMemberDeleteAction } from '../Action/MemberAction';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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

function* handledeleteMember(action) {
   
    const response = yield call(ActiveMemberDeleteAction, action.payload);
    var toastStyle = {
        backgroundColor: "#E6F6E6",
        color: "black",
        width: "auto",
        borderRadius: "60px",
        height: "20px",
        fontFamily: "Gilroy",
        fontWeight: 600,
        fontSize: 14,
        textAlign: "start",
        display: "flex",
        alignItems: "center", 
        padding: "10px",
       
      };
    
     if (response.statusCode === 200 || response.status === 200) {
        yield put({
            type: 'DELETE_MEMBER',
            payload: { response:response.data, statusCode: response.statusCode || response.status },
        });
        toast.success(response.data.message ,{
                  position: "bottom-center",
                  autoClose: 2000,
                  hideProgressBar: true,
                  closeButton: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  style: toastStyle,
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
    yield takeEvery('DELETEMEMBER', handledeleteMember);
}

export default MemberSaga;

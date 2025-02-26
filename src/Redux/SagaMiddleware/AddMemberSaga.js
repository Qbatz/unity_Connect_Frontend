// import { call, takeEvery, put } from 'redux-saga/effects';
// import { addMember } from '../Action/AddMemberAction';
// import { toast } from 'react-toastify';
// import Cookies from 'universal-cookie';

// function* handleAddMember(datum) {
//     const response = yield call(addMember, datum.payload);
 
//     if (response.statusCode === 200 || response.status === 200) {
//        yield put({
//           type: 'ADD_USER',
//           payload: { response: response.message, statusCode: response.statusCode || response.status },
//        });
 
//        // Define the style
//        var toastStyle = {
//           backgroundColor: "#E6F6E6",
//           color: "black",
//           width: "100%",
//           borderRadius: "60px",
//           height: "20px",
//           fontFamily: "Gilroy",
//           fontWeight: 600,
//           fontSize: 14,
//           textAlign: "start",
//           display: "flex",
//           alignItems: "center",
//           padding: "10px",
 
//        };
 
//        toast.success(response.message, {
//           position: "bottom-center",
//           autoClose: 2000,
//           hideProgressBar: true,
//           closeButton: false,
//           closeOnClick: true,
//           pauseOnHover: true,
//           draggable: true,
//           progress: undefined,
//           style: toastStyle,
//        });
//        if (response) {
//          refreshToken(response);
//        }
       
//     }
//     else if (response.statusCode === 202) {
 
//        yield put({ type: 'PHONE_ERROR', payload: response.message });
//     }
//     else if (response.statusCode === 203) {
 
//        yield put({ type: 'EMAIL_ERROR', payload: response.message });
//     }
 
//  }

// function refreshToken(response) {
//    if (response.data && response.data.refresh_token) {
//       const refreshTokenGet = response.data.refresh_token;
//       const cookies = new Cookies();
//       cookies.set('token', refreshTokenGet, { path: '/', expires: new Date(Date.now() + 86400 * 1000) }); // Expires in 1 day
//    } else if (response.status === 206) {
//       const message = response.status;
//       const cookies = new Cookies();
//       cookies.set('access-denied', message, { path: '/' });
//    }
// }


//  function* AddMemberSaga() {
//      yield takeEvery('MEMBERINFO', handleAddMember);
//  }
 
//  export default AddMemberSaga;

import { call, takeEvery, put } from 'redux-saga/effects';
import { addMember } from '../Action/AddMemberAction';
import { toast } from 'react-toastify';
import Cookies from 'universal-cookie';

function* handleAddMember(datum) {
   
    const response = yield call(addMember, datum.payload);

    console.log("response add member",response)


    if (response.statusCode === 200 || response.status === 200) {
        yield put({
            type: 'ADD_USER',
            payload: { response: response.message, statusCode: response.statusCode || response.status },
        });

        // Toast Notification
        toast.success(response.message, {
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

    } else if (response.statusCode === 202) {
        yield put({ type: 'PHONE_ERROR', payload: response.message });
    } else if (response.statusCode === 203) {
        yield put({ type: 'EMAIL_ERROR', payload: response.message });
    }
     if (response) {
            refreshToken(response);
        }
}

function refreshToken(response) {
     
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


function* AddMemberSaga() {
    yield takeEvery('MEMBERINFO', handleAddMember);
}

export default AddMemberSaga;

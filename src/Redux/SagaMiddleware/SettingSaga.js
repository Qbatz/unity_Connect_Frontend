import { call, takeEvery, put } from 'redux-saga/effects';
import { SettingMemberIDAction,SettingLoanIDAction,SettingAddLoan ,SettingGetLoan} from '../Action/SettingAction';
import { toast } from 'react-toastify';
import { refreshToken } from '../../Config/Tokenizer';

export function* SettingMemberID(action) {
    
        const response = yield call(SettingMemberIDAction, action.payload);
        
        

    if (response.status === 200 || response.statusCode === 200) {
            yield put({
                type: 'SETTINGS_MEMBER_ID',
                payload: {
                    response: response.data,
                    statusCode: response.status || response.statusCode
                }
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
        } else if (response.status === 201 || response.statusCode === 201) {
  
            yield put({ type: 'ERROR', payload: response.data.message });
        }
       
        if (response) {
            refreshToken(response);
        }
    } 


export function* SettingLoanID(action) {
    
        const response = yield call(SettingLoanIDAction, action.payload);

        var toastStyle = {
            backgroundColor: "#E6F6E6",
            color: "black",
            width : "300px",
            borderRadius: "60px",
            height: "20px",
            fontFamily: "Gilroy",
            fontWeight: 600,
            fontSize: 14,
            textAlign: "start",
            display: "flex",
            alignItems: "center",
            padding: "13px",
        };

        if (response.statusCode === 200 || response.status === 200) {
            yield put({
                type: 'SETTINGS_LOAN_ID',
                payload: {
                    response: response.data,
                    statusCode: response.status || response.statusCode
                }
            });
            toast.success(response.data.message , {
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
        else if (response.status === 201 || response.statusCode === 201) {
  
            yield put({ type: 'ERROR', payload: response.data.message });
        }
        if (response) {
            refreshToken(response);
        } 

    }  

 
    function* SettingAddLoanPage(action) {
        try {
          const response = yield call(SettingAddLoan, action.payload);
      
          if (response?.status === 200 || response?.statusCode === 200) {
            yield put({
              type: "SETTINGADDLOAN",
              payload: {
                loan_name: response.data.loan_name,
                due_on: response.data.due_on,
                due_type: response.data.due_type,
                due_count: response.data.due_count,
                statusCode: response.status || response.statusCode,
              },
            });
      
            toast.success("Loan added successfully!", {
              position: "bottom-center",
              autoClose: 2000,
              hideProgressBar: true,
            });
          } else {
            toast.error("Failed to add loan");
          }
        } catch (error) {
          console.error("Saga API Error:", error);
          toast.error("Failed to add loan");
        }
      }


      
function* SettingGetLoanPage(action) {
   
    const response = yield call(SettingGetLoan, action.payload);
   
   console.log("Loan Response:",response);
   
   
     if ( response.status === 200 ) {
        yield put({
            type: 'SETTINGSGETLOAN',
            payload: { response:response.data, statusCodeLoan: response.status },
        });
  
  
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

function* SettingSaga() {
    yield takeEvery('SETTINGSMEMBERID', SettingMemberID);
    yield takeEvery('SETTINGSLOANID', SettingLoanID);
    yield takeEvery("SETTINGS_LOAN", SettingAddLoanPage);
    yield takeEvery("SETTINGS_GET_LOAN", SettingGetLoanPage);
}

export default SettingSaga;

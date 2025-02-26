import { call, takeEvery, put } from 'redux-saga/effects';
import { SettingMemberIDAction,SettingLoanIDAction } from '../Action/SettingAction';
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
            toast.success(response.message , {
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
  

function* SettingSaga() {
    yield takeEvery('SETTINGSMEMBERID', SettingMemberID);
    yield takeEvery('SETTINGSLOANID', SettingLoanID);
}

export default SettingSaga;




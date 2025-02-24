import { call, takeEvery, put } from 'redux-saga/effects';
import { SettingMemberIDAction,SettingLoanIDAction } from '../Action/SettingAction';
import { toast } from 'react-toastify';

function* SettingMemberID(action) {
    try {
        const response = yield call(SettingMemberIDAction, action.payload);

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

        if (response.status === 200 || response.statusCode === 200) {
            yield put({
                type: 'SETTINGS_MEMBER_ID',
                payload: {
                    response: response.data,
                    statusCode: response.status || response.statusCode
                }
            });
            toast.success(response.message || "Member_Id added successfully!", {
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
       

    } catch (error) {
        console.error("MemberId failed", error);
    }
}

function* SettingLoanID(action) {
    try {
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

        if (response.status === 200 || response.statusCode === 200) {
            yield put({
                type: 'SETTINGS_LOAN_ID',
                payload: {
                    response: response.data,
                    statusCode: response.status || response.statusCode
                }
            });
            toast.success(response.message || "Loan_Id added successfully!", {
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
       

    } catch (error) {
        console.error("LoanId failed", error);
    }
}

function* SettingSaga() {
    yield takeEvery('SETTINGSMEMBERID', SettingMemberID);
    yield takeEvery('SETTINGSLOANID', SettingLoanID);
}

export default SettingSaga;




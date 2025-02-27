import { call, takeEvery, put } from 'redux-saga/effects';
import { addMember } from '../Action/AddMemberAction';
import { refreshToken } from '../../Config/Tokenizer';
import { toast } from 'react-toastify';

export function* handleAddMember(datum) {
    const response = yield call(addMember, datum.payload);

    if (response.statusCode === 200 || response.status === 200) {

        yield put({
            type: 'ADD_USER_SUCCESS',
            payload: { response: response.message, statusCode: response.statusCode || response.status },
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

    } else if (response.statusCode === 202) {
        yield put({ type: 'PHONE_ERROR', payload: response.message });
    } else if (response.statusCode === 203) {
        yield put({ type: 'EMAIL_ERROR', payload: response.message });
    }
    if (response) {
        refreshToken(response);
    }
}



function* AddMemberSaga() {
    yield takeEvery('MEMBERINFO', handleAddMember);
}

export default AddMemberSaga;

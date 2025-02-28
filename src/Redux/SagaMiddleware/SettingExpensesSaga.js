import { call, takeEvery, put } from "redux-saga/effects";
import { SettingAddExpenses ,SettingGetExpenses} from "../Action/SettingAction";
import Cookies from "universal-cookie";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function* SettingAddExpensesPage(action) {
  try {
    const response = yield call(SettingAddExpenses, action.payload);
    

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

    if (response?.status === 200 || response?.statusCode === 200) {
      
      yield put({
        type: "SETTINGADDEXPENSES",
        payload: {
          category_Name: response.data.category_Name,
          sub_Category: response.data.sub_Category,
          statusCode: response.status || response.statusCode,
        },
      });

      toast.success("Created successfully", {
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

      refreshToken(response.data);
    } else {
      console.error("API Error:", response);
    }
  } catch (error) {
    console.error("Saga API Error:", error);
    toast.error("Failed to add category");
  }
}




function* SettingGetExpensesPage(action) {
   
  const response = yield call(SettingGetExpenses, action.payload);
 
 
 
   if ( response.status === 200) {
      yield put({
          type: 'SETTINGGETEXPENSES',
          payload: { response:response.data, statusCode: response.status },
      });


  }
   if (response) {
          refreshToken(response);
      }
}


function refreshToken(response) {
  const cookies = new Cookies();
  if (response?.refresh_token) {
    cookies.set("UnityConnectToken", response.refresh_token, { path: "/" });
  } else if (response?.status === 206 || response?.statusCode === 206) {
    cookies.set("Unity_ConnectToken_Access-Denied", response.status, { path: "/" });
  }
}

function* SettingAddExpensesSaga() {
  yield takeEvery("SETTING_ADD_EXPENSES", SettingAddExpensesPage);
  yield takeEvery("SETTING_GET_EXPENSES",SettingGetExpensesPage)
}

export default SettingAddExpensesSaga;
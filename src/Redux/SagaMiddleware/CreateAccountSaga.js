import { call, takeEvery, put } from 'redux-saga/effects';
import { CreateAccountAction} from '../Action/CreateAccountAction';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function* CreateAccountPage(action) {
    
      const response = yield call(CreateAccountAction, action.payload);
      console.log("response",response);
      
  
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
     
        if (response.status === 200 || response.statusCode === 200) {
          
        yield put({ type: 'CREATEACCOUNTPAGE', payload: { response: response.data, statusCode: response.status || response.statusCode} });
  
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
      } else if (response.status === 210 || response.statusCode === 210) {
  
        yield put({ type: 'PASSWORD_DOESNT_ERROR', payload: response.data.message });
     
      }
      else if (response.status === 201 || response.statusCode === 201) {
  
        yield put({ type: 'EMAIL_ERROR', payload: response.data.message });
  
        
      } else if (response.status === 202 || response.statusCode === 202) {
        yield put({ type: 'MOBILE_ERROR', payload: response.data.message });
  
      } else if (response.status === 203 || response.statusCode === 203) {
        yield put({ type: 'EMAIL_MOBILE_ERROR', payload: response.data.message });
  
    
      }
     
    
  }



  
    function* CreateAccountSaga() {
        yield takeEvery('CREATE_ACCOUNT', CreateAccountPage)
      
      
      }
      export default CreateAccountSaga;
import axios from 'axios'; 
import config from '../../WebService/Config';

export async function SignIncall(userdetails) {
    return await axios.post(`${config.apiBaseUrl}/user/login`,{email_id : userdetails.email_Id,password : userdetails.password});
}

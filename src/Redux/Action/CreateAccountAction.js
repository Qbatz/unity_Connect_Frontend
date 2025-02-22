import axios from 'axios'; 
import config from '../../WebService/Config';

export async function CreateAccountAction(datum) {
    return await axios.post(`${config.apiBaseUrl}/user/add_new_users`,datum,{
        data:datum  
    });
}
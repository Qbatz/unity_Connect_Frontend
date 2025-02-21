// import AxiosConfig from "../../WebService/AxiosConfig";
// import config from '../../WebService/Config';
// import axios from 'axios'



// export async function SignIncall(userdetails) {
//     return await axios.post(`${config.apiBaseUrl}/user/login`,userdetails, {
//     data : details
//     })
//   }

import axios from 'axios';
import config from '../../WebService/Config';

export async function SignIncall(userdetails) {
    return await axios.post(`${config.apiBaseUrl}/user/login`, userdetails);
}

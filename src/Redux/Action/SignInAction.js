import axios from 'axios';
import config from '../../WebService/Config';
import AxiosConfig from '../../WebService/AxiosConfig';

export async function SignIncall(userdetails) {
    return await axios.post(`${config.apiBaseUrl}/user/login`, { email_id: userdetails.email_Id, password: userdetails.password });
}



export async function ProfileDetails() {

    let profile = await AxiosConfig.get(`/user/user_details`);

    return profile
}





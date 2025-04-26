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


export async function ProfileDetailsUpdate(params) {

    const formData = new FormData();

    if (params.first_name) formData.append("first_name", params.first_name);
    if (params.last_name) formData.append("last_name", params.last_name);
    if (params.email_id) formData.append("email_id", params.email_id);
    if (params.mobile_no) formData.append("mobile_no", params.mobile_no);
    if (params.file) formData.append("file", params.file);
    if (params.id) formData.append("id", params.id || "");
    if (params.profile_URL) formData.append("profile_URL", params.profile_URL);

    
    try {
        const response = await AxiosConfig.post('/user/edit_profile', formData, {
            headers: {
                "Content-type": "multipart/form-data",
            },
        });
        return response.data;
    } catch (error) {
        console.log("No error", error);
    }
}

export async function UpdatePassword(params) {

    return await AxiosConfig.post(`/user/change_password`, params, {
        data: params
    });


}
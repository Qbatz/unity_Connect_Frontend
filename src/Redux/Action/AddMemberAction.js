import axios from 'axios'; 
import config from '../../WebService/Config';


export async function addMember(params) {

    const formData = new FormData();
    if (params.profile) formData.append("profile", params.profile);
    if (params.lastname) formData.append("lastname", params.lastname)
    if (params.firstname) formData.append("firstname", params.firstname)
    if (params.Address) formData.append("Address", params.Address)
    if (params.hostel_Id) formData.append("hostel_Id", params.hostel_Id)
    if (params.Email) formData.append("Email", params.Email)
    if (params.Phone) formData.append("Phone", params.Phone)

    if (params.joining_date) formData.append("joining_date", params.joining_date)
    if (params.ID) formData.append("ID", params.ID)


    try {
        const response = await axios.post(`${config.apiBaseUrl}/member/add_new_member`, formData, {
            headers: {
                "Content-type": "multipart/form-data",
            },
            timeout: 100000000,
            onUploadProgress: (event) => {
                console.log("event", event)
            }
        });
        return response.data;
    } catch (error) {
        console.error("Axios Error", error);
    }
}



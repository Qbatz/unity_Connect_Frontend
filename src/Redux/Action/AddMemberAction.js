import AxiosConfig from '../../WebService/AxiosConfig'; 



export async function addMember(params) {

    const formData = new FormData();
   
    if (params.user_name) formData.append("user_name", params.user_name)
    if (params.address) formData.append("address", params.address)
    if (params.email_id) formData.append("email_id", params.email_id)
    if (params.mobile_no) formData.append("mobile_no", params.mobile_no)
    if (params.joining_date) formData.append("joining_date", params.joining_date)
    if (params.file) formData.append("file", params.file)

    try {
        const response = await AxiosConfig.post('/member/add_new_member', formData, {
            headers: {
                "Content-type": "multipart/form-data",
            },
            timeout: 100000000,
            onUploadProgress: () => {
            }
        });
        return response.data;
    } catch (error) {
       console.log("No error",error);
       
    }
}



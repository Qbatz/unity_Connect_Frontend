import AxiosConfig from '../../WebService/AxiosConfig'; 



export async function addMember(params) {

    const formData = new FormData();
   
    if (params.user_name) formData.append("user_name", params.user_name)
    if (params.address) formData.append("address", params.address)
    if (params.email_id) formData.append("email_id", params.email_id)
    if (params.joining_date) formData.append("joining_date", params.joining_date)
    // if (params.document_url) formData.append("document_url", params.document_url)

    try {
        const response = await AxiosConfig.post('/member/add_new_member', formData, {
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



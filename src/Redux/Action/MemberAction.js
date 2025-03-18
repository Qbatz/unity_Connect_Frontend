import AxiosConfig from '../../WebService/AxiosConfig';

export async function ActiveMemberGetAction() {

    return await AxiosConfig.get('/member/get_members', {

    });
}

export async function ActiveMemberDeleteAction(user) {

    return await AxiosConfig.post('/member/delete_member', user, {

        data: user
    });
}

export async function ActiveMemberStatusAction(user) {

    return await AxiosConfig.post('/member/change_status', user, {

        data: user
    });
}

export async function addMember(params) {
    const formData = new FormData();

    if (params.Member_Id) formData.append("member_id", params.Member_Id);
    if (params.user_name) formData.append("user_name", params.user_name);
    if (params.address) formData.append("address", params.address);
    if (params.email_id) formData.append("email_id", params.email_id);
    if (params.mobile_no) formData.append("mobile_no", params.mobile_no);
    if (params.joining_date) formData.append("joining_date", params.joining_date);
    if (params.file) formData.append("file", params.file);
    if (params.document_url) formData.append("document_url", params.document_url);
    if (params.id) formData.append("id", params.id || "");

    try {
        const response = await AxiosConfig.post('/member/add_new_member', formData, {
            headers: {
                "Content-type": "multipart/form-data",
            },
            timeout: 100000000,
            onUploadProgress: () => { }
        });
        return response.data;
    } catch (error) {
        console.log("No error", error);
    }
}

export async function GetMemberId(params) {

    return await AxiosConfig.post('/member/get_member_id', params, {
        data: params
    });
}

export async function MemberOverviewAction(users) {

    return await AxiosConfig.post('/member/get_member_overview', users, {

        data: users
    });
}

export async function GetCommentAction(comment) {

    return await AxiosConfig.post('/member/get_comment', comment, {
        data: comment
    });
}

export async function AddCommentAction(users) {

    return await AxiosConfig.post('/member/add_comment', users, {

        data: users
    });
}

export async function GetStatementAction(statement) {

    return await AxiosConfig.post('/member/get_member_statement', statement, {
        data: statement
    });
}

export async function RecordPaymentAction(params) {

    return await AxiosConfig.post('/loan/add_record_payment', params, {

        data: params
    });
}

export async function AddTransaction(params) {

    let AddTransaction = await AxiosConfig.post('/transaction/add_transaction', {
        data: params
    });
    return AddTransaction
}

export async function GetTransactionsAction() {
    let transaction = await AxiosConfig.get(`/transaction/get_transaction`);
    return transaction
}
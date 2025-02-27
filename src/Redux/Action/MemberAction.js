import AxiosConfig from '../../WebService/AxiosConfig';

export async function ActiveMemberGetAction() {
   
    return await AxiosConfig.get('/member/get_members',{

    });
}

export async function ActiveMemberDeleteAction(user) {
   
    return await AxiosConfig.post('/member/delete_member',user,{

        data:user  
    });
}

export async function ActiveMemberStatusAction(user) {
   
    return await AxiosConfig.post('/member/change_status',user,{

        data:user  
    });
}
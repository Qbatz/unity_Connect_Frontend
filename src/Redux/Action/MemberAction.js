import AxiosConfig from '../../WebService/AxiosConfig';

export async function ActiveMemberGetAction(datum) {
   
    return await AxiosConfig.get('/member/get_members',datum,{

        data:datum  
    });
}

export async function ActiveMemberDeleteAction(user) {
   
    return await AxiosConfig.post('/member/delete_member',user,{

        data:user  
    });
}
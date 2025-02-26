import AxiosConfig from '../../WebService/AxiosConfig';

export async function ActiveMemberGetAction(datum) {
   
    return await AxiosConfig.get('/member/get_members',datum,{

        data:datum  
    });
}
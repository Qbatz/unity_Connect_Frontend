import AxiosConfig from '../../WebService/AxiosConfig';

export async function StatementAction() {

    return await AxiosConfig.get('/member/get_statement_list', {

    });
}
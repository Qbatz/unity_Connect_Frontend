import AxiosConfig from '../../WebService/AxiosConfig';

export async function ReportsAction(reports) {
    return await AxiosConfig.post('/report/get_report', reports);
}

import AxiosConfig from '../../WebService/AxiosConfig';

export async function SuccessReportsAction(reports) {
    return await AxiosConfig.post('/report/get_report_success', reports);
}

export async function UnSuccessReportsAction(reports) {
    return await AxiosConfig.post('/report/get_report_unsuccess', reports);
}

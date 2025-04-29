import AxiosConfig from '../../WebService/AxiosConfig';

export async function SuccessReportsAction(reports) {
    return await AxiosConfig.post('/report/get_report_success', reports);
}

export async function UnSuccessReportsAction(reports) {
    return await AxiosConfig.post('/report/get_report_unsuccess', reports);
}

export async function SuccessReportsPDF(reports) {


    return await AxiosConfig.post('/report/get_report_success_pdf', reports, {
        data: reports
    });
}

export async function SuccessReportsEXCEL(reports) {
    return await AxiosConfig.post('/report/get_report_success_excel', reports, {
        data: reports
    });
}

export async function UnSuccessReportsPDF(reports) {
    return await AxiosConfig.post('/report/get_report_unsuccess_pdf', reports, {
        data: reports
    });
}

export async function UnSuccessReportsEXCEL(reports) {
    return await AxiosConfig.post('/report/get_report_unsuccess_excel', reports, {
        data: reports
    });
}

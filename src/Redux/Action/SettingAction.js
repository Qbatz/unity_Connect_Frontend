import axios from 'axios'; 
import config from '../../WebService/Config';

export async function SettingMemberIDAction(datum) {
    return await axios.post(`${config.apiBaseUrl}/member_id/add_new_member_id`,datum,{

        data:datum  
    });
}

export async function SettingLoanIDAction(loan) {
    return await axios.post(`${config.apiBaseUrl}/loan/add_new_loan_id`,loan,{

     data:loan  
    });
}


export async function SettingAddExpenses(datum) {
    return await axios.post(`${config.apiBaseUrl}/expense/add_ecpense_category`,datum,{
        data:datum  
    });
}
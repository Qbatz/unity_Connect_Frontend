import axios from 'axios'; 
import config from '../../../WebService/Config';

export async function SettingAddExpenses(datum) {
    return await axios.post(`${config.apiBaseUrl}/expense/add_ecpense_category`,datum,{
        data:datum  
    });
}
import AxiosConfig from '../../WebService/AxiosConfig';

export async function AddLoan(user) {
    return await AxiosConfig.post('/loan/add_member_loan', user);
}


export async function GetLoan(datum) {
        
    return await AxiosConfig.get("/loan/all_member_loans", {
        data: datum, 
    });
}

export async function AddWitness(datumWitness) {
    return await AxiosConfig.post("/add/add_widness", datumWitness);
}

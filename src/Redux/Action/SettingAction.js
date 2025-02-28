import AxiosConfig from '../../WebService/AxiosConfig';

export async function SettingMemberIDAction(datum) {
    return await AxiosConfig.post('/member_id/add_new_member_id',datum,{

        data:datum  
    });
}

export async function SettingLoanIDAction(loan) {
    return await AxiosConfig.post('/loan/add_new_loan_id',loan,{

     data:loan  
    });
}


export async function SettingAddExpenses(datum) {

    return await AxiosConfig.post("/expense/add_expense_category", datum,{
        data:datum
      });
    }
    
    
    export async function SettingGetExpenses(datum) {
        
        return await AxiosConfig.get("/expense/get_expense_category", {
            data: datum, 
        });
    }
    
  
export async function SettingAddLoan(loanDatum) {
    return await AxiosConfig.post("/loan/add_loan", loanDatum);
}

export async function SettingGetLoan(loanGetDatum) {
    return await AxiosConfig.get("/loan/all_loans", loanGetDatum);
}
  
    
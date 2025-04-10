import AxiosConfig from '../../WebService/AxiosConfig';

export async function ExpensesGetAction(user) {

    return await AxiosConfig.post('/expense/get_expenses',user, {
        data: user
    });
}

export async function AddExpensesAction(user) {

    return await AxiosConfig.post('/expense/add_expense', user, {

        data: user
    });
}

export async function DeleteExpensesAction(users) {

    return await AxiosConfig.post('/expense/delete_expense', users, {

        data: users
    });
}





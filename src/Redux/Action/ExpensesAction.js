import AxiosConfig from '../../WebService/AxiosConfig';

export async function ExpensesGetAction() {

    return await AxiosConfig.get('/expense/get_expenses', {

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





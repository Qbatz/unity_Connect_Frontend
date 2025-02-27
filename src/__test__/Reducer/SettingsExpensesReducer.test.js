import SettingAddExpensesReducer from "../../Redux/Reducer/SettingsExpensesReducer";

describe('it will check for settings expenses reducers', () => {
    const INITIAL_STATE = {
        categoryname: '',
        subcategoryname: '',
        id: 0,
        statusCodeSettingsAddExpenses: 0,
    }

    it('it will check for SETTINGADDEXPENSES', () => {
        const action = {
            type: 'SETTINGADDEXPENSES',
            payload: {
                category_Name: 'ABC',
                sub_Category: 'XYZ'
            }
        }

        expect(SettingAddExpensesReducer(INITIAL_STATE, action)).toStrictEqual({
            categoryname: 'ABC',
            subcategoryname: 'XYZ',
            id: 0,
            statusCodeSettingsAddExpenses: 0,
        })
    })

    it('it will check for CLEARSETTINGADDEXPENSES', () => {
        const action = {
            type: 'CLEARSETTINGADDEXPENSES',
            payload: ''
        }

        expect(SettingAddExpensesReducer({...INITIAL_STATE, statusCodeSettingsAddExpenses: 200}, action)).toStrictEqual({
            categoryname: '',
            subcategoryname: '',
            id: 0,
            statusCodeSettingsAddExpenses: 0,
        })
    })

    it('it will check for DEFAULT CASE', () => {
        const action = {
            type: 'DEFAULT-CASE',
            payload: ''
        }

        expect(SettingAddExpensesReducer({...INITIAL_STATE}, action)).toStrictEqual({
            categoryname: '',
            subcategoryname: '',
            id: 0,
            statusCodeSettingsAddExpenses: 0,
        })
    })
})
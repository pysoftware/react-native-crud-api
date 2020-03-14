import {actionsTypes} from '../actionsTypes';
import {HttpHelper} from '../httpHelper';
import {exp} from 'react-native-reanimated';

export const fetchAllEmployees = () => {
    return async dispatch => {
        const data = await HttpHelper.get('http://startup-api.xyz/api/v1/employees');
        dispatch({
            type: actionsTypes.FETCH_ALL_CARS,
            payload: data.data,
        });
    };
};

export const addNewEmployee = employee => async dispatch => {
    const response = await HttpHelper.post('http://startup-api.xyz/api/v1/employees', employee);
    dispatch({
        type: actionsTypes.ADD_NEW_EMPLOYEE,
        payload: response,
    });
};

export const deleteEmployee = id => async dispatch => {
    await HttpHelper.delete(`http://startup-api.xyz/api/v1/employees/${id}`);
    dispatch({
        type: actionsTypes.DELETE_EMPLOYEE,
        payload: id,
    });
};

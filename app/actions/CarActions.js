import {actionsTypes} from '../actionsTypes';
import {HttpHelper} from '../httpHelper';
import {exp} from 'react-native-reanimated';

export const fetchAllCars = () => async dispatch => {
    try {
        dispatch({type: actionsTypes.FETCH_ALL_CAR_REQUEST});
        const response = await HttpHelper.get('http://startup-api.xyz/api/v1/cars');
        if (response.success) {
            dispatch(
                {
                    type: actionsTypes.FETCH_ALL_CARS_SUCCESS,
                    payload: response.data,
                },
            );
            return response;
        } else {
            // console.log('EH', response);
            dispatch(
                {
                    type: actionsTypes.FETCH_ALL_CARS_FAILURE,
                    payload: response.message,
                },
            );
            return response.message;
        }
    } catch (error) {
        dispatch(
            {
                type: actionsTypes.FETCH_ALL_CARS_FAILURE,
                payload: error.message,
            },
        );
        return error.message;
    }
};

export const fetchCar = id => async dispatch => {
    try {
        dispatch({type: actionsTypes.FETCH_ALL_CAR_REQUEST});
        const response = await HttpHelper.get(`http://startup-api.xyz/api/v1/cars/${id}`);
        if (response.success) {
            dispatch(
                {
                    type: actionsTypes.FETCH_CAR_SUCCESS,
                    payload: response.data,
                },
            );
            return response;
        } else {
            dispatch(
                {
                    type: actionsTypes.FETCH_CAR_FAILURE,
                    payload: response.message,
                },
            );
            return response.message;
        }
    } catch (error) {
        dispatch(
            {
                type: actionsTypes.FETCH_CAR_FAILURE,
                payload: error.message,
            },
        );
        return error.message;
    }
};

export const createCar = car => async dispatch => {
    try {
        dispatch({type: actionsTypes.CAR_CREATE_REQUEST});
        const response = await HttpHelper.post('http://startup-api.xyz/api/v1/cars', car);
        if (response.success) {
            dispatch(
                {
                    type: actionsTypes.CAR_CREATE_SUCCESS,
                    payload: response.data,
                },
            );
            return response;
        } else {
            dispatch(
                {
                    type: actionsTypes.CAR_CREATE_FAILURE,
                    payload: response.errors,
                },
            );
            return response.errors;
        }
    } catch (error) {
        dispatch(
            {
                type: actionsTypes.CAR_CREATE_FAILURE,
                payload: error.message,
            },
        );
        return error.message;
    }
};

export const updateCarData = car => async dispatch => {
    try {
        dispatch({type: actionsTypes.UPDATE_CAR_REQUEST});
        const response = await HttpHelper.put(`http://startup-api.xyz/api/v1/cars/${car.id}`, car);
        console.log(response);
        if (response.success) {
            dispatch(
                {
                    type: actionsTypes.UPDATE_CAR_SUCCESS,
                    payload: response.data,
                },
            );
            return response;
        } else {
            let errors = null;
            if (response.errors) {
                errors = response.errors;
            } else {
                errors = response.message;
            }
            dispatch(
                {
                    type: actionsTypes.UPDATE_CAR_FAILURE,
                    payload: errors,
                },
            );
            return errors;
        }
    } catch (error) {
        dispatch(
            {
                type: actionsTypes.UPDATE_CAR_FAILURE,
                payload: error.message,
            },
        );
        return error.message;
    }
};

export const deleteCar = id => async dispatch => {
    try {
        dispatch({type: actionsTypes.DELETE_CAR_REQUEST});
        const response = await HttpHelper.delete(`http://startup-api.xyz/api/v1/cars/${id}`);
        if (response.success) {
            dispatch(
                {
                    type: actionsTypes.DELETE_CAR_SUCCESS,
                    payload: id,
                },
            );
            return response;
        } else {
            dispatch(
                {
                    type: actionsTypes.DELETE_CAR_FAILURE,
                    payload: response.message,
                },
            );
            return response.message;
        }
    } catch (error) {
        dispatch(
            {
                type: actionsTypes.DELETE_CAR_FAILURE,
                payload: error.message,
            },
        );
        return error.message;
    }
};

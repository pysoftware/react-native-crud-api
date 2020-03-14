import {actionsTypes} from "../actionsTypes";
import {HttpHelper} from "../httpHelper";
import {exp} from "react-native-reanimated";

export const fetchAllBrands = () => {
    return async dispatch => {
        const data = await HttpHelper.get('http://startup-api.xyz/api/v1/brands');
        dispatch({
            type: actionsTypes.FETCH_ALL_CARS,
            payload: data.data
        })
    };
};

export const addNewBrand = brand => async dispatch => {
    const response = await HttpHelper.post('http://startup-api.xyz/api/v1/brands', brand);
    dispatch({
        type: actionsTypes.ADD_NEW_BRAND,
        payload: response,
    })
};

export const deleteBrand = id => async dispatch => {
    await HttpHelper.delete(`http://startup-api.xyz/api/v1/brands/${id}`);
    dispatch({
        type: actionsTypes.DELETE_BRAND,
        payload: id
    })
};

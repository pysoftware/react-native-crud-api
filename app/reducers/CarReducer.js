import {actionsTypes} from '../actionsTypes';

const initialState = {
    allCars: [],
    loading: true,
    error: null,
};

export const carReducer = (state = initialState, action) => {
    switch (action.type) {
        /** Создание новой машины */
        case actionsTypes.CAR_CREATE_REQUEST:
            return {...state, loading: true};
        case actionsTypes.CAR_CREATE_SUCCESS: {
            return {
                ...state,
                loading: false,
                allCars: [...state.allCars, action.payload],
            };
        }
        case actionsTypes.CAR_CREATE_FAILURE:
            return {...state, loading: false};

        /** Обновление машины */
        case actionsTypes.UPDATE_CAR_REQUEST:
            return {...state, loading: true};
        case actionsTypes.UPDATE_CAR_SUCCESS: {
            const allCars = state.allCars.map(car => {
                if (car.id === action.payload.id) {
                    car.name = action.payload.name;
                    car.color = action.payload.color;
                    car.price = action.payload.price;
                    car.brand_id = action.payload.brand_id;
                }

                return car;
            });

            return {
                ...state,
                loading: false,
                allCars: allCars,
            };
        }
        case actionsTypes.UPDATE_CAR_FAILURE:
            return {...state, loading: false};

        /** Удаление машины */
        case actionsTypes.DELETE_CAR_REQUEST:
            return {...state, loading: true};
        case actionsTypes.DELETE_CAR_SUCCESS: {
            return {
                ...state,
                loading: false,
                allCars: state.allCars.filter(car => car.id !== action.payload),
            };
        }
        case actionsTypes.DELETE_CAR_FAILURE:
            return {...state, loading: false};

        /** Получение списка всех машин */
        case actionsTypes.FETCH_ALL_CAR_REQUEST:
            return {...state, loading: true};
        case actionsTypes.FETCH_ALL_CARS_SUCCESS: {
            return {
                ...state,
                allCars: action.payload,
                error: null,
                loading: false,
            };
        }
        case actionsTypes.FETCH_ALL_CARS_FAILURE:
            return {...state, loading: false, error: action.payload};

        /** Получение машины по ID */
        case actionsTypes.FETCH_CAR_REQUEST:
            return {...state, loading: true};
        case actionsTypes.FETCH_CAR_SUCCESS: {
            return {
                ...state,
                loading: false,
            };
        }
        case actionsTypes.FETCH_CAR_FAILURE:
            return {...state, loading: false};

        case 'FETCH_ALL_CARS':
            return {
                ...state,
                allCars: action.payload,
                loading: false,
            };
        case 'UPDATE_CAR': {
            const allCars = state.allCars.map(car => {
                if (car.id === action.payload.id) {
                    car.name = action.payload.name;
                    car.color = action.payload.color;
                    car.price = action.payload.price;
                    car.brand_id = action.payload.brand_id;
                }

                return car;
            });

            return {
                ...state,
                loading: true,
                allCars: allCars,
            };
        }
        case 'DELETE_CAR': {
            return {
                ...state,
                loading: true,
                allCars: state.allCars.filter(car => car.id !== action.payload),
            };
        }
        default:
            return state;
    }
};

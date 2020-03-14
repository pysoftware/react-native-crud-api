import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {carReducer} from "../reducers/CarReducer";

const rootReducer = combineReducers({
    cars: carReducer,
});

export default createStore(
    rootReducer, applyMiddleware(thunk)
);

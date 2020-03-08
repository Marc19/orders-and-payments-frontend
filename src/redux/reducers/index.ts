import { combineReducers } from 'redux';
import {orderReducer} from './orderReducer';
import {paymentReducer} from './paymentReducer';

export const rootReducer = combineReducers({
	orderState: orderReducer,
	paymentState: paymentReducer
});
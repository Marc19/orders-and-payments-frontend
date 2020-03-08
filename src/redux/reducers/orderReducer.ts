import {OrderActions, GotOrdersSucceededAction} from '../actions/order/orderActionTypes';

import {initialState, OrderState, ApiStatus} from './initialState';
import { Reducer } from 'redux';

export const orderReducer: Reducer<OrderState, OrderActions> = 
	(state = initialState.orderState, action) => {
		switch (action.type) {
			case 'GETTING_ORDERS': {
				return {
					...state,
					gettingOrdersStatus: ApiStatus.CALLING
				};
			}

			case 'GOT_ORDERS_SUCCEEDED': {
				return {
					...state,
					orders: (action as GotOrdersSucceededAction).orders,
					gettingOrdersStatus: ApiStatus.CALL_SUCCEEDED
				};
			}

			case 'GOT_ORDERS_FAILED': {
				return {
					...state,
					gettingOrdersStatus: ApiStatus.CALL_FAILED
				};
			}

			case 'GETTING_ORDER_BY_ID': {
				return {
					...state,
				};
			}

			case 'GOT_ORDER_BY_ID_SUCCEEDED': {
				const newOrders = state.orders.map(o => o.id === action.order.id? action.order : o);
				return {
					...state,
					orders: newOrders,
				};
			}

			case 'GOT_ORDER_BY_ID_FAILED': {
				return {
					...state,
				};
			}

			case 'POSTING_ORDER': {
				return {
					...state,
					postingOrderStatus: ApiStatus.CALLING
				};
			}

			case 'POSTED_ORDER_SUCCEEDED': {
				return {
					...state,
					postingOrderStatus: ApiStatus.CALL_SUCCEEDED
				};
			}

			case 'POSTED_ORDER_FAILED': {
				return {
					...state,
					postingOrderStatus: ApiStatus.CALL_FAILED,
					postingOrderErrorMessage: action.errorMessage
				};
			}
            
			case 'DELETING_ORDER': {
				return {
					...state
				};
			}

			case 'DELETED_ORDER_SUCCEEDED': {
				const newOrders = state.orders.filter(o => o.id === action.orderIdDeleted? false : true);
				return {
					...state,
					orders: newOrders,
				};
			}

			case 'DELETED_ORDER_FAILED': {
				return {
					...state
				};
			}

			case 'RESET_API_CALLS_STATUSES': {
				return {
					...state,
					postingOrderStatus: ApiStatus.NONE,
					gettingOrdersStatus: ApiStatus.NONE
				};
			}
        
			default:
				return state;
		}
	};

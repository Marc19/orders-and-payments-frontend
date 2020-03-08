import { Reducer } from 'redux';

import { PaymentActions } from '../actions/payment/paymentActionTypes';
import {ApiStatus,initialState, PaymentState} from './initialState';

export const paymentReducer: Reducer<PaymentState, PaymentActions> = 
	(state = initialState.paymentState, action) => {
		switch (action.type) {
			case 'POSTING_PAYMENT': {
				return {
					...state,
					payingOrderStatus: ApiStatus.CALLING
				};
			}
            
			case 'POSTED_PAYMENT_SUCCEEDED': {
				return {
					...state,
					payingOrderStatus: ApiStatus.CALL_SUCCEEDED
				};
			}
            
			case 'POSTED_PAYMENT_FAILED': {
				return {
					...state,
					payingOrderStatus: ApiStatus.CALL_FAILED,
					payingOrderErrorMessage: action.errorMessage
				};
			}

			case 'RESET_PAYMENT_API_STATUS': {
				return {
					...state,
					payingOrderStatus: ApiStatus.NONE
				};
			}

			default:
				return state;
		}
	};
import { ActionCreator, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';

import { postPayment } from '../../../api/paymentApi';
import Payment from '../../../models/Payment';
import { PostedPaymentFailedAction, PostedPaymentSucceededAction, PostingPaymentAction, ResetPaymentApiStatus } from './paymentActionTypes';

export const postPaymentActionCreator: 
	ActionCreator<ThunkAction<
					Promise<PostedPaymentSucceededAction|PostedPaymentFailedAction>,
					Payment,
					null,
					(PostedPaymentSucceededAction|PostedPaymentFailedAction)>
				> = (payment: Payment) => {

					return async (dispatch: Dispatch) => {
						const postingPaymentAction: PostingPaymentAction = {
							type: 'POSTING_PAYMENT'
						};
						dispatch(postingPaymentAction);

						try{
							const orderAxiosResponse = await postPayment(payment);
							const postedOrder = orderAxiosResponse.data;
    
							const postedOrderSucceededAction: PostedPaymentSucceededAction = {
								type: 'POSTED_PAYMENT_SUCCEEDED',
								result: postedOrder
							};
							return dispatch(postedOrderSucceededAction);
						}
						catch(error){
							const errorMessage = error.response.data.title;
							const postedOrderFailedAction: PostedPaymentFailedAction = {
								type: 'POSTED_PAYMENT_FAILED',
								errorMessage: errorMessage
							};
							return dispatch(postedOrderFailedAction);
						}
					};
				};

export const resetPaymentApiStatusActionCreator: ActionCreator<ResetPaymentApiStatus> = () => {
	return {
		type: 'RESET_PAYMENT_API_STATUS'
	};
};
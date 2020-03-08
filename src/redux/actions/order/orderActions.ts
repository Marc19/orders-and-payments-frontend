import moment from 'moment';
import { ActionCreator, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';

import {deleteOrder,getOrderById, getOrders, postOrder} from '../../../api/orderApi';
import Order from '../../../models/Order';
import { DeletedOrderFailedAction, DeletedOrderSucceededAction, DeletingOrderAction,GettingOrderByIdAction, GettingOrdersAction, GotOrderByIdFailedAction, GotOrderByIdSucceededAction, GotOrdersFailedAction, GotOrdersSucceededAction, PostedOrderFailedAction, PostedOrderSucceededAction, PostingOrderAction, ResetApiCallsStatuses } from './orderActionTypes';

export const getOrdersActionCreator: 
	ActionCreator<ThunkAction<
					Promise<GotOrdersSucceededAction|GotOrdersFailedAction>,
					Order[],
					null,
					(GotOrdersSucceededAction|GotOrdersFailedAction)>
				> = () => {
					return async (dispatch: Dispatch) => {
						const gettingOrdersAction: GettingOrdersAction = {
							type: 'GETTING_ORDERS'
						};
						dispatch(gettingOrdersAction);

						try{
							const ordersAxiosResponse = await getOrders();
							const orders: Order[] = ordersAxiosResponse.data.map(o => { 
								return {
									...o,
									creationDate: moment(o.creationDate).calendar(),
									payment: {...o.payment, paymentDate: moment(o.payment?.paymentDate).calendar()}
								};
							});

							const gotOrdersAction: GotOrdersSucceededAction = {
								orders,
								type: 'GOT_ORDERS_SUCCEEDED'
							};
							return dispatch(gotOrdersAction);
						}
						catch(ex){
							const gotOrdersFailedAction: GotOrdersFailedAction = {
								type: 'GOT_ORDERS_FAILED'
							};
							return dispatch(gotOrdersFailedAction);
						}
					};
				};

export const postOrderActionCreator: 
	ActionCreator<ThunkAction<
					Promise<PostedOrderSucceededAction|PostedOrderFailedAction>,
					Order,
					null,
					(PostedOrderSucceededAction|PostedOrderFailedAction)>
					> = (order: Order) => {
						return async (dispatch: Dispatch) => {
							const postingOrderAction: PostingOrderAction = {
								type: 'POSTING_ORDER'
							};
							dispatch(postingOrderAction);

							try{
								const orderAxiosResponse = await postOrder(order);
								const postedOrder = orderAxiosResponse.data;

								const postedOrderSucceededAction: PostedOrderSucceededAction = {
									type: 'POSTED_ORDER_SUCCEEDED',
									result: postedOrder
								};
								return dispatch(postedOrderSucceededAction);
							}
							catch(error){
								const errorMessage = error.response.data.title;
								const postedOrderFailedAction: PostedOrderFailedAction = {
									type: 'POSTED_ORDER_FAILED',
									errorMessage: errorMessage
								};
								return dispatch(postedOrderFailedAction);
							}
						};
					};

export const getOrderByIdActionCreator: 
	ActionCreator<ThunkAction<
					Promise<GotOrderByIdSucceededAction|GotOrderByIdFailedAction>,
					Order,
					null,
					(GotOrderByIdSucceededAction|GotOrderByIdFailedAction)>
				> = (id: number) => {

					return async (dispatch: Dispatch) => {
						const gettingOrderByIdAction: GettingOrderByIdAction = {
							type: 'GETTING_ORDER_BY_ID'
						};
						dispatch(gettingOrderByIdAction);

						try{
							const ordersAxiosResponse = await getOrderById(id);
							const orderResult: Order = ordersAxiosResponse.data;
							const order: Order = {
								...orderResult,
								creationDate: moment(orderResult.creationDate).calendar(),
								payment: {...orderResult.payment, paymentDate: moment(orderResult.payment?.paymentDate).calendar()}};


							const gotOrderByIdAction: GotOrderByIdSucceededAction = {
								order,
								type: 'GOT_ORDER_BY_ID_SUCCEEDED'
							};
							return dispatch(gotOrderByIdAction);
						}
						catch(ex){
							const gotOrderByIdFailedAction: GotOrderByIdFailedAction = {
								type: 'GOT_ORDER_BY_ID_FAILED'
							};
							return dispatch(gotOrderByIdFailedAction);
						}
					};
				};

export const deleteOrderActionCreator: 
	ActionCreator<ThunkAction<
					Promise<DeletedOrderSucceededAction|DeletedOrderFailedAction>,
					Order,
					null,
					(DeletedOrderSucceededAction|DeletedOrderFailedAction)>
				> = (id: number) => {

					return async (dispatch: Dispatch) => {
						const deletingOrderAction: DeletingOrderAction = {
							type: 'DELETING_ORDER'
						};
						dispatch(deletingOrderAction);

						try{
							await deleteOrder(id);

							const deletedOrderSucceededAction: DeletedOrderSucceededAction = {
								type: 'DELETED_ORDER_SUCCEEDED',
								orderIdDeleted: id
							};
							return dispatch(deletedOrderSucceededAction);
						}
						catch(error){
							const deletedOrderFailedAction: DeletedOrderFailedAction = {
								type: 'DELETED_ORDER_FAILED'
							};
							return dispatch(deletedOrderFailedAction);
						}
					};
				};

export const resetApiCallsStatusesActionCreator: ActionCreator<ResetApiCallsStatuses> = () => {
	return {
		type: 'RESET_API_CALLS_STATUSES'
	};
};

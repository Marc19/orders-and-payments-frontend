import { Action } from 'redux';

import Order from '../../../models/Order';

//Get Orders
export interface GettingOrdersAction extends Action<'GETTING_ORDERS'> {
}

export interface GotOrdersSucceededAction extends Action<'GOT_ORDERS_SUCCEEDED'> {
  orders: Order[];
}

export interface GotOrdersFailedAction extends Action<'GOT_ORDERS_FAILED'> {
}

//Get Order By Id
export interface GettingOrderByIdAction extends Action<'GETTING_ORDER_BY_ID'> {
}

export interface GotOrderByIdSucceededAction extends Action<'GOT_ORDER_BY_ID_SUCCEEDED'> {
  order: Order;
}

export interface GotOrderByIdFailedAction extends Action<'GOT_ORDER_BY_ID_FAILED'> {
}

//Post Order
export interface PostingOrderAction extends Action<'POSTING_ORDER'> {
}

export interface PostedOrderSucceededAction extends Action<'POSTED_ORDER_SUCCEEDED'> {
  result: Order;
}

export interface PostedOrderFailedAction extends Action<'POSTED_ORDER_FAILED'> {
  errorMessage: string;
}

//Delete Order
export interface DeletingOrderAction extends Action<'DELETING_ORDER'> {
}

export interface DeletedOrderSucceededAction extends Action<'DELETED_ORDER_SUCCEEDED'> {
  orderIdDeleted: number;
}

export interface DeletedOrderFailedAction extends Action<'DELETED_ORDER_FAILED'> {
}

//Reset
export interface ResetApiCallsStatuses extends Action<'RESET_API_CALLS_STATUSES'>{
}

export type OrderActions =
  | GettingOrdersAction
  | GotOrdersSucceededAction
  | GotOrdersFailedAction
  | GettingOrderByIdAction
  | GotOrderByIdSucceededAction
  | GotOrderByIdFailedAction
  | PostingOrderAction
  | PostedOrderSucceededAction
  | PostedOrderFailedAction
  | DeletingOrderAction
  | DeletedOrderSucceededAction
  | DeletedOrderFailedAction
  | ResetApiCallsStatuses;
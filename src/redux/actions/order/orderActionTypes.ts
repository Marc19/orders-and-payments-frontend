import Order from "../../../models/Order";
import { Action } from "redux";

//Get Orders
export interface IGettingOrdersAction extends Action<"GETTING_ORDERS"> {
}

export interface IGotOrdersSucceededAction extends Action<"GOT_ORDERS_SUCCEEDED"> {
  orders: Order[];
}

export interface IGotOrdersFailedAction extends Action<"GOT_ORDERS_FAILED"> {
}

//Get Order By Id
export interface IGettingOrderByIdAction extends Action<"GETTING_ORDER_BY_ID"> {
}

export interface IGotOrderByIdSucceededAction extends Action<"GOT_ORDER_BY_ID_SUCCEEDED"> {
  order: Order;
}

export interface IGotOrderByIdFailedAction extends Action<"GOT_ORDER_BY_ID_FAILED"> {
}

//Post Order
export interface IPostingOrderAction extends Action<"POSTING_ORDER"> {
}

export interface IPostedOrderSucceededAction extends Action<"POSTED_ORDER_SUCCEEDED"> {
  result: Order;
}

export interface IPostedOrderFailedAction extends Action<"POSTED_ORDER_FAILED"> {
  errorMessage: string;
}

//Delete Order
export interface IDeletingOrderAction extends Action<"DELETING_ORDER"> {
}

export interface IDeletedOrderSucceededAction extends Action<"DELETED_ORDER_SUCCEEDED"> {
  orderIdDeleted: number
}

export interface IDeletedOrderFailedAction extends Action<"DELETED_ORDER_FAILED"> {
}

//Reset
export interface IResetApiCallsStatuses extends Action<"RESET_API_CALLS_STATUSES">{
}

export type OrderActions =
  | IGettingOrdersAction
  | IGotOrdersSucceededAction
  | IGotOrdersFailedAction
  | IGettingOrderByIdAction
  | IGotOrderByIdSucceededAction
  | IGotOrderByIdFailedAction
  | IPostingOrderAction
  | IPostedOrderSucceededAction
  | IPostedOrderFailedAction
  | IDeletingOrderAction
  | IDeletedOrderSucceededAction
  | IDeletedOrderFailedAction
  | IResetApiCallsStatuses
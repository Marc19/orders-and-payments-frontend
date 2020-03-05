import { ActionCreator, Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";
import moment from 'moment';
import { IGettingOrdersAction, IGotOrdersSucceededAction, IGotOrdersFailedAction, IPostedOrderSucceededAction, IPostedOrderFailedAction, IPostingOrderAction, IResetApiCallsStatuses, IGotOrderByIdFailedAction, IGotOrderByIdSucceededAction, IGettingOrderByIdAction, IDeletedOrderSucceededAction, IDeletedOrderFailedAction, IDeletingOrderAction } from "./orderActionTypes";
import Order from "../../../models/Order";
import {getOrders, postOrder, getOrderById, deleteOrder} from "../../../api/orderApi";

export const getOrdersActionCreator: 
    ActionCreator<ThunkAction<
                    Promise<IGotOrdersSucceededAction|IGotOrdersFailedAction>,
                    Order[],
                    null,
                    (IGotOrdersSucceededAction|IGotOrdersFailedAction)>
                 > = () => {

  return async (dispatch: Dispatch) => {
    const gettingOrdersAction: IGettingOrdersAction = {
      type: "GETTING_ORDERS"
    };
    dispatch(gettingOrdersAction);

    try{
        const ordersAxiosResponse = await getOrders();
        const orders : Order[] = ordersAxiosResponse.data.map(o => { 
          return {
            ...o,
            creationDate: moment(o.creationDate).calendar(),
            payment: {...o.payment, paymentDate: moment(o.payment?.paymentDate).calendar()}
          }
        });
    
        const gotOrdersAction: IGotOrdersSucceededAction = {
          orders,
          type: "GOT_ORDERS_SUCCEEDED"
        };
        return dispatch(gotOrdersAction);
    }
    catch(ex){
        const gotOrdersFailedAction : IGotOrdersFailedAction = {
            type: "GOT_ORDERS_FAILED"
        }
        return dispatch(gotOrdersFailedAction);
    }
  };
};

export const postOrderActionCreator: 
    ActionCreator<ThunkAction<
                    Promise<IPostedOrderSucceededAction|IPostedOrderFailedAction>,
                    Order,
                    null,
                    (IPostedOrderSucceededAction|IPostedOrderFailedAction)>
                 > = (order : Order) => {

  return async (dispatch: Dispatch) => {
    const postingOrderAction: IPostingOrderAction = {
      type: "POSTING_ORDER"
    };
    dispatch(postingOrderAction);

    try{
        const orderAxiosResponse = await postOrder(order);
        const postedOrder = orderAxiosResponse.data;
    
        const postedOrderSucceededAction: IPostedOrderSucceededAction = {
           type: "POSTED_ORDER_SUCCEEDED",
           result: postedOrder
        };
        return dispatch(postedOrderSucceededAction);
    }
    catch(error){
      const errorMessage = error.response.data.title;
        const postedOrderFailedAction : IPostedOrderFailedAction = {
            type: "POSTED_ORDER_FAILED",
            errorMessage: errorMessage
        }
        return dispatch(postedOrderFailedAction);
    }
  };
}

export const getOrderByIdActionCreator: 
    ActionCreator<ThunkAction<
                    Promise<IGotOrderByIdSucceededAction|IGotOrderByIdFailedAction>,
                    Order,
                    null,
                    (IGotOrderByIdSucceededAction|IGotOrderByIdFailedAction)>
                 > = (id: number) => {

  return async (dispatch: Dispatch) => {
    const gettingOrderByIdAction: IGettingOrderByIdAction = {
      type: "GETTING_ORDER_BY_ID"
    };
    dispatch(gettingOrderByIdAction);

    try{
        const ordersAxiosResponse = await getOrderById(id);
        const orderResult : Order = ordersAxiosResponse.data;
        const order : Order = {
          ...orderResult,
          creationDate: moment(orderResult.creationDate).calendar(),
          payment: {...orderResult.payment, paymentDate: moment(orderResult.payment?.paymentDate).calendar()}};
        
    
        const gotOrderByIdAction: IGotOrderByIdSucceededAction = {
          order,
          type: "GOT_ORDER_BY_ID_SUCCEEDED"
        };
        return dispatch(gotOrderByIdAction);
    }
    catch(ex){
        const gotOrderByIdFailedAction : IGotOrderByIdFailedAction = {
            type: "GOT_ORDER_BY_ID_FAILED"
        }
        return dispatch(gotOrderByIdFailedAction);
    }
  };
};

export const deleteOrderActionCreator: 
    ActionCreator<ThunkAction<
                    Promise<IDeletedOrderSucceededAction|IDeletedOrderFailedAction>,
                    Order,
                    null,
                    (IDeletedOrderSucceededAction|IDeletedOrderFailedAction)>
                 > = (id : number) => {

  return async (dispatch: Dispatch) => {
    const deletingOrderAction: IDeletingOrderAction = {
      type: "DELETING_ORDER"
    };
    dispatch(deletingOrderAction);

    try{
        await deleteOrder(id);
    
        const deletedOrderSucceededAction: IDeletedOrderSucceededAction = {
           type: "DELETED_ORDER_SUCCEEDED",
           orderIdDeleted: id
        };
        return dispatch(deletedOrderSucceededAction);
    }
    catch(error){
        const deletedOrderFailedAction : IDeletedOrderFailedAction = {
            type: "DELETED_ORDER_FAILED"
        }
        return dispatch(deletedOrderFailedAction);
    }
  };
}

export const resetApiCallsStatusesActionCreator : ActionCreator<IResetApiCallsStatuses> = () => {
  return {
    type: "RESET_API_CALLS_STATUSES"
  }
}
